import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard, Users, CalendarCheck, MessageSquare, Image,
  Share2, Settings, UserCircle, LogOut, Menu, X, Bell, ChevronRight
} from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/doctors', icon: Users, label: 'Doctors' },
  { path: '/admin/appointments', icon: CalendarCheck, label: 'Appointments' },
  { path: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
  { path: '/admin/banners', icon: Image, label: 'Banners' },
  { path: '/admin/social', icon: Share2, label: 'Social Media' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
  { path: '/admin/profile', icon: UserCircle, label: 'Profile' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() { logout(); navigate('/admin', { replace: true }); }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#172033] flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <rect x="8" y="2" width="4" height="16" rx="1" fill="#A8D52A"/>
                <rect x="2" y="8" width="16" height="4" rx="1" fill="white"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-white text-sm">Health Box</div>
              <div className="text-[9px] text-gray-400 tracking-widest uppercase">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link key={path} to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === path
                  ? 'bg-[#0F766E] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/8'
              }`}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-xs">
              {admin?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{admin?.name || 'Admin'}</div>
              <div className="text-gray-400 text-[10px] truncate">{admin?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-xs font-medium transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b sticky top-0 z-30 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="text-sm text-gray-500">
              {navItems.find((n) => n.path === pathname)?.label || 'Dashboard'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 relative">
              <Bell size={18} />
            </button>
            <Link to="/" target="_blank" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F766E] border border-[#0F766E]/25 rounded-lg hover:bg-[#0F766E]/5">
              View Site <ChevronRight size={12} />
            </Link>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
