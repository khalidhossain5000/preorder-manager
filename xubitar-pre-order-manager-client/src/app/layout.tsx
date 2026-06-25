import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/TanstackProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PreOrder Manager",
  description: "An awesome preorder management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable)}>
      <TanstackProvider>
        <body className="bg-background">
          {children}

          <Toaster />
        </body>
      </TanstackProvider>
    </html>
  );
}
