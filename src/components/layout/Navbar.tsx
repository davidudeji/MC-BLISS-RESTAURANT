import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Flame } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
  { label: 'Loyalty', href: '/loyalty', route: true },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCartStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cartCount = totalItems();

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled || mobileOpen || !isLanding
            ? 'bg-[#1E392A] shadow-lg backdrop-blur-md'
            : 'bg-transparent'
        )}
        animate={{
          backgroundColor:
            scrolled || mobileOpen || !isLanding
              ? 'rgba(30,57,42,0.97)'
              : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/mc-bliss-logo.png"
                alt="MC Bliss Restaurant & Catering Services"
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover ring-2 ring-[#D4A373]/40"
              />
              <div className="hidden sm:block">
                <p className="font-display font-bold text-white text-lg leading-tight">MC Bliss </p>
                <p className="text-[#D4A373] text-xs font-body tracking-widest uppercase">Restaurant & Catering Service</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                link.route ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-1.5 text-white/80 hover:text-[#D4A373] text-sm font-medium font-body transition-colors duration-200"
                  >
                    <Flame size={13} />
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-white/80 hover:text-white text-sm font-medium font-body transition-colors duration-200 hover:text-[#D4A373]"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl text-white hover:text-[#D4A373] transition-colors"
                aria-label={`Open cart, ${cartCount} items`}
              >
                <ShoppingBag size={22} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="cart-badge"
                      className="absolute -top-1 -right-1 bg-[#D4A373] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Order CTA – desktop */}
              <button
                onClick={() => scrollToSection('menu')}
                className="hidden md:inline-flex items-center gap-2 bg-[#D4A373] text-white text-sm font-medium font-body px-5 py-2.5 rounded-xl hover:bg-[#b8864f] transition-colors duration-200"
              >
                Order Now
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="md:hidden p-2.5 rounded-xl text-white hover:text-[#D4A373] transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={22} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="md:hidden border-t border-white/10 bg-[#1E392A]"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-6 space-y-1">
                {NAV_LINKS.map((link, i) =>
                  link.route ? (
                    <motion.div
                      key={link.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 + 0.05 }}
                    >
                      <button
                        onClick={() => { navigate(link.href); setMobileOpen(false); }}
                        className="w-full text-left px-4 py-3 text-[#D4A373] hover:bg-white/5 rounded-xl text-base font-medium font-body transition-colors flex items-center gap-2"
                      >
                        <Flame size={15} /> {link.label}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={link.label}
                      onClick={() => {
                        scrollToSection(link.href.replace('#', ''));
                        setMobileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white/90 hover:text-[#D4A373] hover:bg-white/5 rounded-xl text-base font-medium font-body transition-colors"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 + 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  )
                )}
                <motion.div
                  className="pt-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <button
                    onClick={() => {
                      scrollToSection('menu');
                      setMobileOpen(false);
                    }}
                    className="w-full bg-[#D4A373] text-white py-3 rounded-xl font-medium font-body hover:bg-[#b8864f] transition-colors"
                  >
                    Order Now
                  </button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
