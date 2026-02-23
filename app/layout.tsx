// // //
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "./_context/CompareContext";
import { ThemeProvider } from "./_context/theme-context";
import ModernScroll from "./_context/modern-scroll";
import Navbar from "./_components/common/Navbar";
import { Toaster } from "sonner";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shabujglobal.com"),
  title: "Shabuj Global Education | Study Abroad Guidance",
  description:
    "Shabuj Global Education helps students reach their goals with expert study abroad guidance, university admissions support, and visa assistance.",
  keywords: [
    "Study Abroad",
    "University Admissions",
    "Visa Assistance",
    "Global Education",
    "Shabuj Global",
    "International Students",
  ],
  authors: [{ name: "Shabuj Global Education" }],

  openGraph: {
    title: "Shabuj Global Education | Study Abroad Guidance",
    description:
      "Shabuj Global Education helps students reach their goals with expert study abroad guidance, university admissions support, and visa assistance.",
    url: "https://shabujglobal.com",
    siteName: "Shabuj Global Education",
    images: [
      {
        url: "/shabuj-global.png",
        width: 1200,
        height: 630,
        alt: "Shabuj Global Education - Study Abroad",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shabuj Global Education | Study Abroad Guidance",
    description:
      "Shabuj Global Education helps students reach their goals with expert study abroad guidance, university admissions support, and visa assistance.",
    images: ["/shabuj-global.png"],
  },
  icons: {
    icon: "/shabuj-global.png",
    shortcut: "/shabuj-global.png",
    apple: "/shabuj-global.png",
  },
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
            </CompareProvider>
          </ModernScroll>

          {/* Global Toast Notifications */}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
