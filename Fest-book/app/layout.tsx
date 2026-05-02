import { Oxanium } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { AuthProvider } from './organiser/contexts/AuthContext';
import './globals.css';

const oxanium = Oxanium({
  subsets: ['latin'],
});

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_ZHVtbXktY2xlcmstMS5jbGVyay5hY2NvdW50cy5kZXYk';

export const metadata = {
  title: 'Fest-Book App',
  description: 'Event management app!',
  icons: {
    icon: "/icon.png", 
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en">
        <head />
        <body className={oxanium.className}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
