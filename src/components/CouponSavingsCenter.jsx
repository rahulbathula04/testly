import React, { useState } from 'react';
import { Tag, Check, Copy, Sparkles, ShieldCheck, Zap, ArrowRight, Percent } from 'lucide-react';

export default function CouponSavingsCenter({ onBookTest, onOpenFreeMock }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState('SAVE100');
  const [customInput, setCustomInput] = useState('');
  const [couponMessage, setCouponMessage] = useState({ text: 'Coupon SAVE100 active! ₹100 discount applied.', type: 'success' });

  const coupons = [
    {
      code: 'SAVE100',
      title: '₹100 OFF Registration Assistance',
      discount: 'Pay ₹99 instead of ₹199',
      description: 'Instant ₹100 discount on 1-on-1 registration assistance and passport name audit.',
      tag: 'MOST POPULAR IN INDIA',
      type: 'DISCOUNT'
    },
    {
      code: 'TESTLYFREE',
      codeAlt: '100% FREE MOCKS',
      title: '100% Free Unlimited Practice Engine',
      discount: '₹0 (Saved ₹25,000)',
      description: 'Unlock unlimited adaptive mock tests for GRE, TOEFL, IELTS & GMAT with zero paywalls.',
      tag: '100% FREE FOREVER',
      type: 'FREE_PRACTICE'
    },
    {
      code: 'HYD50',
      title: 'Hyderabad Student Special Coupon',
      discount: 'Pay ₹99 + Free Slot Alert',
      description: 'Special coupon for Hyderabad candidates. Get priority slot guidance for Begumpet & Madhapur centers.',
      tag: 'HYDERABAD EXCLUSIVE',
      type: 'DISCOUNT'
    },
    {
      code: 'PASSPORTAUDIT',
      title: 'Free Indian Passport Detail Verification',
      discount: 'FREE Audit with ₹199 Service',
      description: 'Detailed Given Name & Surname matching against official ETS & IDP guidelines.',
      tag: 'ZERO ERROR GUARANTEE',
      type: 'AUDIT'
    }
  ];

  const handleCopy = (code) => {
    setCopiedCode(code);
    setAppliedCoupon(code);
    setCouponMessage({ text: `Coupon ${code} applied successfully!`, type: 'success' });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    const clean = customInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'SAVE100' || clean === 'HYD50' || clean === 'TESTLYFREE' || clean === 'PASSPORTAUDIT' || clean === 'GRE2026') {
      setAppliedCoupon(clean);
      setCouponMessage({ text: `Awesome! Coupon "${clean}" applied successfully.`, type: 'success' });
    } else {
      setCouponMessage({ text: `Invalid coupon code. Try SAVE100 or TESTLYFREE.`, type: 'error' });
    }
  };

  // Calculate prices based on applied coupon
  const originalPrice = 199;
  const discountAmount = appliedCoupon === 'SAVE100' || appliedCoupon === 'HYD50' ? 100 : appliedCoupon === 'TESTLYFREE' ? 199 : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  return (
    <section id="coupons" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            <span>Voucher Store & Active Coupon Codes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Apply Discount Coupons. <br />
            <span className="text-blue-600">Lower Your Effective Total.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            All practice tools are 100% free. Apply discount coupons below to get candidate registration advisory for as low as <strong className="text-emerald-600 font-bold">₹99</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4 Active Coupon Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div 
                key={c.code}
                className={`bg-white p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  appliedCoupon === c.code 
                    ? 'border-emerald-500 shadow-md bg-emerald-50/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {c.tag}
                    </span>
                    {appliedCoupon === c.code && (
                      <span className="text-[10px] font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-slate-900">{c.title}</h3>
                  <div className="text-lg font-black text-emerald-600">{c.discount}</div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{c.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md font-mono text-xs font-bold text-slate-900">
                    {c.code}
                  </div>

                  <button
                    onClick={() => handleCopy(c.code)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {copiedCode === c.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Exam Coupon Price & Effective Total Table */}
            <div className="sm:col-span-2 bg-white rounded-3xl p-6 border border-[#E5EAF2] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-[#102A56]">Exam Voucher Coupon Pricing & Effective Totals</h3>
                <span className="text-[10px] font-black uppercase text-[#18A957] bg-[#EAF8F0] px-2.5 py-1 rounded-full">
                  Instant Savings Applied
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead>
                    <tr className="border-b border-slate-200 text-[#667085] uppercase text-[10px]">
                      <th className="py-2">Test</th>
                      <th className="py-2">Regular Fee</th>
                      <th className="py-2 text-[#18A957]">Coupon Price</th>
                      <th className="py-2">Voucher Saving</th>
                      <th className="py-2 text-[#1769E0]">+ Service Fee</th>
                      <th className="py-2 text-right font-black text-[#102A56]">Student Effective Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#102A56]">
                    <tr>
                      <td className="py-2.5 font-black">TOEFL iBT®</td>
                      <td className="py-2.5 text-slate-400 line-through">₹18,000</td>
                      <td className="py-2.5 font-black text-[#18A957]">₹13,999</td>
                      <td className="py-2.5 font-bold text-[#18A957]">Save ₹4,001</td>
                      <td className="py-2.5 text-[#1769E0]">₹199</td>
                      <td className="py-2.5 text-right font-black text-[#18A957] text-sm">₹13,999 + ₹199 = ₹14,198</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-black">GRE® General</td>
                      <td className="py-2.5 text-slate-400 line-through">₹22,550</td>
                      <td className="py-2.5 font-black text-[#18A957]">₹19,999</td>
                      <td className="py-2.5 font-bold text-[#18A957]">Save ₹2,551</td>
                      <td className="py-2.5 text-[#1769E0]">₹199</td>
                      <td className="py-2.5 text-right font-black text-[#18A957] text-sm">₹19,999 + ₹199 = ₹20,198</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-black">Duolingo DET</td>
                      <td className="py-2.5 text-slate-400 line-through">₹5,700</td>
                      <td className="py-2.5 font-black text-[#18A957]">₹4,999</td>
                      <td className="py-2.5 font-bold text-[#18A957]">Save ₹701</td>
                      <td className="py-2.5 text-[#1769E0]">₹199</td>
                      <td className="py-2.5 text-right font-black text-[#18A957] text-sm">₹4,999 + ₹199 = ₹5,198</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-black">PTE Academic</td>
                      <td className="py-2.5 text-slate-400 line-through">₹18,900</td>
                      <td className="py-2.5 font-black text-[#18A957]">₹14,999</td>
                      <td className="py-2.5 font-bold text-[#18A957]">Save ₹3,901</td>
                      <td className="py-2.5 text-[#1769E0]">₹199</td>
                      <td className="py-2.5 text-right font-black text-[#18A957] text-sm">₹14,999 + ₹199 = ₹15,198</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Live Price Calculator with Coupon Input */}
          <div className="lg:col-span-4 bg-[#102A56] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
            
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#60A5FA]" />
                <h3 className="text-lg font-black">Testly Pricing Summary</h3>
              </div>
              <p className="text-xs text-slate-400">See your final price after applying discount codes.</p>
            </div>

            {/* Price Line Items */}
            <div className="space-y-3 text-xs font-bold">
              <div className="flex justify-between items-center text-slate-300">
                <span>Unlimited Realistic Mock Tests</span>
                <span className="text-[#18A957] font-black text-sm">INCLUDED (₹0)</span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>Assisted Registration + Passport Audit</span>
                <span className="text-white">₹{originalPrice}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-[#60A5FA]">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span className="font-black">- ₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm font-black pt-3 border-t border-slate-800 text-white">
                <span>Final Amount Payable</span>
                <span className="text-2xl font-black text-[#18A957]">₹{finalPrice}</span>
              </div>
            </div>

            {/* Custom Coupon Input Form */}
            <form onSubmit={handleApplyCustom} className="space-y-2 pt-2">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Have a Coupon Code?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter code (e.g. SAVE100)"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-black text-white uppercase outline-none focus:border-[#60A5FA]"
                />
                <button
                  type="submit"
                  className="bg-[#18A957] hover:bg-[#128342] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shrink-0"
                >
                  Apply
                </button>
              </div>

              {couponMessage && (
                <p className={`text-[11px] font-bold mt-1 ${couponMessage.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {couponMessage.text}
                </p>
              )}
            </form>

            <button
              onClick={() => onBookTest && onBookTest('GRE')}
              className="w-full bg-[#1769E0] hover:bg-white hover:text-[#102A56] text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg"
            >
              <span>Book Assistance for ₹{finalPrice}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-400 font-semibold">
              🔒 Instant UPI Payment via PhonePe, GPay, Paytm • 100% Money-Back Guarantee
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
