// FinTrace AI — Application Providers

import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './ThemeProvider';
import { router } from './router';

export default function AppProviders() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-surface-2)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: 'var(--shadow-md)',
          },
        }}
      />
    </ThemeProvider>
  );
}
