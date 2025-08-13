'use client';

import React from 'react';
import LogoutButton from './LogoutButton';
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiLoader, FiSettings } from 'react-icons/fi'; // AÑADIDO: FiSettings importado

// --- DEFINE PROPS TYPE FOR SidebarItem ---
type SidebarItemProps = {
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
};

// Reusable Sidebar Item component
const SidebarItem = ({
  onClick,
  disabled,
  icon,
  children,
  isLoading
}: SidebarItemProps) => (
    <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`flex items-center w-full space-x-3 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
                    ${disabled || isLoading ? 'text-blue-300/50 cursor-not-allowed' : 'text-blue-100 hover:bg-white/10 hover:text-white focus:outline-none focus:bg-white/10 focus:text-white'}
                  `}
    >
        {isLoading ? <FiLoader className="animate-spin h-4 w-4" /> : icon}
        <span>{children}</span>
    </button>
);
// --- END SidebarItem DEFINITION ---


// Props for the main DashboardSidebar component (updated)
interface DashboardSidebarProps {
  userEmail: string;
  isSubscriptionActive: boolean;
  isLoadingSubscription: boolean;
  onRefresh: () => void;
  // AÑADIDO: Propiedades para la gestión de suscripciones
  onManageSubscriptionClick: () => void;
  isLoadingPortal: boolean;
}

// Main component function (updated)
export default function DashboardSidebar({
  userEmail,
  isSubscriptionActive,
  isLoadingSubscription,
  onRefresh,
  // AÑADIDO: Destructuración de nuevas props
  onManageSubscriptionClick,
  isLoadingPortal,
}: DashboardSidebarProps) {

  return (
    <div className="w-64 flex-shrink-0 bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-4 flex flex-col">
       {/* ... Top Section with Title and Email ... */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-1">BeQu AI</h1>
          <p className="text-xs text-blue-300 text-center truncate" title={userEmail}>{userEmail}</p>
        </div>

      {/* ... Navigation/Actions using SidebarItem ... */}
       <nav className="flex-grow space-y-2">
          {/* Status Display */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${isSubscriptionActive ? 'bg-green-500/20 text-green-300' : 'bg-orange-500/20 text-orange-300'}`}>
              {isLoadingSubscription ? <FiLoader className="animate-spin h-4 w-4"/> : (isSubscriptionActive ? <FiCheckCircle className="h-4 w-4" /> : <FiXCircle className="h-4 w-4" />)}
              <span>Status: {isLoadingSubscription ? 'Checking...' : (isSubscriptionActive ? 'Active' : 'Inactive')}</span>
          </div>
          {/* Refresh Button */}
          <SidebarItem onClick={onRefresh} disabled={isLoadingSubscription} icon={<FiRefreshCw className="h-4 w-4"/>} isLoading={isLoadingSubscription}> Refresh Status </SidebarItem>
          {/* AÑADIDO: Botón para gestionar la suscripción */}
          {isSubscriptionActive && ( // Solo muestra el botón si hay una suscripción activa
            <SidebarItem
                onClick={onManageSubscriptionClick}
                disabled={isLoadingPortal} // Deshabilitar si el portal está cargando
                icon={<FiSettings className="h-4 w-4"/>}
                isLoading={isLoadingPortal} // Mostrar loader si está cargando
            >
                Manage Subscription
            </SidebarItem>
          )}
       </nav>

       {/* ... Logout Button section remains the same ... */}
       <div className='w-full mt-4 border-t border-white/10 pt-4'>
           <LogoutButton className="flex items-center w-full space-x-3 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out bg-transparent text-blue-100 hover:bg-red-800/50 hover:text-white focus:outline-none focus:bg-red-800/50 focus:text-white" />
       </div>
    </div>
  );
}