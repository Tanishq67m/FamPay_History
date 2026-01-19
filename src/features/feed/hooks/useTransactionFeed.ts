import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types';
import { generateTransactions } from '../utils';

// Simulate a network delay to test our "Loading Skeletons" later
const SIMULATED_DELAY_MS = 800;
const ITEMS_PER_PAGE = 20;

export const useTransactionFeed = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // This function simulates fetching from a backend
  const loadMore = useCallback(async () => {
    if (loading && page > 0) return; // Prevent double fetching
    
    setLoading(true);

    // Simulate Network Request
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    // Generate new batch of data
    // In real app: const data = await fetch(`/api/transactions?page=${page}`)
    const newBatch = generateTransactions(ITEMS_PER_PAGE);

    setTransactions((prev) => [...prev, ...newBatch]);
    setPage((prev) => prev + 1);
    setLoading(false);
    
    // Stop after 5 pages (100 items) for this showcase
    if (page >= 5) setHasMore(false);
  }, [page, loading]);

  // Initial Load
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { transactions, loading, hasMore, loadMore };
};