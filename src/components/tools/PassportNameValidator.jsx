import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Info,
  ArrowRight,
  Sparkles,
  FileCheck2,
  Mail
} from 'lucide-react';

export default function PassportNameValidator({ onOpenBooking }) {
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [copied, setCopied] = useState(false);

  // Analysis logic
  const trimmedGiven = givenName.trim().toUpperCase();
  const trimmedSurname = surname.trim().toUpperCase();

  let riskLevel = 'LOW'; // LOW, MEDIUM, HIGH
  let issues = [];
  let etsFirstName = trimmedGiven;
  let etsLastName = trimmedSurname;
  let recommendations = [];

  const hasBlankSurname = !trimmedSurname;
  const hasDotInSurname = trimmedSurname.includes('.');
  const hasDotInGiven = trimmedGiven.includes('.');
  const isGivenDuplicate = trimmedGiven && trimmedSurname && trimmedGiven === trimmedSurname;
  const hasSingleLetterSurname = trimmedSurname.length === 1;
  const hasSingleLetterGiven = trimmedGiven.length === 1;
  const isGivenMultiWord = trimmedGiven.split(/\s+/).length > 1;

  if (!trimmedGiven && !trimmedSurname) {
    riskLevel = 'IDLE';
  } else if (hasBlankSurname) {
    riskLevel = 'HIGH';
    issues.push('Blank Surname on Indian Passport: The ETS portal requires both First and Last Name.');
    etsFirstName = 'FNU (First Name Unknown)';
    etsLastName = trimmedGiven;
    recommendations.push('Enter "FNU" into the First/Given Name field on ETS.org.');
    recommendations.push(`Enter your entire given name "${trimmedGiven}" into the Last/Family Name field.`);
    recommendations.push('Do NOT enter a dot ("."), "NA", or duplicate your name in the surname box.');
  } else if (hasDotInSurname || hasDotInGiven) {
    riskLevel = 'HIGH';
    issues.push('Punctuation character (".") detected: Prometric & Pearson proctors strictly reject punctuation.');
    recommendations.push('Indian passports do not contain punctuation in machine-readable lines. Expand all abbreviations.');
  } else if (isGivenDuplicate) {
    riskLevel = 'HIGH';
    issues.push('Identical First & Last Name: Mismatch with Passport Machine Readable Zone (MRZ).');
    recommendations.push('If you only have one legal name, follow the official ETS "FNU" standard instead of repeating your name.');
  } else if (hasSingleLetterSurname || hasSingleLetterGiven) {
    riskLevel = 'MEDIUM';
    issues.push('Single initial detected: Test centers require names to match character-for-character with your passport.');
    recommendations.push('Ensure the initial is expanded if it represents a patronymic father\'s name and appears expanded on page 2 of your passport.');
  } else if (isGivenMultiWord) {
    riskLevel = 'MEDIUM';
    issues.push('Multi-word Given Name detected: Verify exact word order matching your passport MRZ lines.');
    recommendations.push(`Keep "${trimmedGiven}" in the Given Name field without omitting middle names.`);
  } else {
    riskLevel = 'LOW';
    recommendations.push('Your name format matches standard international two-field conventions.');
    recommendations.push('Confirm spelling character-for-character with page 2 of your physical, unexpired Indian Passport.');
  }

  const emailTemplate = `To: GRESupport4India@ets.org
Subject: Urgent: Request for Passport Name Correction - GRE Registration
Candidate Name on Passport: ${trimmedGiven || '[YOUR GIVEN NAME]'} ${trimmedSurname || ''}
ETS ID / Appointment Number: [YOUR ETS APPOINTMENT NUMBER]
Date of Birth: [DD/MM/YYYY]
Test Date: [YOUR TEST DATE]
Test Venue: [e.g. Prometric Madhapur / Home Edition]

Dear ETS Testing Integrity Team,

I recently registered for the GRE General Test. I noticed a discrepancies between my registered profile name and the legal name printed on my Indian Passport.

Passport Given Name: ${trimmedGiven || '[GIVEN NAME]'}
Passport Surname: ${trimmedSurname || '[BLANK OR SURNAME]'}

According to ETS official identification guidelines for Indian passport holders with single/blank surnames, my name should be formatted as:
- First/Given Name: ${etsFirstName}
- Last/Family Name: ${etsLastName}

Attached is a high-resolution color scan of the biographical page of my valid Indian passport. Please update my candidate record to ensure test-day admission clearance.

Thank you,
${trimmedGiven || '[YOUR NAME]'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl my-8 font-[Inter,system-ui,sans-serif]" id="passport-validator">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Indian Passport Name Match & ID Compliance Validator
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                2026 ETS & Pearson Standard
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Check single names, blank surnames, and initials before booking to avoid 100% test-day turnaways at Prometric centers.
            </p>
          </div>
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Given Name(s) (as printed on Indian Passport)
          </label>
          <input
            type="text"
            value={givenName}
            onChange={(e) => setGivenName(e.target.value)}
            placeholder="e.g. SAI KRISHNA"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors uppercase font-mono"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Printed under 'Given Name' on Page 2</span>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Surname / Family Name (leave empty if blank on Passport)
          </label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="e.g. REDDY (or leave blank)"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors uppercase font-mono"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Leave completely blank if not on Passport</span>
        </div>
      </div>

      {/* Real-time Assessment Output */}
      <AnimatePresence>
        {riskLevel !== 'IDLE' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-6 pt-6 border-t border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Test-Day Admission Clearance Status:
              </span>
              {riskLevel === 'HIGH' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" /> High Risk — Critical Formatting Required
                </span>
              )}
              {riskLevel === 'MEDIUM' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Info className="w-3.5 h-3.5" /> Caution — Review Character Sequence
                </span>
              )}
              {riskLevel === 'LOW' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Standard Match Validated
                </span>
              )}
            </div>

            {/* Formatted Output Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">ETS Account — First / Given Name Field:</span>
                <div className="mt-1 font-mono text-sm font-semibold text-blue-300 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                  {etsFirstName}
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">ETS Account — Last / Family Name Field:</span>
                <div className="mt-1 font-mono text-sm font-semibold text-blue-300 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                  {etsLastName || '<BLANK>'}
                </div>
              </div>
            </div>

            {/* Key Findings */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">ETS & Prometric Compliance Directives:</span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Rectification Section */}
            {riskLevel === 'HIGH' && (
              <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Already Booked with an Error? Copy ETS India Rectification Email</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Template'}</span>
                  </motion.button>
                </div>
                <pre className="text-[11px] text-slate-400 font-mono whitespace-pre-wrap bg-slate-900 p-3 rounded-lg border border-slate-800 max-h-40 overflow-y-auto">
                  {emailTemplate}
                </pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Done-for-you Concierge CTA */}
      <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          <span className="text-white font-semibold">Want 100% Guaranteed Entry?</span> Testly’s ₹199 Concierge performs a character-by-character audit of your passport and locks in official voucher savings up to ₹7,500.
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          onClick={() => onOpenBooking ? onOpenBooking('GRE') : null}
          className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Book with Zero-Defect Audit (₹199)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
