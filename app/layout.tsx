import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppPorivders from "@/components/providers/app-providers";
import {ClerkProvider} from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flow-Craft",
  description: "Flow craft is a web app that allows for automtion of tedious tasks via automation with webscrapping + Ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <ClerkProvider afterSignOutUrl="/sign-in" appearance={{elements: {formButtonPrimary: "!bg-primary hover:!bg-primary/90 !text-sm !shadow-none"}}}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <AppPorivders>
            {children}
          </AppPorivders>
        </body>
        <Toaster richColors/>
      </ClerkProvider>
    </html>
  );
}
