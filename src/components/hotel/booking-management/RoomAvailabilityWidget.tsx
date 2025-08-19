import { Bed, Home, AlertCircle, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryAvailability {
  category: string;
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  occupancyRate: number;
  averagePrice: number;
}

interface RoomAvailabilityWidgetProps {
  categories: CategoryAvailability[];
  onCategoryClick?: (category: string) => void;
}

export function RoomAvailabilityWidget({ categories, onCategoryClick }: RoomAvailabilityWidgetProps) {
  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return 'from-red-500 to-orange-500';
    if (rate >= 70) return 'from-yellow-500 to-orange-500';
    if (rate >= 50) return 'from-cyan-500 to-blue-500';
    return 'from-green-500 to-emerald-500';
  };

  const getOccupancyTextColor = (rate: number) => {
    if (rate >= 90) return 'text-red-400';
    if (rate >= 70) return 'text-yellow-400';
    if (rate >= 50) return 'text-cyan-400';
    return 'text-emerald-400';
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-500" />
          Room Availability
        </CardTitle>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Home className="w-3 h-3 text-emerald-400" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-3 h-3 text-cyan-400" />
            <span className="text-muted-foreground">Occupied</span>
          </div>
          <div className="flex items-center gap-1">
            <Wrench className="w-3 h-3 text-orange-400" />
            <span className="text-muted-foreground">Maintenance</span>
          </div>
        </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => {
          const availablePercentage = (category.available / category.total) * 100;
          
          return (
            <div
              key={category.category}
              onClick={() => onCategoryClick?.(category.category)}
              className={cn(
                "bg-secondary/50 rounded-xl p-4 cursor-pointer transition-all",
                "hover:bg-secondary hover:border-cyan-500/50 border border-transparent"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{category.category}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${category.averagePrice.toFixed(0)}/night avg
                  </p>
                </div>
                <div className={cn(
                  "text-lg font-bold",
                  getOccupancyTextColor(category.occupancyRate)
                )}>
                  {category.available}/{category.total}
                </div>
              </div>
              
              {/* Visual Room Grid */}
              <div className="grid grid-cols-5 gap-1 mb-3">
                {Array.from({ length: Math.min(category.total, 20) }).map((_, i) => {
                  const roomIndex = i + 1;
                  const isOccupied = roomIndex <= category.occupied;
                  const isMaintenance = roomIndex > category.occupied && 
                                       roomIndex <= (category.occupied + category.maintenance);
                  
                  return (
                    <div
                      key={i}
                      className={cn(
                        "h-2 rounded-sm transition-colors",
                        isOccupied && "bg-cyan-500",
                        isMaintenance && "bg-orange-500",
                        !isOccupied && !isMaintenance && "bg-emerald-500/50"
                      )}
                    />
                  );
                })}
                {category.total > 20 && (
                  <div className="col-span-5 text-center">
                    <span className="text-xs text-muted-foreground">+{category.total - 20} more</span>
                  </div>
                )}
              </div>
              
              {/* Occupancy Bar */}
              <div className="space-y-2">
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all bg-gradient-to-r",
                      getOccupancyColor(category.occupancyRate)
                    )}
                    style={{ width: `${category.occupancyRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{category.occupancyRate}% Occupancy</span>
                  {category.maintenance > 0 && (
                    <span className="text-orange-400">{category.maintenance} in maintenance</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </CardContent>
    </Card>
  );
}