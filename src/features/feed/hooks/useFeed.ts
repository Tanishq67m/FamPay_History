import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types';
import { fetchTransactions } from '../api';

export const useFeed = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<number | undefined>(0);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore || nextPage === undefined) return;

        setLoading(true);
        try {
            const response = await fetchTransactions({ pageParam: nextPage, limit: 20 });

            setTransactions(prev => [...prev, ...response.data]);
            setNextPage(response.nextPage);
            setHasMore(!!response.nextPage);
        } catch (err) {
            setError('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, nextPage]);

    // Initial load
    useEffect(() => {
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        transactions,
        loading,
        error,
        hasMore,
        loadMore
    };
};
