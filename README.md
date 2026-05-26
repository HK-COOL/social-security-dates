# Social Security Dates

Independent Social Security and SSI payment date checker for `https://socialsecuritydates.com`.

## V1 Scope

- Homepage with Social Security Payment Date Checker.
- Deterministic payment-date rules for Social Security, SSI, both benefits, and pre-May-1997 cases.
- 2026 and 2027 month support.
- SEO entry pages:
  - `/social-security-payment-schedule-2026`
  - `/when-will-i-get-my-social-security-check`
  - `/ssi-payment-schedule`
  - `/social-security-may-payments`
  - `/late-social-security-payment`
- Privacy and terms pages.
- Branded favicon, logo, preview image, sitemap, and robots.

## Trust Boundary

Social Security Dates is an independent informational tool. It is not affiliated with, endorsed by, or operated by the Social Security Administration.

The checker must not ask for Social Security number, full date of birth, bank account, routing number, address, phone, email, Medicare number, my Social Security login, or exact benefit amount.

## Local Commands

Use the bundled pnpm runner from the workspace root:

```powershell
& 'C:\Users\xuner\Documents\工具站\.tools\pnpm-win-x64-10.33.4\pnpm.exe' install --offline
```

Because this workspace path contains Chinese characters, pnpm-generated command shims may have mojibake paths. The verified local path uses the bundled Node runtime directly:

```powershell
& 'C:\Users\xuner\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\.pnpm\typescript@5.9.2\node_modules\typescript\bin\tsc --noEmit
& 'C:\Users\xuner\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\.pnpm\tsx@4.20.5\node_modules\tsx\dist\cli.mjs scripts/verify-payment-schedule.ts
& 'C:\Users\xuner\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\.pnpm\tsx@4.20.5\node_modules\tsx\dist\cli.mjs scripts/verify-site-quality.ts
```

For local preview, use webpack mode instead of Turbopack:

```powershell
& 'C:\Users\xuner\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\next\dist\bin\next dev --webpack -p 3001
```

Production build:

```powershell
$env:VERCEL='1'; $env:CI='1'; $env:NEXT_TELEMETRY_DISABLED='1'
& 'C:\Users\xuner\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\next\dist\bin\next build --webpack
```

## Verification Status

Last verified on May 26, 2026:

- TypeScript: passed.
- `scripts/verify-payment-schedule.ts`: passed.
- `scripts/verify-site-quality.ts`: passed.
- `next build --webpack`: passed.
- Local webpack dev server: homepage and key SEO pages returned HTTP 200.

## Next Launch Steps

- Connect this repo to GitHub.
- Create production hosting project.
- Set production URL env vars to `https://socialsecuritydates.com`.
- Point DNS for `socialsecuritydates.com`.
- Confirm live favicon, preview image, robots, sitemap, canonical URLs, and disclaimer copy.
- Submit sitemap to Google Search Console and Bing Webmaster after launch.
