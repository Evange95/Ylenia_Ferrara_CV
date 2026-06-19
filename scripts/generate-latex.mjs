#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, '..', 'website', 'src', 'content');
const latexDir = join(__dirname, '..', 'latex');

function read(file) {
  return JSON.parse(readFileSync(join(contentDir, file), 'utf-8'));
}

function esc(text) {
  return text
    .replace(/<strong>(.*?)<\/strong>/g, '\\textbf{$1}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/–/g, '-')
    .replace(/—/g, ' --- ');
}

const experience = read('experience.json');
const education = read('education.json');
const skills = read('skills.json');

const LANG_MAP = {
  en: { dir: 'cv_en', sectionExp: 'Experience', sectionEdu: 'Education', sectionSkills: 'Skills', thesisLabel: 'Thesis' },
  it: { dir: 'cv_it', sectionExp: 'Esperienza', sectionEdu: 'Formazione', sectionSkills: 'Competenze', thesisLabel: 'Tesi' },
};

for (const lang of ['en', 'it']) {
  const cfg = LANG_MAP[lang];
  const dir = join(latexDir, cfg.dir);

  // Experience
  const expLines = [
    `\\cvsection{${cfg.sectionExp}}`,
    '',
    '\\begin{cventries}',
  ];
  for (const job of experience[lang].jobs) {
    expLines.push('', '%---------------------------------------------------------', '\\cventry');
    expLines.push(`{${esc(job.title)}} % Job Title`);
    expLines.push(`{${esc(job.company)}} % Company`);
    expLines.push(`{${esc(job.location)}} % Location`);
    expLines.push(`{${esc(job.period)}} % Date(s)`);
    expLines.push('{');
    expLines.push('\\begin{cvitems}');
    for (const item of job.items) {
      expLines.push(`\\item ${esc(item)}`);
    }
    expLines.push('\\end{cvitems}');
    expLines.push('}');
  }
  expLines.push('', '\\end{cventries}');
  writeFileSync(join(dir, 'experience.tex'), expLines.join('\n') + '\n');

  // Education
  const eduLines = [
    `\\cvsection{${cfg.sectionEdu}}`,
    '',
    '\\begin{cventries}',
  ];
  for (const d of education[lang].degrees) {
    eduLines.push('', '\\cventry');
    eduLines.push(`{${esc(d.degree)}} % Degree`);
    eduLines.push(`{${esc(d.institution)}} % Institution`);
    eduLines.push(`{${esc(d.location)}} % Location`);
    eduLines.push(`{${esc(d.period)}} % Date(s)`);
    eduLines.push('{');
    eduLines.push('\\begin{cvitems}');
    eduLines.push(`\\item \\textit{${cfg.thesisLabel}}: ${esc(d.thesis)}`);
    eduLines.push('\\end{cvitems}');
    eduLines.push('}');
  }
  eduLines.push('', '\\end{cventries}');
  writeFileSync(join(dir, 'education.tex'), eduLines.join('\n') + '\n');

  // Skills
  const skLines = [
    `\\cvsection{${cfg.sectionSkills}}`,
    '',
    '\\begin{cvskills}',
  ];
  for (const group of skills[lang].groups) {
    const cat = group.category.length > 14
      ? group.category.replace('Project Management', 'Project Mgmt').replace('Tools & Platforms', 'IT').replace('Strumenti', 'IT')
      : group.category;
    const skillList = group.skills
      .map(s => s.replace(' — ', ' (').replace('Native', 'native)').replace('Madrelingua', 'madrelingua)'))
      .join(', ');
    skLines.push('', '\\cvskill');
    skLines.push(`{${esc(cat)}} % Category`);
    skLines.push(`{${esc(skillList)}} % Skills`);
  }
  skLines.push('', '\\end{cvskills}');
  writeFileSync(join(dir, 'skills.tex'), skLines.join('\n') + '\n');

  console.log(`Generated LaTeX for ${lang} → ${cfg.dir}/`);
}
