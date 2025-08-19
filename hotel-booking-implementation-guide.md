# Hotel Booking Admin Panel - Implementation Guide

## Component Architecture Deep Dive

### 1. Core Component Library Structure

```typescript
// packages/ui/src/components/common/Button/Button.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### 2. Feature Module Implementation

```typescript
// features/booking/components/BookingDashboard.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, DataTable, DateRangePicker, MetricCard } from '@hotel-admin/ui';
import { bookingService } from '../services/booking.service';
import { useBookingFilters } from '../hooks/useBookingFilters';

export const BookingDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());
  const filters = useBookingFilters();
  
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['booking-metrics', dateRange],
    queryFn: () => bookingService.getMetrics(dateRange),
  });
  
  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => bookingService.getBookings(filters),
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Bookings"
          value={metrics?.totalBookings}
          change={metrics?.bookingChange}
          loading={metricsLoading}
        />
        <MetricCard
          title="Occupancy Rate"
          value={`${metrics?.occupancyRate}%`}
          change={metrics?.occupancyChange}
          loading={metricsLoading}
        />
        <MetricCard
          title="Average Daily Rate"
          value={`$${metrics?.adr}`}
          change={metrics?.adrChange}
          loading={metricsLoading}
        />
        <MetricCard
          title="RevPAR"
          value={`$${metrics?.revpar}`}
          change={metrics?.revparChange}
          loading={metricsLoading}
        />
      </div>

      {/* Bookings Table */}
      <Card>
        <Card.Header>
          <Card.Title>Recent Bookings</Card.Title>
          <Card.Description>
            Manage and track all property bookings
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <DataTable
            columns={bookingColumns}
            data={bookings?.data || []}
            loading={bookingsLoading}
            pagination={{
              pageSize: 20,
              total: bookings?.total,
            }}
            onRowClick={(booking) => navigateToBooking(booking.id)}
          />
        </Card.Content>
      </Card>
    </div>
  );
};
```

### 3. State Management Pattern

```typescript
// features/booking/stores/booking.store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface BookingState {
  selectedBookingId: string | null;
  filters: BookingFilters;
  viewMode: 'grid' | 'list' | 'calendar';
  
  // Actions
  setSelectedBooking: (id: string | null) => void;
  updateFilters: (filters: Partial<BookingFilters>) => void;
  setViewMode: (mode: 'grid' | 'list' | 'calendar') => void;
  resetFilters: () => void;
}

const defaultFilters: BookingFilters = {
  status: 'all',
  dateRange: null,
  propertyId: null,
  searchQuery: '',
};

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      immer((set) => ({
        selectedBookingId: null,
        filters: defaultFilters,
        viewMode: 'list',
        
        setSelectedBooking: (id) =>
          set((state) => {
            state.selectedBookingId = id;
          }),
          
        updateFilters: (filters) =>
          set((state) => {
            state.filters = { ...state.filters, ...filters };
          }),
          
        setViewMode: (mode) =>
          set((state) => {
            state.viewMode = mode;
          }),
          
        resetFilters: () =>
          set((state) => {
            state.filters = defaultFilters;
          }),
      })),
      {
        name: 'booking-store',
        partialize: (state) => ({ filters: state.filters, viewMode: state.viewMode }),
      }
    )
  )
);
```

### 4. API Service Layer

```typescript
// features/booking/services/booking.service.ts
import { apiClient } from '@hotel-admin/utils';
import type { Booking, BookingFilters, BookingMetrics } from '../types';

class BookingService {
  private readonly baseUrl = '/api/v1/bookings';

  async getBookings(filters: BookingFilters): Promise<PaginatedResponse<Booking>> {
    const params = this.buildQueryParams(filters);
    return apiClient.get(`${this.baseUrl}?${params}`);
  }

  async getBookingById(id: string): Promise<Booking> {
    return apiClient.get(`${this.baseUrl}/${id}`);
  }

  async createBooking(data: CreateBookingDto): Promise<Booking> {
    return apiClient.post(this.baseUrl, data);
  }

  async updateBooking(id: string, data: UpdateBookingDto): Promise<Booking> {
    return apiClient.patch(`${this.baseUrl}/${id}`, data);
  }

  async cancelBooking(id: string, reason: string): Promise<void> {
    return apiClient.post(`${this.baseUrl}/${id}/cancel`, { reason });
  }

  async getMetrics(dateRange: DateRange): Promise<BookingMetrics> {
    const params = new URLSearchParams({
      startDate: dateRange.from.toISOString(),
      endDate: dateRange.to.toISOString(),
    });
    return apiClient.get(`${this.baseUrl}/metrics?${params}`);
  }

  private buildQueryParams(filters: BookingFilters): URLSearchParams {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (value instanceof Date) {
          params.append(key, value.toISOString());
        } else {
          params.append(key, String(value));
        }
      }
    });
    
    return params;
  }
}

export const bookingService = new BookingService();
```

### 5. Real-time Updates with WebSocket

```typescript
// features/booking/hooks/useBookingRealtime.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '@hotel-admin/hooks';

interface BookingEvent {
  type: 'created' | 'updated' | 'cancelled';
  booking: Booking;
  timestamp: string;
}

export const useBookingRealtime = () => {
  const queryClient = useQueryClient();
  const { subscribe, unsubscribe } = useWebSocket();

  useEffect(() => {
    const handleBookingEvent = (event: BookingEvent) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking-metrics'] });
      
      // Update specific booking in cache if it exists
      if (event.type === 'updated') {
        queryClient.setQueryData(
          ['booking', event.booking.id],
          event.booking
        );
      }
      
      // Show notification
      showNotification({
        title: `Booking ${event.type}`,
        description: `Booking #${event.booking.confirmationNumber} has been ${event.type}`,
        type: 'info',
      });
    };

    subscribe('booking:*', handleBookingEvent);
    
    return () => {
      unsubscribe('booking:*', handleBookingEvent);
    };
  }, [queryClient, subscribe, unsubscribe]);
};
```

### 6. Advanced Dashboard Implementation

```typescript
// features/analytics/components/RevenueDashboard.tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { 
  LineChart, 
  BarChart, 
  PieChart,
  Card,
  Skeleton 
} from '@hotel-admin/ui';

const RevenueDashboard: React.FC = () => {
  return (
    <ErrorBoundary fallback={<DashboardError />}>
      <div className="grid grid-cols-12 gap-6">
        {/* KPI Cards */}
        <div className="col-span-12 lg:col-span-3">
          <Suspense fallback={<Skeleton className="h-32" />}>
            <RevenueKPICard />
          </Suspense>
        </div>
        
        {/* Revenue Trend Chart */}
        <div className="col-span-12 lg:col-span-9">
          <Card>
            <Card.Header>
              <Card.Title>Revenue Trend</Card.Title>
            </Card.Header>
            <Card.Content>
              <Suspense fallback={<Skeleton className="h-96" />}>
                <RevenueTrendChart />
              </Suspense>
            </Card.Content>
          </Card>
        </div>
        
        {/* Room Type Performance */}
        <div className="col-span-12 md:col-span-6">
          <Card>
            <Card.Header>
              <Card.Title>Performance by Room Type</Card.Title>
            </Card.Header>
            <Card.Content>
              <Suspense fallback={<Skeleton className="h-64" />}>
                <RoomTypePerformanceChart />
              </Suspense>
            </Card.Content>
          </Card>
        </div>
        
        {/* Channel Distribution */}
        <div className="col-span-12 md:col-span-6">
          <Card>
            <Card.Header>
              <Card.Title>Booking Channel Distribution</Card.Title>
            </Card.Header>
            <Card.Content>
              <Suspense fallback={<Skeleton className="h-64" />}>
                <ChannelDistributionChart />
              </Suspense>
            </Card.Content>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};
```

### 7. Mobile-First Responsive Design

```typescript
// components/layout/ResponsiveLayout.tsx
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@hotel-admin/hooks';
import { MobileSidebar, DesktopSidebar, BottomNav } from './navigation';

export const ResponsiveLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isTablet && (
        <DesktopSidebar className="fixed left-0 top-0 h-full w-64" />
      )}
      
      {/* Mobile Sidebar */}
      {isTablet && (
        <MobileSidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Main Content */}
      <main 
        className={cn(
          "min-h-screen transition-all duration-300",
          !isTablet && "ml-64",
          isMobile && "pb-16" // Space for bottom nav
        )}
      >
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNav />}
    </div>
  );
};
```

### 8. Performance Optimization Patterns

```typescript
// utils/performance/lazyComponents.ts
import { lazy, Suspense, ComponentType } from 'react';
import { Skeleton } from '@hotel-admin/ui';

export function lazyWithPreload<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(importFn);
  
  // Add preload method
  (LazyComponent as any).preload = importFn;
  
  // Wrapper with Suspense
  const WrappedComponent = (props: any) => (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  // Copy preload method to wrapper
  (WrappedComponent as any).preload = importFn;
  
  return WrappedComponent;
}

// Usage
export const RevenueManagement = lazyWithPreload(
  () => import('@features/revenue-management/RevenueManagement')
);

// Preload on hover
<Link 
  href="/revenue" 
  onMouseEnter={() => RevenueManagement.preload()}
>
  Revenue Management
</Link>
```

### 9. Testing Strategy

```typescript
// features/booking/components/__tests__/BookingDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookingDashboard } from '../BookingDashboard';
import { bookingService } from '../../services/booking.service';

jest.mock('../../services/booking.service');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('BookingDashboard', () => {
  it('should display booking metrics', async () => {
    const mockMetrics = {
      totalBookings: 150,
      occupancyRate: 85,
      adr: 120,
      revpar: 102,
    };
    
    (bookingService.getMetrics as jest.Mock).mockResolvedValue(mockMetrics);
    
    render(<BookingDashboard />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
      expect(screen.getByText('$120')).toBeInTheDocument();
      expect(screen.getByText('$102')).toBeInTheDocument();
    });
  });
  
  it('should filter bookings by date range', async () => {
    const user = userEvent.setup();
    
    render(<BookingDashboard />, { wrapper: createWrapper() });
    
    const dateRangePicker = screen.getByRole('button', { 
      name: /select date range/i 
    });
    
    await user.click(dateRangePicker);
    
    // Select date range
    const startDate = screen.getByLabelText('Start date');
    const endDate = screen.getByLabelText('End date');
    
    await user.type(startDate, '2024-01-01');
    await user.type(endDate, '2024-01-31');
    
    await user.click(screen.getByRole('button', { name: /apply/i }));
    
    expect(bookingService.getMetrics).toHaveBeenCalledWith({
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    });
  });
});
```

## Deployment Architecture

```yaml
# docker-compose.yml for local development
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - API_URL=http://api:4000
    depends_on:
      - api
      - redis
      
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/hotel_admin
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
      
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=hotel_admin
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Migration Strategy from Legacy Systems

1. **Phase 1: Data Migration**
   - Export data from legacy systems (CSV, XML, API)
   - Transform data to new schema
   - Validate data integrity
   - Run parallel systems for verification

2. **Phase 2: Feature Parity**
   - Implement core features matching legacy system
   - User acceptance testing
   - Staff training programs
   - Documentation preparation

3. **Phase 3: Gradual Rollout**
   - Pilot with single property
   - Gather feedback and iterate
   - Roll out to property groups
   - Full deployment

4. **Phase 4: Advanced Features**
   - Enable AI-powered features
   - Integrate advanced analytics
   - Custom module development
   - Third-party integrations