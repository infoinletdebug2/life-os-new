import type { Analytics } from '@/types/hotel';

export const mockAnalytics: Analytics = {
  occupancy: {
    current: 87.5,
    mtd: 82.3,
    ytd: 78.9,
    forecast: [85, 88, 91, 86, 89, 92, 88],
    trend: 'up'
  },
  revenue: {
    today: 24750,
    mtd: 687500,
    ytd: 2847500,
    forecast: [25000, 26500, 28000, 24500, 27000, 29000, 25500],
    breakdown: {
      rooms: 18000,
      foodBeverage: 4200,
      spa: 1800,
      parking: 500,
      other: 250
    }
  },
  adr: {
    current: 285,
    mtd: 275,
    ytd: 268,
    competitive: 290,
    trend: 'up'
  },
  revpar: {
    current: 249.38,
    mtd: 226.33,
    ytd: 211.45,
    competitive: 245.50
  },
  guestSatisfaction: {
    overall: 4.7,
    categories: {
      cleanliness: 4.8,
      service: 4.6,
      value: 4.5,
      location: 4.9,
      amenities: 4.4
    },
    trends: [4.5, 4.6, 4.7, 4.6, 4.8, 4.7, 4.7]
  },
  bookingMetrics: {
    totalBookings: 156,
    directBookings: 89,
    otaBookings: 67,
    averageLeadTime: 12,
    cancellationRate: 8.5,
    noShowRate: 2.1
  }
};

export const recentBookings = [
  {
    id: 'BK001',
    guest: 'Sarah Johnson',
    room: '301 - Ocean Suite',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    amount: 1240,
    status: 'confirmed',
    source: 'direct',
    avatar: '🧑‍💼'
  },
  {
    id: 'BK002',
    guest: 'Michael Chen',
    room: '412 - Executive Room',
    checkIn: '2024-01-16',
    checkOut: '2024-01-20',
    amount: 2800,
    status: 'pending',
    source: 'booking.com',
    avatar: '👨‍💻'
  },
  {
    id: 'BK003',
    guest: 'Emma Wilson',
    room: '205 - Standard Room',
    checkIn: '2024-01-14',
    checkOut: '2024-01-16',
    amount: 480,
    status: 'checked-in',
    source: 'expedia',
    avatar: '👩‍🎨'
  },
  {
    id: 'BK004',
    guest: 'David Park',
    room: '501 - Presidential Suite',
    checkIn: '2024-01-17',
    checkOut: '2024-01-22',
    amount: 4500,
    status: 'confirmed',
    source: 'direct',
    avatar: '🧑‍🚀'
  }
];

export const todayTasks = [
  { id: 1, task: 'Room 302 - Deep cleaning required', priority: 'high', time: '10:00 AM', status: 'pending' },
  { id: 2, task: 'Check-in preparation for VIP guest', priority: 'high', time: '2:00 PM', status: 'in-progress' },
  { id: 3, task: 'Maintenance - AC repair Room 408', priority: 'medium', time: '3:30 PM', status: 'completed' },
  { id: 4, task: 'Staff meeting - Front desk team', priority: 'low', time: '5:00 PM', status: 'pending' }
];

export const roomStatus = {
  available: 42,
  occupied: 128,
  maintenance: 3,
  housekeeping: 7,
  outOfOrder: 0
};