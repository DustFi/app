'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';
import { main } from '@/lib/test'; 
import { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useSwapStore } from '@/store/useSwapStore';
import { useWalletStore } from '@/store/useWalletStore';
import { useOptionsStore } from '@/store/useOptionsStore';
import { SwapCard } from '@/components/Swap/SwapCard';
import { SwapDetails } from '@/components/SwapDetails';
import { SwapButton } from '@/components/SwapButton';
import { Card } from '@/components/ui/card';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';


import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';
import { NuqsAdapter } from "nuqs/adapters/react-router";
import 'dotenv/config'

import tonSvg from './_assets/ton.svg';

export default function Home() {
  const t = useTranslations('i18n');

  // main();

  const { initializeApp, refetchBestRoute } = useSwapStore();
  const { refetch: refetchBalance } = useWalletStore();
  const { options } = useOptionsStore();

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
    <ErrorBoundary
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Card className="p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-red-500 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600">
              Please refresh the page and try again.
            </p>
          </Card>
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Swap Tokens</h1>
            <TonConnectButton />
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <SwapCard />
            {options.ui_preferences?.show_swap_details && <SwapDetails />}
            <SwapButton />
          </div>

          {/* Footer */}
          {!options.ui_preferences?.disable_provided_text && (
            <div className="mt-8 text-center text-sm text-gray-500">
              Service provided by{' '}
              <a
                href="https://mytonswap.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                MyTonSwap
              </a>
            </div>
          )}
        </div>

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
    </ErrorBoundary>
  );
}
