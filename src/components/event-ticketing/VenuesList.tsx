import { useEffect, useState, useMemo } from 'react';
import { MapPin, Phone, Mail, Globe, Users, Home, Filter, ChevronDown, X, Grid3X3, List } from 'lucide-react';
import { venueService } from '../../services/mockEventData';
import type { Venue } from '../../types/event-ticketing';
import SearchFilter from './filters/SearchFilter';
import Pagination from '../ui/Pagination';

export default function VenuesList() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [capacityFilter, setCapacityFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');
  const [hasAccommodation, setHasAccommodation] = useState<'all' | 'yes' | 'no'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await venueService.getVenues();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Get unique cities and amenities
  const cities = useMemo(() => {
    const citySet = new Set(venues.map(venue => venue.city));
    return Array.from(citySet).sort();
  }, [venues]);

  const allAmenities = useMemo(() => {
    const amenitySet = new Set(venues.flatMap(venue => venue.amenities));
    return Array.from(amenitySet).sort();
  }, [venues]);

  // Filter logic
  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      // Search filter
      if (searchQuery && !venue.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !venue.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !venue.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !venue.country.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // City filter
      if (selectedCity !== 'all' && venue.city !== selectedCity) {
        return false;
      }

      // Capacity filter
      if (capacityFilter !== 'all') {
        if (capacityFilter === 'small' && venue.capacity >= 1000) return false;
        if (capacityFilter === 'medium' && (venue.capacity < 1000 || venue.capacity >= 10000)) return false;
        if (capacityFilter === 'large' && venue.capacity < 10000) return false;
      }

      // Amenity filter
      if (selectedAmenity !== 'all' && !venue.amenities.includes(selectedAmenity)) {
        return false;
      }

      // Accommodation filter
      if (hasAccommodation !== 'all') {
        if (hasAccommodation === 'yes' && !venue.accommodation?.available) return false;
        if (hasAccommodation === 'no' && venue.accommodation?.available) return false;
      }

      return true;
    });
  }, [venues, searchQuery, selectedCity, capacityFilter, selectedAmenity, hasAccommodation]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const paginatedVenues = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVenues.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVenues, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCity, capacityFilter, selectedAmenity, hasAccommodation]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setCapacityFilter('all');
    setSelectedAmenity('all');
    setHasAccommodation('all');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
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
              placeholder="Search venues by name, address, city, or country..."
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
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacity
              </label>
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (&lt; 1,000)</option>
                <option value="medium">Medium (1,000 - 9,999)</option>
                <option value="large">Large (10,000+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amenity
              </label>
              <select
                value={selectedAmenity}
                onChange={(e) => setSelectedAmenity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Amenities</option>
                {allAmenities.map(amenity => (
                  <option key={amenity} value={amenity}>
                    {amenity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accommodation
              </label>
              <select
                value={hasAccommodation}
                onChange={(e) => setHasAccommodation(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Venues</option>
                <option value="yes">With Accommodation</option>
                <option value="no">No Accommodation</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Venues Display */}
      <div>
        {filteredVenues.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No venues found matching your filters.
          </div>
        ) : viewMode === 'card' ? (
          // Card View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVenues.map((venue) => (
              <div
                key={venue.id}
                className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                  <div className="flex items-center justify-center h-48">
                    <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {venue.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.address}, {venue.city}, {venue.country}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {venue.capacity.toLocaleString()}</span>
                    </div>
                    
                    {venue.accommodation?.available && (
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        <span>{venue.accommodation.type} available</span>
                      </div>
                    )}
                  </div>

                  {venue.amenities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amenities:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {venue.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Phone className="w-3 h-3" />
                      <span>{venue.contactInfo.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Mail className="w-3 h-3" />
                      <span>{venue.contactInfo.email}</span>
                    </div>
                    
                    {venue.contactInfo.website && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Globe className="w-3 h-3" />
                        <a
                          href={venue.contactInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 dark:hover:text-blue-400 underline"
                        >
                          Visit Website
                        </a>
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
              {paginatedVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {venue.name}
                        </h3>
                        {venue.accommodation?.available && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                            {venue.accommodation.type}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{venue.address}, {venue.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{venue.capacity.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{venue.contactInfo.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    {venue.amenities.length > 0 && (
                      <div className="flex gap-1 ml-4">
                        {venue.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                        {venue.amenities.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{venue.amenities.length - 3}
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
        totalItems={filteredVenues.length}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[9, 18, 36, 72]}
      />
    </div>
  );
}