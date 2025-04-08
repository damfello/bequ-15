import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// Initialize Supabase Admin Client (reuse if already initialized elsewhere, otherwise init here)
// Ensure Supabase URL and Service Role Key are set in .env.local
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Helper function to validate user token (same as in checkout API)
async function validateUser(req: NextRequest): Promise<User> {
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) throw new Error('Missing Authorization Header');

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) throw new Error(error?.message || 'Invalid or expired token.');
    return user;
}

// Helper function to check for active subscription
async function checkActiveSubscription(userId: string): Promise<boolean> {
    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .select('stripe_subscription_status')
        .eq('user_id', userId)
        .in('stripe_subscription_status', ['active', 'trialing']) // Check for active statuses
        .maybeSingle(); // Returns data or null, doesn't error if not found

    if (error) {
        console.error('Error checking subscription:', error);
        return false; // Treat DB errors as inactive for safety
    }
    return !!data; // True if a record with 'active' or 'trialing' status was found
}

export async function POST(req: NextRequest) {
    // --- Environment Variable Checks ---
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nAuthHeaderName = process.env.N8N_AUTH_HEADER_NAME;
    const n8nAuthHeaderValue = process.env.N8N_AUTH_HEADER_VALUE;

    if (!n8nWebhookUrl || !n8nAuthHeaderName || !n8nAuthHeaderValue) {
        console.error('n8n webhook configuration missing in environment variables.');
        return new NextResponse('Server configuration error: n8n config missing.', { status: 500 });
    }
     if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
         console.error('Server config error: Supabase config missing.');
         return new NextResponse('Server configuration error.', { status: 500 });
     }

    try {
        // 1. Validate User Authentication
        const user = await validateUser(req);

        // 2. Validate Active Subscription
        const isActive = await checkActiveSubscription(user.id);
        if (!isActive) {
            console.warn(`User ${user.id} attempted chat without active subscription.`);
            return new NextResponse('Forbidden: Active subscription required.', { status: 403 });
        }

        // 3. Get Payload from Frontend Request
        const { sessionId, chatInput } = await req.json();
        if (!sessionId || typeof chatInput === 'undefined') { // Check chatInput exists, even if empty string
             return new NextResponse('Bad Request: Missing sessionId or chatInput.', { status: 400 });
        }

        // 4. Prepare Request to n8n
        const n8nPayload = { sessionId, chatInput };
        const headersToN8n: HeadersInit = {
            'Content-Type': 'application/json',
            // Add the specific n8n auth header dynamically
            [n8nAuthHeaderName]: n8nAuthHeaderValue,
        };
           // --- ADD DEBUG LOGGING ---
           console.log("--- Debug: Calling n8n ---");
           console.log("Webhook URL:", n8nWebhookUrl);
           console.log("Auth Header Name:", n8nAuthHeaderName);
           // Avoid logging the full secret value, just check if it seems loaded (e.g., check length)
           console.log("Auth Header Value Length:", n8nAuthHeaderValue?.length || 0);
           console.log("Headers being sent:", JSON.stringify(headersToN8n)); // Log the constructed headers
           console.log("Payload being sent:", JSON.stringify(n8nPayload));
           console.log("--- End Debug ---");
           // --- END DEBUG LOGGING ---

        // 5. Call n8n Webhook
        console.log(`Forwarding chat request to n8n for session ${sessionId}`);
        const n8nResponse = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: headersToN8n,
            body: JSON.stringify(n8nPayload),
        });

        // 6. Process n8n Response
        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text();
            console.error(`n8n webhook failed with status ${n8nResponse.status}: ${errorText}`);
            throw new Error(`Chat engine failed: ${n8nResponse.statusText}`); // Generic error to frontend
        }

        const n8nData = await n8nResponse.json();

        if (typeof n8nData.output === 'undefined') {
             console.error('n8n response missing "output" field:', n8nData);
             throw new Error('Chat engine response format error.');
        }

        // 7. Return n8n Output to Frontend
        return NextResponse.json({ output: n8nData.output });

    } catch (error) {
        console.error('API /api/chat Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        const status = errorMessage.includes('Authorization') || errorMessage.includes('token') ? 401
                     : errorMessage.includes('Forbidden') ? 403
                     : errorMessage.includes('Bad Request') ? 400
                     : 500; // Default to 500
        return new NextResponse(errorMessage, { status });
    }
}