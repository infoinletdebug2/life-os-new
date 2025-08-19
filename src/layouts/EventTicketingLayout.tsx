import { ReactNode } from 'react';
import { DashboardLayout } from '@/components/workspace/dashboard-layout';

interface EventTicketingLayoutProps {
  children: ReactNode;
  currentView?: string;
}

export default function EventTicketingLayout({ children, currentView = 'events' }: EventTicketingLayoutProps) {
  return (
    <DashboardLayout currentView={currentView} selectedCategory="travel">
      {children}
    </DashboardLayout>
  );
}