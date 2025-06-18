// AuthUI.tsx
'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';

export default function AuthUI() {
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : 'http://localhost:3000/auth/callback';

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="light"
      providers={[]}
      redirectTo={redirectTo}
      localization={{
        variables: {
          sign_in: {
            email_label: 'Email address',
            password_label: 'Your Password',
            // --- CAMBIO AQUÍ para el texto del enlace ---
            link_text: "If you don't have an account yet, sign up at this link."
            // --- FIN CAMBIO ---
          },
          sign_up: { email_label: 'Email address', password_label: 'Create a Password'},
        }
      }}
    />
  );
}