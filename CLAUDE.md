# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

```
data source of truth
  website/src/content/*.json   <- Keystatic-managed JSON (single source for the website)

latex/              LaTeX source for both CV variants
  cv_en/            English section .tex files
  cv_it/            Italian section .tex files
  cv_en.tex         English entrypoint
  cv_it.tex         Italian entrypoint
  Makefile          build PDFs into build/ directory
website/            Astro 6 portfolio site (Cloudflare Pages)
  keystatic.config.tsx   CMS schema (dev-only, excluded in prod builds)
scripts/
  generate-latex.mjs     regenerate LaTeX sections from JSON content
.github/workflows/
  deploy.yml             CI: build PDFs -> build Astro -> deploy to Cloudflare Pages
```

## Build -- LaTeX CVs

```bash
cd latex && make        # builds both cv_en.pdf and cv_it.pdf
make en                 # English only
make it                 # Italian only
make clean              # remove build artifacts
```

Requires XeLaTeX. Build artifacts go into `latex/build/`; final PDFs are copied to `latex/` root. Do not hand-edit build artifacts.

## Build -- Website

```bash
pnpm install          # from repo root
pnpm dev              # Astro dev server (localhost:4321) + Keystatic admin at /keystatic
pnpm build            # production build -> website/dist/
pnpm preview          # preview production build locally
```

The PDFs are not committed. In development, download buttons will 404 unless you copy built PDFs into `website/public/`:

```bash
cp latex/cv_en.pdf website/public/cv.pdf
cp latex/cv_it.pdf website/public/cv_it.pdf
```

In CI the workflow builds the PDFs first and copies them automatically.

## Content management (Keystatic)

Keystatic is dev-only (excluded from production builds via `isProd` check in `astro.config.mjs`).

All website content lives in `website/src/content/*.json`. Edit via:
- **Keystatic admin UI** at `http://localhost:4321/keystatic` during `pnpm dev`
- **Direct JSON editing** in `website/src/content/`

Content files:
- `ui.json` -- nav labels, hero text, section headings (bilingual)
- `about.json` -- bio, metrics (bilingual)
- `experience.json` -- jobs (bilingual)
- `education.json` -- degrees (bilingual)
- `skills.json` -- skill groups (bilingual)
- `contact.json` -- contact info (bilingual)
- `certifications.json` -- certification timeline
- `projects.json` -- academic project works
- `writing.json` -- Medium articles
- `theses.json` -- thesis details

Bilingual files have `en` and `it` top-level keys. Components read via `website/src/i18n/index.ts`.

## Regenerate LaTeX from content

After editing content JSON, regenerate LaTeX and build PDFs in one step:

```bash
pnpm generate           # regenerates .tex files + builds PDFs
pnpm generate:latex     # .tex files only (no PDF build)
```

This regenerates `experience.tex`, `education.tex`, and `skills.tex` for both languages. `summary.tex` and `certification.tex` are NOT generated -- edit those by hand.

## Website architecture

- [website/src/pages/index.astro](website/src/pages/index.astro) -- single page, assembles all sections
- [website/src/layouts/Layout.astro](website/src/layouts/Layout.astro) -- HTML shell, SEO meta (canonical, hreflang, OG, Twitter Card, JSON-LD), async Google Fonts, scroll/nav JS
- [website/src/components/](website/src/components/) -- one Astro component per section
- [website/src/i18n/index.ts](website/src/i18n/index.ts) -- reads JSON content files, exports `t(lang)` helper
- [website/src/styles/global.css](website/src/styles/global.css) -- CSS custom properties design system (violet `#9862DD`, accessible `#7340BB` for small text)
- [website/keystatic.config.tsx](website/keystatic.config.tsx) -- Keystatic CMS schema definitions

## Images

Hero photo uses responsive images with `srcset`/`sizes`:
- `me-320w.webp` / `me-320w.jpg` -- 1x standard displays
- `me-640w.webp` / `me-640w.jpg` -- 2x retina displays
- `me.webp` / `me.jpg` -- original full-size (not served to users, kept as source)

To regenerate responsive variants from a new source image:

```bash
cd website/public
sips -Z 640 me.jpg --out me-640w.jpg
sips -Z 320 me.jpg --out me-320w.jpg
cwebp -q 80 me-640w.jpg -o me-640w.webp
cwebp -q 80 me-320w.jpg -o me-320w.webp
```

## SEO & Performance

- Canonical URLs, hreflang (EN/IT/x-default) in Layout.astro
- Open Graph + Twitter Card meta tags
- JSON-LD Person schema
- `@astrojs/sitemap` with i18n locale mapping
- `robots.txt` with sitemap pointer
- Cloudflare `_headers` for cache control (immutable 1yr for images, 1 day for PDFs/sitemap)
- Google Fonts loaded async (preload + onload swap) with noscript fallback
- `fetchpriority="high"` on LCP hero image

## LaTeX conventions

- Section content: `latex/cv_en/*.tex` and `latex/cv_it/*.tex`; personal details in `cv_en.tex` / `cv_it.tex`
- Do not edit [latex/awesome-cv.cls](latex/awesome-cv.cls) unless explicitly asked for template/macro changes
- `\cventry` argument order: role/title, organization, location, date range, body block
- Environments: `cventries` (experience/education), `cvskills`, `cvparagraph` (summary)
- Escape LaTeX special characters: `&` -> `\&`, `%` -> `\%`

## Keeping EN/IT in sync

Content changes (new roles, updated skills, etc.):
1. Edit the relevant JSON file in `website/src/content/` (both `en` and `it` keys)
2. Run `pnpm generate` to regenerate LaTeX and build PDFs
3. Verify PDFs in `latex/cv_en.pdf` and `latex/cv_it.pdf`

## Cloudflare Pages deployment

Push to `main` triggers the CI workflow. Requires these GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PROJECT_NAME` (optional variable, defaults to `ylenia-ferrara-cv`)

## Accessibility

- WCAG AA contrast: `--violet` (#9862DD, 4.10:1) used only for large text/decorative; `--violet-dark` (#7340BB, 6.60:1) for small text (section labels)
- All interactive elements have visible focus states
- Semantic HTML throughout
- Alt text on images, aria-labels on icon-only links
