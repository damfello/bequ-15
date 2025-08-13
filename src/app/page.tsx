'use client';

import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    console.log("HomePage Effect: Mounting. Initial loadingSession:", true);
    setLoadingSession(true);

    // Initial session fetch
    console.log("HomePage Effect: Calling getSession...");
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("HomePage Effect: getSession resolved. Session:", currentSession);
      setSession(currentSession);
      setLoadingSession(false);
      console.log("HomePage Effect: State updated after getSession. loadingSession:", false);
    });

    // Listen for auth state changes
    console.log("HomePage Effect: Setting up onAuthStateChange listener.");
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      console.log("HomePage Effect: onAuthStateChange fired. Event:", _event, " New Session:", currentSession);
      setSession(currentSession);
      // Ensure loading is false if an auth change happens quickly
      setLoadingSession(false);
       console.log("HomePage Effect: State updated after onAuthStateChange. loadingSession:", false);
    });

    // Cleanup listener
    return () => {
      console.log("HomePage Effect: Unmounting. Unsubscribing auth listener.");
      authListener?.subscription.unsubscribe();
    };
  }, []); // Runs once on mount

  console.log("HomePage Render: Current state - loadingSession:", loadingSession, "session:", session);

  // Render Loading state
  if (loadingSession) {
    console.log("HomePage Render: Rendering Loading Indicator.");
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // Render LandingPage or Dashboard based on session
  console.log("HomePage Render: Rendering based on session state.");
  return (
    <div>
      {session ? (
         <>
           {console.log("HomePage Render: Rendering Dashboard.")}
           <Dashboard session={session} />
         </>
       ) : (
         <>
            {console.log("HomePage Render: Rendering LandingPage.")}
            <LandingPage />
         </>
       )}
    </div>
  );
}