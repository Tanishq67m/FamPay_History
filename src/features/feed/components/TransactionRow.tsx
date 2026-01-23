import { Transaction } from '../types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const router = useRouter();
  const { counterparty, amount, status, direction, category } = transaction; // Removed timestamp from destruction as it's not used in this view anymore or can be accessed via transaction.timestamp if needed

  const isFailed = status === 'FAILED';
  const isCredit = direction === 'CREDIT';

  return (
    <div className="relative mb-2 px-2">
      <div
        onClick={() => router.push(`/transaction/${transaction.id}`)}
        className={clsx(
          "group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer border bg-transparent border-transparent hover:bg-white/5 active:scale-[0.98]"
        )}
      >

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 overflow-hidden">
          {/* Avatar - Squircle */}
          <div className="relative flex-shrink-0 w-12 h-12">
            <div className={clsx(
              "w-full h-full rounded-[16px] flex items-center justify-center overflow-hidden border border-white/5 transition-colors shadow-inner",
              isFailed ? "bg-red-500/10 border-red-500/20" : "bg-black group-hover:border-fam-accent/30"
            )}>
              {counterparty.avatar ? (
                <img src={counterparty.avatar} alt={counterparty.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-fam-muted">{counterparty.name[0]}</span>
              )}
            </div>

            {/* Status Indicator Badge */}
            <div className="absolute -bottom-1 -right-1">
              {isFailed && (
                <div className="bg-black p-0.5 rounded-full border border-black">
                  <AlertCircle size={14} className="text-red-500 fill-red-950" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <span className={clsx(
              "text-[15px] font-semibold truncate tracking-tight text-white/90",
              isFailed && "text-fam-muted line-through decoration-red-500/50"
            )}>
              {counterparty.name}
            </span>
            <div className="flex items-center gap-2 text-[12px] text-fam-muted/60 font-medium">
              <span className="uppercase tracking-wider">{category}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-fam-muted/40" />
              <span>{formatDate(transaction.timestamp).split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-right flex-shrink-0 ml-4">
          <div className={clsx(
            "text-[16px] font-bold tracking-tight tabular-nums flex items-center justify-end gap-1.5",
            isFailed ? "text-fam-muted" : isCredit ? "text-green-400" : "text-white"
          )}>
            {isCredit ? '+' : ''}{formatCurrency(amount)}
          </div>
        </div>
      </div>
    </div>
  );
};