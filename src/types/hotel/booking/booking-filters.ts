export interface BookingFilters {
  searchQuery: string;
  status: string;
  paymentStatus: string;
  dateFilter: string;
  startDate: string;
  endDate: string;
  roomType?: string;
  roomCategory?: string;
}

export interface DateFilterOption {
  value: string;
  label: string;
}

export const DATE_FILTER_OPTIONS: DateFilterOption[] = [
  { value: 'all', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'today-checkin', label: "Today's Check-ins" },
  { value: 'today-checkout', label: "Today's Check-outs" },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this-week', label: 'This Week' },
  { value: 'next-week', label: 'Next Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'next-month', label: 'Next Month' },
  { value: 'custom', label: 'Custom Range' }
];