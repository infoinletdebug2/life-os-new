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

// Extended status types to include 'requested' and 'rejected' from BookingManagement page
export type ExtendedBookingStatus = BookingStatusType | 'requested' | 'rejected';
export type ExtendedPaymentStatus = PaymentStatusType | 'refunded';

export const getStatusColor = (status: ExtendedBookingStatus) => {
  switch (status) {
    case 'confirmed':
      return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'checked-in':
      return 'bg-green-500/20 text-green-300 border-green-400/30';
    case 'checked-out':
      return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
    case 'cancelled':
      return 'bg-red-500/20 text-red-300 border-red-400/30';
    case 'requested':
      return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
    case 'rejected':
      return 'bg-red-500/20 text-red-300 border-red-400/30';
    case 'no-show':
      return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  }
};

export const getStatusIcon = (status: ExtendedBookingStatus) => {
  const iconProps = { className: "w-4 h-4" };
  
  switch (status) {
    case 'confirmed':
      return createElement(CheckCircle, iconProps);
    case 'checked-in':
      return createElement(CheckCircle, iconProps);
    case 'checked-out':
      return createElement(CheckCircle, iconProps);
    case 'pending':
      return createElement(Clock, iconProps);
    case 'cancelled':
      return createElement(AlertTriangle, iconProps);
    case 'requested':
      return createElement(Clock, iconProps);
    case 'rejected':
      return createElement(XCircle, iconProps);
    case 'no-show':
      return createElement(Ban, iconProps);
    default:
      return createElement(Clock, iconProps);
  }
};

export const getPaymentStatusColor = (status: ExtendedPaymentStatus) => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
    case 'partial':
      return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
    case 'pending':
      return 'bg-red-500/20 text-red-300 border-red-400/30';
    case 'failed':
      return 'bg-red-500/20 text-red-300 border-red-400/30';
    case 'refunded':
      return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    default:
      return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
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