# This project

This repository's own instructions: its conventions, the commands that build and test it, the domain it serves, and any standing tasks or prompts that belong to this project and no other. `CLAUDE.md` loads this file and every session reads it after the kit's rules.

The project-process kit writes this file once and never touches it again, and `CLAUDE.md` is the kit's, replaced whole every time the bootstrap runs, so anything written there is lost. Write here instead. Where this file and the kit disagree about this project, this file wins, except that nothing here lifts the branch rule: the work still happens on a branch and ends as a pull request.

## The site

The new jewelpfp.co.uk for Jewel Passive Fire Protection Ltd (JPFP): SvelteKit 2, Svelte 5 (runes), Tailwind CSS v3, deployed on Vercel with `@sveltejs/adapter-vercel`. It replaces the Wix site, which has only Home, Services and Contact; the routes are `src/routes/+page.svelte`, `services/`, `contact/`, `book/`, `privacy/` and `admin/`. The canonical host is `https://www.jewelpfp.co.uk` (canonical and Open Graph tags, `static/robots.txt`, `static/sitemap.xml`). Until the domain moves, the live preview is https://jewel-pfp.vercel.app/.

In YBT this is the "Jewel PFP Website" project.

## Admin section and Supabase

`/admin` is the website's admin section, built the way the Jewel Bespoke Build website (Your-Business-Today/jewelbb) does it. Staff sign in with one shared login and can edit the page text (home, services, contact, and the contact and company details), the services, the accreditations, the booking page, the booking terms and the privacy notice, and read the enquiries sent from the contact form.

- **Content falls back to the code.** The built-in text, services and accreditations stay in `src/lib/services.js` and `src/lib/content/pages/`. `page_content` stores only the fields someone changed; the services and accreditations tables take over once someone presses "Copy the website's … in" in the admin. With Supabase unset or unreachable the site shows the built-in content.
- **Booking and privacy** (`/admin/documents`): the booking page, the booking terms and the privacy notice are each one document, defined in `src/lib/content/documents/` with their built-in wording from `src/lib/booking/` and `src/lib/privacy/`. Saving stores the whole document in `site_documents`; "Use the built-in wording again" deletes it. Saving the terms or the privacy notice sets its "last updated" date to that day. The Stripe payment link and the legacy redirects stay in code. Privacy sections are edited as text: a blank line between paragraphs, `- ` for a list point, `  - ` for a point inside it, `**…**` for a bold opening and `| cell | cell |` for a table row (`blockText.js`).
- **The contact form** saves each enquiry to `enquiries` (shown in the admin dashboard) and emails it through Resend, as jewelbb does. With neither set up it falls back to opening the visitor's email app, as before.
- **The schema** starts with `supabase/migrations/20261019120000_admin_section.sql`, which was on `master` before migrations ran themselves, so it is run once by hand in the Supabase SQL editor when the Supabase project is connected.
- **Migrations run themselves on merge.** `.github/workflows/run-migrations.yml` runs `scripts/run-added-migrations.sh` on every push to `master`: each `supabase/migrations/*.sql` file the push added, in filename order, one transaction each, against the repository secret `SUPABASE_DB_URL`. A file already on `master` never runs again. A new migration is a new file, additive and safe to run twice; it never edits one already merged. Both files came from the kit's `--with-migration-run` and were changed for this repository (the `master` branch and the `supabase/migrations/` folder), so a later bootstrap run with that option must keep those two changes.
- **Every table** has row-level security on and no policies; the server uses the service-role key only.
- **Limits** for every field are stated once in `src/lib/content/limits.js`, `src/lib/content/listFields.js` and `src/lib/enquiries/enquiryFields.js`; the server checks them and the forms mirror them.

Environment variables on Vercel:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: the Supabase project
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and ideally `ADMIN_SESSION_SECRET`: the admin login (changing the secret signs everyone out)
- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend), `CONTACT_TO_EMAIL`: the enquiry email

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
- The booking page is on the site at `/book` (terms at `/book/terms`, Stripe's after-payment page at `/book/thank-you`), matched to the source of book.jewelpfp.co.uk (Bookkeeping-Partner-Ltd/jewelpfp-booking) with the same Stripe Payment Link and monday.com upload form. Its data is in `src/lib/booking/` and its components in `src/lib/components/book/`. `src/hooks.server.js` sends any request for book.jewelpfp.co.uk to the matching /book address, keeping the query string; it takes effect once that host is added to the Vercel project and its DNS record points at Vercel, which is a step of the domain move.
