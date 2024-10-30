import './globals.css'
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { Root } from '@/components/Root/Root';
import { I18nProvider } from '@/core/i18n/provider';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import Navbar from "../components/navigation/navbar";

export const metadata: Metadata = {
  title: 'DustFi',
  description: 'DeFi platform on top of DeDust Protocol for Ton',
};


export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <Root>
            <Navbar />
            {children}
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}
