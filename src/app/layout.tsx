'use client';

import '@/styles/globals.scss';
import MainLayout from './_components/MainLayout/MainLayout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/storage/store';
import AuthProvider from '@/store/providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black'>
        <ToastContainer position='bottom-right' newestOnTop />
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
