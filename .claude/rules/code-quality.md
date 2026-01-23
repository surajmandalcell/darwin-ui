# Code Quality - ZERO TOLERANCE

**This is NON-NEGOTIABLE. The user should NEVER have to report errors to you.**

## MANDATORY: After EVERY File Edit

You MUST run these checks yourself. DO NOT wait for the user to paste errors from VSCode.

```bash
# After editing ANY file, immediately run:
npx biome check src/path/to/edited/file.tsx

# If biome reports issues, fix them and re-run until clean
npx biome check --write src/path/to/edited/file.tsx
```

## What This Means

1. **YOU check for errors** - Don't wait for user to report them
2. **YOU run biome** - After every single file edit
3. **YOU fix warnings** - Warnings are NOT acceptable, treat them as errors
4. **YOU verify** - Re-run checks until output is clean

## After Multiple File Edits

```bash
# Check all modified files at once
npx biome check src/app/admin/**/*.tsx src/components/**/*.tsx
```

## Priority Levels (ALL ARE BLOCKING)

| Biome Output | Action |
|--------------|--------|
| ✘ Error | STOP. Fix immediately. |
| ⚠ Warning | STOP. Fix immediately. |
| ● Info | STOP. Fix immediately. |
| ★ Hint | Fix before moving on. |

## Common Violations You MUST Catch

- `useButtonType` - EVERY button needs `type="button"` or `type="submit"`
- `useKeyWithClickEvents` - EVERY onClick on div/span/td needs `onKeyDown` + `role` + `tabIndex`
- `noStaticElementInteractions` - Add `role` attribute
- `useMediaCaption` - Add `<track kind="captions" />` to video/audio
- Import sorting - Biome will complain, run `--write` to fix
- Unused variables - Remove them or prefix with `_`
- Deprecated APIs - Replace with current alternatives

## The Rule

**If you edit a file and don't run `npx biome check` on it, you are failing.**

**If biome reports ANY issue and you ignore it, you are failing.**

**If the user has to paste an error from VSCode, you have already failed.**

## Workflow

1. Edit file
2. Run `npx biome check <file>` immediately
3. If issues exist → fix them
4. Re-run until clean
5. Only then move to next task

**NO EXCEPTIONS.**
