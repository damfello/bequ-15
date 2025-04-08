import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    // --- Initializations Inside Handler ---
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
        console.error('CRITICAL: Server configuration error - Missing required Stripe/Supabase keys or secrets.');
        return new NextResponse('Server configuration error.', { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-03-31.basil', typescript: true });
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    // --- End Initializations ---

    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    if (!sig) {
         console.error('Missing stripe-signature header');
         return new NextResponse('Missing Stripe signature.', { status: 400 });
    }

    // variable declared outside, assigned inside the successful try block
    let event: Stripe.Event;

    try {
        // Verify signature & assign event
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

        // --- ALL LOGIC USING 'event' MOVED INSIDE THIS TRY BLOCK ---
        console.log('✅ Stripe Webhook Received & Verified:', event.type);
        const eventData = event.data.object;

        // Inner try-catch for processing logic
        try {
            switch (event.type) {
                case 'checkout.session.completed': {
                    // ... (Keep full logic for this case, including try/catch for retrieve/insert) ...
                     const session = eventData as Stripe.Checkout.Session;
                     if (!session.client_reference_id || !session.customer || !session.subscription) { throw new Error('Missing data...'); }
                     const userId = session.client_reference_id;
                     const stripeCustomerId = session.customer as string;
                     const stripeSubscriptionId = session.subscription as string;
                     try {
                         const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId) as Stripe.Subscription;
                         if (subscription.status === 'incomplete_expired' || subscription.status === 'canceled') { break; }
                         if (!subscription.items?.data[0]?.price?.id) { throw new Error('Failed to retrieve price ID...'); }
                         const stripePriceId = subscription.items.data[0].price.id;
                         const stripeSubscriptionStatus = subscription.status;
                         let currentPeriodEndISO: string | null = null;
                         // @ts-expect-error - Workaround
                         if (typeof subscription.current_period_end === 'number') {
                              // @ts-expect-error - Workaround
                             const d = new Date(subscription.current_period_end * 1000);
                             if(!isNaN(d.getTime())) currentPeriodEndISO = d.toISOString();
                         } else { console.warn('current_period_end missing...'); }
                         const insertData = { user_id: userId, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, stripe_price_id: stripePriceId, stripe_subscription_status: stripeSubscriptionStatus, current_period_end: currentPeriodEndISO };
                         const { error: insertError } = await supabaseAdmin.from('subscriptions').insert(insertData);
                         if (insertError) { throw insertError; } else { console.log(`SUCCESS: Subscription CREATED...`); }
                     } catch (processingError) { throw processingError; }
                     break;
                }

                case 'customer.subscription.updated': {
                    // ... (Keep full logic for this case, including .eq() fix) ...
                     const subscription: Stripe.Subscription = eventData as Stripe.Subscription;
                     const stripeSubscriptionId = subscription.id;
                     const stripeSubscriptionStatus = subscription.status;
                     // @ts-expect-error - Workaround
                     const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
                     if (isNaN(currentPeriodEnd.getTime())) { throw new Error('Invalid date...'); }
                     const { error: updateError } = await supabaseAdmin.from('subscriptions').update({ stripe_subscription_status: stripeSubscriptionStatus, current_period_end: currentPeriodEnd.toISOString(), updated_at: new Date().toISOString() }).eq('stripe_subscription_id', stripeSubscriptionId);
                     if (updateError) { throw updateError; } else { console.log(`Subscription UPDATED...`); }
                     break;
                }

                case 'customer.subscription.deleted': {
                   // ... (Keep full logic for this case, including .eq() fix) ...
                    const subscription = eventData as Stripe.Subscription;
                    const stripeSubscriptionId = subscription.id;
                    const stripeSubscriptionStatus = subscription.status;
                    const { error: deleteError } = await supabaseAdmin.from('subscriptions').update({ stripe_subscription_status: stripeSubscriptionStatus, updated_at: new Date().toISOString() }).eq('stripe_subscription_id', stripeSubscriptionId);
                    if (deleteError) { throw deleteError; } else { console.log(`Subscription status set to '${stripeSubscriptionStatus}'...`); }
                    break;
                }
                default:
                    console.warn(`Unhandled event type: ${event.type}`);
            } // End switch

            // Return 200 OK from within the successful outer 'try' block
            return NextResponse.json({ received: true });

        } catch (processingError) {
            // Catch errors from the switch statement logic
            const errorMessage = `Webhook handler processing error: ${processingError instanceof Error ? processingError.message : 'Unknown error'}`;
            console.error("!! Webhook Handler Processing Error:", errorMessage);
            // Return 500 for internal processing errors
            return new NextResponse(errorMessage, { status: 500 });
        }
        // --- END MOVED EVENT HANDLING ---

    } catch (err) {
        // Handle ONLY signature verification errors here
        const errorMessage = `Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
        console.error(errorMessage);
        return new NextResponse(errorMessage, { status: 400 }); // 400 Bad Request
    }
}