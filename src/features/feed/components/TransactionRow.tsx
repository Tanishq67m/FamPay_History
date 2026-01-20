import { Transaction } from '../types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface TransactionRowProps {
  transaction: Transaction;
}
export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { counterparty, amount, status, direction, timestamp, description } = transaction;

  const isFailed = status === 'FAILED';
  const isCredit = direction === 'CREDIT';

  return (
    <div className="group flex items-center justify-between p-4 md:px-6 md:py-5 border-b border-fam-border/40 transition-all cursor-pointer 
      active:bg-fam-card 
      md:hover:bg-fam-card/40 
      md:hover:pl-7" // Desktop Micro-interaction: Slight shift right on hover
    >
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
        {/* Avatar: Slightly larger on desktop if you want, but w-12 is usually fine */}
        <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-fam-card flex items-center justify-center overflow-hidden border border-fam-border/50 group-hover:border-fam-muted/50 transition-colors">
          {counterparty.avatar ? (
             <img src={counterparty.avatar} alt={counterparty.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-fam-muted">{counterparty.name[0]}</span>
          )}
          {/* Failure Overlay logic... */}
          {isFailed && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[1px]">
              <AlertCircle size={18} className="text-red-500" />
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className={clsx(
            "text-[15px] md:text-base font-medium truncate", // Slightly bigger text on desktop
            isFailed ? "text-fam-muted line-through" : "text-fam-text"
          )}>
            {counterparty.name}
          </span>
          <span className="text-[13px] md:text-sm text-fam-muted truncate">
            {description || formatDate(timestamp)}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-right flex-shrink-0 ml-4">
        <div className={clsx(
          "text-[15px] md:text-base font-semibold tracking-wide tabular-nums",
          isFailed ? "text-fam-muted line-through" : "text-fam-text"
        )}>
          {isCredit ? '+' : ''}{formatCurrency(amount)}
        </div>
        <div className="text-[11px] md:text-xs text-fam-muted mt-0.5">
          {status === 'FAILED' ? 'Failed' : formatDate(timestamp)}
        </div>
      </div>
    </div>
  );
};