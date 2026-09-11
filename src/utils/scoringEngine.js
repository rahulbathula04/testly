// Secure Scoring & Client Sanitization Engine for Testly Practice

/**
 * Sanitizes questions for client rendering during active Mock Mode
 * Strips correct answers and explanations to prevent client DevTools inspection.
 */
export function sanitizeQuestionsForClient(questions, mode = 'MOCK') {
  if (mode === 'PRACTICE') return questions; // Show full data in Practice Mode

  return questions.map(q => {
    const { correctAnswer, explanation, ...sanitized } = q;
    return sanitized;
  });
}

/**
 * Deterministic Post-Submission Scoring Engine
 * Evaluates candidate responses against authoritative question bank and calculates
 * raw scores, section scaled scores (130-170), total score (260-340), and dynamic skill accuracy.
 */
export function evaluateAttempt(arg1, arg2, arg3) {
  let userAnswers = {};
  let questionBank = null;
  let sec2VerbalDiff = 'MEDIUM';
  let sec2QuantDiff = 'MEDIUM';
  let isArrayMode = false;

  if (typeof arg1 === 'string' && Array.isArray(arg2)) {
    // Positional signature: (examId, questionList, userAnswersObj)
    questionBank = arg2;
    userAnswers = arg3 || {};
    isArrayMode = true;
  } else if (arg1 && typeof arg1 === 'object') {
    userAnswers = arg1.userAnswers || {};
    questionBank = arg1.questionBank;
    sec2VerbalDiff = arg1.sec2VerbalDiff || 'MEDIUM';
    sec2QuantDiff = arg1.sec2QuantDiff || 'MEDIUM';
  }

  let v1Correct = 0, v1Total = 0;
  let v2Correct = 0, v2Total = 0;
  let q1Correct = 0, q1Total = 0;
  let q2Correct = 0, q2Total = 0;
  let rawCorrectTotal = 0;
  let questionCountTotal = 0;

  const skillStats = {}; // { [skillName]: { correct: 0, total: 0 } }

  const processQuestion = (q, isVerbal = true, isSec1 = true) => {
    if (!q) return;
    const userAns = userAnswers[q.id];
    let isCorrect = false;

    // Security sanitization: Reject plain objects to prevent toString() injection attacks
    if (typeof userAns === 'object' && userAns !== null && !Array.isArray(userAns)) {
      isCorrect = false;
    } else if (q.questionType === 'SELECT_TWO') {
      if (Array.isArray(userAns) && Array.isArray(q.correctAnswer)) {
        isCorrect = userAns.length === q.correctAnswer.length && userAns.every(val => q.correctAnswer.includes(val));
      }
    } else if (q.questionType === 'DOUBLE_BLANK') {
      if (Array.isArray(userAns) && Array.isArray(q.correctAnswer)) {
        isCorrect = userAns.length === q.correctAnswer.length && userAns.every((val, idx) => val === q.correctAnswer[idx]);
      }
    } else if (q.questionType === 'NUMERIC_ENTRY') {
      isCorrect = (typeof userAns === 'string' || typeof userAns === 'number') && String(userAns).trim() === String(q.correctAnswer).trim();
    } else {
      isCorrect = (typeof userAns === 'string' || typeof userAns === 'number') && String(userAns) === String(q.correctAnswer);
    }

    if (isCorrect) {
      rawCorrectTotal++;
      if (isVerbal && isSec1) v1Correct++;
      if (isVerbal && !isSec1) v2Correct++;
      if (!isVerbal && isSec1) q1Correct++;
      if (!isVerbal && !isSec1) q2Correct++;
    }

    questionCountTotal++;
    if (isVerbal && isSec1) v1Total++;
    if (isVerbal && !isSec1) v2Total++;
    if (!isVerbal && isSec1) q1Total++;
    if (!isVerbal && !isSec1) q2Total++;

    // Track Skill Stats
    const skill = q.skill || q.domain || 'General Skill';
    if (!skillStats[skill]) skillStats[skill] = { correct: 0, total: 0 };
    skillStats[skill].total += 1;
    if (isCorrect) skillStats[skill].correct += 1;
  };

  if (isArrayMode || Array.isArray(questionBank)) {
    (questionBank || []).forEach((q) => processQuestion(q, q.sectionType?.includes('VERBAL') ?? true, true));
  } else if (questionBank) {
    // Process Verbal 1
    (questionBank.VERBAL_SECTION_1 || []).forEach(q => processQuestion(q, true, true));

    // Process Verbal 2
    const v2Questions = sec2VerbalDiff === 'EASY' 
      ? (questionBank.VERBAL_SECTION_2_EASY || [])
      : sec2VerbalDiff === 'HARD'
      ? (questionBank.VERBAL_SECTION_2_HARD || [])
      : (questionBank.VERBAL_SECTION_2_MEDIUM || []);
    v2Questions.forEach(q => processQuestion(q, true, false));

    // Process Quant 1
    (questionBank.QUANT_SECTION_1 || []).forEach(q => processQuestion(q, false, true));

    // Process Quant 2
    const q2Questions = sec2QuantDiff === 'EASY'
      ? (questionBank.QUANT_SECTION_2_EASY || [])
      : sec2QuantDiff === 'HARD'
      ? (questionBank.QUANT_SECTION_2_HARD || [])
      : (questionBank.QUANT_SECTION_2_MEDIUM || []);
    q2Questions.forEach(q => processQuestion(q, false, false));
  }

  // Scaled Score Calculations (130 - 170 per section)
  let verbalBonus = sec2VerbalDiff === 'HARD' ? 3 : sec2VerbalDiff === 'EASY' ? -2 : 0;
  let quantBonus = sec2QuantDiff === 'HARD' ? 3 : sec2QuantDiff === 'EASY' ? -2 : 0;

  const rawVerbal = v1Correct + v2Correct;
  const totalVerbal = (v1Total + v2Total) || 1;
  const rawQuant = q1Correct + q2Correct;
  const totalQuant = (q1Total + q2Total) || 1;

  const verbalScaled = Math.min(170, Math.max(130, 130 + Math.round((rawVerbal / totalVerbal) * 37) + verbalBonus));
  const quantScaled = Math.min(170, Math.max(130, 130 + Math.round((rawQuant / totalQuant) * 37) + quantBonus));
  const totalScore = isArrayMode ? 130 + Math.round((rawCorrectTotal / (questionCountTotal || 1)) * 210) : verbalScaled + quantScaled;

  const totalQuestionsCount = isArrayMode ? questionCountTotal : (v1Total + v2Total + q1Total + q2Total);
  const totalCorrectCount = isArrayMode ? rawCorrectTotal : (rawVerbal + rawQuant);
  const accuracyPercentage = Math.round((totalCorrectCount / (totalQuestionsCount || 1)) * 100);

  // Compute Skill Breakdown List
  const skillBreakdown = Object.keys(skillStats).map(skillName => {
    const item = skillStats[skillName];
    const acc = Math.round((item.correct / item.total) * 100);
    return {
      skill: skillName,
      correct: item.correct,
      total: item.total,
      accuracy: acc
    };
  }).sort((a, b) => b.accuracy - a.accuracy);

  const strongSkills = skillBreakdown.filter(s => s.accuracy >= 70);
  const weakSkills = skillBreakdown.filter(s => s.accuracy < 70);

  return {
    verbalScaled,
    quantScaled,
    totalScore,
    rawVerbal,
    rawQuant,
    rawCorrect: totalCorrectCount,
    totalQuestions: totalQuestionsCount,
    accuracyPercent: accuracyPercentage,
    accuracyPercentage,
    sec2VerbalDiff,
    sec2QuantDiff,
    skillBreakdown,
    strongSkills,
    weakSkills
  };
}
