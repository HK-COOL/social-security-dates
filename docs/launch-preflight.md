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
- Local git: initial commit created on `main`
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

- Create or connect GitHub repository.
- GitHub CLI is installed but not logged in on this machine.
- `GH_TOKEN`, `GITHUB_TOKEN`, and `VERCEL_TOKEN` were not present in the shell environment during preflight.
- Create Vercel project from the repository.
- Add production environment variables listed above.
- Point `socialsecuritydates.com` DNS to the production host.
- Verify live custom-domain HTML, favicon, preview image, canonical URLs, robots, sitemap, and disclaimer copy.
- Submit `https://socialsecuritydates.com/sitemap.xml` in Google Search Console and Bing Webmaster.
- Submit IndexNow after the first production sitemap is live if the deployment workflow supports it.
