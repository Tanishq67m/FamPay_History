export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
export type TransactionDirection = 'CREDIT' | 'DEBIT';
export type PaymentMethod = 'UPI' | 'CARD' | 'WALLET' | 'OTHERS';
export type TransactionCategory = 'FOOD' | 'TRAVEL' | 'SHOPPING' | 'TRANSFER' | 'OTHERS';

export interface Money {
  amount: number; // Stored in minor units (paise) to avoid float issues, but we can treat as normal for this demo if preferred. Let's stick to standard float for simplicity unless user wants strict int.
  // Actually, standard practice for simple display is often just number. Let's use number and assume it is the full amount (e.g. 250.50) for simplicity in this frontend demo, or better, minor units.
  // Let's use minor units (paise) to be robust. 
  // Update: To keep it easy for the UI, let's store `amount` as the actual display value (e.g., 299) but types usually have currency.
  value: number;
  currency: string; // 'INR'
}

export interface Counterparty {
  id: string;
  name: string;
  avatar?: string; // URL
  vpa?: string;    // e.g. 'zomato@upi'
}

export interface Transaction {
  id: string;
  timestamp: string; // ISO 8601 string
  status: TransactionStatus;
  direction: TransactionDirection;
  amount: number; // For simplicity in this demo, let's use the raw number.
  currency: string;
  counterparty: Counterparty;
  description?: string;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
}

export interface DailyTransactions {
  date: string; // YYYY-MM-DD
  transactions: Transaction[];
}