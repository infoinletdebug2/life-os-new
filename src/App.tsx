import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';
import enMessages from './locales/en.json';
import jaMessages from './locales/ja.json';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import TestDarkMode from './pages/TestDarkMode';
import HotelDashboard from './pages/hotel/HotelDashboard';
import HotelList from './pages/hotel/HotelList';
import HotelForm from './pages/hotel/HotelForm';
import RoomManagement from './pages/hotel/RoomManagement';
import BookingManagement from './pages/hotel/BookingManagement';
import GuestManagement from './pages/hotel/GuestManagement';
import EventsPage from './pages/event-ticketing/EventsPage';
import VenuesPage from './pages/event-ticketing/VenuesPage';
import CategoriesPage from './pages/event-ticketing/CategoriesPage';
import TicketsPage from './pages/event-ticketing/TicketsPage';
import CreateEventPage from './pages/event-ticketing/CreateEventPage';
import CreateVenuePage from './pages/event-ticketing/CreateVenuePage';
import CreateCategoryPage from './pages/event-ticketing/CreateCategoryPage';
import CreateTicketPage from './pages/event-ticketing/CreateTicketPage';

const messages = {
  en: enMessages,
  ja: jaMessages,
};

function App() {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');

  return (
    <ThemeProvider>
      <IntlProvider messages={messages[locale]} locale={locale}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/categories" replace />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/test-dark" element={<TestDarkMode />} />
            <Route path="/:category/:subcategory" element={<Dashboard />} />
            
            {/* Hotel Management Routes */}
            <Route path="/hotel" element={<HotelDashboard />} />
            <Route path="/hotel/dashboard" element={<HotelDashboard />} />
            <Route path="/hotel/properties" element={<HotelList />} />
            <Route path="/hotel/list" element={<HotelList />} />
            <Route path="/hotel/add" element={<HotelForm />} />
            <Route path="/hotel/edit/:id" element={<HotelForm />} />
            <Route path="/hotel/:id/rooms" element={<RoomManagement />} />
            <Route path="/hotel/rooms" element={<RoomManagement />} />
            <Route path="/hotel/bookings" element={<BookingManagement />} />
            <Route path="/hotel/guests" element={<GuestManagement />} />

            {/* Event Ticketing Routes */}
            <Route path="/travel/event-ticketing/events" element={<EventsPage />} />
            <Route path="/travel/event-ticketing/venues" element={<VenuesPage />} />
            <Route path="/travel/event-ticketing/categories" element={<CategoriesPage />} />
            <Route path="/travel/event-ticketing/tickets" element={<TicketsPage />} />
            <Route path="/travel/event-ticketing/events/create" element={<CreateEventPage />} />
            <Route path="/travel/event-ticketing/venues/create" element={<CreateVenuePage />} />
            <Route path="/travel/event-ticketing/categories/create" element={<CreateCategoryPage />} />
            <Route path="/travel/event-ticketing/tickets/create" element={<CreateTicketPage />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );  
}

export default App;