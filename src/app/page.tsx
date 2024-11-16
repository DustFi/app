'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';
import { main } from '@/lib/test'; 

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';
import { NuqsAdapter } from "nuqs/adapters/react-router";
import 'dotenv/config'

import tonSvg from './_assets/ton.svg';

export default function Home() {
  const t = useTranslations('i18n');

  main();

  return (
    <div className='min-h-screen'>
      Hello
    </div>
  );
}
