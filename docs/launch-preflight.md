# Launch Preflight

Last updated: May 26, 2026

## Project

- Site: Social Security Dates
- Domain: `https://socialsecuritydates.com`
- Scope: free public Social Security and SSI payment date checker
- Affiliation: independent; not affiliated with, endorsed by, or operated by the Social Security Administration

## Verified Locally

- TypeScript: passed
- Payment schedule verifier: passed
- Site quality verifier: passed
- Production build: passed with `next build --webpack`
- Local git: pushed on `main`
- GitHub repository: `https://github.com/HK-COOL/social-security-dates`
- Vercel project: `https://vercel.com/hk123s-projects/social-security-dates`
- Vercel deployment: `https://social-security-dates.vercel.app/` returned HTTP 200
- Production smoke test:
  - `/`: HTTP 200
  - `/social-security-payment-schedule-2026`: HTTP 200
  - `/robots.txt`: HTTP 200
  - `/sitemap.xml`: HTTP 200

## Public Routes

Indexable routes in sitemap:

- `/`
- `/social-security-payment-schedule-2026`
- `/when-will-i-get-my-social-security-check`
- `/ssi-payment-schedule`
- `/social-security-may-payments`
- `/late-social-security-payment`

Legal pages exist but are intentionally not in sitemap.

## Environment

Production public env values should use:

```text
NEXT_PUBLIC_APP_URL=https://socialsecuritydates.com
NEXT_PUBLIC_APP_NAME=Social Security Dates
NEXT_PUBLIC_APP_DESCRIPTION=Check scheduled Social Security and SSI payment dates using public SSA payment rules.
NEXT_PUBLIC_APP_LOGO=/logo.png
NEXT_PUBLIC_APP_FAVICON=/favicon.ico
NEXT_PUBLIC_APP_PREVIEW_IMAGE=/preview.png
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_THEME=default
NEXT_PUBLIC_APPEARANCE=light
NEXT_PUBLIC_LOCALE_DETECT_ENABLED=false
NEXT_PUBLIC_ENABLE_RUNTIME_CONFIG=false
```

No auth, payment, AI, email, storage, or user database is required for v1.

## Known Local Caveats

- Use webpack mode locally. Turbopack can fail in this Windows path with `spawning node pooled process: Access denied`.
- The local pnpm command shims may contain mojibake paths because the workspace path includes Chinese characters. The README lists direct Node commands that were verified.
- `next start` prints a standalone-output warning from the template, but local smoke requests returned 200. Vercel deployment should use the standard Vercel Next build flow.

## Launch Steps Remaining

- Add and verify `socialsecuritydates.com` in Google Search Console, then submit
  `https://socialsecuritydates.com/sitemap.xml`.
- Add and verify `https://socialsecuritydates.com/` in Bing Webmaster Tools,
  then submit `https://socialsecuritydates.com/sitemap.xml`.

## DNS Status

Cloudflare zone `socialsecuritydates.com` is active on account
`fadd8789b4afc4986ce093f29f1d8032`.

The apex record has been created:

- Type: `A`
- Name: `socialsecuritydates.com`
- Content: `76.76.21.21`
- Proxy status: DNS only
- TTL: Auto
- Cloudflare record ID: `d4a42898bfd0cebb724b3b3f41e941e4`

Normal DNS, Cloudflare DNS-over-HTTPS, and Google DNS-over-HTTPS return the A
record.

Forced-host smoke testing against `76.76.21.21` returned HTTP 200 from Vercel
for `https://socialsecuritydates.com/`. The custom-domain smoke test verified
the homepage, the 2026 schedule page, `robots.txt`, `sitemap.xml`, `favicon.ico`,
and `preview.png`. `robots.txt` points to
`https://socialsecuritydates.com/sitemap.xml`.

## Indexing

- Sitemap: `https://socialsecuritydates.com/sitemap.xml`
- IndexNow key: `2effdeaf6aad46a2a6b76433467fecc6`
- IndexNow key location:
  `https://socialsecuritydates.com/2effdeaf6aad46a2a6b76433467fecc6.txt`
- IndexNow submission: accepted by `https://api.indexnow.org/indexnow` with
  HTTP 202 for all sitemap URLs on May 26, 2026

Google Search Console and Bing Webmaster Tools both loaded in the browser with
logged-in sessions. Automated UI interaction reached the Google ownership
verification page and the Bing Webmaster dashboard, but adding the new property
requires manual confirmation in the web UI.
