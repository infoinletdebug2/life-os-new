import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';

interface BookingStatsProps {
  stats: {
    totalBookings: number;
    todayArrivals: number;
    todayDepartures: number;
    totalRevenue: number;
    occupancyRate: number;
    averageDailyRate: number;
  };
  formatCurrency: (amount: number) => string;
}

export function BookingStats({ stats, formatCurrency }: BookingStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Bookings</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-4 text-center border-blue-500/20 bg-blue-500/5">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.todayArrivals}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Today Arrivals</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-4 text-center border-orange-500/20 bg-orange-500/5">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.todayDepartures}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Today Departures</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard gradient="emerald" className="p-4 text-center">
          <div className="text-2xl font-bold">
            {formatCurrency(stats.totalRevenue)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Total Revenue</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
          <div className="text-xs text-muted-foreground mt-1">Occupancy Rate</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard gradient="cyan" className="p-4 text-center">
          <div className="text-2xl font-bold">{formatCurrency(stats.averageDailyRate)}</div>
          <div className="text-xs text-muted-foreground mt-1">Avg Daily Rate</div>
        </GlassCard>
      </motion.div>
    </div>
  );
}