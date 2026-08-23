import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail, Leaf } from 'lucide-react';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] text-white" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/mc-bliss-logo.png"
                alt="MC Bliss"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D4A373]/40"
              />
              <div>
                <p className="font-display font-bold text-white text-xl">MC Bliss</p>
                <p className="text-[#D4A373] text-xs font-body tracking-widest uppercase">Organic Wellness</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-body leading-relaxed max-w-xs">
              Honest food, grown properly, served daily. Nutrient-dense meals crafted
              from sustainable, farm-fresh ingredients.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D4A373]/20 hover:text-[#D4A373] flex items-center justify-center text-gray-400 transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Our Menu', id: 'menu' },
                { label: 'Services', id: 'services' },
                { label: 'About Us', id: 'story' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-[#D4A373] text-sm font-body transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu categories */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Our Menu
            </h4>
            <ul className="space-y-3">
              {[
                'Nutritious Meals',
                'Snacks',
                'Yogurt Bowls',
                'Zobo & Juices',
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => scrollToSection('menu')}
                    className="text-gray-400 hover:text-[#D4A373] text-sm font-body transition-colors duration-200"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Find Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm font-body">
                <MapPin size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
                <span>12 Wellness Avenue, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-body">
                <Phone size={16} className="text-[#D4A373] flex-shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-[#D4A373] transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-body">
                <Mail size={16} className="text-[#D4A373] flex-shrink-0" />
                <a href="mailto:hello@mcbliss.ng" className="hover:text-[#D4A373] transition-colors">
                  hello@mcbliss.ng
                </a>
              </li>
            </ul>
            {/* Hours */}
            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs font-medium text-white mb-1">Opening Hours</p>
              <p className="text-xs text-gray-400 font-body">Mon–Sat: 7:00 AM – 8:00 PM</p>
              <p className="text-xs text-gray-400 font-body">Sunday: 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-gray-500 text-xs font-body text-center sm:text-left">
            &copy; {currentYear} MC Bliss Organic Wellness Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-body">
            <Leaf size={12} className="text-[#1E392A]" />
            <span>Farm-fresh. Sustainably sourced. Served with love.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-gray-500 hover:text-gray-400 text-xs font-body transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
