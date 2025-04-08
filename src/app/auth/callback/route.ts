import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Option required for Route Handlers that use cookies
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code'); // Get the code from the query string

  if (code) {
    // Create a Supabase client specific to Route Handlers
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
       // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
      // Session cookies are now set automatically by the helper
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      // Handle the error appropriately, maybe redirect to an error page
      // For now, just redirect home even if there's an error during exchange
      return NextResponse.redirect(requestUrl.origin + '/error'); // Redirect to an error page or home
    }

  } else {
    console.warn('No code found in auth callback URL');
  }

  // URL to redirect to after sign in process completes
  // Redirect back to the home page (or a dedicated dashboard page)
  return NextResponse.redirect(requestUrl.origin);
}