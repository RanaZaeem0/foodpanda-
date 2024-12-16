'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};