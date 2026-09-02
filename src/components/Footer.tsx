import { Link } from 'react-router';
import { Phone, Mail, MapPin, Clock, Share2, Hash, Video, Link as LinkIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#172033] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/src/assets/logo.jpg"
              alt="Health Box logo"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            Advanced healthcare with a patient-first approach. Trusted by thousands for expert medical and physiotherapy care.
          </p>
          <div className="flex gap-3">
            {[Share2, Hash, Video, LinkIcon].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-[#E52328] transition-colors">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Home', path: '/' },
              { label: 'About Us', path: '/about' },
              { label: 'Doctors', path: '/doctors' },
              { label: 'Why Choose Us', path: '/why-choose-us' },
              { label: 'Highlights', path: '/highlights' },
            ].map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm text-gray-400 hover:text-[#8DC63F] transition-colors">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Our Services</h4>
          <ul className="space-y-2.5">
            {[
              'General OPD',
              'Physiotherapy',
              'Orthopedic Care',
              'Neuro Rehabilitation',
              'Sports Injury',
              'Women\'s Health',
              'Pediatric Care',
              'Pain Management',
            ].map((s) => (
              <li key={s}>
                <Link to="/services" className="text-sm text-gray-400 hover:text-[#8DC63F] transition-colors">
                  → {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Contact</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <MapPin size={14} className="text-[#8DC63F] mt-0.5 flex-shrink-0" />
              <span className="text-gray-400">123 Medical Plaza, Sector 14, Your City – 400001</span>
            </li>
            <li className="flex gap-3 text-sm">
              <Phone size={14} className="text-[#8DC63F] mt-0.5 flex-shrink-0" />
              <a href="tel:+919876543210" className="text-gray-400 hover:text-[#8DC63F]">+91 98765 43210</a>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail size={14} className="text-[#8DC63F] mt-0.5 flex-shrink-0" />
              <a href="mailto:info@healthboxpolyclinic.com" className="text-gray-400 hover:text-[#8DC63F]">info@healthboxpolyclinic.com</a>
            </li>
            <li className="flex gap-3 text-sm">
              <Clock size={14} className="text-[#8DC63F] mt-0.5 flex-shrink-0" />
              <span className="text-gray-400">Mon–Sat: 9AM–8PM<br/>Sun: 9AM–2PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Health Box Polyclinic & Advance Physiotherapy Center. All rights reserved.</span>
          <span>Designed for Excellence in Healthcare</span>
        </div>
      </div>
    </footer>
  );
}
