/**
 * Personalization & Recommendation Engine for Testly Practice Engine
 * Analyzes candidate score gap vs target score, identifies weak domain tags,
 * and generates targeted "Next Best Action" micro-drills to accelerate score improvement.
 */

export function generatePersonalizedRecommendations(attemptHistory = [], targetScore = 325) {
  if (!attemptHistory || attemptHistory.length === 0) {
    return {
      currentEstimate: 300,
      targetScore,
      scoreGap: targetScore - 300,
      priorityWeakSkills: ['Text Completion', 'Quantitative Comparison', 'Reading Comprehension'],
      nextBestAction: {
        title: 'Complete Free Baseline Diagnostic Mock',
        description: 'Take your first full adaptive mock test to establish your IRT baseline ability score.',
        actionType: 'MOCK',
        recommendedQuestionsCount: 40
      },
      recommendedDrills: [
        { skill: 'Text Completion (Double/Triple Blank)', recommendedCount: 15, difficulty: 'Medium' },
        { skill: 'Data Interpretation Graphs', recommendedCount: 12, difficulty: 'Medium' },
        { skill: 'Quantitative Comparison', recommendedCount: 20, difficulty: 'Hard' }
      ]
    };
  }

  // Aggregate accuracy per skill tag across past attempts
  const skillStats = {};
  let latestScore = 300;

  attemptHistory.forEach((attempt) => {
    if (attempt.totalScore) {
      latestScore = attempt.totalScore;
    }
    if (attempt.breakdown) {
      Object.entries(attempt.breakdown).forEach(([skill, data]) => {
        if (!skillStats[skill]) {
          skillStats[skill] = { correct: 0, total: 0 };
        }
        skillStats[skill].correct += data.correct || 0;
        skillStats[skill].total += data.total || 0;
      });
    }
  });

  const skillAccuracies = Object.entries(skillStats).map(([skill, stats]) => ({
    skill,
    accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 100,
    total: stats.total
  }));

  // Sort ascending by accuracy (weakest first)
  skillAccuracies.sort((a, b) => a.accuracy - b.accuracy);

  const weakSkills = skillAccuracies.filter(s => s.accuracy < 70).map(s => s.skill);
  const primaryWeakness = weakSkills[0] || 'Quantitative Reasoning';

  const scoreGap = Math.max(0, targetScore - latestScore);

  return {
    currentEstimate: latestScore,
    targetScore,
    scoreGap,
    priorityWeakSkills: weakSkills.slice(0, 3),
    nextBestAction: {
      title: `Targeted Drill: ${primaryWeakness}`,
      description: `Targeting your lowest accuracy area (${skillAccuracies[0] ? Math.round(skillAccuracies[0].accuracy) : 0}% accuracy) to close your ${scoreGap}-point gap to target ${targetScore}.`,
      actionType: 'PRACTICE',
      skillFocus: primaryWeakness,
      recommendedQuestionsCount: 15
    },
    recommendedDrills: skillAccuracies.slice(0, 3).map((s) => ({
      skill: s.skill,
      accuracy: Math.round(s.accuracy),
      recommendedCount: 15,
      difficulty: s.accuracy < 50 ? 'Medium' : 'Hard'
    }))
  };
}
