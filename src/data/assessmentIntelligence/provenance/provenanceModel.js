/**
 * Testly Assessment Intelligence — Provenance & Verification Model
 * 
 * Enforces field-level provenance tracking across all exam specifications,
 * constructs, blueprints, scoring models, and benchmarks.
 */

export const SOURCE_TYPES = {
  OFFICIAL: 'OFFICIAL',             // Official exam bodies (ETS, College Board, GMAC, Pearson, IELTS IDP/BC/Cambridge, LSAC, ACT Inc)
  LICENSED: 'LICENSED',             // Content or norms acquired via explicit commercial contract
  TESTLY_DERIVED: 'TESTLY_DERIVED', // Internal proprietary calculation, modeling, or estimate
  RESEARCH: 'RESEARCH',             // Peer-reviewed psychometric, linguistic, or educational literature
  UNKNOWN: 'UNKNOWN'                // Unverified source — requires audit
};

export const VERIFICATION_STATUS = {
  VERIFIED: 'VERIFIED',             // Audited against current official published documentation
  INTERNAL: 'INTERNAL',             // Approved by internal Testly SME / Psychometrics Board
  PENDING_AUDIT: 'PENDING_AUDIT',   // Awaiting verification against source documentation
  DEPRECATED: 'DEPRECATED'          // Historical/superseded specification
};

/**
 * Creates an immutable provenance tag for any data field or model.
 */
export function createProvenance({
  sourceType = SOURCE_TYPES.OFFICIAL,
  sourceTitle = '',
  sourceUrl = '',
  sourcePublishedAt = '',
  lastVerifiedAt = new Date().toISOString().split('T')[0],
  verificationStatus = VERIFICATION_STATUS.VERIFIED,
  confidence = 1.0,
  notes = ''
}) {
  return {
    sourceType,
    sourceTitle,
    sourceUrl,
    sourcePublishedAt,
    lastVerifiedAt,
    verificationStatus,
    confidence, // 0.0 to 1.0
    notes
  };
}
