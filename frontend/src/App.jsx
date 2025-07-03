import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LoginPage from './pages/auth/LoginPage.jsx';
import SignUpPage from './pages/auth/SignUpPage.jsx';

import NotFound from './pages/NotFound.jsx';

import CodeEditorPage from './pages/editor/CodeEditorPage.jsx';

import EventsPage from './pages/events/EventsPage.jsx';
import CreateEventPage from './pages/events/CreateEventPage';
import EventDetailsPage from './pages/events/EventDetailsPage.jsx';

import DashboardPage from './pages/profile/DashboardPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';

import NotificationPage from './pages/notification/NotificationPage.jsx';

import SavedPage from './pages/saved/SavedPage.jsx';

import SettingsPage from './pages/settings/SettingsPage.jsx';

import CreateGigPage from './pages/gigs/CreateGigPage.jsx';
import GigDetails from './pages/gigs/GigDetailsPage.jsx';
import MarketplacePage from './pages/gigs/MarketplacePage.jsx';

import OrdersPage from './pages/OrdersPage.jsx';

import ChatPage from './pages/chat/ChatPage.jsx';
import ResourcePage from './pages/Resources/ResourcePage.jsx';
import CreateResource from './pages/Resources/CreateResource.jsx';
import ResourceDetails from './pages/Resources/ResourceDetails.jsx';

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
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/create" element={<CreateEventPage />} />
            <Route path="/events/:eventId" element={<EventDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/library" element={<ResourcePage />} />
            <Route path="/library/new" element={<CreateResource />} />
        <Route path="/library/:id" element={<ResourceDetails />} />
          </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
