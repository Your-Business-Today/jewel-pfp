# Jewel PFP

Display website for **Jewel PFP**, built with SvelteKit 2 + Svelte 5 + Tailwind CSS v3.
Deployed on Vercel (`@sveltejs/adapter-vercel`). No backend yet — Supabase can be added later.

## Stack

- **SvelteKit 2** / **Svelte 5** (runes)
- **Tailwind CSS v3** (config in `tailwind.config.js`)
- **Vercel adapter** for deployment
- JavaScript with JSDoc type-checking (`jsconfig.json`)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run build        # production build
npm run preview      # preview the production build locally
npm run check        # type / svelte checks
```

## Project structure

```
src/
  app.html            # page shell
  app.css             # Tailwind entry
  routes/
    +layout.svelte    # header / footer / nav
    +page.svelte      # homepage
    services/+page.svelte
    contact/+page.svelte
  lib/services.js       # service, accreditation + contact data
static/               # static assets (favicon, images)
tailwind.config.js    # theme: brand colors + Inter font
svelte.config.js      # Vercel adapter
```

## Editing content

- Site name + nav: `src/routes/+layout.svelte`
- Homepage headline / tagline: `src/routes/+page.svelte`
- Brand colors + font: `theme.extend` in `tailwind.config.js`

## Deploy to Vercel

1. Push this repo to GitHub (`jewel-pfp`).
2. In Vercel: **Add New → Project → Import** this repo.
3. Framework preset auto-detects as **SvelteKit**. No env vars needed yet.
4. Deploy. You'll get a `*.vercel.app` test URL immediately.
5. Point a custom domain later under **Project → Settings → Domains** (DNS can be configured then).

## Adding Supabase later

When these become dynamic, install `@supabase/ssr`, add the keys to `.env`
(see `.env.example`), and create a client in `src/lib`. Not wired up yet.

<!-- code-quality:start -->
## Code quality

<table><tr><td align="center">
<strong>Code quality score</strong><h2>100.0%</h2>
<sub>measured 2026-10-22 · project-process kit 1.26.0</sub>
</td></tr></table>

419 files · tooling 160 · shared 91 · frontend 78 · backend 40 · tests 20 · docs 16 · infrastructure 11 · database 2 · api 1

<details>
<summary><strong>How the 100.0% is made up</strong></summary>

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **100.0%** | **60** | |
| Files over the line limit | 0 in 73 files | 100.0% | 10 | 50% of files |
| Worst file, in limits over | 0 | 100.0% | 5 | 9 |
| Functions over the line limit | 0 in 16 functions | 100.0% | 8 | 25% of functions |
| Else blocks | 0 in 71 branches | 100.0% | 5 | 50% of branches |
| Duplication % | 0 | 100.0% | 8 | 20 |
| Explanatory comment lines | 0 in 2.4 thousand lines | 100.0% | 4 | 50 per thousand lines |
| Inline magic values | 0 in 2.4 thousand lines | 100.0% | 4 | 20 per thousand lines |
| Orphan components and functions | 0 in 69 components and functions | 100.0% | 4 | 10% of components and functions |
| Long member chain lines | 0 in 2.4 thousand lines | 100.0% | 4 | 30 per thousand lines |
| Deeply indented lines | 0 in 2.4 thousand lines | 100.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 16 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **not measured** | **0** | |
| Files the patterns predict but are missing | not measured | not measured | — | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **100.0%** | **20** | |
| Conditions with calls tangled inside calls | 0 in 71 branches | 100.0% | 8 | 25% of branches |
| Conditions compared to a raw literal | 0 in 71 branches | 100.0% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 16 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

</details>

<details>
<summary><strong>The repository by area: 419 files</strong></summary>

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| tooling | 160 | 0 | 0 |
| shared | 91 | 0 | 0 |
| frontend | 78 | 73 | 2,400 |
| backend | 40 | 0 | 0 |
| tests | 20 | 0 | 0 |
| docs | 16 | 0 | 0 |
| infrastructure | 11 | 0 | 0 |
| database | 2 | 0 | 0 |
| api | 1 | 0 | 0 |
| **whole repository** | **419** | **73** | **2,400** |

</details>

<details>
<summary><strong>The refactoring plan: 0 steps, in order</strong></summary>

Nothing is left to refactor: every figure is at zero.

</details>

<!-- code-quality:end -->
