# This project

This repository's own instructions: its conventions, the commands that build and test it, the domain it serves, and any standing tasks or prompts that belong to this project and no other. `CLAUDE.md` loads this file and every session reads it after the kit's rules.

The project-process kit writes this file once and never touches it again, and `CLAUDE.md` is the kit's, replaced whole every time the bootstrap runs, so anything written there is lost. Write here instead. Where this file and the kit disagree about this project, this file wins, except that nothing here lifts the branch rule: the work still happens on a branch and ends as a pull request.

## The site

The new jewelpfp.co.uk for Jewel Passive Fire Protection Ltd (JPFP): SvelteKit 2, Svelte 5 (runes), Tailwind CSS v3, deployed on Vercel with `@sveltejs/adapter-vercel`. No backend. It replaces the Wix site, which has only Home, Services and Contact; content lives in `src/lib/services.js`, and the three routes are `src/routes/+page.svelte`, `services/` and `contact/`. The canonical host is `https://www.jewelpfp.co.uk` (canonical and Open Graph tags, `static/robots.txt`, `static/sitemap.xml`). Until the domain moves, the live preview is https://jewel-pfp.vercel.app/.

In YBT this is the "Jewel PFP Website" project.

## Commands

- `npm ci` — install
- `npm run dev` — local server on http://localhost:5173
- `npm run check` — svelte-kit sync and svelte-check
- `npm run build` — production build

## Pull requests and checks

- The default branch is `master`. The organisation's ruleset requires the `Run test suite` check on every pull request; `.github/workflows/ci.yml` reports it by running `npm ci`, `npm run check` and `npm run build`. Run `npm run check` and `npm run build` before pushing.
- Vercel deploys a preview for every pull request and production from `master`.
- Auto-merge is enabled on the repository, so a pull request opened with auto-merge merges itself once `Run test suite` is green.
- The Claude GitHub app needs `jewel-pfp` in its repository access for cloud sessions to push and open pull requests; if a push or PR is refused, add the repository to the app's installation.

## Wix to Vercel cutover (pending)

Jeremy at JPFP is cancelling Wix before it renews on 06/11/2026, so jewelpfp.co.uk must point at Vercel before then.

- The gaps against the Wix site were closed in PR #1 (accreditation links, favicon, robots, sitemap, canonical and Open Graph tags). The new site covers everything the Wix site has.
- Waiting on Jeremy: approval of the site, where the domain's DNS is managed, and access to the survey booking site.
- When writing the DNS records: point `www` and the apex at Vercel; keep the MX (email) records and the `book` subdomain record exactly as they are. `book.jewelpfp.co.uk` is Jeremy's survey booking site and must keep working.
- If the DNS is hosted at Wix, move it to another provider before Wix is cancelled, or the domain and email go dark with it.
- Bringing the booking site in with the new site is still to do, once access is given.
