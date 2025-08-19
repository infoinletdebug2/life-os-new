import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  DollarSign, 
  Plus, 
  TrendingUp, 
  Search,
  Filter,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Calendar,
  Users,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Payment {
  id: string;
  bookingNumber: string;
  guestName: string;
  transactionType: 'payment' | 'refund' | 'charge';
  amount: number;
  method: 'card' | 'cash' | 'bank_transfer' | 'online';
  status: 'completed' | 'pending' | 'failed' | 'processing';
  date: string;
  reference: string;
  description: string;
  roomNumber?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    transactionType: 'payment',
    amount: 2425.00,
    method: 'card',
    status: 'completed',
    date: '2024-02-15T14:30:00Z',
    reference: 'PAY-001-2024',
    description: 'Room booking payment',
    roomNumber: '301'
  },
  {
    id: '2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    transactionType: 'charge',
    amount: 125.50,
    method: 'card',
    status: 'pending',
    date: '2024-02-16T10:15:00Z',
    reference: 'CHG-002-2024',
    description: 'Minibar and room service charges',
    roomNumber: '205'
  },
  {
    id: '3',
    bookingNumber: 'BK003',
    guestName: 'Michael Brown',
    transactionType: 'refund',
    amount: 475.00,
    method: 'card',
    status: 'processing',
    date: '2024-02-16T16:45:00Z',
    reference: 'REF-003-2024',
    description: 'Partial refund for cancelled nights',
    roomNumber: '102'
  },
  {
    id: '4',
    bookingNumber: 'BK004',
    guestName: 'Emma Wilson',
    transactionType: 'payment',
    amount: 800.00,
    method: 'bank_transfer',
    status: 'failed',
    date: '2024-02-16T09:20:00Z',
    reference: 'PAY-004-2024',
    description: 'Advance booking payment',
    roomNumber: '401'
  },
  {
    id: '5',
    bookingNumber: 'BK005',
    guestName: 'David Chen',
    transactionType: 'payment',
    amount: 1200.00,
    method: 'cash',
    status: 'completed',
    date: '2024-02-16T11:00:00Z',
    reference: 'PAY-005-2024',
    description: 'Full booking payment',
    roomNumber: '203'
  }
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' }
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'payment', label: 'Payments' },
  { value: 'refund', label: 'Refunds' },
  { value: 'charge', label: 'Additional Charges' }
];

const methodOptions = [
  { value: 'all', label: 'All Methods' },
  { value: 'card', label: 'Credit Card' },
  { value: 'cash', label: 'Cash' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'online', label: 'Online Payment' }
];

export default function BookingPayments() {
  const navigate = useNavigate();
  const [payments] = useState<Payment[]>(mockPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');

  const stats = {
    totalPayments: payments.filter(p => p.transactionType === 'payment').length,
    totalRefunds: payments.filter(p => p.transactionType === 'refund').length,
    totalCharges: payments.filter(p => p.transactionType === 'charge').length,
    completedRevenue: payments.filter(p => p.status === 'completed' && p.transactionType === 'payment').reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    failedTransactions: payments.filter(p => p.status === 'failed').length
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesType = selectedType === 'all' || payment.transactionType === selectedType;
    const matchesMethod = selectedMethod === 'all' || payment.method === selectedMethod;
    
    return matchesSearch && matchesStatus && matchesType && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'processing': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-400/30';
      default: return 'bg-gray-500/20 text-muted-foreground border-gray-400/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'refund': return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      case 'charge': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      default: return 'bg-gray-500/20 text-muted-foreground border-gray-400/30';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment': return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
      case 'refund': return <ArrowDownRight className="w-4 h-4 text-orange-400" />;
      case 'charge': return <Plus className="w-4 h-4 text-purple-400" />;
      default: return <DollarSign className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getMethodDisplay = (method: string) => {
    switch (method) {
      case 'card': return 'Credit Card';
      case 'cash': return 'Cash';
      case 'bank_transfer': return 'Bank Transfer';
      case 'online': return 'Online';
      default: return method;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRetryPayment = (paymentId: string) => {
    console.log('Retrying payment:', paymentId);
  };

  const handleRefund = (paymentId: string) => {
    console.log('Processing refund for payment:', paymentId);
  };

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Payment Management
            </h1>
            <p className="text-muted-foreground mt-1">Process payments, refunds, and financial transactions</p>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
            <Plus className="w-4 h-4" />
            Process Payment
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalPayments}</p>
                <p className="text-sm text-muted-foreground">Total Payments</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <ArrowDownRight className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalRefunds}</p>
                <p className="text-sm text-muted-foreground">Refunds</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Plus className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalCharges}</p>
                <p className="text-sm text-muted-foreground">Add'l Charges</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.completedRevenue)}</p>
                <p className="text-sm text-muted-foreground">Completed Revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.pendingAmount)}</p>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.failedTransactions}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by booking, guest, reference, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-4 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              {methodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/30 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Transaction</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Guest/Booking</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Method</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-secondary/80 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getTransactionIcon(payment.transactionType)}
                          <div>
                            <p className="font-bold text-foreground">{payment.reference}</p>
                            <p className="text-xs text-muted-foreground">{payment.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">{payment.guestName}</p>
                          <p className="text-xs text-muted-foreground">#{payment.bookingNumber}</p>
                          {payment.roomNumber && (
                            <p className="text-xs text-cyan-400">Room {payment.roomNumber}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize",
                          getTypeColor(payment.transactionType)
                        )}>
                          {payment.transactionType}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className={cn(
                          "text-lg font-bold",
                          payment.transactionType === 'payment' ? 'text-emerald-400' :
                          payment.transactionType === 'refund' ? 'text-orange-400' : 'text-purple-400'
                        )}>
                          {payment.transactionType === 'refund' ? '-' : '+'}{formatCurrency(payment.amount)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-muted-foreground">{getMethodDisplay(payment.method)}</p>
                      </td>
                      <td className="p-4">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize",
                          getStatusColor(payment.status)
                        )}>
                          {payment.status}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">{formatDate(payment.date)}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/hotel/bookings/${payment.bookingNumber.replace('BK', '')}`)}
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {payment.status === 'failed' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRetryPayment(payment.id)}
                              className="text-yellow-400 hover:text-yellow-300"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-orange-400 hover:text-orange-300"
                          >
                            <Receipt className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or process a new payment.
              </p>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Process Payment
              </Button>
            </div>
          )}
        </div>
      </div>
    </BookingManagementLayout>
  );
}