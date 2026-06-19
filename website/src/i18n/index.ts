import uiData from '../content/ui.json';
import aboutData from '../content/about.json';
import experienceData from '../content/experience.json';
import educationData from '../content/education.json';
import skillsData from '../content/skills.json';
import contactData from '../content/contact.json';

export type Lang = 'en' | 'it';

function build(lang: Lang) {
  const ui = (uiData as any)[lang];
  return {
    ...ui,
    about: (aboutData as any)[lang],
    experience: (experienceData as any)[lang],
    skills: (skillsData as any)[lang],
    education: (educationData as any)[lang],
    contact: (contactData as any)[lang],
  };
}

export const translations = {
  en: build('en'),
  it: build('it'),
} as const;

export function t(lang: Lang) {
  return translations[lang];
}
