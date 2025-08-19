import { Calendar, Clock, CheckCircle, Users, DollarSign, CreditCard } from 'lucide-react';
import { formatCurrency } from './utils';

interface BookingStatsOverviewProps {
  stats: {
    total: number;
    requested: number;
    confirmed: number;
    checkedIn: number;
    pending: number;
    totalRevenue: number;
    paidRevenue: number;
  };
}

export function BookingStatsOverview({ stats }: BookingStatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-cyan-400" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-gray-400">Total Bookings</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-orange-400" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.requested}</p>
            <p className="text-sm text-gray-400">Requests</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-blue-400" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.confirmed}</p>
            <p className="text-sm text-gray-400">Confirmed</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-green-400" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.checkedIn}</p>
            <p className="text-sm text-gray-400">Checked In</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-2xl font-bold text-white">{stats.pending}</p>
            <p className="text-sm text-gray-400">Pending</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-emerald-400" />
          <div>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-sm text-gray-400">Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-purple-400" />
          <div>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.paidRevenue)}</p>
            <p className="text-sm text-gray-400">Paid Amount</p>
          </div>
        </div>
      </div>
    </div>
  );
}