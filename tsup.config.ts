import { defineConfig } from 'tsup';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { compile } from 'tailwindcss';

const require = createRequire(import.meta.url);
const componentEntries = Object.fromEntries(
  readdirSync('src/components')
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => [file.slice(0, -4), `src/components/${file}`]),
);

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.tsx?$/.test(entry.name) ? [file] : [];
  });
}

async function buildStyles() {
  const input = readFileSync('src/styles/darwin-ui.css', 'utf8');
  const compiler = await compile(input, {
    base: process.cwd(),
    loadStylesheet: async (id, base) => {
      const path = id === 'tailwindcss'
        ? require.resolve('tailwindcss/index.css')
        : id.startsWith('.')
          ? resolve(base, id)
          : require.resolve(id, { paths: [base] });

      return { path, base: dirname(path), content: readFileSync(path, 'utf8') };
    },
  });
  const candidates = sourceFiles('src').flatMap(
    (file) => readFileSync(file, 'utf8').match(/[^<>"'`\s]*[^<>"'`\s:]/g) ?? [],
  );

  writeFileSync('dist/darwin-ui.css', compiler.build(candidates));
}

export default defineConfig({
  entry: { index: 'src/index.ts', ...componentEntries },
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
  banner: {
    js: '"use client";',
  },
  onSuccess: buildStyles,
});
