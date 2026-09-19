import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../../provenance/provenanceModel';

export const LSAT_SPEC = {
  examId: 'LSAT',
  name: 'LSAT® (Law School Admission Test)',
  category: 'Law School Admissions',
  primaryAudience: 'Juris Doctor (JD) Law School Applicants',
  provider: 'Law School Admission Council (LSAC)',
  tier: 1,

  currentVersion: {
    versionId: 'LSAT-CURRENT-POST-AUG-2024',
    versionName: 'Current LSAT Format (Analytical Reasoning / Logic Games Retired)',
    effectiveFrom: '2024-08-01',
    effectiveUntil: null,
    status: 'CURRENT',
    deliveryMode: 'Computer-delivered at Prometric test centers or remotely proctored',
    totalDurationMinutes: 150, // 4 x 35 min = 140 min + 10 min intermission
    totalItems: 'Approximately 100 total items (~75 scored questions across 3 sections + 1 unscored experimental)',
    isAdaptive: false,
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'LSAC Specifications for LSAT and LSAT Argumentative Writing',
      sourceUrl: 'https://www.lsac.org/lsat/register-lsat/accommodations/specifications-lsat-and-lsat-argumentative-writing',
      verificationStatus: VERIFICATION_STATUS.VERIFIED,
      notes: 'Starting August 2024, LSAC replaced the Analytical Reasoning (Logic Games) section with a second scored Logical Reasoning section.'
    })
  },

  historicalVersions: [
    {
      versionId: 'LSAT-LEGACY-WITH-LOGIC-GAMES',
      versionName: 'Legacy LSAT (with Analytical Reasoning / Logic Games)',
      effectiveFrom: '1991-06-01',
      effectiveUntil: '2024-06-30',
      status: 'SUPERSEDED',
      notes: 'Featured the historic 4-game Analytical Reasoning section, Reading Comprehension, and 1 Logical Reasoning section.'
    }
  ],

  sections: [
    {
      sectionId: 'lsat-lr-1',
      name: 'Logical Reasoning (Section 1 - Scored)',
      durationMinutes: 35,
      itemCount: 25,
      constructSummary: 'Analyzing arguments, identifying assumptions, finding reasoning flaws, drawing valid conclusions, and evaluating evidence.'
    },
    {
      sectionId: 'lsat-lr-2',
      name: 'Logical Reasoning (Section 2 - Scored)',
      durationMinutes: 35,
      itemCount: 25,
      constructSummary: 'Second scored section of critical and deductive arguments.'
    },
    {
      sectionId: 'lsat-rc',
      name: 'Reading Comprehension (Scored)',
      durationMinutes: 35,
      itemCount: 27,
      constructSummary: 'Four sets of reading questions: three with single passages and one with comparative reading of dual paired passages in law, humanities, social sciences, and natural sciences.'
    },
    {
      sectionId: 'lsat-experimental',
      name: 'Variable Section (Unscored)',
      durationMinutes: 35,
      itemCount: 25,
      description: 'Pre-equating experimental section used by LSAC to validate new questions. Unidentified to test taker during test.'
    },
    {
      sectionId: 'lsat-writing',
      name: 'LSAT Argumentative Writing (Administered Separately)',
      durationMinutes: 50,
      itemCount: 1,
      isScored: false,
      description: '15 min prewriting + 35 min writing. Unscored but required for official score report transmission to law schools.'
    }
  ],

  officialScoringModel: {
    scale: { min: 120, max: 180, increment: 1 },
    equatingDescription: 'Scores are calculated based on the total number of questions answered correctly (raw score), then converted to the 120–180 scale through statistical equating.',
    officialDisclaimer: 'Testly provides estimated performance ranges based on our original questions; LSAC does not validate or endorse third-party score converters.'
  }
};
