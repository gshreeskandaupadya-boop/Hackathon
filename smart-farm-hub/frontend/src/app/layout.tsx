'use client';

import { ReactNode } from 'react';
import './globals.css';
import '@/i18n/i18n';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#16a34a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Smart Farm Hub" />
        <meta name="description" content="AI-powered platform helping Indian farmers maximize seasonal profit with smart crop recommendations, government schemes, real-time market prices, and expert advice." />
        <meta name="keywords" content="agriculture, farming, crop recommendations, market prices, government schemes, India, farmer, AI" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
