'use client';

import '@/styles/globals.scss';
import MainLayout from './_components/MainLayout/MainLayout';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/storage/store';
import AuthProvider from '@/store/providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider, ruRU } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black'>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <ToastContainer position='bottom-right' newestOnTop />
          <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
              <AuthProvider>
                <MainLayout>{children}</MainLayout>
              </AuthProvider>
            </PersistGate>
          </Provider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
