'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBookOpen, FiCpu, FiLock, FiChevronDown } from 'react-icons/fi';

// --- COMPONENTE DE FAQ ACTUALIZADO CON NUEVO DISEÑO ---
const AccordionItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-lg font-medium text-blue-100 flex items-center">
          <span className="mr-3">{index}.</span>
          {question}
        </span>
        <FiChevronDown
          className={`transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Contenedor animado para la respuesta */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 pr-6 text-blue-200 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
// --- FIN DEL COMPONENTE DE ACORDEÓN ---

// --- NUEVO: Contenido para la sección de FAQ ---
const faqContent = [
  {
    question: "¿Cuál es la diferencia entre BeQu y otras herramientas populares como ChatGPT/Gemini?",
    answer: "Son grandes modelos generalistas entrenados con bases de datos masivas, capaces de resolver cualquier tipo de tarea. BeQu se especializa únicamente en la regulación de dispositivos médicos, lo que le permite reducir significativamente el riesgo de alucinaciones. En términos médicos, BeQu es un médico especialista, mientras que los modelos más grandes son entrenados como médicos de cabecera."
  },
  {
    question: "¿Cuál es la diferencia entre los planes Estándar y Plus?",
    answer: "El plan Estándar de BeQu tiene acceso a un número limitado de regulaciones, 6 en total. El plan Plus te permite acceder a un total de 10 documentos regulatorios completamente actualizados."
  },
  {
    question: "¿Qué tanto puedo confiar en la información que proporciona BeQu?",
    answer: "BeQu tiene acceso a una base de datos controlada de documentos oficiales de regulación médica, lo que nos permite proporcionarte información fiable directamente de la fuente. Sin embargo, BeQu es una empresa centrada en facilitar tu acceso a la información. En ningún momento BeQu reemplaza el juicio de un profesional. BeQu te permite entender el complejo mundo de las regulaciones médicas."
  }
];


export default function LandingPage() {
  const router = useRouter();

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Barra de Navegación (sin cambios) */}
      <nav className="w-full p-4 sticky top-0 z-50 bg-blue-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">BeQu | Medical Regulations AI Assistant</span>
          <div className="space-x-4 md:space-x-6 flex items-center">
            <button onClick={() => handleScrollTo('features')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">Features</button>
            <button onClick={() => handleScrollTo('pricing')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">Pricing</button>
            <button onClick={() => handleScrollTo('faq')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">FAQ</button>
            <button onClick={navigateToLogin} className="bg-white text-blue-900 px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium hover:bg-blue-100 transition duration-150 shadow"> Login / Sign Up </button>
          </div>
        </div>
      </nav>

      {/* Secciones Hero, Features, Pricing (sin cambios) */}
      <section id="hero" className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center">{/* ... */}</section>
      <section id="features" className="py-16 md:py-20 px-6 bg-white/5">{/* ... */}</section>
      <section id="pricing" className="py-16 md:py-20 px-6">{/* ... */}</section>

      {/* --- SECCIÓN DE FAQ ACTUALIZADA --- */}
      <section id="faq" className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqContent.map((item, index) => (
              <AccordionItem
                key={index}
                index={index + 1}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>
      {/* --- FIN DE LA SECCIÓN DE FAQ --- */}


      {/* Sección de Autenticación y Footer (sin cambios) */}
      <section id="auth" className="py-16 md:py-20 px-6">{/* ... */}</section>
      <footer className="w-full max-w-6xl mx-auto mt-12 mb-6 pt-6 border-t border-white/20 text-center text-blue-200 text-sm">{/* ... */}</footer>
    </div>
  );
}