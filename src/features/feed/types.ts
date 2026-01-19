// src/features/feed/types.ts

export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED';
export type TransactionDirection = 'CREDIT' | 'DEBIT'; // Money In vs Money Out
export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET';

export interface Counterparty {
  name: string;        // "Zomato", "Rahul S."
  avatar?: string;     // URL to image
  type: 'MERCHANT' | 'PERSON';
}

export interface Transaction {
  id: string;
  externalId: string;      // "UPI-Ref-123..." (For Story Mode details)
  
  amount: number;          // Stored in PAISE (e.g., ₹299 = 29900)
  currency: 'INR';
  
  timestamp: string;       // ISO 8601 string: "2026-01-19T10:30:00Z"
  
  status: TransactionStatus;
  direction: TransactionDirection;
  method: PaymentMethod;
  
  counterparty: Counterparty;
  
  category: string;        // "Food", "Travel", "Salary" (For icons/grouping)
  description?: string;    // "Payment for Order #221"
}

// This is for the UI later when we group by date
export interface TransactionGroup {
  date: string; // "2026-01-19"
  transactions: Transaction[];
}