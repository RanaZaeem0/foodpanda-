'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { Provider} from  "react-redux"
import store from './lib/store';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Provider store={store}>

        {children}
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
};