import { 
  UserCheck,
  Award,
  UserX,
  Users
} from 'lucide-react';
import { createElement } from 'react';
import type { GuestStatus, LoyaltyTier } from '@/types/hotel/guest/guest';

export const getStatusColor = (status: GuestStatus) => {
  switch (status) {
    case 'active':
      return 'text-green-600 dark:text-green-400 bg-green-500/10';
    case 'vip':
      return 'text-purple-600 dark:text-purple-400 bg-purple-500/10';
    case 'blacklisted':
      return 'text-red-600 dark:text-red-400 bg-red-500/10';
    case 'inactive':
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const getStatusIcon = (status: GuestStatus) => {
  const iconProps = { className: "w-4 h-4" };
  
  switch (status) {
    case 'active':
      return createElement(UserCheck, iconProps);
    case 'vip':
      return createElement(Award, iconProps);
    case 'blacklisted':
      return createElement(UserX, iconProps);
    case 'inactive':
      return createElement(Users, iconProps);
    default:
      return createElement(Users, iconProps);
  }
};

export const getLoyaltyColor = (tier: LoyaltyTier) => {
  switch (tier) {
    case 'diamond':
      return 'text-cyan-600 dark:text-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20';
    case 'platinum':
      return 'text-slate-600 dark:text-slate-400 bg-gradient-to-br from-slate-500/20 to-gray-500/20';
    case 'gold':
      return 'text-yellow-600 dark:text-yellow-400 bg-gradient-to-br from-yellow-500/20 to-amber-500/20';
    case 'silver':
      return 'text-gray-600 dark:text-gray-400 bg-gradient-to-br from-gray-400/20 to-gray-500/20';
    case 'bronze':
      return 'text-orange-600 dark:text-orange-400 bg-gradient-to-br from-orange-500/20 to-amber-600/20';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-500/10';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};