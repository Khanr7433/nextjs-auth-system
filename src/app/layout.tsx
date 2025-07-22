import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Auth System",
  description: "A authentication system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e3a8a",
              color: "#ffffff",
              border: "1px solid #3b82f6",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              style: {
                background: "#10b981",
                color: "#ffffff",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#10b981",
              },
            },
            error: {
              style: {
                background: "#ef4444",
                color: "#ffffff",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#ef4444",
              },
            },
            loading: {
              style: {
                background: "#3b82f6",
                color: "#ffffff",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
