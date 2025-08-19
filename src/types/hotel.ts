// Hotel Management System Types

export interface Hotel {
  id: string;
  name: string;
  description: string;
  category: 'luxury' | 'business' | 'boutique' | 'resort' | 'budget';
  starRating: 1 | 2 | 3 | 4 | 5;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    emergencyContact: string;
  };
  images: {
    main: string;
    gallery: string[];
    logo?: string;
  };
  amenities: HotelAmenity[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    childPolicy: string;
    petPolicy: string;
    smokingPolicy: string;
  };
  settings: {
    currency: string;
    timezone: string;
    language: string;
    taxRate: number;
    serviceCharge: number;
  };
  status: 'active' | 'inactive' | 'maintenance' | 'closed';
  stats: HotelStats;
  createdAt: string;
  updatedAt: string;
}

export interface HotelAmenity {
  id: string;
  name: string;
  category: 'room' | 'property' | 'business' | 'recreation' | 'dining';
  icon: string;
  description?: string;
  available: boolean;
}

export interface HotelStats {
  totalRooms: number;
  availableRooms: number;
  occupancyRate: number;
  averageDailyRate: number;
  revpar: number;
  totalRevenue: number;
  guestSatisfaction: number;
  repeatGuests: number;
}

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  floor: number;
  type: RoomType;
  category: 'standard' | 'deluxe' | 'suite' | 'executive' | 'presidential';
  status: 'available' | 'occupied' | 'maintenance' | 'out-of-order' | 'housekeeping';
  capacity: {
    adults: number;
    children: number;
    maxOccupancy: number;
  };
  bedConfiguration: {
    type: 'single' | 'double' | 'queen' | 'king' | 'twin';
    count: number;
  };
  size: number; // in sq ft
  view: 'city' | 'ocean' | 'garden' | 'mountain' | 'pool' | 'courtyard';
  amenities: string[];
  images: string[];
  pricing: {
    baseRate: number;
    currency: string;
    seasonalRates: SeasonalRate[];
    weekendRate: number;
  };
  housekeeping: {
    lastCleaned: string;
    assignedStaff?: string;
    estimatedCleanTime: number;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  };
  maintenance: {
    lastInspection: string;
    nextInspection: string;
    issues: MaintenanceIssue[];
  };
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  maxOccupancy: number;
  amenities: string[];
  images: string[];
}

export interface SeasonalRate {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  multiplier: number;
  fixedRate?: number;
}

export interface MaintenanceIssue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'assigned' | 'in-progress' | 'resolved';
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Booking {
  id: string;
  confirmationNumber: string;
  hotelId: string;
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  roomRate: number;
  totalAmount: number;
  taxes: number;
  fees: BookingFee[];
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded' | 'failed';
  source: 'direct' | 'booking.com' | 'expedia' | 'airbnb' | 'phone' | 'walk-in';
  specialRequests: string[];
  assignedRooms: string[];
  checkinDetails?: CheckinDetails;
  checkoutDetails?: CheckoutDetails;
  cancellation?: CancellationDetails;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFee {
  id: string;
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  mandatory: boolean;
  taxable: boolean;
}

export interface CheckinDetails {
  checkedInAt: string;
  checkedInBy: string;
  actualRoom: string;
  keyCardsIssued: number;
  depositAmount: number;
  notes?: string;
}

export interface CheckoutDetails {
  checkedOutAt: string;
  checkedOutBy: string;
  finalAmount: number;
  refundAmount: number;
  incidentals: Incidental[];
  feedback?: string;
  rating?: number;
}

export interface Incidental {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: 'minibar' | 'room-service' | 'spa' | 'restaurant' | 'laundry' | 'parking' | 'other';
}

export interface CancellationDetails {
  cancelledAt: string;
  reason: string;
  refundAmount: number;
  cancellationFee: number;
  cancelledBy: string;
}

export interface Guest {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    nationality: string;
    gender?: 'male' | 'female' | 'other';
  };
  identification: {
    type: 'passport' | 'driver-license' | 'national-id';
    number: string;
    expiryDate?: string;
    issuingCountry: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  preferences: {
    roomType?: string;
    floor?: string;
    view?: string;
    bedType?: string;
    smokingPreference: boolean;
    accessibilityNeeds: string[];
    dietaryRestrictions: string[];
    communicationPrefs: {
      email: boolean;
      sms: boolean;
      phone: boolean;
    };
  };
  loyaltyProgram?: {
    tierId: string;
    points: number;
    joinDate: string;
    benefits: string[];
  };
  bookingHistory: string[];
  blacklisted: boolean;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  employment: {
    employeeId: string;
    department: 'front-desk' | 'housekeeping' | 'maintenance' | 'food-beverage' | 'management' | 'security' | 'concierge';
    position: string;
    hireDate: string;
    status: 'active' | 'inactive' | 'on-leave' | 'terminated';
    salary: number;
    workSchedule: WorkSchedule;
  };
  permissions: {
    role: 'admin' | 'manager' | 'supervisor' | 'staff';
    modules: string[];
    canOverridePricing: boolean;
    canCancelBookings: boolean;
    canRefund: boolean;
  };
  performance: {
    rating: number;
    reviews: string[];
    trainingCompleted: string[];
    certifications: string[];
  };
  attendance: {
    clockIn?: string;
    clockOut?: string;
    hoursWorked: number;
    overtime: number;
  };
}

export interface WorkSchedule {
  monday: ShiftSchedule;
  tuesday: ShiftSchedule;
  wednesday: ShiftSchedule;
  thursday: ShiftSchedule;
  friday: ShiftSchedule;
  saturday: ShiftSchedule;
  sunday: ShiftSchedule;
}

export interface ShiftSchedule {
  isWorking: boolean;
  startTime?: string;
  endTime?: string;
  breakTime?: number;
}

export interface Analytics {
  occupancy: {
    current: number;
    mtd: number;
    ytd: number;
    forecast: number[];
    trend: 'up' | 'down' | 'stable';
  };
  revenue: {
    today: number;
    mtd: number;
    ytd: number;
    forecast: number[];
    breakdown: RevenueBreakdown;
  };
  adr: {
    current: number;
    mtd: number;
    ytd: number;
    competitive: number;
    trend: 'up' | 'down' | 'stable';
  };
  revpar: {
    current: number;
    mtd: number;
    ytd: number;
    competitive: number;
  };
  guestSatisfaction: {
    overall: number;
    categories: {
      cleanliness: number;
      service: number;
      value: number;
      location: number;
      amenities: number;
    };
    trends: number[];
  };
  bookingMetrics: {
    totalBookings: number;
    directBookings: number;
    otaBookings: number;
    averageLeadTime: number;
    cancellationRate: number;
    noShowRate: number;
  };
}

export interface RevenueBreakdown {
  rooms: number;
  foodBeverage: number;
  spa: number;
  parking: number;
  other: number;
}

// Dashboard & UI Types
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'calendar';
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number; w: number; h: number };
  config: any;
  refreshRate: number;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  types: {
    bookings: boolean;
    cancellations: boolean;
    maintenance: boolean;
    revenue: boolean;
    staff: boolean;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string[];
  hotelId?: string;
  roomType?: string;
  source?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}