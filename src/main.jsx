import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';


import stripePromise from './config/stripeconfig';
import AppProvider from './hooks';
import { Router } from './routes';
import GlobalStyles from './styles/globalStyles';
import { standardTheme } from './styles/themes/standard'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <GlobalStyles />
        <ToastContainer autoClose={3500} theme="colored" />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
