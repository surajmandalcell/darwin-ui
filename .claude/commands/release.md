---
description: Prepare and publish a new release version with testing and tagging
argument-hint: <version>
allowed-tools: Bash(git:*), Bash(npm run:*), Bash(npm version:*), Read, Edit
---

# Darwin UI Release Command

Prepare and publish version **$1**.

## Current State
- Current branch: !`git branch --show-current`
- Latest tag: !`git tag -l --sort=-version:refname | head -1`
- Working directory status: !`git status --short`

## Release Steps

Execute the following release workflow:

### 1. Pre-flight Checks
- Verify on `main` branch
- Ensure working directory is clean (no uncommitted changes)
- If dirty, ask user if they want to commit first

### 2. Run Tests and Build
Run the builds to verify everything compiles:
```bash
npm run build          # Build main library
cd docs && npm run build  # Build docs site
```

### 3. Update Versions
Update version to `$1` in these files:
- `/package.json` - main library
- `/docs/package.json` - docs site
- `/docs/src/components/desktop/MenuBar.tsx` - version display in menu bar
- `/docs/src/components/desktop/apps/AboutApp.tsx` - version display in About app

### 4. Update Changelog
Add a new entry at the TOP of the changelog array in `/docs/src/data/changelog.ts`:

```typescript
{
  version: '$1',
  date: 'YYYY-MM-DD',  // Use today's date
  title: 'Short descriptive title',
  description: 'Brief summary of this release (optional)',
  changes: [
    { type: 'added', description: 'New feature description' },
    { type: 'added', component: 'ComponentName', description: 'Component-specific change' },
    { type: 'changed', description: 'What was modified' },
    { type: 'fixed', description: 'Bug that was fixed' },
    { type: 'removed', description: 'What was removed' },
    { type: 'deprecated', description: 'What is now deprecated' },
    { type: 'security', description: 'Security-related change' },
  ],
}
```

**Change types:**
- `added` - New features or components
- `changed` - Changes to existing functionality
- `fixed` - Bug fixes
- `removed` - Removed features
- `deprecated` - Features marked for future removal
- `security` - Security-related changes

Use `component` field when change is specific to a component.
Use `breaking: true` for breaking changes.

### 5. Commit Version Bump
```bash
git add .
git commit -m "release: v$1"
```

### 6. Create Git Tag
```bash
git tag -a v$1 -m "Release v$1"
```

### 7. Push to Remote
Ask user for confirmation, then:
```bash
git push origin main
git push origin v$1
```

## Important Notes
- Version must follow semver format (e.g., 1.2.0, 1.3.0-beta.1)
- Always verify builds pass before tagging
- The command will stop and report if any step fails
