/**
 * Testly Assessment Intelligence — Copyright Governance & Security
 * 
 * Enforces legal content boundaries, anti-scraping policy, 5-tier classification,
 * question lifecycle states, and item exposure security.
 */

export const COPYRIGHT_CLASSES = {
  CLASS_A: {
    code: 'A',
    name: 'Testly Original',
    description: 'Created independently by Testly item writers against documented constructs. 100% owned and controlled by Testly.',
    canDeployToLive: true,
    requiresCommercialLicense: false
  },
  CLASS_B: {
    code: 'B',
    name: 'Licensed Content',
    description: 'Third-party assessment material acquired under explicit commercial contract with documented territory and term.',
    canDeployToLive: true,
    requiresCommercialLicense: true
  },
  CLASS_C: {
    code: 'C',
    name: 'Official Reference Material',
    description: 'Public provider specifications, timing rules, and publicly documented constructs used for alignment only. NOT reusable as questions.',
    canDeployToLive: false,
    requiresCommercialLicense: false
  },
  CLASS_D: {
    code: 'D',
    name: 'Restricted Copyrighted Material',
    description: 'External copyrighted material without documented license. SYSTEM STRICTLY PROHIBITS INGESTION OR USAGE.',
    canDeployToLive: false,
    strictlyForbidden: true
  },
  CLASS_E: {
    code: 'E',
    name: 'Generated / Pending Validation',
    description: 'Programmatically or AI-synthesized draft items that have not yet completed human SME and editorial sign-off.',
    canDeployToLive: false,
    requiresHumanValidation: true
  }
};

export const QUESTION_LIFECYCLE_STATES = {
  DRAFT: 'DRAFT',
  AI_GENERATED: 'AI_GENERATED',
  AUTOMATED_VALIDATION: 'AUTOMATED_VALIDATION',
  SME_REVIEW: 'SME_REVIEW',
  EDITORIAL_REVIEW: 'EDITORIAL_REVIEW',
  PILOT: 'PILOT',
  PSYCHOMETRIC_REVIEW: 'PSYCHOMETRIC_REVIEW',
  CALIBRATED: 'CALIBRATED',
  LIVE: 'LIVE',
  RETIRED: 'RETIRED' // Questions are retired with full historical analytics, never deleted
};

export const EXPOSURE_TIERS = {
  LOW: { label: 'Low Exposure', maxAttempts: 500, status: 'SECURE' },
  MEDIUM: { label: 'Medium Exposure', maxAttempts: 2500, status: 'MONITOR' },
  HIGH: { label: 'High Exposure', maxAttempts: 5000, status: 'ROTATE_SOON' },
  RETIRED: { label: 'Overexposed / Retired', status: 'RETIRE' }
};

/**
 * Validates that an item is legally authorized to enter the generator or live assessment.
 * Throws a hard error if Class D material is detected.
 */
export function validateContentAuthorization(item) {
  if (!item) throw new Error('Invalid item: cannot validate empty content.');

  if (item.copyrightClass === 'D' || item.copyright_class === 'D') {
    throw new Error('Restricted content (Class D) cannot enter assessment generation. Testly strictly prohibits copyrighted third-party material.');
  }

  if (item.copyrightClass === 'C') {
    throw new Error('Class C material is for structural reference only and cannot be rendered as a question item.');
  }

  if (item.status === 'LIVE' && item.copyrightClass !== 'A' && item.copyrightClass !== 'B') {
    throw new Error(`Item ${item.question_id || 'unknown'} has status LIVE but is Class ${item.copyrightClass}. Only Class A and Class B may enter live assessment.`);
  }

  return true;
}

/**
 * Calculates current exposure security tier based on student attempt count.
 */
export function calculateExposureSecurity(attempts = 0) {
  if (attempts >= EXPOSURE_TIERS.HIGH.maxAttempts) {
    return { tier: 'RETIRED', actionRequired: 'Retire item to prevent exam compromise', flag: 'CRITICAL' };
  }
  if (attempts >= EXPOSURE_TIERS.MEDIUM.maxAttempts) {
    return { tier: 'HIGH', actionRequired: 'Prepare replacement items in generation studio', flag: 'WARNING' };
  }
  if (attempts >= EXPOSURE_TIERS.LOW.maxAttempts) {
    return { tier: 'MEDIUM', actionRequired: 'Item actively monitored', flag: 'NORMAL' };
  }
  return { tier: 'LOW', actionRequired: 'Secure inventory', flag: 'OPTIMAL' };
}
