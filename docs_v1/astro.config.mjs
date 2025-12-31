import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://darwin-ui.mandalsuraj.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    starlight({
      title: 'Darwin UI',
      description: 'A beautiful macOS-inspired dark theme React component library with glass-morphism aesthetic',
      social: {
        github: 'https://github.com/surajmandalcell/darwin-ui',
      },
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://darwin-ui.mandalsuraj.com/og-image.png',
          },
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Theming', slug: 'getting-started/theming' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Button', slug: 'components/button' },
            { label: 'Badge', slug: 'components/badge' },
            { label: 'Card', slug: 'components/card' },
            { label: 'Input', slug: 'components/input' },
            { label: 'Select', slug: 'components/select' },
            { label: 'Checkbox', slug: 'components/checkbox' },
            { label: 'Switch', slug: 'components/switch' },
            { label: 'Table', slug: 'components/table' },
            { label: 'Modal', slug: 'components/modal' },
            { label: 'Toast', slug: 'components/toast' },
            { label: 'Alert', slug: 'components/alert' },
            { label: 'Charts', slug: 'components/charts' },
            { label: 'Sidebar', slug: 'components/sidebar' },
            { label: 'Window', slug: 'components/window' },
            { label: 'Skeleton', slug: 'components/skeleton' },
          ],
        },
        {
          label: 'Hooks',
          items: [
            { label: 'useMediaQuery', slug: 'hooks/use-media-query' },
            { label: 'useIsMobile', slug: 'hooks/use-mobile' },
            { label: 'useEscapeKey', slug: 'hooks/use-escape-key' },
          ],
        },
      ],
    }),
  ],
});
