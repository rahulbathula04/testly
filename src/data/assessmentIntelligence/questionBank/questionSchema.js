/**
 * Testly Assessment Intelligence — Question Bank Item Schema
 * 
 * Defines the complete immutable schema for every Testly question item,
 * spanning identification, construct mapping, content, distractor rationales,
 * copyright provenance, and empirical psychometric telemetry.
 */

export function createQuestionItem({
  // 1. Identification & Versioning
  question_id,
  exam,
  exam_version,
  section,
  domain,
  subdomain = '',
  skill,
  subskill = '',
  question_type,
  difficulty = 'E3', // E1, E2, E3, E4, E5
  estimated_time_seconds = 90,

  // 2. Content & Authoring
  stimulus = '', // passage, reading text, audio transcript, or prompt context
  question,
  options = [],
  correct_answer, // index or value
  explanation,
  distractor_rationale = {}, // e.g. { 0: 'Plausible inversion of sign', 2: 'Misidentified premises' }

  // 3. Provenance, Governance & Review
  source_type = 'OFFICIAL_SPECIFICATION_ORIGINAL_ITEM',
  author = 'Testly Item Writer',
  reviewer = 'SME Review Board',
  copyright_class = 'A', // A, B, C, D, E
  license_id = null,
  created_at = new Date().toISOString(),
  reviewed_at = null,
  published_at = null,
  status = 'LIVE', // DRAFT, AI_GENERATED, SME_REVIEW, PILOT, LIVE, RETIRED

  // 4. Psychometric & Exposure Telemetry
  psychometrics = {
    attempt_count: 0,
    p_correct: 0.50,
    point_biserial: 0.35,
    difficulty_estimate: 0.0, // IRT b parameter
    discrimination: 1.0,      // IRT a parameter
    option_selection: {},
    omit_rate: 0.02,
    median_response_time_sec: 75,
    exposure_count: 0,
    security_flag: 'NORMAL'
  }
}) {
  return {
    question_id,
    exam,
    exam_version,
    section,
    domain,
    subdomain,
    skill,
    subskill,
    question_type,
    difficulty,
    estimated_time_seconds,
    stimulus,
    question,
    options,
    correct_answer,
    explanation,
    distractor_rationale,
    source_type,
    author,
    reviewer,
    copyright_class,
    license_id,
    created_at,
    reviewed_at,
    published_at,
    status,
    psychometrics
  };
}
