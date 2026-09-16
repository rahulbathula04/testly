/**
 * TESTLY REAL STUDENT QUESTION & OBJECTION ENGINE
 * Comprehensive question database derived from Google autocompletes,
 * candidate WhatsApp messages, and testing center rejection logs.
 */

export const STUDENT_QUESTIONS = [
  {
    id: 'q-passport-single-name',
    exam: 'ALL',
    category: 'REQUIREMENTS',
    question: 'What if my Indian passport has only a Given Name and blank Surname?',
    shortAnswer: 'ETS and Pearson will reject your test appointment if you enter your given name as surname without proper formatting.',
    detailedAnswer: 'In many Indian states (especially Telangana, Andhra Pradesh, and Tamil Nadu), passports frequently list the candidate full name in the "Given Name" field while leaving the "Surname" field blank. Official test booking systems (like ETS for GRE/TOEFL and Pearson for PTE) mandate a surname. If you guess and enter a period (".") or duplicate your name, test center invigilators are required by protocol to deny you entry. Testly audits your passport and configures your official testing account using accepted conventions (such as FNU or splitting according to testing authority guidelines) to ensure 100% test-day clearance.',
    popular: true,
    tags: ['passport', 'name-mismatch', 'ets', 'pearson', 'prometric']
  },
  {
    id: 'q-voucher-legitimacy',
    exam: 'ALL',
    category: 'VOUCHER',
    question: 'Are Testly exam vouchers genuine and official?',
    shortAnswer: 'Yes, 100% official institutional prepaid voucher codes applied directly on ETS, Pearson, IDP, or GMAC portals.',
    detailedAnswer: 'Testly vouchers are official prepaid promo codes procured via authorized corporate and institutional allocations. You do not share passwords or bank details. When you reach the checkout screen on the official exam website (such as ets.org or pearsonvue.com), you simply enter the voucher code. The payable balance instantly reduces to zero. The registration confirmation and admit card come directly from the official exam provider to your personal email.',
    popular: true,
    tags: ['voucher', 'legitimacy', 'official', 'ets', 'pearson']
  },
  {
    id: 'q-gre-fee-inr',
    exam: 'GRE',
    category: 'FEE',
    question: 'How much is the GRE exam fee in Indian Rupees (INR) in 2026?',
    shortAnswer: 'The official fee is USD 220, which converts to approximately ₹26,500 after banking forex markups and GST.',
    detailedAnswer: 'ETS charges USD 220 for the GRE General Test in India. When paying via an Indian credit or debit card, banks apply an international transaction markup of 3.5% plus 18% GST on the conversion fee, bringing the actual cost to approximately ₹26,500. Through Testly\'s authorized discounted voucher, candidates pay only ₹19,000 in flat INR via UPI or NetBanking, saving ₹7,500 instantly with zero foreign currency charges.',
    popular: true,
    tags: ['gre', 'fee', 'inr', 'savings', 'forex']
  },
  {
    id: 'q-service-fee-199',
    exam: 'ALL',
    category: 'SERVICE',
    question: 'What is Testly\'s ₹199 Professional Service fee for?',
    shortAnswer: 'A flat ₹199 human verification fee covering a complete passport name audit, slot selection, and booking assistance.',
    detailedAnswer: 'The ₹199 professional fee is completely separate from the discounted exam voucher. It covers dedicated human support by our test strategists: conducting a character-by-character passport name audit, checking test center slot availability, verifying your profile setup on the official testing portal, and guiding you until your booking is officially confirmed.',
    popular: true,
    tags: ['service-fee', '199', 'passport-check', 'support']
  },
  {
    id: 'q-ielts-vs-pte-australia',
    exam: 'IELTS',
    category: 'COMPARISON',
    question: 'Which exam is better for Australian immigration: IELTS or PTE Academic?',
    shortAnswer: 'PTE Academic is widely preferred for Australian PR due to rapid 48-hour score turnaround and objective computerized scoring.',
    detailedAnswer: 'Both IELTS and PTE Academic are accepted at 100% equivalence by the Australian Department of Home Affairs (DHA) for skilled migration visas (Subclass 189, 190, and 491). However, Indian candidates frequently choose PTE Academic because the entire exam is scored by computerized AI algorithms, eliminating human examiner subjectivity in writing and speaking. Additionally, PTE releases results in 48 hours compared to 3–5 days for computer-delivered IELTS and 13 days for paper-based IELTS.',
    popular: true,
    tags: ['ielts', 'pte', 'australia', 'immigration', 'pr']
  },
  {
    id: 'q-toefl-saving-india',
    exam: 'TOEFL',
    category: 'VOUCHER',
    question: 'How much can I save on TOEFL iBT in India using Testly?',
    shortAnswer: 'You save ₹6,400 on official ETS registration with a Testly voucher.',
    detailedAnswer: 'The standard TOEFL iBT fee charged by ETS is USD 205 (approximately ₹24,900 after foreign currency processing). Testly provides official ETS prepaid institutional vouchers for ₹18,500, delivering a direct net saving of ₹6,400. You also avoid foreign exchange spread charges.',
    popular: true,
    tags: ['toefl', 'voucher', 'savings', 'ets']
  },
  {
    id: 'q-prometric-madhapur-id',
    exam: 'GRE',
    category: 'TEST_CENTER',
    question: 'Can I use my Aadhaar card or Voter ID at Prometric Madhapur or Begumpet?',
    shortAnswer: 'NO. An original, valid, physical Indian Passport is the only accepted ID for GRE and TOEFL in India.',
    detailedAnswer: 'ETS and Prometric testing centers have a zero-tolerance ID policy in India. Government-issued photo IDs such as Aadhaar, PAN card, Voter ID, or Driving License are immediately rejected. Digital copies on DigiLocker or photocopies are also not permitted. You MUST bring your original physical unexpired Indian passport.',
    popular: true,
    tags: ['prometric', 'madhapur', 'id', 'passport', 'aadhaar']
  }
];

export function getQuestionsByExam(exam) {
  if (!exam || exam === 'ALL') return STUDENT_QUESTIONS;
  return STUDENT_QUESTIONS.filter(q => q.exam === exam || q.exam === 'ALL');
}
