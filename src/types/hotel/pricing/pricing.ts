export interface SeasonalRate {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  multiplier: number; // e.g., 1.2 for 20% increase
  color?: string;
}

export interface WeeklyRate {
  id: string;
  name: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday  
  multiplier: number;
}

export interface SpecialRate {
  id: string;
  name: string;
  date: string;
  multiplier: number;
  color?: string;
  description?: string;
}

export interface RoomPricing {
  id: string;
  roomTypeId: string;
  baseRate: number;
  currency: 'USD' | 'EUR' | 'GBP';
  seasonalRates: SeasonalRate[];
  weeklyRates: WeeklyRate[];
  specialRates: SpecialRate[];
  minimumStay?: number;
  maximumStay?: number;
  advanceBookingDiscount?: {
    days: number;
    discountPercentage: number;
  };
  lastMinuteDiscount?: {
    hours: number;
    discountPercentage: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type PricingPeriod = 'daily' | 'weekly' | 'monthly' | 'seasonal';

export interface PricingRule {
  id: string;
  name: string;
  type: 'seasonal' | 'weekly' | 'special' | 'advance' | 'lastminute';
  isActive: boolean;
  priority: number;
  conditions: {
    dateRange?: {
      start: string;
      end: string;
    };
    daysOfWeek?: number[];
    advanceDays?: number;
    lastMinuteHours?: number;
  };
  adjustment: {
    type: 'percentage' | 'fixed';
    value: number; // positive for increase, negative for decrease
  };
}