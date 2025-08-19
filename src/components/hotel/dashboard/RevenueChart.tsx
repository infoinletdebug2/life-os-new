import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RevenueChartProps {
  forecast: number[];
}

export function RevenueChart({ forecast }: RevenueChartProps) {
  return (
    <div className="lg:col-span-2">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
            Revenue Trend (7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-teal-500/10" />
            <div className="relative h-full flex items-end justify-between gap-2 p-4">
              {forecast.map((value, i) => {
                const height = (value / Math.max(...forecast)) * 100;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-t opacity-80 relative group cursor-pointer"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${value.toLocaleString()}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}