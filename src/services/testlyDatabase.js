/**
 * Testly Database & Entitlements Service (Testly OS Core)
 * Single Source of Truth for:
 * - Providers
 * - Commercial Booking Rails
 * - Suppliers & Partner Portals
 * - Compliance Records & Verification Audits
 * - Exam Offerings & Pricing Records (with multi-channel Kill Switch)
 * - Campus Target Accounts
 * 
 * Doctrine: NO BUSINESS-CRITICAL CLAIM MAY EXIST IN MORE THAN ONE SOURCE OF TRUTH.
 */

const DB_STORAGE_KEY = 'testly_database_v1';

// ── 1. Canonical Relational Seed Data ──

export const SEED_PROVIDERS = [
  {
    id: 'ets',
    name: 'Educational Testing Service (ETS)',
    headquarters: 'Princeton, NJ, USA',
    exams: ['GRE', 'TOEFL'],
    website: 'https://www.ets.org',
    terms_reference: 'ETS India Third-Party Bulletin Sec 4.2',
  },
  {
    id: 'pearson_vue',
    name: 'Pearson VUE / Pearson plc',
    headquarters: 'London, UK / Bloomington, MN, USA',
    exams: ['PTE'],
    website: 'https://www.pearsonpte.com',
    terms_reference: 'PTE Authorized Partner Agreement & Portal Guidelines 2026',
  },
  {
    id: 'idp',
    name: 'IDP Education / British Council Alliance',
    headquarters: 'Melbourne, Australia',
    exams: ['IELTS'],
    website: 'https://www.ieltsidpindia.com',
    terms_reference: 'IDP Accredited India Alliance Framework 2026',
  },
  {
    id: 'gmac',
    name: 'Graduate Management Admission Council (GMAC)',
    headquarters: 'Reston, VA, USA',
    exams: ['GMAT'],
    website: 'https://www.mba.com',
    terms_reference: 'GMAC Payment and Voucher Resale Policy Sec 3 (No Intermediary Transfer)',
  },
  {
    id: 'duolingo',
    name: 'Duolingo, Inc.',
    headquarters: 'Pittsburgh, PA, USA',
    exams: ['DET'],
    website: 'https://englishtest.duolingo.com',
    terms_reference: 'Duolingo Institutional Access Agreement 2026',
  },
];

export const SEED_BOOKING_METHODS = [
  {
    id: 'DIRECT',
    name: 'Direct Official Booking Assistance',
    description: 'Assisted registration directly on the provider portal with character audit and zero markups.',
    requires_partner_portal: false,
    permits_voucher_resale: false,
  },
  {
    id: 'AUTHORIZED_AGENT',
    name: 'Authorized Agent Portal Booking',
    description: 'Accredited partner portal (e.g. PTE Partner Desk) with zero candidate password sharing.',
    requires_partner_portal: true,
    permits_voucher_resale: false,
  },
  {
    id: 'PROVIDER_PARTNER_PORTAL',
    name: 'Provider Partner Allocation Desk',
    description: 'Direct institutional booking interface with official institutional settlement.',
    requires_partner_portal: true,
    permits_voucher_resale: false,
  },
  {
    id: 'PERMITTED_VOUCHER',
    name: 'Permitted Institutional Voucher',
    description: 'Legitimate prepaid promotional code with verified institutional provenance and territory rights.',
    requires_partner_portal: false,
    permits_voucher_resale: true,
  },
  {
    id: 'REFERRAL',
    name: 'Institutional Referral Token',
    description: 'Official promotional token or fee waiver token without secondary market transfer.',
    requires_partner_portal: false,
    permits_voucher_resale: false,
  },
  {
    id: 'INFORMATION_ONLY',
    name: 'Information & Guidance Only',
    description: 'Advisory guidance and exam profile auditing only. No commercial fee discount permitted.',
    requires_partner_portal: false,
    permits_voucher_resale: false,
  },
];

export const SEED_SUPPLIERS = [
  {
    id: 'SUP-ETS-IND-01',
    name: 'Subcontinent Educational Distribution Hub A',
    provider_id: 'ets',
    status: 'VERIFIED',
    contract_ref: 'CONTRACT-ETS-IN-2026-04',
    scope: 'Institutional Prepaid Promotion Codes for India Territory',
    sla_hours: 2,
    last_audit_date: '2026-09-01',
  },
  {
    id: 'SUP-PEAR-IND-02',
    name: 'Authorized PTE Institutional Partner Network',
    provider_id: 'pearson_vue',
    status: 'VERIFIED',
    contract_ref: 'CONTRACT-PTE-PTN-8819',
    scope: 'PTE Academic Partner Portal Booking (No Candidate Credentials)',
    sla_hours: 1,
    last_audit_date: '2026-09-05',
  },
  {
    id: 'SUP-IDP-IND-03',
    name: 'IDP Accredited India Alliance',
    provider_id: 'idp',
    status: 'VERIFIED',
    contract_ref: 'CONTRACT-IDP-AA-2026-11',
    scope: 'Institutional Candidate Allocation Desk',
    sla_hours: 2,
    last_audit_date: '2026-09-02',
  },
  {
    id: 'SUP-GMAC-DIRECT',
    name: 'Official GMAC Portal (Advisory / Direct Only)',
    provider_id: 'gmac',
    status: 'RESTRICTED',
    contract_ref: 'GMAC-PUBLIC-POLICY-2026',
    scope: 'Direct registration guidance only. Voucher resale prohibited by GMAC terms.',
    sla_hours: 0,
    last_audit_date: '2026-09-15',
  },
  {
    id: 'SUP-DUO-CORP-05',
    name: 'Duolingo Institutional Access Desk',
    provider_id: 'duolingo',
    status: 'VERIFIED',
    contract_ref: 'CONTRACT-DET-EDU-401',
    scope: 'Bulk Educational Evaluation Access Tokens',
    sla_hours: 2,
    last_audit_date: '2026-09-08',
  },
];

export const SEED_COMPLIANCE_RECORDS = [
  {
    id: 'COMP-GRE-01',
    offering_id: 'OFFER-GRE-IND',
    compliance_status: 'VERIFIED', // DRAFT | UNDER_REVIEW | VERIFIED | RESTRICTED | SUSPENDED | EXPIRED
    authorization_evidence_id: 'EVID-GRE-2026-Q1',
    supplier_contract_id: 'SUP-ETS-IND-01',
    provider_terms_reference: 'ETS India Third-Party Bulletin Sec 4.2',
    territory_verified: true,
    customer_type_verified: true,
    distribution_right_verified: true,
    marketing_right_verified: true,
    candidate_authorization_required: true,
    provider_agent_authorization_required: false,
    supplier_resale_right_required: true,
    trademark_review_required: true,
    marketing_claim_review_required: true,
    last_reviewed_at: '2026-09-01T10:00:00Z',
    reviewed_by: 'Legal & Compliance Officer',
    notes: 'Verified institutional promotional allocation for Indian candidates with passport validation.',
  },
  {
    id: 'COMP-TOEFL-01',
    offering_id: 'OFFER-TOEFL-IND',
    compliance_status: 'VERIFIED',
    authorization_evidence_id: 'EVID-TOEFL-2026-Q1',
    supplier_contract_id: 'SUP-ETS-IND-01',
    provider_terms_reference: 'ETS India Third-Party Bulletin Sec 4.2',
    territory_verified: true,
    customer_type_verified: true,
    distribution_right_verified: true,
    marketing_right_verified: true,
    candidate_authorization_required: true,
    provider_agent_authorization_required: false,
    supplier_resale_right_required: true,
    trademark_review_required: true,
    marketing_claim_review_required: true,
    last_reviewed_at: '2026-09-01T10:00:00Z',
    reviewed_by: 'Legal & Compliance Officer',
    notes: 'Verified institutional promotional allocation for TOEFL iBT India bookings.',
  },
  {
    id: 'COMP-PTE-01',
    offering_id: 'OFFER-PTE-IND',
    compliance_status: 'VERIFIED',
    authorization_evidence_id: 'EVID-PEAR-PTN-2026',
    supplier_contract_id: 'SUP-PEAR-IND-02',
    provider_terms_reference: 'Pearson PTE Partner Guidelines Sec 6 (Client Bookings)',
    territory_verified: true,
    customer_type_verified: true,
    distribution_right_verified: true,
    marketing_right_verified: true,
    candidate_authorization_required: true,
    provider_agent_authorization_required: true,
    supplier_resale_right_required: false,
    trademark_review_required: true,
    marketing_claim_review_required: true,
    last_reviewed_at: '2026-09-05T14:30:00Z',
    reviewed_by: 'Legal & Compliance Officer',
    notes: 'PTE Partner model. Registrations executed on partner portal. Zero myPTE password collection permitted.',
  },
  {
    id: 'COMP-IELTS-01',
    offering_id: 'OFFER-IELTS-IND',
    compliance_status: 'VERIFIED',
    authorization_evidence_id: 'EVID-IDP-AA-2026',
    supplier_contract_id: 'SUP-IDP-IND-03',
    provider_terms_reference: 'IDP India Candidate Alliance Sec 8',
    territory_verified: true,
    customer_type_verified: true,
    distribution_right_verified: true,
    marketing_right_verified: true,
    candidate_authorization_required: true,
    provider_agent_authorization_required: false,
    supplier_resale_right_required: true,
    trademark_review_required: true,
    marketing_claim_review_required: true,
    last_reviewed_at: '2026-09-02T11:00:00Z',
    reviewed_by: 'Legal & Compliance Officer',
    notes: 'Verified institutional voucher pass-through for Computer-delivered & Pen-paper IELTS.',
  },
  {
    id: 'COMP-DET-01',
    offering_id: 'OFFER-DET-IND',
    compliance_status: 'VERIFIED',
    authorization_evidence_id: 'EVID-DET-EDU-2026',
    supplier_contract_id: 'SUP-DUO-CORP-05',
    provider_terms_reference: 'Duolingo Institutional Evaluation Terms 2026',
    territory_verified: true,
    customer_type_verified: true,
    distribution_right_verified: true,
    marketing_right_verified: true,
    candidate_authorization_required: true,
    provider_agent_authorization_required: false,
    supplier_resale_right_required: true,
    trademark_review_required: true,
    marketing_claim_review_required: true,
    last_reviewed_at: '2026-09-08T09:15:00Z',
    reviewed_by: 'Legal & Compliance Officer',
    notes: 'Institutional coupon code applied directly on Duolingo English Test checkout.',
  },
  {
    id: 'COMP-GMAT-01',
    offering_id: 'OFFER-GMAT-IND',
    compliance_status: 'RESTRICTED', // Strict GMAT compliance
    authorization_evidence_id: 'EVID-GMAC-POLICY-DOC',
    supplier_contract_id: 'SUP-GMAC-DIRECT',
    provider_terms_reference: 'GMAC Payment and Voucher Resale Policy Sec 3 (Prohibits Resale)',
    territory_verified: true,
    customer_type_verified: false,
    distribution_right_verified: false, // NO voucher resale allowed
    marketing_right_verified: false,
    candidate_authorization_required: true,
    provider_agent_authorization_required: false,
    supplier_resale_right_required: false,
    trademark_review_required: true,
    marketing_claim_review_required: true,
    last_reviewed_at: '2026-09-15T12:00:00Z',
    reviewed_by: 'Legal & Compliance Officer',
    notes: 'GMAC prohibits voucher resale/transfer. Offering strictly restricted to assisted direct booking & guidance only. No voucher discounts marketed.',
  },
];

export const SEED_EXAM_OFFERINGS = [
  {
    id: 'OFFER-GRE-IND',
    exam_id: 'GRE',
    full_name: 'GRE® General Test',
    provider_id: 'ets',
    country: 'IND',
    currency: 'INR',
    reference_price: 26500,
    testly_price: 19000,
    service_fee: 199,
    saving: 7500,
    booking_method_id: 'PERMITTED_VOUCHER',
    supplier_id: 'SUP-ETS-IND-01',
    compliance_record_id: 'COMP-GRE-01',
    commercial_status: 'VERIFIED',     // VERIFIED | RESTRICTED | INFORMATION_ONLY | SUSPENDED
    marketing_status: 'APPROVED',       // APPROVED | RESTRICTED | SUSPENDED
    compliance_status: 'VERIFIED',      // DRAFT | UNDER_REVIEW | VERIFIED | RESTRICTED | SUSPENDED | EXPIRED
    // Multi-Channel Kill Switch:
    public_status: 'ACTIVE',           // ACTIVE | SUSPENDED
    sales_status: 'ACTIVE',            // ACTIVE | SUSPENDED
    checkout_status: 'ACTIVE',         // ACTIVE | SUSPENDED
    seo_status: 'ACTIVE',              // ACTIVE | SUSPENDED
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    last_verified_at: '2026-09-15T09:30:00Z',
    verified_by: 'Compliance Desk Officer',
    public_description: 'Official GRE General Test registration with institutional allocation and passport audit.',
    customer_terms_version: 'TERMS-V2.1-2026',
    turnaround_hours: 2,
    badge: 'Popular for Fall 2026',
  },
  {
    id: 'OFFER-TOEFL-IND',
    exam_id: 'TOEFL',
    full_name: 'TOEFL iBT® Test',
    provider_id: 'ets',
    country: 'IND',
    currency: 'INR',
    reference_price: 24900,
    testly_price: 18500,
    service_fee: 199,
    saving: 6400,
    booking_method_id: 'PERMITTED_VOUCHER',
    supplier_id: 'SUP-ETS-IND-01',
    compliance_record_id: 'COMP-TOEFL-01',
    commercial_status: 'VERIFIED',
    marketing_status: 'APPROVED',
    compliance_status: 'VERIFIED',
    public_status: 'ACTIVE',
    sales_status: 'ACTIVE',
    checkout_status: 'ACTIVE',
    seo_status: 'ACTIVE',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    last_verified_at: '2026-09-15T09:30:00Z',
    verified_by: 'Compliance Desk Officer',
    public_description: 'Official TOEFL iBT test registration with institutional booking advantage and slot tracking.',
    customer_terms_version: 'TERMS-V2.1-2026',
    turnaround_hours: 2,
    badge: 'USA & Canada Accepted',
  },
  {
    id: 'OFFER-PTE-IND',
    exam_id: 'PTE',
    full_name: 'PTE Academic™',
    provider_id: 'pearson_vue',
    country: 'IND',
    currency: 'INR',
    reference_price: 18000,
    testly_price: 13500,
    service_fee: 199,
    saving: 4500,
    booking_method_id: 'AUTHORIZED_AGENT',
    supplier_id: 'SUP-PEAR-IND-02',
    compliance_record_id: 'COMP-PTE-01',
    commercial_status: 'VERIFIED',
    marketing_status: 'APPROVED',
    compliance_status: 'VERIFIED',
    public_status: 'ACTIVE',
    sales_status: 'ACTIVE',
    checkout_status: 'ACTIVE',
    seo_status: 'ACTIVE',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    last_verified_at: '2026-09-15T09:30:00Z',
    verified_by: 'Compliance Desk Officer',
    public_description: 'Authorized PTE Partner registration with zero password sharing; verified directly in candidate myPTE account.',
    customer_terms_version: 'TERMS-V2.1-2026',
    turnaround_hours: 1,
    badge: 'Fast 2-Day Results',
  },
  {
    id: 'OFFER-IELTS-IND',
    exam_id: 'IELTS',
    full_name: 'IELTS Academic (IDP)',
    provider_id: 'idp',
    country: 'IND',
    currency: 'INR',
    reference_price: 17000,
    testly_price: 13000,
    service_fee: 199,
    saving: 4000,
    booking_method_id: 'PERMITTED_VOUCHER',
    supplier_id: 'SUP-IDP-IND-03',
    compliance_record_id: 'COMP-IELTS-01',
    commercial_status: 'VERIFIED',
    marketing_status: 'APPROVED',
    compliance_status: 'VERIFIED',
    public_status: 'ACTIVE',
    sales_status: 'ACTIVE',
    checkout_status: 'ACTIVE',
    seo_status: 'ACTIVE',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    last_verified_at: '2026-09-15T09:30:00Z',
    verified_by: 'Compliance Desk Officer',
    public_description: 'Official IDP IELTS registration with center verification, speaking slot audit, and fee advantage.',
    customer_terms_version: 'TERMS-V2.1-2026',
    turnaround_hours: 3,
    badge: 'UK & Australia Gold Standard',
  },
  {
    id: 'OFFER-DET-IND',
    exam_id: 'DET',
    full_name: 'Duolingo English Test (DET)',
    provider_id: 'duolingo',
    country: 'IND',
    currency: 'INR',
    reference_price: 6300,
    testly_price: 4500,
    service_fee: 199,
    saving: 1800,
    booking_method_id: 'PERMITTED_VOUCHER',
    supplier_id: 'SUP-DUO-CORP-05',
    compliance_record_id: 'COMP-DET-01',
    commercial_status: 'VERIFIED',
    marketing_status: 'APPROVED',
    compliance_status: 'VERIFIED',
    public_status: 'ACTIVE',
    sales_status: 'ACTIVE',
    checkout_status: 'ACTIVE',
    seo_status: 'ACTIVE',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    last_verified_at: '2026-09-15T09:30:00Z',
    verified_by: 'Compliance Desk Officer',
    public_description: 'Instant Duolingo test token with 48-hour certified score report and room setup audit.',
    customer_terms_version: 'TERMS-V2.1-2026',
    turnaround_hours: 1,
    badge: '1-Hour Test At Home',
  },
  {
    id: 'OFFER-GMAT-IND',
    exam_id: 'GMAT',
    full_name: 'GMAT™ Focus Edition',
    provider_id: 'gmac',
    country: 'IND',
    currency: 'INR',
    reference_price: 28000,
    testly_price: 28000, // No discount claim — direct settlement
    service_fee: 199,
    saving: 0,
    booking_method_id: 'DIRECT',
    supplier_id: 'SUP-GMAC-DIRECT',
    compliance_record_id: 'COMP-GMAT-01',
    commercial_status: 'INFORMATION_ONLY', // Strictly informational/advisory
    marketing_status: 'RESTRICTED',        // No discount or voucher marketing claims allowed
    compliance_status: 'RESTRICTED',
    public_status: 'ACTIVE',              // Active as advisory guidance only
    sales_status: 'ADVISORY_ONLY',
    checkout_status: 'ASSIST_ONLY',
    seo_status: 'INFO_ONLY',
    valid_from: '2026-01-01',
    valid_until: '2026-12-31',
    last_verified_at: '2026-09-15T09:30:00Z',
    verified_by: 'Compliance Desk Officer',
    public_description: 'Official GMAT Focus Edition registration guidance and passport auditing. Direct provider payment.',
    customer_terms_version: 'TERMS-V2.1-2026',
    turnaround_hours: 4,
    badge: 'Advisory Guidance Only',
  },
];

export const SEED_CAMPUS_TARGET_ACCOUNTS = [
  {
    id: 'CAMPUS-01',
    institution_name: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    city: 'Hyderabad',
    tier: 'Tier 1 Engineering',
    annual_aspirants: 450,
    pipeline_status: 'Prospecting', // Target Institution | Prospecting | Contacted | Meeting | Pilot | Active | Renewal
    target_intake: 'Fall 2026',
    primary_exams: ['GRE', 'TOEFL', 'IELTS'],
    assigned_officer: 'Rahul Bathula',
  },
  {
    id: 'CAMPUS-02',
    institution_name: 'VNR Vignana Jyothi Institute of Engineering & Technology (VNR VJIET)',
    city: 'Hyderabad',
    tier: 'Tier 1 Engineering',
    annual_aspirants: 520,
    pipeline_status: 'Prospecting',
    target_intake: 'Fall 2026',
    primary_exams: ['GRE', 'TOEFL', 'PTE'],
    assigned_officer: 'Arjun',
  },
  {
    id: 'CAMPUS-03',
    institution_name: 'Jawaharlal Nehru Technological University (JNTU Hyderabad)',
    city: 'Hyderabad',
    tier: 'State University',
    annual_aspirants: 800,
    pipeline_status: 'Target Institution',
    target_intake: 'Spring 2027',
    primary_exams: ['GRE', 'IELTS'],
    assigned_officer: 'Priya',
  },
  {
    id: 'CAMPUS-04',
    institution_name: 'RV College of Engineering (RVCE)',
    city: 'Bengaluru',
    tier: 'Tier 1 Engineering',
    annual_aspirants: 600,
    pipeline_status: 'Target Institution',
    target_intake: 'Fall 2026',
    primary_exams: ['GRE', 'TOEFL', 'PTE'],
    assigned_officer: 'Kavya',
  },
  {
    id: 'CAMPUS-05',
    institution_name: 'College of Engineering Pune (COEP Tech)',
    city: 'Pune',
    tier: 'Autonomous Engineering',
    annual_aspirants: 400,
    pipeline_status: 'Target Institution',
    target_intake: 'Fall 2026',
    primary_exams: ['GRE', 'IELTS'],
    assigned_officer: 'Rahul Bathula',
  },
];

// ── 2. Database Service Implementation ──

class TestlyDatabaseService {
  constructor() {
    this.data = this.loadOrInitialize();
  }

  loadOrInitialize() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(DB_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            providers: parsed.providers || SEED_PROVIDERS,
            booking_methods: parsed.booking_methods || SEED_BOOKING_METHODS,
            suppliers: parsed.suppliers || SEED_SUPPLIERS,
            compliance_records: parsed.compliance_records || SEED_COMPLIANCE_RECORDS,
            exam_offerings: parsed.exam_offerings || SEED_EXAM_OFFERINGS,
            campus_target_accounts: parsed.campus_target_accounts || SEED_CAMPUS_TARGET_ACCOUNTS,
          };
        }
      }
    } catch (e) {
      console.warn('Error loading Testly database from localStorage:', e);
    }

    const initial = {
      providers: SEED_PROVIDERS,
      booking_methods: SEED_BOOKING_METHODS,
      suppliers: SEED_SUPPLIERS,
      compliance_records: SEED_COMPLIANCE_RECORDS,
      exam_offerings: SEED_EXAM_OFFERINGS,
      campus_target_accounts: SEED_CAMPUS_TARGET_ACCOUNTS,
    };
    this.persist(initial);
    return initial;
  }

  persist(data) {
    this.data = data;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('testly_database_updated', { detail: data }));
      }
    } catch (e) {
      console.error('Failed to persist Testly database:', e);
    }
  }

  // ── Offerings Queries ──

  getOfferings(filter = {}) {
    let list = [...this.data.exam_offerings];
    if (filter.publicOnly) {
      list = list.filter((o) => o.public_status === 'ACTIVE');
    }
    if (filter.checkoutOnly) {
      list = list.filter((o) => o.checkout_status === 'ACTIVE');
    }
    if (filter.verifiedOnly) {
      list = list.filter((o) => o.compliance_status === 'VERIFIED');
    }
    return list;
  }

  getOfferingById(id) {
    return this.data.exam_offerings.find((o) => o.id === id || o.exam_id === id);
  }

  updateOffering(id, updates) {
    const nextOfferings = this.data.exam_offerings.map((o) => {
      if (o.id === id || o.exam_id === id) {
        return {
          ...o,
          ...updates,
          last_verified_at: new Date().toISOString(),
        };
      }
      return o;
    });
    this.persist({ ...this.data, exam_offerings: nextOfferings });
  }

  // ── Kill Switch Action ──

  toggleOfferingKillSwitch(offeringId, channel = 'checkout_status', forcedStatus = null) {
    const offering = this.getOfferingById(offeringId);
    if (!offering) return null;

    const currentStatus = offering[channel] || 'ACTIVE';
    const nextStatus = forcedStatus || (currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');

    this.updateOffering(offering.id, { [channel]: nextStatus });
    return nextStatus;
  }

  // ── Compliance Queries ──

  getComplianceRecords() {
    return [...this.data.compliance_records];
  }

  getSuppliers() {
    return [...this.data.suppliers];
  }

  getBookingMethods() {
    return [...this.data.booking_methods];
  }

  getProviders() {
    return [...this.data.providers];
  }

  // ── Impact Query (Investor Grade) ──
  // "Which students/leads are affected if Supplier X loses authorization?"
  getAffectedStudentsBySupplier(supplierId, leads = []) {
    const offeringIds = this.data.exam_offerings
      .filter((o) => o.supplier_id === supplierId)
      .map((o) => o.exam_id);

    const affectedLeads = leads.filter((lead) => {
      return offeringIds.includes(lead.exam);
    });

    return {
      supplierId,
      affectedExams: offeringIds,
      affectedLeadCount: affectedLeads.length,
      affectedLeads,
    };
  }

  // ── Campus Target Accounts ──

  getCampusTargetAccounts() {
    return [...this.data.campus_target_accounts];
  }

  updateCampusTargetStatus(accountId, newStatus) {
    const nextAccounts = this.data.campus_target_accounts.map((acc) => {
      if (acc.id === accountId) {
        return { ...acc, pipeline_status: newStatus };
      }
      return acc;
    });
    this.persist({ ...this.data, campus_target_accounts: nextAccounts });
  }

  // ── Reset to canonical seed ──
  resetDatabase() {
    const seed = {
      providers: SEED_PROVIDERS,
      booking_methods: SEED_BOOKING_METHODS,
      suppliers: SEED_SUPPLIERS,
      compliance_records: SEED_COMPLIANCE_RECORDS,
      exam_offerings: SEED_EXAM_OFFERINGS,
      campus_target_accounts: SEED_CAMPUS_TARGET_ACCOUNTS,
    };
    this.persist(seed);
  }
}

export const testlyDb = new TestlyDatabaseService();

// Formatter helper
export function formatINR(val) {
  if (typeof val !== 'number') return val;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}
