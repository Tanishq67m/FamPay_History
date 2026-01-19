import { Transaction } from '../types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { ArrowUpRight, ArrowDownLeft, AlertCircle } from 'lucide-react';
import clsx from 'clsx'; // Helper for conditional classes

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { counterparty, amount, status, direction, timestamp, category } = transaction;

  const isFailed = status === 'FAILED';
  const isCredit = direction === 'CREDIT';

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 active:bg-gray-50 transition-colors cursor-pointer">
      
      {/* LEFT SIDE: Icon + Details */}
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Avatar / Icon Container */}
        <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
          {counterparty.avatar ? (
             // In a real app, use Next.js <Image> here
            <img src={counterparty.avatar} alt={counterparty.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-gray-500">
              {counterparty.name[0]}
            </span>
          )}

          {/* Status Badge (Small overlay icon) */}
          {isFailed && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <AlertCircle size={16} className="text-red-500" />
            </div>
          )}
        </div>

        {/* Text Details */}
        <div className="flex flex-col min-w-0">
          <span className={clsx(
            "text-sm font-semibold truncate", 
            isFailed ? "text-gray-400 line-through" : "text-gray-900"
          )}>
            {counterparty.name}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {formatDate(timestamp)} • {category}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Amount */}
      <div className="text-right flex-shrink-0 ml-4">
        <div className={clsx(
          "text-sm font-bold tabular-nums", // tabular-nums aligns numbers vertically
          isFailed ? "text-gray-400 line-through" : (isCredit ? "text-green-600" : "text-gray-900")
        )}>
          {isCredit ? '+' : ''}{formatCurrency(amount)}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {status === 'SUCCESS' ? (
            isCredit ? 'Credited' : 'Debited'
          ) : (
            <span className="text-red-500 font-medium">Failed</span>
          )}
        </div>
      </div>
    </div>
  );
};