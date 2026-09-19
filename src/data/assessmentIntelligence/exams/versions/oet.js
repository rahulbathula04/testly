import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const OET_SPEC = {
  examId: 'OET',
  name: 'OET (Occupational English Test)',
  category: 'Healthcare English Language Proficiency',
  primaryAudience: 'Doctors, Nurses & Allied Healthcare Professionals seeking registration/migration',
  provider: 'Cambridge Boxhill Language Assessment (CBLA)',
  tier: 2,

  currentVersion: {
    versionId: 'OET-HEALTHCARE-CURRENT',
    versionName: 'OET for Healthcare Professionals (Paper, Computer & At-Home)',
    effectiveFrom: '2018-09-01',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-based (OET on Computer) and Paper-based across 12 healthcare professions',
    totalDurationMinutes: 170, // ~2h 50m
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'OET Test Format, Scoring and Clinical Criteria',
      sourceUrl: 'https://oet.com/discover/about-the-test/test-format',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  sections: [
    {
      sectionId: 'oet-listening',
      name: 'Listening (All Healthcare Professions)',
      durationMinutes: 45,
      parts: [
        { part: 'Part A', description: 'Recorded consultation extracts between healthcare professional and patient' },
        { part: 'Part B', description: 'Short workplace extracts (team briefings, handovers, supervisor dialogue)' },
        { part: 'Part C', description: 'Recorded presentations or clinical interviews on healthcare topics' }
      ]
    },
    {
      sectionId: 'oet-reading',
      name: 'Reading (All Healthcare Professions)',
      durationMinutes: 60,
      parts: [
        { part: 'Part A', description: 'Expeditious reading of 4 short clinical texts (drug dosage, protocols)' },
        { part: 'Part B', description: 'Policy documents, hospital guidelines, and clinical manuals' },
        { part: 'Part C', description: 'Longer discursive texts on topics of interest to healthcare professionals' }
      ]
    },
    {
      sectionId: 'oet-writing',
      name: 'Writing (Profession-Specific)',
      durationMinutes: 45,
      description: 'Produce a formal clinical letter (referral, transfer, or discharge) based on patient case notes.'
    },
    {
      sectionId: 'oet-speaking',
      name: 'Speaking (Profession-Specific Roleplays)',
      durationMinutes: 20,
      description: 'Two simulated clinician-patient consultations assessing clinical communication and linguistic accuracy.'
    }
  ],

  officialScoringModel: {
    numericalScale: { min: 0, max: 500, increment: 10 },
    letterGrades: [
      { grade: 'A', scoreRange: '450 – 500', descriptor: 'Very high level of clinical fluency and accuracy' },
      { grade: 'B', scoreRange: '350 – 440', descriptor: 'High level of fluency; standard requirement for GMC, NMC, AHPRA, ECFMG' },
      { grade: 'C+', scoreRange: '300 – 340', descriptor: 'Clearly effective communication in clinical contexts' },
      { grade: 'C', scoreRange: '200 – 290', descriptor: 'Adequate competence for routine healthcare duties' },
      { grade: 'D', scoreRange: '100 – 190', descriptor: 'Limited clinical communication' },
      { grade: 'E', scoreRange: '0 – 90', descriptor: 'Very limited clinical communication' }
    ],
    officialDisclaimer: 'Testly provides healthcare simulation practice and clinical communication rubric feedback; official OET registration requires testing through CBLA.'
  }
};
