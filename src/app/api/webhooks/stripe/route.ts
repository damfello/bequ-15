import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Import standard client
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil', // Use the specific version required by your types
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Initialize Supabase Admin Client (use Service Role Key)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error('Server config error: Webhook secret missing.');
    return new NextResponse('Server configuration error.', { status: 500 });
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
     console.error('Server config error: Supabase URL or Service Role Key missing.');
     return new NextResponse('Server configuration error.', { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing stripe-signature header');
    return new NextResponse('Missing Stripe signature.', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const errorMessage = `Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
    console.error(errorMessage);
    return new NextResponse(errorMessage, { status: 400 });
  }

  console.log('✅ Stripe Webhook Received:', event.type);
  const eventData = event.data.object; // Keep original type before casting in switch

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = eventData as Stripe.Checkout.Session;
        console.log('Handling checkout.session.completed');

        if (!session.client_reference_id || !session.customer || !session.subscription) {
           console.error('Missing required data in checkout session:', session);
           throw new Error('Missing data in checkout.session.completed event');
        }

        const userId = session.client_reference_id;
        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId = session.subscription as string;

        try {
            const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId) as Stripe.Subscription;

            if (subscription.status === 'incomplete_expired' || subscription.status === 'canceled') {
                console.warn(`Retrieved subscription ${subscription.id} immediately after checkout has status ${subscription.status}. Skipping DB insert.`);
                break;
            }

            if (!subscription.items?.data[0]?.price?.id) {
                console.error('Could not retrieve price ID from subscription:', subscription);
                throw new Error('Failed to retrieve price ID from subscription details.');
            }

            const stripePriceId = subscription.items.data[0].price.id;
            const stripeSubscriptionStatus = subscription.status;

            // --- MODIFIED HANDLING FOR current_period_end ---
            let currentPeriodEndISO: string | null = null;
            // @ts-ignore - Apply ignore here just in case the error reappears after retrieve
            if (typeof subscription.current_period_end === 'number') {
                // @ts-ignore - Apply ignore here too
                const currentPeriodEndDate = new Date(subscription.current_period_end * 1000);
                if (!isNaN(currentPeriodEndDate.getTime())) {
                   currentPeriodEndISO = currentPeriodEndDate.toISOString();
                } else {
                   // @ts-ignore - Apply ignore here
                   console.warn(`Invalid date created from timestamp: ${subscription.current_period_end}`);
                }
            } else {
                // @ts-ignore - Apply ignore here
                console.warn(`current_period_end missing or not a number in subscription ${stripeSubscriptionId} during checkout completion:`, subscription.current_period_end);
            }
            // --- END MODIFIED HANDLING ---

            // Database insert logic
            const { error: insertError } = await supabaseAdmin
              .from('subscriptions')
              .insert({
                user_id: userId,
                stripe_customer_id: stripeCustomerId,
                stripe_subscription_id: stripeSubscriptionId,
                stripe_price_id: stripePriceId,
                stripe_subscription_status: stripeSubscriptionStatus,
                current_period_end: currentPeriodEndISO, // Insert the ISO string or null
              });

            if (insertError) {
              console.error('Supabase insert error:', insertError);
              if (insertError.code === '23505') {
                  console.warn('Subscription record likely already exists for user:', userId);
              } else {
                  throw new Error(`Database error inserting subscription: ${insertError.message}`);
              }
            } else {
                console.log(`Subscription CREATED/Validated in DB for user ${userId}`);
            }

        } catch (retrieveError) {
            console.error(`Error retrieving or processing Stripe subscription ${stripeSubscriptionId}:`, retrieveError);
            throw new Error(`Failed during subscription retrieve/process: ${retrieveError instanceof Error ? retrieveError.message : 'Unknown retrieve error'}`);
        }
        break; // End checkout.session.completed case
      } // Close case checkout.session.completed


      case 'customer.subscription.updated': {
        const subscription: Stripe.Subscription = eventData as Stripe.Subscription;
        console.log('Handling customer.subscription.updated');

        const stripeSubscriptionId = subscription.id;
        const stripeSubscriptionStatus = subscription.status;
        // --- RE-APPLY @ts-ignore WORKAROUND ---
        // @ts-ignore - Workaround for persistent type error
        const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

        // Check if the created date is valid before converting
        if (isNaN(currentPeriodEnd.getTime())) {
             console.error(`Invalid date created from timestamp in subscription.updated: ${ (subscription as any).current_period_end}`);
             // Throw error or handle gracefully - let's throw to signal a problem
             throw new Error('Invalid date encountered in subscription.updated event.');
        }

        const { error: updateError } = await supabaseAdmin
          .from('subscriptions')
          .update({
            stripe_subscription_status: stripeSubscriptionStatus,
            current_period_end: currentPeriodEnd.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', stripeSubscriptionId);

        if (updateError) {
          console.error('Supabase update error:', updateError);
          throw new Error(`Database error updating subscription: ${updateError.message}`);
        } else {
            console.log(`Subscription UPDATED in DB for ID ${stripeSubscriptionId}`);
        }
        break;
      } // Close case customer.subscription.updated


      case 'customer.subscription.deleted': {
        const subscription = eventData as Stripe.Subscription; // Cast here (keep consistent)
        console.log('Handling customer.subscription.deleted');

        const stripeSubscriptionId = subscription.id;
        const stripeSubscriptionStatus = subscription.status;

        const { error: deleteError } = await supabaseAdmin
          .from('subscriptions')
          .update({
            stripe_subscription_status: stripeSubscriptionStatus,
             updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', stripeSubscriptionId);

         if (deleteError) {
           console.error('Supabase update (delete event) error:', deleteError);
           throw new Error(`Database error updating subscription on delete: ${deleteError.message}`);
         } else {
            console.log(`Subscription status set to '${stripeSubscriptionStatus}' in DB for ID ${stripeSubscriptionId}`);
         }
        break;
      }


      default:
        console.warn(`Unhandled event type: ${event.type}`);
    } // End switch

    return NextResponse.json({ received: true });

  } catch (error) {
      const errorMessage = `Webhook handler error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMessage);
      return new NextResponse(errorMessage, { status: 500 });
  }
}