import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Standard, clean font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FamPay Feed Showcase",
  description: "A high-performance payment feed.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-fam-bg text-fam-text`}>
  {/* 1. Outer Wrapper: bg-fam-bg (Black) 
         - This handles large desktop screens.
  */}
  <div className="min-h-screen w-full flex justify-center bg-fam-bg">
    
    {/* 2. The "Phone" Container: bg-fam-bg (Black)
         - Changed from bg-white to bg-fam-bg 
         - Added border-fam-border to make it distinct on desktop
    */}
    <main className="w-full max-w-[480px] min-h-screen bg-fam-bg border-x border-fam-border shadow-2xl overflow-hidden relative">
      {children}
    </main>
  </div>
</body>
    </html>
  );
}