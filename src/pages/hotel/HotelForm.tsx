import { DashboardLayout } from '@/components/workspace/dashboard-layout';

export default function HotelForm() {
  return (
    <DashboardLayout currentView="hotel-form">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          Add/Edit Hotel
        </h1>
        <p className="text-muted-foreground mt-2">
          Hotel form coming soon...
        </p>
      </div>
    </DashboardLayout>
  );
}