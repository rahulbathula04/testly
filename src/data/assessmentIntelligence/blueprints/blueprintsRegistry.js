import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../provenance/provenanceModel';

export const BLUEPRINTS_REGISTRY = {
  GRE: {
    examId: 'GRE',
    versionId: 'GRE-2023-CURRENT',
    sections: {
      verbal: {
        totalItems: 27,
        distribution: [
          { skill: 'Reading Comprehension', targetPercent: 50, approximateItems: 13, questionTypes: ['Single Answer MCQ', 'Multiple Answer MCQ', 'Select-in-Passage'] },
          { skill: 'Text Completion', targetPercent: 30, approximateItems: 8, questionTypes: ['1-Blank', '2-Blank', '3-Blank'] },
          { skill: 'Sentence Equivalence', targetPercent: 20, approximateItems: 6, questionTypes: ['Select Two Equivalent Words'] }
        ],
        difficultyTarget: { E1_Introductory: 10, E2_Foundational: 25, E3_Standard: 35, E4_Challenging: 20, E5_Advanced: 10 },
        provenance: createProvenance({
          sourceType: SOURCE_TYPES.TESTLY_DERIVED,
          sourceTitle: 'Derived from ETS Shortened GRE 27-Question Verbal Section Form Analysis',
          sourceUrl: 'https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html',
          verificationStatus: VERIFICATION_STATUS.INTERNAL,
          notes: 'ETS publishes section question counts (12 routing + 15 adaptive); skill distributions are derived from published sample forms.'
        })
      },
      quantitative: {
        totalItems: 27,
        distribution: [
          { domain: 'Arithmetic', targetPercent: 25, approximateItems: 7 },
          { domain: 'Algebra', targetPercent: 30, approximateItems: 8 },
          { domain: 'Geometry', targetPercent: 15, approximateItems: 4 },
          { domain: 'Data Analysis', targetPercent: 30, approximateItems: 8 }
        ],
        itemTypes: [
          { type: 'Quantitative Comparison', targetPercent: 35, approximateItems: 9 },
          { type: 'Single Answer Problem Solving', targetPercent: 35, approximateItems: 10 },
          { type: 'Multiple Answer Problem Solving', targetPercent: 15, approximateItems: 4 },
          { type: 'Numeric Entry', targetPercent: 15, approximateItems: 4 }
        ],
        provenance: createProvenance({
          sourceType: SOURCE_TYPES.TESTLY_DERIVED,
          sourceTitle: 'Derived from ETS GRE Quant Domain Specifications',
          sourceUrl: 'https://www.ets.org/gre/score-users/about/general-test/content-structure.html',
          verificationStatus: VERIFICATION_STATUS.INTERNAL
        })
      },
      analyticalWriting: {
        totalItems: 1,
        tasks: [{ taskName: 'Analyze an Issue Task', durationMinutes: 30, rubricScale: '0.0 - 6.0 in 0.5 increments' }]
      }
    }
  },

  TOEFL: {
    examId: 'TOEFL',
    versionId: 'TOEFL-IBT-2026',
    sections: {
      reading: {
        approximateBaseItems: 50,
        taskBreakdown: [
          { task: 'Complete the Words', focus: 'Morphological & Lexical Access' },
          { task: 'Read in Daily Life', focus: 'Campus Pragmatic Reading' },
          { task: 'Read an Academic Passage', focus: 'Expository Academic Reading' }
        ]
      },
      listening: {
        approximateBaseItems: 47,
        taskBreakdown: [
          { task: 'Listen and Choose a Response', focus: 'Short Conversational Turns' },
          { task: 'Conversation', focus: 'Multi-turn Service & Office Hour Encounters' },
          { task: 'Announcement', focus: 'Campus Administrative Bulletins' },
          { task: 'Academic Talk', focus: 'Faculty Mini-Lectures' }
        ]
      },
      writing: {
        approximateBaseItems: 12,
        taskBreakdown: [
          { task: 'Build a Sentence', focus: 'Syntactic Grammar Construction' },
          { task: 'Write an Email', focus: 'Functional Pragmatic Interaction' },
          { task: 'Write for an Academic Discussion', focus: 'Stance Formulation & Evidence' }
        ]
      },
      speaking: {
        approximateBaseItems: 11,
        taskBreakdown: [
          { task: 'Listen and Repeat', focus: 'Phonological Accuracy & Fluency' },
          { task: 'Take an Interview', focus: 'Spontaneous Interactive Fluency' }
        ]
      }
    },
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'ETS 2026 TOEFL iBT Test Blueprint & Task Structure',
      sourceUrl: 'https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },

  SAT: {
    examId: 'SAT',
    versionId: 'SAT-DIGITAL-2023-CURRENT',
    sections: {
      math: {
        totalItems: 44, // 2 modules x 22 questions
        domainWeights: [
          { domain: 'Algebra', weightPercent: 35, approximateItems: 15, provenance: createProvenance({ sourceType: SOURCE_TYPES.OFFICIAL, sourceTitle: 'College Board Math Overview', sourceUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview', verificationStatus: VERIFICATION_STATUS.VERIFIED }) },
          { domain: 'Advanced Math', weightPercent: 35, approximateItems: 15, provenance: createProvenance({ sourceType: SOURCE_TYPES.OFFICIAL, sourceTitle: 'College Board Math Overview', sourceUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview', verificationStatus: VERIFICATION_STATUS.VERIFIED }) },
          { domain: 'Problem-Solving and Data Analysis', weightPercent: 15, approximateItems: 7, provenance: createProvenance({ sourceType: SOURCE_TYPES.OFFICIAL, sourceTitle: 'College Board Math Overview', sourceUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview', verificationStatus: VERIFICATION_STATUS.VERIFIED }) },
          { domain: 'Geometry and Trigonometry', weightPercent: 15, approximateItems: 7, provenance: createProvenance({ sourceType: SOURCE_TYPES.OFFICIAL, sourceTitle: 'College Board Math Overview', sourceUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview', verificationStatus: VERIFICATION_STATUS.VERIFIED }) }
        ]
      },
      readingWriting: {
        totalItems: 54, // 2 modules x 27 questions
        domainWeights: [
          { domain: 'Craft and Structure', weightPercent: 28, approximateItems: 15 },
          { domain: 'Information and Ideas', weightPercent: 26, approximateItems: 14 },
          { domain: 'Standard English Conventions', weightPercent: 26, approximateItems: 14 },
          { domain: 'Expression of Ideas', weightPercent: 20, approximateItems: 11 }
        ]
      }
    }
  },

  GMAT: {
    examId: 'GMAT',
    versionId: 'GMAT-CURRENT-3SECTION',
    sections: {
      quant: { totalItems: 21, itemTypes: [{ type: 'Problem Solving', count: 21 }] },
      verbal: { totalItems: 23, itemTypes: [{ type: 'Critical Reasoning', approximateItems: 11 }, { type: 'Reading Comprehension', approximateItems: 12 }] },
      dataInsights: { totalItems: 20, itemTypes: [{ type: 'Data Sufficiency', approximateItems: 5 }, { type: 'Table Analysis', approximateItems: 4 }, { type: 'Graphics Interpretation', approximateItems: 4 }, { type: 'Two-Part Analysis', approximateItems: 4 }, { type: 'Multi-Source Reasoning', approximateItems: 3 }] }
    },
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'GMAC GMAT Exam Section Distribution',
      sourceUrl: 'https://www.mba.com/exams/gmat-exam/about/exam-structure',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  }
};

export function getBlueprintByExam(examId) {
  if (!examId) return null;
  return BLUEPRINTS_REGISTRY[examId.toUpperCase()] || null;
}
