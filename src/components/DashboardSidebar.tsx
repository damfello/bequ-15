'use client';

import React from 'react';
import LogoutButton from './LogoutButton';
import { FiRefreshCw, FiSettings, FiCheckCircle, FiXCircle, FiLoader, FiLogOut } from 'react-icons/fi';

// Define the props the sidebar will accept
interface DashboardSidebarProps {
  userEmail: string;
  isSubscriptionActive: boolean;
  isLoadingSubscription: boolean; // Make sure this is included in props interface
  isLoadingPortal: boolean;
  onRefresh: () => void;
  onManageSubscription: () => void;
}

// Reusable Sidebar Item component for consistent styling
// (Keep this component definition as it was)
const SidebarItem = ({ onClick, disabled, icon, children, isLoading }: { onClick?: () => void, disabled?: boolean, icon: React.ReactNode, children: React.ReactNode, isLoading?: boolean }) => (
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


// Main component function - ENSURE ALL PROPS ARE DESTRUCTURED HERE
export default function DashboardSidebar({
  userEmail,              // Included
  isSubscriptionActive,   // Included
  isLoadingSubscription,  // Included - Make sure this matches!
  isLoadingPortal,        // Included
  onRefresh,              // Included
  onManageSubscription,   // Included
}: DashboardSidebarProps) {

  return (
    <div className="w-64 flex-shrink-0 bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-4 flex flex-col">
      {/* Top Section */}
      <div className="mb-6">
         <h1 className="text-2xl font-bold text-center mb-1">BeQu AI</h1>
      </div>

      {/* Navigation/Actions */}
      <nav className="flex-grow space-y-2">
        {/* Status Display - Uses isLoadingSubscription */}
         <div className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${isSubscriptionActive ? 'bg-green-500/20 text-green-300' : 'bg-orange-500/20 text-orange-300'}`}>
             {isLoadingSubscription ? <FiLoader className="animate-spin h-4 w-4"/> : (isSubscriptionActive ? <FiCheckCircle className="h-4 w-4" /> : <FiXCircle className="h-4 w-4" />)}
             <span>Status: {isLoadingSubscription ? 'Checking...' : (isSubscriptionActive ? 'Active' : 'Inactive')}</span>
         </div>

        {/* Refresh Button - Uses isLoadingSubscription */}
        <SidebarItem onClick={onRefresh} disabled={isLoadingSubscription} icon={<FiRefreshCw className="h-4 w-4"/>} isLoading={isLoadingSubscription}>
            Refresh Status
        </SidebarItem>

        {/* Manage Subscription Button - Uses isLoadingPortal */}
        {isSubscriptionActive && (
          <SidebarItem onClick={onManageSubscription} disabled={isLoadingPortal} icon={<FiSettings className="h-4 w-4"/>} isLoading={isLoadingPortal}>
            Manage Subscription
          </SidebarItem>
        )}
      </nav>

      {/* Logout Button at bottom */}
      <div className='w-full mt-4 border-t border-white/10 pt-4'>
           <LogoutButton className="flex items-center w-full space-x-3 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out bg-transparent text-blue-100 hover:bg-red-800/50 hover:text-white focus:outline-none focus:bg-red-800/50 focus:text-white" />
      </div>
    </div>
  );
}