'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Importa useSearchParams
import { supabase } from '@/lib/supabaseClient';
import AuthUI from '@/components/AuthUI';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook para leer parámetros de la URL
  const [showTermsError, setShowTermsError] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // Nuevo estado para el mensaje

  useEffect(() => {
    // Lee el parámetro 'message' de la URL
    if (searchParams.get('message') === 'confirmed') {
      setShowMessage(true);
      // Puedes limpiar el parámetro de la URL si lo deseas
      // router.replace('/login', { shallow: true });
    }
  }, [searchParams]);

  //... (el resto de tu código useEffect y setupAuthUIObserver)
  const setupAuthUIObserver = useCallback(() => {
    const authUiContainer = document.getElementById('auth-ui-container');
//... (el resto de tu código setupAuthUIObserver)
  }, [setShowTermsError]);

  useEffect(() => {
    setupAuthUIObserver();
  }, [setupAuthUIObserver]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="inline-block px-4 py-2 text-sm font-semibold text-white transition duration-150 rounded-md shadow-md bg-blue-600 hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>

      {/* Nuevo mensaje de confirmación */}
      {showMessage && (
        <div className="w-full max-w-md p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg shadow" role="alert">
          Email confirmed! Please log in to continue.
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md" id="auth-ui-container">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
          Welcome to BeQu Beta
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 leading-relaxed">
          Unlock instant answers and expert guidance on medical device regulations in Europe. <br/> Sign in or create your account to get started.
        </p>

        <AuthUI />

        {showTermsError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            You must accept the Terms and Conditions to register.
          </p>
        )}
      </div>
      <p className="mt-6 text-center text-xs text-gray-500">
        Powered by BQS GmbH
      </p>
    </div>
  );
}