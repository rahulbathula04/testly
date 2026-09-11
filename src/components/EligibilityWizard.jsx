import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Sparkles, Globe, GraduationCap, Calendar } from 'lucide-react';

export default function EligibilityWizard({ onBookTest }) {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('USA');
  const [degree, setDegree] = useState("Master's / STEM");
  const [timeline, setTimeline] = useState('Within 30 Days');

  const countries = ['USA', 'UK', 'Australia', 'Canada', 'Germany'];
  const degrees = ["Master's / STEM", "MBA / Business", "Undergraduate", "Law School"];
  const timelines = ['Within 15 Days', 'Within 30 Days', 'Next 2-3 Months'];

  const getRecommendation = () => {
    if (degree === 'Law School') return { test: 'LSAT', price: "Check Offer", saving: "Save ₹3,000+" };
    if (degree === 'MBA / Business') return { test: 'GMAT', price: "Check Offer", saving: "Save ₹3,800+" };
    if (country === 'Australia' || country === 'UK') return { test: 'PTE', price: "₹15,499", saving: "Save ₹1,501+" };
    if (country === 'USA' && degree.includes('Master')) return { test: 'GRE', price: "₹20,999", saving: "Save ₹1,352+" };
    return { test: 'TOEFL', price: "₹14,999", saving: "Save ₹2,801+" };
  };

  const rec = getRecommendation();

  return (
    <section className="py-14 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F7FAFF] rounded-3xl p-6 sm:p-10 border border-[#E5EAF2] max-w-4xl mx-auto shadow-sm space-y-6">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#FFF4C2] text-[#102A56] px-3 py-1 rounded-full text-xs font-extrabold">
              <Compass className="w-4 h-4 text-[#102A56]" />
              <span>3-SECOND TEST FINDER & PRICE UNLOCK WIZARD</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#102A56]">
              Not Sure Which Test You Need?
            </h3>
            <p className="text-xs sm:text-sm text-[#667085]">
              Answer 3 quick questions to discover your optimal test and unlock available registration discounts.
            </p>
          </div>

          {step < 4 ? (
            <div className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-[#E5EAF2] shadow-xs">
              
              {/* Question 1: Country */}
              {step === 1 && (
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-[#102A56] flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#1769E0]" />
                    <span>Step 1: Where do you want to study?</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {countries.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setCountry(c); setStep(2); }}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-left ${
                          country === c
                            ? 'bg-[#1769E0] text-white border-[#1769E0]'
                            : 'bg-[#F7FAFF] text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Degree */}
              {step === 2 && (
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-[#102A56] flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#1769E0]" />
                    <span>Step 2: What degree are you applying for?</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {degrees.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => { setDegree(d); setStep(3); }}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-left ${
                          degree === d
                            ? 'bg-[#1769E0] text-white border-[#1769E0]'
                            : 'bg-[#F7FAFF] text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3: Timeline */}
              {step === 3 && (
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-[#102A56] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1769E0]" />
                    <span>Step 3: When do you plan to take the exam?</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => { setTimeline(t); setStep(4); }}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-left ${
                          timeline === t
                            ? 'bg-[#1769E0] text-white border-[#1769E0]'
                            : 'bg-[#F7FAFF] text-[#102A56] border-[#E5EAF2] hover:border-[#1769E0]/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Result unlocked */
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#102A56] to-[#1769E0] text-white p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-1 bg-[#18A957] text-white px-3 py-1 rounded-full text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RECOMMENDED MATCH & DISCOUNT UNLOCKED</span>
              </div>

              <h4 className="text-2xl font-black">
                Recommended: {rec.test} Academic Test
              </h4>

              <p className="text-xs text-white/80">
                For {degree} in {country} ({timeline}), our available booking option for {rec.test} is <strong className="text-[#FFF4C2]">{rec.price}</strong> + ₹199 assistance ({rec.saving}).
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={() => onBookTest(rec.test)}
                  className="bg-[#18A957] hover:bg-white hover:text-[#102A56] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <span>BOOK ₹199 ASSISTANCE FOR {rec.test}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3.5 px-4 rounded-xl border border-white/20"
                >
                  Reset Wizard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
