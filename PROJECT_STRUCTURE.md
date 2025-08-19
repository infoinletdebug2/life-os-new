# Hotel Booking Admin Panel - Project Structure

## Complete Folder Structure

```
src/
├── assets/                      # Static assets
│   ├── fonts/                   # Custom fonts
│   ├── icons/                   # Icon files (SVG, PNG)
│   └── images/                  # Images and illustrations
│
├── components/                  # Reusable UI components
│   ├── common/                  # Generic UI components
│   │   ├── Avatar/
│   │   │   ├── index.tsx
│   │   │   ├── types.ts
│   │   │   └── Avatar.css
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Dropdown/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   ├── Table/
│   │   ├── Tooltip/
│   │   └── index.ts            # Barrel export
│   │
│   ├── charts/                  # Chart components
│   │   ├── AreaChart/
│   │   ├── BarChart/
│   │   ├── LineChart/
│   │   ├── PieChart/
│   │   └── index.ts
│   │
│   ├── forms/                   # Form-specific components
│   │   ├── FormCheckbox/
│   │   ├── FormDatePicker/
│   │   ├── FormField/
│   │   ├── FormSelect/
│   │   ├── FormUpload/
│   │   └── index.ts
│   │
│   └── layouts/                 # Layout components
│       ├── Footer/
│       ├── Header/
│       ├── PageLayout/
│       ├── Sidebar/
│       └── index.ts
│
├── config/                      # Application configuration
│   ├── api.config.ts           # API endpoints configuration
│   ├── app.config.ts           # General app configuration
│   ├── chart.config.ts         # Chart library configuration
│   ├── theme.config.ts         # Theme configuration
│   └── index.ts
│
├── constants/                   # Application constants
│   ├── api.ts                  # API-related constants
│   ├── booking.ts              # Booking status, types
│   ├── permissions.ts          # User permissions
│   ├── room.ts                 # Room types, statuses
│   ├── routes.ts               # Route paths
│   ├── validation.ts           # Validation rules
│   └── index.ts
│
├── features/                    # Feature-based modules
│   ├── bookings/
│   │   ├── components/
│   │   │   ├── BookingCalendar/
│   │   │   ├── BookingCard/
│   │   │   ├── BookingDetails/
│   │   │   ├── BookingFilters/
│   │   │   ├── BookingForm/
│   │   │   ├── BookingList/
│   │   │   ├── BookingSearch/
│   │   │   ├── BookingStatus/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useBooking.ts
│   │   │   ├── useBookingFilters.ts
│   │   │   └── useBookingSearch.ts
│   │   ├── services/
│   │   │   └── booking.service.ts
│   │   ├── types/
│   │   │   └── booking.types.ts
│   │   └── index.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── AlertsPanel/
│   │   │   ├── BookingStats/
│   │   │   ├── DashboardOverview/
│   │   │   ├── GuestStats/
│   │   │   ├── OccupancyChart/
│   │   │   ├── PerformanceMetrics/
│   │   │   ├── RecentBookings/
│   │   │   ├── RevenueChart/
│   │   │   ├── RoomStatusGrid/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── guests/
│   │   ├── components/
│   │   │   ├── GuestCard/
│   │   │   ├── GuestDetails/
│   │   │   ├── GuestForm/
│   │   │   ├── GuestHistory/
│   │   │   ├── GuestList/
│   │   │   ├── GuestPreferences/
│   │   │   ├── GuestSearch/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── properties/
│   │   ├── components/
│   │   │   ├── PropertyCard/
│   │   │   ├── PropertyDetails/
│   │   │   ├── PropertyForm/
│   │   │   ├── PropertyGallery/
│   │   │   ├── PropertyList/
│   │   │   ├── PropertySettings/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── reports/
│   │   ├── components/
│   │   │   ├── OccupancyReport/
│   │   │   ├── ReportBuilder/
│   │   │   ├── ReportExport/
│   │   │   ├── ReportFilters/
│   │   │   ├── ReportScheduler/
│   │   │   ├── ReportTemplates/
│   │   │   ├── RevenueReport/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── revenue/
│   │   ├── components/
│   │   │   ├── BillingHistory/
│   │   │   ├── InvoiceGenerator/
│   │   │   ├── PaymentProcessor/
│   │   │   ├── PricingRules/
│   │   │   ├── RateManager/
│   │   │   ├── RevenueAnalytics/
│   │   │   ├── RevenueForecast/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── rooms/
│   │   ├── components/
│   │   │   ├── RoomAvailability/
│   │   │   ├── RoomCard/
│   │   │   ├── RoomDetails/
│   │   │   ├── RoomForm/
│   │   │   ├── RoomInventory/
│   │   │   ├── RoomList/
│   │   │   ├── RoomMaintenance/
│   │   │   ├── RoomStatus/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── settings/
│   │   ├── components/
│   │   │   ├── BillingSettings/
│   │   │   ├── GeneralSettings/
│   │   │   ├── IntegrationSettings/
│   │   │   ├── NotificationSettings/
│   │   │   ├── ProfileSettings/
│   │   │   ├── PropertySettings/
│   │   │   ├── SecuritySettings/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── staff/
│       ├── components/
│       │   ├── PermissionsManager/
│       │   ├── RoleManager/
│       │   ├── StaffCard/
│       │   ├── StaffDetails/
│       │   ├── StaffForm/
│       │   ├── StaffList/
│       │   ├── StaffSchedule/
│       │   └── index.ts
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
│
├── hooks/                       # Global custom hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useFilter.ts
│   ├── useLocalStorage.ts
│   ├── useModal.ts
│   ├── usePagination.ts
│   ├── usePermissions.ts
│   ├── useSort.ts
│   ├── useToast.ts
│   ├── useWebSocket.ts
│   └── index.ts
│
├── locales/                     # Internationalization
│   ├── en/
│   │   ├── common.json
│   │   ├── booking.json
│   │   └── ...
│   └── es/
│       ├── common.json
│       ├── booking.json
│       └── ...
│
├── pages/                       # Route pages
│   ├── Auth/
│   │   ├── Login/
│   │   ├── ForgotPassword/
│   │   └── ResetPassword/
│   ├── Bookings/
│   │   ├── index.tsx
│   │   └── BookingDetails/
│   ├── Dashboard/
│   │   └── index.tsx
│   ├── Guests/
│   │   ├── index.tsx
│   │   └── GuestDetails/
│   ├── NotFound/
│   ├── Properties/
│   │   ├── index.tsx
│   │   └── PropertyDetails/
│   ├── Reports/
│   ├── Revenue/
│   ├── Rooms/
│   ├── Settings/
│   ├── Staff/
│   └── index.ts
│
├── services/                    # API and external services
│   ├── api/
│   │   ├── auth.service.ts
│   │   ├── base.service.ts
│   │   ├── booking.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── guest.service.ts
│   │   ├── property.service.ts
│   │   ├── report.service.ts
│   │   ├── revenue.service.ts
│   │   ├── room.service.ts
│   │   ├── staff.service.ts
│   │   └── index.ts
│   ├── analytics/
│   ├── export/
│   ├── notification/
│   └── websocket/
│
├── store/                       # Redux store
│   ├── hooks/
│   │   └── index.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── bookingSlice.ts
│   │   ├── guestSlice.ts
│   │   ├── notificationSlice.ts
│   │   ├── propertySlice.ts
│   │   └── roomSlice.ts
│   └── index.ts
│
├── styles/                      # Global styles
│   ├── animations.css
│   ├── index.css
│   ├── reset.css
│   ├── typography.css
│   ├── utilities.css
│   └── variables.css
│
├── tests/                       # Test files
│   ├── e2e/
│   ├── integration/
│   └── unit/
│
├── types/                       # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   ├── booking.ts
│   ├── common.ts
│   ├── guest.ts
│   ├── property.ts
│   ├── report.ts
│   ├── revenue.ts
│   ├── room.ts
│   ├── staff.ts
│   └── index.ts
│
└── utils/                       # Utility functions
    ├── analytics.ts
    ├── currency.ts
    ├── date.ts
    ├── export.ts
    ├── format.ts
    ├── permissions.ts
    ├── storage.ts
    ├── validation.ts
    └── index.ts
```

## Key Design Decisions

### 1. **Feature-Based Organization**
Each major feature (bookings, properties, rooms, etc.) has its own module with:
- Components specific to that feature
- Custom hooks for feature logic
- Services for API calls
- Type definitions

### 2. **Component Structure**
Each component folder contains:
- `index.tsx` - Main component file
- `types.ts` - TypeScript interfaces and types
- `ComponentName.css` - Component-specific styles
- `ComponentName.test.tsx` - Component tests (when needed)

### 3. **Barrel Exports**
Every folder has an `index.ts` file for clean imports:
```typescript
// Instead of
import { Button } from '@/components/common/Button/index'

// You can do
import { Button } from '@/components/common'
```

### 4. **Separation of Concerns**
- **Pages**: Route-level components
- **Features**: Business logic and feature-specific components
- **Components**: Reusable UI components
- **Services**: API and external service integrations
- **Utils**: Pure utility functions
- **Hooks**: Custom React hooks
- **Types**: TypeScript type definitions

### 5. **Scalability Considerations**
- Feature modules can be easily added or removed
- Components are highly reusable
- Clear separation between UI and business logic
- Consistent file naming and structure

This structure supports:
- Easy navigation
- Code splitting by feature
- Lazy loading of routes
- Maintainable and scalable codebase
- Clear ownership of features
- Easy testing strategy implementation