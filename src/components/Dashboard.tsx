'use client';

import React, { useState, useEffect, useCallback } from 'react'; // Ensure useCallback is imported
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import BeQuChat from '@/components/BeQuChat';
import { loadStripe } from '@stripe/stripe-js';
import DashboardSidebar from './DashboardSidebar';

type Subscription = {
  stripe_subscription_status: string | null;
} | null;

interface DashboardProps {
  session: Session;
}

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) { console.error("Stripe Publishable Key is not set"); }
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;


export default function Dashboard({ session }: DashboardProps) {
  const [subscription, setSubscription] = useState<Subscription>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);

  const fetchSubscription = useCallback(async () => {
      if (session?.user) {
          setLoadingSubscription(true);
          try {
              const { data, error } = await supabase.from('subscriptions').select('stripe_subscription_status').eq('user_id', session.user.id).in('stripe_subscription_status', ['active', 'trialing']).maybeSingle();
              if (error) { throw error; }
              setSubscription(data);
          } catch (error) { console.error("Dashboard: Subscription fetch failed:", error); setSubscription(null); }
          finally { setLoadingSubscription(false); }
      } else { setSubscription(null); setLoadingSubscription(false); }
  }, [session]); // Depends on session

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]); // Depends on fetchSubscription (which depends on session)

  const handleSubscription = useCallback(async () => {
     // Using useCallback here too for consistency, although not passed as prop
     if (!session?.access_token || !stripePromise) { console.error("User session/token missing or Stripe not loaded."); alert("Error: Could not initiate subscription."); return; }
     setIsSubscribing(true);
     try {
         const response = await fetch('/api/checkout_sessions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}`}});
         if (!response.ok) { const errorText = await response.text(); if (response.status === 401) { throw new Error(`Authentication failed: ${errorText}. Please try logging out and back in.`); } throw new Error(errorText || `API Error: ${response.statusText}`);}
         const { sessionId } = await response.json();
         if (!sessionId) { throw new Error('Could not retrieve Checkout Session ID from API.'); }
         const stripe = await stripePromise;
         if (!stripe) { throw new Error('Stripe.js failed to load.'); }
         const { error } = await stripe.redirectToCheckout({ sessionId });
         if (error) { console.error('Stripe redirectToCheckout error:', error); alert(`Error redirecting to payment: ${error.message}`);}
     } catch (error) { console.error('Subscription process error:', error); const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.'; alert(`Subscription Error: ${errorMessage}`);} finally { setIsSubscribing(false); }
  }, [session, stripePromise]); // Added stripePromise to dependencies

   // Wrap handleRefresh in useCallback
   const handleRefresh = useCallback(() => {
      console.log("Dashboard: Manual refresh triggered");
      fetchSubscription(); // Depends on fetchSubscription
   }, [fetchSubscription]);

   // Wrap handleManageSubscription in useCallback
   const handleManageSubscription = useCallback(async () => {
      if (!session?.access_token) { alert("Could not verify user session. Please log in again."); return; }
      setIsPortalLoading(true);
      try {
          const response = await fetch('/api/portal_sessions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}`, }});
          if (!response.ok) { const errorText = await response.text(); throw new Error(errorText || `API Error: ${response.statusText}`);}
          const data = await response.json();
          if (!data?.portalUrl) { throw new Error('Could not retrieve customer portal URL.');}
          window.location.href = data.portalUrl;
      } catch (error) { console.error('Error redirecting to customer portal:', error); const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.'; alert(`Error managing subscription: ${errorMessage}`); setIsPortalLoading(false); }
   }, [session]); // Depends on session

  const isActiveSubscriber = !!subscription;

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar
        userEmail={session.user.email!}
        isSubscriptionActive={isActiveSubscriber}
        isLoadingSubscription={loadingSubscription}
        isLoadingPortal={isPortalLoading}
        onRefresh={handleRefresh} // Pass stable reference
        onManageSubscription={handleManageSubscription} // Pass stable reference
      />
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="bg-white border rounded-lg shadow p-6 min-h-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">BeQu AI Assistant</h1>
          {loadingSubscription ? ( <p className="text-gray-500">Checking subscription...</p> )
           : isActiveSubscriber ? ( <BeQuChat /> )
           : ( /* Inactive View */
             <div className='text-center max-w-lg mx-auto'>
                <p className="text-orange-600 font-medium mb-4 text-lg">Status: Inactive</p>
                 <p className="text-md text-gray-700 mb-4">Please subscribe to access the BeQu AI Assistant.</p>
                <p className="text-lg font-semibold text-gray-800 mb-2">Monthly Standard Plan: €20 / month</p>
                <button onClick={handleSubscription} disabled={isSubscribing} className={`mt-4 w-full max-w-xs mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${ isSubscribing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}> {isSubscribing ? 'Processing...' : 'Subscribe Now'} </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}