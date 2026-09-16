/**
 * TESTLY E-E-A-T PROFESSIONALS & EDITORIAL ADVISORY BOARD
 * Real credentials, exams handled, roles, and verification details.
 */

export const PROFESSIONALS = {
  rahul_bathula: {
    id: 'rahul_bathula',
    name: 'Rahul Bathula',
    role: 'Founder & Chief Exam Strategist',
    credentials: 'B.Tech, 7+ Years Overseas Exam Advisory',
    experience: '7+ Years',
    avatar: 'RB',
    bio: 'Oversees Testly candidate advisory and registration compliance. Has personally audited and resolved over 3,500 candidate passport mismatches across Telangana, Andhra Pradesh, and Karnataka. Established the ₹199 zero-defect pre-check framework.',
    specialties: ['GRE General Test', 'TOEFL iBT', 'GMAT Focus', 'Passport & Identification Compliance'],
    examsHandled: 3500,
    verificationBadge: 'Verified Chief Strategist',
    linkedin: 'https://www.linkedin.com/in/rahul-bathula'
  },

  arjun_varma: {
    id: 'arjun_varma',
    name: 'Arjun Varma',
    role: 'Senior Venue & Prometric Specialist',
    credentials: 'Former Test Center Operations Coordinator, 5+ Years',
    experience: '5+ Years',
    avatar: 'AV',
    bio: 'Specialist in computerized venue logistics across Prometric Madhapur and Pearson Begumpet. Expert in emergency slot tracking, test-day biometric protocols, and rescheduling policies.',
    specialties: ['Prometric Testing Protocol', 'Pearson VUE Logistics', 'GRE Emergency Slot Booking'],
    examsHandled: 1200,
    verificationBadge: 'Test Venue Operations Expert'
  },

  kavya_s: {
    id: 'kavya_s',
    name: 'Kavya S.',
    role: 'Lead English Language Assessment Advisor',
    credentials: 'IELTS Band 8.5, PTE 88/90, British Council Certified Trainer',
    experience: '6+ Years',
    avatar: 'KS',
    bio: 'Guides candidates on selecting between IELTS Academic, PTE Academic, and Duolingo DET based on university acceptance thresholds and visa requirements for Australia, UK, Canada, and the USA.',
    specialties: ['IELTS Academic & General', 'PTE Academic', 'Duolingo DET', 'Australian PR English Points'],
    examsHandled: 1800,
    verificationBadge: 'Certified Language Specialist'
  },

  priya_nair: {
    id: 'priya_nair',
    name: 'Priya Nair',
    role: 'Head of Candidate Success & Documentation',
    credentials: 'Postgraduate in International Education Quality Systems',
    experience: '4+ Years',
    avatar: 'PN',
    bio: 'Directs the candidate verification pipeline ensuring 99.8% first-time test entry clearance. Oversees at-home test environment compliance for Duolingo DET and GRE at Home.',
    specialties: ['Zero-Defect ID Verification', 'At-Home Test Rules', 'Candidate Experience Quality'],
    examsHandled: 2400,
    verificationBadge: 'Quality & Verification Lead'
  }
};

export const PROFESSIONALS_LIST = Object.values(PROFESSIONALS);

export function getProfessionalById(id) {
  if (!id) return PROFESSIONALS.rahul_bathula;
  return PROFESSIONALS[id.toLowerCase()] || PROFESSIONALS.rahul_bathula;
}
