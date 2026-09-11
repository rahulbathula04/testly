import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export default function PriceCheckModal({ isOpen, onClose, initialTest = 'GMAT' }) {
  const [selectedTest, setSelectedTest] = useState(initialTest);
  const [timeframe, setTimeframe] = useState('Within 30 Days');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tests = ['TOEFL', 'GRE', 'GMAT', 'Duolingo', 'LSAT'];
  const timeframes = ['Within 15 Days', 'Within 30 Days', 'Next 2-3 Months', 'Just Exploring'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102A56]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E5EAF2] shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#102A56] text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF4C2] text-[#102A56] px-2.5 py-0.5 rounded-full text-[11px] font-extrabold">
              <Tag className="w-3 h-3" />
              <span>Available Booking Options</span>
            </div>
            <h3 className="text-2xl font-black mt-1">Check Your Test Price</h3>
            <p className="text-xs text-white/80">Get current price options & ₹199 assistance availability</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#EAF8F0] text-[#18A957] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-[#102A56]">Price Details Sent!</h4>
            <p className="text-sm text-[#667085]">
              We have dispatched today's available booking pricing for <strong className="text-[#102A56]">{selectedTest}</strong> to <strong className="text-[#102A56]">{formData.mobile}</strong>.
            </p>
            <button
              onClick={onClose}
              className="bg-[#1769E0] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#102A56] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Which test are you taking? */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
                Which test are you taking?
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {tests.map((test) => (
                  <button
                    key={test}
                    type="button"
                    onClick={() => setSelectedTest(test)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedTest === test
                        ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-sm'
                        : 'bg-[#F7FAFF] text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                    }`}
                  >
                    {test}
                  </button>
                ))}
              </div>
            </div>

            {/* When do you want to take it? */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#102A56] mb-2">
                When do you want to take it?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                      timeframe === tf
                        ? 'bg-[#F2F7FF] text-[#1769E0] border-[#1769E0] font-bold'
                        : 'bg-white text-[#667085] border-[#E5EAF2] hover:border-[#1769E0]/30'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-[#E5EAF2]">
              <div>
                <label className="block text-xs font-bold text-[#102A56] mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="WhatsApp mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A56] mb-1">Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EAF2] text-sm text-[#102A56] focus:outline-none focus:border-[#1769E0]"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-base py-3.5 rounded-xl shadow-md transition-colors"
            >
              CHECK MY PRICE
            </button>

            {/* Reassurance */}
            <p className="text-[11px] text-[#667085] text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#18A957]" />
              We'll use your details only to help with your test enquiry and registration.
            </p>

          </form>
        )}

      </div>
    </div>
  );
}
