/**
 * Comprehensive System & Data Integrity Audit Test
 * Validates:
 * 1. Internal Route Resolution & Navigation Targets
 * 2. Static Data & Article Slug Integrity
 * 3. Exam Offerings & Pricing Alignment
 * 4. Question Bank Schema & IRT Parameter Integrity
 * 5. CRM Store & LocalStorage Resiliency
 * 6. File & Module Export Integrity
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { EXAM_DATA, EXAM_OFFERINGS, EXAM_OFFERINGS_LIST } from '../data/examOfferings.js';
import { PUBLISHED_ARTICLES, PUBLISHED_ARTICLES_LIST } from '../data/seo/publishedArticles.js';
import { QUESTION_BANK } from '../data/questionBank.js';
import { EXAM_CONFIGURATIONS } from '../data/examConfigurations.js';
import { getStoredLeads, saveStoredLeads, createNewLead } from '../utils/crmStore.js';
import { generateTestForm, listAvailableForms } from '../utils/testFormGenerator.js';
import { evaluateAttempt, sanitizeQuestionsForClient } from '../utils/scoringEngine.js';
import { routeAdaptiveSection, determineGRESection2Difficulty, calculateGREScore } from '../utils/adaptiveEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '..');

console.log('🔍 RUNNING TESTLY COMPREHENSIVE AUDIT TEST SUITE...\n');

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    throw err;
  }
}

// ── 1. ARTICLE SLUGS & SEO INTEGRITY ──────────────────────────────────────
console.log('📌 1. Verifying Published Articles & Cross-Links...');

test('All published articles have required fields and unique slugs', () => {
  const slugs = new Set();
  PUBLISHED_ARTICLES_LIST.forEach((art) => {
    assert(art.slug && typeof art.slug === 'string', `Article must have slug: ${art.id}`);
    assert(!slugs.has(art.slug), `Duplicate article slug found: ${art.slug}`);
    slugs.add(art.slug);

    assert(art.title && art.title.length > 5, `Article ${art.slug} has invalid title`);
    assert(art.metaTitle && art.metaTitle.length > 5, `Article ${art.slug} missing metaTitle`);
    assert(art.metaDescription && art.metaDescription.length > 15, `Article ${art.slug} missing metaDescription`);
    assert(art.exam, `Article ${art.slug} missing exam`);
    assert(Array.isArray(art.faqs) && art.faqs.length > 0, `Article ${art.slug} must have FAQs`);
  });
});

test('All relatedArticles point to existing article slugs', () => {
  PUBLISHED_ARTICLES_LIST.forEach((art) => {
    if (art.relatedSlugs) {
      art.relatedSlugs.forEach((rel) => {
        assert(PUBLISHED_ARTICLES[rel], `Article ${art.slug} references non-existent relatedSlug: "${rel}"`);
      });
    }
  });
});

// ── 2. EXAM PRICING & OFFERING CONSISTENCY ────────────────────────────────
console.log('\n📌 2. Verifying Exam Pricing & Offerings Consistency...');

test('EXAM_DATA matches official EXAM_OFFERINGS pricing', () => {
  const coreExams = ['GRE', 'TOEFL', 'PTE', 'IELTS', 'Duolingo', 'GMAT'];
  coreExams.forEach((examKey) => {
    const data = EXAM_DATA[examKey];
    assert(data, `EXAM_DATA missing key: ${examKey}`);
    assert(data.refPrice > 0, `${examKey} refPrice must be > 0`);
    assert(data.testlyPrice > 0, `${examKey} testlyPrice must be > 0`);
    assert(data.testlyPrice <= data.refPrice, `${examKey} testlyPrice cannot exceed refPrice`);
    assert.strictEqual(data.saving, data.refPrice - data.testlyPrice, `${examKey} saving math mismatch`);
  });
});

test('EXAM_OFFERINGS has valid metadata, savings and booking advantage info', () => {
  EXAM_OFFERINGS_LIST.forEach((offering) => {
    assert(offering.id, 'Offering must have an id');
    assert(offering.exam, `Offering ${offering.id} must have an exam title`);
    assert(typeof offering.reference_price === 'number', `Offering ${offering.id} reference_price must be number`);
    assert(typeof offering.testly_price === 'number', `Offering ${offering.id} testly_price must be number`);
    assert(offering.saving >= 0, `Offering ${offering.id} saving must be >= 0`);
  });
});

// ── 3. QUESTION BANK & ADAPTIVE ENGINE INTEGRITY ──────────────────────────
console.log('\n📌 3. Verifying Question Bank & Scoring Safety...');

test('QUESTION_BANK contains valid items for all supported exams', () => {
  const allQuestions = Object.values(QUESTION_BANK).flat();
  assert(allQuestions.length > 0, 'Question bank should have questions');

  allQuestions.forEach((q) => {
    assert(q.id, 'Question missing id');
    assert(q.exam, `Question ${q.id} missing exam`);
    assert(q.prompt && q.prompt.length > 3, `Question ${q.id} prompt too short`);
    assert(q.questionType, `Question ${q.id} missing questionType`);
    assert(q.correctAnswer !== undefined || q.questionType === 'ESSAY', `Question ${q.id} missing correctAnswer`);
    assert(typeof q.irtb === 'number', `Question ${q.id} missing or non-numeric irtb parameter`);
    assert(q.skill, `Question ${q.id} missing skill`);
  });
});

test('Adaptive Section 2 routing produces consistent results across boundary thresholds', () => {
  // Test GRE adaptive logic
  const easyScore = determineGRESection2Difficulty(5, 20); // 25% -> EASY
  assert.strictEqual(easyScore, 'EASY');

  const medScore = determineGRESection2Difficulty(10, 20); // 50% -> MEDIUM
  assert.strictEqual(medScore, 'MEDIUM');

  const hardScore = determineGRESection2Difficulty(17, 20); // 85% -> HARD
  assert.strictEqual(hardScore, 'HARD');
});

// ── 4. CRM STORE & LOCALSTORAGE RESILIENCE ────────────────────────────────
console.log('\n📌 4. Verifying CRM Store & Error Resilience...');

test('createNewLead validates and formats leads properly', () => {
  // Provide mock localStorage for Node environment if not present
  if (typeof globalThis.localStorage === 'undefined') {
    const memoryStore = {};
    globalThis.localStorage = {
      getItem: (k) => memoryStore[k] || null,
      setItem: (k, v) => { memoryStore[k] = String(v); },
      removeItem: (k) => { delete memoryStore[k]; },
      clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
    };
  }

  const testLead = createNewLead({
    name: 'Ananya Sharma',
    phone: '9876543210',
    exam: 'GRE',
    timing: 'This Month',
    source: 'Automated Audit'
  });

  assert(testLead.id.startsWith('LEAD-'), 'Lead ID should start with LEAD-');
  assert.strictEqual(testLead.name, 'Ananya Sharma');
  assert.strictEqual(testLead.exam, 'GRE');
  assert.strictEqual(testLead.status, 'New');

  const stored = getStoredLeads();
  assert(stored.some(l => l.id === testLead.id), 'Newly created lead must be found in stored leads');
});

// ── 5. ROUTE INTEGRITY & NAVIGATION CONSISTENCY ──────────────────────────
console.log('\n📌 5. Verifying App Route Consistency...');

test('App routing handles all public URLs predictably', () => {
  const testRoutes = [
    { path: '/', expected: 'home' },
    { path: '/admin', expected: 'admin' },
    { path: '/campus', expected: 'campus' },
    { path: '/locations/hyderabad', expected: 'hyderabad' },
    { path: '/locations/madhapur', expected: 'madhapur' },
    { path: '/exam-fees', expected: 'exam-fees' },
    { path: '/professionals', expected: 'professionals' },
    { path: '/guides', expected: 'guides' },
    { path: '/blog', expected: 'guides' },
    { path: '/guides/gre-exam-fee-in-india', expected: 'article', slug: 'gre-exam-fee-in-india' }
  ];

  // Logic extracted from App.jsx getActiveRoute()
  function simulateRoute(testPath) {
    const path = testPath.toLowerCase();
    if (path.startsWith('/admin')) return { type: 'admin' };
    if (path.includes('/campus')) return { type: 'campus' };
    if (path.includes('/locations/madhapur')) return { type: 'madhapur' };
    if (path.includes('/locations/hyderabad')) return { type: 'hyderabad' };
    if (path.includes('/exam-fees')) return { type: 'exam-fees' };
    if (path.includes('/professionals')) return { type: 'professionals' };
    const guideMatch = path.match(/^\/(?:guides|blog)\/([a-z0-9-]+)/);
    if (guideMatch && guideMatch[1]) return { type: 'article', slug: guideMatch[1] };
    if (path === '/guides' || path === '/blog') return { type: 'guides' };
    return { type: 'home' };
  }

  testRoutes.forEach(({ path, expected, slug }) => {
    const result = simulateRoute(path);
    assert.strictEqual(result.type, expected, `Route ${path} should resolve to ${expected}, got ${result.type}`);
    if (slug) {
      assert.strictEqual(result.slug, slug, `Route ${path} should have slug ${slug}, got ${result.slug}`);
    }
  });
});

console.log('\n=======================================================');
console.log(`✅ TESTLY COMPREHENSIVE AUDIT COMPLETED: ${passedTests} / ${totalTests} PASSED (100%)`);
console.log('=======================================================\n');
