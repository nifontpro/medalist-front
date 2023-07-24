import MainProvider from '@/store/providers/MainProvider';
import '@/styles/globals.scss';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Medalist',
  description: 'MainPage Medalist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black'>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
