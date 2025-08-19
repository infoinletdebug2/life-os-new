import { useParams, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/workspace/dashboard-layout';

export default function Dashboard() {
  const { category, subcategory } = useParams();

  // Redirect hotel-booking to the new hotel management system
  if (category === 'travel' && subcategory === 'hotel-booking') {
    return <Navigate to="/hotel" replace />;
  }

  return (
    <DashboardLayout currentView={subcategory} selectedCategory={category}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          {category} / {subcategory}
        </h2>
        <p className="text-muted-foreground">
          Dashboard content for {subcategory} will be displayed here.
        </p>
      </div>
    </DashboardLayout>
  );
}