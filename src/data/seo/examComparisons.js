/**
 * TESTLY FACTUAL EXAM COMPARISON ENGINE
 * Objective, data-driven comparisons without biased claims.
 */

export const EXAM_COMPARISONS = {
  'ielts-vs-pte': {
    id: 'ielts-vs-pte',
    title: 'IELTS vs PTE Academic for Indian Students (2026 Comparison)',
    metaTitle: 'IELTS vs PTE Academic (2026): Fees, Format, Scoring & Visa Acceptance Compared',
    metaDescription: 'Detailed factual comparison of IELTS and PTE Academic in India. Compare registration fees, scoring methods, score release timelines, and Australian/UK visa points.',
    exam1: 'IELTS',
    exam2: 'PTE',
    summary: 'While both IELTS and PTE Academic are accepted by thousands of global institutions and for Australian and UK migration, PTE Academic offers fully automated AI scoring and rapid 48-hour score turnaround, whereas IELTS provides human examiner interactions and wider university acceptance in North America.',
    comparisonPoints: [
      {
        feature: 'Standard Official Fee (India)',
        exam1Value: '₹17,000 Flat',
        exam2Value: '₹18,000 Flat',
        testlyAdvantage: 'Testly provides official vouchers saving up to ₹4,500 on PTE and ₹4,000 on IELTS.'
      },
      {
        feature: 'Scoring Method',
        exam1Value: 'Human examiners (Speaking & Writing) + Automated reading/listening',
        exam2Value: '100% automated AI algorithms for all 4 sections',
        testlyAdvantage: 'PTE eliminates regional examiner accent or handwriting bias.'
      },
      {
        feature: 'Result Turnaround Time',
        exam1Value: '3–5 days (Computer) / 13 days (Paper)',
        exam2Value: 'Typically within 48 hours (often under 24 hours)',
        testlyAdvantage: 'PTE is ideal for tight university or visa deadlines.'
      },
      {
        feature: 'Exam Duration',
        exam1Value: '2 Hours 45 Minutes (Speaking may be on separate day)',
        exam2Value: '2 Hours (All sections completed in one single sitting)',
        testlyAdvantage: 'PTE is completed in one continuous session.'
      },
      {
        feature: 'Australian Visa / PR Acceptance',
        exam1Value: '100% accepted by Australian Home Affairs (DHA)',
        exam2Value: '100% accepted by Australian Home Affairs (DHA)',
        testlyAdvantage: 'Equal points eligibility for Subclass 189, 190, 491 visas.'
      },
      {
        feature: 'US University Acceptance',
        exam1Value: '99% of US universities accept IELTS',
        exam2Value: 'Over 1,200+ US universities accept PTE',
        testlyAdvantage: 'Check target university requirements before choosing.'
      }
    ]
  },

  'gre-vs-gmat': {
    id: 'gre-vs-gmat',
    title: 'GRE vs GMAT Focus Edition: Which Should You Take for MBA / Masters?',
    metaTitle: 'GRE vs GMAT Focus Edition (2026): Fees, Syllabus, Difficulty & B-School Acceptance',
    metaDescription: 'Compare GRE General Test vs GMAT Focus Edition for Indian aspirants. Detailed breakdown of official fees in India, Quantitative difficulty, Data Insights, and top MBA acceptance.',
    exam1: 'GRE',
    exam2: 'GMAT',
    summary: 'GMAT Focus Edition is exclusively designed for business schools with a heavy emphasis on Integrated Data Insights and Critical Reasoning, whereas the GRE General Test provides dual versatility for both STEM Masters (MS) and MBA admissions.',
    comparisonPoints: [
      {
        feature: 'Official Fee in India',
        exam1Value: 'USD 220 (~₹26,500 with Forex & GST)',
        exam2Value: 'USD 300 (~₹28,000 with Forex & GST)',
        testlyAdvantage: 'Save ₹7,500 on GRE and ₹6,000 on GMAT with Testly vouchers.'
      },
      {
        feature: 'Versatility',
        exam1Value: 'Accepted for MS, PhD, MBA, and Specialized Masters',
        exam2Value: 'Accepted primarily for MBA and Business Management programs',
        testlyAdvantage: 'GRE allows applying to both engineering and management degrees.'
      },
      {
        feature: 'Math / Quant Emphasis',
        exam1Value: 'High School geometry, algebra, arithmetic, and data analysis',
        exam2Value: 'Advanced arithmetic, algebra, and applied business Data Insights (no geometry)',
        testlyAdvantage: 'GMAT emphasizes data interpretation and problem solving.'
      },
      {
        feature: 'Vocabulary Requirement',
        exam1Value: 'Extensive high-level vocabulary tested in Text Completion',
        exam2Value: 'Standard business English; focuses on logical arguments',
        testlyAdvantage: 'GMAT does not test obscure dictionary words.'
      }
    ]
  }
};

export function getComparisonById(id) {
  if (!id) return null;
  return EXAM_COMPARISONS[id.toLowerCase()] || null;
}
