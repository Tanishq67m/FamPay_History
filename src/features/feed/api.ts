import { Transaction } from './types';
import { generateMockTransactions, generateTransaction } from './utils/mockGenerator';

// In-memory store to keep consistency during a session
let MOCK_DB: Transaction[] = [];
const TOTAL_TRANSACTIONS = 5000;

export const initializeMockData = () => {
    if (MOCK_DB.length === 0) {
        MOCK_DB = generateMockTransactions(TOTAL_TRANSACTIONS);
    }
};

interface FetchTransactionsParams {
    pageParam?: number;
    limit?: number;
}

export const fetchTransactions = async ({ pageParam = 0, limit = 20 }: FetchTransactionsParams): Promise<{
    data: Transaction[];
    nextPage: number | undefined;
}> => {
    // Simulate network delay (300ms - 800ms)
    const delay = Math.random() * 500 + 300;
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (MOCK_DB.length === 0) {
        initializeMockData();
    }

    const start = pageParam * limit;
    const end = start + limit;
    const data = MOCK_DB.slice(start, end);

    const hasMore = end < MOCK_DB.length;

    return {
        data,
        nextPage: hasMore ? pageParam + 1 : undefined,
    };
};

export const getTransactionById = async (id: string): Promise<Transaction | undefined> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (MOCK_DB.length === 0) {
        initializeMockData();
    }

    let transaction = MOCK_DB.find((t) => t.id === id);

    // ENDLESS SCROLL / PERSISTENCE FIX:
    // If we refreshed the page, MOCK_DB contains only the initial batch (or none if strict).
    // If the ID follows our pattern "tx_N", we can deterministically regenerate it.
    if (!transaction && id.startsWith('tx_')) {
        const index = parseInt(id.split('_')[1]);
        if (!isNaN(index)) {
            // We need to re-seed to get the exact same transaction for this index
            // This is a bit heavy but ensures consistency.
            // Ideally we just generate ONE transaction with the right seed offset, but faker 
            // state is global. A simpler approach for this demo:
            // Just generate a FRESH transaction for this ID.
            const now = new Date();
            // Estimate date based on index (same logic as list generator)
            const date = new Date(now.getTime() - index * 1000 * 60 * 60 * 2.5); // AVG multiplier
            transaction = {
                ...generateTransaction(id, date),
                // Ensure ID matches exactly
                id: id
            };
        }
    }

    return transaction;
};
