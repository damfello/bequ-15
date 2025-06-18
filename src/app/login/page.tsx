// app/login/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthUI from '@/components/AuthUI'; // Import the cleaned-up AuthUI
import Link from 'next/link'; // Import Link for navigation

export default function LoginPage() {
  const router = useRouter();

  // Redirect to homepage if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("User already logged in, redirecting from /login to /");
        router.replace('/'); // Use replace to avoid adding /login to history
      }
    };
    checkSession();
    // Also listen for immediate auth changes while on the page
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Auth state changed to logged in on /login, redirecting to /");
        router.replace('/');
      }
    });

    return () => {
      // Cleanup the listener when the component unmounts
      authListener?.subscription.unsubscribe();
    };
  }, [router]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Link back to landing page */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Título principal */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
          Welcome to BeQu Beta
        </h1>
        {/* Texto descriptivo más grande y con énfasis */}
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 leading-relaxed">
          Unlock instant answers and expert guidance on medical device regulations in Europe. <br/> Sign in or create your account to get started.
        </p>

        {/* Render the AuthUI component */}
        <AuthUI />
      </div>
      {/* Optional: Add footer or branding */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Powered by BQS GmbH
      </p>
    </div>
  );
}