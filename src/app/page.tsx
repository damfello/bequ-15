import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthUI from '@/components/AuthUI';
import Dashboard from '@/components/Dashboard';

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <div className="w-full flex flex-col items-center">
            {session ? (
                <>
                    {console.log("HomePage Render: Rendering Dashboard.")}
                    <Dashboard session={session} />
                </>
            ) : (
                <>
                    {console.log("HomePage Render: Rendering AuthUI.")}
                    <AuthUI />
                </>
            )}
        </div>
    );
}