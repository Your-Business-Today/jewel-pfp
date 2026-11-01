# This project

This repository's own instructions: its conventions, the commands that build and test it, the domain it serves, and any standing tasks or prompts that belong to this project and no other. `CLAUDE.md` loads this file and every session reads it after the kit's rules.

The project-process kit writes this file once and never touches it again, and `CLAUDE.md` is the kit's, replaced whole every time the bootstrap runs, so anything written there is lost. Write here instead. Where this file and the kit disagree about this project, this file wins, except that nothing here lifts the branch rule: the work still happens on a branch and ends as a pull request.

## The site

The new jewelpfp.co.uk for Jewel Passive Fire Protection Ltd (JPFP): SvelteKit 2, Svelte 5 (runes), Tailwind CSS v3, deployed on Vercel with `@sveltejs/adapter-vercel`. It replaced the Wix site in October 2026; the routes are `src/routes/+page.svelte`, `services/`, `contact/`, `book/`, `privacy/`, `door-explainer/` (draft) and `admin/`, with `+error.svelte` for a wrong address. The canonical host is `https://www.jewelpfp.co.uk` (canonical and Open Graph tags, `static/robots.txt`, `static/sitemap.xml`).

In YBT this is the "Jewel PFP Website" project.

## Brand

The site follows the JPFP Brand Guidelines, Issue 1.2 (16/10/2026), owned by Stuart and held in the Jewel PFP Portal (skill `jpfp-brand-guidelines`). Night mode everywhere: the tokens in `tailwind.config.js` are the guideline's palette (`ink` #000000 ground, `ink-2` charcoal, `ink-3` input cells, `paper` #FFFFFF headings, `body` #EDEDED paragraphs, `note`, `footer`, `hairline`, `gold` #C19B52 for eyebrows, labels, bullets, links and input borders, `signal` Passive Red used once per area). Inter is the only typeface. The logo is Stuart's transparent PNG at `static/brand/jewel-pfp-logo.png`, used as supplied and never recreated. Hover and link colours are gold, which the guideline does not state. A later issue of the guidelines is applied the same way, by changing the tokens.

## Admin section and Supabase

`/admin` is the website's admin section, built the way the Jewel Bespoke Build website (Your-Business-Today/jewelbb) does it. Staff sign in with one shared login and can edit the page text (home, services, contact, and the contact and company details), the services, the accreditations, the booking page, the booking terms and the privacy notice, and read the enquiries sent from the contact form.

- **Content falls back to the code.** The built-in text, services and accreditations stay in `src/lib/services.js` and `src/lib/content/pages/`. `page_content` stores only the fields someone changed; the services and accreditations tables take over once someone presses "Copy the website's … in" in the admin. With Supabase unset or unreachable the site shows the built-in content.
- **Booking and privacy** (`/admin/documents`): the booking page, the booking terms and the privacy notice are each one document, defined in `src/lib/content/documents/` with their built-in wording from `src/lib/booking/` and `src/lib/privacy/`. Saving stores the whole document in `site_documents`; "Use the built-in wording again" deletes it. Saving the terms or the privacy notice sets its "last updated" date to that day. The Stripe payment link and the legacy redirects stay in code. Privacy sections are edited as text: a blank line between paragraphs, `- ` for a list point, `  - ` for a point inside it, `**…**` for a bold opening and `| cell | cell |` for a table row (`blockText.js`).
- **The contact form** saves each enquiry to `enquiries` (shown in the admin dashboard) and emails it through Resend, as jewelbb does. With neither set up it falls back to opening the visitor's email app, as before.
- **The schema** starts with `supabase/migrations/20261019120000_admin_section.sql`, which was on the default branch before migrations ran themselves, so it is run once by hand in the Supabase SQL editor when the Supabase project is connected.
- **Migrations run themselves on merge.** `.github/workflows/run-migrations.yml` runs `scripts/run-added-migrations.sh` on every push to `main`: each `supabase/migrations/*.sql` file the push added, in filename order, one transaction each, against the repository secret `SUPABASE_DB_URL`. A file already on `main` never runs again. A new migration is a new file, additive and safe to run twice; it never edits one already merged. Both files came from the kit's `--with-migration-run` and were changed for this repository (the `supabase/migrations/` folder), so a later bootstrap run with that option must keep that change.
- **Enquiries are deleted after 12 months**, as the privacy notice says: `supabase/migrations/20261101120000_purge_enquiries_after_12_months.sql` schedules a nightly pg_cron job in the database (`purge-enquiries-after-12-months`, 03:15 UTC). Supabase's dashboard lists it under Integrations > Cron.
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

- The default branch is `main` (renamed from `master` on 1 Nov 2026). The organisation's ruleset requires the `Run test suite` check on every pull request; `.github/workflows/ci.yml` reports it by running `npm ci`, `npm run check` and `npm run build`. Run `npm run check` and `npm run build` before pushing.
- Vercel deploys a preview for every pull request and production from `main`.
- Auto-merge is enabled on the repository, so a pull request opened with auto-merge merges itself once `Run test suite` is green.
- Pull requests go into `staging`, never `main`. `.github/workflows/promote-staging.yml` promotes `staging` into `main` at the project's deploy time (set in Your Business Today), and that merge is the deploy.
- The Claude GitHub app needs `jewel-pfp` in its repository access for cloud sessions to push and open pull requests; if a push or PR is refused, add the repository to the app's installation.

## Domain and hosting

- The domain is registered at 123-reg, and its DNS is managed in Microsoft 365 by Jeremy. `www` and the apex have pointed at Vercel since 12 October 2026; the MX (email) records stay with Microsoft 365.
- The Vercel project serves `www.jewelpfp.co.uk` (canonical), the apex (redirects to `www`), `book.jewelpfp.co.uk` and `jewel-pfp.vercel.app`. Preview deployments sit behind Vercel's sign-in, so people outside the team cannot open them.
- Wix is cancelled and nothing points at it; its account closes on 25 November 2026. The old Netlify booking site was deleted on 22 October 2026.

## Booking

- The £99 survey booking is at `/book`, with the terms at `/book/terms`. The client ticks the two required boxes (`src/lib/booking/checkoutTicks.js`), which travel to the Stripe Payment Link as its `client_reference_id`, and pays on Stripe.
- Stripe returns the client to `/book/thank-you`, which shows their JPFP reference and hands them to the portal's booking page, https://portal.jewelpfp.co.uk/book, to answer the questions about their flat and upload their documents. Everything after payment belongs to the Jewel PFP Portal, not to this repository.
- Its data is in `src/lib/booking/` and its components in `src/lib/components/book/`. `src/hooks.server.js` sends any request for `book.jewelpfp.co.uk`, the old booking site's address, to the matching `/book` address, keeping the query string.

## Door set explainer (draft)

Stuart's compliant apartment entrance door set is being built at `/door-explainer` (noindex, not linked, not in the sitemap) so he can sign it off before anything changes on the home page; the home-page "scroll to inspect the door" scene (`src/lib/door3d.js`) stays as it is until then. The new door set is `src/lib/doorset/`: `measures.js` holds every dimension and Stuart's figures (gaps 2 to 4 mm, threshold nominally 8 mm), `build/` one file per part, `cards.js` the part-card wording (one file per door type under `cards/`), which is Stuart's draft and to be expanded on. `doorTypes.js` lists the door types; a part or card names the door types it belongs to, and the page's door type buttons show one door at a time. The rules are on the YBT story "As Stuart, I want the Jewel PFP website to show a compliant fire door set": flat status colours (`status-red`, `status-yellow`, `status-green` in Tailwind), always with a text marker; no rating, certification, standard or product named; gaps drawn larger than life say so; the reference photos never go on the site.
