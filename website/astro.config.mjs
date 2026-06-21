import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

const isProd = process.argv.includes('build');

const integrations = [sitemap({
  i18n: {
    defaultLocale: 'en',
    locales: { en: 'en', it: 'it' },
  },
})];
if (!isProd) {
  const react = (await import('@astrojs/react')).default;
  const keystatic = (await import('@keystatic/astro')).default;
  integrations.push(react(), keystatic());
}

export default defineConfig({
  site: 'https://yleniaferrara.com',
  ...(isProd && { adapter: cloudflare() }),
  integrations,
});
