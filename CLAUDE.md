# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

```
latex/          LaTeX source for both CV variants
website/        Astro static portfolio site (GitHub Pages)
.github/
  workflows/
    deploy.yml  CI: build PDFs → build Astro → deploy to GitHub Pages
```

## Build — LaTeX CVs

Run from within `latex/`:

```bash
cd latex
xelatex cv.tex      # → latex/cv.pdf  (English)
xelatex cv_it.tex   # → latex/cv_it.pdf (Italian)
```

Run each command twice if cross-references or layout look stale. Requires XeLaTeX.

Build artifacts — do not hand-edit: `latex/cv.aux`, `latex/cv.log`, `latex/cv.out`, `latex/cv.pdf` (and `cv_it.*` equivalents).

## Build — Website

```bash
pnpm install          # from repo root
pnpm dev              # start Astro dev server (localhost:4321)
pnpm build            # production build → website/dist/
pnpm preview          # preview production build locally
```

The PDFs are not committed. In development, download buttons will 404 unless you copy built PDFs into `website/public/`:

```bash
cp latex/cv.pdf latex/cv_it.pdf website/public/
```

In CI the workflow builds the PDFs first and copies them automatically.

## Website architecture

- [website/src/pages/index.astro](website/src/pages/index.astro) — single page, assembles all sections
- [website/src/layouts/Layout.astro](website/src/layouts/Layout.astro) — HTML shell, Google Fonts, scroll/nav JS
- [website/src/components/](website/src/components/) — one Astro component per section (Navigation, Hero, About, Experience, Skills, Education, Certifications, Contact)
- [website/src/styles/global.css](website/src/styles/global.css) — CSS custom properties design system (violet `#9862DD` matches `awesome-lilla` in the LaTeX template)
- [website/public/](website/public/) — static assets: `me.jpg`, `favicon.svg`, PDFs (from CI)

Base path is injected at build time via `BASE_PATH` env var. Locally defaults to `/`.

## LaTeX conventions

- Prefer editing content in `latex/cv/*.tex` and `latex/cv_it/*.tex`; personal details in `latex/cv.tex` / `latex/cv_it.tex`
- Do not edit [latex/awesome-cv.cls](latex/awesome-cv.cls) unless explicitly asked for template/macro changes
- `\cventry` argument order: role/title, organization, location, date range, body block
- Environments: `cventries` (experience/education), `cvskills`, `cvparagraph` (summary)
- To hide a section, comment out its `\input{...}` line in the entrypoint file
- Escape LaTeX special characters: `&` → `\&`, `%` → `\%`

## Keeping EN/IT in sync

Content changes (new roles, updated skills, etc.) must be mirrored in both `latex/cv/` (English) and `latex/cv_it/` (Italian), **and** in the corresponding Astro component in `website/src/components/`.

## GitHub Pages deployment

Push to `main` triggers the workflow automatically. To enable GitHub Pages for the first time:
1. Go to repo Settings → Pages
2. Set source to **GitHub Actions**

The deployed URL will be `https://<owner>.github.io/<repo-name>/`.
