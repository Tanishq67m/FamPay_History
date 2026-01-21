import { Transaction } from '../types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { AlertCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import clsx from 'clsx';
import { generateStory } from '../utils/storyGenerator';
import { useState } from 'react';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { counterparty, amount, status, direction, timestamp, category } = transaction;
  const [expanded, setExpanded] = useState(false);

  const isFailed = status === 'FAILED';
  const isCredit = direction === 'CREDIT';

  // Category Icon fallbacks could go here, but using Avatar for now

  return (
    <div className="relative mb-2 px-2">
      <div
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          "group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent",
          expanded ? "bg-white/5 border-white/5" : "hover:bg-white/5 active:scale-[0.99] active:bg-white/10"
        )}
      >

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 overflow-hidden">
          {/* Avatar - Squircle */}
          <div className="relative flex-shrink-0 w-12 h-12">
            <div className={clsx(
              "w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden border border-white/10 transition-colors",
              isFailed ? "bg-red-500/10 border-red-500/20" : "bg-fam-card group-hover:border-fam-accent/30"
            )}>
              {counterparty.avatar ? (
                <img src={counterparty.avatar} alt={counterparty.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-fam-muted">{counterparty.name[0]}</span>
              )}
            </div>

            {/* Status Indicator Badge */}
            <div className="absolute -bottom-1 -right-1">
              {isFailed ? (
                <div className="bg-fam-bg p-0.5 rounded-full">
                  <AlertCircle size={14} className="text-red-500 fill-red-950" />
                </div>
              ) : (
                <div className={clsx(
                  "p-1 rounded-full text-[8px] font-bold border-2 border-fam-bg",
                  isCredit ? "bg-green-500 text-black" : "bg-fam-card text-fam-muted hidden"
                )}>
                  {/* Only showing for Credit or Failure to keep UI clean */}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <span className={clsx(
              "text-[15px] font-medium truncate tracking-wide",
              isFailed ? "text-fam-muted line-through decoration-red-500/50" : "text-fam-text"
            )}>
              {counterparty.name}
            </span>
            <div className="flex items-center gap-2 text-[13px] text-fam-muted/60">
              <span className="capitalize">{category.toLowerCase()}</span>
              <span className="w-1 h-1 rounded-full bg-fam-muted/30" />
              <span>{formatDate(transaction.timestamp).split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-right flex-shrink-0 ml-4">
          <div className={clsx(
            "text-[16px] font-bold tracking-tight tabular-nums flex items-center justify-end gap-1.5",
            isFailed ? "text-fam-muted" : isCredit ? "text-green-400" : "text-fam-text"
          )}>
            {formatCurrency(amount)}
          </div>
        </div>
      </div>

      {/* STORY EXPANSION - Clean "Insight" Card style */}
      {expanded && (
        <div className="ml-[4.5rem] mr-2 mt-[-8px] relative z-0 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="relative bg-fam-card/50 border-l-2 border-fam-accent/50 rounded-r-xl p-3 pr-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <p className="text-[13px] leading-relaxed text-fam-muted">
                <span className="text-fam-accent font-medium mr-1">Story:</span>
                {generateStory(transaction)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};