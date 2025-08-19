import { 
  Clock,
  CheckCircle,
  UserCheck,
  LogOut,
  XCircle,
  AlertTriangle,
  CreditCard,
  DollarSign,
  RefreshCw,
  Ban
} from 'lucide-react';
import { createElement } from 'react';
import type { BookingStatusType, PaymentStatusType } from '@/types/hotel/booking/booking';

export const getStatusColor = (status: BookingStatusType) => {
  switch (status) {
    case 'confirmed':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'checked-in':
      return 'text-blue-600 dark:text-blue-400 bg-blue-500/10';
    case 'checked-out':
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
    case 'pending':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
    case 'cancelled':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    case 'no-show':
      return 'text-orange-600 dark:text-orange-400 bg-orange-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const getStatusIcon = (status: BookingStatusType) => {
  const iconProps = { className: "w-4 h-4" };
  
  switch (status) {
    case 'confirmed':
      return createElement(CheckCircle, iconProps);
    case 'checked-in':
      return createElement(UserCheck, iconProps);
    case 'checked-out':
      return createElement(LogOut, iconProps);
    case 'pending':
      return createElement(Clock, iconProps);
    case 'cancelled':
      return createElement(XCircle, iconProps);
    case 'no-show':
      return createElement(Ban, iconProps);
    default:
      return createElement(AlertTriangle, iconProps);
  }
};

export const getPaymentStatusColor = (status: PaymentStatusType) => {
  switch (status) {
    case 'paid':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'partial':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10';
    case 'pending':
      return 'text-orange-600 dark:text-orange-400 bg-orange-500/10';
    case 'failed':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    case 'refunded':
      return 'text-blue-600 dark:text-blue-400 bg-blue-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};