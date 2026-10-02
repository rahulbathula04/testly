/**
 * TESTLY BRAND FIRST PRINCIPLES & DESIGN SYSTEM REGISTRY
 * Single Source of Truth for Brand Identity, Typography, Colors, and Voice.
 */

export const BRAND_IDENTITY = {
  name: 'Testly',
  legalEntity: 'Testly Education Advisory (ICA 1872 Agency)',
  foundedYear: 2024,
  location: 'Madhapur, Hitech City, Hyderabad, Telangana, India',
  phone: '+91 93473 79041',
  supportEmail: 'support@testly.co.in',
  primaryDomain: 'https://www.testly.co.in',
  
  taglines: {
    primary: 'The Authorized Exam Registration Rail',
    consumer: 'Book smarter. Go further.',
    guarantee: 'Zero-Defect Candidate Verification',
    mission: 'Eliminating forex penalties, booking chaos, and passport name mismatches for Indian test takers.'
  },

  supportDesk: {
    identity: 'Testly Support Team & Candidate Verification Desk',
    responseCommitment: 'Real-time specialist assistance via WhatsApp and telephone desk in Hyderabad',
    auditStandard: 'Character-by-character original passport verification before fee submission'
  }
};

export const BRAND_TYPOGRAPHY = {
  serifDisplay: "'DM Serif Display', Georgia, serif",
  sansUI: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  monoTechnical: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace",
  handwritingAccent: "'Caveat', cursive, sans-serif"
};

export const BRAND_COLORS = {
  // Brand Inks & Backgrounds
  inkDark: '#0F172A',         // Slate-900: Primary editorial headlines and dark buttons
  inkMuted: '#64748B',        // Slate-500: Primary body copy and descriptions
  canvasWarm: '#FAF9F6',      // Institutional paper ivory background
  surfaceWhite: '#FFFFFF',    // Clean card backgrounds
  borderSubtle: '#E5E7EB',    // Slate-200: Elegant card borders
  
  // Brand Primaries
  navyPrimary: '#1E3A8A',     // Blue-900: Institutional authority
  blueVibrant: '#3B82F6',     // Blue-500: Focus rings, active dots, icons
  blueSoft: '#EBF3FF',        // Soft blue container badges
  
  // Success & Support (WhatsApp)
  greenWhatsApp: '#25D366',   // WhatsApp brand green
  greenSuccess: '#128C7E',    // Dark teal green for verified seals
  greenSoft: '#EAF8F0',       // Soft green background pill
  
  // Accent & Warnings
  amberAccent: '#F59E0B',     // Star ratings and warnings
  amberSoft: '#FEF3C7'        // Savings highlight tags
};

export const OFFICIAL_DISCLAIMERS = {
  trademarkNotice: 
    'GRE®, TOEFL®, and Praxis® are registered trademarks of Educational Testing Service (ETS). ' +
    'IELTS® is a registered trademark of University of Cambridge ESOL, British Council, and IDP Education Australia. ' +
    'PTE Academic® is a registered trademark of Pearson PLC. ' +
    'GMAT® is a registered trademark of the Graduate Management Admission Council (GMAC). ' +
    'Duolingo English Test is a registered trademark of Duolingo, Inc. ' +
    'Testly is an independent candidate assistance service and authorized voucher distributor. ' +
    'None of these testing agencies endorse, sponsor, or are affiliated with Testly.',
  agencyDeclaration:
    'Testly operates under the Indian Contract Act, 1872 as an authorized candidate administrative agent. ' +
    'All registrations are executed directly on official exam testing organization portals under candidate-verified credentials.'
};

export const CORE_EXAMS = [
  { id: 'GRE', name: 'GRE® General Test', provider: 'ETS', defaultSavings: 6043 },
  { id: 'TOEFL', name: 'TOEFL iBT® Test', provider: 'ETS', defaultSavings: 4000 },
  { id: 'PTE', name: 'PTE Academic', provider: 'Pearson', defaultSavings: 3901 },
  { id: 'IELTS', name: 'IELTS Academic', provider: 'IDP / British Council', defaultSavings: 2800 },
  { id: 'GMAT', name: 'GMAT™ Focus Edition', provider: 'GMAC', defaultSavings: 5200 },
  { id: 'Duolingo', name: 'Duolingo English Test', provider: 'Duolingo', defaultSavings: 1200 }
];
