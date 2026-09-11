// Adaptive Testing & Scoring Engine for Testly Practice (GRE & General Standardization)

/**
 * GRE Section-Level Adaptation Logic
 * Evaluates Section 1 performance to route to Easy, Medium, or Hard Section 2 form.
 */
export function determineGRESection2Difficulty(scoreSec1, totalSec1 = 4) {
  const ratio = scoreSec1 / totalSec1;
  if (ratio >= 0.75) return 'HARD';
  if (ratio >= 0.40) return 'MEDIUM';
  return 'EASY';
}

/**
 * Calculates Testly Estimated Score Range for GRE General Test
 * Scale: Verbal (130-170), Quant (130-170), Total (260-340)
 */
export function calculateGREScore({
  verbalSec1Correct = 0,
  verbalSec1Total = 4,
  verbalSec2Correct = 0,
  verbalSec2Total = 1,
  verbalSec2Diff = 'MEDIUM',
  quantSec1Correct = 0,
  quantSec1Total = 3,
  quantSec2Correct = 0,
  quantSec2Total = 1,
  quantSec2Diff = 'MEDIUM'
}) {
  // Base raw calculations
  const rawVerbal = verbalSec1Correct + verbalSec2Correct;
  const rawQuant = quantSec1Correct + quantSec2Correct;

  // Adaptive Difficulty Weight Bonus
  let verbalBonus = 0;
  if (verbalSec2Diff === 'HARD') verbalBonus = 3;
  if (verbalSec2Diff === 'EASY') verbalBonus = -2;

  let quantBonus = 0;
  if (quantSec2Diff === 'HARD') quantBonus = 3;
  if (quantSec2Diff === 'EASY') quantBonus = -2;

  // Scaled Score Calculations (130 - 170 range)
  const verbalScaled = Math.min(170, Math.max(130, 130 + Math.round((rawVerbal / (verbalSec1Total + verbalSec2Total)) * 37) + verbalBonus));
  const quantScaled = Math.min(170, Math.max(130, 130 + Math.round((rawQuant / (quantSec1Total + quantSec2Total)) * 37) + quantBonus));
  const totalScore = verbalScaled + quantScaled;

  return {
    verbalScaled,
    quantScaled,
    totalScore,
    rawVerbal,
    rawQuant,
    verbalSec2Diff,
    quantSec2Diff,
    accuracyPercent: Math.round(((rawVerbal + rawQuant) / (verbalSec1Total + verbalSec2Total + quantSec1Total + quantSec2Total)) * 100)
  };
}

/**
 * Route candidate to next adaptive section based on item performance
 */
export function routeAdaptiveSection(sectionType = 'QUANT', section1Performance = []) {
  const correctCount = section1Performance.filter(q => q.isCorrect).length;
  const totalCount = section1Performance.length || 1;
  const decision = determineGRESection2Difficulty(correctCount, totalCount);

  return {
    sectionType,
    correctCount,
    totalCount,
    routingDecision: decision,
    targetSectionIndex: decision === 'HARD' ? 3 : decision === 'MEDIUM' ? 2 : 1
  };
}
