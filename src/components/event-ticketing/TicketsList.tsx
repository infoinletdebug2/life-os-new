import { useEffect, useState, useMemo } from 'react';
import { Ticket, Calendar, DollarSign, Check, Filter, ChevronDown, X, Grid3X3, List } from 'lucide-react';
import { ticketService, eventService } from '../../services/mockEventData';
import type { EventTicket, Event } from '../../types/event-ticketing';
import SearchFilter from './filters/SearchFilter';
import Pagination from '../ui/Pagination';

export default function TicketsList() {
  const [tickets, setTickets] = useState<EventTicket[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'free' | 'under50' | 'under200' | 'over200'>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsData, eventsData] = await Promise.all([
          ticketService.getTickets(),
          eventService.getEvents()
        ]);
        setTickets(ticketsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique currencies
  const currencies = useMemo(() => {
    const currencySet = new Set(tickets.map(ticket => ticket.currency));
    return Array.from(currencySet).sort();
  }, [tickets]);

  // Filter logic
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      // Search filter
      if (searchQuery && !ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Event filter
      if (selectedEvent !== 'all' && ticket.eventId !== selectedEvent) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && ticket.status !== selectedStatus) {
        return false;
      }

      // Price filter
      if (priceRange !== 'all') {
        if (priceRange === 'free' && ticket.price > 0) return false;
        if (priceRange === 'under50' && (ticket.price <= 0 || ticket.price >= 50)) return false;
        if (priceRange === 'under200' && (ticket.price < 50 || ticket.price >= 200)) return false;
        if (priceRange === 'over200' && ticket.price < 200) return false;
      }

      // Currency filter
      if (selectedCurrency !== 'all' && ticket.currency !== selectedCurrency) {
        return false;
      }

      return true;
    });
  }, [tickets, searchQuery, selectedEvent, selectedStatus, priceRange, selectedCurrency]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTickets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTickets, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedEvent, selectedStatus, priceRange, selectedCurrency]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedEvent('all');
    setSelectedStatus('all');
    setPriceRange('all');
    setSelectedCurrency('all');
  };

  const getEventName = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Unknown Event';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'sold_out':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'coming_soon':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
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
              placeholder="Search tickets by name or description..."
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event</label>
              <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Events</option>
                {events.map(event => (<option key={event.id} value={event.id}>{event.title}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="under50">Under $50</option>
                <option value="under200">$50 - $200</option>
                <option value="over200">Over $200</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
              <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Currencies</option>
                {currencies.map(currency => (<option key={currency} value={currency}>{currency}</option>))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tickets Display */}
      <div>
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No tickets found matching your filters.
          </div>
        ) : viewMode === 'card' ? (
          // Card View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 p-4">
                  <div className="flex items-center justify-between text-white">
                    <Ticket className="w-8 h-8" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {ticket.name}
                  </h3>
                  
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                    {getEventName(ticket.eventId)}
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {ticket.price}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {ticket.currency}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {ticket.quantity} available
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>From: {new Date(ticket.availableFrom).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>Until: {new Date(ticket.availableUntil).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {ticket.advantages.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Includes:
                      </p>
                      <div className="space-y-1">
                        {ticket.advantages.map((advantage) => (
                          <div key={advantage.id} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {advantage.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {advantage.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="glass backdrop-blur-xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded flex items-center justify-center">
                          <Ticket className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {ticket.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span className="text-blue-600 dark:text-blue-400">{getEventName(ticket.eventId)}</span>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span className="font-medium">{ticket.price} {ticket.currency}</span>
                        </div>
                        <span>{ticket.quantity} available</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(ticket.availableFrom).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        {ticket.description}
                      </p>
                    </div>
                    
                    {ticket.advantages.length > 0 && (
                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {ticket.advantages.length} advantage{ticket.advantages.length > 1 ? 's' : ''}
                          </span>
                        </div>
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
        totalItems={filteredTickets.length}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[9, 18, 36, 72]}
      />
    </div>
  );
}