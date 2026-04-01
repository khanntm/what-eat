import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import InstallPrompt from '@/components/InstallPrompt';

export const metadata: Metadata = {
  title: 'Hôm Nay Ăn Gì?',
  description: 'Giúp gia đình quyết định ăn gì nhanh nhất trong 10 giây',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ăn Gì?',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#f97316',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf9f7]">
        <main className="flex-1 max-w-lg mx-auto w-full pb-20">
          <InstallPrompt />
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
