'use client';

import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import BeQuChat from './BeQuChat';

export default function Dashboard() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleHistoryDeleted = () => {
        // Incrementa la clave para forzar la recarga del componente BeQuChat
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DashboardSidebar onHistoryDeleted={handleHistoryDeleted} />
            
            {/* Main Content Area */}
            <main className="flex-1 p-8">
                <BeQuChat refreshKey={refreshKey} />
            </main>
        </div>
    );
}