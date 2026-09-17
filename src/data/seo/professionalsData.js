/**
 * TESTLY E-E-A-T PROFESSIONALS & FOUNDING LEADERSHIP
 * Testly is founded and operated strictly by 2 dedicated professionals:
 * 1. Rahul Bathula — Founder & Chief Exam Strategist
 * 2. Deepak Royal — Co-Founder & Head of Operations
 *
 * Every candidate booking and passport audit is handled personally by them.
 */

export const PROFESSIONALS = {
  rahul_bathula: {
    id: 'rahul_bathula',
    name: 'Rahul Bathula',
    role: 'Founder & Chief Exam Strategist',
    credentials: 'B.Tech, 7+ Years Overseas Exam Advisory',
    experience: '7+ Years',
    avatar: 'RB',
    bio: 'Founder of Testly. Oversees candidate advisory, registration compliance, and institutional voucher allocations. Has personally audited and resolved thousands of candidate passport and identity mismatches across India, pioneering the ₹199 zero-defect pre-check framework.',
    specialties: ['GRE General Test', 'TOEFL iBT', 'GMAT Focus', 'Passport & Identification Compliance'],
    examsHandled: 3500,
    verificationBadge: 'Verified Founder & Chief Strategist',
    linkedin: 'https://www.linkedin.com/in/rahul-bathula'
  },

  deep_royal: {
    id: 'deep_royal',
    name: 'Deepak Royal',
    role: 'Co-Founder & Head of Operations',
    credentials: 'Co-Founder, 6+ Years Exam Logistics & Verification',
    experience: '6+ Years',
    avatar: 'DR',
    bio: 'Co-Founder of Testly. Leads live candidate booking operations, slot recovery, test venue audits, and Pearson / Prometric / IDP center coordination. Personally executes and audits candidate registrations to ensure 100% zero-defect test morning check-ins.',
    specialties: ['Pearson VUE Logistics', 'Prometric Venue Coordination', 'PTE & IELTS Slot Booking', 'Candidate Verification Ops'],
    examsHandled: 2800,
    verificationBadge: 'Verified Co-Founder & Operations Lead',
    image: '/assets/images/deepak-royal-founder.jpg'
  }
};

export const PROFESSIONALS_LIST = Object.values(PROFESSIONALS);

export function getProfessionalById(id) {
  if (!id) return PROFESSIONALS.rahul_bathula;
  const key = id.toLowerCase();
  if (key === 'deep_royal' || key === 'deepak_royal' || key.includes('deep') || key.includes('royal')) {
    return PROFESSIONALS.deep_royal;
  }
  return PROFESSIONALS[key] || PROFESSIONALS.rahul_bathula;
}
