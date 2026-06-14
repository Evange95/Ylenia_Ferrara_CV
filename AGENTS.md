# AGENTS

## Purpose

This repository contains a single Awesome-CV document customized for Ylenia Ferrara.

## Quick Start For Agents

- Build command: `xelatex cv.tex`
- Main entrypoint: [cv.tex](cv.tex)
- Primary content files: [cv/summary.tex](cv/summary.tex), [cv/experience.tex](cv/experience.tex), [cv/education.tex](cv/education.tex), [cv/skills.tex](cv/skills.tex), [cv/certification.tex](cv/certification.tex)
- Upstream template reference: [README.md](README.md)

## Edit Boundaries

- Prefer editing content in `cv/*.tex` and personal details in [cv.tex](cv.tex).
- Do not edit [awesome-cv.cls](awesome-cv.cls) unless the user explicitly asks for template-level styling/macro changes.
- Keep the XeLaTeX directive and encoding lines at the top of [cv.tex](cv.tex).

## Content Conventions

- Keep section structure intact:
  - `\\cvsection{...}` title
  - Correct environment per file (`cventries`, `cvskills`, `cvparagraph`)
- In experience/education entries, preserve `\\cventry` argument order:
  1. Role/title
  2. Organization
  3. Location
  4. Date range
  5. Body block (usually `cvitems`)
- Escape LaTeX special characters in user text (for example: `&` -> `\\&`, `%` -> `\\%`).

## Section Routing

- Active sections are included in [cv.tex](cv.tex) via `\\input{cv/...}`.
- To hide a section, comment out the relevant `\\input{...}` line in [cv.tex](cv.tex) instead of deleting section content.

## Build And Validation

- After edits, run `xelatex cv.tex` to validate and regenerate [cv.pdf](cv.pdf).
- If cross-references/layout look stale, run the same command a second time.
- There is no automated test suite in this repository.

## Generated Files

- Treat these as build artifacts; do not hand-edit: `cv.aux`, `cv.log`, `cv.out`, `cv.synctex.gz`, `cv.pdf`.

## Notes For Future Customizations

- If workflows become more complex, add targeted instructions under `.github/instructions/*.instructions.md` (for example, one for content edits and one for style/theme edits).