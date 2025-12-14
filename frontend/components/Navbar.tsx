import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Latest', path: '/latest-works' },
    { name: 'Stories', path: '/stories' },
    { name: 'Book Now', path: '/book', isButton: true },
  ];

  // Determine navbar background (Glassmorphism)
  const navbarClasses = !isHome || scrolled
    ? 'bg-slate-900/70 backdrop-blur-lg border-b border-white/10 shadow-lg py-4'
    : 'bg-transparent py-6';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center text-white">
        
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <Camera className="w-8 h-8 text-gold-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-serif font-bold tracking-wider whitespace-nowrap">SMITH STUDIO</span>
        </Link>

        {/* Right Side: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                link.isButton
                  ? 'bg-gold-500 text-slate-900 px-6 py-2.5 rounded-full font-medium hover:bg-gold-400 hover:scale-105 transition-all shadow-lg shadow-gold-500/20 whitespace-nowrap'
                  : 'text-sm uppercase tracking-widest hover:text-gold-400 transition-colors relative group whitespace-nowrap'
              }`}
            >
              {link.name}
              {!link.isButton && (
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-gold-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-8 gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-center py-2 text-lg whitespace-nowrap ${
                link.isButton
                  ? 'bg-gold-500 text-slate-900 px-8 rounded-full font-bold'
                  : 'text-white hover:text-gold-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};