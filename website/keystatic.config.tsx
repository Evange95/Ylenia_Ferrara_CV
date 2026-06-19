import { config, fields, singleton } from '@keystatic/core';

const bilingualJobSchema = fields.object({
  title: fields.text({ label: 'Job Title' }),
  company: fields.text({ label: 'Company' }),
  location: fields.text({ label: 'Location' }),
  period: fields.text({ label: 'Period' }),
  current: fields.checkbox({ label: 'Current Position' }),
  items: fields.array(
    fields.text({ label: 'Bullet Point', multiline: true }),
    {
      label: 'Description Items',
      itemLabel: (props) => props.value?.substring(0, 60) || 'Item',
    },
  ),
});

const bilingualDegreeSchema = fields.object({
  degree: fields.text({ label: 'Degree' }),
  institution: fields.text({ label: 'Institution' }),
  location: fields.text({ label: 'Location' }),
  period: fields.text({ label: 'Period' }),
  thesis: fields.text({ label: 'Thesis Title', multiline: true }),
});

const bilingualSkillGroupSchema = fields.object({
  icon: fields.text({ label: 'Icon (emoji)' }),
  category: fields.text({ label: 'Category Name' }),
  skills: fields.array(fields.text({ label: 'Skill' }), {
    label: 'Skills',
    itemLabel: (props) => props.value || 'Skill',
  }),
});

const bilingualMetricSchema = fields.object({
  number: fields.text({ label: 'Number' }),
  label: fields.text({ label: 'Description' }),
});

export default config({
  storage: { kind: 'local' },
  singletons: {
    ui: singleton({
      label: 'UI Strings',
      path: 'src/content/ui',
      format: { data: 'json' },
      schema: {
        en: fields.object(
          {
            cvFile: fields.text({ label: 'CV Filename' }),
            htmlLang: fields.text({ label: 'HTML Lang' }),
            nav: fields.object({
              about: fields.text({ label: 'About' }),
              experience: fields.text({ label: 'Experience' }),
              skills: fields.text({ label: 'Skills' }),
              projects: fields.text({ label: 'Projects' }),
              writing: fields.text({ label: 'Writing' }),
              contact: fields.text({ label: 'Contact' }),
              download: fields.text({ label: 'Download CTA' }),
              switchLabel: fields.text({ label: 'Language Switch Label' }),
            }),
            hero: fields.object({
              greeting: fields.text({ label: 'Greeting' }),
              quote: fields.text({ label: 'Quote', multiline: true }),
              download: fields.text({ label: 'Download CTA' }),
              scroll: fields.text({ label: 'Scroll Label' }),
            }),
            certifications: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
            projects: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
            thesis: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
            writing: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
          },
          { label: 'English' },
        ),
        it: fields.object(
          {
            cvFile: fields.text({ label: 'CV Filename' }),
            htmlLang: fields.text({ label: 'HTML Lang' }),
            nav: fields.object({
              about: fields.text({ label: 'Chi sono' }),
              experience: fields.text({ label: 'Esperienza' }),
              skills: fields.text({ label: 'Competenze' }),
              projects: fields.text({ label: 'Progetti' }),
              writing: fields.text({ label: 'Articoli' }),
              contact: fields.text({ label: 'Contatti' }),
              download: fields.text({ label: 'Scarica CTA' }),
              switchLabel: fields.text({ label: 'Language Switch Label' }),
            }),
            hero: fields.object({
              greeting: fields.text({ label: 'Greeting' }),
              quote: fields.text({ label: 'Quote', multiline: true }),
              download: fields.text({ label: 'Download CTA' }),
              scroll: fields.text({ label: 'Scroll Label' }),
            }),
            certifications: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
            projects: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
            thesis: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
            writing: fields.object({
              label: fields.text({ label: 'Section Label' }),
              title: fields.text({ label: 'Section Title' }),
            }),
          },
          { label: 'Italiano' },
        ),
      },
    }),

    about: singleton({
      label: 'About',
      path: 'src/content/about',
      format: { data: 'json' },
      schema: {
        en: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            titleHtml: fields.text({ label: 'Title (HTML)', multiline: true }),
            bio: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
              label: 'Bio Paragraphs',
              itemLabel: (props) => props.value?.substring(0, 50) || 'Paragraph',
            }),
            location: fields.text({ label: 'Location' }),
            metrics: fields.array(bilingualMetricSchema, {
              label: 'Metrics',
              itemLabel: (props) => `${props.fields.number.value} — ${props.fields.label.value}` || 'Metric',
            }),
          },
          { label: 'English' },
        ),
        it: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            titleHtml: fields.text({ label: 'Title (HTML)', multiline: true }),
            bio: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
              label: 'Bio Paragraphs',
              itemLabel: (props) => props.value?.substring(0, 50) || 'Paragraph',
            }),
            location: fields.text({ label: 'Location' }),
            metrics: fields.array(bilingualMetricSchema, {
              label: 'Metrics',
              itemLabel: (props) => `${props.fields.number.value} — ${props.fields.label.value}` || 'Metric',
            }),
          },
          { label: 'Italiano' },
        ),
      },
    }),

    experience: singleton({
      label: 'Experience',
      path: 'src/content/experience',
      format: { data: 'json' },
      schema: {
        en: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            title: fields.text({ label: 'Section Title' }),
            current: fields.text({ label: 'Current Badge Label' }),
            jobs: fields.array(bilingualJobSchema, {
              label: 'Jobs',
              itemLabel: (props) => props.fields.title.value || 'Job',
            }),
          },
          { label: 'English' },
        ),
        it: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            title: fields.text({ label: 'Section Title' }),
            current: fields.text({ label: 'Current Badge Label' }),
            jobs: fields.array(bilingualJobSchema, {
              label: 'Jobs',
              itemLabel: (props) => props.fields.title.value || 'Job',
            }),
          },
          { label: 'Italiano' },
        ),
      },
    }),

    education: singleton({
      label: 'Education',
      path: 'src/content/education',
      format: { data: 'json' },
      schema: {
        en: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            title: fields.text({ label: 'Section Title' }),
            thesisLabel: fields.text({ label: 'Thesis Label' }),
            degrees: fields.array(bilingualDegreeSchema, {
              label: 'Degrees',
              itemLabel: (props) => props.fields.degree.value || 'Degree',
            }),
          },
          { label: 'English' },
        ),
        it: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            title: fields.text({ label: 'Section Title' }),
            thesisLabel: fields.text({ label: 'Thesis Label' }),
            degrees: fields.array(bilingualDegreeSchema, {
              label: 'Degrees',
              itemLabel: (props) => props.fields.degree.value || 'Degree',
            }),
          },
          { label: 'Italiano' },
        ),
      },
    }),

    skills: singleton({
      label: 'Skills',
      path: 'src/content/skills',
      format: { data: 'json' },
      schema: {
        en: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            title: fields.text({ label: 'Section Title' }),
            groups: fields.array(bilingualSkillGroupSchema, {
              label: 'Skill Groups',
              itemLabel: (props) => props.fields.category.value || 'Group',
            }),
          },
          { label: 'English' },
        ),
        it: fields.object(
          {
            label: fields.text({ label: 'Section Label' }),
            title: fields.text({ label: 'Section Title' }),
            groups: fields.array(bilingualSkillGroupSchema, {
              label: 'Skill Groups',
              itemLabel: (props) => props.fields.category.value || 'Group',
            }),
          },
          { label: 'Italiano' },
        ),
      },
    }),

    certifications: singleton({
      label: 'Certifications',
      path: 'src/content/certifications',
      format: { data: 'json' },
      schema: {
        years: fields.array(
          fields.object({
            year: fields.text({ label: 'Year' }),
            certs: fields.array(
              fields.object({
                issuer: fields.text({ label: 'Issuer' }),
                name: fields.text({ label: 'Certification Name' }),
              }),
              {
                label: 'Certifications',
                itemLabel: (props) => props.fields.name.value || 'Cert',
              },
            ),
          }),
          {
            label: 'Year Groups',
            itemLabel: (props) => props.fields.year.value || 'Year',
          },
        ),
      },
    }),

    projects: singleton({
      label: 'Projects',
      path: 'src/content/projects',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            company: fields.text({ label: 'Company' }),
            course: fields.text({ label: 'Course' }),
            description: fields.text({ label: 'Description', multiline: true }),
            tags: fields.array(fields.text({ label: 'Tag' }), {
              label: 'Tags',
              itemLabel: (props) => props.value || 'Tag',
            }),
          }),
          {
            label: 'Projects',
            itemLabel: (props) => props.fields.company.value || 'Project',
          },
        ),
      },
    }),

    writing: singleton({
      label: 'Writing',
      path: 'src/content/writing',
      format: { data: 'json' },
      schema: {
        articles: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            preview: fields.text({ label: 'Preview', multiline: true }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Articles',
            itemLabel: (props) => props.fields.title.value || 'Article',
          },
        ),
      },
    }),

    theses: singleton({
      label: 'Theses',
      path: 'src/content/theses',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            level: fields.text({ label: 'Level (e.g. Master\'s Thesis)' }),
            degree: fields.text({ label: 'Degree' }),
            institution: fields.text({ label: 'Institution' }),
            year: fields.text({ label: 'Year' }),
            title: fields.text({ label: 'Title', multiline: true }),
            abstract: fields.text({ label: 'Abstract', multiline: true }),
            keywords: fields.array(fields.text({ label: 'Keyword' }), {
              label: 'Keywords',
              itemLabel: (props) => props.value || 'Keyword',
            }),
          }),
          {
            label: 'Theses',
            itemLabel: (props) => props.fields.title.value || 'Thesis',
          },
        ),
      },
    }),
  },
});
