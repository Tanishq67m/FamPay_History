// src/features/feed/utils.ts
import { Transaction, TransactionStatus, PaymentMethod } from './types';
import { v4 as uuidv4 } from 'uuid'; 

// --- CONSTANTS FOR REALISM ---
const MERCHANTS = [
  { name: 'Zomato', cat: 'Food', avatar: 'https://ui-avatars.com/api/?name=Z&background=cb202d&color=fff' },
  { name: 'Uber', cat: 'Travel', avatar: 'https://ui-avatars.com/api/?name=U&background=000&color=fff' },
  { name: 'Spotify', cat: 'Subscription', avatar: 'https://ui-avatars.com/api/?name=S&background=1db954&color=fff' },
  { name: 'Zerodha', cat: 'Investment', avatar: 'https://ui-avatars.com/api/?name=Z&background=387ed1&color=fff' },
  { name: 'Starbucks', cat: 'Food', avatar: 'https://ui-avatars.com/api/?name=S&background=00704a&color=fff' },
];

const PEOPLE = [
  { name: 'Aarav Patel', cat: 'P2P' },
  { name: 'Ananya Gupta', cat: 'P2P' },
  { name: 'Rohan Sharma', cat: 'P2P' },
];

// --- HELPERS ---

// Simulates "80% Success, 15% Pending, 5% Failed"
const getRandomStatus = (): TransactionStatus => {
  const rand = Math.random();
  if (rand > 0.95) return 'FAILED';
  if (rand > 0.85) return 'PENDING';
  return 'SUCCESS';
};

const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// --- MAIN GENERATOR ---

export const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }).map((_, i) => {
    const isPerson = Math.random() > 0.6; // 40% chance it's a person
    const entity = isPerson 
      ? PEOPLE[Math.floor(Math.random() * PEOPLE.length)]
      : MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];

    return {
      id: uuidv4(),
      externalId: `TXN-${Math.floor(Math.random() * 1000000)}`,
      amount: Math.floor(Math.random() * 5000) * 100, // Random amount up to ₹5000 (in paise)
      currency: 'INR',
      timestamp: getRandomDate(new Date(2025, 0, 1), new Date()), // Random date in last year
      status: getRandomStatus(),
      direction: 'DEBIT', // Simplifying to mostly debit for now
      method: 'UPI',
      counterparty: {
        name: entity.name,
        type: isPerson ? 'PERSON' : 'MERCHANT',
        avatar: (entity as any).avatar, // Optional for people
      },
      category: entity.cat,
      description: isPerson ? 'Sent via UPI' : 'Payment for order',
    };
  });
};