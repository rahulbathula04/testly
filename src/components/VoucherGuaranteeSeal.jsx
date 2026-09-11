import React from 'react';
import { ShieldCheck, Award, Lock, CheckCircle2, BadgeCheck } from 'lucide-react';

export default function VoucherGuaranteeSeal() {
  return (
    <section className="py-10 bg-gradient-to-r from-[#102A56] via-[#1769E0] to-[#102A56] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4C2] text-[#102A56] flex items-center justify-center shrink-0 shadow-md">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">100% Official Vouchers</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Authorized ETS, Pearson VUE & GMAC vouchers recognized worldwide.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#18A957] text-white flex items-center justify-center shrink-0 shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">Full Credential Privacy</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  You retain 100% ownership of your official test account & password.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4C2] text-[#102A56] flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">Zero Hidden Taxes</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  All 18% GST and fees included in your final price. No surprise charges.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#18A957] text-white flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">Guaranteed Slot Lock</h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  1-on-1 Mon–Thu (9 AM – 9 PM) slot locking assurance or 100% refund.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
