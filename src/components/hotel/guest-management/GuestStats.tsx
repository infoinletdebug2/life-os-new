import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';

interface GuestStatsProps {
  stats: {
    totalGuests: number;
    activeGuests: number;
    vipGuests: number;
    totalRevenue: number;
    averageLifetimeValue: number;
    topSpenders: number;
  };
  formatCurrency: (amount: number) => string;
}

export function GuestStats({ stats, formatCurrency }: GuestStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.totalGuests}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Guests</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-4 text-center border-green-500/20 bg-green-500/5">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.activeGuests}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Active</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-4 text-center border-purple-500/20 bg-purple-500/5">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.vipGuests}
          </div>
          <div className="text-xs text-muted-foreground mt-1">VIP Guests</div>
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
          <div className="text-2xl font-bold">
            {formatCurrency(stats.averageLifetimeValue)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Avg LTV</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard gradient="cyan" className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.topSpenders}</div>
          <div className="text-xs text-muted-foreground mt-1">Top Spenders</div>
        </GlassCard>
      </motion.div>
    </div>
  );
}