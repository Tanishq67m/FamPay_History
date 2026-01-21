"use client";

import { Feed } from "@/features/feed/components/Feed";
import { WalletCard } from "@/features/feed/components/WalletCard";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-fam-bg text-fam-text">
      {/* HEADER - Glassmorphic */}
      <header className="flex-none z-30 px-4 py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-fam-accent flex items-center justify-center font-bold text-black shadow-lg shadow-fam-accent/20">T</div>
          <div>
            <p className="text-xs text-fam-muted uppercase tracking-wider font-medium">Good Evening</p>
            <h1 className="text-lg font-bold text-fam-text leading-tight">
              Tanishq Mohod
            </h1>
          </div>
        </div>

        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-fam-text hover:bg-white/5 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </button>
      </header>

      {/* HERO SECTION - Fixed at top of list area */}
      <section className="flex-none px-4 pb-6 z-20">
        <WalletCard />
      </section>

      {/* FEED COMPONENT (Takes remaining height) */}
      <main className="flex-1 min-h-0 relative bg-fam-bg">
        <Feed />
      </main>
    </div>
  );
}