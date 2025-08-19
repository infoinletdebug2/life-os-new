import { motion } from 'framer-motion';
import { BedDouble } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoomStatus {
  available: number;
  occupied: number;
  maintenance: number;
  housekeeping: number;
  outOfOrder: number;
}

interface RoomStatusChartProps {
  roomStatus: RoomStatus;
}

export function RoomStatusChart({ roomStatus }: RoomStatusChartProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'available':
        return { color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' };
      case 'occupied':
        return { color: 'bg-blue-500', textColor: 'text-blue-600 dark:text-blue-400' };
      case 'maintenance':
        return { color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' };
      case 'housekeeping':
        return { color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' };
      default:
        return { color: 'bg-gray-500', textColor: 'text-gray-600 dark:text-gray-400' };
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-emerald-500" />
          Room Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(roomStatus).map(([status, count]) => {
          const percentage = (count / 180) * 100;
          const statusInfo = getStatusInfo(status);
          
          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="capitalize font-medium">{status.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className={statusInfo.textColor}>{count} rooms</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div 
                  className={`h-full ${statusInfo.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}