import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Plus, 
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Shield,
  BookOpen,
  Gavel,
  FileCheck
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Agreement {
  id: string;
  bookingNumber: string;
  guestName: string;
  agreementType: 'booking_contract' | 'cancellation_policy' | 'terms_conditions' | 'special_agreement' | 'liability_waiver';
  status: 'draft' | 'sent' | 'signed' | 'expired' | 'cancelled';
  createdDate: string;
  sentDate?: string;
  signedDate?: string;
  expiryDate: string;
  templateVersion: string;
  roomNumber?: string;
  specialClauses?: string[];
  signedBy?: string;
}

const mockAgreements: Agreement[] = [
  {
    id: '1',
    bookingNumber: 'BK001',
    guestName: 'John Smith',
    agreementType: 'booking_contract',
    status: 'signed',
    createdDate: '2024-02-10T10:00:00Z',
    sentDate: '2024-02-10T10:30:00Z',
    signedDate: '2024-02-10T14:20:00Z',
    expiryDate: '2024-02-20T23:59:59Z',
    templateVersion: 'v2.1',
    roomNumber: '301',
    signedBy: 'John Smith'
  },
  {
    id: '2',
    bookingNumber: 'BK002',
    guestName: 'Sarah Johnson',
    agreementType: 'terms_conditions',
    status: 'sent',
    createdDate: '2024-02-15T09:15:00Z',
    sentDate: '2024-02-15T09:30:00Z',
    expiryDate: '2024-02-25T23:59:59Z',
    templateVersion: 'v2.1',
    roomNumber: '205'
  },
  {
    id: '3',
    bookingNumber: 'BK003',
    guestName: 'Michael Brown',
    agreementType: 'cancellation_policy',
    status: 'draft',
    createdDate: '2024-02-16T11:00:00Z',
    expiryDate: '2024-02-26T23:59:59Z',
    templateVersion: 'v2.1',
    roomNumber: '102',
    specialClauses: ['Non-refundable deposit', '48-hour cancellation notice required']
  },
  {
    id: '4',
    bookingNumber: 'BK004',
    guestName: 'Emma Wilson',
    agreementType: 'special_agreement',
    status: 'signed',
    createdDate: '2024-02-14T16:30:00Z',
    sentDate: '2024-02-14T17:00:00Z',
    signedDate: '2024-02-15T08:45:00Z',
    expiryDate: '2024-02-28T23:59:59Z',
    templateVersion: 'custom_v1.0',
    roomNumber: '401',
    specialClauses: ['Late checkout until 2 PM', 'Pet accommodation agreement'],
    signedBy: 'Emma Wilson'
  },
  {
    id: '5',
    bookingNumber: 'BK005',
    guestName: 'David Chen',
    agreementType: 'liability_waiver',
    status: 'expired',
    createdDate: '2024-01-20T14:00:00Z',
    sentDate: '2024-01-20T14:15:00Z',
    expiryDate: '2024-02-15T23:59:59Z',
    templateVersion: 'v1.8',
    roomNumber: '203'
  }
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'signed', label: 'Signed' },
  { value: 'expired', label: 'Expired' },
  { value: 'cancelled', label: 'Cancelled' }
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'booking_contract', label: 'Booking Contract' },
  { value: 'terms_conditions', label: 'Terms & Conditions' },
  { value: 'cancellation_policy', label: 'Cancellation Policy' },
  { value: 'special_agreement', label: 'Special Agreement' },
  { value: 'liability_waiver', label: 'Liability Waiver' }
];

export default function Agreements() {
  const navigate = useNavigate();
  const [agreements] = useState<Agreement[]>(mockAgreements);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const stats = {
    total: agreements.length,
    draft: agreements.filter(a => a.status === 'draft').length,
    sent: agreements.filter(a => a.status === 'sent').length,
    signed: agreements.filter(a => a.status === 'signed').length,
    expired: agreements.filter(a => a.status === 'expired').length,
    signatureRate: Math.round((agreements.filter(a => a.status === 'signed').length / agreements.length) * 100)
  };

  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = 
      agreement.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.templateVersion.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || agreement.status === selectedStatus;
    const matchesType = selectedType === 'all' || agreement.agreementType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'sent': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'expired': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'cancelled': return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking_contract': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'terms_conditions': return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'cancellation_policy': return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case 'special_agreement': return <FileCheck className="w-4 h-4 text-emerald-400" />;
      case 'liability_waiver': return <Shield className="w-4 h-4 text-red-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeDisplay = (type: string) => {
    switch (type) {
      case 'booking_contract': return 'Booking Contract';
      case 'terms_conditions': return 'Terms & Conditions';
      case 'cancellation_policy': return 'Cancellation Policy';
      case 'special_agreement': return 'Special Agreement';
      case 'liability_waiver': return 'Liability Waiver';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSendAgreement = (agreementId: string) => {
    console.log('Sending agreement:', agreementId);
  };

  const handleViewAgreement = (agreementId: string) => {
    navigate(`/hotel/agreements/${agreementId}`);
  };

  const handleEditAgreement = (agreementId: string) => {
    navigate(`/hotel/agreements/${agreementId}/edit`);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Booking Agreements
            </h1>
            <p className="text-gray-400 mt-1">Manage contracts, terms, and booking agreements</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Templates
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Plus className="w-4 h-4" />
              Create Agreement
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-sm text-gray-400">Total Agreements</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Edit className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.draft}</p>
                <p className="text-sm text-gray-400">Draft</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.sent}</p>
                <p className="text-sm text-gray-400">Sent</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.signed}</p>
                <p className="text-sm text-gray-400">Signed</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.expired}</p>
                <p className="text-sm text-gray-400">Expired</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Gavel className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.signatureRate}%</p>
                <p className="text-sm text-gray-400">Signature Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by booking, guest name, or template version..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
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
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            >
              {typeOptions.map(option => (
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

        {/* Agreements List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAgreements.map((agreement, index) => (
              <motion.div
                key={agreement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                  {/* Agreement Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(agreement.agreementType)}
                      <div>
                        <h3 className="font-bold text-white">{getTypeDisplay(agreement.agreementType)}</h3>
                        <p className="text-sm text-gray-400">#{agreement.bookingNumber} • {agreement.guestName}</p>
                      </div>
                    </div>
                    {agreement.roomNumber && (
                      <p className="text-sm text-cyan-400 mb-1">Room {agreement.roomNumber}</p>
                    )}
                    <p className="text-xs text-gray-400">Template: {agreement.templateVersion}</p>
                    {agreement.specialClauses && agreement.specialClauses.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-yellow-400">Special Clauses:</p>
                        <ul className="text-xs text-gray-400 ml-2">
                          {agreement.specialClauses.map((clause, idx) => (
                            <li key={idx}>• {clause}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Status & Dates */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Status</p>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium w-fit border capitalize mb-3",
                      getStatusColor(agreement.status)
                    )}>
                      {agreement.status}
                    </div>
                    {isExpiringSoon(agreement.expiryDate) && (
                      <div className="flex items-center gap-1 text-xs text-orange-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>Expires soon</span>
                      </div>
                    )}
                  </div>

                  {/* Timeline */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Timeline</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-400">Created: {formatDate(agreement.createdDate)}</span>
                      </div>
                      {agreement.sentDate && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-300">Sent: {formatDate(agreement.sentDate)}</span>
                        </div>
                      )}
                      {agreement.signedDate && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-green-300">Signed: {formatDate(agreement.signedDate)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-300">Expires: {formatDate(agreement.expiryDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Signature Info */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Signature</p>
                    {agreement.signedBy ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">{agreement.signedBy}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Not signed</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewAgreement(agreement.id)}
                      className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-500/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {agreement.status === 'draft' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditAgreement(agreement.id)}
                        className="text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/10"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    {(agreement.status === 'draft' || agreement.status === 'expired') && (
                      <Button
                        size="sm"
                        onClick={() => handleSendAgreement(agreement.id)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Send
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-orange-400 border-orange-400/30 hover:bg-orange-500/10"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAgreements.length === 0 && (
          <div className="bg-gray-800/20 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No agreements found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or create a new agreement.
            </p>
            <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Plus className="w-4 h-4" />
              Create Agreement
            </Button>
          </div>
        )}
      </div>
    </BookingManagementLayout>
  );
}