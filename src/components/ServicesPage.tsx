import { useState } from 'react';
import { Service, Page, TreatmentCategory } from '../types';
import { SERVICES } from '../data';
import { 
  Sparkles, Zap, Grid, Shield, Award, HeartPulse, Activity,
  Clock, RotateCcw, DollarSign, CheckCircle2, X, ArrowRight
} from 'lucide-react';

interface ServicesPageProps {
  setCurrentPage: (page: Page) => void;
  onSelectService: (serviceId: string) => void;
}

export default function ServicesPage({ setCurrentPage, onSelectService }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | TreatmentCategory>('all');
  const [activeDetailService, setActiveDetailService] = useState<Service | null>(null);

  const categories: { id: 'all' | TreatmentCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Protocols', count: SERVICES.length },
    { id: 'cosmetic', label: 'Aesthetic / Cosmetic', count: SERVICES.filter(s => s.category === 'cosmetic').length },
    { id: 'implants', label: 'Implantology / Crowns', count: SERVICES.filter(s => s.category === 'implants').length },
    { id: 'general', label: 'Core / General Care', count: SERVICES.filter(s => s.category === 'general').length },
  ];

  const filteredServices = SERVICES.filter(s => 
    selectedCategory === 'all' ? true : s.category === selectedCategory
  );

  // Dynamic Icon assignment helper
  const renderServiceIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Grid': return <Grid className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Award': return <Award className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Activity': return <Activity className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const handleBookService = (serviceId: string) => {
    onSelectService(serviceId);
    setActiveDetailService(null);
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 relative">
      {/* Background glow lines */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-blue-100/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-emerald-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">CLINICAL ARSENAL</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight mt-1.5">
            Aesthetic and Reconstructive Treatments
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Click any procedure to inspect the clinical protocol sheets, expected durations, biologic recovery dynamics, and key benefits.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/55'
              }`}
            >
              {cat.label}
              <span className={`inline-block ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                selectedCategory === cat.id ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => setActiveDetailService(service)}
              className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Icon + Category tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-blue-600 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                    {renderServiceIcon(service.iconName, "w-6 h-6")}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    {service.category === 'cosmetic' ? 'Aesthetic' : service.category === 'implants' ? 'Recon/Oral' : 'General'}
                  </span>
                </div>

                {/* Card Main content */}
                <h3 className="text-xl font-bold font-display text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-2.5">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Specs Ribbon */}
              <div className="mt-auto">
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4 text-xs font-semibold font-mono text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.duration.includes('(') ? service.duration.split('(')[0].trim() : service.duration}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-bold font-sans text-blue-600 group-hover:text-blue-700">
                  <span>Review Clinical Specs</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:bg-blue-100 group-hover:text-blue-600">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Interactive Treatment Protocol Model/Overlay */}
        {activeDetailService && (
          <div
            id="treatment-protocol-overlay"
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <div
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100/80 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]"
            >
              {/* Drawer Header Area */}
              <div className="bg-gradient-to-tr from-slate-900 to-slate-850 text-white p-6 sm:p-8 relative">
                <button
                  id="close-protocol-overlay"
                  onClick={() => setActiveDetailService(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close Protocol"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase block font-semibold mb-1">
                  PROTOCOL SPECIFICATIONS Sheet
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight pr-4 leading-tight">
                  {activeDetailService.title}
                </h2>
              </div>

              {/* Drawer Content - Scrollable */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col gap-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">CLINICAL PURPOSE</h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {activeDetailService.longDescription}
                  </p>
                </div>

                {/* Treatment Facts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-100 py-4">
                  <div className="flex gap-2 items-start">
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">VISIT DURATION</div>
                      <div className="text-xs font-semibold text-slate-800">{activeDetailService.duration}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <RotateCcw className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">RECOVERY ASPECT</div>
                      <div className="text-xs font-semibold text-slate-800">{activeDetailService.recovery}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <DollarSign className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">INVESTMENT PROFILE</div>
                      <div className="text-xs font-semibold text-slate-800">{activeDetailService.priceRange}</div>
                    </div>
                  </div>
                </div>

                {/* Benefits Bullet Points */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">EXPECTED THERAPEUTIC OUTCOMES</h4>
                  <ul className="flex flex-col gap-2.5">
                    {activeDetailService.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Drawer bottom Action buttons */}
              <div className="border-t border-slate-100 p-6 bg-slate-50 flex flex-col sm:flex-row gap-3 justify-end items-stretch">
                <button
                  id="close-modal-secondary"
                  onClick={() => setActiveDetailService(null)}
                  className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl cursor-pointer"
                >
                  Dismiss Sheet
                </button>
                <button
                  id="modal-cta-book-treatment"
                  onClick={() => handleBookService(activeDetailService.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-md cursor-pointer text-center"
                >
                  Select & Book Treatment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
