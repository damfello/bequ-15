'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout button clicked. Attempting signOut..."); // Log start
    const { error } = await supabase.auth.signOut();

    if (!error) {
      console.log("Supabase signOut successful. Refreshing router..."); // Log success before refresh
      // Refresh the current route. This should trigger session check in page.tsx
      router.refresh();
      // If router.refresh() doesn't reliably update, uncommenting router.push might be needed later
      // console.log("Forcing navigation to /");
      // router.push('/');
    } else {
      console.error('Error logging out from Supabase:', error); // Log Supabase error
      alert(`Error logging out: ${error.message}`);
    }
  };

  // Keep the rest of the component the same
  return (
    <button
      onClick={handleLogout}
      className={className || "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"}
    >
      Log Out
    </button>
  );
}