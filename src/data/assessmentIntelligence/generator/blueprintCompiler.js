import { getBlueprintByExam } from '../blueprints/blueprintsRegistry';
import { getCurrentVersion } from '../exams/registry';

/**
 * Testly Blueprint Compiler
 * 
 * Enforces hierarchical item generation:
 * EXAM -> VERSION -> BLUEPRINT -> SECTION -> DOMAIN -> SKILL -> QUESTION TYPE -> DIFFICULTY -> ITEM
 */
export function compileBlueprintTarget({
  examId,
  sectionId,
  domain,
  skill,
  difficulty = 'E3',
  questionType = 'MULTIPLE_CHOICE'
}) {
  const currentVersion = getCurrentVersion(examId);
  if (!currentVersion) {
    throw new Error(`Cannot compile blueprint: Exam ${examId} has no registered version.`);
  }

  const blueprint = getBlueprintByExam(examId);
  if (!blueprint) {
    throw new Error(`Cannot compile blueprint: No blueprint registered for ${examId}.`);
  }

  return {
    exam: examId.toUpperCase(),
    version: currentVersion.versionId,
    effectiveFrom: currentVersion.effectiveFrom,
    section: sectionId,
    domain,
    skill,
    difficulty,
    questionType,
    targetPValue: difficulty === 'E1' ? 0.85 : difficulty === 'E2' ? 0.70 : difficulty === 'E3' ? 0.50 : difficulty === 'E4' ? 0.35 : 0.20,
    compiledAt: new Date().toISOString()
  };
}
