"use client"
import localFont from "next/font/local";
import "./globals.css";
import { Roboto, Inter, Instrument_Sans, Prompt } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400','500','600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

export const prompt = Prompt({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

 const metadata = {
  title: "Eqvisor",
  description: "Eqvisor is a platform for startup for startup",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
       <Toaster/> 
      </body>
    </html>
  );
}
