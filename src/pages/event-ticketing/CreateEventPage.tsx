import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import CreateEventForm from '../../components/event-ticketing/CreateEventForm';
import { DashboardLayout } from '../../components/workspace/dashboard-layout';

export default function CreateEventPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/travel/event-ticketing/events');
  };

  const handleSave = (event: any) => {
    // Handle save logic here
    console.log('Saving event:', event);
    navigate('/travel/event-ticketing/events');
  };

  return (
    <DashboardLayout currentView="create-event" selectedCategory="travel">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="glass backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </button>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Event</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <CreateEventForm onSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}