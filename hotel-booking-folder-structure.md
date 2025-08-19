# Hotel Booking Admin Panel - Complete Folder Structure

```
hotel-admin-panel/
├── apps/
│   ├── web/                                 # Next.js Frontend Application
│   │   ├── app/                            # App Router
│   │   │   ├── (auth)/                    # Auth Layout Group
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── (dashboard)/               # Dashboard Layout Group
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── bookings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── new/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── properties/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── rooms/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── settings/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── new/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── guests/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── revenue/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── occupancy/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── revenue-management/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── pricing/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── forecasting/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── channel-manager/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── connections/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── housekeeping/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── schedule/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── team/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── billing/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── api/                       # API Routes
│   │   │   │   ├── auth/
│   │   │   │   │   └── [...nextauth]/
│   │   │   │   │       └── route.ts
│   │   │   │   ├── upload/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhooks/
│   │   │   │       ├── stripe/
│   │   │   │       │   └── route.ts
│   │   │   │       └── booking-com/
│   │   │   │           └── route.ts
│   │   │   │
│   │   │   ├── layout.tsx                 # Root Layout
│   │   │   ├── page.tsx                   # Landing Page
│   │   │   ├── error.tsx                  # Error Boundary
│   │   │   ├── not-found.tsx              # 404 Page
│   │   │   └── providers.tsx              # Client Providers
│   │   │
│   │   ├── components/                    # Shared Components
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── RecentActivity.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── ErrorMessage.tsx
│   │   │       └── EmptyState.tsx
│   │   │
│   │   ├── hooks/                         # Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useMediaQuery.ts
│   │   │
│   │   ├── lib/                           # Utilities
│   │   │   ├── api-client.ts
│   │   │   ├── auth.ts
│   │   │   ├── constants.ts
│   │   │   ├── utils.ts
│   │   │   └── validations.ts
│   │   │
│   │   ├── styles/                        # Global Styles
│   │   │   ├── globals.css
│   │   │   └── theme.css
│   │   │
│   │   ├── public/                        # Static Assets
│   │   │   ├── images/
│   │   │   ├── fonts/
│   │   │   └── icons/
│   │   │
│   │   └── config/                        # Configuration
│   │       ├── site.ts
│   │       └── navigation.ts
│   │
│   └── api/                               # Backend Services
│       ├── booking-service/
│       │   ├── src/
│       │   │   ├── controllers/
│       │   │   │   ├── booking.controller.ts
│       │   │   │   └── availability.controller.ts
│       │   │   ├── services/
│       │   │   │   ├── booking.service.ts
│       │   │   │   └── pricing.service.ts
│       │   │   ├── models/
│       │   │   │   ├── booking.model.ts
│       │   │   │   └── guest.model.ts
│       │   │   ├── middleware/
│       │   │   │   ├── auth.middleware.ts
│       │   │   │   └── validation.middleware.ts
│       │   │   ├── routes/
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   ├── tests/
│       │   └── package.json
│       │
│       ├── property-service/
│       │   └── src/
│       │       ├── controllers/
│       │       ├── services/
│       │       ├── models/
│       │       └── routes/
│       │
│       └── shared/
│           ├── database/
│           │   ├── migrations/
│           │   ├── seeds/
│           │   └── config.ts
│           ├── middleware/
│           └── utils/
│
├── packages/                              # Shared Packages
│   ├── ui/                               # UI Component Library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   │   ├── Button/
│   │   │   │   │   │   ├── Button.tsx
│   │   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Card/
│   │   │   │   │   ├── Modal/
│   │   │   │   │   ├── Dropdown/
│   │   │   │   │   └── Table/
│   │   │   │   ├── forms/
│   │   │   │   │   ├── Input/
│   │   │   │   │   ├── Select/
│   │   │   │   │   ├── DatePicker/
│   │   │   │   │   └── FileUpload/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Container/
│   │   │   │   │   ├── Grid/
│   │   │   │   │   └── Stack/
│   │   │   │   └── feedback/
│   │   │   │       ├── Alert/
│   │   │   │       ├── Toast/
│   │   │   │       └── Skeleton/
│   │   │   ├── hooks/
│   │   │   │   ├── useClickOutside.ts
│   │   │   │   └── usePortal.ts
│   │   │   └── utils/
│   │   │       └── cn.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── types/                            # Shared TypeScript Types
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   ├── booking.types.ts
│   │   │   │   ├── property.types.ts
│   │   │   │   └── user.types.ts
│   │   │   ├── models/
│   │   │   │   ├── booking.model.ts
│   │   │   │   ├── property.model.ts
│   │   │   │   └── room.model.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── utils/                            # Shared Utilities
│       ├── src/
│       │   ├── validation/
│       │   │   ├── schemas/
│       │   │   └── validators.ts
│       │   ├── formatting/
│       │   │   ├── date.ts
│       │   │   ├── currency.ts
│       │   │   └── numbers.ts
│       │   ├── api-client/
│       │   │   ├── client.ts
│       │   │   └── interceptors.ts
│       │   └── helpers/
│       │       ├── array.ts
│       │       └── object.ts
│       └── package.json
│
├── features/                             # Feature Modules
│   ├── booking/
│   │   ├── components/
│   │   │   ├── BookingDashboard/
│   │   │   │   ├── BookingDashboard.tsx
│   │   │   │   ├── BookingDashboard.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── BookingForm/
│   │   │   ├── BookingTable/
│   │   │   ├── BookingCalendar/
│   │   │   └── BookingDetails/
│   │   ├── hooks/
│   │   │   ├── useBookings.ts
│   │   │   ├── useBookingFilters.ts
│   │   │   └── useBookingRealtime.ts
│   │   ├── services/
│   │   │   └── booking.service.ts
│   │   ├── stores/
│   │   │   └── booking.store.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── booking.helpers.ts
│   │
│   ├── property/
│   │   ├── components/
│   │   │   ├── PropertyList/
│   │   │   ├── PropertyForm/
│   │   │   ├── RoomManager/
│   │   │   └── AmenitySelector/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── RevenueDashboard/
│   │   │   ├── OccupancyChart/
│   │   │   ├── MetricsGrid/
│   │   │   └── ReportBuilder/
│   │   ├── hooks/
│   │   └── services/
│   │
│   ├── revenue-management/
│   │   ├── components/
│   │   │   ├── PricingEngine/
│   │   │   ├── ForecastingTool/
│   │   │   ├── CompetitorAnalysis/
│   │   │   └── YieldOptimizer/
│   │   └── services/
│   │
│   └── channel-manager/
│       ├── components/
│       │   ├── ChannelList/
│       │   ├── RateSync/
│       │   └── InventoryMapper/
│       └── integrations/
│           ├── booking-com/
│           ├── expedia/
│           └── airbnb/
│
├── infrastructure/                       # Infrastructure Configuration
│   ├── docker/
│   │   ├── web/
│   │   │   └── Dockerfile
│   │   ├── api/
│   │   │   └── Dockerfile
│   │   └── nginx/
│   │       └── nginx.conf
│   ├── kubernetes/
│   │   ├── deployments/
│   │   ├── services/
│   │   └── ingress/
│   └── terraform/
│       ├── modules/
│       ├── environments/
│       └── main.tf
│
├── tools/                                # Development Tools
│   ├── scripts/
│   │   ├── setup.sh
│   │   ├── deploy.sh
│   │   └── test.sh
│   └── generators/
│       ├── component/
│       ├── feature/
│       └── service/
│
├── docs/                                 # Documentation
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── user-guide/
│
├── .github/                              # GitHub Configuration
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── test.yml
│   └── CODEOWNERS
│
├── .vscode/                              # VS Code Configuration
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
│
├── package.json                          # Root Package
├── turbo.json                           # Turborepo Config
├── tsconfig.json                        # TypeScript Config
├── .eslintrc.js                         # ESLint Config
├── .prettierrc                          # Prettier Config
├── .gitignore                           # Git Ignore
├── .env.example                         # Environment Example
└── README.md                            # Project Documentation
```

## Key Files Examples

### 1. Root Configuration Files

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 2. Package Configuration

```json
// packages/ui/package.json
{
  "name": "@hotel-admin/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest",
    "storybook": "storybook dev -p 6006"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "tsup": "^7.0.0",
    "vitest": "^1.0.0"
  }
}
```

### 3. Feature Module Structure

```typescript
// features/booking/index.ts
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

// Re-export main feature component
export { BookingModule } from './BookingModule';
```

This folder structure provides:

1. **Clear separation of concerns** between frontend, backend, and shared code
2. **Modular architecture** with feature-based organization
3. **Reusable packages** for UI components, types, and utilities
4. **Scalable structure** that can grow with the application
5. **Development tooling** for productivity and consistency
6. **Infrastructure as code** for deployment and scaling
7. **Comprehensive testing** structure at all levels