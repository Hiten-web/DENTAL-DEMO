import { Page, Doctor } from '../types';
import { CLINICIANS } from '../data';
import { Sparkles, Calendar, ShieldCheck, Star, ArrowRight, Video, Medal, Clock } from 'lucide-react';

interface HomepageProps {
  setCurrentPage: (page: Page) => void;
  onSelectDoctor: (doctorId: string) => void;
}

export default function Homepage({ setCurrentPage, onSelectDoctor }: HomepageProps) {
  const stats = [
    { label: 'Happy Patients', value: '12,400+', icon: Star, color: 'text-amber-500 bg-amber-50' },
    { label: 'Success Guarantee', value: '99.8%', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Combined Mastery', value: '45+ Yrs', icon: Medal, color: 'text-blue-500 bg-blue-50' },
    { label: 'Average Rest Time', value: '0 Mins', icon: Clock, color: 'text-purple-500 bg-purple-50' }
  ];

  const valueAesthetics = [
    {
      title: 'Hyper-Realistic Materials',
      description: 'We exclusively work with ultra-premium materials like lithium disilicate and monolithic zirconia. Every smile transmits real biological light and adapts perfectly.',
      tag: 'AESTHETIC INTEGRITY'
    },
    {
      title: 'Pain-Free Micro-Dentistry',
      description: 'Under 20x magnification surgical microscopes, our localized computer-calculated anesthesia and piezo soundless tools ensure your absolute physical comfort.',
      tag: 'BIOMIMETIC COMFORT'
    },
    {
      title: 'Digital Diagnostics Only',
      description: 'No messy mouthfuls of impression putty. We map your smile geometry in 60 seconds with advanced 3D lasers, guiding surgical precision down to microns.',
      tag: 'DIGITAL SCANNING'
    }
  ];

  const handleBookDoctor = (doctorId: string) => {
    onSelectDoctor(doctorId);
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20">
      {/* Immersive Hero Section */}
      <section id="hero-section" className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
        {/* Glowing background elements resembling Google AI Studio Light UI */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-emerald-100/30 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin-slow" />
                <span>Premium Dentistry Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.08] tracking-tight text-slate-900">
                Next-Gen Dental Care, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Focused on You</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Experience AuraDental. We combine the extreme rigor of medical micro-dentistry, custom-guided CAD/CAM engineering, and elegant, pain-free luxury service designed around your absolute trust.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
                <button
                  id="hero-cta-book"
                  onClick={() => setCurrentPage('book')}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/10 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  Book Clinical Scan
                </button>
                <button
                  id="hero-cta-treatments"
                  onClick={() => setCurrentPage('services')}
                  className="flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 bg-white font-semibold px-8 py-4 rounded-xl transition-all cursor-pointer group"
                >
                  Explore Treatments
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Trust Badge Indicators */}
              <div className="flex items-center gap-6 mt-4 border-t border-slate-200/60 pt-6">
                <div className="flex -space-x-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Patient avatar"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Patient avatar"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                    alt="Patient avatar"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Over 1,200 Verified 5-Star Medical Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Graphics/Photo Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-none">
                {/* Image Card Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white p-3 bg-white/60 backdrop-blur-sm">
                  <img
                    className="w-full h-[350px] sm:h-[450px] object-cover rounded-2xl"
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                    alt="AuraDental Modern Surgical Clinic"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 to-transparent rounded-2xl pointer-events-none" />
                  
                  {/* Floating Micro Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-100/80 shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 font-mono font-medium tracking-wide">CLINICAL PRECISION</div>
                      <div className="text-sm font-bold text-slate-800">Advanced 3D Smile Modeling</div>
                    </div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white font-mono text-xs font-bold animate-pulse">
                      HD
                    </span>
                  </div>
                </div>

                {/* Behind Glow Decoration */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-3xl blur-md opacity-35 -z-10 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats-counter" className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  id={`stat-box-${idx}`}
                  className="p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all flex flex-col items-center text-center gap-2 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Pillars (Swiss Luxury Core Elements) */}
      <section id="value-pillars" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 font-mono">Precision Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mt-2">
              An Architectural Approach to Smiles
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              We separate fine dental mastery from conventional high-volume clinical factories. We follow a careful biomimetic process ensuring longevity and natural movement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueAesthetics.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                <div className="text-xs font-mono font-bold text-emerald-600 mb-4 tracking-wider">
                  {pillar.tag}
                </div>
                <h3 className="text-xl font-bold font-display text-slate-800 leading-tight mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:underline cursor-pointer">
                    Clinical Standards Document
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-slate-50 rounded-tl-full -z-1 opacity-20 transition-transform group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinicians Team Grid */}
      <section id="clinicians-team" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 font-mono">Expert Clinicians</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mt-2">
              Meet Our Board-Certified Specialists
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              AuraDental brings together leading minds in reconstructive surgery, artistic porcelain veneering, and Microscope Endodontics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLINICIANS.map((doc: Doctor) => (
              <div
                key={doc.id}
                id={`doctor-card-${doc.id}`}
                className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden transition-all duration-350 shadow-sm flex flex-col"
              >
                {/* Profile Photo */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    src={doc.image}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase block font-medium">
                      {doc.role}
                    </span>
                    <h3 className="text-lg font-bold font-display mt-0.5">{doc.name}</h3>
                  </div>
                </div>

                {/* Profile Bio */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-mono text-blue-600 font-semibold mb-2">
                    {doc.specialty}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                    {doc.bio}
                  </p>
                  <div className="bg-white hover:bg-slate-100 p-3 rounded-xl border border-slate-200/50 mb-4">
                    <div className="text-[10px] font-mono font-bold text-slate-400">CREDENTIALS</div>
                    <div className="text-xs font-semibold text-slate-800 leading-tight mt-0.5">{doc.education}</div>
                  </div>
                  
                  <button
                    onClick={() => handleBookDoctor(doc.id)}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white hover:shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book with {doc.name.split(',')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Trust and Comfort Features Banner */}
      <section id="dynamic-comfort-features" className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">LUXURIOUS AMENITIES</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight leading-[1.12]">
                A Peaceful Experience Awaits Your Visit
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Dentistry should soothe. Designed with soundproofing, custom eye masks, heated massage dental chairs, and personal Netflix audio headsets, patients look forward to their scheduled visits.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <div className="text-sm font-semibold">Ambient Aromatherapy</div>
                    <span className="text-slate-400 text-xs">Eliminates stressful drug smells</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <div className="text-sm font-semibold">Custom VR/Netflix Visor</div>
                    <span className="text-slate-400 text-xs">Immersive luxury entertainment</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <div className="text-sm font-semibold">Soundless Tools</div>
                    <span className="text-slate-400 text-xs">Zero high-pitched drilling noises</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <div className="text-sm font-semibold">Gourmet Water Bar</div>
                    <span className="text-slate-400 text-xs">Ph-balanced mineral water selection</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center bg-slate-800 border border-slate-700 p-8 rounded-2xl gap-4">
              <div className="flex gap-1.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="italic text-slate-300 text-sm sm:text-base leading-relaxed">
                "I used to experience massive panic attacks before dental appointments. Dr. Vance and his team were so patient. Between the high-caliber tech, heated chairs, and Netflix goggles, I felt literally nothing. My ceramic veneers look absolute stellar."
              </p>
              <div>
                <div className="text-sm font-bold text-white">Chantal de Vrees</div>
                <div className="text-xs text-slate-400 font-mono">Tetracycline treatment patient</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
