import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const IELTS_SPEC = {
  examId: 'IELTS',
  name: 'IELTS Academic',
  category: 'English Language Proficiency',
  primaryAudience: 'Higher Education Admissions, Professional Registration & Study Abroad',
  provider: 'IDP: IELTS Australia, British Council & Cambridge University Press & Assessment',
  tier: 1,

  currentVersion: {
    versionId: 'IELTS-ACADEMIC-CURRENT',
    versionName: 'IELTS Academic (Paper & Computer Delivered)',
    effectiveFrom: '2020-01-01',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-delivered & Paper-based',
    totalDurationMinutes: 165, // ~2h 45m
    totalItems: 82, // 40 L + 40 R + 2 W + Speaking
    isAdaptive: false,
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'IELTS Academic Format and Scoring Structure',
      sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-academic-test',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  sections: [
    {
      sectionId: 'ielts-listening',
      name: 'Listening',
      durationMinutes: 30,
      itemCount: 40,
      format: '4 recorded monologues and conversations across everyday social and academic contexts',
      questionTypes: [
        'Multiple Choice',
        'Matching',
        'Plan / Map / Diagram Labelling',
        'Form / Note / Table / Flow-chart / Summary Completion',
        'Sentence Completion',
        'Short-Answer Questions'
      ]
    },
    {
      sectionId: 'ielts-reading',
      name: 'Academic Reading',
      durationMinutes: 60,
      itemCount: 40,
      format: '3 long academic texts drawn from books, journals, magazines and newspapers',
      questionTypes: [
        'Multiple Choice',
        'Identifying Information (True/False/Not Given)',
        'Identifying Writer’s Views/Claims (Yes/No/Not Given)',
        'Matching Information / Headings / Features / Sentence Endings',
        'Sentence / Summary / Note / Table / Flow-chart Completion',
        'Diagram Label Completion',
        'Short-Answer Questions'
      ]
    },
    {
      sectionId: 'ielts-writing',
      name: 'Academic Writing',
      durationMinutes: 60,
      itemCount: 2,
      tasks: [
        {
          taskNumber: 1,
          name: 'Task 1 (Report)',
          durationMinutes: 20,
          minWordCount: 150,
          description: 'Summarize, describe or explain information presented in a graph, table, chart, diagram or process map.'
        },
        {
          taskNumber: 2,
          name: 'Task 2 (Discursive Essay)',
          durationMinutes: 40,
          minWordCount: 250,
          description: 'Write an essay responding to a point of view, argument, or problem.'
        }
      ],
      rubricCriteria: [
        'Task Achievement / Task Response',
        'Coherence & Cohesion',
        'Lexical Resource',
        'Grammatical Range & Accuracy'
      ]
    },
    {
      sectionId: 'ielts-speaking',
      name: 'Speaking',
      durationMinutes: 14, // 11-14 min
      itemCount: 3,
      parts: [
        { partNumber: 1, name: 'Part 1: Introduction & General Interview', durationMinutes: 5 },
        { partNumber: 2, name: 'Part 2: Individual Long Turn (Cue Card)', durationMinutes: 4 },
        { partNumber: 3, name: 'Part 3: Two-way Abstract Discussion', durationMinutes: 5 }
      ],
      rubricCriteria: [
        'Fluency & Coherence',
        'Lexical Resource',
        'Grammatical Range & Accuracy',
        'Pronunciation'
      ]
    }
  ],

  officialScoringModel: {
    scale: '0.0 to 9.0 in 0.5 band increments',
    overallCalculation: 'Arithmetic average of the 4 section scores rounded to the nearest half or whole band.',
    roundingRule: 'Average ending in .25 rounds UP to next half band; average ending in .75 rounds UP to next whole band.',
    officialDisclaimer: 'Testly provides a Testly IELTS Practice Band Estimate based on our proprietary calibration, not an official test result issued by IDP, British Council, or Cambridge.'
  }
};
