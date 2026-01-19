"use client"; // Needs to be client component for Hooks

import { useTransactionFeed } from "@/features/feed/hooks/useTransactionFeed";
import { TransactionRow } from "@/features/feed/components/TransactionRow";
import { InfiniteLoader } from "@/features/feed/components/InfiniteLoader";
import { Loader2 } from "lucide-react"; // Loading Spinner

export default function Home() {
  const { transactions, loading, hasMore, loadMore } = useTransactionFeed();

  return (
    <div className="min-h-screen bg-fam-bg text-fam-text">
      
      {/* Header: fam-bg/80 for that nice blur effect */}
      <header className="sticky top-0 z-10 bg-fam-bg/80 backdrop-blur-md border-b border-fam-border px-4 py-4">
        <h1 className="text-xl font-bold tracking-tight text-fam-text">Activity</h1>
      </header>

      <main className="pb-20">
        {transactions.map((txn) => (
          <TransactionRow key={txn.id} transaction={txn} />
        ))}

        <InfiniteLoader 
          onLoadMore={loadMore} 
          hasMore={hasMore} 
          isLoading={loading} 
        />
      </main>
    </div>
  );
}