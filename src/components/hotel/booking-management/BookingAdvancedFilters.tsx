import { useState } from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// Local type definitions
interface BookingFilters {
  searchQuery: string;
  status: string;
  paymentStatus: string;
  dateFilter: string;
  startDate: string;
  endDate: string;
  roomType?: string;
  roomCategory?: string;
}

interface DateFilterOption {
  value: string;
  label: string;
}

const DATE_FILTER_OPTIONS: DateFilterOption[] = [
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
import { cn } from '@/lib/utils';

interface BookingAdvancedFiltersProps {
  filters: BookingFilters;
  onFiltersChange: (filters: BookingFilters) => void;
  statusOptions: Array<{ value: string; label: string }>;
  paymentOptions: Array<{ value: string; label: string }>;
  roomCategories: string[];
  roomTypes: string[];
}

export function BookingAdvancedFilters({
  filters,
  onFiltersChange,
  statusOptions,
  paymentOptions,
  roomCategories,
  roomTypes
}: BookingAdvancedFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof BookingFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      status: 'all',
      paymentStatus: 'all',
      dateFilter: 'all',
      startDate: '',
      endDate: '',
      roomType: '',
      roomCategory: ''
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) => value && value !== 'all' && key !== 'searchQuery'
  ).length;

  return (
    <Card className="glass-card">
      <CardContent className="space-y-4 pt-6">
      {/* Main Filter Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by booking #, guest name, email, room..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={filters.dateFilter}
          onChange={(e) => handleFilterChange('dateFilter', e.target.value)}
          className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
        >
          {DATE_FILTER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.paymentStatus}
          onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
          className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
        >
          {paymentOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "gap-2",
            showAdvanced && "bg-cyan-500/20 border-cyan-500"
          )}
        >
          <Filter className="w-4 h-4" />
          Advanced
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-cyan-500 text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Custom Date Range */}
      {filters.dateFilter === 'custom' && (
        <div className="flex items-center gap-4 pl-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="px-3 py-1.5 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="px-3 py-1.5 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Room Category</label>
              <select
                value={filters.roomCategory || ''}
                onChange={(e) => handleFilterChange('roomCategory', e.target.value)}
                className="w-full px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="">All Categories</option>
                {roomCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Room Type</label>
              <select
                value={filters.roomType || ''}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className="w-full px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="">All Types</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  // Apply advanced filters
                  setShowAdvanced(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      </CardContent>
    </Card>
  );
}