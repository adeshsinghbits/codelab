import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NotFound from './pages/NotFound.jsx';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import CreateEventPage from './pages/CreateEventPage';
import DashboardPage from './pages/DashboardPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Toaster } from 'react-hot-toast';
import EventDetailsPage from './pages/EventDetailsPage.jsx';
import CreateGigPage from './pages/CreateGigPage.jsx';
import GigDetails from './pages/GigDetailsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />

        {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/editor" element={<CodeEditorPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/create" element={<CreateGigPage />} />
            <Route path="/marketplace/:gigId" element={<GigDetails />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/create" element={<CreateEventPage />} />
            <Route path="/events/:eventId" element={<EventDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
