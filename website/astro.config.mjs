import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const isProd = process.argv.includes('build');

const integrations = [];
if (!isProd) {
  const react = (await import('@astrojs/react')).default;
  const keystatic = (await import('@keystatic/astro')).default;
  integrations.push(react(), keystatic());
}

export default defineConfig({
  ...(isProd && { adapter: cloudflare() }),
  integrations,
});
