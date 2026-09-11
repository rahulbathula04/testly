/**
 * Red Team Security Test Suite for Testly Practice Engine
 * Validates protection against DevTools inspection key leakage, response tampering,
 * payload injection, and confirms presence of legal mock indicator metadata.
 */

import assert from 'assert';
import { sanitizeQuestionsForClient, evaluateAttempt } from '../utils/scoringEngine.js';
import { generateTestForm } from '../utils/testFormGenerator.js';

console.log('🛡️ RUNNING RED TEAM SECURITY TEST SUITE...\n');

// 1. DevTools Inspection Answer Key Exposure Test
console.log('1. Testing DevTools Answer Key Stripping...');
const secretQuestionPool = [
  { id: 'sec_1', prompt: 'Solve for x: x^2 = 16', correctAnswer: '4', explanation: 'x = sqrt(16) = 4', irtb: 0.5 },
  { id: 'sec_2', prompt: 'Select synonym for Ephemeral', correctAnswer: 'Transient', explanation: 'Ephemeral means lasting a short time', irtb: 1.2 }
];

const clientPayload = sanitizeQuestionsForClient(secretQuestionPool);
const payloadString = JSON.stringify(clientPayload);

assert(!payloadString.includes('correctAnswer'), 'SECURITY FAILURE: correctAnswer found in client payload!');
assert(!payloadString.includes('explanation'), 'SECURITY FAILURE: explanation found in client payload!');
assert(!payloadString.includes('Transient'), 'SECURITY FAILURE: Answer key string leaked in payload!');
console.log('   ✅ DevTools Answer Key Stripping: 100% SECURE');

// 2. Score Tampering & Malformed Answer Payload Protection Test
console.log('\n2. Testing Malformed & Injected Answer Payload Protection...');
const questions = [
  { id: 'q1', sectionType: 'QUANT_1', domain: 'Algebra', difficulty: 'MEDIUM', correctAnswer: '25' }
];

const maliciousAnswers = {
  q1: { toString: () => '25', valueOf: () => '25' }, // Object injection attempt
  __proto__: { rawCorrect: 9999 }, // Prototype pollution attempt
  scoreOverride: 340
};

const evalResult = evaluateAttempt('GRE', questions, maliciousAnswers);
assert.strictEqual(evalResult.rawCorrect, 0, 'Injected object answer must be rejected');
assert.notStrictEqual(evalResult.totalScore, 340, 'Proto pollution / score override must be ignored');
console.log('   ✅ Score Tampering & Injection Protection: 100% SECURE');

// 3. Legal Mock Metadata Assurance Test
console.log('\n3. Testing Legal Mock Indicator Metadata Enforcement...');
const mockForm = generateTestForm('TOEFL', 1);
assert.strictEqual(mockForm.legalNotice.isUnofficialMock, true, 'Mock form must carry isUnofficialMock flag');
assert(mockForm.legalNotice.disclaimer.includes('independent practice tool'), 'Mock form must contain explicit independent practice disclaimer');
console.log('   ✅ Legal Mock Metadata Assurance: 100% COMPLIANT');

console.log('\n🛡️ ALL RED TEAM SECURITY TESTS PASSED SUCCESSFULLY (0 VULNERABILITIES)!');
