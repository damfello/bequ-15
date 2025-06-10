import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient, User } from '@supabase/supabase-js'; // Removed SupabaseClient

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Helper function to validate user token
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
        .in('stripe_subscription_status', ['active', 'trialing'])
        .maybeSingle();
    if (error) { console.error('Error checking subscription:', error); return false; }
    return !!data;
}

export async function POST(req: NextRequest) {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nAuthHeaderName = process.env.N8N_AUTH_HEADER_NAME;
    const n8nAuthHeaderValue = process.env.N8N_AUTH_HEADER_VALUE;

    // ... (Keep checks for env vars) ...
    if (!n8nWebhookUrl || !n8nAuthHeaderName || !n8nAuthHeaderValue || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
         console.error('Server configuration error.');
         return new NextResponse('Server configuration error.', { status: 500 });
    }

    try {
        const user = await validateUser(req);
        const isActive = await checkActiveSubscription(user.id);
        if (!isActive) { return new NextResponse('Forbidden: Active subscription required.', { status: 403 }); }

        const { sessionId, chatInput } = await req.json();
        if (!sessionId || typeof chatInput === 'undefined') { return new NextResponse('Bad Request: Missing sessionId or chatInput.', { status: 400 }); }

        const n8nPayload = { sessionId, chatInput };
        const headersToN8n: HeadersInit = {
            'Content-Type': 'application/json',
            [n8nAuthHeaderName]: n8nAuthHeaderValue,
        };

        console.log(`Forwarding chat request to n8n for session ${sessionId}`);
        const n8nResponse = await fetch(n8nWebhookUrl, { method: 'POST', headers: headersToN8n, body: JSON.stringify(n8nPayload) });
        // =================================================================
        // =========== AÑADE ESTAS TRES LÍNEAS PARA DEPURAR ================
        console.log(`Respuesta de n8n - Status: ${n8nResponse.status}`);
        const responseBodyText = await n8nResponse.clone().text(); // Clonamos para poder leer el cuerpo dos veces
        console.log(`Respuesta de n8n - Cuerpo (raw): "${responseBodyText}"`);
        // =================================================================

        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text();
            console.error(`n8n webhook failed with status ${n8nResponse.status}: ${errorText}`);
            throw new Error(`Chat engine failed: ${n8nResponse.statusText}`);
        }

        const n8nData = await n8nResponse.json();
        if (typeof n8nData.output === 'undefined') { throw new Error('Chat engine response format error.'); }

        return NextResponse.json({ output: n8nData.output });

    } catch (error) {
        // ... (Keep error handling) ...
        console.error('API /api/chat Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        const status = errorMessage.includes('Authorization') || errorMessage.includes('token') ? 401 : errorMessage.includes('Forbidden') ? 403 : errorMessage.includes('Bad Request') ? 400 : 500;
        return new NextResponse(errorMessage, { status });
    }
}