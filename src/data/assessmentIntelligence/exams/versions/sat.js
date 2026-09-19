import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const SAT_SPEC = {
  examId: 'SAT',
  name: 'Digital SAT®',
  category: 'Undergraduate Admissions',
  primaryAudience: "Bachelor's Degree University Applicants",
  provider: 'College Board',
  tier: 1,

  currentVersion: {
    versionId: 'SAT-DIGITAL-2023-CURRENT',
    versionName: 'Digital SAT Suite of Assessments',
    effectiveFrom: '2023-03-11', // International launch March 2023, US March 2024
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Digital delivery on test-taker device or managed school computer via Bluebook app',
    totalDurationMinutes: 134, // 2h 14m + 10m scheduled break
    totalItems: 98,
    adaptive: true,
    adaptivityType: 'MULTI_STAGE_ADAPTIVE_2_MODULES',
    adaptivityDescription: 'Each section has two stages (modules). Module 1 contains a broad mix of difficulties; performance on Module 1 routes candidate to an easier or harder Module 2.',
    calculatorAllowed: 'Desmos graphic calculator integrated into all Math questions',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'College Board Digital SAT Test Structure & Math Overview',
      sourceUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/structure',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  historicalVersions: [
    {
      versionId: 'SAT-PAPER-PENCIL-2016-2023',
      versionName: 'Paper-and-Pencil 3-Hour SAT with No-Calculator Math Section',
      effectiveFrom: '2016-03-01',
      effectiveUntil: '2023-12-02',
      status: 'SUPERSEDED',
      totalDurationMinutes: 180,
      totalItems: 154,
      notes: 'Featured separate Reading, Writing & Language, Math No-Calculator, and Math Calculator sections.'
    }
  ],

  sections: [
    {
      sectionId: 'sat-rw',
      name: 'Reading and Writing',
      totalQuestions: 54,
      durationMinutes: 64,
      modules: [
        { moduleNumber: 1, name: 'Reading & Writing - Module 1 (Routing)', questions: 27, durationMinutes: 32 },
        { moduleNumber: 2, name: 'Reading & Writing - Module 2 (Adaptive)', questions: 27, durationMinutes: 32 }
      ],
      contentDomains: [
        { domain: 'Craft and Structure', weightPercent: 28 },
        { domain: 'Information and Ideas', weightPercent: 26 },
        { domain: 'Standard English Conventions', weightPercent: 26 },
        { domain: 'Expression of Ideas', weightPercent: 20 }
      ]
    },
    {
      sectionId: 'sat-math',
      name: 'Math',
      totalQuestions: 44,
      durationMinutes: 70,
      calculatorPolicy: 'Built-in Desmos graphing calculator permitted across both modules',
      modules: [
        { moduleNumber: 1, name: 'Math - Module 1 (Routing)', questions: 22, durationMinutes: 35 },
        { moduleNumber: 2, name: 'Math - Module 2 (Adaptive)', questions: 22, durationMinutes: 35 }
      ],
      contentDomains: [
        { domain: 'Algebra', weightPercent: 35, description: 'Linear equations, linear inequalities, systems of equations' },
        { domain: 'Advanced Math', weightPercent: 35, description: 'Nonlinear functions, quadratics, polynomials, exponential equations' },
        { domain: 'Problem-Solving and Data Analysis', weightPercent: 15, description: 'Ratios, rates, percentages, probability, statistical data interpretation' },
        { domain: 'Geometry and Trigonometry', weightPercent: 15, description: 'Area and volume, angles, triangles, circles, trigonometric ratios' }
      ]
    }
  ],

  officialScoringModel: {
    compositeScale: { min: 400, max: 1600, increment: 10 },
    sectionScales: {
      readingWriting: { min: 200, max: 800, increment: 10 },
      math: { min: 200, max: 800, increment: 10 }
    },
    officialCaveat: 'College Board uses Item Response Theory equating to account for form differences and adaptive routing paths. Testly maintains independent diagnostic indices.'
  }
};
