/**
 * TESTLY ADVANCED SEO & STRUCTURED DATA ENGINE
 * Injects Schema.org JSON-LD (Article, BreadcrumbList, FAQPage, Offer),
 * dynamic canonical tags, OpenGraph, and contextual internal linking.
 */

export function injectArticleSchema({ article, author, url }) {
  if (typeof document === 'undefined' || !article) return;

  const scriptId = 'testly-dynamic-article-schema';
  let scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.metaDescription,
    'image': 'https://www.testly.co.in/assets/images/global-university-campus.jpg',
    'datePublished': article.publishedDate,
    'dateModified': article.lastVerifiedDate || article.publishedDate,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url || `https://www.testly.co.in/guides/${article.slug}`
    },
    'author': {
      '@type': 'Person',
      'name': author?.name || 'Rahul Bathula',
      'jobTitle': author?.role || 'Chief Exam Strategist',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Testly'
      }
    },
    'publisher': {
      '@type': 'EducationalOrganization',
      'name': 'Testly',
      'url': 'https://www.testly.co.in/',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.testly.co.in/favicon.svg'
      }
    }
  };

  scriptEl.textContent = JSON.stringify(schemaData, null, 2);
}

export function injectFAQSchema(faqs) {
  if (typeof document === 'undefined' || !faqs || !faqs.length) return;

  const scriptId = 'testly-dynamic-faq-schema';
  let scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };

  scriptEl.textContent = JSON.stringify(schemaData, null, 2);
}

export function injectBreadcrumbSchema(items) {
  if (typeof document === 'undefined' || !items || !items.length) return;

  const scriptId = 'testly-dynamic-breadcrumb-schema';
  let scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': item.name,
      'item': item.url
    }))
  };

  scriptEl.textContent = JSON.stringify(schemaData, null, 2);
}

export function injectLocalBusinessSchema(location) {
  if (typeof document === 'undefined' || !location) return;

  const scriptId = 'testly-dynamic-local-schema';
  let scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': 'Testly',
    'url': `https://www.testly.co.in/locations/${location.id}`,
    'logo': 'https://www.testly.co.in/favicon.svg',
    'description': `Exam registration information and assistance for candidates in ${location.name}, ${location.state}.`,
    'areaServed': [
      { '@type': 'City', 'name': location.name },
      { '@type': 'AdministrativeArea', 'name': location.state },
      { '@type': 'Country', 'name': 'India' }
    ],
    'serviceType': 'Exam registration information and assistance'
  };

  scriptEl.textContent = JSON.stringify(schemaData, null, 2);
}

export function injectExamAssessmentSchema() {
  if (typeof document === 'undefined') return;

  const scriptId = 'testly-gre-assessment-schema';
  let scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    'name': 'Testly GRE Assessment Intelligence & Diagnostic Engine',
    'description': 'Adaptive GRE diagnostic assessment, construct-level skill mapping across Verbal and Quant, and Testly GRE Readiness Score™ simulator.',
    'learningResourceType': 'Assessment',
    'educationalLevel': 'Graduate Education',
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'Testly',
      'url': 'https://www.testly.co.in/'
    },
    'hasPart': [
      {
        '@type': 'Course',
        'name': 'GRE Diagnostic Assessment',
        'description': '15-question baseline assessment measuring Reading Comprehension, Text Completion, Sentence Equivalence, Arithmetic, Algebra, Geometry, and Data Analysis.'
      },
      {
        '@type': 'Course',
        'name': 'GRE Topic Drills',
        'description': 'Focused question-by-question practice with step-by-step rationales.'
      },
      {
        '@type': 'Course',
        'name': 'Full-Length GRE Mock Simulations',
        'description': '1:58 full-length practice tests matching current shortened GRE structure.'
      }
    ]
  };

  scriptEl.textContent = JSON.stringify(schemaData, null, 2);
}

export function injectHowToSchema({ name, description, steps = [], estimatedCost = '19000' }) {
  if (typeof document === 'undefined' || !name || !steps.length) return;

  const scriptId = 'testly-dynamic-howto-schema';
  let scriptEl = document.getElementById(scriptId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'INR',
      'value': estimatedCost
    },
    'step': steps.map((step, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': step.title || `Step ${idx + 1}`,
      'text': step.text || step.detail || step.content || step
    }))
  };

  scriptEl.textContent = JSON.stringify(schemaData, null, 2);
}

export function updatePageMeta({ title, description, canonicalUrl, imageUrl }) {
  if (typeof document === 'undefined') return;

  if (title) document.title = title;

  const setMeta = (selector, attr, value) => {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:image"]', 'content', imageUrl);
  setMeta('meta[name="twitter:image"]', 'content', imageUrl);

  if (canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }
}


