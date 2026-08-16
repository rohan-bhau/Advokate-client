import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Providers } from "./providers"; // 1. Import your providers file
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Advokate — Find & Hire Expert Legal Counsel",
    template: "%s · Advokate",
  },
  description:
    "Connect with verified and experienced lawyers for all your legal needs. Browse, hire, and pay securely on Advokate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning // 2. Add this to prevent browser hydration mismatches
    >
      {/* 3. Add global Hero UI utility classes to the body so background/text switch themes automatically */}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Suspense
            fallback={
              <div className="h-20 w-full bg-background animate-pulse" />
            }
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                borderRadius: "12px",
                background: "var(--content1)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                fontSize: "0.875rem",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
