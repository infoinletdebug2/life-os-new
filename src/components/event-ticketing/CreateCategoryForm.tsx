import { useState } from 'react';
import { Button } from '../ui/button';
import type { EventCategory } from '../../types/event-ticketing';

interface CreateCategoryFormProps {
  onSave?: (category: Omit<EventCategory, 'id'>) => void;
}

export default function CreateCategoryForm({ onSave }: CreateCategoryFormProps) {
  const [category, setCategory] = useState<Omit<EventCategory, 'id'>>({
    name: '',
    description: '',
    icon: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(category);
  };

  return (
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
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Category
        </Button>
      </div>
    </form>
  );
}