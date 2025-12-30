import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    'next/font/google',
    'next/navigation',
    'next/dynamic',
    'next/image',
  ],
  sourcemap: true,
  minify: true,
  splitting: true,
  treeshake: true,
  banner: {
    js: '"use client";',
  },
});
