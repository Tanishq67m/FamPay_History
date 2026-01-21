import { Transaction } from './types';
import { generateMockTransactions } from './utils/mockGenerator';

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
