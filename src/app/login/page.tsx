'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AuthUI from '@/components/AuthUI';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showTermsError, setShowTermsError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isClient, setIsClient] = useState(false); // Nuevo estado para verificar si es el cliente

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Maneja la redirección si el usuario ya está autenticado
    const checkSessionAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("User already logged in, redirecting from /login to /");
        router.replace('/');
      }
    };
    checkSessionAndRedirect();

    // Configura el listener para cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Auth state changed to logged in on /login, redirecting to /");
        router.replace('/');
      }
    });

    // Limpia el listener al desmontar el componente
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    // Lee el parámetro de confirmación de email de la URL solo en el cliente
    if (isClient && searchParams.get('message') === 'confirmed') {
      setShowMessage(true);
      // Para limpiar la URL después de mostrar el mensaje
      router.replace('/login');
    }
  }, [isClient, searchParams, router]);

  const setupAuthUIObserver = useCallback(() => {
    const authUiContainer = document.getElementById('auth-ui-container');

    if (!authUiContainer) {
      console.warn("AuthUI container not found. Terms and Conditions checkbox may not be injected.");
      const fallbackObserver = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && document.getElementById('auth-ui-container')) {
            observer.disconnect();
            setupAuthUIObserver();
            return;
          }
        }
      });
      fallbackObserver.observe(document.body, { childList: true, subtree: true });
      return () => fallbackObserver.disconnect();
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const signupForm = document.querySelector('form#auth-sign-up');
          const termsCheckboxContainer = document.getElementById('terms-checkbox-container');

          if (signupForm && !termsCheckboxContainer) {
            const submitButton = signupForm.querySelector('button[type="submit"]');

            if (submitButton) {
              const newDiv = document.createElement('div');
              newDiv.id = 'terms-checkbox-container';
              newDiv.className = 'mb-4 text-sm text-gray-700';

              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.id = 'terms-checkbox';
              checkbox.className = 'mr-2';

              const label = document.createElement('label');
              label.htmlFor = 'terms-checkbox';
              label.innerHTML = `I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Terms and Conditions</a>`;

              newDiv.appendChild(checkbox);
              newDiv.appendChild(label);

              submitButton.parentNode?.insertBefore(newDiv, submitButton);

              const handleSubmit = (e: Event) => {
                if (!checkbox.checked) {
                  e.preventDefault();
                  setShowTermsError(true);
                } else {
                  setShowTermsError(false);
                }
              };

              signupForm.addEventListener('submit', handleSubmit);

              observer.disconnect();
              observer.observe(authUiContainer, { childList: true, subtree: true });
              return;
            }
          } else if (!signupForm && termsCheckboxContainer) {
            termsCheckboxContainer.remove();
            setShowTermsError(false);
          }
        }
      }
    });

    observer.observe(authUiContainer, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

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