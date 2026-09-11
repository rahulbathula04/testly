import React, { useState } from 'react';
import { GraduationCap, ArrowRight, Globe, Share2, Mail } from 'lucide-react';

export default function Footer({ onBookTest, onOpenFreeMock }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Testly updates!');
    setEmail('');
  };

  return (
    <footer className="bg-white text-[#102A56] pt-16 pb-12 border-t border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1769E0] flex items-center justify-center text-white font-black">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#102A56]">Testly</span>
            </div>
            <p className="text-xs text-[#667085] font-semibold">Global Tests. Brighter Futures.</p>
          </div>

          {/* Professional Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#102A56]">Professional Services</h4>
            <ul className="space-y-2 text-xs font-semibold text-[#667085]">
              <li><a href="#professional-services" className="hover:text-[#1769E0]">Test Registration</a></li>
              <li><a href="#how-it-works" className="hover:text-[#1769E0]">Our Process</a></li>
              <li><a href="#pricing" className="hover:text-[#1769E0]">Pricing</a></li>
              <li><a href="#resources" className="hover:text-[#1769E0]">Support</a></li>
            </ul>
          </div>

          {/* Practice */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#102A56]">Practice</h4>
            <ul className="space-y-2 text-xs font-semibold text-[#667085]">
              <li><button onClick={onOpenFreeMock} className="hover:text-[#1769E0]">Mock Tests</button></li>
              <li><a href="#practice" className="hover:text-[#1769E0]">Study Plans</a></li>
              <li><a href="#practice" className="hover:text-[#1769E0]">AI Analysis</a></li>
              <li><a href="#practice" className="hover:text-[#1769E0]">Sample Questions</a></li>
            </ul>
          </div>

          {/* Tests */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#102A56]">Tests</h4>
            <ul className="space-y-2 text-xs font-semibold text-[#667085]">
              <li><button onClick={() => onBookTest('TOEFL')} className="hover:text-[#1769E0]">TOEFL</button></li>
              <li><button onClick={() => onBookTest('IELTS')} className="hover:text-[#1769E0]">IELTS</button></li>
              <li><button onClick={() => onBookTest('GRE')} className="hover:text-[#1769E0]">GRE</button></li>
              <li><button onClick={() => onBookTest('PTE')} className="hover:text-[#1769E0]">PTE</button></li>
              <li><button onClick={() => onBookTest('Duolingo')} className="hover:text-[#1769E0]">Duolingo</button></li>
              <li><button onClick={() => onBookTest('GMAT')} className="hover:text-[#1769E0]">GMAT</button></li>
              <li><button onClick={() => onBookTest('LSAT')} className="hover:text-[#1769E0]">LSAT</button></li>
            </ul>
          </div>

          {/* Stay Updated Email Subscribe */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#102A56]">Stay Updated</h4>
            <p className="text-xs text-[#667085] font-medium">Get the latest test updates and offers.</p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF2] text-[#102A56] outline-none"
              />
              <button 
                type="submit"
                className="p-2.5 rounded-xl bg-[#1769E0] text-white hover:bg-[#102A56] transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Legal Notice, Indian Consumer Protection & Trademark Disclaimer Box */}
        <div className="pt-8 border-t border-[#E5EAF2]">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-[11px] leading-relaxed text-slate-500 space-y-2.5">
            <div className="flex items-center justify-between font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>🇮🇳 Legal Notice & Indian Statutory Compliance Disclaimers</span>
              </div>
              <span className="text-slate-400">Independent Service Provider</span>
            </div>
            
            <p>
              <strong>TRADEMARK NOTICE (Trademark Act, 1999 - India):</strong> GRE® and TOEFL iBT® are registered trademarks of Educational Testing Service (ETS). IELTS® is a registered trademark of the University of Cambridge ESOL, British Council, and IDP Education Australia. PTE Academic® is a registered trademark of Pearson PLC. Duolingo English Test® is a registered trademark of Duolingo, Inc. GMAT® is a registered trademark of the Graduate Management Admission Council (GMAC). LSAT® is a registered trademark of the Law School Admission Council (LSAC). All trademark references are used strictly for identification and nominative fair use purposes.
            </p>

            <p>
              <strong>INDEPENDENT SERVICE DISCLOSURE (Consumer Protection Act, 2019):</strong> Testly is an <strong>independent test preparation and registration assistance platform</strong>. Testly is <strong>NOT affiliated with, sponsored by, authorized by, or endorsed by</strong> ETS, IDP Education, British Council, Pearson PLC, Duolingo Inc., GMAC, or LSAC. Official exam fees charged by testing bodies are paid directly to official test makers. Testly Professional Service (₹199 flat fee, inclusive of applicable Indian taxes) is strictly for independent registration guidance, passport detail audit, and slot selection assistance.
            </p>

            <p>
              <strong>DATA PRIVACY COMPLIANCE (DPDP Act, 2023):</strong> Candidate information (Indian Passport details, Given Name, Surname, contact numbers) provided during registration assistance is collected strictly for test registration guidance, encrypted locally, and is never shared, sold, or rented to third-party commercial entities.
            </p>
          </div>
        </div>

        {/* Bottom Socials & Copyright Bar */}
        <div className="pt-6 border-t border-[#E5EAF2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#667085]">
          <div className="flex items-center gap-4 text-[#102A56]">
            <Globe className="w-4 h-4 cursor-pointer hover:text-[#1769E0]" />
            <Share2 className="w-4 h-4 cursor-pointer hover:text-[#1769E0]" />
            <Mail className="w-4 h-4 cursor-pointer hover:text-[#1769E0]" />
          </div>

          <p>© 2024 Testly Practice Platform. All rights reserved.</p>

          <span className="font-handwriting text-base font-bold text-[#102A56]">
            Same Tests. Brighter Futures.
          </span>
        </div>

      </div>
    </footer>
  );
}
