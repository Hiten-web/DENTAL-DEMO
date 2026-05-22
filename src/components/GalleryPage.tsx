import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { GalleryCase, Page } from '../types';
import { GALLERY_CASES } from '../data';
import { ArrowLeftRight, Check, History, Sparkles, Calendar, ChevronRight } from 'lucide-react';

interface GalleryPageProps {
  setCurrentPage: (page: Page) => void;
  onSelectService: (serviceId: string) => void;
}

export default function GalleryPage({ setCurrentPage, onSelectService }: GalleryPageProps) {
  const [activeCase, setActiveCase] = useState<GalleryCase>(GALLERY_CASES[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Handle Drag calculations
  const handleMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Add global event listeners to stop dragging when cursor leaves viewport
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleCaseSelect = (item: GalleryCase) => {
    setActiveCase(item);
    setSliderPosition(50); // Reset position for fresh slider effect
  };

  const handleBookCase = () => {
    // Navigate straight to book
    if (activeCase.id === 'harmony-makeover') {
      onSelectService('veneers');
    } else if (activeCase.id === 'orthodontic-fix') {
      onSelectService('aligners');
    } else {
      onSelectService('implants');
    }
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 font-mono">CLINICAL VALIDATION</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight mt-1">
            Smile Reconstruction Gallery
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Drag the central divider handle left or right to reveal the authentic "Before" state of actual clinical procedures and the final "After" smile reconstruction result.
          </p>
        </div>

        {/* Master Case Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-6">
          
          {/* Left Column: Case Selector & Specs Summary (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-400 border-b border-slate-100 pb-2">
              ACTIVE CASE STUDIES
            </div>

            {/* Clickable Cases Cards Stack */}
            <div className="flex flex-col gap-4">
              {GALLERY_CASES.map((item) => {
                const isActive = activeCase.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleCaseSelect(item)}
                    id={`case-selector-${item.id}`}
                    className={`text-left p-5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                        : 'bg-slate-50 border-slate-200/50 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold font-mono text-blue-600 block mb-1">
                        {item.treatment}
                      </span>
                      <h3 className="text-base font-bold text-slate-800 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Case Protocol Analysis Display */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">CASE FILE BRIEF</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono leading-none ${
                  activeCase.difficulty === 'Advanced' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                }`}>
                  {activeCase.difficulty} Complexity
                </span>
              </div>
              
              <h3 className="text-lg font-bold font-display text-slate-800 leading-snug">
                {activeCase.title} Full Study
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {activeCase.description}
              </p>

              {/* Mini specs list */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-4 mt-2">
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">TREATMENT TIME</div>
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                    <History className="w-3.5 h-3.5 text-slate-400" />
                    {activeCase.timeframe}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">HEALTH CLUSTERS</div>
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-400 animate-spin-slow" />
                    Completed Outcome
                  </div>
                </div>
              </div>

              <button
                id="case-cta-query"
                onClick={handleBookCase}
                className="mt-4 w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 ml-0.5 text-emerald-400" />
                Book Similar Smile Protocol
              </button>
            </div>
          </div>

          {/* Right Column: Interaction Before/After Slider View (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Split Screen Slider Device Frame */}
            <div
              id="slider-outer-frame"
              className="relative select-none bg-slate-100 rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 aspect-[4/3] w-full"
              ref={sliderContainerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              
              {/* After State layer (Background: Always base, right aligned) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  className="w-full h-full object-cover"
                  src={activeCase.afterImage}
                  alt={`${activeCase.treatment} After Result`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Labels */}
                <span className="absolute bottom-5 right-5 bg-emerald-500/90 backdrop-blur-xs text-white text-xs font-bold font-mono px-3 py-1.5 rounded-md shadow-md">
                  AFTER
                </span>
              </div>

              {/* Before State layer (Clipped absolute container from the left) */}
              <div
                className="absolute top-0 bottom-0 left-0 h-full overflow-hidden pointer-events-none border-r border-transparent"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* We maintain full width for the inner image so it doesnt squish during clip */}
                <div className="absolute top-0 bottom-0 left-0 h-full w-[400px] sm:w-[500px] md:w-[700px] lg:w-[650px] xl:w-[700px]">
                  <img
                    className="h-full w-full object-cover"
                    src={activeCase.beforeImage}
                    alt={`${activeCase.treatment} Before Initial`}
                    style={{ 
                      width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : '100vw',
                      maxWidth: 'none'
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Left labels */}
                <span className="absolute bottom-5 left-5 bg-slate-900/90 backdrop-blur-xs text-white text-xs font-bold font-mono px-3 py-1.5 rounded-md shadow-md">
                  BEFORE
                </span>
              </div>

              {/* Split handle separator divider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Drag handle button (clickable and initiates dragging state on mousedown/touchstart) */}
                <div
                  id="slider-drag-grabber"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onTouchStart={(e) => {
                    setIsDragging(true);
                  }}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 pointer-events-auto flex items-center justify-center transition-all hover:scale-108 active:scale-95 cursor-ew-resize border-2 border-white"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover/Tap Instruction Indicator Overlay */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none bg-white/75 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-[10px] font-mono text-slate-700 font-bold tracking-wider flex items-center gap-1.5 border border-slate-100/50">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                DRAG DIVIDER INDEX LEFT/RIGHT
              </div>
            </div>

            {/* Quick Diagnostic notes */}
            <div className="mt-4 bg-slate-50 rounded-xl p-4 flex gap-3 text-xs text-slate-500 border border-slate-100">
              <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">i</span>
              <p className="leading-normal">
                Clinical photomacrography with standard softbox illumination. All dental procedures completed in-office by AuraDental team. No computerized shape modification software applied to the final result images.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
