import { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import type { EventCategory } from '../../types/event-ticketing';

interface CreateEventCategoryProps {
  onClose: () => void;
  onSave?: (category: Omit<EventCategory, 'id'>) => void;
}

export default function CreateEventCategory({ onClose, onSave }: CreateEventCategoryProps) {
  const [category, setCategory] = useState<Omit<EventCategory, 'id'>>({
    name: '',
    description: '',
    icon: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(category);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Event Category</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., Music Concert, Conference, Sports"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Describe this event category..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon/Emoji (Optional)
            </label>
            <input
              type="text"
              value={category.icon}
              onChange={(e) => setCategory({ ...category, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., 🎵, 🏟️, 💼"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}