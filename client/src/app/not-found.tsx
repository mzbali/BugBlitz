import { Metadata } from 'next';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import UnderlineLink from '@/components/ui/links/UnderlineLink';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <section>
      <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black dark:text-slate-300'>
        <RiAlarmWarningFill
          size={60}
          className='drop-shadow-glow animate-flicker text-red-500'
        />
        <h1 className=' mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
        <UnderlineLink href='/'>Back to home</UnderlineLink>
      </div>
    </section>
  );
}
