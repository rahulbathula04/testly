import { GRE_SPEC } from './versions/gre';
import { TOEFL_SPEC } from './versions/toefl';
import { IELTS_SPEC } from './versions/ielts';
import { PTE_SPEC } from './versions/pte';
import { DET_SPEC } from './versions/det';
import { GMAT_SPEC } from './versions/gmat';
import { SAT_SPEC } from './versions/sat';
import { LSAT_SPEC } from './versions/lsat';
import { ACT_SPEC } from './versions/act';
import { OET_SPEC } from './versions/oet';

export const EXAM_REGISTRY = {
  GRE: GRE_SPEC,
  TOEFL: TOEFL_SPEC,
  IELTS: IELTS_SPEC,
  PTE: PTE_SPEC,
  DET: DET_SPEC,
  GMAT: GMAT_SPEC,
  SAT: SAT_SPEC,
  LSAT: LSAT_SPEC,
  ACT: ACT_SPEC,
  OET: OET_SPEC
};

export const EXAM_LIST = Object.values(EXAM_REGISTRY);

export function getExamById(id) {
  if (!id) return null;
  const key = id.toUpperCase().trim();
  return EXAM_REGISTRY[key] || null;
}

export function listExamsByTier(tier = 1) {
  return EXAM_LIST.filter(e => e.tier === tier);
}

export function getCurrentVersion(examId) {
  const exam = getExamById(examId);
  return exam ? exam.currentVersion : null;
}

export function getExamVersionHistory(examId) {
  const exam = getExamById(examId);
  if (!exam) return [];
  return [
    { ...exam.currentVersion, isCurrent: true },
    ...(exam.historicalVersions || []).map(v => ({ ...v, isCurrent: false }))
  ];
}
