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
import AddRoom from './pages/hotel/AddRoom';
import AddCustomer from './pages/hotel/AddCustomer';
import RoomDetails from './pages/hotel/RoomDetails';
import RoomTypes from './pages/hotel/RoomTypes';
import RoomCategories from './pages/hotel/RoomCategories';
import AddCategory from './pages/hotel/AddCategory';
import AddRoomType from './pages/hotel/AddRoomType';
import NewBooking from './pages/hotel/NewBooking';
import BookingDetails from './pages/hotel/BookingDetails';
import EditBooking from './pages/hotel/EditBooking';
import Reservations from './pages/hotel/Reservations';
import CheckIns from './pages/hotel/CheckIns';
import CheckOuts from './pages/hotel/CheckOuts';
import Agreements from './pages/hotel/Agreements';
import BookingPayments from './pages/hotel/BookingPayments';

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
            <Route path="/hotel/rooms/add" element={<AddRoom />} />
            <Route path="/hotel/rooms/:id" element={<RoomDetails />} />
            <Route path="/hotel/rooms/types" element={<RoomTypes />} />
            <Route path="/hotel/rooms/types/add" element={<AddRoomType />} />
            <Route path="/hotel/rooms/categories" element={<RoomCategories />} />
            <Route path="/hotel/rooms/categories/add" element={<AddCategory />} />
            <Route path="/hotel/bookings" element={<BookingManagement />} />
            <Route path="/hotel/bookings/new" element={<NewBooking />} />
            <Route path="/hotel/bookings/:id" element={<BookingDetails />} />
            <Route path="/hotel/bookings/:id/edit" element={<EditBooking />} />
            <Route path="/hotel/bookings/reservations" element={<Reservations />} />
            <Route path="/hotel/bookings/check-ins" element={<CheckIns />} />
            <Route path="/hotel/bookings/check-outs" element={<CheckOuts />} />
            <Route path="/hotel/bookings/agreements" element={<Agreements />} />
            <Route path="/hotel/bookings/payments" element={<BookingPayments />} />
            <Route path="/hotel/guests" element={<GuestManagement />} />
            <Route path="/hotel/guests/add" element={<AddCustomer />} />

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