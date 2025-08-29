'use client';

import React, { useState } from 'react';
import AnimatedText from '@/components/ui/AnimatedText';


// Inline SVG for FiChevronDown
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
// Inline SVG for FiBookOpen
const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-600 text-4xl mb-4 mx-auto"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
// Inline SVG for FiCpu
const CpuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-600 text-4xl mb-4 mx-auto"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="23" x2="9" y2="20"></line>
    <line x1="15" y1="23" x2="15" y2="20"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="15" x2="4" y2="15"></line>
    <line x1="23" y1="9" x2="20" y2="9"></line>
    <line x1="23" y1="15" x2="20" y2="15"></line>
  </svg>
);
// Inline SVG for FiLock
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-600 text-4xl mb-4 mx-auto"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);


// Componente para el Acordeón de FAQ con el nuevo diseño
const AccordionItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-lg font-medium text-gray-800 flex items-center">
          <span className="mr-3">{index}.</span>
          {question}
        </span>
        <ChevronDownIcon isOpen={isOpen} />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 pr-6 text-gray-600 leading-relaxed">
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
    question: "What is the difference between BeQu and other AI popular tools?",
    answer: "There are large generalist models trained with massive databases, capable of solving any type of task. BeQu specializes solely in medical device regulations, which allows it to significantly reduce the risk of hallucinations."
  },
  {
    question: "What is the difference between the Standard and Plus plans?",
    answer: "The BeQu Standard plan has access to a limited number of regulations, 6 in total. The Plus plan allows you to access a total of 10 fully updated regulatory documents."
  },
  {
    question: "What is the level of confidence one can place in career guidance services that adhere to the BeQu quality standards?",
    answer: "BeQu is a set of quality standards developed in Germany for career guidance and counseling. Its purpose is to provide a framework for ensuring that professional guidance services are of high quality. It is important to clarify that BeQu does not replace the professional judgment of an expert consultant in medical device regulations."
  }
];

export default function LandingPage() {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-bequ-white-pattern text-gray-900 selection:bg-blue-600 selection:text-white">
      {/* Superposición semitransparente para legibilidad */}
      <div className="min-h-screen bg-white/70 backdrop-blur-sm">
        {/* Barra de Navegación */}
        <nav className="w-full p-4 sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-300">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <span className="text-xl font-bold tracking-tight text-gray-900">BeQu | Medical Regulations AI Assistant</span>
            <div className="space-x-4 md:space-x-6 flex items-center">
              <button onClick={() => handleScrollTo('features')} className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition duration-150">Features</button>
              <button onClick={() => handleScrollTo('pricing')} className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition duration-150">Pricing</button>
              <button onClick={() => handleScrollTo('faq')} className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition duration-150">FAQ</button>
              <button onClick={navigateToLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium transition duration-150 shadow-md"> Login / Sign Up </button>
            </div>
          </div>
        </nav>

        {/* Sección Hero */}
        <section id="hero" className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Se reemplazó el h1 y p con el nuevo componente de texto animado */}
            <AnimatedText />
            <button onClick={() => handleScrollTo('pricing')} className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-md transition duration-150 shadow-lg mb-16"> Get Started </button>
            <div className="bg-gray-200/80 border border-gray-300 rounded-lg shadow-xl p-4 pt-8 relative max-w-2xl mx-auto text-left text-sm text-gray-900">
              <div className="absolute top-2 left-3 flex space-x-1.5"> <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div> <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div> <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div> </div>
              <div className='space-y-3'>
                <div className="flex justify-end"> <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg rounded-br-none max-w-[70%]"> How can I classify a medical device? </div> </div>
                <div className="flex justify-start"> <div className="bg-white text-gray-900 px-3 py-1.5 rounded-lg rounded-bl-none max-w-[70%]"> To classify a medical device according to MDR (EU) 2017/745, you need to consider its intended purpose... [more details] </div> </div>
                <div className="flex justify-end"> <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg rounded-br-none max-w-[70%]"> What are the classification rules? </div> </div>
                <div className="flex justify-start"> <div className="bg-white text-gray-600 italic px-3 py-1.5 rounded-lg rounded-bl-none max-w-[70%]"> Looking up MDR Annex VIII classification rules... </div> </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Features */}
        <section id="features" className="py-16 md:py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-gray-900">The Compliance Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div className="bg-white/50 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-gray-100/50">
                <BookOpenIcon />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Regulatory Knowledge</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Access updated guidance on official medical regulations. Our AI is trained to interpret complex compliance documents to provide quick, accurate answers.</p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-gray-100/50">
                <CpuIcon />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Advanced AI Processing</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Leverages powerful language models for deep understanding of medical device regulations. Delivers context-aware responses tailored to your specific queries.</p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-gray-100/50">
                <LockIcon />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Security & Privacy</h3>
                <p className="text-gray-700 text-sm leading-relaxed">All data is encrypted and handled in compliance with industry standards. Your sensitive information stays confidential and protected at every step.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Testimonios de Usuarios */}
        <section id="testimonials" className="py-16 md:py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">What Our Users Say</h2>
            <div className="bg-white/60 p-8 rounded-lg backdrop-blur-sm shadow-xl border border-gray-300">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
                <span className="text-4xl font-bold text-blue-600">Easy to use</span>
                <span className="text-2xl text-gray-800">Self-explanatory</span>
                <span className="text-3xl font-semibold text-blue-500">Time-saving</span>
                <span className="text-xl text-blue-700">Easy access</span>
                <span className="text-3xl font-semibold text-gray-800">Clear Answers</span>
                <span className="text-2xl text-blue-500">Simplified regulations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Pricing */}
        <section id="pricing" className="py-16 md:py-20 px-6">
          <div className="max-w-md mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">Simple, Powerful Plan</h2>
              <div className="bg-white/80 rounded-lg shadow-2xl p-8 backdrop-blur-md border border-gray-300 transform transition duration-300 hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-900"> Standard Plan </h3>
                <p className="text-4xl font-bold my-3 text-center text-gray-900">€35 <span className="text-lg font-normal text-gray-700">/ month</span></p>
                <ul className="space-y-3 my-6 text-gray-700 text-sm">
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Access to document information: MDCG 2023-5</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Access to document information: MDCG 2020-3</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Access to document information: IEC 62304:2006</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Access to document information: ISO 13485</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Access to document information: ISO 14971</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Access to document information: Regulation (EU) 2017/745</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Advanced AI Question Answering</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Secure & Private Chats</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Database on local European servers</li>
                   <li className="flex items-center"><span className="text-green-600 mr-2.5">✓</span> Cancel Anytime</li>
                </ul>
                <button onClick={navigateToLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-md transition duration-150 shadow-md"> Subscribe </button>
              </div>
            </div>
        </section>

        {/* Sección FAQ */}
        <section id="faq" className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">Frequently Asked Questions</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">Ready to Get Started?</h2>
              <p className="text-gray-700 mb-6">Create an account or log in to subscribe and access BeQu AI.</p>
              <button onClick={navigateToLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base font-medium transition duration-150 shadow-md"> Login / Sign Up </button>
            </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-6xl mx-auto mt-12 mb-6 pt-6 border-t border-gray-300 text-center text-gray-600 text-sm">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 mb-4">
            <a href="/terms-and-conditions" className="hover:text-gray-900 transition duration-150">Terms and Conditions</a>
            <a href="/privacy-policy" className="hover:text-gray-900 transition duration-150">Privacy Policy</a>
            <a href="/impressum" className="hover:text-gray-900 transition duration-150">Impressum</a>
          </div>
          <p>Powered by BQS GmbH</p>
          <p>&copy; {new Date().getFullYear()} Best Quality Solutions GmbH. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
