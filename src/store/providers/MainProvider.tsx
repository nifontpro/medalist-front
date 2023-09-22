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

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU as coreRuRU } from '@mui/material/locale';
// import { ruRU } from '@mui/x-date-pickers/locales';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU, // x-date-pickers translations
  coreRuRU // core translations
);

const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default MainProvider;
