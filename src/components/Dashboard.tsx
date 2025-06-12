'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import BeQuChat from '@/components/BeQuChat';
import { loadStripe } from '@stripe/stripe-js';
import DashboardSidebar from './DashboardSidebar';

type Subscription = { stripe_subscription_status: string | null; } | null;
interface DashboardProps { session: Session; }

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) { console.error("Stripe Publishable Key is not set"); }
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function Dashboard({ session }: DashboardProps) {
    const [subscription, setSubscription] = useState<Subscription>(null);
    const [loadingSubscription, setLoadingSubscription] = useState(true);
    const [isSubscribing, setIsSubscribing] = useState(false);
    // const [isPortalLoading, setIsPortalLoading] = useState(false); // REMOVED

    const fetchSubscription = useCallback(async () => {
        if (session?.user) {
            setLoadingSubscription(true);
            try {
                const { data, error } = await supabase
                    .from('subscriptions')
                    .select('stripe_subscription_status')
                    .eq('user_id', session.user.id)
                    .in('stripe_subscription_status', ['active', 'trialing'])
                    .maybeSingle();
                if (error) { throw error; }
                setSubscription(data);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                console.error("Dashboard: Subscription fetch failed:", message);
                setSubscription(null);
            } finally {
                setLoadingSubscription(false);
            }
        } else {
            setSubscription(null);
            setLoadingSubscription(false);
        }
    }, [session?.user?.id]);

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    const handleSubscription = useCallback(async () => {
        if (!session?.access_token || !stripePromise) { console.error("User session/token missing or Stripe not loaded."); alert("Error: Could not initiate subscription."); return; }
        setIsSubscribing(true);
        try {
            const response = await fetch('/api/checkout_sessions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}`}});
            if (!response.ok) { const errorText = await response.text(); if (response.status === 401) { throw new Error(`Authentication failed: ${errorText}. Please try logging out and back in.`); } throw new Error(errorText || `API Error: ${response.statusText}`);}
            const { sessionId } = await response.json();
            if (!sessionId) { throw new Error('Could not retrieve Checkout Session ID from API.'); }

            const stripe = await stripePromise;
            if (!stripe) {
               console.error('Stripe.js failed to load. Check NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.');
               alert('Error initiating payment processor. Please try again later.');
               setIsSubscribing(false);
               return;
            }

            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) { console.error('Stripe redirectToCheckout error:', error); alert(`Error redirecting to payment: ${error.message}`);}
        } catch (error) {
            console.error('Subscription process error:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
            alert(`Subscription Error: ${errorMessage}`);
        } finally {
             setIsSubscribing(false);
        }
    }, [session?.access_token]);

     const handleRefresh = useCallback(() => {
         fetchSubscription();
     }, [fetchSubscription]);

     // handleManageSubscription function REMOVED

    const isActiveSubscriber = !!subscription;

    return (
        <div className="flex h-screen bg-gray-100">
          <DashboardSidebar
            userEmail={session.user.email!}
            isSubscriptionActive={isActiveSubscriber}
            isLoadingSubscription={loadingSubscription}
            onRefresh={handleRefresh}
            // Props related to managing subscription have been removed
          />
          <div className="flex-grow p-6 lg:p-8 overflow-y-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 lg:p-8 min-h-full flex flex-col">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">BeQu AI Assistant</h1>
              <div className="flex-grow">
                {loadingSubscription ? ( <div className="flex items-center justify-center h-full"><p className="text-gray-500">Checking subscription...</p></div> )
                 : isActiveSubscriber ? ( <BeQuChat /> )
                 : ( <div className='flex flex-col items-center justify-center text-center h-full max-w-lg mx-auto space-y-4'> <button onClick={handleSubscription} disabled={isSubscribing} className={`mt-4 w-full max-w-xs mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${ isSubscribing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}> {isSubscribing ? 'Processing...' : 'Subscribe Now'} </button> </div> )}
              </div>
            </div>
          </div>
        </div>
      );
}