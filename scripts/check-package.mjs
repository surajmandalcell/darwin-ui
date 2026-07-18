import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'darwin-ui-package-'));

try {
  const [packed] = JSON.parse(execFileSync(
    'npm',
    ['pack', '--json', '--pack-destination', temporaryDirectory],
    { cwd: root, encoding: 'utf8' },
  ));
  execFileSync('tar', ['-xzf', join(temporaryDirectory, packed.filename), '-C', temporaryDirectory]);

  const packageRoot = join(temporaryDirectory, 'package');
  const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const css = readFileSync(join(packageRoot, 'dist/darwin-ui.css'), 'utf8');
  const components = readdirSync(join(root, 'src/components'))
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => file.slice(0, -4));

  assert.deepEqual(manifest.exports['./*'], {
    types: './dist/*.d.ts',
    import: './dist/*.mjs',
    require: './dist/*.js',
  });
  assert.match(manifest.dependencies['date-fns'], /^\^4\./);
  for (const component of components) {
    for (const extension of ['d.ts', 'js', 'mjs']) {
      assert.ok(packed.files.some(({ path }) => path === `dist/${component}.${extension}`));
    }
  }

  assert.doesNotMatch(css, /@(import|source|theme|variant|apply)\b/);
  assert.match(css, /\[data-theme=['"]light['"]\]/);
  for (const token of ['--background:', '--foreground:', '--radius:', '--bg-base:', '--text-primary:']) {
    assert.ok(css.includes(token), `missing CSS token: ${token}`);
  }
  for (const utility of ['.bg-blue-500', '.h-2', '.rounded-full', '.stroke-red-500']) {
    assert.ok(css.includes(utility), `missing compiled utility: ${utility}`);
  }

  const progress = JSON.parse(readFileSync(join(root, 'docs/public/registry/progress.json'), 'utf8'));
  const registry = JSON.parse(readFileSync(join(root, 'docs/public/registry/index.json'), 'utf8'));
  assert.equal(progress.name, 'progress');
  assert.equal(progress.type, 'registry:ui');
  assert.ok(progress.dependencies.includes('framer-motion'));
  assert.ok(progress.registryDependencies.includes('utils'));
  assert.ok(progress.files[0].content.includes('function Progress'));
  assert.ok(registry.items.some(({ name }) => name === 'progress'));
  for (const [name, path, exported] of [
    ['multi-select', 'components/select.tsx', 'MultiSelectComponent as MultiSelect'],
    ['search-input', 'components/input.tsx', 'export { SearchInput }'],
  ]) {
    const item = JSON.parse(readFileSync(join(root, `docs/public/registry/${name}.json`), 'utf8'));
    assert.equal(item.files[0].path, path);
    assert.ok(item.files[0].content.includes(exported));
  }

  symlinkSync(join(root, 'node_modules'), join(temporaryDirectory, 'node_modules'), 'dir');
  const require = createRequire(pathToFileURL(join(packageRoot, 'package.json')));
  for (const [component, exported] of [['button', 'Button'], ['input', 'Input'], ['progress', 'Progress']]) {
    const modulePath = join(packageRoot, `dist/${component}.mjs`);
    assert.match(readFileSync(modulePath, 'utf8'), /^"use client";/);
    assert.ok(exported in await import(pathToFileURL(modulePath)));
    assert.ok(exported in require(`./dist/${component}.js`));
  }

  console.log(`Package smoke check passed for ${components.length} component subpaths.`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
