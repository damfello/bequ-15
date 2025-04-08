'use client';

import React from 'react';
import LogoutButton from './LogoutButton';
import { FiRefreshCw, FiSettings, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi'; // Removed unused FiLogOut

// --- DEFINE PROPS TYPE FOR SidebarItem ---
type SidebarItemProps = {
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
};

// Reusable Sidebar Item component - Uses the separate type now
const SidebarItem = ({
  onClick,
  disabled,
  icon,
  children,
  isLoading
}: SidebarItemProps) => ( // <-- Use SidebarItemProps here
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


// Props for the main DashboardSidebar component (no changes here)
interface DashboardSidebarProps {
  userEmail: string;
  isSubscriptionActive: boolean;
  isLoadingSubscription: boolean;
  isLoadingPortal: boolean;
  onRefresh: () => void;
  onManageSubscription: () => void;
}

// Main component function (no changes here)
export default function DashboardSidebar({
  userEmail,
  isSubscriptionActive,
  isLoadingSubscription,
  isLoadingPortal,
  onRefresh,
  onManageSubscription,
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
          {/* Manage Subscription Button */}
          {isSubscriptionActive && ( <SidebarItem onClick={onManageSubscription} disabled={isLoadingPortal} icon={<FiSettings className="h-4 w-4"/>} isLoading={isLoadingPortal}> Manage Subscription </SidebarItem> )}
       </nav>

       {/* ... Logout Button section remains the same ... */}
       <div className='w-full mt-4 border-t border-white/10 pt-4'>
           <LogoutButton className="flex items-center w-full space-x-3 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out bg-transparent text-blue-100 hover:bg-red-800/50 hover:text-white focus:outline-none focus:bg-red-800/50 focus:text-white" />
       </div>
    </div>
  );
}