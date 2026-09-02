import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';

interface NavbarProps { onBookAppointment: () => void; }

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Why Choose Us', path: '/why-choose-us' },
  { label: 'Highlights', path: '/highlights' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar({ onBookAppointment }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-[#172033] text-white text-xs px-4 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#8DC63F]">
              <Clock size={12} />
              <span>Mon–Sat: 9:00 AM – 8:00 PM &nbsp;|&nbsp; Sun: 9:00 AM – 2:00 PM</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin size={12} />
              <span>123 Medical Plaza, Sector 14, Your City</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 text-[#8DC63F] hover:text-white">
              <Phone size={12} />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`bg-white border-b transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 min-w-0 shrink-0">
            <img
              src="/src/assets/logo.jpg"
              alt="Health Box logo"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.path
                    ? 'text-[#E52328] bg-[#E52328]/8'
                    : 'text-[#172033] hover:text-[#E52328] hover:bg-[#E52328]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onBookAppointment}
              className="px-5 py-2.5 bg-[#E52328] text-white text-sm font-semibold rounded-lg hover:bg-[#c71a1f] shadow-sm hover:shadow-md"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-[#172033] hover:bg-gray-100"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg ${
                  pathname === link.path
                    ? 'text-[#E52328] bg-[#E52328]/8'
                    : 'text-[#172033] hover:text-[#E52328] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={onBookAppointment}
                className="w-full px-5 py-3 bg-[#E52328] text-white text-sm font-semibold rounded-lg hover:bg-[#c71a1f]"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
