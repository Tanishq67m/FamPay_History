// src/app/page.tsx
import { generateTransactions } from "@/features/feed/utils";
import { TransactionRow } from "@/features/feed/components/TransactionRow";

export default function Home() {
  // Let's generate 10 transactions this time
  const data = generateTransactions(10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Simulating an App Header) */}
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900">Transactions</h1>
      </header>

      {/* The List */}
      <main>
        {data.map((txn) => (
          <TransactionRow key={txn.id} transaction={txn} />
        ))}
      </main>
    </div>
  );
}