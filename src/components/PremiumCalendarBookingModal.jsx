import React, { useState } from 'react';
import { 
  X, Calendar as CalendarIcon, Clock, CheckCircle2, 
  Sparkles, ShieldCheck, Lock, ArrowRight, ArrowLeft,
  Award, Ticket, Headset
} from 'lucide-react';

export default function PremiumCalendarBookingModal({ isOpen, onClose, defaultTest = 'TOEFL' }) {
  const [selectedTest, setSelectedTest] = useState(defaultTest);
  const [bookingStep, setBookingStep] = useState(1);
  
  // Assistance Slot Selection States
  const [selectedDayName, setSelectedDayName] = useState('Monday');
  const [selectedAssistanceDate, setSelectedAssistanceDate] = useState('Mon, Sep 14');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM - 12:00 PM');

  // Candidate Information
  const [candidateData, setCandidateData] = useState({
    fullName: '',
    phone: '',
    email: '',
    targetExamMonth: 'Within 30 Days'
  });

  if (!isOpen) return null;

  const testPriceInfo = {
    TOEFL: { name: 'TOEFL iBT®', testPrice: 14999, retailPrice: 17999.72, savings: 2801.72 },
    PTE: { name: 'PTE Academic', testPrice: 16499, retailPrice: 17000.00, savings: 302.00 },
    GRE: { name: 'GRE® General', testPrice: 20999, retailPrice: 22550.00, savings: 1352.00 },
    GMAT: { name: 'GMAT Focus', testPrice: 'Market Rate', retailPrice: 24500.00, savings: 3800.00 },
    Duolingo: { name: 'Duolingo Test', testPrice: 'Market Rate', retailPrice: 5400.00, savings: 1000.00 },
    LSAT: { name: 'LSAT Law', testPrice: 'Market Rate', retailPrice: 20000.00, savings: 3000.00 }
  };

  const currentInfo = testPriceInfo[selectedTest] || testPriceInfo.TOEFL;

  // Monday to Thursday Available Assistance Days
  const availableAssistanceDays = [
    { dayName: 'Monday', dateStr: 'Mon, Sep 14', status: 'Available', slots: 12 },
    { dayName: 'Tuesday', dateStr: 'Tue, Sep 15', status: 'Available', slots: 15 },
    { dayName: 'Wednesday', dateStr: 'Wed, Sep 16', status: 'Available', slots: 8 },
    { dayName: 'Thursday', dateStr: 'Thu, Sep 17', status: 'Fast Filling', slots: 4 },
    { dayName: 'Monday', dateStr: 'Mon, Sep 21', status: 'Available', slots: 16 },
    { dayName: 'Tuesday', dateStr: 'Tue, Sep 22', status: 'Available', slots: 14 },
    { dayName: 'Wednesday', dateStr: 'Wed, Sep 23', status: 'Available', slots: 10 },
    { dayName: 'Thursday', dateStr: 'Thu, Sep 24', status: 'Available', slots: 9 }
  ];

  // 9 AM to 9 PM Assistance Executive Slots
  const executiveTimeSlots = [
    { time: '09:00 AM - 10:00 AM', tag: 'Morning Slot' },
    { time: '10:00 AM - 11:00 AM', tag: 'Morning Slot' },
    { time: '11:00 AM - 12:00 PM', tag: 'Popular' },
    { time: '12:00 PM - 01:00 PM', tag: 'Afternoon Slot' },
    { time: '02:00 PM - 03:00 PM', tag: 'Afternoon Slot' },
    { time: '04:00 PM - 05:00 PM', tag: 'Evening Slot' },
    { time: '06:00 PM - 07:00 PM', tag: 'Evening Slot' },
    { time: '08:00 PM - 09:00 PM', tag: 'Late Evening' },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (bookingStep === 1) setBookingStep(2);
    else if (bookingStep === 2) setBookingStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A111E]/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#E5EAF2] shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#102A56] via-[#1769E0] to-[#102A56] text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#FFF4C2] border border-white/20">
                <Headset className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase bg-[#FFF4C2] text-[#102A56] px-2.5 py-0.5 rounded-full">
                  ₹199 REGISTRATION ASSISTANCE SERVICE
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  Book Your Assistance Slot (Mon – Thu, 9 AM – 9 PM)
                </h2>
              </div>
            </div>

            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3 text-xs font-bold">
            <div className={`flex items-center gap-2 ${bookingStep >= 1 ? 'text-[#FFF4C2]' : 'text-white/40'}`}>
              <span className="w-5 h-5 rounded-full bg-[#FFF4C2] text-[#102A56] flex items-center justify-center text-[10px]">1</span>
              <span>1. Assistance Slot (Mon-Thu)</span>
            </div>
            <div className={`flex items-center gap-2 ${bookingStep >= 2 ? 'text-[#FFF4C2]' : 'text-white/40'}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>2. Candidate Information</span>
            </div>
            <div className={`flex items-center gap-2 ${bookingStep >= 3 ? 'text-[#FFF4C2]' : 'text-white/40'}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>3. Assistance Booking Pass</span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-grow space-y-6">
          
          {/* STEP 1 */}
          {bookingStep === 1 && (
            <div className="space-y-6">
              
              {/* Test Selector */}
              <div className="bg-[#F7FAFF] p-4 rounded-2xl border border-[#E5EAF2]">
                <label className="block text-xs font-extrabold uppercase text-[#102A56] mb-2">
                  Which test do you need registration assistance with?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {['TOEFL', 'PTE', 'GRE', 'GMAT', 'Duolingo', 'LSAT'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTest(t)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                        selectedTest === t
                          ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-sm'
                          : 'bg-white text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                      }`}
                    >
                      {t} {t === 'TOEFL' ? '(₹14.9k)' : t === 'PTE' ? '(₹16.4k)' : t === 'GRE' ? '(₹20.9k)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* CALENDAR */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#102A56] flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#1769E0]" />
                    <span>Select Registration Assistance Day (Monday – Thursday)</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#18A957] bg-[#EAF8F0] px-2.5 py-0.5 rounded-full">
                    Official Hours: Mon to Thu (9 AM – 9 PM)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableAssistanceDays.map((item, idx) => {
                    const isSelected = selectedAssistanceDate === item.dateStr;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedAssistanceDate(item.dateStr);
                          setSelectedDayName(item.dayName);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-md scale-[1.02]'
                            : 'bg-[#F7FAFF] border-[#E5EAF2] hover:border-[#1769E0]/40 text-[#102A56]'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 text-white">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        <span className={`text-[10px] font-extrabold uppercase block ${isSelected ? 'text-[#FFF4C2]' : 'text-[#667085]'}`}>
                          {item.dayName}
                        </span>
                        <h4 className="text-sm font-black mt-0.5">{item.dateStr}</h4>
                        <span className={`text-[10px] font-bold block mt-1 ${isSelected ? 'text-white/80' : 'text-[#18A957]'}`}>
                          {item.slots} Specialists Open
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TIME SLOTS */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#102A56] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#1769E0]" />
                  <span>Choose Assistance Time Slot (9:00 AM to 9:00 PM)</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {executiveTimeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#EAF8F0] border-2 border-[#18A957] text-[#102A56] font-bold shadow-sm'
                            : 'bg-white border-[#E5EAF2] text-[#667085] hover:border-[#1769E0]/40'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase text-[#667085] block">{slot.tag}</span>
                        <span className="text-xs font-black text-[#102A56] block mt-0.5">{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="bg-gradient-to-r from-[#102A56] to-[#1769E0] text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-md">
                <div>
                  <span className="text-xs text-white/80 block">
                    Booked Slot: {selectedAssistanceDate} at {selectedTimeSlot}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-white">₹199</span>
                    <span className="text-xs text-[#FFF4C2] font-bold">Registration Assistance Service Fee</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#18A957] hover:bg-[#148c48] text-white text-sm font-extrabold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 transition-all shrink-0"
                >
                  <span>BOOK ASSISTANCE SLOT FOR ₹199</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2 */}
          {bookingStep === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              
              <div className="bg-[#F2F7FF] border border-[#1769E0]/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-[#102A56]">
                    Assistance Slot Reserved: {selectedAssistanceDate} ({selectedTimeSlot})
                  </h4>
                  <p className="text-xs text-[#667085]">
                    Service Fee: ₹199 • Helps you book {currentInfo.name} at available lower price
                  </p>
                </div>
                <button type="button" onClick={() => setBookingStep(1)} className="text-xs font-bold text-[#1769E0]">
                  Change Slot
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#102A56] uppercase tracking-wider">Candidate Profile Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A56] mb-1">Candidate Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="As per official ID / Passport"
                      value={candidateData.fullName}
                      onChange={(e) => setCandidateData({...candidateData, fullName: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102A56] mb-1">WhatsApp Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210"
                      value={candidateData.phone}
                      onChange={(e) => setCandidateData({...candidateData, phone: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102A56] mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="your.email@example.com"
                      value={candidateData.email}
                      onChange={(e) => setCandidateData({...candidateData, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102A56] mb-1">Target Exam Timeline *</label>
                    <select
                      value={candidateData.targetExamMonth}
                      onChange={(e) => setCandidateData({...candidateData, targetExamMonth: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56]"
                    >
                      <option value="Within 15 Days">Within 15 Days</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Next 2 Months">Next 2 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#EAF8F0] p-4 rounded-2xl border border-[#18A957]/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#18A957] shrink-0 mt-0.5" />
                <p className="text-xs text-[#102A56]">
                  <strong>What happens next?</strong> Our registration specialist will connect with you during your booked slot on <strong>{selectedAssistanceDate} ({selectedTimeSlot})</strong> to set up your account and lock your test booking at our lower available price.
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#E5EAF2]">
                <button type="button" onClick={() => setBookingStep(1)} className="text-xs font-bold text-[#667085]">
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#1769E0] hover:bg-[#102A56] text-white text-sm font-extrabold px-8 py-3.5 rounded-xl shadow-lg"
                >
                  CONFIRM ₹199 ASSISTANCE SLOT
                </button>
              </div>

            </form>
          )}

          {/* STEP 3 */}
          {bookingStep === 3 && (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-[#EAF8F0] text-[#18A957] flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-black uppercase bg-[#18A957] text-white px-3 py-1 rounded-full">
                  REGISTRATION ASSISTANCE SLOT BOOKED
                </span>
                <h3 className="text-2xl font-black text-[#102A56] mt-2">
                  Assistance Specialist Assigned!
                </h3>
                <p className="text-sm text-[#667085] max-w-md mx-auto mt-1">
                  Thank you, <strong className="text-[#102A56]">{candidateData.fullName || 'Candidate'}</strong>. Your registration specialist is booked for <strong className="text-[#1769E0]">{selectedAssistanceDate} ({selectedTimeSlot})</strong>.
                </p>
              </div>

              {/* TICKET SUMMARY */}
              <div className="max-w-md mx-auto bg-[#102A56] text-white rounded-3xl p-6 shadow-xl text-left space-y-3">
                <div className="flex justify-between items-center border-b border-white/15 pb-2">
                  <span className="text-[10px] font-extrabold uppercase text-[#FFF4C2]">TESTLY EXECUTIVE BOOKING PASS</span>
                  <Award className="w-5 h-5 text-[#FFF4C2]" />
                </div>
                <div className="text-xs space-y-1">
                  <p><span className="text-white/60">Service Booked:</span> Registration Assistance (₹199)</p>
                  <p><span className="text-white/60">Selected Test:</span> {currentInfo.name}</p>
                  <p><span className="text-white/60">Assistance Day:</span> {selectedAssistanceDate} (Mon–Thu)</p>
                  <p><span className="text-white/60">Assistance Slot:</span> {selectedTimeSlot}</p>
                </div>
              </div>

              <button onClick={onClose} className="bg-[#102A56] text-white font-bold px-8 py-3 rounded-xl">
                Done & Close
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
