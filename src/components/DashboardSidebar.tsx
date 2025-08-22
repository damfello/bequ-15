// src/components/DashboardSidebar.tsx
'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import LogoutButton from './LogoutButton';

// SVG for universal trash can icon
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.84 48.84 0 0 1 3.205 1.343a48.964 48.964 0 0 0-3.205-1.343Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M2.25 4.5a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v.227c-.381.085-.768.172-1.16.264a.784.784 0 0 0-.174.032l-.004.004a48.749 48.749 0 0 0-8.902 2.654l-.004.002-.002.001A.762.762 0 0 0 9 6.845v1.3a1.5 1.5 0 0 1-1.5 1.5H7.5a1.5 1.5 0 0 1-1.5-1.5v-1.3a.762.762 0 0 0-.012-.132h-.002a48.785 48.785 0 0 0-8.902-2.654c-.03-.01-.06-.017-.091-.027-.392-.092-.78-.179-1.161-.265V4.5Zm-1.5 2a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H4.5a3 3 0 0 1-3-3V6.5Zm3 3.75a1.5 1.5 0 0 0 0 3H19.5a1.5 1.5 0 0 0 0-3H4.5Z" clipRule="evenodd" />
    <path d="M12 18a1.5 1.5 0 0 1 1.5-1.5h.75a.75.75 0 0 0 0-1.5h-1.5A1.5 1.5 0 0 1 12 15a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 3 0v3A1.5 1.5 0 0 1 12 18Zm-.75-7.5a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5h-.75ZM15 15a1.5 1.5 0 0 1 1.5-1.5h.75a.75.75 0 0 0 0-1.5h-1.5A1.5 1.5 0 0 1 15 12a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-1.5 1.5Z" />
  </svg>
);

interface DashboardSidebarProps {
    onHistoryDeleted: () => void;
    session: Session;
    onSubscriptionManage: () => void;
}

export default function DashboardSidebar({ onHistoryDeleted, session, onSubscriptionManage }: DashboardSidebarProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const userEmail = session?.user?.email || 'Unknown User';

    const handleDeleteHistory = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar todo tu historial de conversaciones? Esta acción es irreversible.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.access_token) {
                throw new Error('No active session found.');
            }

            const response = await fetch('/api/chat', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            onHistoryDeleted();

        } catch (error) {
            console.error('Error deleting chat history:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <aside className="w-64 bg-gray-900 text-white p-4 space-y-4 relative">
            <h1 className="text-xl font-bold mb-4 text-blue-400">BeQu</h1>
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">DA</span>
                </div>
                <div>
                    <div className="text-sm font-semibold">{userEmail}</div>
                    <div className="text-xs text-gray-400">Status: Active</div>
                </div>
            </div>
            
            <hr className="border-gray-700" />

            <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 p-2 rounded-md bg-gray-800">
                    <span className="text-green-400">●</span>
                    <span>Status: Active</span>
                </div>
                
                <button
                    onClick={onSubscriptionManage}
                    className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 12h19.5m-16.5 3.75h16.5M7.5 19.5h9" />
                    </svg>
                    <span>Manage Subscription</span>
                </button>
                
                <button
                    onClick={handleDeleteHistory}
                    disabled={isDeleting}
                    className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition flex items-center space-x-2 text-red-400 disabled:opacity-50"
                >
                    <DeleteIcon />
                    <span>{isDeleting ? 'Deleting...' : 'Delete History'}</span>
                </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <LogoutButton className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition flex items-center space-x-2" />
            </div>
        </aside>
    );
}
