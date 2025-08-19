import { useState, useEffect } from 'react';
import { 
  BedDouble, 
  DollarSign, 
  Calendar,
  Star
} from 'lucide-react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';
import {
  DashboardHeader,
  MetricCard,
  RevenueChart,
  RoomStatusChart,
  RecentBookings,
  TodayTasks
} from '@/components/hotel/dashboard';
import {
  mockAnalytics,
  recentBookings,
  todayTasks,
  roomStatus
} from '@/components/hotel/dashboard/mock-data';
import {
  getStatusColor,
  formatCurrency
} from '@/components/hotel/dashboard/utils';
import type { Analytics } from '@/types/hotel';


export default function HotelDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeData, setRealTimeData] = useState(mockAnalytics);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        occupancy: {
          ...prev.occupancy,
          current: prev.occupancy.current + (Math.random() - 0.5) * 0.5
        },
        revenue: {
          ...prev.revenue,
          today: prev.revenue.today + Math.floor(Math.random() * 100)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };


  return (
    <DashboardLayout currentView="hotel-dashboard" selectedCategory="travel">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
        {/* Header */}
        <DashboardHeader 
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Occupancy Rate"
            value={`${realTimeData.occupancy.current.toFixed(1)}%`}
            icon={BedDouble}
            trend={realTimeData.occupancy.trend}
            trendText="vs last period"
            gradient="cyan"
            delay={0.1}
          />
          
          <MetricCard 
            title="Revenue Today"
            value={formatCurrency(realTimeData.revenue.today)}
            icon={DollarSign}
            trendText="+15.3%"
            gradient="emerald"
            delay={0.2}
          />
          
          <MetricCard 
            title="ADR (Avg Daily Rate)"
            value={formatCurrency(realTimeData.adr.current)}
            icon={Calendar}
            trend={realTimeData.adr.trend}
            trendText="Above market"
            gradient="teal"
            delay={0.3}
          />
          
          <MetricCard 
            title="Guest Satisfaction"
            value={`${realTimeData.guestSatisfaction.overall}/5.0`}
            icon={Star}
            trendText="Excellent rating"
            delay={0.4}
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart forecast={realTimeData.revenue.forecast} />
          <RoomStatusChart roomStatus={roomStatus} />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBookings 
            bookings={recentBookings}
            getStatusColor={getStatusColor}
            formatCurrency={formatCurrency}
          />
          <TodayTasks tasks={todayTasks} />
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
}