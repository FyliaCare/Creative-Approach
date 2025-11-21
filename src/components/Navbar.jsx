import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenQuoteBot }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - optimized for mobile */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <motion.img
              src={scrolled || !isHomePage ? "/creative-approach-black.png" : "/creative-approach-white.png"}
              alt="Creative Approach Logo"
              className="h-10 md:h-12 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span className={`font-medium text-sm xl:text-base transition-colors ${
                  location.pathname === link.path
                    ? 'text-drone-600'
                    : (scrolled || !isHomePage) ? 'text-gray-700 hover:text-drone-600' : 'text-white hover:text-drone-200'
                }`}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-drone-500 to-sky-500"
                  />
                )}
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenQuoteBot}
              className="btn-primary"
            >
              Get Quote
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 z-50"
          >
            <motion.div 
              className="w-6 h-5 flex flex-col justify-between"
              animate={mobileMenuOpen ? "open" : "closed"}
            >
              <motion.span 
                className={`block h-0.5 w-full transition-all ${(scrolled || !isHomePage) ? 'bg-gray-900' : 'bg-white'}`}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
              />
              <motion.span 
                className={`block h-0.5 w-full transition-all ${(scrolled || !isHomePage) ? 'bg-gray-900' : 'bg-white'}`}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span 
                className={`block h-0.5 w-full transition-all ${(scrolled || !isHomePage) ? 'bg-gray-900' : 'bg-white'}`}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu - Desktop-like Experience */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {/* Mobile Navigation Links */}
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3 px-4 font-medium text-lg rounded-lg transition-all ${
                          location.pathname === link.path 
                            ? 'bg-gradient-to-r from-drone-500 to-sky-500 text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenQuoteBot();
                    }}
                    className="w-full py-4 bg-gradient-to-r from-drone-500 to-sky-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    Get a Free Quote
                  </button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-600 mb-4">Get in touch</p>
                  <div className="space-y-3 text-sm">
                    <a href="tel:+233541500716" className="block text-gray-700 hover:text-drone-600">
                      📞 +233 541 500 716
                    </a>
                    <a href="mailto:visuals@caghana.com" className="block text-gray-700 hover:text-drone-600">
                      ✉️ visuals@caghana.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
