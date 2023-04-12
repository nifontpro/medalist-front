'use client';

import '@/styles/globals.scss';
import MainLayout from './_components/MainLayout/MainLayout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';
import AuthProvider from '@/app/_auth/provider/AuthProvider';

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
            <AuthProvider>
              <MainLayout>{children}</MainLayout>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
