/**
 * TESTLY MASTER EXAM OFFERINGS DATABASE (exam_offerings)
 * Single Source of Truth across Website, Ads, Sales Operating System, SEO, and Pricing.
 * 
 * HARVEY SPECTER DOCTRINE:
 * "No salesperson has one price. Website has another. Ads have another.
 *  Every price, supplier status, marketing clearance, and registration method
 *  derives strictly from this database."
 */

export const EXAM_OFFERINGS = {
  GRE: {
    id: 'GRE',
    exam: 'GRE® General Test',
    shortName: 'GRE',
    provider: 'Educational Testing Service (ETS)',
    providerAbbr: 'ETS',
    country: 'India',
    reference_price: 26500,
    testly_price: 19000,
    saving: 7500,
    service_fee: 199,
    get total_with_service() { return this.testly_price + this.service_fee; },
    booking_method: 'Institutional Prepaid Promotion Code',
    supplier: 'Authorized Institutional Distributor Tier-1',
    supplier_contract_id: 'SUP-ETS-IND-2026-A',
    authorization_status: 'ACTIVE_COMPLIANT',
    marketing_status: 'PUBLIC_CLEARED',
    last_verified: '2026-09-16',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    official_currency: 'USD 220 (~₹26,500 with banking forex & GST)',
    compliance_notes: 'Billed cleanly in INR. Requires Candidate Agency Agreement. Nominative fair use disclaimer mandated.',
    test_venues_supported: 'Prometric Test Centers across India & GRE at Home Edition',
    key_value_prop: 'Save ₹7,500 on official fee + ₹199 zero-defect passport name audit'
  },

  TOEFL: {
    id: 'TOEFL',
    exam: 'TOEFL iBT® Test',
    shortName: 'TOEFL',
    provider: 'Educational Testing Service (ETS)',
    providerAbbr: 'ETS',
    country: 'India',
    reference_price: 24900,
    testly_price: 18500,
    saving: 6400,
    service_fee: 199,
    get total_with_service() { return this.testly_price + this.service_fee; },
    booking_method: 'Official ETS Institutional Voucher',
    supplier: 'Authorized Institutional Distributor Tier-1',
    supplier_contract_id: 'SUP-ETS-IND-2026-A',
    authorization_status: 'ACTIVE_COMPLIANT',
    marketing_status: 'PUBLIC_CLEARED',
    last_verified: '2026-09-16',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    official_currency: 'USD 205 (~₹24,900 with banking forex & GST)',
    compliance_notes: 'Billed cleanly in INR via domestic UPI. Eliminates international card declines.',
    test_venues_supported: 'All Prometric & Authorized ETS Venues in India + Home Edition',
    key_value_prop: 'Save ₹6,400 + full registration assistance & slot reservation guidance'
  },

  IELTS: {
    id: 'IELTS',
    exam: 'IELTS Academic & General Training',
    shortName: 'IELTS',
    provider: 'IDP Education / British Council',
    providerAbbr: 'IDP',
    country: 'India',
    reference_price: 17000,
    testly_price: 13000,
    saving: 4000,
    service_fee: 199,
    get total_with_service() { return this.testly_price + this.service_fee; },
    booking_method: 'Authorized Partner Allocation Code',
    supplier: 'Accredited B2B Channel Partner Network',
    supplier_contract_id: 'SUP-IDP-IND-2026-B',
    authorization_status: 'ACTIVE_COMPLIANT',
    marketing_status: 'PUBLIC_CLEARED',
    last_verified: '2026-09-16',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    official_currency: 'INR 17,000 Flat',
    compliance_notes: 'Valid for Computer-delivered and Paper-based IELTS across all Indian cities.',
    test_venues_supported: 'Official IDP Test Centers across India',
    key_value_prop: 'Save ₹4,000 on official fee + fast slot identification during rush season'
  },

  PTE: {
    id: 'PTE',
    exam: 'PTE Academic / PTE Core',
    shortName: 'PTE',
    provider: 'Pearson VUE',
    providerAbbr: 'Pearson',
    country: 'India',
    reference_price: 18000,
    testly_price: 13500,
    saving: 4500,
    service_fee: 199,
    get total_with_service() { return this.testly_price + this.service_fee; },
    booking_method: 'Pearson Authorized Prepaid Voucher',
    supplier: 'Pearson Commercial Reseller Agreement',
    supplier_contract_id: 'SUP-PEAR-IND-2026-C',
    authorization_status: 'ACTIVE_COMPLIANT',
    marketing_status: 'PUBLIC_CLEARED',
    last_verified: '2026-09-16',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    official_currency: 'INR 18,000 Flat',
    compliance_notes: 'Strict expiration tracking. Minimum 90 days validity guaranteed upon issue.',
    test_venues_supported: 'All Pearson Professional Centers in India',
    key_value_prop: 'Save ₹4,500 on official fee + rapid 48-hour score turnaround advisory'
  },

  Duolingo: {
    id: 'Duolingo',
    exam: 'Duolingo English Test (DET)',
    shortName: 'Duolingo',
    provider: 'Duolingo, Inc.',
    providerAbbr: 'Duolingo',
    country: 'India',
    reference_price: 6300,
    testly_price: 4500,
    saving: 1800,
    service_fee: 199,
    get total_with_service() { return this.testly_price + this.service_fee; },
    booking_method: 'Prepaid Institutional Test Credits',
    supplier: 'Institutional Access Allocation',
    supplier_contract_id: 'SUP-DUO-IND-2026-D',
    authorization_status: 'ACTIVE_COMPLIANT',
    marketing_status: 'PUBLIC_CLEARED',
    last_verified: '2026-09-16',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    official_currency: 'USD 65 (~₹6,300 with taxes)',
    compliance_notes: 'Candidate email direct assignment. Eliminates public scraper takedown risk.',
    test_venues_supported: 'Online Proctored At-Home Test',
    key_value_prop: 'Save ₹1,800 + at-home camera, lighting, and hardware compliance audit'
  },

  GMAT: {
    id: 'GMAT',
    exam: 'GMAT™ Focus Edition',
    shortName: 'GMAT',
    provider: 'Graduate Management Admission Council (GMAC)',
    providerAbbr: 'GMAC',
    country: 'India',
    reference_price: 28000,
    testly_price: 22000,
    saving: 6000,
    service_fee: 199,
    get total_with_service() { return this.testly_price + this.service_fee; },
    booking_method: 'GMAC Corporate Prepaid Voucher',
    supplier: 'Corporate B2B Partner Allocation',
    supplier_contract_id: 'SUP-GMAC-IND-2026-E',
    authorization_status: 'ACTIVE_COMPLIANT',
    marketing_status: 'PUBLIC_CLEARED',
    last_verified: '2026-09-16',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    official_currency: 'USD 300 (~₹28,000 with forex & GST)',
    compliance_notes: 'Supports both Test Center and Online appointments in India.',
    test_venues_supported: 'Pearson Professional Centers & Online Proctored',
    key_value_prop: 'Save ₹6,000 on management entrance test + premier B-school deadline guidance'
  }
};

export const EXAM_OFFERINGS_LIST = Object.values(EXAM_OFFERINGS);

export function getOfferingById(examId) {
  if (!examId) return EXAM_OFFERINGS.GRE;
  const key = examId.toUpperCase().replace(/\s+/g, '');
  if (key === 'DET' || key === 'DUOLINGO') return EXAM_OFFERINGS.Duolingo;
  return EXAM_OFFERINGS[key] || EXAM_OFFERINGS.GRE;
}

export function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}
