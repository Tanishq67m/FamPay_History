// src/lib/formatters.ts

export const formatCurrency = (amountInPaise: number) => {
  // 1. Safety check for bad data
  if (isNaN(amountInPaise)) return "₹0.00";

  // 2. Convert to rupees
  const inRupees = amountInPaise / 100;

  // 3. Use the browser's native formatter (highly performant)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(inRupees);
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  // Returns "10:30 AM"
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};