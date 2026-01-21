import { Transaction } from '../types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { generateStory } from '../utils/storyGenerator';
import { useState } from 'react';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { counterparty, amount, status, direction, category, timestamp } = transaction;
  const [expanded, setExpanded] = useState(false);

  const isFailed = status === 'FAILED';
  const isCredit = direction === 'CREDIT';

  return (
    <div className="relative mb-2 px-2">
      <div
        onClick={() => setExpanded(!expanded)}
        className={clsx(
          "group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer border",
          expanded
            ? "bg-[#121212] border-fam-border shadow-lg z-10"
            : "bg-transparent border-transparent hover:bg-white/5"
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

      {/* RECEIPT STYLE STORY CARD */}
      {expanded && (
        <div className="mx-2 mt-[-10px] pt-4 pb-2 bg-[#0A0A0A] rounded-b-xl border-x border-b border-fam-border/50 animate-in slide-in-from-top-4 fade-in duration-300 relative z-0">
          {/* Dashed line separator */}
          <div className="border-t border-dashed border-fam-muted/20 mx-4 mb-3" />

          <div className="px-5 pb-3">
            <div className="flex gap-3">
              <div className="w-0.5 self-stretch bg-fam-accent/40 rounded-full" />
              <div>
                <p className="text-[13px] leading-6 text-fam-muted/80">
                  {generateStory(transaction)}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 text-[10px] text-fam-muted/40 font-mono tracking-widest text-right uppercase">
              Ref: {transaction.id.split('-')[0]} • {formatDate(timestamp)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};