import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FamPay Activity",
  description: "A responsive payment feed showcase.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-fam-bg text-fam-text antialiased`}>
        {/* RESPONSIVE WRAPPER 
          - Mobile: Default block behavior (full width)
          - Desktop: Flexbox centering 
        */}
        <div className="min-h-screen w-full flex flex-col md:items-center bg-fam-bg">
          
          {/* MAIN CONTENT COLUMN
             - w-full: Takes full width on mobile
             - max-w-2xl: Limits width on desktop (Twitter/X style)
             - border-x: Adds side borders ONLY on desktop (md:border-x)
          */}
          <main className="w-full md:max-w-2xl min-h-screen bg-fam-bg md:border-x md:border-fam-border relative">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}