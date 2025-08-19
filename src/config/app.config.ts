export const APP_CONFIG = {
  name: 'Hotel Admin Panel',
  version: '1.0.0',
  description: 'Comprehensive hotel management system',
  
  // Feature flags
  features: {
    multiProperty: true,
    channelManager: true,
    revenueManagement: true,
    guestMessaging: true,
    mobileApp: false,
    advancedAnalytics: true,
  },
  
  // Pagination defaults
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  
  // Date/time settings
  dateTime: {
    defaultTimezone: 'UTC',
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm',
    dateTimeFormat: 'yyyy-MM-dd HH:mm',
  },
  
  // Currency settings
  currency: {
    default: 'USD',
    symbol: '$',
    decimalPlaces: 2,
  },
  
  // Notification settings
  notifications: {
    position: 'top-right',
    duration: 5000,
    maxCount: 3,
  },
} as const