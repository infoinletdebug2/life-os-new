import { useEffect, useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Tag, Filter, ChevronDown, X, Grid3X3, List } from 'lucide-react';
import { eventService, venueService, categoryService } from '../../services/mockEventData';
import type { Event, Venue, EventCategory } from '../../types/event-ticketing';
import SearchFilter from './filters/SearchFilter';
import Pagination from '../ui/Pagination';

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, venuesData, categoriesData] = await Promise.all([
          eventService.getEvents(),
          venueService.getVenues(),
          categoryService.getCategories()
        ]);
        setEvents(eventsData);
        setVenues(venuesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getVenueName = (venueId: string) => {
    const venue = venues.find(v => v.id === venueId);
    return venue ? `${venue.name}, ${venue.city}` : 'Unknown Venue';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Filter logic
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && event.status !== selectedStatus) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && event.categoryId !== selectedCategory) {
        return false;
      }

      // Venue filter
      if (selectedVenue !== 'all' && event.venueId !== selectedVenue) {
        return false;
      }

      // Date filter
      const eventDate = new Date(event.startDate);
      const now = new Date();
      if (dateFilter === 'upcoming' && eventDate < now) {
        return false;
      }
      if (dateFilter === 'past' && eventDate >= now) {
        return false;
      }

      return true;
    });
  }, [events, searchQuery, selectedStatus, selectedCategory, selectedVenue, dateFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedCategory, selectedVenue, dateFilter]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedVenue('all');
    setDateFilter('all');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchFilter
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search events by title, description, or tags..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-400 
                       hover:from-cyan-700 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 
                       shadow-lg hover:shadow-xl"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
            
            {/* View Toggle */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'card'
                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 
                          bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Venue
              </label>
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Venues</option>
                {venues.map(venue => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as 'all' | 'upcoming' | 'past')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Events Display */}
      <div>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No events found matching your filters.
          </div>
        ) : viewMode === 'card' ? (
          // Card View
          <div className="space-y-4">
            {paginatedEvents.map((event) => (
              <div
                key={event.id}
                className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {event.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Tag className="w-4 h-4" />
                        <span>{getCategoryName(event.categoryId)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{getVenueName(event.venueId)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.startDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{event.maxAttendees.toLocaleString()} attendees</span>
                      </div>
                    </div>

                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {event.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {event.guests.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Featured Guests:
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {event.guests.map((guest) => (
                            <div key={guest.id} className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
                                {guest.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {guest.name}
                                </p>
                                {guest.role && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {guest.role}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {event.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{getCategoryName(event.categoryId)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{getVenueName(event.venueId)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(event.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{event.maxAttendees.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {event.tags.length > 0 && (
                      <div className="flex gap-1 ml-4">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {event.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{event.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredEvents.length}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[6, 12, 24, 48]}
      />
    </div>
  );
}