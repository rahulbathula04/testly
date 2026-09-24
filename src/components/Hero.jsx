import React from 'react';
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const pillars = [
  { icon: BadgeCheck, label: 'SAVE ₹1,800–₹7,500', sub: 'Verified institutional pricing' },
  { icon: Clock,       label: '₹199 CONCIERGE',    sub: 'Done-for-you registration' },
  { icon: ShieldCheck, label: 'ZERO DEFECT AUDIT', sub: 'Passport & slot verification' },
  { icon: FileCheck,   label: 'DIRECT ETS & PEARSON', sub: 'Official booking confirmation' },
];

const studentAvatars = [
  { src: '/assets/images/student-avatar-1.jpg', alt: 'Indian graduate student at US university' },
  { src: '/assets/images/student-avatar-2.jpg', alt: 'Indian student at Oxford library' },
  { src: '/assets/images/student-avatar-3.jpg', alt: 'Indian engineering student at Canadian campus' },
  { src: '/assets/images/student-avatar-4.jpg', alt: 'Indian student at Australian campus' },
  { src: '/assets/images/student-avatar-5.jpg', alt: 'Indian masters student at Edinburgh campus' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Hero({ onBookTest }) {
  return (
    <section className="relative bg-white border-b border-slate-200 overflow-hidden min-h-[520px] w-full max-w-full">

      {/* ── Right-side photo panel ── */}
      <div className="absolute inset-y-0 right-0 w-[42%] xl:w-[46%] hidden lg:block overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/images/global-university-campus.jpg')` }}
        />
        {/* fade left edge - softer gradient to protect text on laptop widths */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-10 w-full" />

        {/* Top-right airplane */}
        <div className="absolute top-6 right-8 text-slate-400 opacity-60 z-20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
          </svg>
        </div>

        {/* Handwritten overlay — "Same Exam. Lower Price. Brighter Future." */}
        <div className="absolute top-10 right-10 text-right z-20">
          <p className="font-['Caveat'] text-xl text-slate-700 leading-tight">
            Same Exam.<br />Lower Price.<br />Brighter Future.
          </p>
        </div>

        {/* Bottom-left on photo — "Global Opportunities Start Here" */}
        <div className="absolute bottom-10 right-10 text-right z-20">
          <p className="font-['Caveat'] text-base text-slate-600 leading-snug">
            Global Opportunities<br />Start Here.
          </p>
        </div>

        {/* Quote bubble */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-32 right-6 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 max-w-[160px] shadow-sm z-20"
        >
          <p className="text-[11px] text-slate-600 font-medium italic leading-snug">
            "A small saving today, a bigger tomorrow."
          </p>
        </motion.div>
      </div>

      {/* ── Left content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-lg xl:max-w-xl space-y-5 sm:space-y-6 relative z-20"
        >

          {/* Live Badge & Pre-headline */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#1E3A8A] text-[10px] sm:text-[10.5px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>LIVE FEE SCHEDULE • 2026</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <p className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
              THE AUTHORIZED EXAM REGISTRATION RAIL
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            style={{ fontFamily: "'DM Serif Display', serif" }}
            className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-[62px] text-[#0F172A] leading-[1.12] sm:leading-[1.03] tracking-[-0.015em] break-words"
          >
            Book Your Exam.<br />
            <span className="text-[#1E3A8A]">Save Up to ₹6,043</span> on Official Fees.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-[13.5px] xs:text-[14.5px] sm:text-[16px] text-[#64748B] font-normal leading-relaxed"
          >
            Eliminate unfair bank forex card markups. Get verified institutional fee schedules and done-for-you ₹199 registration assistance, audited character-by-character by the Testly Registration Team.
          </motion.p>

          {/* 4 Value Pillars — Compact 2x2 on all screens with classic tactile feel */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 sm:gap-3 py-1">
            {pillars.map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                whileHover={{ y: -2.5, borderColor: '#93C5FD', backgroundColor: '#FFFFFF' }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E7EB] transition-colors shadow-2xs cursor-default select-none"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EBF3FF] text-[#1E3A8A] flex items-center justify-center shrink-0 border border-[#BFDBFE]/60 shadow-2xs">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] xs:text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-[#0F172A] leading-tight line-clamp-1">{label}</p>
                  <p className="text-[9.5px] xs:text-[10px] sm:text-[11px] text-[#64748B] font-normal leading-tight line-clamp-1">{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA & Assurance with interactive micro-elevation */}
          <motion.div variants={itemVariants} className="space-y-2 pt-1">
            <motion.button
              whileHover={{ y: -1.5, backgroundColor: '#1E3A8A' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16 }}
              onClick={() => onBookTest('GRE')}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 bg-[#0F172A] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-shadow shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Check Your Exam & Savings</span>
              <ArrowRight className="w-4 h-4 text-[#93C5FD] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </motion.button>
            <p className="text-[10.5px] sm:text-[11px] text-[#64748B] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>100% Official ETS & Pearson slots • Direct WhatsApp to professionals</span>
            </p>
          </motion.div>

          {/* Social proof with student avatars + Rating Stars */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
            <div className="flex -space-x-2">
              {studentAvatars.map((student, i) => (
                <motion.img
                  key={i}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  transition={{ duration: 0.15 }}
                  src={student.src}
                  alt={student.alt}
                  className="inline-block w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover object-center shadow-xs ring-1 ring-slate-200/50 cursor-pointer"
                  loading="eager"
                />
              ))}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-[#F59E0B] text-xs">
                <span>★★★★★</span>
                <span className="text-[11px] font-bold text-[#0F172A] ml-1">4.9/5</span>
              </div>
              <p className="text-[12px] text-[#64748B]">
                <strong className="font-bold text-[#0F172A]">5,000+</strong> Indian students guided across India.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
