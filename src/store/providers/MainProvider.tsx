'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/storage/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider, ruRU } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MainLayout from '@/app/_components/MainLayout/MainLayout';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <ToastContainer position='bottom-right' newestOnTop />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <MainLayout>{children}</MainLayout>
        </PersistGate>
      </Provider>
    </LocalizationProvider>
  );
};

export default MainProvider;
