import { createQuestionItem } from './questionSchema';

export const SAMPLE_QUESTION_BANK = [
  // 1. GRE Quantitative (Class A Testly Original)
  createQuestionItem({
    question_id: 'Q-GRE-Q-001042',
    exam: 'GRE',
    exam_version: 'GRE-2023-CURRENT',
    section: 'Quantitative Reasoning',
    domain: 'Algebra',
    subdomain: 'Linear Inequalities',
    skill: 'Quantitative Comparison',
    question_type: 'QUANTITATIVE_COMPARISON',
    difficulty: 'E3',
    estimated_time_seconds: 75,
    stimulus: 'Given that 3x - 7 > 2x + 5 and x is an integer.',
    question: 'Compare Quantity A and Quantity B:',
    options: [
      'Quantity A: The minimum possible value of 2x',
      'Quantity B: 26',
      'The two quantities are equal',
      'The relationship cannot be determined from the information given'
    ],
    correct_answer: 0,
    explanation: '3x - 7 > 2x + 5 simplifies to x > 12. Since x is an integer, the minimum possible value of x is 13. Therefore, Quantity A = 2(13) = 26. But x can also be 14, making 2x = 28. Wait: if x = 13, Quantity A = 26. The question specifies "minimum possible value of 2x", which is strictly 26. Since Quantity B is 26, the two quantities are equal!',
    distractor_rationale: {
      0: 'Candidate assumed x can take any higher value and chose Quantity A',
      1: 'Candidate incorrectly solved 3x - 2x < 12 and concluded Quantity B was larger',
      3: 'Candidate failed to notice "minimum possible value" condition'
    },
    copyright_class: 'A',
    status: 'LIVE',
    author: 'Testly Assessment Team (Math SME-02)',
    reviewer: 'Editorial Board (GRE Reviewer)',
    psychometrics: {
      attempt_count: 840,
      p_correct: 0.54,
      point_biserial: 0.38,
      difficulty_estimate: 0.12,
      discrimination: 1.15,
      option_selection: { 0: 0.22, 1: 0.10, 2: 0.54, 3: 0.14 },
      omit_rate: 0.01,
      median_response_time_sec: 68,
      exposure_count: 840,
      security_flag: 'NORMAL'
    }
  }),

  // 2. TOEFL 2026 Reading: Complete the Words (Class A Testly Original)
  createQuestionItem({
    question_id: 'Q-TOEFL-2026-R-000219',
    exam: 'TOEFL',
    exam_version: 'TOEFL-IBT-2026',
    section: 'Reading',
    domain: 'Morphological & Lexical Access',
    subdomain: 'Academic Vocabulary in Context',
    skill: 'Complete the Words',
    question_type: 'C_TEST_COMPLETION',
    difficulty: 'E2',
    estimated_time_seconds: 45,
    stimulus: 'Photosynthesis is essential for terrestrial ecosystems. In addition to producing oxygen, plants conv___ solar energy in___ chemical energy stored in glucose.',
    question: 'Fill in the missing letters to complete the target academic words:',
    options: ['conv[ert] / in[to]', 'conv[ey] / in[side]', 'conv[oke] / in[stead]', 'conv[ene] / in[wards]'],
    correct_answer: 0,
    explanation: '"Convert" is the precise scientific term for transforming energy forms, and is followed by the preposition "into".',
    distractor_rationale: {
      1: 'Plausible verb "convey" but syntactically incorrect with "solar energy into"',
      2: 'Incorrect archaic root',
      3: 'Wrong semantic category'
    },
    copyright_class: 'A',
    status: 'LIVE',
    author: 'Testly ESL Curriculum Team',
    reviewer: 'TOEFL Psychometrician',
    psychometrics: {
      attempt_count: 620,
      p_correct: 0.72,
      point_biserial: 0.34,
      difficulty_estimate: -0.45,
      discrimination: 0.95,
      option_selection: { 0: 0.72, 1: 0.18, 2: 0.05, 3: 0.05 },
      omit_rate: 0.01,
      median_response_time_sec: 38,
      exposure_count: 620,
      security_flag: 'NORMAL'
    }
  }),

  // 3. GMAT Data Insights (Class A Testly Original)
  createQuestionItem({
    question_id: 'Q-GMAT-DI-000412',
    exam: 'GMAT',
    exam_version: 'GMAT-CURRENT-3SECTION',
    section: 'Data Insights',
    domain: 'Data Sufficiency',
    subdomain: 'Inequalities and Absolute Value',
    skill: 'Mathematical Decision Analysis',
    question_type: 'DATA_SUFFICIENCY',
    difficulty: 'E4',
    estimated_time_seconds: 120,
    stimulus: 'Is |p - q| > 5?',
    question: 'Evaluate whether the following statements provide sufficient data:\n(1) p > 10 and q < 3\n(2) p + q = 12',
    options: [
      'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.',
      'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.',
      'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
      'EACH statement ALONE is sufficient.',
      'Statements (1) and (2) TOGETHER are NOT sufficient.'
    ],
    correct_answer: 0,
    explanation: 'From (1), since p > 10 and q < 3, the difference p - q must be strictly greater than 10 - 3 = 7. Since p - q > 7 > 5, |p - q| > 5 is definitively YES. Statement (1) alone is sufficient. Statement (2) allows p = 6, q = 6 (|0| < 5) or p = 20, q = -8 (|28| > 5), hence insufficient.',
    distractor_rationale: {
      2: 'Candidate believed both statements were necessary to identify unique values of p and q',
      4: 'Candidate assumed signs could reverse the distance inequality'
    },
    copyright_class: 'A',
    status: 'LIVE',
    author: 'Testly Quant Strategy Group',
    reviewer: 'GMAT Subject Expert',
    psychometrics: {
      attempt_count: 512,
      p_correct: 0.41,
      point_biserial: 0.44,
      difficulty_estimate: 0.65,
      discrimination: 1.30,
      option_selection: { 0: 0.41, 1: 0.12, 2: 0.31, 3: 0.05, 4: 0.11 },
      omit_rate: 0.03,
      median_response_time_sec: 105,
      exposure_count: 512,
      security_flag: 'NORMAL'
    }
  }),

  // 4. Digital SAT Math: Advanced Math (Class A Testly Original)
  createQuestionItem({
    question_id: 'Q-SAT-M-000805',
    exam: 'SAT',
    exam_version: 'SAT-DIGITAL-2023-CURRENT',
    section: 'Math',
    domain: 'Advanced Math',
    subdomain: 'Quadratic Functions & Discriminant',
    skill: 'Zeros and Number of Solutions',
    question_type: 'MULTIPLE_CHOICE',
    difficulty: 'E3',
    estimated_time_seconds: 80,
    stimulus: 'The equation 2x² - kx + 8 = 0 has exactly one real solution, where k is a positive constant.',
    question: 'What is the value of k?',
    options: ['4', '8', '16', '64'],
    correct_answer: 1,
    explanation: 'A quadratic ax² + bx + c = 0 has exactly one real solution when its discriminant b² - 4ac = 0. Here, (-k)² - 4(2)(8) = 0 => k² - 64 = 0 => k² = 64. Since k is a positive constant, k = 8.',
    distractor_rationale: {
      0: 'Candidate mistakenly used 4ac = 64 and divided by 16',
      2: 'Candidate forgot the square root of 64 or confused k with 2k',
      3: 'Candidate evaluated k² rather than k'
    },
    copyright_class: 'A',
    status: 'LIVE',
    author: 'Testly High School Testing Lead',
    reviewer: 'SAT Psychometric Reviewer',
    psychometrics: {
      attempt_count: 1120,
      p_correct: 0.61,
      point_biserial: 0.39,
      difficulty_estimate: -0.15,
      discrimination: 1.10,
      option_selection: { 0: 0.09, 1: 0.61, 2: 0.18, 3: 0.12 },
      omit_rate: 0.01,
      median_response_time_sec: 72,
      exposure_count: 1120,
      security_flag: 'NORMAL'
    }
  })
];

export function getQuestionsByExam(examId) {
  if (!examId) return [];
  return SAMPLE_QUESTION_BANK.filter(q => q.exam.toUpperCase() === examId.toUpperCase());
}
