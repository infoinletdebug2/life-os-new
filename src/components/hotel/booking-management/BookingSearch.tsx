import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BookingSearchProps {
  searchQuery: string;
  selectedStatus: string;
  selectedPayment: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
  statusOptions: Array<{ value: string; label: string }>;
  paymentOptions: Array<{ value: string; label: string }>;
}

export function BookingSearch({
  searchQuery,
  selectedStatus,
  selectedPayment,
  onSearchChange,
  onStatusChange,
  onPaymentChange,
  statusOptions,
  paymentOptions
}: BookingSearchProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search bookings, guests, rooms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500"
          />
        </div>
        
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={selectedPayment}
          onChange={(e) => onPaymentChange(e.target.value)}
          className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
        >
          {paymentOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>
    </div>
  );
}