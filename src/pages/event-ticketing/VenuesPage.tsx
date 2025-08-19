import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import VenuesList from '../../components/event-ticketing/VenuesList';
import { DashboardLayout } from '../../components/workspace/dashboard-layout';

export default function VenuesPage() {
  return (
    <DashboardLayout currentView="venues" selectedCategory="travel">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="glass backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Venues</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage event venues and their facilities
              </p>
            </div>
            <Link
              to="/travel/event-ticketing/venues/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              Create Venue
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <VenuesList />
        </div>
      </div>
    </DashboardLayout>
  );
}