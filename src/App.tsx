import { useState } from 'react';
import { Page } from './types';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import ServicesPage from './components/ServicesPage';
import GalleryPage from './components/GalleryPage';
import BookPage from './components/BookPage';
import { Sparkles, Phone, Mail, MapPin, Clock, Heart, Award, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  // Helpers to capture link choices during user navigation
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
  };

  const handleClearSelections = () => {
    setSelectedServiceId('');
    setSelectedDoctorId('');
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Homepage 
            setCurrentPage={setCurrentPage} 
            onSelectDoctor={handleSelectDoctor} 
          />
        );
      case 'services':
        return (
          <ServicesPage 
            setCurrentPage={setCurrentPage} 
            onSelectService={handleSelectService} 
          />
        );
      case 'gallery':
        return (
          <GalleryPage 
            setCurrentPage={setCurrentPage} 
            onSelectService={handleSelectService} 
          />
        );
      case 'book':
        return (
          <BookPage 
            preselectedServiceId={selectedServiceId}
            preselectedDoctorId={selectedDoctorId}
            clearSelection={handleClearSelections}
          />
        );
      default:
        return (
          <Homepage 
            setCurrentPage={setCurrentPage} 
            onSelectDoctor={handleSelectDoctor} 
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Universal Responsive Header */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Dental Core Canvas */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Gorgeous Premium Footer */}
      <footer id="auradental-footer" className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-800 pb-12 mb-10">
            {/* Logo Column */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold font-display tracking-tight text-white">
                    Aura<span className="text-blue-500">Dental</span>
                  </span>
                  <span className="block text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-medium -mt-1">
                    Precision Aesthetics
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2 pr-6">
                Elite AAA-category dental institution delivering pain-free ceramic restorations, 3D micro-guided clear aligners, and biomimetic dental implants under extreme precision standards.
              </p>
              
              <div className="flex items-center gap-3 mt-4 text-xs font-mono font-bold text-white uppercase tracking-wider bg-slate-800 border border-slate-700/60 px-4 py-2 rounded-xl w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fully CODA Accredited</span>
              </div>
            </div>

            {/* Quick Actions Links */}
            <div className="md:col-span-2.5 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Treatments</span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Cosmetic Veneers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Premium Swiss Implants
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AuraAlign Clear Trays
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Microscopic Root Canals
                  </button>
                </li>
              </ul>
            </div>

            {/* Practical Resources Links */}
            <div className="md:col-span-2.5 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Resources</span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => { setCurrentPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Smile Gallery Proof
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('book'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </button>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed">
                    Patient Intake Forms
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed">
                    Micro-biology Science Blog
                  </span>
                </li>
              </ul>
            </div>

            {/* Urgent Contact & Map Pillar */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Clinic Coordinates</span>
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-400">
                <div className="flex gap-2.5 items-start">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>140 Madison Avenue, Penthouse B,<br />Manhattan, NY 10016</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <a href="tel:+18005552872" className="hover:text-white transition-colors">+1 (800) 555-AURA</a>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <a href="mailto:concierge@auradental.com" className="hover:text-white transition-colors">concierge@auradental.com</a>
                </div>
                <div className="flex gap-2.5 items-start border-t border-slate-800 pt-3 mt-1">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold font-mono text-slate-500 block">CLINIC HOURS</span>
                    <span className="text-xs block text-slate-300">Mon - Fri: 8:00 AM - 6:00 PM</span>
                    <span className="text-xs block text-slate-300">Saturday: 9:00 AM - 3:00 PM (Emergency)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Block */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
            <span>© 2026 AuraDental Practice Inc. (CODA Certified No. D42502-A).</span>
            <div className="flex items-center gap-1">
              <span>Engineered with Premium Healthcare Standards</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
