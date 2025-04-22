'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// No AuthUI import needed here
import { FiBookOpen, FiCpu, FiLock } from 'react-icons/fi';

export default function LandingPage() {
  const router = useRouter();

  // Scroll function
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Navigate function. New Comment
  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="w-full p-4 sticky top-0 z-50 bg-blue-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">BeQu AI</span>
          <div className="space-x-4 md:space-x-6 flex items-center">
            <button onClick={() => handleScrollTo('features')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">Features</button>
            <button onClick={() => handleScrollTo('pricing')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">Pricing</button>
            <button onClick={navigateToLogin} className="bg-white text-blue-900 px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium hover:bg-blue-100 transition duration-150 shadow"> Login / Sign Up </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hook Phrase */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
            Your AI Assistant for MedTech Compliance.
          </h1>
          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
             Get instant clarity on medical device regulations. BeQu interprets complex compliance documents to provide quick, accurate answers tailored to your needs.
          </p>
          {/* CTA Button */}
          <button onClick={() => handleScrollTo('pricing')} className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-md transition duration-150 shadow-lg mb-16"> View Plan Details </button>
          {/* Chat Preview Placeholder */}
          <div className="bg-gray-900/60 border border-blue-700/50 rounded-lg shadow-xl p-4 pt-8 relative max-w-2xl mx-auto text-left text-sm">
             <div className="absolute top-2 left-3 flex space-x-1.5"> <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div> <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div> <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div> </div>
             <div className='space-y-3'>
                 <div className="flex justify-end"> <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg rounded-br-none max-w-[70%]"> How Can I classify a Medical device? </div> </div>
                 <div className="flex justify-start"> <div className="bg-gray-700 text-blue-100 px-3 py-1.5 rounded-lg rounded-bl-none max-w-[70%]"> To classify a medical device according to MDR (EU) 2017/745, you need to consider its intended purpose... [more details] </div> </div>
                 <div className="flex justify-end"> <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg rounded-br-none max-w-[70%]"> What are the rules for classifying? </div> </div>
                 <div className="flex justify-start"> <div className="bg-gray-700 text-blue-300 italic px-3 py-1.5 rounded-lg rounded-bl-none max-w-[70%]"> Looking up MDR Annex VIII classification rules... </div> </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">The Compliance Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Feature 1 */}
            <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
               <FiBookOpen className="text-blue-400 text-4xl mb-4 mx-auto"/>
               <h3 className="text-xl font-semibold mb-2">Regulatory Knowledge</h3>
               <p className="text-blue-200 text-sm leading-relaxed">Access up-to-date guidance from FDA and MDR regulations. Our AI is trained to interpret complex compliance documents for quick, accurate answers.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
               <FiCpu className="text-blue-400 text-4xl mb-4 mx-auto"/>
               <h3 className="text-xl font-semibold mb-2">Advanced AI Processing</h3>
               <p className="text-blue-200 text-sm leading-relaxed">Leverages powerful language models for deep understanding of medical device regulations. Delivers context-aware responses tailored to your specific queries.</p>
             </div>
            {/* Feature 3 */}
            <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
               <FiLock className="text-blue-400 text-4xl mb-4 mx-auto"/>
               <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
               <p className="text-blue-200 text-sm leading-relaxed">All data is encrypted and handled in compliance with industry standards. Your sensitive information stays confidential and protected at every step.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 px-6">
         <div className="max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Simple, Powerful Plan</h2>
            {/* Pricing Card */}
            <div className="bg-gray-900/80 rounded-lg shadow-2xl p-8 backdrop-blur-md border border-gray-700 transform transition duration-300 hover:scale-[1.02]">
               <h3 className="text-xl font-semibold mb-2 text-center text-blue-100">Monthly Standard</h3>
               <p className="text-4xl font-bold my-3 text-center text-white">€35 <span className="text-lg font-normal text-blue-200">/ month</span></p>
               <ul className="space-y-3 my-6 text-blue-100 text-sm">
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Access to FDA/MDR Knowledge Base</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Advanced AI Question Answering</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Secure & Private Chats</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2.5">✓</span> Cancel Anytime</li>
               </ul>
               <button onClick={navigateToLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-md transition duration-150 shadow-md"> Sign Up to Subscribe </button>
            </div>
         </div>
      </section>

      {/* Authentication Section (Final CTA) */}
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