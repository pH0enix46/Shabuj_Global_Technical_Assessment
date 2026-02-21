import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "./_context/CompareContext";
import { ThemeProvider } from "./_context/theme-context";
import Navbar from "./_components/Navbar";
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
    <html
      lang="en"
      className="scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground selection:bg-primary/30 selection:text-primary min-h-screen`}
      >
        <ThemeProvider>
          <Navbar />
          <CompareProvider>
            {children}
            <CompareModal />
          </CompareProvider>

          {/* Global Toast Notifications */}
          <Toaster position="bottom-right" richColors theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
