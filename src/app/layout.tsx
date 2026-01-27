import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Avion",
  description: "Shop premium furniture and home decor",
  metadataBase: new URL("https://e-commerce-ruby-two-72.vercel.app"),
  openGraph: {
    title: "Avion",
    description: "Shop premium furniture and home decor",
    siteName: "Avion",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Avion",
    description: "Shop premium furniture and home decor"
  } 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
