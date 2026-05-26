import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pageSlugs = [
  'social-security-payment-schedule-2026',
  'when-will-i-get-my-social-security-check',
  'ssi-payment-schedule',
  'social-security-may-payments',
  'late-social-security-payment',
];

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const localeIndex = read('src/config/locale/index.ts');
const sitemap = read('public/sitemap.xml');
const landing = read('src/config/locale/messages/en/landing.json');
const common = read('src/config/locale/messages/en/common.json');
const home = read('src/config/locale/messages/en/pages/index.json');
const packageJson = JSON.parse(read('package.json'));
const vercelJson = JSON.parse(read('vercel.json'));
const robots = read('src/app/robots.ts');
const envExample = read('.env.example');
const localeLayout = read('src/app/[locale]/layout.tsx');
const proxy = read('src/proxy.ts');
const landingPage = read('src/app/[locale]/(landing)/page.tsx');
const dynamicPage = read('src/app/[locale]/(landing)/[...slug]/page.tsx');
const blockIndex = read('src/themes/default/blocks/index.tsx');
const officialSourcesBlock = read('src/themes/default/blocks/official-sources.tsx');
const jsonLdHelper = read('src/shared/lib/social-security-json-ld.ts');
const officialSourceUrls = [
  'https://www.ssa.gov/pubs/calendar.htm',
  'https://www.ssa.gov/pubs/EN-05-10031-2026.pdf',
  'https://www.ssa.gov/faqs/en/questions/KA-02423.html',
  'https://godirect.gov/gpw/',
];

assert.match(landing, /Social Security Dates/);
assert.match(common, /Social Security Payment Schedule 2026/);
assert.match(home, /payment-date-checker/);
assert.doesNotMatch(landing + common + home, /ShipAny|Your App Name|your-domain/);
assert.match(localeIndex, /localePrefix = 'never'/);
assert.equal(packageJson.scripts.dev, 'next dev --webpack');
assert.equal(packageJson.scripts.build, 'next build --webpack');
assert.equal(vercelJson.framework, 'nextjs');
assert.equal(vercelJson.buildCommand, 'pnpm build');
assert.ok(!vercelJson.functions, 'unused API function config should stay removed');
assert.equal(vercelJson.env.NEXT_PUBLIC_APP_URL, 'https://socialsecuritydates.com');
assert.equal(vercelJson.env.NEXT_PUBLIC_ENABLE_RUNTIME_CONFIG, 'false');
assert.match(envExample, /NEXT_PUBLIC_ENABLE_RUNTIME_CONFIG = "false"/);
assert.match(localeLayout, /NEXT_PUBLIC_ENABLE_RUNTIME_CONFIG/);
assert.match(localeLayout, /isRuntimeConfigEnabled && \(isProduction \|\| isDebug\)/);
assert.match(blockIndex, /official-sources/);
assert.match(officialSourcesBlock, /Official source links/);
assert.match(proxy, /getSingleLocaleResponse/);
assert.match(landingPage, /application\/ld\+json/);
assert.match(dynamicPage, /application\/ld\+json/);
assert.match(jsonLdHelper, /FAQPage/);
assert.match(jsonLdHelper, /WebApplication/);
assert.match(robots, /sitemap: `\$\{appUrl\}\/sitemap\.xml`/);
assert.match(sitemap, /https:\/\/socialsecuritydates\.com\//);
assert.doesNotMatch(sitemap, /privacy-policy|terms-of-service|admin|api|settings/);

for (const sourceUrl of officialSourceUrls) {
  assert.match(home, new RegExp(sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(jsonLdHelper, new RegExp(sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

for (const slug of pageSlugs) {
  const relativePath = `src/config/locale/messages/en/pages/${slug}.json`;
  const content = read(relativePath);

  assert.match(localeIndex, new RegExp(`pages/${slug}`));
  assert.match(sitemap, new RegExp(`https://socialsecuritydates.com/${slug}`));
  assert.match(content, /"metadata"/);
  assert.match(content, /"hero"/);
  assert.match(content, /"faq"/);
  assert.match(content, /"official_sources"/);
  assert.match(content, /Independent tool/);

  for (const sourceUrl of officialSourceUrls) {
    assert.match(content, new RegExp(sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
}

for (const asset of ['public/logo.png', 'public/favicon.ico', 'public/preview.png']) {
  const stats = fs.statSync(path.join(root, asset));
  assert.ok(stats.size > 400, `${asset} should be a replaced brand asset`);
}

console.log('Site quality verifier passed.');
