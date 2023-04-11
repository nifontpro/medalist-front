'use client'

import '@/styles/globals.scss';
import MainLayout from './_components/MainLayout/MainLayout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black'>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <MainLayout>{children}</MainLayout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
