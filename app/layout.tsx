import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "./_context/CompareContext";
import CompareModal from "./_components/CompareModal";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shabuj Global | Find Your Perfect University",
  description:
    "A highly optimized and modern way to filter and compare world-class universities for studying abroad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#fafafa] dark:bg-black text-gray-900 dark:text-gray-100 selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-200 min-h-screen`}
      >
        <CompareProvider>
          {children}
          <CompareModal />
        </CompareProvider>

        {/* Global Toast Notifications */}
        <Toaster position="bottom-right" richColors theme="system" />
      </body>
    </html>
  );
}
