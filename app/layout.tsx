// // //
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "./_context/CompareContext";
import { ThemeProvider } from "./_context/theme-context";
import ModernScroll from "./_context/modern-scroll";
import Navbar from "./_components/Navbar";
import CompareModal from "./_components/CompareModal";
import { Toaster } from "sonner";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.variable} antialiased`}>
        <ThemeProvider>
          <ModernScroll>
            <Navbar />
            <CompareProvider>
              <main className="relative z-0 min-h-screen w-full overflow-x-hidden">
                {children}
              </main>
              <CompareModal />
            </CompareProvider>
          </ModernScroll>

          {/* Global Toast Notifications */}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
