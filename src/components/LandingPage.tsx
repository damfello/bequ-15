'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBookOpen, FiCpu, FiLock, FiChevronDown } from 'react-icons/fi';

// Componente para el Acordeón de FAQ con el nuevo diseño
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

// Contenido para la sección de FAQ
const faqContent = [
  {
    question: "What's the difference between BeQu and other popular tools like ChatGPT/Gemini, among others?",
    answer: "There are large generalist models trained with massive databases, capable of solving any type of task. BeQu specializes solely in medical device regulations, which allows it to significantly reduce the risk of hallucinations. In medical terms, BeQu is a medical specialist, while the larger models are trained with general practitioners."
  },
  {
    question: "What is the difference between the Standard and Plus plans?",
    answer: "The BeQu Standard plan has access to a limited number of regulations, 6 in total. The Plus plan allows you to access a total of 10 fully updated regulatory documents."
  },
  {
    question: "How much can I trust the information BeQu provides?",
    answer: "BeQu has access to a controlled database of official medical regulation documents, allowing us to provide you with reliable information directly from the source. However, BeQu is a company focused on facilitating your access to information. However, at no point does BeQu replace the judgment of a professional. BeQu allows you to understand the complex world of medical regulations."
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
      {/* Barra de Navegación */}
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

      {/* Sección Hero */}
      <section id="hero" className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
            Your AI Assistant for MedTech Compliance.
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
             Get instant clarity on medical device regulations. BeQu interprets complex compliance documents to provide quick, accurate answers tailored to your needs.
          </p>
          <button onClick={() => handleScrollTo('pricing')} className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-md transition duration-150 shadow-lg mb-16"> View Plan Details </button>
          <div className="bg-gray-900/60 border border-blue-700/50 rounded-lg shadow-xl p-4 pt-8 relative max-w-2xl mx-auto text-left text-sm">
             <div className="absolute top-2 left-3 flex space-x-1.5"> <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div> <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div> <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div> </div>
             <div className='space-y-3'>
                 <div className="flex justify-end"> <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg rounded-br-none max-w-[70%]"> How can I classify a medical device? </div> </div>
                 <div className="flex justify-start"> <div className="bg-gray-700 text-blue-100 px-3 py-1.5 rounded-lg rounded-bl-none max-w-[70%]"> To classify a medical device according to MDR (EU) 2017/745, you need to consider its intended purpose... [more details] </div> </div>
                 <div className="flex justify-end"> <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg rounded-br-none max-w-[70%]"> What are the classification rules? </div> </div>
                 <div className="flex justify-start"> <div className="bg-gray-700 text-blue-300 italic px-3 py-1.5 rounded-lg rounded-bl-none max-w-[70%]"> Looking up MDR Annex VIII classification rules... </div> </div>
             </div>
          </div>
        </div>
      </section>

      {/* Sección Features (CONTENIDO RESTAURADO) */}
      <section id="features" className="py-16 md:py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">The Compliance Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
               <FiBookOpen className="text-blue-400 text-4xl mb-4 mx-auto"/>
               <h3 className="text-xl font-semibold mb-2">Regulatory Knowledge</h3>
               <p className="text-blue-200 text-sm leading-relaxed">Access updated guidance on official medical regulations. Our AI is trained to interpret complex compliance documents for quick, accurate answers.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
               <FiCpu className="text-blue-400 text-4xl mb-4 mx-auto"/>
               <h3 className="text-xl font-semibold mb-2">Advanced AI Processing</h3>
               <p className="text-blue-200 text-sm leading-relaxed">Leverages powerful language models for deep understanding of medical device regulations. Delivers context-aware responses tailored to your specific queries.</p>
             </div>
            <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
               <FiLock className="text-blue-400 text-4xl mb-4 mx-auto"/>
               <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
               <p className="text-blue-200 text-sm leading-relaxed">All data is encrypted and handled in compliance with industry standards. Your sensitive information stays confidential and protected at every step.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Sección Pricing (CONTENIDO RESTAURADO) */}
      <section id="pricing" className="py-16 md:py-20 px-6">
        <div className="max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Simple, Powerful Plan</h2>
            <div className="bg-gray-900/80 rounded-lg shadow-2xl p-8 backdrop-blur-md border border-gray-700 transform transition duration-300 hover:scale-[1.02]">
               <h3 className="text-xl font-semibold mb-2 text-center text-blue-100">Monthly Standard | Current price under review. The price of the final BeQu App version may change. </h3>
               <p className="text-4xl font-bold my-3 text-center text-white">€35 <span className="text-lg font-normal text-blue-200">/ month</span></p>
               <ul className="space-y-3 my-6 text-blue-100 text-sm">
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Access to MDR Knowledge Base</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Advanced AI Question Answering</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Secure & Private Chats</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Cancel Anytime</li>
               </ul>
               <button onClick={navigateToLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-md transition duration-150 shadow-md"> Sign Up to Subscribe </button>
            </div>
         </div>
      </section>

      {/* Sección FAQ */}
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

      {/* Sección Authentication */}
      <section id="auth" className="py-16 md:py-20 px-6">
          <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Ready to Get Started?</h2>
              <p className="text-blue-200 mb-6">Create an account or log in to subscribe and access BeQu AI.</p>
              <button onClick={navigateToLogin} className="bg-white text-blue-900 px-6 py-3 rounded-md text-base font-medium hover:bg-blue-100 transition duration-150 shadow"> Login / Sign Up </button>
          </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto mt-12 mb-6 pt-6 border-t border-white/20 text-center text-blue-200 text-sm">
        <p>Powered by BQS GmbH</p>
        <p>&copy; {new Date().getFullYear()} Best Quality Solutions GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}