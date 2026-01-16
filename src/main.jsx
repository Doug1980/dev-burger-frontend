import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

// 1. Importações do React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import stripePromise from './config/stripeconfig';
import AppProvider from './hooks';
import { Router } from './routes';
import GlobalStyles from './styles/globalStyles';
import { standardTheme } from './styles/themes/standard';

// 2. Criação da instância do QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Envolva a aplicação com o QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </StrictMode>,
);
