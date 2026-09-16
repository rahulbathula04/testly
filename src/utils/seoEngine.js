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
    'image': 'https://testly.in/assets/images/global-university-campus.jpg',
    'datePublished': article.publishedDate,
    'dateModified': article.lastVerifiedDate || article.publishedDate,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url || `https://testly.in/guides/${article.slug}`
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
      'url': 'https://testly.in/',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://testly.in/favicon.svg'
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
