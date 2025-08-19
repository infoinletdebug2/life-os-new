import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  Calendar,
  Users,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Clock,
  DollarSign,
  Plus,
  Search
} from 'lucide-react';
import { BookingManagementLayout } from '@/components/hotel/booking-management/BookingManagementLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface SelectedRoom {
  id: string;
  number: string;
  type: string;
  rate: number;
  maxOccupancy: number;
}

const availableRooms = [
  { id: '1', number: '301', type: 'Ocean Suite', rate: 485, maxOccupancy: 4 },
  { id: '2', number: '205', type: 'Deluxe Room', rate: 200, maxOccupancy: 3 },
  { id: '3', number: '102', type: 'Standard Room', rate: 150, maxOccupancy: 2 },
  { id: '4', number: '401', type: 'Presidential Suite', rate: 800, maxOccupancy: 6 }
];

export default function NewBooking() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Guest Information
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    guestAddress: '',
    guestCountry: '',
    
    // Booking Details
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    specialRequests: '',
    
    // Room Selection
    selectedRoom: null as SelectedRoom | null,
    
    // Payment Information
    totalAmount: 0,
    depositAmount: 0,
    paymentMethod: 'card',
    paymentStatus: 'pending',
    
    // Additional Details
    source: 'direct',
    notes: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoomSelect = (room: SelectedRoom) => {
    setFormData(prev => ({ 
      ...prev, 
      selectedRoom: room,
      totalAmount: calculateTotal(prev.checkIn, prev.checkOut, room.rate)
    }));
  };

  const calculateTotal = (checkIn: string, checkOut: string, rate: number) => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    return nights * rate;
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    return Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleSave = () => {
    console.log('Creating booking:', formData);
    // Here you would typically call your API to create the booking
    navigate('/hotel/bookings');
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          Guest Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="guestName">Full Name *</Label>
            <Input
              id="guestName"
              placeholder="John Smith"
              value={formData.guestName}
              onChange={(e) => handleInputChange('guestName', e.target.value)}
              className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guestEmail">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="guestEmail"
                type="email"
                placeholder="john.smith@email.com"
                value={formData.guestEmail}
                onChange={(e) => handleInputChange('guestEmail', e.target.value)}
                className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestPhone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="guestPhone"
                placeholder="+1 (555) 123-4567"
                value={formData.guestPhone}
                onChange={(e) => handleInputChange('guestPhone', e.target.value)}
                className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestCountry">Country</Label>
            <Input
              id="guestCountry"
              placeholder="United States"
              value={formData.guestCountry}
              onChange={(e) => handleInputChange('guestCountry', e.target.value)}
              className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="guestAddress">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea
              id="guestAddress"
              placeholder="Full address including street, city, state, postal code"
              value={formData.guestAddress}
              onChange={(e) => handleInputChange('guestAddress', e.target.value)}
              className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20 min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Booking Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="checkIn">Check-in Date *</Label>
            <Input
              id="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={(e) => {
                handleInputChange('checkIn', e.target.value);
                if (formData.selectedRoom) {
                  setFormData(prev => ({
                    ...prev,
                    totalAmount: calculateTotal(e.target.value, prev.checkOut, prev.selectedRoom!.rate)
                  }));
                }
              }}
              className="bg-secondary border-input text-foreground focus:border-ring focus:ring-ring/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="checkOut">Check-out Date *</Label>
            <Input
              id="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={(e) => {
                handleInputChange('checkOut', e.target.value);
                if (formData.selectedRoom) {
                  setFormData(prev => ({
                    ...prev,
                    totalAmount: calculateTotal(prev.checkIn, e.target.value, prev.selectedRoom!.rate)
                  }));
                }
              }}
              className="bg-secondary border-input text-foreground focus:border-ring focus:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adults">Adults</Label>
            <Input
              id="adults"
              type="number"
              min="1"
              max="10"
              value={formData.adults}
              onChange={(e) => handleInputChange('adults', parseInt(e.target.value) || 1)}
              className="bg-secondary border-input text-foreground focus:border-ring focus:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="children">Children</Label>
            <Input
              id="children"
              type="number"
              min="0"
              max="10"
              value={formData.children}
              onChange={(e) => handleInputChange('children', parseInt(e.target.value) || 0)}
              className="bg-secondary border-input text-foreground focus:border-ring focus:ring-ring/20"
            />
          </div>
        </div>

        {formData.checkIn && formData.checkOut && (
          <div className="mt-4 p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/30">
            <p className="text-cyan-200 text-sm">
              <Clock className="inline w-4 h-4 mr-2" />
              Stay Duration: <span className="font-bold">{calculateNights()} nights</span>
              {` • ${formData.adults + formData.children} guests`}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            placeholder="Any special requests or preferences..."
            value={formData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20 min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-400" />
          Room Selection
        </h3>
        
        {!formData.checkIn || !formData.checkOut ? (
          <div className="p-6 bg-yellow-500/20 rounded-xl border border-yellow-400/30 text-center">
            <p className="text-yellow-200">
              Please select check-in and check-out dates first to see available rooms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRooms
              .filter(room => room.maxOccupancy >= (formData.adults + formData.children))
              .map(room => (
                <div
                  key={room.id}
                  onClick={() => handleRoomSelect(room)}
                  className={cn(
                    "p-6 rounded-xl border cursor-pointer transition-all duration-200",
                    formData.selectedRoom?.id === room.id
                      ? "bg-cyan-500/20 border-cyan-400/50 ring-2 ring-cyan-400/30"
                      : "bg-secondary border-input hover:border-gray-500/50 hover:bg-gray-700/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-foreground">Room #{room.number}</h4>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">${room.rate}</p>
                      <p className="text-xs text-muted-foreground">per night</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{room.type}</p>
                  <p className="text-muted-foreground text-xs">
                    Max {room.maxOccupancy} guests
                  </p>
                  {formData.selectedRoom?.id === room.id && calculateNights() > 0 && (
                    <div className="mt-3 pt-3 border-t border-cyan-400/30">
                      <p className="text-cyan-200 text-sm">
                        Total: <span className="font-bold">${calculateTotal(formData.checkIn, formData.checkOut, room.rate)}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({calculateNights()} nights)
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-green-400" />
          Payment & Final Details
        </h3>
        
        {formData.selectedRoom && (
          <div className="bg-secondary rounded-xl p-6 mb-6">
            <h4 className="font-bold text-foreground mb-4">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guest:</span>
                <span className="text-foreground">{formData.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room:</span>
                <span className="text-foreground">#{formData.selectedRoom.number} - {formData.selectedRoom.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dates:</span>
                <span className="text-foreground">{formData.checkIn} to {formData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nights:</span>
                <span className="text-foreground">{calculateNights()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guests:</span>
                <span className="text-foreground">{formData.adults + formData.children}</span>
              </div>
              <div className="border-t border-input pt-2 mt-4">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-400">Total Amount:</span>
                  <span className="text-emerald-400">${formData.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              <option value="card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Booking Source</Label>
            <select
              id="source"
              value={formData.source}
              onChange={(e) => handleInputChange('source', e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              <option value="direct">Direct</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="booking.com">Booking.com</option>
              <option value="expedia">Expedia</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="depositAmount">Deposit Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="depositAmount"
                type="number"
                min="0"
                max={formData.totalAmount}
                step="0.01"
                placeholder="0.00"
                value={formData.depositAmount}
                onChange={(e) => handleInputChange('depositAmount', parseFloat(e.target.value) || 0)}
                className="pl-10 bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <select
              id="paymentStatus"
              value={formData.paymentStatus}
              onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
            >
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Internal notes about this booking..."
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="bg-secondary border-input text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/20 min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );

  return (
    <BookingManagementLayout>
      <div className="p-8 space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/hotel/bookings')}
              className="hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                New Booking
              </h1>
              <p className="text-muted-foreground mt-1">
                Step {currentStep} of 4: {
                  currentStep === 1 ? 'Guest Information' :
                  currentStep === 2 ? 'Booking Details' :
                  currentStep === 3 ? 'Room Selection' : 'Payment & Confirmation'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            {[
              { step: 1, label: 'Guest Info', icon: Users },
              { step: 2, label: 'Booking Details', icon: Calendar },
              { step: 3, label: 'Room Selection', icon: Search },
              { step: 4, label: 'Payment', icon: CreditCard }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center gap-3">
                <div className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                  currentStep === step 
                    ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                    : currentStep > step
                    ? "bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-2 border-green-400/50 shadow-lg shadow-green-500/20"
                    : "bg-gray-700/30 text-muted-foreground border-2 border-input"
                )}>
                  <Icon className="w-5 h-5" />
                  {label}
                </div>
                {step < 4 && (
                  <div className={cn(
                    "h-1 w-16 rounded-full transition-all duration-500",
                    currentStep > step ? "bg-gradient-to-r from-green-400 to-emerald-400" : "bg-white/20"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-secondary backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/hotel/bookings')}
            className="hover:bg-secondary/80 text-muted-foreground hover:text-foreground px-6 py-3 rounded-xl transition-all duration-200"
          >
            Cancel
          </Button>
          
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="border-2 border-gray-500/50 text-muted-foreground hover:text-foreground hover:border-gray-400 px-6 py-3 rounded-xl transition-all duration-200"
              >
                Previous
              </Button>
            )}
            
            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && (!formData.guestName || !formData.guestEmail)) ||
                  (currentStep === 2 && (!formData.checkIn || !formData.checkOut)) ||
                  (currentStep === 3 && !formData.selectedRoom)
                }
                className="gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-foreground font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={!formData.selectedRoom}
                className="gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-foreground font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                Create Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </BookingManagementLayout>
  );
}