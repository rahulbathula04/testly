import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../provenance/provenanceModel';

/**
 * Strict Separation:
 * 1. officialScoringModel: Documented official score metrics, scales, and equating rules.
 * 2. testlyScoringModel: Proprietary diagnostic indices, domain mastery, and calibrated readiness.
 */
export const SCORING_MODELS_REGISTRY = {
  GRE: {
    examId: 'GRE',
    officialScoringModel: {
      scoreScaleDescription: 'Verbal (130-170), Quantitative (130-170), Analytical Writing (0.0-6.0), Composite (260-340).',
      sectionIncrements: { verbal: 1, quant: 1, analyticalWriting: 0.5 },
      equatingMethod: 'Item Response Theory (IRT) and post-administration equating. ETS does not publish public raw-to-scaled conversion tables.',
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.OFFICIAL,
        sourceTitle: 'ETS GRE Guide to the Use of Scores',
        sourceUrl: 'https://www.ets.org/gre/score-users/about/general-test/scoring.html',
        verificationStatus: VERIFICATION_STATUS.VERIFIED
      })
    },
    testlyPracticeMetrics: {
      metrics: [
        { id: 'rawAccuracy', name: 'Raw Accuracy Percentage', unit: '%', formula: '(correctItems / totalItems) * 100' },
        { id: 'domainMastery', name: 'Domain Mastery Indices', components: ['Arithmetic', 'Algebra', 'Geometry', 'Data Analysis', 'Reading', 'Vocabulary'] },
        { id: 'speedIndex', name: 'Pacing & Time Efficiency', unit: 'sec/question vs benchmark' },
        { id: 'difficultyCalibratedScore', name: 'Testly Calibrated Performance Band', format: 'Estimated Score Range (e.g. 318 - 324)', note: 'Calculated via 2-parameter logistic ability estimate (theta), never presented as an official ETS score.' }
      ],
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.TESTLY_DERIVED,
        sourceTitle: 'Testly Psychometric Calibration Engine v0.1',
        verificationStatus: VERIFICATION_STATUS.INTERNAL
      })
    }
  },

  TOEFL: {
    examId: 'TOEFL',
    officialScoringModel: {
      scoreScaleDescription: 'Reported on a 1.0 to 6.0 scale in 0.5 increments across 4 sections and an overall score. A comparable 0-120 score is reported during the 2026-2028 transition.',
      sectionIncrements: { reading: 0.5, listening: 0.5, writing: 0.5, speaking: 0.5, overall: 0.5 },
      equatingMethod: 'Multi-stage adaptive calibration and automated speech/text acoustic scoring.',
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.OFFICIAL,
        sourceTitle: 'ETS 2026 Score Reporting Framework',
        sourceUrl: 'https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html',
        verificationStatus: VERIFICATION_STATUS.VERIFIED
      })
    },
    testlyPracticeMetrics: {
      metrics: [
        { id: 'toeflBandEstimate', name: 'Testly TOEFL Band Estimate', format: 'e.g. 4.5 – 5.0 (Transition equivalent: ~92-102)' },
        { id: 'phonologicalAccuracy', name: 'Acoustic & Pronunciation Score (0-100)' },
        { id: 'syntacticComplexity', name: 'Grammatical Control & Lexical Diversity Index (0-100)' }
      ]
    }
  },

  IELTS: {
    examId: 'IELTS',
    officialScoringModel: {
      scoreScaleDescription: '0.0 to 9.0 in 0.5 band increments. Overall band is the arithmetic mean of the 4 component bands rounded to the nearest half or whole band.',
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.OFFICIAL,
        sourceTitle: 'IELTS Scoring in Detail',
        sourceUrl: 'https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail',
        verificationStatus: VERIFICATION_STATUS.VERIFIED
      })
    },
    testlyPracticeMetrics: {
      metrics: [
        { id: 'ieltsPracticeBand', name: 'Testly IELTS Practice Band Estimate', format: 'Band 6.5 – 7.0' },
        { id: 'writingTaskResponse', name: 'Estimated Task Response & Cohesion Score' },
        { id: 'speakingFluencyMetric', name: 'Estimated Spoken Fluency & Pronunciation Index' }
      ]
    }
  },

  GMAT: {
    examId: 'GMAT',
    officialScoringModel: {
      scoreScaleDescription: 'Total score ranges from 205 to 805 in 10-point increments (all scores end in 5). Section scores for Quant, Verbal, and Data Insights range from 60 to 90 in 1-point increments.',
      weightingRule: 'Quant, Verbal, and Data Insights contribute equally to the total composite score.',
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.OFFICIAL,
        sourceTitle: 'GMAC GMAT Exam Scores and Percentiles',
        sourceUrl: 'https://www.mba.com/exams/gmat-exam/scores',
        verificationStatus: VERIFICATION_STATUS.VERIFIED
      })
    },
    testlyPracticeMetrics: {
      metrics: [
        { id: 'gmatPerformanceBand', name: 'Testly Estimated GMAT Performance Range (e.g. 625 - 665)' },
        { id: 'dataInsightsProficiency', name: 'Data Literacy & Multi-source Synthesis Index (0-100)' }
      ]
    }
  },

  SAT: {
    examId: 'SAT',
    officialScoringModel: {
      scoreScaleDescription: 'Total composite ranges from 400 to 1600. Reading and Writing section: 200–800. Math section: 200–800. 10-point increments.',
      equatingMethod: 'Multi-stage adaptive IRT scoring model. Module 2 routing significantly impacts the maximum attainable score range.',
      provenance: createProvenance({
        sourceType: SOURCE_TYPES.OFFICIAL,
        sourceTitle: 'College Board SAT Scores Explained',
        sourceUrl: 'https://satsuite.collegeboard.org/scores/what-scores-mean/how-scores-calculated',
        verificationStatus: VERIFICATION_STATUS.VERIFIED
      })
    },
    testlyPracticeMetrics: {
      metrics: [
        { id: 'satPracticeRange', name: 'Testly SAT Practice Score Range (e.g. 1380 - 1440)' },
        { id: 'mathDomainReadiness', name: 'Algebra & Advanced Math Proficiency Index' }
      ]
    }
  }
};

export function getScoringModelByExam(examId) {
  if (!examId) return null;
  return SCORING_MODELS_REGISTRY[examId.toUpperCase()] || null;
}
