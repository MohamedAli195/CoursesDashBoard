import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from 'providers/useBreakPoint';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'routes/router.tsx';
import { theme } from 'theme/theme.ts';
import './index.css';
import "./i18n"; // Import the i18n configuration
import {


  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BreakpointsProvider>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
      </BreakpointsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
