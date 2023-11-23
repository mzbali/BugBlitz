import { Metadata } from 'next';
import React from 'react';

import '@/styles/globals.css';

import Container from '@/components/Container';
import NavBar from '@/components/NavBar';

import { siteConfig } from '@/constant/config';

// Metadata is used for SEO
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: '@mz_bali',
  },
  authors: [
    {
      name: 'Mahmud Bali',
      url: 'https://mzbali.com',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className='bg-slate-200 dark:bg-slate-900'>
        <NavBar />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
