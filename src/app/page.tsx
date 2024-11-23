'use client';

import { useEffect } from 'react';
import { useSwapStore } from '@/store/useSwapStore';
import { useWalletStore } from '@/store/useWalletStore';
import { Toaster } from 'react-hot-toast';

export default function Home() {
    const { initializeApp, refetchBestRoute } = useSwapStore();
    const { refetch: refetchBalance } = useWalletStore();

    // Initialize the app and set up polling
    useEffect(() => {
        let refetchInterval: NodeJS.Timeout;

        const initialize = async () => {
            await initializeApp();
            // Set up polling for price updates
            refetchInterval = setInterval(() => {
                refetchBestRoute();
                refetchBalance();
            }, 10000); // Poll every 10 seconds
        };

        initialize();

        return () => {
            if (refetchInterval) {
                clearInterval(refetchInterval);
            }
        };
    }, []);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h1 className="text-2xl font-bold">Welcome to the Swap App</h1>
                {/* Other components */}
                
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 5000,
                        style: {
                            background: 'var(--background-color)',
                            color: 'var(--text-black-color)',
                        },
                    }}
                />
            </div>
        </div>
    );
}
