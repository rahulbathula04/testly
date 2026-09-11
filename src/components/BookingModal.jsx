import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, defaultTest = 'TOEFL' }) {
  const [selectedTest, setSelectedTest] = useState(defaultTest);
  const [step, setStep] = useState('form'); // 'form' | 'submitted'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    country: 'India',
    preferredDate: '',
    preferredSlot: 'Morning',
    idType: 'Passport',
    idNumber: ''
  });

  if (!isOpen) return null;

  const testPrices = {
    TOEFL: { testFee: 13999, assistanceFee: 199, regularPrice: 18000 },
    GRE: { testFee: 19999, assistanceFee: 199, regularPrice: 22550 },
    Duolingo: { testFee: 4999, assistanceFee: 199, regularPrice: 5700 },
    PTE: { testFee: 14999, assistanceFee: 199, regularPrice: 18900 },
    IELTS: { testFee: 14999, assistanceFee: 199, regularPrice: 17000 },
    GMAT: { testFee: 21999, assistanceFee: 199, regularPrice: 24800 },
    LSAT: { testFee: 15999, assistanceFee: 199, regularPrice: 18000 }
  };

  const currentPricing = testPrices[selectedTest] || testPrices.TOEFL;
  const totalPayable = currentPricing.testFee + currentPricing.assistanceFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('submitted');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E5EAF2] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#102A56] text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-[#1769E0] text-white px-2.5 py-0.5 rounded-full uppercase">
                Official Booking Assistance
              </span>
            </div>
            <h3 className="text-2xl font-black mt-1">Book Your {selectedTest} Test</h3>
            <p className="text-xs text-white/80">Complete candidate details to receive booking support</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'submitted' ? (
          /* Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EAF8F0] text-[#18A957] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-[#102A56]">Booking Request Received!</h4>
              <p className="text-sm text-[#667085] max-w-md mx-auto">
                Thank you, <strong className="text-[#102A56]">{formData.fullName}</strong>. Our test registration specialist will contact you on <strong className="text-[#102A56]">{formData.phone}</strong> shortly to assist with your {selectedTest} booking.
              </p>
            </div>

            <div className="bg-[#F2F7FF] rounded-2xl p-4 border border-[#1769E0]/20 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#667085]">Test Requested:</span>
                <span className="font-bold text-[#102A56]">{selectedTest} Test</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Advertised Test Price:</span>
                <span className="font-bold text-[#102A56]">₹{currentPricing.testFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Registration Assistance:</span>
                <span className="font-bold text-[#102A56]">₹199</span>
              </div>
              <div className="border-t border-[#E5EAF2] pt-2 flex justify-between font-bold text-sm text-[#102A56]">
                <span>Total Estimate:</span>
                <span className="text-[#1769E0]">₹{totalPayable.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-[#102A56] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1769E0] transition-colors"
            >
              Close & Return to Page
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Test Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-xl bg-[#F2F7FF] p-1 border border-[#E5EAF2]">
              {[
                { id: 'TOEFL', label: 'TOEFL (₹14,198)' },
                { id: 'GRE', label: 'GRE (₹20,198)' },
                { id: 'Duolingo', label: 'Duolingo (₹5,198)' },
                { id: 'PTE', label: 'PTE (₹15,198)' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTest(t.id)}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all text-center ${
                    selectedTest === t.id 
                      ? 'bg-white text-[#102A56] shadow-sm' 
                      : 'text-[#667085] hover:text-[#102A56]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Price Breakdown Banner */}
            <div className="bg-[#EAF8F0] border border-[#18A957]/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#18A957] block">{selectedTest} Price Breakdown</span>
                <p className="text-xs text-[#102A56]">
                  Test Fee (₹{currentPricing.testFee.toLocaleString()}) + Assistance (₹199)
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#102A56]">₹{totalPayable.toLocaleString()}</span>
                <span className="text-[10px] text-[#18A957] font-bold block">Total Amount</span>
              </div>
            </div>

            {/* Candidate Inputs */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">Candidate Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Full Legal Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="As per Passport / Official ID"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0] focus:ring-1 focus:ring-[#1769E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Mobile Number (WhatsApp) *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0] focus:ring-1 focus:ring-[#1769E0]"
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
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0] focus:ring-1 focus:ring-[#1769E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Preferred Test Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0] focus:ring-1 focus:ring-[#1769E0]"
                  />
                </div>
              </div>
            </div>

            {/* Reassurance text */}
            <div className="flex items-start gap-2 text-xs text-[#667085] bg-[#F7FAFF] p-3 rounded-xl border border-[#E5EAF2]">
              <Lock className="w-4 h-4 text-[#18A957] shrink-0 mt-0.5" />
              <span>You retain complete ownership of your test account credentials. We only assist with the registration process with your authorization.</span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-base py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>CONTINUE TO BOOKING ASSISTANCE</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
