/**
 * Integration Test Suite for Testly Practice Engine
 * Verifies end-to-end attempt lifecycle:
 * Dynamic Form Generation -> Section Adaptive Routing -> Client Answer Key Sanitization -> Deterministic Scoring
 */

import assert from 'assert';
import { generateTestForm } from '../utils/testFormGenerator.js';
import { routeAdaptiveSection } from '../utils/adaptiveEngine.js';
import { sanitizeQuestionsForClient, evaluateAttempt } from '../utils/scoringEngine.js';

console.log('🧪 RUNNING TESTLY INTEGRATION TEST SUITE...\n');

// 1. Dynamic Form Generation Test
console.log('1. Testing Dynamic Form Generation...');
const testForm = generateTestForm('GRE', 1);
assert.strictEqual(testForm.examId, 'GRE');
assert.strictEqual(testForm.legalNotice.isUnofficialMock, true);
assert(testForm.sections.length > 0, 'Form should contain sections');
console.log('   ✅ Dynamic Form Generation: PASSED');

// 2. Client Sanitization Security Test
console.log('\n2. Testing Active Mock Client Data Sanitization...');
const rawQuestions = testForm.sections[0].questions;
const sanitized = sanitizeQuestionsForClient(rawQuestions);
sanitized.forEach((q) => {
  assert.strictEqual(q.correctAnswer, undefined, `Question ${q.id} must not leak correctAnswer`);
  assert.strictEqual(q.explanation, undefined, `Question ${q.id} must not leak explanation`);
  assert(q.prompt !== undefined, `Question ${q.id} must retain prompt`);
});
console.log('   ✅ Client Data Sanitization: PASSED');

// 3. Adaptive Section Branching Lifecycle Test
console.log('\n3. Testing Adaptive Routing Integration...');
const section1Performance = [
  { id: 'q1', isCorrect: true, irtb: 0.1 },
  { id: 'q2', isCorrect: true, irtb: 0.5 },
  { id: 'q3', isCorrect: true, irtb: 0.8 },
];
const adaptiveRouting = routeAdaptiveSection('QUANT', section1Performance);
assert.strictEqual(adaptiveRouting.routingDecision, 'HARD');
assert.strictEqual(adaptiveRouting.targetSectionIndex, 3);
console.log('   ✅ Adaptive Routing Integration: PASSED');

// 4. Deterministic Post-Submission Evaluation Test
console.log('\n4. Testing Full Attempt Evaluation...');
const sampleQuestions = [
  { id: 'q1', sectionType: 'VERBAL_1', domain: 'Text Completion', difficulty: 'MEDIUM', correctAnswer: 'A' },
  { id: 'q2', sectionType: 'QUANT_1', domain: 'Algebra', difficulty: 'HARD', correctAnswer: '42' },
];
const userAnswers = { q1: 'A', q2: '42' };
const result = evaluateAttempt('GRE', sampleQuestions, userAnswers);

assert.strictEqual(result.totalQuestions, 2);
assert.strictEqual(result.rawCorrect, 2);
assert.strictEqual(result.accuracyPercentage, 100);
assert(result.totalScore >= 130 && result.totalScore <= 340);
console.log('   ✅ Post-Submission Evaluation: PASSED');

console.log('\n🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY (0 FAILURES)!');
