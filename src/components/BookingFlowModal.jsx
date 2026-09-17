import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Star, Calendar, Clock, User, Check, MapPin, ShieldCheck, CreditCard } from 'lucide-react';

export default function BookingFlowModal({ isOpen, onClose, defaultTest = 'TOEFL', onOpenDashboard }) {
  const [step, setStep] = useState(1);
  const [selectedTest, setSelectedTest] = useState(defaultTest);
  const [selectedPlan, setSelectedPlan] = useState('199'); // '199' or '499'
  const [selectedCity, setSelectedCity] = useState('Hyderabad (Begumpet / Madhapur)');
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('11:30 AM');
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [stepError, setStepError] = useState('');

  if (!isOpen) return null;

  const testList = [
    { id: 'GRE', title: 'GRE® General', sub: 'GRE General Test', category: 'Graduate MS/PhD (US/Global)' },
    { id: 'TOEFL', title: 'TOEFL iBT®', sub: 'TOEFL iBT Test', category: 'English Proficiency (US/UK)' },
    { id: 'IELTS', title: 'IELTS Academic', sub: 'IELTS Academic', category: 'English Proficiency (Global)' },
    { id: 'PTE', title: 'PTE Academic', sub: 'PTE Academic', category: 'English Proficiency (UK/Aus)' },
    { id: 'Duolingo', title: 'Duolingo DET', sub: 'Duolingo English', category: 'English Proficiency (Online)' },
    { id: 'GMAT', title: 'GMAT Focus', sub: 'GMAT Focus Edition', category: 'Business School (MBA)' },
    { id: 'LSAT', title: 'LSAT Law', sub: 'LSAT Law Test', category: 'Law School (JD/LLM)' }
  ];

  const cityList = [
    'Hyderabad (Begumpet / Madhapur)',
    'Bengaluru (Indiranagar / Koramangala)',
    'Chennai (Nungambakkam)',
    'Mumbai (Andheri / Bandra)',
    'Delhi NCR (Connaught Place / Gurgaon)',
    'Pune (Viman Nagar)',
    'Vijayawada / Vizag',
    'Other Indian City / Online Proctored'
  ];

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  const handleFinish = () => {
    try {
      const order = {
        id: `TST-${selectedTest}-${Math.floor(10000 + Math.random() * 90000)}`,
        test: selectedTest,
        plan: selectedPlan,
        city: selectedCity,
        candidateName: `${name || 'Candidate'} ${surname}`.trim(),
        phone,
        email,
        paymentMethod,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'CONFIRMED'
      };
      const existing = JSON.parse(localStorage.getItem('testly_user_orders') || '[]');
      existing.unshift(order);
      localStorage.setItem('testly_user_orders', JSON.stringify(existing));
    } catch (e) {}

    if (onOpenDashboard) onOpenDashboard();
    handleReset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Modal Header */}
        <div className="bg-white px-6 py-4 border-b border-[#E5EAF2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-[#102A56]">Testly India</span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-[#667085]">Assisted Registration (₹199)</span>
          </div>

          <button 
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-[#F2F7FF] text-[#667085] hover:text-[#102A56] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="bg-[#F7FAFF] px-6 py-3 border-b border-[#E5EAF2] flex items-center justify-between text-xs font-extrabold text-[#667085] overflow-x-auto whitespace-nowrap gap-2">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#1769E0]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${step >= 1 ? 'bg-[#1769E0] text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span>Test & City</span>
          </div>
          <span>➔</span>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#1769E0]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${step >= 2 ? 'bg-[#1769E0] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>Plan</span>
          </div>
          <span>➔</span>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#1769E0]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${step >= 3 ? 'bg-[#1769E0] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>Date</span>
          </div>
          <span>➔</span>
          <div className={`flex items-center gap-2 ${step >= 4 ? 'text-[#1769E0]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${step >= 4 ? 'bg-[#1769E0] text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
            <span>Passport Audit</span>
          </div>
          <span>➔</span>
          <div className={`flex items-center gap-2 ${step >= 5 ? 'text-[#1769E0]' : ''}`}>
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${step >= 5 ? 'bg-[#1769E0] text-white' : 'bg-slate-200 text-slate-600'}`}>5</span>
            <span>Confirm UPI</span>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
          
          {/* STEP 1: CHOOSE TEST & CITY */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-[#102A56]">Select Your Exam & Target Location</h3>
                <p className="text-xs sm:text-sm text-[#667085] font-medium mt-1">
                  Choose your test and preferred Indian testing city for assisted registration.
                </p>
              </div>

              {/* Test List */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#102A56] uppercase tracking-wider block">Target Global Test</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {testList.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTest(t.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all relative ${
                        selectedTest === t.id 
                          ? 'bg-[#F2F7FF] border-2 border-[#1769E0] shadow-md' 
                          : 'bg-white border-[#E5EAF2] hover:border-[#1769E0]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-black text-[#102A56]">{t.title}</span>
                        {selectedTest === t.id && <Check className="w-4 h-4 text-[#1769E0]" />}
                      </div>
                      <p className="text-[10px] text-[#667085] font-semibold">{t.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* City Dropdown */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#102A56] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1769E0]" />
                  <span>Target Exam Center Location</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#E5EAF2] text-xs font-bold text-[#102A56] outline-none bg-slate-50"
                >
                  {cityList.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SERVICE PLAN */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-[#102A56]">Select Service Option</h3>
                <p className="text-xs sm:text-sm text-[#667085] font-medium mt-1">
                  Choose your registration service level for {selectedTest}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Card 1: Standard Assisted Registration ₹199 */}
                <div
                  onClick={() => setSelectedPlan('199')}
                  className={`p-6 rounded-3xl border-2 text-left cursor-pointer transition-all relative flex flex-col justify-between space-y-4 ${
                    selectedPlan === '199'
                      ? 'bg-[#F2F7FF] border-[#1769E0] shadow-lg'
                      : 'bg-white border-[#E5EAF2] hover:border-[#1769E0]/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-[#102A56]">Testly Assisted Service</h4>
                      {selectedPlan === '199' && <Check className="w-5 h-5 text-[#1769E0]" />}
                    </div>

                    <div className="text-3xl font-black text-[#102A56]">₹199</div>

                    <ul className="space-y-2 text-xs font-bold text-[#102A56]">
                      <li className="flex items-center gap-2 text-[#18A957] font-black"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> Unlimited Mock Tests & Practice Engine</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> Indian Passport Name Audit</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> Slot & Center Guidance ({selectedCity.split(' ')[0]})</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> Account Creation Assistance</li>
                    </ul>
                  </div>
                </div>

                {/* Card 2: Pro Preparation + Assisted Registration ₹499 */}
                <div
                  onClick={() => setSelectedPlan('499')}
                  className={`p-6 rounded-3xl border-2 text-left cursor-pointer transition-all relative flex flex-col justify-between space-y-4 ${
                    selectedPlan === '499'
                      ? 'bg-[#F2F7FF] border-[#1769E0] shadow-lg'
                      : 'bg-white border-[#E5EAF2] hover:border-[#1769E0]/40'
                  }`}
                >
                  <span className="absolute -top-3 right-6 bg-[#1769E0] text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Recommended
                  </span>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#667085]">Full Prep Bundle</p>
                        <h4 className="text-base font-black text-[#102A56]">Pro Practice + Registration</h4>
                      </div>
                      {selectedPlan === '499' && <Check className="w-5 h-5 text-[#1769E0]" />}
                    </div>

                    <div className="text-3xl font-black text-[#102A56]">₹499</div>

                    <ul className="space-y-2 text-xs font-bold text-[#102A56]">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> Everything in ₹199 Service</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> 5 Full-Length Adaptive Mocks</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#18A957]" /> Priority WhatsApp Slot Alerts</li>
                    </ul>
                  </div>
                </div>

              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-[#667085] hover:text-[#102A56] flex items-center gap-1"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-[#102A56]">Select Guidance Session Slot</h3>
                <p className="text-xs sm:text-sm text-[#667085] font-medium mt-1">
                  Choose a convenient time slot for your 1-on-1 registration assistance session.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Time Slot Selection */}
                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs font-bold text-[#102A56] uppercase">Available Support Slots (IST Time)</span>
                  <div className="grid grid-cols-3 gap-3">
                    {['10:00 AM IST', '11:30 AM IST', '02:00 PM IST', '04:30 PM IST', '06:00 PM IST', '08:00 PM IST'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl text-xs font-black border transition-all ${
                          selectedTime === time 
                            ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-sm'
                            : 'bg-white text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assigned Specialist Card */}
                <div className="lg:col-span-4 bg-[#F7FAFF] p-5 rounded-2xl border border-[#E5EAF2] space-y-3 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                    alt="Priya Sharma" 
                    className="w-14 h-14 rounded-full object-cover mx-auto border-2 border-[#1769E0]"
                  />
                  <div>
                    <h4 className="text-sm font-black text-[#102A56]">Priya Sharma</h4>
                    <p className="text-[10px] font-bold text-[#667085]">Hyderabad Registration Lead</p>
                  </div>
                  <div className="bg-[#EAF8F0] p-2 rounded-xl text-[10px] font-bold text-[#18A957]">
                    Slot Reserved: {selectedTime}
                  </div>
                </div>

              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-[#667085] hover:text-[#102A56]"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: INDIAN PASSPORT DETAILS AUDIT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-[#102A56]">Indian Passport & Contact Audit</h3>
                <p className="text-xs sm:text-sm text-[#667085] font-medium mt-1">
                  Ensure name matches your Indian Passport exactly to prevent test day rejection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Given Name (As per Indian Passport)</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Reddy"
                    className="w-full p-3 rounded-xl border border-[#E5EAF2] text-xs font-bold text-[#102A56] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Surname / Last Name</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="e.g. Kancharla"
                    className="w-full p-3 rounded-xl border border-[#E5EAF2] text-xs font-bold text-[#102A56] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">WhatsApp Phone Number (+91)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 rounded-xl border border-[#E5EAF2] text-xs font-bold text-[#102A56] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full p-3 rounded-xl border border-[#E5EAF2] text-xs font-bold text-[#102A56] outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] font-bold text-amber-800 flex items-center gap-2 max-w-2xl mx-auto">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Our specialist will cross-check your Given Name & Surname with ETS/IDP official guidelines.</span>
              </div>

              {stepError && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs font-bold text-red-700 max-w-2xl mx-auto">
                  {stepError}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setStepError('');
                    setStep(3);
                  }}
                  className="text-xs font-bold text-[#667085] hover:text-[#102A56]"
                >
                  ← Back
                </button>

                <button
                  onClick={() => {
                    if (!name.trim()) {
                      setStepError('Please enter your Given Name as per your Indian Passport.');
                      return;
                    }
                    const cleanPhone = phone.replace(/\D/g, '');
                    if (cleanPhone.length < 10) {
                      setStepError('Please enter a valid 10-digit WhatsApp phone number.');
                      return;
                    }
                    if (email && (!email.includes('@') || !email.includes('.'))) {
                      setStepError('Please enter a valid email address.');
                      return;
                    }
                    setStepError('');
                    setStep(5);
                  }}
                  className="bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRM & INSTANT UPI PAYMENT */}
          {step === 5 && (
            <div className="space-y-6 text-center py-2 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#18A957]/10 text-[#18A957] flex items-center justify-center mx-auto">
                <CreditCard className="w-7 h-7 text-[#18A957]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#102A56]">Confirm & Complete Registration</h3>
                <p className="text-xs text-[#667085] font-semibold mt-1">
                  Assisted Registration Fee: <strong className="text-[#102A56] text-sm">₹{selectedPlan}</strong>
                </p>
              </div>

              {/* UPI Payment Options */}
              <div className="bg-[#F7FAFF] p-5 rounded-2xl border border-[#E5EAF2] space-y-4 text-left">
                <span className="text-xs font-black text-[#102A56] uppercase tracking-wider block">Select Payment Method</span>
                
                <div className="grid grid-cols-3 gap-3">
                  {['UPI (PhonePe/GPay)', 'Debit/Credit Card', 'NetBanking'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`p-3 rounded-xl text-xs font-black border transition-all text-center ${
                        paymentMethod === m 
                          ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-sm'
                          : 'bg-white text-[#102A56] border-[#E5EAF2]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold text-[#102A56] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Candidate Name:</span>
                    <span>{name ? `${name} ${surname}`.trim() : 'Candidate'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Target Exam & Location:</span>
                    <span>{selectedTest} • {selectedCity.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-[#18A957] hover:bg-[#128342] text-white font-extrabold text-base py-4 rounded-2xl shadow-lg transition-all"
              >
                Pay ₹{selectedPlan} via {paymentMethod} & Launch Guidance →
              </button>

              <p className="text-[11px] text-[#667085] font-semibold">
                🔒 100% Encrypted Payment • Instant Confirmation on WhatsApp
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
