// app/login/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthUI from '@/components/AuthUI';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  // Redirect to homepage if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("User already logged in, redirecting from /login to /");
        router.replace('/');
      }
    };
    checkSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Auth state changed to logged in on /login, redirecting to /");
        router.replace('/');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  // --- NUEVO EFECTO PARA MODIFICAR EL TEXTO DEL ENLACE ---
  useEffect(() => {
    const changeSignupLinkText = () => {
      // Usamos el mismo selector que en el CSS para ser consistentes y precisos.
      const signupLink = document.querySelector('.supabase-auth-ui_ui-anchor[href="#auth-sign-up"]');
      if (signupLink) {
        signupLink.textContent = "If you don't have an account yet, sign up at this link.";
      }
    };

    // La interfaz de usuario de Supabase se renderiza dinámicamente.
    // Podría tardar un momento, por lo que podemos usar un pequeño retraso
    // o un MutationObserver para asegurarnos de que el elemento exista.
    // Un setTimeout simple es a menudo suficiente para casos como este.
    const timer = setTimeout(changeSignupLinkText, 100); // Intenta después de 100ms

    // Limpia el temporizador si el componente se desmonta antes
    return () => clearTimeout(timer);

  }, []); // El array vacío asegura que este efecto se ejecute solo una vez después del render inicial.
  // --- FIN NUEVO EFECTO ---

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
          Welcome to BeQu Beta
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 leading-relaxed">
          Unlock instant answers and expert guidance on medical device regulations in Europe. <br/> Sign in or create your account to get started.
        </p>

        <AuthUI />
      </div>
      <p className="mt-6 text-center text-xs text-gray-500">
        Powered by BQS GmbH
      </p>
    </div>
  );
}