import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'path'
import { docRoutes } from './doc-routes'

function staticSpaRoutes(): Plugin {
  const routes = [
    'docs',
    'changelog',
    'desktop',
    ...Object.entries(docRoutes).flatMap(([section, pages]) =>
      pages.map(({ id }) => `docs/${section}/${id}`),
    ),
  ]

  return {
    name: 'static-spa-routes',
    writeBundle({ dir }, bundle) {
      const index = bundle['index.html']
      if (!dir || index?.type !== 'asset') return

      for (const route of routes) {
        const output = path.resolve(dir, route, 'index.html')
        mkdirSync(path.dirname(output), { recursive: true })
        writeFileSync(output, index.source)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    staticSpaRoutes(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pikoloo/darwin-ui': path.resolve(__dirname, '../src'),
      // Force React and framer-motion to use docs' node_modules
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'framer-motion': path.resolve(__dirname, './node_modules/framer-motion'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime')
    },
    dedupe: ['react', 'react-dom', 'framer-motion']
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  server: {
    port: 5180
  }
})
