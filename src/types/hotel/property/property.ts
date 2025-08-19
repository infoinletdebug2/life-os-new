import type { Hotel } from '@/types/hotel';

// Extended Hotel/Property type for UI purposes
export interface ExtendedProperty extends Hotel {
  performanceIndicator?: 'up' | 'down' | 'stable';
  monthlyGrowth?: number;
  competitorComparison?: number;
}

// Property status type
export type PropertyStatus = 'active' | 'inactive' | 'maintenance' | 'closed';

// Property category type
export type PropertyCategory = 'luxury' | 'business' | 'boutique' | 'resort' | 'budget';