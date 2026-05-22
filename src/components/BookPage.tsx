import { useState, useEffect, FormEvent } from 'react';
import { Page, Service, Doctor, Appointment } from '../types';
import { SERVICES, CLINICIANS, TIME_SLOTS } from '../data';
import { 
  Calendar, Award, Sparkles, CheckCircle2, User, Phone, 
  Mail, CalendarDays, Clock, MessageSquarePlus, RefreshCw, ChevronRight, ChevronLeft, Building 
} from 'lucide-react';

interface BookPageProps {
  preselectedServiceId?: string;
  preselectedDoctorId?: string;
  clearSelection: () => void;
}

export default function BookPage({ preselectedServiceId, preselectedDoctorId, clearSelection }: BookPageProps) {
  // Booking progress state (1: Select Treatment & Doctor, 2: Select Date & Time, 3: Intake Details, 4: Finished Confirmation)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || SERVICES[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctorId || CLINICIANS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');

  // Generated booking receipt details
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Auto-fill parameters if they arrived pre-filled
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
    }
  }, [preselectedDoctorId]);

  // Generate dynamic dates (Next 5 working days starting from current day)
  const getNextWorkingDays = () => {
    const days = [];
    let current = new Date(); // Using real-life current environment date
    let count = 0;
    
    while (count < 5) {
      // Skip Sundays (0)
      if (current.getDay() !== 0) {
        const dayString = current.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const isoString = current.toISOString().split('T')[0];
        
        days.push({
          dayName: dayString,
          dateLabel: monthDay,
          iso: isoString,
          isToday: current.toDateString() === new Date().toDateString()
        });
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const daysList = getNextWorkingDays();

  // Set default date to first day
  useEffect(() => {
    if (!selectedDate && daysList.length > 0) {
      setSelectedDate(daysList[0].iso);
    }
  }, []);

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);
  const selectedDoctor = CLINICIANS.find(d => d.id === selectedDoctorId);

  // Handle flow navigations
  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedSlot) {
        alert('Please choose an available clinical time-slot to proceed.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Validate patient details
      if (!patientName || !patientEmail || !patientPhone) {
        alert('Please complete the patient intake fields to finalize appointment.');
        return;
      }
      triggerSimulationSubmit();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const triggerSimulationSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate real clinical API latency
    setTimeout(() => {
      const code = `AURA-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(code);
      setIsSubmitting(false);
      setCurrentStep(4);
      clearSelection(); // Flush root level parameters
    }, 1500);
  };

  const handleResetForm = () => {
    setCurrentStep(1);
    setSelectedServiceId(SERVICES[0].id);
    setSelectedDoctorId(CLINICIANS[0].id);
    setSelectedDate(daysList[0].iso);
    setSelectedSlot('');
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setPatientNotes('');
    setConfirmationCode('');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Stepper Bar (Only show if not finished) */}
        {currentStep < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between text-center relative max-w-xl mx-auto mb-4">
              {/* Line background */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-1" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-blue-600 -z-1 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />

              {[1, 2, 3].map((step) => {
                const isCompleted = currentStep > step;
                const isActive = currentStep === step;
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm transition-all ${
                      isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100' : 'bg-white text-slate-400 border border-slate-200'
                    }`}>
                      {isCompleted ? '✓' : step}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-2 bg-slate-50 px-2 py-0.5 rounded-md">
                      {step === 1 ? 'Treatments' : step === 2 ? 'Date & Time' : 'Patient Info'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Booking Sheets container */}
        <div id="booking-sheet-card" className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
          
          {/* STEP 1: Treatment & Clinician selection */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep}>
              <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-900/5">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-0.5">STEP 01</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight">
                  Select Clinical Protocol & Dentist
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Schedule an on-site smile 3D diagnostic assessment with AuraDental leads.
                </p>
              </div>

              <div className="p-6 sm:p-10 flex flex-col gap-8">
                {/* Protocol Select */}
                <div>
                  <label htmlFor="service-select" className="text-xs font-mono font-extrabold text-slate-400 block mb-3 uppercase tracking-wider">
                    Select Dental treatment
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SERVICES.map((serv) => (
                      <div
                        key={serv.id}
                        id={`select-service-${serv.id}`}
                        onClick={() => setSelectedServiceId(serv.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-start ${
                          selectedServiceId === serv.id
                            ? 'bg-blue-50/50 border-blue-600 shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-extrabold text-slate-800 block line-clamp-1">{serv.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono block mt-1 uppercase tracking-wide">
                            {serv.category} / {serv.priceRange}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ml-2 ${
                          selectedServiceId === serv.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedServiceId === serv.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinician Select */}
                <div>
                  <label htmlFor="doctor-select" className="text-xs font-mono font-extrabold text-slate-400 block mb-3 uppercase tracking-wider">
                    Select Preferred Practitioner
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {CLINICIANS.map((doc) => (
                      <div
                        key={doc.id}
                        id={`select-doctor-${doc.id}`}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-3 h-full justify-between ${
                          selectedDoctorId === doc.id
                            ? 'bg-blue-50/50 border-blue-600 shadow-xs'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                            src={doc.image}
                            alt={doc.name}
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="text-xs font-extrabold text-slate-800 block leading-tight">{doc.name.split(',')[0]}</span>
                            <span className="text-[9px] font-mono text-slate-400 tracking-tight">{doc.role.split(' ')[0]} Specialist</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono border-t border-slate-100 pt-2 text-slate-500">
                          <span>Specialty Active</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${selectedDoctorId === doc.id ? 'bg-blue-600' : 'bg-slate-300'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 bg-slate-50/80 border-t border-slate-120 flex justify-end">
                <button
                  type="submit"
                  id="book-step-1-btn"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/10 transition-transform hover:-translate-y-0.5"
                >
                  Confirm Protocol & Proceed
                  <ChevronRight className="w-4 h-4 text-white/95" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Date & Available Times Selection */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep}>
              <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-900/5">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-0.5">STEP 02</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight">
                  Select Date & Timeslot
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Choose your appointment day. Times are synced live with Clinic Management systems.
                </p>
              </div>

              <div className="p-6 sm:p-10 flex flex-col gap-8">
                {/* 5-Day Calendar Grid */}
                <div>
                  <label className="text-xs font-mono font-extrabold text-slate-400 block mb-3 uppercase tracking-wider">
                    Select Day
                  </label>
                  <div className="grid grid-cols-5 gap-2.5">
                    {daysList.map((day) => (
                      <button
                        key={day.iso}
                        type="button"
                        onClick={() => {
                          setSelectedDate(day.iso);
                          setSelectedSlot(''); // Reset slot on group adjustment
                        }}
                        className={`py-3.5 px-2 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 ${
                          selectedDate === day.iso
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-mono tracking-wider font-bold ${
                          selectedDate === day.iso ? 'text-blue-100' : 'text-slate-400'
                        }`}>
                          {day.dayName}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold leading-none">
                          {day.dateLabel.split(' ')[1]}
                        </span>
                        <span className={`text-[8px] font-mono leading-none border px-1 rounded-sm ${
                          selectedDate === day.iso ? 'border-blue-500 text-blue-100 bg-blue-700' : 'border-slate-100 text-slate-400 bg-slate-50'
                        }`}>
                          {day.dateLabel.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeslots selection block */}
                <div>
                  <label className="text-xs font-mono font-extrabold text-slate-400 block mb-2 uppercase tracking-wider">
                    Select Available Consultation slot
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono block mb-3">All times adjusted in local clinic time zone</span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const isActive = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`p-3.5 rounded-xl border-2 font-mono text-xs font-bold transition-all text-center ${
                            !slot.available
                              ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed line-through'
                              : isActive
                              ? 'bg-blue-50/60 border-blue-600 text-blue-700 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 opacity-60" />
                            {slot.time}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selection Summary Ribbon */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 text-xs sm:text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-slate-800">Selected Treatment:</span> {selectedService?.title}
                    <span className="block text-slate-500 text-xs mt-0.5">Dentist: {selectedDoctor?.name} (Confirmed)</span>
                  </div>
                  {selectedSlot && (
                    <div className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs font-mono text-center shrink-0">
                      {selectedSlot} on {daysList.find(d => d.iso === selectedDate)?.dateLabel}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 bg-slate-50/80 border-t border-slate-120 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Clinician list
                </button>
                <button
                  type="submit"
                  id="book-step-2-btn"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/10 transition-transform hover:-translate-y-0.5"
                >
                  Select Time & Proceed
                  <ChevronRight className="w-4 h-4 text-white/95" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Patient Intake Details */}
          {currentStep === 3 && (
            <form onSubmit={handleNextStep}>
              <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-900/5">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-0.5">STEP 03</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight">
                  Medical Intake & Demographics
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  We secure and cryptographically protect all records under dental privacy rules.
                </p>
              </div>

              <div className="p-6 sm:p-10 flex flex-col gap-6">
                
                {/* 2-Column Grid Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="patient-name-input" className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Patient Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="patient-name-input"
                        type="text"
                        required
                        placeholder="e.g. Alexis Harrington"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="patient-phone-input" className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Cellular Number (Required for SMS Updates)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="patient-phone-input"
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 555-0199"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200/90 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="patient-email-input" className="text-xs font-mono font-bold text-slate-400 uppercase">
                    E-mail Address (Intake Records Delivery)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="patient-email-input"
                      type="email"
                      required
                      placeholder="e.g. alexis@harrington.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Supplementary Notes */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="patient-notes-input" className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Special requests or clinical history (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquarePlus className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <textarea
                      id="patient-notes-input"
                      rows={3}
                      placeholder="Specify if you have standard dental anxieties, current extreme temperature sensitivities, or require special accessibility supports..."
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/90 rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Bar with simulated submission latency spinner */}
              <div className="p-6 bg-slate-50/80 border-t border-slate-120 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Calendar adjustment
                </button>
                <button
                  type="submit"
                  id="book-final-submit"
                  disabled={isSubmitting}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10 transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-white animate-spin" />
                      Securing Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      Finalize Clinic Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Successful Confirmation Screen */}
          {currentStep === 4 && (
            <div className="p-6 sm:p-12 text-center flex flex-col items-center gap-6">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 text-emerald-500 flex items-center justify-center shadow-sm animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase block">CLINICAL REGISTRATION SECURED</span>
                <h1 className="text-3xl font-extrabold font-display tracking-tight text-slate-950 mt-1">
                  We look forward to meeting you!
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  A verification SMS text message and detailed digital intake forms have been delivered securely to your records.
                </p>
              </div>

              {/* Booking Info Receipt Card */}
              <div className="w-full max-w-md bg-slate-50 border border-slate-200/50 rounded-2xl p-6 text-left flex flex-col gap-4">
                
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-3 font-mono">
                  <span className="text-[10px] font-bold text-slate-400">REGISTRATION CODE</span>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {confirmationCode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-slate-400 font-medium">PATIENT</span>
                    <span className="font-extrabold text-slate-800">{patientName}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium font-sans">CLINICIAN</span>
                    <span className="font-extrabold text-slate-800">{selectedDoctor?.name.split(',')[0]}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium">TREATMENT SCHEDULED</span>
                    <span className="font-extrabold text-slate-800 block line-clamp-1">{selectedService?.title}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium">SESSION SLOT</span>
                    <span className="font-extrabold text-slate-800 font-mono">
                      {selectedSlot} ({daysList.find(d => d.iso === selectedDate)?.dateLabel})
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 text-[11px] text-slate-500 border border-slate-100 flex gap-2">
                  <Building className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-700">AuraDental Luxury Clinic:</span>
                    140 Madison Avenue, Penthouse B, Manhattan, NY 10016
                  </div>
                </div>
              </div>

              {/* Complete Restart CTA */}
              <button
                type="button"
                id="reset-booking-form"
                onClick={handleResetForm}
                className="mt-2 bg-slate-900 hover:bg-slate-850 text-white font-bold h-12 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
              >
                Schedule Another Procedure
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
