import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../provenance/provenanceModel';

export const CONSTRUCTS_REGISTRY = {
  GRE: {
    examId: 'GRE',
    constructTitle: 'GRE® General Test Latent Cognitive Constructs',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'ETS GRE Content Structure & Construct Definitions',
      sourceUrl: 'https://www.ets.org/gre/score-users/about/general-test/content-structure.html',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    domains: [
      {
        domainId: 'gre-verbal-reasoning',
        name: 'Verbal Reasoning',
        latentAbility: 'High-level cognitive ability to analyze and evaluate written material, synthesize information, recognize relationships between words and concepts, and track complex arguments.',
        subconstructs: [
          'Analyzing and drawing conclusions from discourse',
          'Reasoning from incomplete data (inferring missing information)',
          'Understanding multiple levels of meaning (literal, figurative, author intent)',
          'Identifying author assumptions and perspective',
          'Distinguishing major from minor points',
          'Understanding the meaning of individual words, sentences and whole texts'
        ]
      },
      {
        domainId: 'gre-quant-reasoning',
        name: 'Quantitative Reasoning',
        latentAbility: 'Mathematical reasoning, problem solving, understanding basic mathematical concepts of arithmetic, algebra, geometry, and data analysis.',
        subconstructs: [
          'Understanding and applying mathematical facts, concepts and algorithms',
          'Translating real-world word problems into algebraic models',
          'Interpreting tables, graphs, and statistical data distributions',
          'Evaluating quantitative relationships under comparative constraints (Quantitative Comparison)'
        ]
      },
      {
        domainId: 'gre-analytical-writing',
        name: 'Analytical Writing',
        latentAbility: 'Critical thinking and analytical writing ability to articulate and support complex ideas, construct and sustain arguments, and communicate with clarity.',
        subconstructs: [
          'Articulating a clear thesis with compelling rationale',
          'Substantiating points with relevant examples and evidence',
          'Anticipating counterarguments and qualifying positions',
          'Maintaining fluent, well-organized discourse with varied syntax'
        ]
      }
    ]
  },

  TOEFL: {
    examId: 'TOEFL',
    constructTitle: 'TOEFL iBT® 2026 Communicative Language Competence',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'ETS TOEFL iBT Construct & Task Domain Definitions',
      sourceUrl: 'https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    domains: [
      {
        domainId: 'toefl-academic-reading',
        name: 'Academic Reading Competence',
        latentAbility: 'Processing expository texts, lexical access speed, contextual morphological decoding, and factual synthesis.',
        subconstructs: [
          'Morphological and lexical decoding under time constraints (Complete the Words)',
          'Pragmatic text comprehension in daily university environments',
          'Rhetorical purpose and inference identification in academic monographs'
        ]
      },
      {
        domainId: 'toefl-academic-listening',
        name: 'Academic Listening Comprehension',
        latentAbility: 'Comprehending spoken North American and international English in instructional and service encounters.',
        subconstructs: [
          'Immediate conversational turn pragmatic intent',
          'Tracking lecture organization, main ideas, and speaker attitude',
          'Connecting information across multi-turn classroom dialogues'
        ]
      },
      {
        domainId: 'toefl-productive-writing',
        name: 'Productive Written Communication',
        latentAbility: 'Producing grammatically cohesive, pragmatic, and argumentatively structured written English.',
        subconstructs: [
          'Sentence-level syntactic coordination and word order control',
          'Functional email communication with appropriate tone and register',
          'Academic discussion participation: defending a perspective with nuanced rationale'
        ]
      },
      {
        domainId: 'toefl-interactive-speaking',
        name: 'Interactive Spoken English',
        latentAbility: 'Phonological clarity, fluent delivery, and structured oral argumentation.',
        subconstructs: [
          'Phonetic repetition accuracy, stress patterns, and natural cadence',
          'Interactive interview response: coherent impromptu speech generation'
        ]
      }
    ]
  },

  IELTS: {
    examId: 'IELTS',
    constructTitle: 'IELTS Academic Communicative Construct',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'IELTS Academic Performance Criteria and Construct',
      sourceUrl: 'https://ielts.org/take-a-test/test-types/ielts-academic-test',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    domains: [
      {
        domainId: 'ielts-listening',
        name: 'Listening Construct',
        latentAbility: 'Understanding main ideas, specific factual information, recognizing opinions/attitudes of speakers, and understanding the development of an argument.'
      },
      {
        domainId: 'ielts-reading',
        name: 'Academic Reading Construct',
        latentAbility: 'Reading for gist, main ideas, detail, skimming, understanding logical argument, and recognizing writers’ opinions, attitudes and purpose.'
      },
      {
        domainId: 'ielts-writing',
        name: 'Written Performance Construct',
        latentAbility: 'Synthesizing visual data (Task 1) and formulating persuasive written argumentation (Task 2).',
        subconstructs: [
          'Task Achievement (Task 1) / Task Response (Task 2)',
          'Coherence & Cohesion (Paragraphing, linking devices)',
          'Lexical Resource (Precision, collocations, style)',
          'Grammatical Range & Accuracy (Complex sentences, error density)'
        ]
      },
      {
        domainId: 'ielts-speaking',
        name: 'Spoken Interaction Construct',
        latentAbility: 'Fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation.'
      }
    ]
  },

  GMAT: {
    examId: 'GMAT',
    constructTitle: 'GMAT™ Executive & Analytical Reasoning Constructs',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'GMAC GMAT Exam Content & Construct Specification',
      sourceUrl: 'https://www.mba.com/exams/gmat-exam/about/exam-content',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    domains: [
      {
        domainId: 'gmat-quant',
        name: 'Quantitative Reasoning',
        latentAbility: 'Algebraic and arithmetic modeling, logic, and problem solving without rote geometry formulas.'
      },
      {
        domainId: 'gmat-verbal',
        name: 'Verbal Reasoning',
        latentAbility: 'Critical reasoning (argument evaluation, flaw detection, inference) and reading comprehension.'
      },
      {
        domainId: 'gmat-data-insights',
        name: 'Data Insights & Data Literacy',
        latentAbility: 'Synthesizing information across graphical, tabular, textual, and mathematical data sources to make business decisions.'
      }
    ]
  },

  SAT: {
    examId: 'SAT',
    constructTitle: 'Digital SAT® College and Career Readiness Construct',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'College Board SAT Suite Test Specifications and Math Overview',
      sourceUrl: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    domains: [
      { domainId: 'sat-algebra', name: 'Algebra', latentAbility: 'Linear equations, inequalities, systems, and linear relationships.' },
      { domainId: 'sat-adv-math', name: 'Advanced Math', latentAbility: 'Equivalent algebraic expressions, quadratics, polynomials, and exponential functions.' },
      { domainId: 'sat-problem-solving', name: 'Problem-Solving & Data Analysis', latentAbility: 'Quantitative literacy, ratios, percentages, units, probability, and statistical data models.' },
      { domainId: 'sat-geometry-trig', name: 'Geometry & Trigonometry', latentAbility: 'Area, volume, angles, triangles, circles, and right-triangle trigonometry.' },
      { domainId: 'sat-reading-writing', name: 'Reading & Writing', latentAbility: 'Information and ideas, craft and structure, expression of ideas, and standard English conventions.' }
    ]
  },

  LSAT: {
    examId: 'LSAT',
    constructTitle: 'LSAT® Legal Reasoning Construct',
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'LSAC Specifications for LSAT Assessment',
      sourceUrl: 'https://www.lsac.org/lsat/register-lsat/accommodations/specifications-lsat-and-lsat-argumentative-writing',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    }),
    domains: [
      { domainId: 'lsat-logical-reasoning', name: 'Logical Reasoning', latentAbility: 'Analyzing arguments, identifying flaws, detecting necessary and sufficient assumptions, and evaluating causal claims.' },
      { domainId: 'lsat-reading-comp', name: 'Comparative & Academic Reading Comprehension', latentAbility: 'Discerning main points, author attitude, passage organization, and reconciling viewpoints in paired texts.' }
    ]
  }
};

export function getConstructByExam(examId) {
  if (!examId) return null;
  return CONSTRUCTS_REGISTRY[examId.toUpperCase()] || null;
}
