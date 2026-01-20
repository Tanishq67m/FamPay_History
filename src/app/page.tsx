"use client";

import { useTransactionFeed } from "@/features/feed/hooks/useTransactionFeed";
import { TransactionRow } from "@/features/feed/components/TransactionRow";
import { InfiniteLoader } from "@/features/feed/components/InfiniteLoader";

export default function Home() {
  const { transactions, loading, hasMore, loadMore } = useTransactionFeed();

  return (
    // No extra styling needed on the wrapper, layout.tsx handles the width
    <>
      {/* HEADER 
        - Sticky on both mobile and desktop
        - Backdrop blur for that "iOS/macOS" premium feel
      */}
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-fam-border">
        <div className="px-4 py-4 md:py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-fam-text">
              Activity
            </h1>
            <p className="hidden md:block text-sm text-fam-muted mt-1">
              Your recent transactions and payments
            </p>
          </div>
          
          {/* Web-Only: 'Filter' Button Placeholder */}
          <button className="hidden md:block px-4 py-1.5 text-sm font-medium text-fam-accent border border-fam-border rounded-full hover:bg-fam-card transition-colors">
            Filter
          </button>
        </div>
      </header>

      {/* FEED LIST */}
      <div className="pb-20">
        {transactions.map((txn) => (
          <TransactionRow key={txn.id} transaction={txn} />
        ))}

        <InfiniteLoader 
          onLoadMore={loadMore} 
          hasMore={hasMore} 
          isLoading={loading} 
        />
      </div>
    </>
  );
}