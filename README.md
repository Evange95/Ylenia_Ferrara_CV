# Ylenia Ferrara -- CV & Portfolio

Bilingual (EN/IT) portfolio website and LaTeX CV for Ylenia Ferrara, CSR Lead & Corporate Communication Specialist.

- **Website** -- Astro 6 on Cloudflare Pages
- **CV** -- XeLaTeX, based on [Awesome CV](https://github.com/posquit0/Awesome-CV)
- **Content** -- single-source JSON managed via Keystatic CMS

## Repository structure

```
website/                  Astro 6 portfolio site
  src/content/*.json      bilingual content (single source of truth)
  src/components/         one Astro component per section
  src/layouts/            HTML shell, SEO meta, fonts
  src/i18n/               i18n helper -- t(lang) reads JSON content
  src/styles/global.css   CSS design system (violet #9862DD)
  keystatic.config.tsx    CMS schema (dev-only)
  public/                 static assets, robots.txt, _headers

latex/                    LaTeX source
  cv_en.tex / cv_it.tex   entrypoints
  cv_en/ / cv_it/         section .tex files
  awesome-cv.cls          template class (do not edit)
  Makefile                build PDFs into build/

scripts/
  generate-latex.mjs      regenerate LaTeX sections from JSON content

.github/workflows/
  deploy.yml              CI: build PDFs -> build Astro -> deploy to Cloudflare Pages
```

## Prerequisites

- [pnpm](https://pnpm.io/) (package manager)
- [XeLaTeX](https://tug.org/xetex/) (for PDF builds)

## Getting started

```bash
pnpm install              # install dependencies
pnpm dev                  # dev server at localhost:4321
                          # Keystatic admin at localhost:4321/keystatic
```

PDFs are not committed. To enable the download buttons locally:

```bash
cd latex && make           # builds cv_en.pdf and cv_it.pdf
cp cv_en.pdf ../website/public/cv.pdf
cp cv_it.pdf ../website/public/cv_it.pdf
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Astro dev server + Keystatic admin |
| `pnpm build` | Production build to `website/dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm generate:latex` | Regenerate LaTeX .tex files from JSON content |
| `pnpm generate` | Generate .tex files + build PDFs |
| `cd latex && make` | Build both PDFs |
| `cd latex && make en` | Build English PDF only |
| `cd latex && make it` | Build Italian PDF only |
| `cd latex && make clean` | Remove build artifacts |

## Content management

All website content lives in `website/src/content/*.json`. Each bilingual file has `en` and `it` top-level keys.

| File | Content |
|---|---|
| `ui.json` | Nav labels, hero text, section headings |
| `about.json` | Bio, metrics |
| `experience.json` | Work experience |
| `education.json` | Degrees |
| `skills.json` | Skill groups |
| `contact.json` | Contact info |
| `certifications.json` | Certification timeline |
| `projects.json` | Academic projects |
| `writing.json` | Medium articles |
| `theses.json` | Thesis details |

Edit content via the **Keystatic admin UI** at `localhost:4321/keystatic` during development, or directly in the JSON files.

After editing content, regenerate LaTeX and rebuild PDFs:

```bash
pnpm generate             # regenerates .tex files + builds PDFs
```

Note: `summary.tex` and `certification.tex` are not auto-generated -- edit those by hand.

## SEO & Performance

The site includes:
- Canonical URLs + hreflang tags (EN/IT/x-default)
- Open Graph and Twitter Card meta tags
- JSON-LD Person structured data
- Sitemap (`@astrojs/sitemap` with i18n)
- `robots.txt`
- Responsive images with WebP + JPG fallback (`srcset`/`sizes`)
- Async Google Fonts loading (non-render-blocking)
- Cloudflare `_headers` for cache control

Lighthouse scores (production): Performance 99, Accessibility 100, Best Practices 100, SEO 100.

## Deployment

Push to `main` triggers the GitHub Actions workflow which:
1. Installs TeX Live and builds both PDFs
2. Copies PDFs into `website/public/`
3. Builds the Astro site
4. Deploys to Cloudflare Pages

Required GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Optional GitHub variable:
- `CLOUDFLARE_PROJECT_NAME` (defaults to `ylenia-ferrara-cv`)

## Credits

LaTeX template based on [Awesome CV](https://github.com/posquit0/Awesome-CV) by posquit0.
