/**
 * Testly Readiness Score™ (TRS) Engine — Versioned Algorithm
 * 
 * Version: TRS v0.1
 * 
 * IMPORTANT DISCLAIMER:
 * Testly Readiness Score™ is a proprietary composite diagnostic practice metric (0–100).
 * It is NOT an official ETS GRE score, TOEFL score, IELTS band, Pearson PTE score, or GMAC score.
 * It synthesizes content mastery, accuracy, difficulty tolerance, speed, and consistency.
 */

export const TRS_VERSION = 'TRS v0.1';

export function calculateTestlyReadinessScore({
  examId,
  attempts = [],
  domainScores = {},
  avgTimeEfficiencyPct = 85, // 0 - 100% pacing efficiency
  consistencyPct = 80        // 0 - 100% section-to-section stability
}) {
  const totalQuestions = attempts.length;
  if (totalQuestions === 0) {
    return {
      version: TRS_VERSION,
      examId,
      overallReadiness: 0,
      confidenceTier: 'INSUFFICIENT_DATA',
      components: { accuracy: 0, mastery: 0, speed: 0, consistency: 0 },
      strongAreas: [],
      growthAreas: [],
      recommendedNextStep: 'Complete a full 30-minute diagnostic session to establish your baseline score.'
    };
  }

  // 1. Difficulty-weighted accuracy calculation
  let weightedPointsEarned = 0;
  let weightedPointsPossible = 0;

  const difficultyWeights = { E1: 1.0, E2: 1.25, E3: 1.5, E4: 2.0, E5: 2.5 };

  attempts.forEach(item => {
    const weight = difficultyWeights[item.difficulty] || 1.5;
    weightedPointsPossible += weight;
    if (item.isCorrect) {
      weightedPointsEarned += weight;
    }
  });

  const accuracyScore = Math.round((weightedPointsEarned / (weightedPointsPossible || 1)) * 100);

  // 2. Domain mastery synthesis
  const domainKeys = Object.keys(domainScores);
  const avgMastery = domainKeys.length > 0
    ? Math.round(domainKeys.reduce((acc, k) => acc + (domainScores[k] || 0), 0) / domainKeys.length)
    : accuracyScore;

  // 3. Composite TRS v0.1 Formula
  // Accuracy (40%) + Domain Mastery (30%) + Time Management (15%) + Consistency (15%)
  const rawComposite = (accuracyScore * 0.40) + (avgMastery * 0.30) + (avgTimeEfficiencyPct * 0.15) + (consistencyPct * 0.15);
  const overallReadiness = Math.max(10, Math.min(99, Math.round(rawComposite)));

  // 4. Identify Strongest Areas and Growth Areas
  const sortedDomains = Object.entries(domainScores)
    .map(([domain, score]) => ({ domain, score }))
    .sort((a, b) => b.score - a.score);

  const strongAreas = sortedDomains.filter(d => d.score >= 75).slice(0, 3);
  const growthAreas = sortedDomains.filter(d => d.score < 75).reverse().slice(0, 3);

  // Fallback defaults if few domains recorded
  if (growthAreas.length === 0 && sortedDomains.length > 0) {
    growthAreas.push(sortedDomains[sortedDomains.length - 1]);
  }

  // 5. Closed-Loop Learning Recommendation
  const weakestDomain = growthAreas[0]?.domain || 'Core Foundation';
  const recommendedNextStep = `15-minute targeted ${weakestDomain} drill to improve accuracy from ${growthAreas[0]?.score || accuracyScore}% to target benchmark (85%+).`;

  return {
    version: TRS_VERSION,
    examId,
    overallReadiness,
    confidenceTier: totalQuestions >= 60 ? 'HIGH' : totalQuestions >= 25 ? 'MODERATE' : 'PRELIMINARY',
    components: {
      accuracy: accuracyScore,
      domainMastery: avgMastery,
      timeManagement: avgTimeEfficiencyPct,
      consistency: consistencyPct
    },
    domainBreakdown: domainScores,
    strongAreas,
    growthAreas,
    recommendedNextStep
  };
}
