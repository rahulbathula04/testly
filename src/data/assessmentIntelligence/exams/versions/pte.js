import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const PTE_SPEC = {
  examId: 'PTE',
  name: 'PTE Academic',
  category: 'English Language Proficiency',
  primaryAudience: 'University Study & Australian / UK / New Zealand / Canadian Migration',
  provider: 'Pearson PLC',
  tier: 1,

  currentVersion: {
    versionId: 'PTE-ACADEMIC-2HR',
    versionName: 'Shortened 2-Hour PTE Academic Format',
    effectiveFrom: '2021-11-16',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-delivered at secure Pearson VUE test centers',
    totalDurationMinutes: 120,
    isAdaptive: false,
    automatedScoring: true,
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'Pearson PTE Academic Test Format & Task Types',
      sourceUrl: 'https://www.pearsonpte.com/pte-academic/test-format/speaking-writing/',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  sections: [
    {
      sectionId: 'pte-speaking-writing',
      name: 'Part 1: Speaking & Writing',
      durationMinutes: 54, // ~54-67 min
      taskTypes: [
        { id: 'ra', name: 'Read Aloud', integratedSkills: ['Reading', 'Speaking'] },
        { id: 'rs', name: 'Repeat Sentence', integratedSkills: ['Listening', 'Speaking'] },
        { id: 'di', name: 'Describe Image', integratedSkills: ['Speaking'] },
        { id: 'rl', name: 'Retell Lecture', integratedSkills: ['Listening', 'Speaking'] },
        { id: 'asq', name: 'Answer Short Question', integratedSkills: ['Listening', 'Speaking'] },
        { id: 'sgd', name: 'Summarize Group Discussion', integratedSkills: ['Listening', 'Speaking'] },
        { id: 'rts', name: 'Respond to a Situation', integratedSkills: ['Listening', 'Speaking'] },
        { id: 'swt', name: 'Summarize Written Text', integratedSkills: ['Reading', 'Writing'] },
        { id: 'we', name: 'Write Essay', integratedSkills: ['Writing'] }
      ]
    },
    {
      sectionId: 'pte-reading',
      name: 'Part 2: Reading',
      durationMinutes: 30, // ~29-30 min
      taskTypes: [
        { id: 'rwfib', name: 'Reading & Writing: Fill in the Blanks', integratedSkills: ['Reading', 'Writing'] },
        { id: 'mcm', name: 'Multiple Choice, Multiple Answers', integratedSkills: ['Reading'] },
        { id: 'rop', name: 'Re-order Paragraphs', integratedSkills: ['Reading'] },
        { id: 'rfib', name: 'Reading: Fill in the Blanks', integratedSkills: ['Reading'] },
        { id: 'mcs', name: 'Multiple Choice, Single Answer', integratedSkills: ['Reading'] }
      ]
    },
    {
      sectionId: 'pte-listening',
      name: 'Part 3: Listening',
      durationMinutes: 36, // ~30-43 min
      taskTypes: [
        { id: 'sst', name: 'Summarize Spoken Text', integratedSkills: ['Listening', 'Writing'] },
        { id: 'lmcm', name: 'Multiple Choice, Multiple Answers', integratedSkills: ['Listening'] },
        { id: 'lfib', name: 'Fill in the Blanks', integratedSkills: ['Listening', 'Writing'] },
        { id: 'hcs', name: 'Highlight Correct Summary', integratedSkills: ['Listening', 'Reading'] },
        { id: 'lmcs', name: 'Multiple Choice, Single Answer', integratedSkills: ['Listening'] },
        { id: 'smw', name: 'Select Missing Word', integratedSkills: ['Listening'] },
        { id: 'hiw', name: 'Highlight Incorrect Words', integratedSkills: ['Listening', 'Reading'] },
        { id: 'wfd', name: 'Write from Dictation', integratedSkills: ['Listening', 'Writing'] }
      ]
    }
  ],

  officialScoringModel: {
    overallScale: { min: 10, max: 90, increment: 1 },
    communicativeSkills: ['Listening', 'Reading', 'Speaking', 'Writing'],
    enablingSkillsTracked: ['Grammar', 'Oral Fluency', 'Pronunciation', 'Spelling', 'Vocabulary', 'Written Discourse'],
    crossSkillScoringNote: 'Many PTE items contribute simultaneously to two skills (e.g. Read Aloud awards points to both Reading and Speaking).',
    officialDisclaimer: 'Testly provides a Testly Estimated Practice Score based on automated evaluation rubrics and does not issue official Pearson PTE credentials.'
  }
};
