# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

```
data source of truth
  website/src/content/*.json   ← Keystatic-managed JSON (single source for the website)

latex/              LaTeX source for both CV variants
  cv_en/            English section .tex files
  cv_it/            Italian section .tex files
  cv_en.tex         English entrypoint
  cv_it.tex         Italian entrypoint
  Makefile          build PDFs with `make`
website/            Astro 6 portfolio site (Cloudflare Pages)
  keystatic.config.tsx   CMS schema
scripts/
  generate-latex.mjs     regenerate LaTeX sections from JSON content
.github/workflows/
  deploy.yml             CI: build PDFs → build Astro → deploy to Cloudflare Pages
```

## Build — LaTeX CVs

```bash
cd latex && make        # builds both cv_en.pdf and cv_it.pdf
make en                 # English only
make it                 # Italian only
make clean              # remove build artifacts
```

Requires XeLaTeX. Build artifacts (`.aux`, `.log`, `.out`, `.pdf`) — do not hand-edit.

## Build — Website

```bash
pnpm install          # from repo root
pnpm dev              # Astro dev server (localhost:4321) + Keystatic admin at /keystatic
pnpm build            # production build → website/dist/
pnpm preview          # preview production build locally
```

The PDFs are not committed. In development, download buttons will 404 unless you copy built PDFs into `website/public/`:

```bash
cp latex/cv_en.pdf website/public/cv.pdf
cp latex/cv_it.pdf website/public/cv_it.pdf
```

In CI the workflow builds the PDFs first and copies them automatically.

## Content management (Keystatic)

All website content lives in `website/src/content/*.json`. Edit via:
- **Keystatic admin UI** at `http://localhost:4321/keystatic` during `pnpm dev`
- **Direct JSON editing** in `website/src/content/`

Content files:
- `ui.json` — nav labels, hero text, section headings (bilingual)
- `about.json` — bio, metrics (bilingual)
- `experience.json` — jobs (bilingual)
- `education.json` — degrees (bilingual)
- `skills.json` — skill groups (bilingual)
- `contact.json` — contact info (bilingual)
- `certifications.json` — certification timeline
- `projects.json` — academic project works
- `writing.json` — Medium articles
- `theses.json` — thesis details

Bilingual files have `en` and `it` top-level keys. Components read via `website/src/i18n/index.ts`.

## Regenerate LaTeX from content

After editing content JSON, regenerate the LaTeX section files:

```bash
pnpm generate:latex     # overwrites cv_en/ and cv_it/ .tex files
```

This regenerates `experience.tex`, `education.tex`, and `skills.tex` for both languages. `summary.tex` and `certification.tex` are NOT generated — edit those by hand.

## Website architecture

- [website/src/pages/index.astro](website/src/pages/index.astro) — single page, assembles all sections
- [website/src/layouts/Layout.astro](website/src/layouts/Layout.astro) — HTML shell, Google Fonts, scroll/nav JS
- [website/src/components/](website/src/components/) — one Astro component per section
- [website/src/i18n/index.ts](website/src/i18n/index.ts) — reads JSON content files, exports `t(lang)` helper
- [website/src/styles/global.css](website/src/styles/global.css) — CSS custom properties design system (violet `#9862DD` matches `awesome-lilla` in the LaTeX template)
- [website/keystatic.config.tsx](website/keystatic.config.tsx) — Keystatic CMS schema definitions

## LaTeX conventions

- Section content: `latex/cv_en/*.tex` and `latex/cv_it/*.tex`; personal details in `cv_en.tex` / `cv_it.tex`
- Do not edit [latex/awesome-cv.cls](latex/awesome-cv.cls) unless explicitly asked for template/macro changes
- `\cventry` argument order: role/title, organization, location, date range, body block
- Environments: `cventries` (experience/education), `cvskills`, `cvparagraph` (summary)
- Escape LaTeX special characters: `&` → `\&`, `%` → `\%`

## Keeping EN/IT in sync

Content changes (new roles, updated skills, etc.):
1. Edit the relevant JSON file in `website/src/content/` (both `en` and `it` keys)
2. Run `pnpm generate:latex` to update the LaTeX section files
3. Rebuild PDFs with `cd latex && make`

## Cloudflare Pages deployment

Push to `main` triggers the CI workflow. Requires these GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PROJECT_NAME` (optional, defaults to `ylenia-ferrara-cv`)
