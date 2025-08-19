export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Main routes
  DASHBOARD: '/',
  
  // Property routes
  PROPERTIES: '/properties',
  PROPERTY_DETAILS: '/properties/:id',
  PROPERTY_CREATE: '/properties/new',
  PROPERTY_EDIT: '/properties/:id/edit',
  
  // Booking routes
  BOOKINGS: '/bookings',
  BOOKING_DETAILS: '/bookings/:id',
  BOOKING_CREATE: '/bookings/new',
  BOOKING_EDIT: '/bookings/:id/edit',
  
  // Room routes
  ROOMS: '/rooms',
  ROOM_DETAILS: '/rooms/:id',
  ROOM_CREATE: '/rooms/new',
  ROOM_EDIT: '/rooms/:id/edit',
  
  // Guest routes
  GUESTS: '/guests',
  GUEST_DETAILS: '/guests/:id',
  GUEST_CREATE: '/guests/new',
  GUEST_EDIT: '/guests/:id/edit',
  
  // Revenue routes
  REVENUE: '/revenue',
  REVENUE_REPORTS: '/revenue/reports',
  
  // Staff routes
  STAFF: '/staff',
  STAFF_DETAILS: '/staff/:id',
  STAFF_CREATE: '/staff/new',
  STAFF_EDIT: '/staff/:id/edit',
  
  // Report routes
  REPORTS: '/reports',
  
  // Settings routes
  SETTINGS: '/settings',
  SETTINGS_PROFILE: '/settings/profile',
  SETTINGS_PROPERTIES: '/settings/properties',
  SETTINGS_BILLING: '/settings/billing',
  SETTINGS_INTEGRATIONS: '/settings/integrations',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
} as const