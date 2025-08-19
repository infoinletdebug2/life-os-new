import type { Guest } from '@/types/hotel';

// Guest status types
export type GuestStatus = 'active' | 'vip' | 'blacklisted' | 'inactive';
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

// Extended Guest type with additional fields
export interface ExtendedGuest extends Guest {
  profilePicture?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  nationality?: string;
  occupation?: string;
  company?: string;
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
  lifetimeValue: number;
  averageSpend: number;
  lastStay?: string;
  nextReservation?: string;
  communicationPreference: 'email' | 'phone' | 'sms' | 'none';
  dietaryRestrictions?: string[];
  roomPreferences?: string[];
  specialNotes?: string;
  tags?: string[];
  status: GuestStatus;
}