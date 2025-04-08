'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Keep useRouter
// Removed AuthUI import
import { FiBookOpen, FiCpu, FiLock } from 'react-icons/fi';

export default function LandingPage() {
  const router = useRouter(); // Keep router

  // REMOVED unused scrollToSection function
  // REMOVED unused navigateToLogin function

  // Define inline scroll function for simplicity
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar - Use direct calls in onClick */}
      <nav className="w-full p-4 sticky top-0 z-50 bg-blue-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">BeQu AI</span>
          <div className="space-x-4 md:space-x-6 flex items-center">
            {/* Use inline function for scroll */}
            <button onClick={() => handleScrollTo('features')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">Features</button>
            <button onClick={() => handleScrollTo('pricing')} className="text-sm md:text-base text-blue-200 hover:text-white transition duration-150">Pricing</button>
            {/* Use inline function for navigation */}
            <button onClick={() => router.push('/login')} className="bg-white text-blue-900 px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base font-medium hover:bg-blue-100 transition duration-150 shadow"> Login / Sign Up </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Use inline function for scroll */}
      <section id="hero" className="py-16 md:py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           {/* ... headline/sub-headline/preview ... */}
           <button onClick={() => handleScrollTo('pricing')} className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-md transition duration-150 shadow-lg mb-16"> View Plan Details </button>
           {/* ... rest of hero ... */}
        </div>
      </section>

       {/* Features Section (Corrected 'is' typo) */}
       <section id="features" className="py-16 md:py-20 px-6 bg-white/5">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">The Compliance Advantage</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {/* Feature 1 */}
                <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
                   <FiBookOpen className="text-blue-400 text-4xl mb-4 mx-auto"/>
                   <h3 className="text-xl font-semibold mb-2">Regulatory Knowledge</h3>
                   <p className="text-blue-200 text-sm leading-relaxed">Access up-to-date guidance from FDA and MDR regulations. Our AI **is** trained to interpret complex compliance documents for quick, accurate answers.</p>
                </div>
                {/* Feature 2 & 3 ... */}
                 <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
                    <FiCpu className="text-blue-400 text-4xl mb-4 mx-auto"/> <h3 className="text-xl font-semibold mb-2">Advanced AI Processing</h3> <p className="text-blue-200 text-sm leading-relaxed">Leverages powerful language models for deep understanding of medical device regulations. Delivers context-aware responses tailored to your specific queries.</p>
                 </div>
                 <div className="bg-white/10 p-6 rounded-lg text-center backdrop-blur-sm transform transition duration-300 hover:scale-105 hover:bg-white/15">
                    <FiLock className="text-blue-400 text-4xl mb-4 mx-auto"/> <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3> <p className="text-blue-200 text-sm leading-relaxed">All data is encrypted and handled in compliance with industry standards. Your sensitive information stays confidential and protected at every step.</p>
                  </div>
              </div>
            </div>
          </section>

      {/* Pricing Section - Use inline function for navigation */}
       <section id="pricing" className="py-16 md:py-20 px-6">
          <div className="max-w-md mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Simple, Powerful Plan</h2>
             <div className="bg-gray-900/80 rounded-lg shadow-2xl p-8 backdrop-blur-md border border-gray-700 transform transition duration-300 hover:scale-[1.02]">
                 {/* ... card content ... */}
                 <button onClick={() => router.push('/login')} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-md transition duration-150 shadow-md"> Sign Up to Subscribe </button>
             </div>
          </div>
       </section>

      {/* Authentication Section (Final CTA) - Use inline function for navigation */}
      <section id="auth" className="py-16 md:py-20 px-6">
           <div className="max-w-md mx-auto text-center">
               <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Ready to Get Started?</h2>
               <p className="text-blue-200 mb-6">Create an account or log in to subscribe and access BeQu AI.</p>
               <button onClick={() => router.push('/login')} className="bg-white text-blue-900 px-6 py-3 rounded-md text-base font-medium hover:bg-blue-100 transition duration-150 shadow"> Login / Sign Up </button>
           </div>
      </section>

      {/* Footer */}
      <footer> {/* ... */} </footer>
    </div>
  );
}