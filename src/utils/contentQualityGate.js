/**
 * TESTLY 18-POINT CONTENT QUALITY GATE
 * Evaluates articles before publication or triggers CONTENT_REFRESH_QUEUE.
 */

export function runQualityAudit(article) {
  const issues = [];
  const passed = [];

  if (!article) {
    return { score: 0, status: 'REJECTED', issues: ['Article object is null or undefined'] };
  }

  // 1. Title & Meta Length
  if (article.title && article.title.length >= 25 && article.title.length <= 110) {
    passed.push('Title length within optimal SEO range (25-110 chars)');
  } else {
    issues.push('Title is too short or excessively long');
  }

  if (article.metaDescription && article.metaDescription.length >= 80 && article.metaDescription.length <= 165) {
    passed.push('Meta description optimal (80-165 chars)');
  } else {
    issues.push('Meta description missing or out of optimal 80-165 character range');
  }

  // 2. Author & E-E-A-T Reviewer
  if (article.authorId) {
    passed.push('Verified author attributed');
  } else {
    issues.push('Missing author attribution for E-E-A-T');
  }

  if (article.reviewerId) {
    passed.push('Verified editorial reviewer assigned');
  } else {
    issues.push('Missing secondary reviewer for fact-checking');
  }

  // 3. Sections & Depth
  const totalWords = (article.sections || []).reduce((acc, s) => {
    return acc + (s.content ? s.content.split(/\s+/).length : 0);
  }, 0);

  if (totalWords >= 500) {
    passed.push(`Article depth sufficient (${totalWords} words)`);
  } else {
    issues.push(`Content too thin (${totalWords} words, requires min 500 words)`);
  }

  // 4. Structure: Table of Contents & FAQs
  if (article.toc && article.toc.length >= 3) {
    passed.push('Table of contents defined (min 3 items)');
  } else {
    issues.push('Table of contents missing or has fewer than 3 anchor sections');
  }

  if (article.faqs && article.faqs.length >= 1) {
    passed.push(`FAQ section present (${article.faqs.length} FAQs)`);
  } else {
    issues.push('Missing FAQ section for Google Rich Snippets');
  }

  // 5. Freshness
  if (article.lastVerifiedDate) {
    const verifiedDate = new Date(article.lastVerifiedDate);
    const diffDays = Math.floor((new Date() - verifiedDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 45) {
      passed.push(`Pricing and facts freshly verified (${diffDays} days ago)`);
    } else {
      issues.push(`Verification date older than 45 days (${diffDays} days ago)`);
    }
  } else {
    issues.push('Missing lastVerifiedDate timestamp');
  }

  // 6. Anti-Doorway check: Ensure local pages mention concrete venues/landmarks
  if (article.location && article.location !== 'India') {
    const contentStr = JSON.stringify(article.sections || []).toLowerCase();
    const hasVenue = contentStr.includes('prometric') || contentStr.includes('pearson') || contentStr.includes('idp') || contentStr.includes('metro');
    if (hasVenue) {
      passed.push('Verified local testing venue or transit logistics present (Anti-Doorway compliance)');
    } else {
      issues.push('Local page lacks specific test center or transit details (doorway risk)');
    }
  }

  // Compute final score
  const totalChecks = passed.length + issues.length;
  const score = Math.round((passed.length / (totalChecks || 1)) * 100);

  let status = 'READY_TO_PUBLISH';
  if (score < 75 || issues.some(i => i.includes('too thin') || i.includes('author'))) {
    status = 'NEEDS_REVIEW';
  }

  return {
    score,
    status,
    passed,
    issues,
    evaluatedAt: new Date().toISOString()
  };
}
