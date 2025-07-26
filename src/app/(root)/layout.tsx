import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Topbar } from "@/components/shared/Topbar";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IIST, Bihar",
  description: "Official website for IIST, Bihar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Topbar />
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </main>
  );
}
