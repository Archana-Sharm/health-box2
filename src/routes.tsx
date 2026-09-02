import { createBrowserRouter } from 'react-router';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import WhyChooseUs from './pages/WhyChooseUs';
import Contact from './pages/Contact';
import Highlights from './pages/Highlights';
import Physiotherapy from './pages/Physiotherapy';
import AdminLogin from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminDoctors from './admin/AdminDoctors';
import Appointments from './admin/Appointments';
import Enquiries from './admin/Enquiries';
import Banners from './admin/Banners';
import Social from './admin/Social';
import Settings from './admin/Settings';
import Profile from './admin/Profile';
import ProtectedRoute from './admin/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'services', Component: Services },
      { path: 'doctors', Component: Doctors },
      { path: 'why-choose-us', Component: WhyChooseUs },
      { path: 'contact', Component: Contact },
      { path: 'highlights', Component: Highlights },
      { path: 'physiotherapy', Component: Physiotherapy },
    ],
  },
  { path: '/admin', Component: AdminLogin },
  {
    path: '/admin',
    Component: ProtectedRoute,
    children: [
      {
        Component: AdminLayout,
        children: [
          { path: 'dashboard', Component: Dashboard },
          { path: 'doctors', Component: AdminDoctors },
          { path: 'appointments', Component: Appointments },
          { path: 'enquiries', Component: Enquiries },
          { path: 'banners', Component: Banners },
          { path: 'social', Component: Social },
          { path: 'settings', Component: Settings },
          { path: 'profile', Component: Profile },
        ],
      },
    ],
  },
]);
