import { Calendar, Users, Clock, CheckCircle, AlertCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from './utils';

interface BookingStats {
  total: number;
  requested: number;
  confirmed: number;
  checkedIn: number;
  checkedOut: number;
  pending: number;
  cancelled: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  tomorrowCheckIns: number;
  tomorrowCheckOuts: number;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  occupancyRate: number;
}

interface BookingDashboardProps {
  stats: BookingStats;
}

export function BookingDashboard({ stats }: BookingDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {/* Today's Activity */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/10 dark:to-blue-600/10 backdrop-blur-xl border border-blue-500/20 dark:border-blue-500/20 rounded-xl p-5 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-200 mb-1">Today's Check-ins</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.todayCheckIns}</p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">
              {stats.tomorrowCheckIns} tomorrow
            </p>
          </div>
          <div className="p-3 bg-blue-500/20 dark:bg-blue-500/20 rounded-lg">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 dark:from-orange-500/10 dark:to-orange-600/10 backdrop-blur-xl border border-orange-500/20 dark:border-orange-500/20 rounded-xl p-5 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-orange-700 dark:text-orange-200 mb-1">Today's Check-outs</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.todayCheckOuts}</p>
            <p className="text-xs text-orange-600 dark:text-orange-300 mt-2">
              {stats.tomorrowCheckOuts} tomorrow
            </p>
          </div>
          <div className="p-3 bg-orange-500/20 dark:bg-orange-500/20 rounded-lg">
            <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Occupancy */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-xl border border-green-500/20 rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-green-200 mb-1">Occupancy Rate</p>
            <p className="text-3xl font-bold text-white">{stats.occupancyRate}%</p>
            <div className="flex items-center gap-1 mt-2">
              {stats.occupancyRate > 75 ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <p className="text-xs text-green-300">
                {stats.checkedIn} rooms occupied
              </p>
            </div>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Calendar className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-yellow-200 mb-1">Pending Actions</p>
            <p className="text-3xl font-bold text-white">{stats.requested + stats.pending}</p>
            <div className="flex gap-3 mt-2">
              <p className="text-xs text-yellow-600 dark:text-yellow-300">
                {stats.requested} requests
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-300">
                {stats.pending} pending
              </p>
            </div>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-emerald-200 mb-1">Today's Revenue</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.paidRevenue)}</p>
            <div className="flex gap-2 mt-2">
              <p className="text-xs text-emerald-300">
                Pending: {formatCurrency(stats.pendingRevenue)}
              </p>
            </div>
          </div>
          <div className="p-3 bg-emerald-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}