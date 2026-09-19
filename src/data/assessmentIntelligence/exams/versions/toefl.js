import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const TOEFL_SPEC = {
  examId: 'TOEFL',
  name: 'TOEFL iBT® Test',
  category: 'English Language Proficiency',
  primaryAudience: 'Undergraduate, Graduate & Professional University Admissions',
  provider: 'Educational Testing Service (ETS)',
  tier: 1,

  currentVersion: {
    versionId: 'TOEFL-IBT-2026',
    versionName: 'Updated TOEFL iBT Format (January 2026)',
    effectiveFrom: '2026-01-21',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-delivered (Test Center & Home Edition)',
    adaptive: true,
    variableItemCount: true,
    estimatedDurationMinutes: 'Variable based on adaptive routing (~90-120 min)',
    baseItems: {
      reading: 50,
      listening: 47,
      writing: 12,
      speaking: 11
    },
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'ETS TOEFL iBT Content Structure & 2026 Scale Evolution',
      sourceUrl: 'https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html',
      sourcePublishedAt: '2026-01-21',
      verificationStatus: VERIFICATION_STATUS.VERIFIED,
      notes: 'ETS introduced a 1–6 scale in 0.5 increments on Jan 21, 2026 with a 2-year 0–120 concordance transition period.'
    })
  },

  historicalVersions: [
    {
      versionId: 'TOEFL-IBT-2023-2025',
      versionName: 'Shortened TOEFL iBT Format (July 2023 - Jan 2025)',
      effectiveFrom: '2023-07-26',
      effectiveUntil: '2026-01-20',
      status: 'SUPERSEDED',
      totalDurationMinutes: 116,
      scoreScale: '0 – 120 (4 sections of 0–30)',
      notes: 'Included Academic Discussion writing, independent speaking 1, integrated speaking 2-4.'
    }
  ],

  sections: [
    {
      sectionId: 'toefl-2026-reading',
      name: 'Reading Section',
      isAdaptive: true,
      approximateBaseItems: 50,
      taskTypes: [
        { id: 'ctw', name: 'Complete the Words', focus: 'Lexical access, morphological recognition & contextual decoding' },
        { id: 'rdl', name: 'Read in Daily Life', focus: 'Pragmatic, functional comprehension in campus and practical environments' },
        { id: 'rap', name: 'Read an Academic Passage', focus: 'Expository university-level reading, rhetorical structure & factual synthesis' }
      ]
    },
    {
      sectionId: 'toefl-2026-listening',
      name: 'Listening Section',
      isAdaptive: true,
      approximateBaseItems: 47,
      taskTypes: [
        { id: 'lcr', name: 'Listen and Choose a Response', focus: 'Short interactive turns & immediate pragmatic intent recognition' },
        { id: 'cnv', name: 'Conversation', focus: 'Campus dialogues between students and academic service staff/professors' },
        { id: 'ann', name: 'Announcement', focus: 'Administrative notices, operational instructions & campus announcements' },
        { id: 'act', name: 'Academic Talk', focus: 'Short lecture excerpts, conceptual explanations & argument tracking' }
      ]
    },
    {
      sectionId: 'toefl-2026-writing',
      name: 'Writing Section',
      approximateBaseItems: 12,
      taskTypes: [
        { id: 'bas', name: 'Build a Sentence', focus: 'Syntactic control, clausal coordination & grammatical accuracy' },
        { id: 'wte', name: 'Write an Email', focus: 'Functional written communication, register appropriateness & pragmatic clarity' },
        { id: 'wad', name: 'Write for an Academic Discussion', focus: 'Stating and elaborating an academic stance in an online forum context' }
      ]
    },
    {
      sectionId: 'toefl-2026-speaking',
      name: 'Speaking Section',
      approximateBaseItems: 11,
      taskTypes: [
        { id: 'lnr', name: 'Listen and Repeat', focus: 'Phonological accuracy, intonation, cadence & speech reproduction' },
        { id: 'tai', name: 'Take an Interview', focus: 'Spontaneous interactive response to varied conversational questions' }
      ]
    }
  ],

  officialScoringModel: {
    scaleFormat: '1.0 to 6.0 in 0.5 increments',
    sectionScales: {
      reading: { min: 1.0, max: 6.0, increment: 0.5 },
      listening: { min: 1.0, max: 6.0, increment: 0.5 },
      writing: { min: 1.0, max: 6.0, increment: 0.5 },
      speaking: { min: 1.0, max: 6.0, increment: 0.5 }
    },
    overallScore: { min: 1.0, max: 6.0, increment: 0.5 },
    transitionConcordance: {
      active: true,
      transitionPeriodYears: 2,
      legacyComparableScale: '0 – 120 scale provided simultaneously for institutional comparison'
    },
    officialCaveat: 'ETS reports section scores and overall score on the 1–6 scale with dual-reporting during transition. Testly maintains independent proficiency indicators.'
  }
};
