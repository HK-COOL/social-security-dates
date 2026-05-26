import type { DynamicPage, FAQItem } from '@/shared/types/blocks/landing';

type Metadata = {
  title?: string;
  description?: string;
};

type PageJsonLdInput = {
  appUrl: string;
  path?: string;
  page: DynamicPage;
  metadata?: Metadata;
};

const SITE_NAME = 'Social Security Dates';
const OFFICIAL_SOURCE_URLS = [
  'https://www.ssa.gov/pubs/calendar.htm',
  'https://www.ssa.gov/pubs/EN-05-10031-2026.pdf',
  'https://www.ssa.gov/faqs/en/questions/KA-02423.html',
  'https://godirect.gov/gpw/',
];

function absoluteUrl(appUrl: string, path = '') {
  const baseUrl = appUrl.replace(/\/$/, '');
  const cleanPath = path ? `/${path.replace(/^\/+/, '')}` : '';

  return `${baseUrl}${cleanPath}`;
}

function getFaqItems(page: DynamicPage): FAQItem[] {
  return page.sections?.faq?.items?.filter((item) => item.question && item.answer) || [];
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function buildSocialSecurityJsonLd({
  appUrl,
  path = '',
  page,
  metadata,
}: PageJsonLdInput) {
  const url = absoluteUrl(appUrl, path);
  const title = metadata?.title || page.title || SITE_NAME;
  const description = metadata?.description || page.description || '';
  const faqItems = getFaqItems(page);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${appUrl.replace(/\/$/, '')}/#website`,
      name: SITE_NAME,
      url: absoluteUrl(appUrl),
      inLanguage: 'en-US',
      publisher: {
        '@id': `${appUrl.replace(/\/$/, '')}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${appUrl.replace(/\/$/, '')}/#organization`,
      name: SITE_NAME,
      url: absoluteUrl(appUrl),
    },
    {
      '@type': 'WebApplication',
      '@id': `${absoluteUrl(appUrl)}/#payment-date-checker`,
      name: 'Social Security Payment Date Checker',
      url: absoluteUrl(appUrl, '#checker'),
      applicationCategory: 'ReferenceApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      about: OFFICIAL_SOURCE_URLS.map((sourceUrl) => ({
        '@type': 'CreativeWork',
        url: sourceUrl,
      })),
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: title,
      description,
      url,
      isPartOf: {
        '@id': `${appUrl.replace(/\/$/, '')}/#website`,
      },
      inLanguage: 'en-US',
      isAccessibleForFree: true,
    },
  ];

  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
