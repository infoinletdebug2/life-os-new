import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';

interface RoomStatsProps {
  stats: {
    total: number;
    available: number;
    occupied: number;
    housekeeping: number;
    maintenance: number;
    averageOccupancy: number;
  };
}

export function RoomStats({ stats }: RoomStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Rooms</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-4 text-center border-green-500/20 bg-green-500/5">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.available}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Available</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-4 text-center border-blue-500/20 bg-blue-500/5">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.occupied}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Occupied</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-4 text-center border-yellow-500/20 bg-yellow-500/5">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.housekeeping}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Housekeeping</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-4 text-center border-orange-500/20 bg-orange-500/5">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.maintenance}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Maintenance</div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard gradient="cyan" className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.averageOccupancy}%</div>
          <div className="text-xs text-muted-foreground mt-1">Avg Occupancy</div>
        </GlassCard>
      </motion.div>
    </div>
  );
}