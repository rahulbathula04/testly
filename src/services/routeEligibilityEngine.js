/**
 * Testly Booking-Route Eligibility Engine
 * Evaluates candidate booking requests against verified commercial rails,
 * provider terms, territory restrictions, and active Kill-Switch states.
 * 
 * Must run BEFORE payment or commitment.
 * 
 * Possible Outputs:
 * - ELIGIBLE: Fully verified commercial route available.
 * - NOT_ELIGIBLE: Commercial route blocked (e.g. policy restriction, suspended offering).
 * - MANUAL_REVIEW: Requires compliance officer or document inspection before quote.
 */

import { testlyDb } from './testlyDatabase';

export function checkRouteEligibility({
  exam = 'GRE',
  country = 'IND',
  candidateType = 'Indian National',
  hasPassport = true,
  requestedMethod = null,
}) {
  const offering = testlyDb.getOfferingById(exam);

  // 1. Check if offering exists in database
  if (!offering) {
    return {
      status: 'NOT_ELIGIBLE',
      code: 'OFFERING_NOT_FOUND',
      reason: `No official registration offering configured for exam ${exam}.`,
      recommended_route: 'DIRECT',
    };
  }

  // 2. Check Emergency Kill Switch
  if (offering.checkout_status === 'SUSPENDED' || offering.public_status === 'SUSPENDED') {
    return {
      status: 'NOT_ELIGIBLE',
      code: 'OFFERING_SUSPENDED',
      reason: `Registration desk for ${offering.full_name} is temporarily suspended for compliance audit. No new bookings permitted.`,
      recommended_route: 'INFORMATION_ONLY',
      offering,
    };
  }

  // 3. Check Provider-Specific Policy Constraints
  // GMAT: GMAC prohibits voucher resale/transfer
  if (offering.exam_id === 'GMAT' || offering.provider_id === 'gmac') {
    if (requestedMethod === 'PERMITTED_VOUCHER') {
      return {
        status: 'NOT_ELIGIBLE',
        code: 'VOUCHER_PROHIBITED_BY_PROVIDER',
        reason: 'GMAC terms prohibit voucher resale, redistribution, or secondary transfer. Testly cannot issue a discounted voucher for GMAT.',
        recommended_route: 'DIRECT',
        action_required: 'Switch candidate to Direct Official Booking Assistance with direct settlement on mba.com.',
        offering,
      };
    }

    return {
      status: 'ELIGIBLE',
      code: 'DIRECT_ASSISTANCE_PERMITTED',
      reason: 'GMAT assisted direct registration permitted. Zero voucher discount marketed; full retail paid directly to GMAC.',
      recommended_route: 'DIRECT',
      offering,
    };
  }

  // 4. Pearson PTE: Authorized Partner Model (Zero Password Sharing)
  if (offering.exam_id === 'PTE') {
    return {
      status: 'ELIGIBLE',
      code: 'PTE_PARTNER_DESK_PERMITTED',
      reason: 'Authorized PTE Partner Portal route active. Zero candidate password collection required; booking verifiable in candidate myPTE account.',
      recommended_route: 'AUTHORIZED_AGENT',
      requires_credentials: false,
      offering,
    };
  }

  // 5. Territory & Documentation Check
  if (country !== 'IND' && offering.country === 'IND') {
    return {
      status: 'MANUAL_REVIEW',
      code: 'CROSS_BORDER_TERRITORY_REVIEW',
      reason: `Candidate territory (${country}) differs from institutional allocation territory (${offering.country}). Compliance verification required.`,
      recommended_route: 'DIRECT',
      offering,
    };
  }

  // 6. Passport Requirement
  if (!hasPassport) {
    return {
      status: 'MANUAL_REVIEW',
      code: 'PASSPORT_AUDIT_PENDING',
      reason: 'Official test centers in India require a valid original passport. Registration cannot be locked until candidate presents passport copy for name matching.',
      recommended_route: offering.booking_method_id,
      action_required: 'Prompt candidate for original passport front/back pages before slot lock.',
      offering,
    };
  }

  // 7. Standard Eligible Route
  return {
    status: 'ELIGIBLE',
    code: 'STANDARD_ROUTE_VERIFIED',
    reason: `Legitimate commercial route (${offering.booking_method_id}) verified under contract ${offering.supplier_id}. Candidate savings of ₹${offering.saving.toLocaleString('en-IN')} applicable.`,
    recommended_route: offering.booking_method_id,
    offering,
  };
}
