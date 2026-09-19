import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const DET_SPEC = {
  examId: 'DET',
  name: 'Duolingo English Test',
  category: 'English Language Proficiency',
  primaryAudience: 'Undergraduate & Graduate University Applicants',
  provider: 'Duolingo, Inc.',
  tier: 1,

  currentVersion: {
    versionId: 'DET-CAT-2024-CURRENT',
    versionName: 'Computer Adaptive DET with Integrated Subscores',
    effectiveFrom: '2024-04-02',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Online, AI-proctored at-home computer adaptive test',
    totalDurationMinutes: 60,
    adaptive: true,
    adaptivityType: 'ITEM_LEVEL_IRT_ADAPTIVE',
    adaptivityDescription: 'Each question difficulty is dynamically calibrated in real time based on candidate response history using Item Response Theory.',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'Duolingo English Test Scoring Guide (2026)',
      sourceUrl: 'https://englishtest-static.duolingo.com/media/resources/DET_Scoring%20Guide%20for%20Teachers%20%282026%29.pdf',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  sections: [
    {
      sectionId: 'det-setup',
      name: 'Onboarding & Tech Setup',
      durationMinutes: 5,
      isScored: false
    },
    {
      sectionId: 'det-adaptive-core',
      name: 'Computer Adaptive Test Section',
      durationMinutes: 45,
      isAdaptive: true,
      questionTypes: [
        'Read and Complete (C-test passage word completion)',
        'Read and Select (Select real English words from list)',
        'Listen and Select (Audio word discrimination)',
        'Listen and Type (Dictation sentence)',
        'Read Aloud (Read printed sentence into microphone)',
        'Write About the Photo (Describe image in 1+ sentences)',
        'Speak About the Photo (Speak on image for 30-90 seconds)',
        'Read, Then Write (Academic extended response, min 5 minutes)',
        'Read, Then Speak (Spontaneous response to prompt, 90 seconds)',
        'Listen, Then Speak (Audio prompt response, 90 seconds)',
        'Interactive Reading (Passage comprehension, sentence insertion, highlight answer)'
      ]
    },
    {
      sectionId: 'det-writing-speaking-sample',
      name: 'Writing & Speaking Sample (Ungraded / Shared with Institutions)',
      durationMinutes: 10,
      isScored: false,
      description: 'Shared directly with university admissions officers alongside official score certificate.'
    }
  ],

  officialScoringModel: {
    overallScale: { min: 10, max: 160, increment: 5 },
    integratedSubscores: [
      { name: 'Literacy', components: 'Reading and Writing capability' },
      { name: 'Comprehension', components: 'Reading and Listening capability' },
      { name: 'Conversation', components: 'Listening and Speaking capability' },
      { name: 'Production', components: 'Writing and Speaking capability' }
    ],
    officialCaveat: 'Duolingo uses proprietary psychometric algorithms. Testly evaluates responses using our independent psychometric ability estimation model.'
  }
};
