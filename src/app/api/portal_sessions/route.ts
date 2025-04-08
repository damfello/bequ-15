import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient, User } from '@supabase/supabase-js'; // Import Supabase client & types
import Stripe from 'stripe';

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil', // Match your webhook version
  typescript: true,
});

// Helper function to validate user token (same as before)
async function validateUser(req: NextRequest): Promise<User> {
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) throw new Error('Missing Authorization Header');
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) throw new Error(error?.message || 'Invalid or expired token.');
    return user;
}

// Helper function to get Stripe Customer ID from our DB
async function getStripeCustomerId(userId: string): Promise<string | null> {
    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .select('stripe_customer_id')
        .eq('user_id', userId)
        .maybeSingle(); // Fetch one row or null

    if (error) {
        console.error(`Error fetching Stripe Customer ID for user ${userId}:`, error);
        return null;
    }
    return data?.stripe_customer_id || null;
}


export async function POST(req: NextRequest) {
    // Basic server config checks
    if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('Server configuration error (Stripe/Supabase keys missing)');
        return new NextResponse('Server configuration error.', { status: 500 });
    }

    try {
        // 1. Validate User
        const user = await validateUser(req);

        // 2. Get Stripe Customer ID from your Database
        const stripeCustomerId = await getStripeCustomerId(user.id);

        if (!stripeCustomerId) {
            console.error(`Stripe Customer ID not found in DB for user ${user.id}`);
            return new NextResponse('Customer information not found.', { status: 404 });
        }

        // 3. Define the return URL (where user comes back to after portal)
        const origin = req.nextUrl.origin || 'http://localhost:3000';
        const returnUrl = origin + '/'; // Return to homepage

        // 4. Create Stripe Billing Portal Session
        console.log(`Creating Stripe Portal session for customer: ${stripeCustomerId}`);
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl,
        });

        if (!portalSession?.url) {
             throw new Error('Could not create Stripe Billing Portal Session.');
        }

        // 5. Return the Portal Session URL
        return NextResponse.json({ portalUrl: portalSession.url });

    } catch (error) {
        console.error('API /api/portal_sessions Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        const status = errorMessage.includes('Authorization') || errorMessage.includes('token') ? 401
                     : errorMessage.includes('not found') ? 404
                     : 500;
        return new NextResponse(errorMessage, { status });
    }
}