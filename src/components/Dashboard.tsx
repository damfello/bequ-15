'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardSidebar from './DashboardSidebar';
import BeQuChat from './BeQuChat';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

interface DashboardProps {
    session: Session;
}

export default function Dashboard({ session }: DashboardProps) {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isActiveSubscriber, setIsActiveSubscriber] = useState(false);
    const [loadingSubscription, setLoadingSubscription] = useState(true);
    const [isSubscribing, setIsSubscribing] = useState(false);

    // Función para verificar el estado de la suscripción
    const checkSubscriptionStatus = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('subscriptions')
                .select('stripe_subscription_status')
                .eq('user_id', session.user.id)
                .in('stripe_subscription_status', ['active', 'trialing'])
                .maybeSingle();

            if (error) throw error;

            setIsActiveSubscriber(!!data);
        } catch (error) {
            console.error('Error checking subscription status:', error);
            setIsActiveSubscriber(false);
        } finally {
            setLoadingSubscription(false);
        }
    }, [session.user.id]); // FIX: Added session.user.id to dependency array

    useEffect(() => {
        if (session) {
            checkSubscriptionStatus();
        }
    }, [session, checkSubscriptionStatus]);

    const handleHistoryDeleted = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    // Función para manejar la suscripción (ejemplo conceptual)
    const handleSubscription = async () => {
        setIsSubscribing(true);
        // ... (Tu lógica de suscripción con Stripe)
        console.log('Redirecting to Stripe checkout...');
        setIsSubscribing(false);
    };

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
            <DashboardSidebar onHistoryDeleted={handleHistoryDeleted} session={session} />
            
            <div className="flex flex-col flex-1">
                {/* Header (opcional) */}
                <header className="p-4 bg-white shadow-sm flex items-center justify-between">
                    <h2 className="text-xl font-bold">BeQu AI Assistant</h2>
                </header>
                
                {/* Main Content Area */}
                <div className="p-8 flex-grow overflow-auto">
                    {loadingSubscription ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Checking subscription...</p>
                        </div>
                    ) : isActiveSubscriber ? (
                        <BeQuChat refreshKey={refreshKey} session={session} /> // FIX: Pasamos las props aquí
                    ) : (
                        <div className='flex flex-col items-center justify-center text-center h-full max-w-lg mx-auto space-y-4'>
                            <p className="text-2xl font-semibold text-gray-700">Get access to BeQu Assistant</p>
                            <p className="text-gray-500">
                                To use the chat, you need an active subscription.
                                Start your journey to simplify medical regulations.
                            </p>
                            <button
                                onClick={handleSubscription}
                                disabled={isSubscribing}
                                className={`mt-4 w-full max-w-xs mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${
                                    isSubscribing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            >
                                {isSubscribing ? 'Processing...' : 'Subscribe Now'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}