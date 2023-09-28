import MainProvider from '@/store/providers/MainProvider';
import '@/styles/globals.scss';
import React from 'react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru'>
      <body className='bg-black'>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
