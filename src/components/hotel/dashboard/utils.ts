export const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
    case 'checked-in':
    case 'completed':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'pending':
    case 'in-progress':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
    case 'cancelled':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};