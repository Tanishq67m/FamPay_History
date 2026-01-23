"use client";

import { Feed } from "@/features/feed/components/Feed";
import { WalletCard } from "@/features/feed/components/WalletCard";
import { useState } from "react";
import { NotificationList } from "@/components/NotificationList";
import { PhoneOverlay } from "@/components/PhoneOverlay";

export default function Home() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    // Outer Container - Simulates the "Desk" on large screens with a dark textured background
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 md:p-8 font-sans bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black">

      {/* Mobile Frame Container */}
      <div className="w-full md:max-w-[380px] h-[200dvh] md:h-[95vh] md:max-h-[850px] bg-fam-bg flex flex-col relative overflow-hidden md:rounded-[40px] md:border-[8px] md:border-[#1a1a1a] md:shadow-2xl shadow-black ring-1 ring-white/5">
        <PhoneOverlay />

        {/* HEADER - Glassmorphic */}
        <header className="flex-none z-30 px-5 pt-6 pb-4 flex items-center justify-between bg-fam-bg/80 backdrop-blur-md sticky top-0 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="group relative w-10 h-10 rounded-full bg-fam-accent flex items-center justify-center font-bold text-black shadow-lg shadow-fam-accent/20 cursor-pointer overflow-hidden">
              <span className="group-hover:scale-110 transition-transform duration-300">T</span>
            </div>
            <div>
              <p className="text-[10px] text-fam-muted uppercase tracking-widest font-semibold mb-0.5">Good Evening</p>
              <h1 className="text-lg font-bold text-fam-text leading-none tracking-tight">
                Tanishq
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-fam-text hover:bg-white/5 transition-colors active:scale-95 bg-white/5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          </button>

          {showNotifications && <NotificationList onClose={() => setShowNotifications(false)} />}
        </header>

        {/* HERO SECTION - Wallet Card */}
        <section className="flex-none px-5 pb-4 pt-4 z-20">
          <WalletCard />
        </section>

        {/* FEED COMPONENT */}
        <main className="flex-1 min-h-0 relative bg-fam-bg">
          <Feed />
        </main>
      </div>
    </div>
  );
}