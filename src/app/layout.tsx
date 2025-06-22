import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./prism.css"
import { Providers } from "@/lib/providers";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} custom-scrollbar antialiased`}
      >
        <Providers>
          {children}
          <NextTopLoader />
        </Providers>
      </body>
    </html>
  );
}
