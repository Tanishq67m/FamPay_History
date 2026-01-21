import { Transaction } from '../types';
import { formatDate, formatCurrency } from '@/lib/formatters';

export const generateStory = (transaction: Transaction): string => {
    const { counterparty, amount, status, direction, paymentMethod, category, timestamp } = transaction;

    const timeString = new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const formattedAmount = formatCurrency(amount);

    if (status === 'FAILED') {
        return `You attempted to pay ${formattedAmount} to ${counterparty.name} at ${timeString}, but the transaction failed. No money was deducted from your account.`;
    }

    if (direction === 'CREDIT') {
        return `You received ${formattedAmount} from ${counterparty.name} via ${paymentMethod} at ${timeString}. It has been credited to your account.`;
    }
    

    // Debit cases
    switch (category) {
        case 'FOOD':
            return `You paid ${formattedAmount} to ${counterparty.name} for food at ${timeString}. Hope it was delicious!`;
        case 'TRAVEL':
            return `You spent ${formattedAmount} on a ride with ${counterparty.name} at ${timeString}.`;
        case 'SHOPPING':
            return `You purchased items worth ${formattedAmount} at ${counterparty.name} using ${paymentMethod} at ${timeString}.`;
        case 'TRANSFER':
            return `You transferred ${formattedAmount} to ${counterparty.name} using ${paymentMethod} at ${timeString}.`;
        default:
            return `You paid ${formattedAmount} to ${counterparty.name} at ${timeString} using ${paymentMethod}.`;
    }
};
