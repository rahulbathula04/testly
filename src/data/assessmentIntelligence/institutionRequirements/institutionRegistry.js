import { createProvenance, SOURCE_TYPES, VERIFICATION_STATUS } from '../provenance/provenanceModel';

/**
 * Testly Institution Requirements Intelligence
 * 
 * Decoupled institutional admissions requirement registry storing university cutoffs,
 * language proficiency minimums, degree program specifications, and official admission URLs.
 */
export const INSTITUTION_REQUIREMENTS_REGISTRY = [
  {
    requirementId: 'REQ-CMU-CS-MS-2026',
    institution: 'Carnegie Mellon University (CMU)',
    country: 'United States',
    program: 'Master of Science in Computer Science (MSCS)',
    school: 'School of Computer Science',
    intake: 'Fall 2026',
    requirements: [
      {
        exam: 'GRE',
        requirementType: 'RECOMMENDED_BENCHMARK',
        verbalMin: 160,
        quantMin: 168,
        analyticalWritingMin: 4.0,
        notes: 'Quantitative scores typically fall in the 90th+ percentile (168–170).'
      },
      {
        exam: 'TOEFL',
        requirementType: 'MANDATORY_MINIMUM',
        overallMin: '100 (Legacy) / 5.0 (2026 scale)',
        sectionMinimums: { reading: 25, listening: 25, speaking: 25, writing: 25 },
        notes: 'Strict composite minimum of 100 with individual subscore requirements.'
      },
      {
        exam: 'IELTS',
        requirementType: 'MANDATORY_MINIMUM',
        overallMin: '7.5',
        sectionMinimums: { listening: 7.0, reading: 7.0, writing: 7.0, speaking: 7.0 }
      }
    ],
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'CMU SCS Graduate Admissions Requirements',
      sourceUrl: 'https://csd.cmu.edu/academics/master-programs/ms-computer-science',
      lastVerifiedAt: '2026-02-15',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },
  {
    requirementId: 'REQ-STANFORD-MBA-2026',
    institution: 'Stanford Graduate School of Business',
    country: 'United States',
    program: 'Full-Time MBA',
    school: 'Stanford GSB',
    intake: 'Round 1 / Round 2 2026',
    requirements: [
      {
        exam: 'GMAT',
        requirementType: 'REPORTED_MEDIAN',
        medianScore: '730 (Legacy) / ~675–685 (Current 3-Section scale)',
        notes: 'No minimum score requirement; holistic admissions review.'
      },
      {
        exam: 'GRE',
        requirementType: 'REPORTED_MEDIAN',
        verbalMedian: 165,
        quantMedian: 165
      },
      {
        exam: 'TOEFL',
        requirementType: 'MANDATORY_IF_NOT_EXEMPT',
        overallMin: '100 / 5.0 (2026 Scale)',
        notes: 'Mandatory for candidates from non-English medium institutions.'
      }
    ],
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'Stanford GSB MBA Admission Criteria',
      sourceUrl: 'https://www.gsb.stanford.edu/programs/mba/admission',
      lastVerifiedAt: '2026-01-10',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },
  {
    requirementId: 'REQ-OXFORD-MSC-FIN-2026',
    institution: 'University of Oxford',
    country: 'United Kingdom',
    program: 'MSc in Financial Economics',
    school: 'Saïd Business School',
    intake: 'Michaelmas 2026',
    requirements: [
      {
        exam: 'GMAT',
        requirementType: 'HIGHLY_RECOMMENDED',
        targetScore: '655+ (Current scale) / 700+ (Legacy)',
        notes: 'Quant component must be in the 80th percentile or above.'
      },
      {
        exam: 'GRE',
        requirementType: 'ACCEPTED_ALTERNATIVE',
        targetQuant: '165+'
      },
      {
        exam: 'IELTS',
        requirementType: 'HIGHER_LEVEL_LANGUAGE_REQUIREMENT',
        overallMin: '7.5',
        subscoreMin: '7.0 in each component'
      }
    ],
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'Oxford Saïd MSc Financial Economics Entry Requirements',
      sourceUrl: 'https://www.sbs.ox.ac.uk/programmes/msc-financial-economics',
      lastVerifiedAt: '2026-01-20',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  },
  {
    requirementId: 'REQ-MELBOURNE-MASTER-ENG-2026',
    institution: 'University of Melbourne',
    country: 'Australia',
    program: 'Master of Engineering',
    school: 'Faculty of Engineering and Information Technology',
    intake: 'Semester 1 / Semester 2 2026',
    requirements: [
      {
        exam: 'IELTS',
        requirementType: 'MANDATORY_MINIMUM',
        overallMin: '6.5',
        subscoreMin: '6.0 in all bands'
      },
      {
        exam: 'PTE',
        requirementType: 'ACCEPTED_EQUAL',
        overallMin: '58',
        subscoreMin: '50 in all communicative skills'
      },
      {
        exam: 'TOEFL',
        requirementType: 'ACCEPTED_EQUAL',
        overallMin: '79 / 4.0 (2026 Scale)',
        sectionMinimums: { writing: 21, reading: 13, listening: 13, speaking: 18 }
      }
    ],
    provenance: createProvenance({
      sourceType: SOURCE_TYPES.OFFICIAL,
      sourceTitle: 'University of Melbourne English Language Requirements',
      sourceUrl: 'https://study.unimelb.edu.au/how-to-apply/english-language-requirements',
      lastVerifiedAt: '2026-02-01',
      verificationStatus: VERIFICATION_STATUS.VERIFIED
    })
  }
];

export function getRequirementsByExam(examId) {
  if (!examId) return [];
  const normalized = examId.toUpperCase();
  return INSTITUTION_REQUIREMENTS_REGISTRY.filter(inst =>
    inst.requirements.some(r => r.exam.toUpperCase() === normalized)
  );
}
