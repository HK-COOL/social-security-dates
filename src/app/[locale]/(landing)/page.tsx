import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { envConfigs } from '@/config';
import {
  buildSocialSecurityJsonLd,
  stringifyJsonLd,
} from '@/shared/lib/social-security-json-ld';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const revalidate = 3600;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.index');

  // get page data
  const page: DynamicPage = t.raw('page');
  const metadata = t.raw('metadata');

  // load page component
  const Page = await getThemePage('dynamic-page');
  const jsonLd = buildSocialSecurityJsonLd({
    appUrl: envConfigs.app_url,
    page,
    metadata,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(jsonLd) }}
      />
      <Page locale={locale} page={page} />
    </>
  );
}
