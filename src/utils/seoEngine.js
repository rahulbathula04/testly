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
    'name': `Testly Exam Registration & Advisory (${location.name})`,
    'alternateName': `Testly ${location.name} Candidate Hub`,
    'url': `https://www.testly.co.in/locations/${location.id}`,
    'logo': 'https://www.testly.co.in/favicon.svg',
    'image': 'https://www.testly.co.in/assets/images/global-university-campus.jpg',
    'telephone': location.helpline || '+91 93473 79041',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': location.deskAddress || 'Cyber Hills Corridor, Madhapur',
      'addressLocality': location.name,
      'addressRegion': location.state,
      'addressCountry': 'IN'
    },
    'priceRange': '₹199 - ₹20,499',
    'areaServed': location.primaryLocalities || [location.name],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Discounted Exam Vouchers & Registration Support',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'GRE General Test Registration & Official Voucher',
            'description': 'Official prepaid voucher + zero-defect passport name audit'
          },
          'price': '20499',
          'priceCurrency': 'INR'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'TOEFL iBT Official Exam Voucher',
            'description': 'Authorized ETS institutional discount code'
          },
          'price': '13999',
          'priceCurrency': 'INR'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'PTE Academic Voucher',
            'description': 'Pearson authorized booking voucher'
          },
          'price': '14999',
          'priceCurrency': 'INR'
        }
      ]
    }
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

export function updatePageMeta({ title, description, canonicalUrl }) {
  if (typeof document === 'undefined') return;

  if (title) document.title = title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && description) {
    metaDesc.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && title) {
    ogTitle.setAttribute('content', title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && description) {
    ogDesc.setAttribute('content', description);
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && canonicalUrl) {
    canonical.setAttribute('href', canonicalUrl);
  }
}

