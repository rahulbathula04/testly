import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Headphones,
  Sparkles,
  CheckCircle2,
  Calculator,
  Percent,
  Lock,
  Building2,
  Info
} from 'lucide-react';
import {
  EtsGreLogo,
  EtsToeflLogo,
  PteLogo,
  DuolingoLogo,
  IeltsLogo,
  GmatLogo,
  SatLogo,
  LsatLogo
} from './ExamLogos';
import { EXAM_DATA, formatINR } from '../data/examOfferings';

export { EXAM_DATA };

const POPULAR_EXAMS = [
  {
    id: 'GRE',
    title: 'GRE',
    logo: <EtsGreLogo className="h-6" />,
    popular: true,
    refPrice: 26542,
    testlyPrice: 20499,
    saving: 6043,
    forexSaved: 1180,
    btnText: 'Book GRE with Testly'
  },
  {
    id: 'TOEFL',
    title: 'TOEFL',
    logo: <EtsToeflLogo className="h-6" />,
    popular: false,
    refPrice: 17999,
    testlyPrice: 13999,
    saving: 4000,
    forexSaved: 850,
    btnText: 'Book TOEFL with Testly'
  },
  {
    id: 'PTE',
    title: 'PTE',
    logo: <PteLogo className="h-6" />,
    popular: false,
    refPrice: 18900,
    testlyPrice: 14999,
    saving: 3901,
    forexSaved: 890,
    btnText: 'Book PTE with Testly'
  },
  {
    id: 'Duolingo',
    title: 'DET',
    logo: <DuolingoLogo className="h-6" />,
    popular: false,
    refPrice: 5800,
    testlyPrice: 5499,
    saving: 301,
    forexSaved: 280,
    btnText: 'Book DET with Testly'
  }
];

const CALCULATOR_EXAMS = [
  { id: 'GRE', label: 'GRE® General', retail: 26542, testly: 20499, save: 6043, forexFee: 1180 },
  { id: 'TOEFL', label: 'TOEFL iBT®', retail: 17999, testly: 13999, save: 4000, forexFee: 850 },
  { id: 'PTE', label: 'PTE Academic', retail: 18900, testly: 14999, save: 3901, forexFee: 890 },
  { id: 'Duolingo', label: 'Duolingo DET', retail: 5800, testly: 5499, save: 301, forexFee: 280 },
  { id: 'IELTS', label: 'IELTS Academic', retail: 18200, testly: 18200, save: 0, forexFee: 0, note: 'Zero-markup concierge booking' },
  { id: 'GMAT', label: 'GMAT Focus', retail: 24800, testly: 24800, save: 0, forexFee: 0, note: 'Center slot & ID audit' }
];

export default function PriceProof({ onBookTest, onOpenAgreement }) {
  const [activeTab, setActiveTab] = useState('GRE');
  const [mobileFilter, setMobileFilter] = useState('ALL');

  const currentCalc = CALCULATOR_EXAMS.find((e) => e.id === activeTab) || CALCULATOR_EXAMS[0];

  const visibleCards = mobileFilter === 'ALL'
    ? POPULAR_EXAMS
    : POPULAR_EXAMS.filter((e) => e.id === mobileFilter);

  return (
    <section id="pricing" className="py-8 sm:py-14 bg-white border-b border-[#E5E7EB] font-[Inter,system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* ── 1. Top Logo Strip: EXAMS WE SUPPORT ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="py-3 px-3.5 sm:px-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden shadow-2xs"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider shrink-0 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span>EXAMS WE SUPPORT</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar py-1 opacity-90">
            {[
              { component: <EtsGreLogo className="h-4.5 sm:h-5" />, key: 'gre' },
              { component: <EtsToeflLogo className="h-4.5 sm:h-5" />, key: 'toefl' },
              { component: <PteLogo className="h-4.5 sm:h-5" />, key: 'pte' },
              { component: <DuolingoLogo className="h-4.5 sm:h-5" />, key: 'duo' },
              { component: <IeltsLogo className="h-4.5 sm:h-5" />, key: 'ielts' },
              { component: <GmatLogo className="h-4.5 sm:h-5" />, key: 'gmat' },
              { component: <SatLogo className="h-4.5 sm:h-5" />, key: 'sat' },
              { component: <LsatLogo className="h-4.5 sm:h-5" />, key: 'lsat' }
            ].map(({ component, key }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.08, opacity: 1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="shrink-0 cursor-pointer"
              >
                {component}
              </motion.div>
            ))}
            <span className="text-xs font-semibold text-[#94A3B8] italic shrink-0 whitespace-nowrap">+ more</span>
          </div>
        </motion.div>

        {/* ── 2. HIGH-CRO INTERACTIVE SAVINGS CALCULATOR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Headline & Selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>INTERACTIVE FEE & FOREX CALCULATOR</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-['DM_Serif_Display',Georgia,serif]">
                Check Your Exact Exam Savings Live.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Select your exam to see the net cost after eliminating retail bank markups (3.5% forex + 18% GST) and applying Testly's verified institutional advantages.
              </p>

              {/* Exam Selector Pills */}
              <div className="pt-2">
                <label className="text-[10.5px] uppercase font-extrabold tracking-wider text-slate-400 block mb-2">
                  Select Exam to Compare:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                  {CALCULATOR_EXAMS.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`text-xs font-bold py-2.5 px-2 rounded-xl transition-all text-center cursor-pointer ${
                        activeTab === item.id
                          ? 'bg-[#3B82F6] text-white shadow-md scale-[1.02]'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.id}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Calculation Comparison Card */}
            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-extrabold tracking-wider text-blue-300">
                  {currentCalc.label} Breakdown
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Official Fee Schedule
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="space-y-3 text-xs sm:text-sm"
                >
                  {/* Retail Price */}
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Official Foreign Retail Price:</span>
                    <span className="line-through text-slate-400 font-medium">₹{currentCalc.retail.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Bank Forex */}
                  {currentCalc.forexFee > 0 && (
                    <div className="flex items-center justify-between text-amber-300 text-xs">
                      <span className="flex items-center gap-1">
                        <Info className="w-3 h-3 text-amber-400" />
                        Hidden Bank Forex & GST Markup:
                      </span>
                      <span className="line-through">+₹{currentCalc.forexFee.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* Testly Net Price */}
                  <div className="flex items-center justify-between text-white font-bold pt-2 border-t border-white/10 text-base sm:text-lg">
                    <span>Testly Net Price:</span>
                    <span className="text-emerald-400 font-black">₹{currentCalc.testly.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Direct Savings Callout */}
                  {currentCalc.save > 0 ? (
                    <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-extrabold text-emerald-300">Your Direct Net Savings</div>
                        <div className="text-xs text-slate-200">Kept in your bank account</div>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-300">
                        ₹{currentCalc.save.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-500/20 border border-blue-400/40 rounded-xl p-3 flex items-center justify-between">
                      <div className="text-xs text-blue-200">
                        {currentCalc.note || 'Zero bank markup + zero-defect passport verification'}
                      </div>
                      <div className="text-xs font-bold text-blue-300">
                        Included
                      </div>
                    </div>
                  )}

                  {/* ₹199 Concierge Guarantee */}
                  <div className="pt-1 text-[11px] text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Includes ₹199 concierge: character-by-character passport audit by Rahul & Deepak.</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Button */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: '#16A34A' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => onBookTest(currentCalc.id)}
                  className="w-full bg-[#22C55E] text-slate-950 font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-shadow shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lock {currentCalc.id} Fee Schedule & Check Available Slots</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </div>

          </div>
        </motion.div>

        {/* ── 3. TODAY'S EXAM PRICES GRID ── */}
        <div className="space-y-4">
          
          {/* Section Header & Mobile Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1E3A8A] bg-[#EBF3FF] px-2.5 py-0.5 rounded-md border border-[#BFDBFE] mb-1">
                ALL-INCLUSIVE INR FEE SCHEDULE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-['DM_Serif_Display',Georgia,serif]">
                Today's Verified Exam Prices
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                Every price includes institutional discounts and professional concierge booking assistance.
              </p>
            </div>

            {/* Mobile Filter Pills (Shows on small screens to reduce vertical scroll) */}
            <div className="flex sm:hidden items-center gap-2 overflow-x-auto no-scrollbar py-1 touch-scroll -mx-4 px-4">
              <span className="text-[11px] font-bold text-[#64748B] uppercase shrink-0">Filter:</span>
              {['ALL', 'GRE', 'TOEFL', 'PTE', 'Duolingo'].map((tab) => (
                <motion.button
                  key={tab}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileFilter(tab)}
                  className={`text-xs font-bold px-3.5 py-1.5 min-h-[38px] rounded-full border transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                    mobileFilter === tab
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                      : 'bg-[#FAF9F6] text-[#64748B] border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {visibleCards.map((ex, idx) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3.5, transition: { duration: 0.2, ease: 'easeOut' } }}
                whileTap={{ scale: 0.99 }}
                className={`bg-white rounded-2xl p-5 flex flex-col justify-between relative transition-shadow shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)] ${
                  ex.popular
                    ? 'border-2 border-[#1E3A8A] ring-2 ring-[#3B82F6]/10'
                    : 'border border-[#E5E7EB] hover:border-[#BFDBFE]'
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header: Logo + POPULAR */}
                  <div className="flex items-center justify-between min-h-[32px]">
                    <div className="shrink-0">{ex.logo}</div>
                    {ex.popular && (
                      <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF3FF] text-[#1E3A8A] border border-[#BFDBFE] tracking-wide uppercase">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Reference Price */}
                  <div>
                    <span className="text-xs font-medium text-[#94A3B8] line-through">
                      ₹{ex.refPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-medium ml-1.5">ref. foreign fee</span>
                  </div>

                  {/* Testly Price + Savings Chip */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[28px] font-black text-[#0F172A] tracking-tight leading-none">
                        ₹{ex.testlyPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Save ₹{ex.saving.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider block">
                      Authorized Institutional Fee
                    </span>
                  </div>

                  {/* Service Inclusion Tag */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#0F172A] font-semibold bg-[#FAF9F6] p-2 rounded-lg border border-[#E5E7EB]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Includes ₹199 done-for-you concierge</span>
                  </div>

                  {/* Verification Note */}
                  <div className="text-[10px] text-[#64748B] flex items-center justify-between">
                    <span>Zero Card Forex Markup</span>
                    <span className="text-emerald-700 font-bold">Save ₹{ex.forexSaved}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 mt-3 border-t border-[#F1F5F9]">
                  <motion.button
                    whileHover={{ y: -1, backgroundColor: '#1E3A8A' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => onBookTest(ex.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0F172A] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow group cursor-pointer"
                  >
                    <span>Check Available Slots</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#93C5FD] group-hover:text-white" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ── 4. THE FOREX SHIELD BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50 border-2 border-blue-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[10.5px] font-black uppercase tracking-wide">
              <Sparkles className="w-3 h-3" />
              <span>THE TESTLY FOREX SHIELD</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
              Why paying directly on foreign portals costs you ₹800–₹1,400 extra.
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              When paying with Indian credit or debit cards on ETS or Pearson, banks add 3.5% foreign exchange markups + 18% GST on the fee. Testly uses corporate enterprise billing rails — so you pay in clean INR with zero bank markup.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -1, backgroundColor: '#0F172A' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => onOpenAgreement ? onOpenAgreement() : onBookTest('GRE')}
              className="bg-[#1E3A8A] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Read Agency Protection Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── 5. FOUR VALUE PILLARS STRIP ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {[
            { icon: FileText, title: 'Direct Founder Audit', sub: 'Verified by Rahul & Deepak', isRupee: false },
            { icon: ShieldCheck, title: 'Zero Error Check', sub: 'Passport name match guarantee', isRupee: false },
            { icon: null, title: 'Clean INR Fee Structure', sub: '0% foreign transaction markup', isRupee: true },
            { icon: Headphones, title: 'Live WhatsApp Desk', sub: 'Direct line: +91 93473 79041', isRupee: false }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -2, backgroundColor: '#FFFFFF', borderColor: '#BFDBFE' }}
                whileTap={{ scale: 0.985 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E7EB] transition-colors flex flex-col sm:flex-row items-start gap-3 shadow-2xs cursor-default select-none"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF3FF] text-[#1E3A8A] flex items-center justify-center shrink-0 border border-[#BFDBFE]/70 shadow-2xs">
                  {pillar.isRupee ? (
                    <span className="font-bold text-base sm:text-lg">₹</span>
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] uppercase tracking-wide leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-normal mt-0.5 leading-snug">
                    {pillar.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
