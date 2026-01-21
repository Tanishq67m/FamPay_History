'use client';

import { useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useFeed } from '../hooks/useFeed';
import { TransactionRow } from './TransactionRow';

import { formatMonth } from '@/lib/formatters';

export const Feed = () => {
    const { transactions, loading, hasMore, loadMore, error } = useFeed();
    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: hasMore ? transactions.length + 1 : transactions.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 88,
        overscan: 5,
    });

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

        if (!lastItem) {
            return;
        }

        if (
            lastItem.index >= transactions.length - 1 &&
            hasMore &&
            !loading
        ) {
            loadMore();
        }
    }, [
        hasMore,
        loadMore,
        loading,
        rowVirtualizer.getVirtualItems(),
        transactions.length,
    ]);

    // Timeline Logic
    const virtualItems = rowVirtualizer.getVirtualItems();
    const firstVisibleIndex = virtualItems[0]?.index ?? 0;
    const firstVisibleTransaction = transactions[firstVisibleIndex];
    const currentDateLabel = firstVisibleTransaction ? formatMonth(firstVisibleTransaction.timestamp) : '';

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                <p>Something went wrong.</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-fam-neutral rounded">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            {/* STICKY TIMELINE INDICATOR */}
            {currentDateLabel && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none fade-in slide-in-from-top-2 duration-300">
                    <span className="px-3 py-1 bg-fam-text/80 text-fam-bg text-xs font-medium rounded-full backdrop-blur-md shadow-sm">
                        {currentDateLabel}
                    </span>
                </div>
            )}

            <div
                ref={parentRef}
                className="h-full w-full overflow-y-auto contain-strict"
                style={{ height: '100%' }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const isLoaderRow = virtualRow.index > transactions.length - 1;
                        const transaction = transactions[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {isLoaderRow ? (
                                    <div className="h-full flex items-center justify-center p-4">
                                        <span className="text-fam-muted text-sm animate-pulse">Loading more...</span>
                                    </div>
                                ) : (
                                    <TransactionRow transaction={transaction} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
