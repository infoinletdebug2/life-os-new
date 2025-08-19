import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  trend?: 'up' | 'down';
  trendText: string;
  gradient?: string;
  delay?: number;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendText, 
  gradient = '', 
  delay = 0 
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard gradient={gradient as any} className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              )}
              <span className={cn(
                "text-sm font-medium",
                trend === 'up' || !trend ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {trendText}
              </span>
            </div>
          </div>
          <div className={`w-12 h-12 ${gradient ? `bg-${gradient}-500/10` : 'bg-primary/10'} rounded-full flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${gradient ? `text-${gradient}-500` : 'text-primary'}`} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}