import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Sparkles } from 'lucide-react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to add drop shadow & white glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Treatments' },
    { id: 'gallery', label: 'Before & After' },
    { id: 'book', label: 'Schedule Clinic' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight text-slate-900">
                Aura<span className="text-blue-600">Dental</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-500 font-mono font-medium -mt-1">
                Precision Aesthetics
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 text-sm font-medium transition-colors hover:text-blue-600 cursor-pointer ${
                    isActive ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Call / CTA */}
          <div id="desktop-cta" className="hidden md:flex items-center gap-4">
            <a
              href="tel:+18005552872"
              className="flex items-center gap-2 text-xs font-semibold font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
              +1 (800) 555-AURA
            </a>
            <button
              id="cta-book-appointment"
              onClick={() => handleNavClick('book')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md cursor-pointer relative overflow-hidden transition-all duration-200 hover:shadow-lg active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:+18005552872"
              className="p-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200"
              aria-label="Call clinic"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform rotate-90 duration-200" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          className="fixed inset-0 z-40 bg-white md:hidden pt-24 animate-fade-in"
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 flex flex-col gap-6 h-full">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400 border-b border-slate-100 pb-2">
              Navigation
            </div>
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-2xl font-bold font-display py-2 transition-colors flex items-center justify-between ${
                    isActive ? 'text-blue-600' : 'text-slate-800'
                  }`}
                >
                  {link.label}
                  <span
                    className={`h-2 w-2 rounded-full bg-blue-600 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
            
            <div className="mt-8 border-t border-slate-100 pt-8 flex flex-col gap-4">
              <a
                href="tel:+18005552872"
                className="flex items-center justify-center gap-3 w-full bg-slate-50 border border-slate-200 font-semibold font-mono text-slate-700 py-3.5 rounded-xl text-center"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                +1 (800) 555-AURA
              </a>
              <button
                id="mobile-book-cta"
                onClick={() => handleNavClick('book')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
            </div>
            
            <div className="mt-auto pb-10 text-center text-xs text-slate-400 font-mono">
              © 2026 AuraDental Practice. All Rights Reserved.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
