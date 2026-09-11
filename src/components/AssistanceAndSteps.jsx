import React from 'react';
import { User, FileText, CheckSquare, Calendar, ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Headset, Award, Sparkles, PhoneCall } from 'lucide-react';

export default function AssistanceAndSteps({ onBookTest }) {
  const setupFeatures = [
    {
      icon: PhoneCall,
      title: '1-on-1 Specialist Setup Call',
      desc: 'Personal consultation with a dedicated registration specialist.'
    },
    {
      icon: UserCheck,
      title: 'Account Creation & Privacy Security',
      desc: 'Help setting up your official test account with 100% credential ownership.'
    },
    {
      icon: CheckSquare,
      title: 'Test Format & Eligibility Selection',
      desc: 'Expert advice on selecting Test Center vs Home Edition for your target.'
    },
    {
      icon: Calendar,
      title: 'Live Date & Slot Locking',
      desc: 'Real-time slot search & locking your preferred exam date.'
    },
    {
      icon: ShieldCheck,
      title: 'Official Booking Assistance',
      desc: 'Step-by-step guidance through details entry & lower price voucher redemption.'
    },
    {
      icon: CheckCircle2,
      title: 'Booking Confirmation & Pre-Test Guidance',
      desc: 'Instant official pass delivery & complete pre-exam checklist.'
    }
  ];

  const steps = [
    {
      num: '1',
      icon: Calendar,
      title: '1. Choose your test',
      desc: 'TOEFL, PTE, GRE or another available test'
    },
    {
      num: '2',
      icon: User,
      title: '2. Submit your basic details',
      desc: 'Share candidate contact info & preferred timeline'
    },
    {
      num: '3',
      icon: Headset,
      title: '3. Premium 1-on-1 Counselling Call',
      desc: 'Our specialist connects with you to complete the booking'
    },
    {
      num: '4',
      icon: Award,
      title: '4. Get official confirmation',
      desc: 'Receive your official test booking pass'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#F7FAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: What do you get for ₹199? */}
          <div className="lg:col-span-6 bg-[#F2F7FF] rounded-3xl p-6 sm:p-8 border border-[#1769E0]/15 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-1 bg-[#EAF8F0] border border-[#18A957]/30 px-3 py-1 rounded-full text-xs font-black text-[#18A957] mb-2 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#18A957]" />
                <span>PREMIUM 1-ON-1 COUNSELLING SETUP</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">
                What do you get for ₹199?
              </h3>
              <p className="text-sm font-medium text-[#667085] mt-1">
                Book our Premium 1-on-1 Setup to get personalized registration support and unlock thousands in savings.
              </p>

              <div className="mt-6 space-y-3.5">
                {setupFeatures.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#E5EAF2] shadow-2xs hover:border-[#1769E0]/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#F2F7FF] text-[#1769E0] flex items-center justify-center shrink-0 border border-[#1769E0]/20">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#102A56]">{item.title}</h4>
                        <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Highlight Badge */}
            <div className="bg-white rounded-2xl p-4 border border-[#18A957]/30 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#18A957] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  ₹
                </div>
                <div>
                  <p className="text-[11px] text-[#667085] font-semibold">1-on-1 Specialist Fee:</p>
                  <p className="text-sm font-extrabold text-[#102A56]">₹199 Premium Counselling Setup</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-[#18A957] bg-[#EAF8F0] px-3 py-1 rounded-lg block">
                  Net Saving: ₹2,800+
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Book in 4 simple steps */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAF2] shadow-sm flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102A56]">
                Book your test in 4 simple steps
              </h3>
              <p className="text-sm font-medium text-[#667085] mt-1">
                Tell us a few details. Our specialist handles your registration and saves you money.
              </p>

              {/* 4 Steps Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                {steps.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isGreenStep = idx === 3;
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl border transition-all ${
                        isGreenStep 
                          ? 'bg-[#EAF8F0] border-[#18A957]/30' 
                          : 'bg-[#F7FAFF] border-[#E5EAF2] hover:border-[#1769E0]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          isGreenStep 
                            ? 'bg-[#18A957] text-white' 
                            : 'bg-[#F2F7FF] text-[#1769E0]'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black text-[#667085]/60">0{step.num}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#102A56]">{step.title}</h4>
                      <p className="text-xs text-[#667085] mt-1">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA Block */}
            <div className="space-y-4 pt-4 border-t border-[#E5EAF2]">
              <button 
                onClick={() => onBookTest('TOEFL')}
                className="w-full sm:w-auto bg-[#1769E0] hover:bg-[#102A56] text-white font-extrabold text-base py-4 px-8 rounded-xl shadow-lg shadow-[#1769E0]/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
              >
                <span>BOOK ₹199 COUNSELLING SETUP NOW</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="inline-block relative">
                <span className="font-handwriting text-2xl font-bold text-[#102A56] block">
                  Book ₹199 Premium 1-on-1 Setup. Save ₹2,800+.
                </span>
                <svg className="w-full h-2 text-[#18A957]/50 -mt-1" viewBox="0 0 200 8" fill="none">
                  <path d="M2,5 Q100,1 198,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
