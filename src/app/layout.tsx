import './globals.css';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import ClientLayout from "../components/Provider";

export const metadata: Metadata = {
  title: 'DustFi',
  description: 'DeFi platform on top of DeDust Protocol for Ton',
};

// Server Component
export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <div className='bg-gradient-to-tl from-gray-900 via-[#ff7b24] to-black'>
            <Root>
              <ClientLayout>
                {children}
              </ClientLayout>
            </Root>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}