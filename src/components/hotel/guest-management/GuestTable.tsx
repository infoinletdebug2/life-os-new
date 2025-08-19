import { motion } from 'framer-motion';
import { 
  Eye,
  Edit,
  MoreHorizontal,
  Mail,
  Phone,
  Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ExtendedGuest } from './types';

interface GuestTableProps {
  guests: ExtendedGuest[];
  onGuestClick: (guest: ExtendedGuest) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getLoyaltyColor: (tier: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

export function GuestTable({
  guests,
  onGuestClick,
  getStatusColor,
  getStatusIcon,
  getLoyaltyColor,
  formatCurrency,
  formatDate
}: GuestTableProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-4 text-sm font-medium text-muted-foreground">Guest</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Loyalty</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Lifetime Value</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Total Stays</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Last Stay</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <motion.tr
                  key={guest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onGuestClick(guest)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={guest.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${guest.firstName} ${guest.lastName}`}
                        alt={`${guest.firstName} ${guest.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{guest.firstName} {guest.lastName}</p>
                        <p className="text-sm text-muted-foreground">{guest.nationality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span>{guest.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span>{guest.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-start gap-1">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium capitalize",
                        getLoyaltyColor(guest.loyaltyTier)
                      )}>
                        {guest.loyaltyTier}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {guest.loyaltyPoints.toLocaleString()} pts
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{formatCurrency(guest.lifetimeValue)}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(guest.averageSpend)} avg
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{guest.totalStays}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-3 h-3",
                              i < Math.floor(guest.averageRating) 
                                ? "text-yellow-500 fill-current" 
                                : "text-gray-300"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {guest.lastStay ? (
                        <>
                          <span className="text-sm">{formatDate(guest.lastStay)}</span>
                          {guest.nextReservation && (
                            <span className="text-xs text-cyan-600 dark:text-cyan-400">
                              Next: {formatDate(guest.nextReservation)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">No stays yet</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                      getStatusColor(guest.status)
                    )}>
                      {getStatusIcon(guest.status)}
                      <span className="capitalize">{guest.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}