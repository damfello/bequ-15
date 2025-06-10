import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Import standard createClient
import Stripe from 'stripe';

// Initialize Stripe (using the specific apiVersion your types require)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil', // Use the specific version required by your types
  typescript: true,
});

const priceId = process.env.STRIPE_PRICE_ID || '';

// Securely verify the user's Access Token
async function validateUser(req: NextRequest) {
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
        throw new Error('Missing Authorization Header');
    }

    // Create Supabase Admin Client (requires Service Role Key)
    // Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env.local
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
        throw new Error('Server misconfiguration: Supabase URL or Service Role Key missing.');
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
        throw new Error('Invalid or expired token.');
    }

    // Return the validated user
    return user;
}


export async function POST(req: NextRequest) {
  // Ensure Stripe keys are set
  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    console.error('Stripe Server configuration error.');
    return new NextResponse('Server configuration error.', { status: 500 });
  }

  try {
    // 1. Securely validate the user using the Access Token
    const user = await validateUser(req);

    // 2. Get origin for redirect URLs
    const origin = req.nextUrl.origin || 'http://localhost:3000';
    const success_url = `${origin}/?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${origin}/`;

    // 3. Create Stripe Checkout Session using validated user info
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: success_url,
      cancel_url: cancel_url,
      allow_promotion_codes: true,
      // Use the securely validated user ID
      client_reference_id: user.id,
      // Use the securely validated user email
      customer_email: user.email,
    });

    if (!checkoutSession?.id) {
       throw new Error('Could not create Stripe Checkout Session');
    }

    // 4. Return the session ID
    return NextResponse.json({ sessionId: checkoutSession.id });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    // Determine status code based on error message
    const status = errorMessage.includes('Authorization') || errorMessage.includes('token') ? 401 : 500;
    return new NextResponse(errorMessage, { status });
  }
}