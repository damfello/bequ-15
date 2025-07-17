'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Restaurado
import { supabase } from '@/lib/supabaseClient'; // Restaurado
import AuthUI from '@/components/AuthUI'; // Restaurado
import Link from 'next/link'; // Restaurado

export default function LoginPage() {
  const router = useRouter();
  const [showTermsError, setShowTermsError] = useState(false); // Estado para mostrar error de términos

  // Redirigir a la página de inicio si el usuario ya está logueado
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

  // --- EFECTO PARA INYECTAR LA CASILLA DE TÉRMINOS Y CONDICIONES EN EL FORMULARIO DE REGISTRO ---
  useEffect(() => {
    const authUiContainer = document.getElementById('auth-ui-container');

    if (!authUiContainer) {
      console.warn("AuthUI container not found. Terms and Conditions checkbox may not be injected.");
      // Si el contenedor no está disponible inmediatamente, observamos el body
      // para cuando se añada el contenedor de AuthUI.
      const fallbackObserver = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && document.getElementById('auth-ui-container')) {
            observer.disconnect(); // Deja de observar una vez que el contenedor es encontrado
            setupAuthUIObserver(); // Procede con la configuración del observador principal
            return;
          }
        }
      });
      fallbackObserver.observe(document.body, { childList: true, subtree: true });
      return () => fallbackObserver.disconnect();
    }

    const setupAuthUIObserver = () => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          // La condición corregida: solo verificamos 'childList' para detectar cambios en la estructura del DOM
          // donde el formulario de registro podría aparecer.
          if (mutation.type === 'childList') {
            // Busca el formulario de registro de Supabase (data-test="auth-sign-up")
            const signupForm = document.querySelector('form[data-test="auth-sign-up"]');
            const termsCheckboxContainer = document.getElementById('terms-checkbox-container');

            // Si el formulario de registro está presente y la casilla no ha sido inyectada
            if (signupForm && !termsCheckboxContainer) {
              const submitButton = signupForm.querySelector('button[type="submit"]');

              if (submitButton) {
                // Crea el div contenedor para la casilla y el texto
                const newDiv = document.createElement('div');
                newDiv.id = 'terms-checkbox-container';
                newDiv.className = 'mb-4 text-sm text-gray-700'; // Clases de Tailwind para estilo

                // Crea la casilla de verificación
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'terms-checkbox';
                checkbox.className = 'mr-2'; // Clase de Tailwind para margen

                // Crea la etiqueta con el enlace a los términos y condiciones
                const label = document.createElement('label');
                label.htmlFor = 'terms-checkbox';
                label.innerHTML = `I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Terms and Conditions</a>`;

                newDiv.appendChild(checkbox);
                newDiv.appendChild(label);

                // Inserta el contenedor de la casilla antes del botón de enviar
                submitButton.parentNode?.insertBefore(newDiv, submitButton);

                // Añade un listener al formulario para validar la casilla antes de enviar
                const handleSubmit = (e: Event) => {
                  if (!checkbox.checked) {
                    e.preventDefault(); // Previene el envío del formulario
                    setShowTermsError(true); // Muestra el mensaje de error
                  } else {
                    setShowTermsError(false); // Oculta el error si la casilla está marcada
                  }
                };

                // Añade el event listener al formulario para manejar tanto el clic del botón como Enter
                signupForm.addEventListener('submit', handleSubmit);

                // Desconecta el observador para evitar inyecciones duplicadas
                // y lo vuelve a observar para detectar cambios de vista (ej. si el usuario cambia a login y luego a signup)
                observer.disconnect();
                observer.observe(authUiContainer, { childList: true, subtree: true });
                return; // Salir del bucle de mutaciones
              }
            } else if (!signupForm && termsCheckboxContainer) {
              // Si el formulario de registro ya no está visible pero la casilla sí, la removemos
              termsCheckboxContainer.remove();
              setShowTermsError(false); // Oculta el error si el formulario se ha ido
            }
          }
        }
      });

      // Inicia el observador en el contenedor principal de AuthUI
      observer.observe(authUiContainer, { childList: true, subtree: true });

      // Limpia el observador al desmontar el componente
      return () => observer.disconnect();
    };

    setupAuthUIObserver(); // Llamada inicial para configurar el observador

    // Limpieza adicional si el componente se desmonta antes de que el observador se desconecte
    return () => {
      // No es necesario un cleanup explícito aquí si el observador se desconecta dentro de setupAuthUIObserver's return
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </div>

      {/* Se añadió un ID para que el MutationObserver pueda apuntar a este contenedor */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md" id="auth-ui-container">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
          Welcome to BeQu Beta
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 leading-relaxed">
          Unlock instant answers and expert guidance on medical device regulations in Europe. <br/> Sign in or create your account to get started.
        </p>

        <AuthUI /> {/* Componente AuthUI real */}

        {/* Mensaje de error si la casilla de términos no está marcada */}
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
