import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const ACT_SPEC = {
  examId: 'ACT',
  name: 'ACT® Test',
  category: 'Undergraduate Admissions',
  primaryAudience: "US & International Bachelor's Degree Applicants",
  provider: 'ACT, Inc.',
  tier: 2,

  currentVersion: {
    versionId: 'ACT-CORE-MODULAR-2025',
    versionName: 'Modular ACT Test Structure',
    effectiveFrom: '2025-04-01',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-based and paper testing',
    totalDurationMinutes: 125, // Core English, Math, Reading (~2h 5m) + optional Science (40m) & Writing (40m)
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'ACT Exam Sections, Structure and Enhanced Options',
      sourceUrl: 'https://www.act.org/content/act/en/products-and-services/the-act/test-preparation/act-exam-sections-and-structure.html',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  sections: [
    { sectionId: 'act-eng', name: 'English', itemCount: 75, durationMinutes: 45, constructSummary: 'Conventions of standard English, production of writing, and knowledge of language.' },
    { sectionId: 'act-math', name: 'Mathematics', itemCount: 60, durationMinutes: 60, constructSummary: 'Preparing for higher math (algebra, functions, geometry, stats) and integrating essential skills.' },
    { sectionId: 'act-read', name: 'Reading', itemCount: 40, durationMinutes: 35, constructSummary: 'Key ideas and details, craft and structure, integration of knowledge and ideas.' },
    { sectionId: 'act-sci', name: 'Science (Optional / Choice)', itemCount: 40, durationMinutes: 35, isOptional: true, constructSummary: 'Interpretation of data, scientific investigation, evaluation of models and experimental results.' },
    { sectionId: 'act-writ', name: 'Writing (Optional Essay)', itemCount: 1, durationMinutes: 40, isOptional: true, constructSummary: 'Argumentative writing evaluating three different perspectives on an issue.' }
  ],

  officialScoringModel: {
    compositeScale: { min: 1, max: 36, increment: 1 },
    sectionScales: { min: 1, max: 36, increment: 1 },
    collegeReadinessBenchmarks: [
      { subject: 'English', benchmarkScore: 18, targetCourse: 'College English Composition' },
      { subject: 'Reading', benchmarkScore: 22, targetCourse: 'College Social Sciences' },
      { subject: 'Mathematics', benchmarkScore: 22, targetCourse: 'College Algebra' },
      { subject: 'Science', benchmarkScore: 23, targetCourse: 'College Biology' }
    ],
    officialDisclaimer: 'College readiness benchmarks represent a 50% chance of obtaining a B or higher in corresponding first-year credit-bearing college courses.'
  }
};
