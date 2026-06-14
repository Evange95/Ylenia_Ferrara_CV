import { defineConfig } from 'astro/config';

const base = process.env.BASE_PATH ?? '/';
const site = process.env.SITE_URL
  ? `${process.env.SITE_URL}${base === '/' ? '' : base}`
  : 'http://localhost:4321';

export default defineConfig({
  site,
  base,
  output: 'static',
});
