import { useEffect, useState, useMemo } from 'react';
import { Tag, X } from 'lucide-react';
import { categoryService } from '../../services/mockEventData';
import type { EventCategory } from '../../types/event-ticketing';
import SearchFilter from './filters/SearchFilter';
import Pagination from '../ui/Pagination';

export default function CategoriesList() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter logic
  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      if (searchQuery && 
          !category.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !category.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [categories, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage, itemsPerPage]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const clearFilters = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchFilter
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search categories by name or description..."
            />
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 
                     hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 
                     shadow-lg hover:shadow-xl"
          >
            <X className="w-4 h-4" />
            Clear Searches
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            No categories found matching your search.
          </div>
        ) : (
          paginatedCategories.map((category) => (
        <div
          key={category.id}
          className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{category.icon || <Tag className="w-10 h-10 text-purple-600" />}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      ))
    )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredCategories.length}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[12, 24, 48, 96]}
      />
    </div>
  );
}