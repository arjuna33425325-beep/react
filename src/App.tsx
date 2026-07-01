import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import MyReportsPage from './pages/MyReportsPage';
import ReportDetailPage from './pages/ReportDetailPage';
import ReportFormPage from './pages/ReportFormPage';
import ExplorePage from './pages/ExplorePage';
import StaffDashboard from './pages/StaffDashboard';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';
import PortalPage from './pages/PortalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash / Login */}
        <Route path="/" element={<SplashPage />} />

        {/* User Routes */}
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reports" element={<MyReportsPage />} />
        <Route path="/report/:id" element={<ReportDetailPage />} />
        <Route path="/report-form" element={<ReportFormPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/report/:id" element={<ReportDetailPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
