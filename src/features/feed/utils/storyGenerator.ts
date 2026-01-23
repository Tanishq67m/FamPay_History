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
            return `Bro, you dropped ${formattedAmount} at ${counterparty.name} just now. Midnight cravings or what? 🍕`;
        case 'TRAVEL':
            return `Zoomin' around! 🚗 You spent ${formattedAmount} on that ride with ${counterparty.name}. Hope the vibe was right.`;
        case 'SHOPPING':
            return `Retail therapy hit hard? 🛍️ You splurged ${formattedAmount} at ${counterparty.name}. Lowkey iconic behavior.`;
        case 'TRANSFER':
            return `Sent ${formattedAmount} to ${counterparty.name}. Real ones support their homies. 💸`;
        default:
            return `You paid ${formattedAmount} to ${counterparty.name}. Wallet's feeling lighter, but you do you. ✨`;
    }
};
