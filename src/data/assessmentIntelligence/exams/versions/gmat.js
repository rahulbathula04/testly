import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const GMAT_SPEC = {
  examId: 'GMAT',
  name: 'GMAT™ Exam',
  category: 'Business School Admissions',
  primaryAudience: "MBA / Business Master's Programs",
  provider: 'Graduate Management Admission Council (GMAC)',
  tier: 1,

  currentVersion: {
    versionId: 'GMAT-CURRENT-3SECTION',
    versionName: 'GMAT™ Exam (Current 3-Section Format)',
    effectiveFrom: '2023-11-07',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-delivered (Test Center or Online)',
    totalDurationMinutes: 135, // 2h 15m + optional 10m break
    totalItems: 64,
    orderCustomizable: true, // Candidate chooses section order
    calculatorAllowed: 'On-screen calculator available in Data Insights ONLY',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'GMAC GMAT Exam Structure, Timing and Scoring',
      sourceUrl: 'https://www.mba.com/exams/gmat-exam/about/exam-structure',
      verificationStatus: VERIFICATION_STATUS.VERIFIED,
      notes: 'GMAC transitioned all testing to this streamlined 3-section format, retiring the legacy 4-section format with AWA.'
    })
  },

  historicalVersions: [
    {
      versionId: 'GMAT-LEGACY-4SECTION',
      versionName: 'Legacy GMAT Exam (with AWA and Integrated Reasoning)',
      effectiveFrom: '2012-06-05',
      effectiveUntil: '2024-01-31',
      status: 'SUPERSEDED',
      totalDurationMinutes: 207,
      totalItems: 91,
      notes: 'Included Analytical Writing Assessment (AWA), Integrated Reasoning, and separate 200–800 score scale.'
    }
  ],

  sections: [
    {
      sectionId: 'gmat-quant',
      name: 'Quantitative Reasoning',
      itemCount: 21,
      durationMinutes: 45,
      calculatorAllowed: false,
      questionTypes: ['Problem Solving'],
      constructSummary: 'Algebraic and arithmetic foundational knowledge, quantitative reasoning, and problem solving without geometry.'
    },
    {
      sectionId: 'gmat-verbal',
      name: 'Verbal Reasoning',
      itemCount: 23,
      durationMinutes: 45,
      calculatorAllowed: false,
      questionTypes: ['Reading Comprehension', 'Critical Reasoning'],
      constructSummary: 'Comprehending written material, evaluating arguments, drawing inferences, and logical analysis (Sentence Correction removed).'
    },
    {
      sectionId: 'gmat-data-insights',
      name: 'Data Insights',
      itemCount: 20,
      durationMinutes: 45,
      calculatorAllowed: true,
      questionTypes: [
        'Data Sufficiency',
        'Multi-Source Reasoning',
        'Table Analysis',
        'Graphics Interpretation',
        'Two-Part Analysis'
      ],
      constructSummary: 'Assesses data literacy, multi-format synthesis, mathematical and verbal data interpretation, and quantitative decision-making.'
    }
  ],

  officialScoringModel: {
    totalScale: { min: 205, max: 805, increment: 10, endsWith: 5 },
    sectionScales: {
      quant: { min: 60, max: 90, increment: 1 },
      verbal: { min: 60, max: 90, increment: 1 },
      dataInsights: { min: 60, max: 90, increment: 1 }
    },
    weighting: 'All three sections contribute equally to the total composite score.',
    officialCaveat: 'GMAC calculates scaled scores through proprietary psychometric calibration and item difficulty parameters. Testly provides independent performance indices.'
  }
};
