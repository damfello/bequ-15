'use client';

import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import BeQuChat from './BeQuChat';
import { Session } from '@supabase/supabase-js';

// Define las propiedades que Dashboard espera recibir
interface DashboardProps {
    session: Session;
}

export default function Dashboard({ session }: DashboardProps) {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleHistoryDeleted = () => {
        // Incrementa la clave para forzar la recarga del componente BeQuChat
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DashboardSidebar 
                onHistoryDeleted={handleHistoryDeleted} 
                session={session} 
            />
            
            {/* Main Content Area */}
            <main className="flex-1 p-8">
                <BeQuChat refreshKey={refreshKey} session={session} />
            </main>
        </div>
    );
}