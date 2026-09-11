// Automated Unit Test Suite for Testly Scoring & Adaptive Engine

import { evaluateAttempt, sanitizeQuestionsForClient } from '../utils/scoringEngine.js';
import { determineGRESection2Difficulty } from '../utils/adaptiveEngine.js';
import { GRE_QUESTION_BANK } from '../data/questionBank.js';

export function runScoringTests() {
  console.log('🧪 Running Testly Practice Engine Automated Unit Tests...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // TEST 1: Deterministic Scoring Consistency (Complete answer set for Sec 1 & Sec 2 Hard)
  const testAnswers = {
    gre_v1_q1: 1, // Correct
    gre_v1_q2: [1, 4], // Correct
    gre_v1_q3: [1, 3], // Correct
    gre_v1_q4: 1, // Correct
    gre_v2h_q1: 1, // Correct (Sec 2 Hard)
    gre_q1_q1: 2, // Correct
    gre_q1_q2: '72', // Correct
    gre_q1_q3: 2, // Correct
    gre_q2h_q1: 0 // Correct (Sec 2 Hard)
  };

  const res1 = evaluateAttempt({
    userAnswers: testAnswers,
    questionBank: GRE_QUESTION_BANK,
    sec2VerbalDiff: 'HARD',
    sec2QuantDiff: 'HARD'
  });

  const res2 = evaluateAttempt({
    userAnswers: testAnswers,
    questionBank: GRE_QUESTION_BANK,
    sec2VerbalDiff: 'HARD',
    sec2QuantDiff: 'HARD'
  });

  assert(res1.totalScore === res2.totalScore, 'Deterministic scoring: Identical answer set produces identical total score.');
  assert(res1.accuracyPercent === 100, 'All correct answers produce 100% accuracy.');

  // TEST 2: Score Monotonicity (Correcting an answer never decreases score)
  const partialAnswers = { ...testAnswers, gre_v1_q1: 0 }; // Wrong answer for q1
  const resPartial = evaluateAttempt({
    userAnswers: partialAnswers,
    questionBank: GRE_QUESTION_BANK,
    sec2VerbalDiff: 'HARD',
    sec2QuantDiff: 'HARD'
  });

  assert(res1.verbalScaled >= resPartial.verbalScaled, 'Monotonicity: Correcting an answer increases or maintains Verbal scaled score.');

  // TEST 3: GRE Adaptive Routing Logic
  assert(determineGRESection2Difficulty(4, 4) === 'HARD', 'Adaptive Routing: 100% in Sec 1 routes to HARD Section 2.');
  assert(determineGRESection2Difficulty(2, 4) === 'MEDIUM', 'Adaptive Routing: 50% in Sec 1 routes to MEDIUM Section 2.');
  assert(determineGRESection2Difficulty(1, 4) === 'EASY', 'Adaptive Routing: <40% in Sec 1 routes to EASY Section 2.');

  // TEST 4: Security Client Answer Key Sanitization
  const rawQuestions = GRE_QUESTION_BANK.VERBAL_SECTION_1;
  const sanitized = sanitizeQuestionsForClient(rawQuestions, 'MOCK');
  assert(sanitized[0].correctAnswer === undefined, 'Security: Client question sanitization strips correctAnswer in MOCK mode.');
  assert(sanitized[0].explanation === undefined, 'Security: Client question sanitization strips explanation in MOCK mode.');

  console.log(`\n📊 Test Results: ${passed} Passed, ${failed} Failed.`);
  return { passed, failed };
}

// Auto-run if executed via Node directly
runScoringTests();
