import { Search, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GuestFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedLoyalty: string;
  setSelectedLoyalty: (loyalty: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
  statusOptions: Array<{ value: string; label: string }>;
  loyaltyOptions: Array<{ value: string; label: string }>;
}

export function GuestFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedLoyalty,
  setSelectedLoyalty,
  refreshing,
  onRefresh,
  statusOptions,
  loyaltyOptions
}: GuestFiltersProps) {
  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 w-full bg-transparent border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-transparent border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedLoyalty}
              onChange={(e) => setSelectedLoyalty(e.target.value)}
              className="px-3 py-2 bg-transparent border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {loyaltyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}