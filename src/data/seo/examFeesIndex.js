/**
 * TESTLY EVERGREEN EXAM FEES DATABASE & FRESHNESS MONITOR
 * Tracks official fees in India, Forex conversion costs, Testly voucher prices,
 * and content freshness health status (GREEN / YELLOW / RED).
 */

import { EXAM_DATA } from '../../components/PriceProof';

export const EXAM_FEES_INDEX = {
  GRE: {
    id: 'GRE',
    name: 'GRE® General Test',
    org: 'Educational Testing Service (ETS)',
    officialCurrency: 'USD 220',
    refPriceINR: EXAM_DATA.GRE.refPrice,
    testlyPriceINR: EXAM_DATA.GRE.testlyPrice,
    savingINR: EXAM_DATA.GRE.saving,
    serviceFeeINR: 199,
    forexMarkupPercentage: '3.5% + 18% GST',
    estimatedBankForexExtra: '₹1,150',
    lastVerifiedDate: '2026-09-16',
    verifiedBy: 'Rahul Bathula',
    validUntil: '2026-12-31',
    freshnessStatus: 'GREEN', // 'GREEN' | 'YELLOW' | 'RED'
    eligibility: 'All Indian Test Centers & At-Home Edition',
    voucherValidityPeriod: 'Up to 12 months for appointment booking',
    currencySavedReason: 'Eliminates international credit card foreign transaction markup and DCC fees.'
  },

  TOEFL: {
    id: 'TOEFL',
    name: 'TOEFL iBT® Test',
    org: 'Educational Testing Service (ETS)',
    officialCurrency: 'USD 205',
    refPriceINR: EXAM_DATA.TOEFL.refPrice,
    testlyPriceINR: EXAM_DATA.TOEFL.testlyPrice,
    savingINR: EXAM_DATA.TOEFL.saving,
    serviceFeeINR: 199,
    forexMarkupPercentage: '3.5% + 18% GST',
    estimatedBankForexExtra: '₹1,050',
    lastVerifiedDate: '2026-09-16',
    verifiedBy: 'Rahul Bathula',
    validUntil: '2026-12-31',
    freshnessStatus: 'GREEN',
    eligibility: 'All Indian Test Centers & Home Edition',
    voucherValidityPeriod: 'Up to 12 months for appointment booking',
    currencySavedReason: 'Billed cleanly in INR via domestic UPI or NetBanking.'
  },

  IELTS: {
    id: 'IELTS',
    name: 'IELTS Academic & General Training',
    org: 'IDP Education / British Council',
    officialCurrency: 'INR 17,000 Flat',
    refPriceINR: EXAM_DATA.IELTS.refPrice,
    testlyPriceINR: EXAM_DATA.IELTS.testlyPrice,
    savingINR: EXAM_DATA.IELTS.saving,
    serviceFeeINR: 199,
    forexMarkupPercentage: '0% (Direct INR)',
    estimatedBankForexExtra: '₹0',
    lastVerifiedDate: '2026-09-16',
    verifiedBy: 'Kavya S.',
    validUntil: '2026-12-31',
    freshnessStatus: 'GREEN',
    eligibility: 'Computer-delivered & Paper-based testing across India',
    voucherValidityPeriod: '90 days from issuance',
    currencySavedReason: 'Corporate bulk partner allotment fee schedule.'
  },

  PTE: {
    id: 'PTE',
    name: 'PTE Academic / PTE Core',
    org: 'Pearson VUE',
    officialCurrency: 'INR 18,000 Flat',
    refPriceINR: EXAM_DATA.PTE.refPrice,
    testlyPriceINR: EXAM_DATA.PTE.testlyPrice,
    savingINR: EXAM_DATA.PTE.saving,
    serviceFeeINR: 199,
    forexMarkupPercentage: '0% (Direct INR)',
    estimatedBankForexExtra: '₹0',
    lastVerifiedDate: '2026-09-16',
    verifiedBy: 'Kavya S.',
    validUntil: '2026-12-31',
    freshnessStatus: 'GREEN',
    eligibility: 'All Pearson Professional Centers in India',
    voucherValidityPeriod: '11 months from date of procurement',
    currencySavedReason: 'Direct institutional voucher pricing.'
  },

  Duolingo: {
    id: 'Duolingo',
    name: 'Duolingo English Test (DET)',
    org: 'Duolingo, Inc.',
    officialCurrency: 'USD 65',
    refPriceINR: EXAM_DATA.Duolingo.refPrice,
    testlyPriceINR: EXAM_DATA.Duolingo.testlyPrice,
    savingINR: EXAM_DATA.Duolingo.saving,
    serviceFeeINR: 199,
    forexMarkupPercentage: '3.5% + 18% GST',
    estimatedBankForexExtra: '₹350',
    lastVerifiedDate: '2026-09-16',
    verifiedBy: 'Priya Nair',
    validUntil: '2026-12-31',
    freshnessStatus: 'GREEN',
    eligibility: 'Online proctored at-home test',
    voucherValidityPeriod: '21 days on englishtest.duolingo.com',
    currencySavedReason: 'Prepaid institutional test credits.'
  },

  GMAT: {
    id: 'GMAT',
    name: 'GMAT™ Focus Edition',
    org: 'Graduate Management Admission Council (GMAC)',
    officialCurrency: 'USD 300',
    refPriceINR: EXAM_DATA.GMAT.refPrice,
    testlyPriceINR: EXAM_DATA.GMAT.testlyPrice,
    savingINR: EXAM_DATA.GMAT.saving,
    serviceFeeINR: 199,
    forexMarkupPercentage: '3.5% + 18% GST',
    estimatedBankForexExtra: '₹1,500',
    lastVerifiedDate: '2026-09-16',
    verifiedBy: 'Rahul Bathula',
    validUntil: '2026-12-31',
    freshnessStatus: 'GREEN',
    eligibility: 'Test Center & Online Proctored',
    voucherValidityPeriod: '6 months from issuance',
    currencySavedReason: 'Institutional fee schedule on premier business entrance test.'
  }
};

export const EXAM_FEES_LIST = Object.values(EXAM_FEES_INDEX);

/**
 * Freshness check helper
 * GREEN: verified < 30 days ago
 * YELLOW: verified 30-60 days ago
 * RED: verified > 60 days ago (requires immediate price audit)
 */
export function calculateFreshness(dateStr) {
  if (!dateStr) return 'RED';
  const now = new Date();
  const verified = new Date(dateStr);
  const diffDays = Math.floor((now - verified) / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) return 'GREEN';
  if (diffDays <= 60) return 'YELLOW';
  return 'RED';
}
