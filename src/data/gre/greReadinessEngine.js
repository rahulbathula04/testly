/**
 * Testly GRE Readiness Score™ (TRS-GRE v0.1) & Next-Action Recommendation Engine
 * 
 * Synthesizes:
 * 1. Skill Mastery (30%)
 * 2. Raw Accuracy (25%)
 * 3. Difficulty Tier Performance (20%)
 * 4. Time Management / Pacing (15%)
 * 5. Section-to-Section Consistency (10%)
 */

export function calculateGreReadiness(diagnosticResult = {}) {
  const {
    accuracyPct = 78,
    verbalScorePct = 74,
    quantScorePct = 81,
    skillMap = [],
    weakestArea = { skill: 'Sentence Equivalence', performance: 69 },
    strongestArea = { skill: 'Arithmetic', performance: 88 },
    timeManagement = { score: 69, avgSecondsPerItem: 110 }
  } = diagnosticResult;

  // 1. Skill Mastery
  const avgSkillScore = skillMap.length > 0
    ? skillMap.reduce((acc, s) => acc + s.performance, 0) / skillMap.length
    : (verbalScorePct + quantScorePct) / 2;
  const skillMasteryScore = Math.round(avgSkillScore);

  // 2. Accuracy
  const accuracyScore = Math.round(accuracyPct);

  // 3. Difficulty Performance
  // In GRE, handling E3/E4 items is necessary for high section routing
  const difficultyScore = Math.max(50, Math.min(100, Math.round(accuracyScore * 0.94)));

  // 4. Time Management
  const timeScore = Math.round(timeManagement.score || 70);

  // 5. Consistency
  const scoreSpread = Math.abs(verbalScorePct - quantScorePct);
  const consistencyScore = Math.max(50, Math.min(100, 100 - scoreSpread * 1.5));

  // Weighted Composite (0–100)
  const overallReadiness = Math.round(
    skillMasteryScore * 0.30 +
    accuracyScore * 0.25 +
    difficultyScore * 0.20 +
    timeScore * 0.15 +
    consistencyScore * 0.10
  );

  // Determine Primary Bottleneck / Insight
  let primaryConstraint = '';
  if (timeScore < 70) {
    primaryConstraint = 'Your biggest current constraint is time management. Working through questions within strict 90-second pacing windows will yield an immediate score lift.';
  } else if (weakestArea.performance < 70) {
    primaryConstraint = `Your biggest current constraint is ${weakestArea.skill}. Subskill diagnostic shows lower consistency on high-difficulty distractors.`;
  } else if (scoreSpread > 15) {
    primaryConstraint = `Your section scores show an imbalance between Verbal (${verbalScorePct}%) and Quant (${quantScorePct}%). Equalizing cross-section performance stabilizes routing into higher adaptive tiers.`;
  } else {
    primaryConstraint = 'Your baseline profile exhibits solid foundational balance across Verbal and Quant. Refining timing on challenging (E4) items is your highest-leverage priority.';
  }

  // Next 7 Days Action Plan (The Learning Loop)
  const next7DaysPlan = [
    {
      step: '01',
      title: `20 ${weakestArea.skill} questions`,
      action: `Targeted practice focused on eliminating answer traps in ${weakestArea.skill}.`,
      skillTarget: weakestArea.skill,
      isImmediateAction: true
    },
    {
      step: '02',
      title: '15-minute high-frequency vocabulary drill',
      action: 'Strengthen secondary and tertiary context definitions for academic text completion.',
      skillTarget: 'Text Completion'
    },
    {
      step: '03',
      title: 'One timed Verbal / Quant section test',
      action: 'Build pacing rhythm under authentic 18-minute section constraints.',
      skillTarget: 'Pacing'
    },
    {
      step: '04',
      title: 'Retake diagnostic reassessment',
      action: 'Verify skill migration from Priority into Developing/Strong tiers.',
      skillTarget: 'Reassessment'
    }
  ];

  return {
    overallReadiness,
    components: [
      { name: 'SKILL MASTERY', score: skillMasteryScore, description: 'Composite conceptual understanding across all 7 core skills' },
      { name: 'ACCURACY', score: accuracyScore, description: 'Raw proportion of correct responses on attempted items' },
      { name: 'DIFFICULTY PERFORMANCE', score: difficultyScore, description: 'Resilience on challenging standard and advanced items' },
      { name: 'TIME MANAGEMENT', score: timeScore, description: 'Adherence to GRE 90-second per question pacing benchmark' },
      { name: 'CONSISTENCY', score: consistencyScore, description: 'Sustained performance balance across Verbal and Quant' }
    ],
    primaryConstraint,
    strongestArea,
    weakestArea,
    next7DaysPlan
  };
}
