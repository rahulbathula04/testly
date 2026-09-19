import { getExamById, getCurrentVersion } from '../exams/registry';
import { getBlueprintByExam } from '../blueprints/blueprintsRegistry';
import { getScoringModelByExam } from '../scoring/scoringModels';
import { SAMPLE_QUESTION_BANK } from '../questionBank/sampleBank';
import { ITEM_FACTORIES } from '../itemFactories/factoryRegistry';
import { validateContentAuthorization } from '../governance/copyrightGovernance';

export const ASSESSMENT_MODES = {
  PRACTICE: {
    id: 'PRACTICE',
    name: 'Practice Mode',
    purpose: 'Zero-pressure skill reinforcement with instant step-by-step solutions.',
    immediateFeedback: true,
    timed: false
  },
  DIAGNOSTIC: {
    id: 'DIAGNOSTIC',
    name: 'Diagnostic Mode',
    purpose: 'Rapidly identify specific skill weaknesses and establish a baseline Testly Readiness Score™.',
    immediateFeedback: false,
    timed: true
  },
  MOCK: {
    id: 'MOCK',
    name: 'Full-Length Simulation',
    purpose: 'Faithfully simulate official documented test structure, section order, and timing.',
    immediateFeedback: false,
    timed: true
  },
  ADAPTIVE: {
    id: 'ADAPTIVE',
    name: 'Computer Adaptive Practice',
    purpose: 'Multi-stage or item-level adaptive routing to calculate calibrated theta capability.',
    immediateFeedback: false,
    timed: true
  },
  COACHING: {
    id: 'COACHING',
    name: 'Targeted Coaching Loop',
    purpose: 'Closed-loop cycle: Assessment -> Weakness detection -> Micro-lesson -> Timed drill -> Reassessment.',
    immediateFeedback: true,
    timed: true
  }
};

/**
 * Compiles a full, reproducible assessment test instance.
 */
export function compileTestInstance({
  examId = 'GRE',
  mode = 'MOCK',
  _targetDomains = []
}) {
  const exam = getExamById(examId);
  if (!exam) throw new Error(`Unknown exam ID: ${examId}`);

  const version = getCurrentVersion(examId);
  const blueprint = getBlueprintByExam(examId);
  const scoringModel = getScoringModelByExam(examId);

  const testId = `TEST-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Filter or synthesize authorized items
  const baseItems = SAMPLE_QUESTION_BANK.filter(q => q.exam.toUpperCase() === examId.toUpperCase());

  // If question bank is light, generate parameterized original items from factories
  if (baseItems.length < 5) {
    if (examId === 'GRE') {
      baseItems.push(ITEM_FACTORIES.generateAlgebraItem({ difficulty: 'E3', exam: 'GRE' }));
      baseItems.push(ITEM_FACTORIES.generateReadingInferenceItem({ difficulty: 'E3', exam: 'GRE' }));
    } else if (examId === 'TOEFL') {
      baseItems.push(ITEM_FACTORIES.generateTOEFLAcademicDiscussionItem({ difficulty: 'E3' }));
    } else if (examId === 'PTE') {
      baseItems.push(ITEM_FACTORIES.generatePTERepeatSentenceItem({ difficulty: 'E2' }));
    }
  }

  // Strictly enforce copyright governance on every compiled item
  baseItems.forEach(item => validateContentAuthorization(item));

  const sectionsConfig = (exam.sections || []).map(sec => ({
    sectionId: sec.sectionId,
    name: sec.name,
    durationMinutes: sec.durationMinutes || 30,
    isAdaptive: !!sec.isAdaptive,
    itemCount: sec.itemCount || baseItems.length,
    items: baseItems
  }));

  return {
    testInstanceId: testId,
    examId: exam.examId,
    examName: exam.name,
    versionId: version.versionId,
    versionName: version.versionName,
    effectiveFrom: version.effectiveFrom,
    mode: ASSESSMENT_MODES[mode] || ASSESSMENT_MODES.MOCK,
    totalDurationMinutes: typeof version.totalDurationMinutes === 'number' ? version.totalDurationMinutes : 120,
    sections: sectionsConfig,
    scoringModel,
    blueprintReference: blueprint,
    copyrightProvenance: '100% Class A Testly Original items generated from documented constructs',
    compiledAt: new Date().toISOString()
  };
}
