import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const GRE_SPEC = {
  examId: 'GRE',
  name: 'GRE® General Test',
  category: 'Graduate Admissions',
  primaryAudience: "Master's / MS / PhD / MBA / Law Programs",
  provider: 'Educational Testing Service (ETS)',
  tier: 1,

  currentVersion: {
    versionId: 'GRE-2023-CURRENT',
    versionName: 'Shortened GRE General Test',
    effectiveFrom: '2023-09-22',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-delivered (Test Center & At-Home)',
    calculatorAllowed: true, // On-screen calculator for Quant
    totalDurationMinutes: 118, // 1h 58m
    totalItems: 55, // 1 essay + 27 verbal + 27 quant
    adaptivityType: 'SECTION_LEVEL_ADAPTIVE',
    adaptivityDescription: 'Performance on Section 1 dictates the difficulty of Section 2 for Verbal and Quantitative independently.',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'ETS GRE General Test Structure and Timing',
      sourceUrl: 'https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html',
      sourcePublishedAt: '2023-09-22',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  historicalVersions: [
    {
      versionId: 'GRE-LEGACY-2011-2023',
      versionName: 'Legacy Long GRE Format (with unscored section & 2 essays)',
      effectiveFrom: '2011-08-01',
      effectiveUntil: '2023-09-21',
      status: 'SUPERSEDED',
      totalDurationMinutes: 225, // 3h 45m
      totalItems: 82,
      notes: 'Included Issue & Argument tasks plus 20-question Verbal/Quant sections and an unscored experimental section.'
    }
  ],

  sections: [
    {
      sectionId: 'gre-aw-1',
      name: 'Analytical Writing',
      taskType: 'Analyze an Issue Task',
      itemCount: 1,
      durationMinutes: 30,
      isAdaptive: false,
      scoreScale: {
        min: 0.0,
        max: 6.0,
        increment: 0.5,
        scoringMethod: 'Human + e-rater automated scoring engine'
      },
      constructSummary: 'Assesses critical thinking and analytical writing ability: articulating and supporting complex ideas, constructing arguments, and sustaining focused, coherent evaluation.',
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.OFFICIAL,
        sourceTitle: 'ETS GRE Analytical Writing Measure',
        sourceUrl: 'https://www.ets.org/gre/score-users/about/general-test/content-structure.html',
        verificationStatus: VERIFICATION_STATUS.VERIFIED
      })
    },
    {
      sectionId: 'gre-v-1',
      name: 'Verbal Reasoning (Section 1 - Routing)',
      itemCount: 12,
      durationMinutes: 18,
      isAdaptive: false,
      questionTypes: ['Reading Comprehension', 'Text Completion', 'Sentence Equivalence'],
      constructSummary: 'Analyzing and evaluating written material, synthesizing information, analyzing relationships among component parts of sentences, and recognizing relationships among words and concepts.'
    },
    {
      sectionId: 'gre-v-2',
      name: 'Verbal Reasoning (Section 2 - Adaptive)',
      itemCount: 15,
      durationMinutes: 23,
      isAdaptive: true,
      adaptiveRoutingBasis: 'Performance on gre-v-1 routes candidate to Easy, Medium, or Hard pool.',
      questionTypes: ['Reading Comprehension', 'Text Completion', 'Sentence Equivalence']
    },
    {
      sectionId: 'gre-q-1',
      name: 'Quantitative Reasoning (Section 1 - Routing)',
      itemCount: 12,
      durationMinutes: 21,
      isAdaptive: false,
      questionTypes: ['Quantitative Comparison', 'Multiple Choice (Single Answer)', 'Multiple Choice (One or More Answers)', 'Numeric Entry'],
      constructSummary: 'Basic mathematical skills, understanding of elementary mathematical concepts of arithmetic, algebra, geometry and data analysis, and quantitative reasoning problem solving.'
    },
    {
      sectionId: 'gre-q-2',
      name: 'Quantitative Reasoning (Section 2 - Adaptive)',
      itemCount: 15,
      durationMinutes: 26,
      isAdaptive: true,
      adaptiveRoutingBasis: 'Performance on gre-q-1 routes candidate to Easy, Medium, or Hard pool.',
      questionTypes: ['Quantitative Comparison', 'Multiple Choice (Single Answer)', 'Multiple Choice (One or More Answers)', 'Numeric Entry']
    }
  ],

  officialScoringModel: {
    verbalScale: { min: 130, max: 170, increment: 1 },
    quantScale: { min: 130, max: 170, increment: 1 },
    analyticalWritingScale: { min: 0.0, max: 6.0, increment: 0.5 },
    totalCompositeScale: { min: 260, max: 340, increment: 1 },
    equatingDescription: 'Scores are reported on a scaled metric through psychometric equating that accounts for variations in difficulty between adaptive test forms.',
    caveat: 'ETS does not publish raw-to-scaled conversion formulas; Testly maintains separate empirical practice estimates and never claims official score equivalence.'
  }
};
