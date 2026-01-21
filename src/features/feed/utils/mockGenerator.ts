import { Transaction, TransactionStatus, TransactionDirection, PaymentMethod, TransactionCategory } from '../types';
import { faker } from '@faker-js/faker';

// We use a fixed seed to ensure "random" data remains consistent across reloads
// if we wanted fully deterministic, but faker's new versions handle seeds differently.
// For now, let's simple generate random data. 
// Ideally we want realistic distributions (mostly success, some failures).

const CATEGORIES: TransactionCategory[] = ['FOOD', 'TRAVEL', 'SHOPPING', 'TRANSFER', 'OTHERS'];
const METHODS: PaymentMethod[] = ['UPI', 'CARD', 'WALLET'];
const COUNTERPARTIES = [
    { name: 'Zomato', type: 'FOOD', avatar: 'https://ui-avatars.com/api/?name=Z&background=cb202d&color=fff' },
    { name: 'Swiggy', type: 'FOOD', avatar: 'https://ui-avatars.com/api/?name=S&background=fc8019&color=fff' },
    { name: 'Uber', type: 'TRAVEL', avatar: 'https://ui-avatars.com/api/?name=U&background=000&color=fff' },
    { name: 'Starbucks', type: 'FOOD', avatar: 'https://ui-avatars.com/api/?name=S&background=006241&color=fff' },
    { name: 'Netflix', type: 'SHOPPING', avatar: 'https://ui-avatars.com/api/?name=N&background=E50914&color=fff' },
    { name: 'Spotify', type: 'SHOPPING', avatar: 'https://ui-avatars.com/api/?name=S&background=1DB954&color=fff' },
    { name: 'Amazon', type: 'SHOPPING', avatar: 'https://ui-avatars.com/api/?name=A&background=ff9900&color=fff' },
    { name: 'Rahul', type: 'TRANSFER', avatar: '' },
    { name: 'Priya', type: 'TRANSFER', avatar: '' },
    { name: 'Amit', type: 'TRANSFER', avatar: '' },
];

export const generateTransaction = (id: string, date: Date): Transaction => {
    // 95% success rate
    const isFailed = Math.random() > 0.95;
    const status: TransactionStatus = isFailed ? 'FAILED' : 'SUCCESS';

    // 70% debit (spending), 30% credit (money received)
    const isCredit = Math.random() > 0.7;
    const direction: TransactionDirection = isCredit ? 'CREDIT' : 'DEBIT';

    const counterpartyTemplate = COUNTERPARTIES[Math.floor(Math.random() * COUNTERPARTIES.length)];

    return {
        id,
        timestamp: date.toISOString(),
        status,
        direction,
        amount: parseFloat(faker.finance.amount({ min: 10, max: 5000, dec: 2 })),
        currency: 'INR',
        counterparty: {
            id: faker.string.uuid(),
            name: counterpartyTemplate.name,
            avatar: counterpartyTemplate.avatar || undefined,
        },
        paymentMethod: METHODS[Math.floor(Math.random() * METHODS.length)],
        category: counterpartyTemplate.type as TransactionCategory,
        description: isCredit ? 'Payment received' : `Paid to ${counterpartyTemplate.name}`,
    };
};

/**
 * Generates a list of mock transactions sorted by date (newest first).
 * @param count Number of transactions to generate
 */
export const generateMockTransactions = (count: number = 100): Transaction[] => {
    const transactions: Transaction[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const date = new Date(now.getTime() - i * 1000 * 60 * 60 * (Math.random() * 5)); // Spread over time
        transactions.push(generateTransaction(`tx_${i}`, date));
    }

    return transactions;
};
