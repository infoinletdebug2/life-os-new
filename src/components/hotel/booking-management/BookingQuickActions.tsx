import { Plus, UserCheck, LogOut, Clock, AlertCircle, FileSpreadsheet, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  color: string;
  onClick: () => void;
}

interface BookingQuickActionsProps {
  todayCheckIns: number;
  todayCheckOuts: number;
  pendingRequests: number;
  upcomingArrivals: number;
  onNewBooking: () => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onViewPending: () => void;
  onExport: () => void;
  onCalendarView: () => void;
}

export function BookingQuickActions({
  todayCheckIns,
  todayCheckOuts,
  pendingRequests,
  upcomingArrivals,
  onNewBooking,
  onCheckIn,
  onCheckOut,
  onViewPending,
  onExport,
  onCalendarView
}: BookingQuickActionsProps) {
  const quickActions: QuickAction[] = [
    {
      id: 'new-booking',
      label: 'New Booking',
      icon: <Plus className="w-4 h-4" />,
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
      onClick: onNewBooking
    },
    {
      id: 'check-in',
      label: "Today's Check-ins",
      icon: <UserCheck className="w-4 h-4" />,
      count: todayCheckIns,
      color: 'hover:bg-blue-500/20 hover:border-blue-500',
      onClick: onCheckIn
    },
    {
      id: 'check-out',
      label: "Today's Check-outs",
      icon: <LogOut className="w-4 h-4" />,
      count: todayCheckOuts,
      color: 'hover:bg-orange-500/20 hover:border-orange-500',
      onClick: onCheckOut
    },
    {
      id: 'pending',
      label: 'Pending Requests',
      icon: <Clock className="w-4 h-4" />,
      count: pendingRequests,
      color: 'hover:bg-yellow-500/20 hover:border-yellow-500',
      onClick: onViewPending
    },
    {
      id: 'calendar',
      label: 'Calendar View',
      icon: <CalendarCheck className="w-4 h-4" />,
      color: 'hover:bg-purple-500/20 hover:border-purple-500',
      onClick: onCalendarView
    }
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {quickActions.map(action => (
        <Button
          key={action.id}
          onClick={action.onClick}
          variant={action.id === 'new-booking' ? 'default' : 'outline'}
          className={cn(
            "gap-2 transition-all",
            action.id !== 'new-booking' && action.color,
            action.id === 'new-booking' && action.color
          )}
        >
          {action.icon}
          <span>{action.label}</span>
          {action.count !== undefined && action.count > 0 && (
            <span className={cn(
              "ml-1 px-2 py-0.5 text-xs rounded-full",
              action.id === 'new-booking' 
                ? "bg-white/20 text-white" 
                : "bg-gray-700 text-gray-300"
            )}>
              {action.count}
            </span>
          )}
        </Button>
      ))}
      
      <div className="ml-auto flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}