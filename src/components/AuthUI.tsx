'use client'; // VERY IMPORTANT: Mark this as a Client Component

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient'; // Use the shared client-side instance

export default function AuthUI() {
  // Determine the redirect URL based on the environment variable or window location
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback` // Use current origin in browser
    : 'http://localhost:3000/auth/callback'; // Fallback for SSR/initial load (adjust if needed)

  return (
    // Render ONLY the Supabase Auth component
    <Auth
        supabaseClient={supabase} // Pass the CLIENT-SIDE client
        appearance={{ theme: ThemeSupa }} // Use Supabase's default theme
        theme="light" // Or "dark" - set based on where it's used, or make it a prop
        providers={['google', 'github']} // Optional: Add social providers if configured
        redirectTo={redirectTo} // Important for social logins/email confirms
        localization={{
           variables: {
             sign_in: { email_label: 'Email address', password_label: 'Your Password'},
             sign_up: { email_label: 'Email address', password_label: 'Create a Password'},
           }
        }}
     />
     // Removed the surrounding text and Plan Details from here
  );
}