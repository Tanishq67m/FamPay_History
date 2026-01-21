export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

  if (isToday) {
    return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }

  if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const formatMonth = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};