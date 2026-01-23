# Light Mode Compatibility Rules

## Tailwind v4 Dark Mode Config (CRITICAL)

Tailwind v4 uses **media query** for `dark:` by default, NOT the `.dark` class. The docs site uses class-based dark mode via theme-context.

**Required in `docs/src/index.css`:**
```css
@variant dark (&:where(.dark, .dark *));
```

Without this line, ALL `dark:` prefixes in components will be ignored and only respond to system preference.

## Component Styling

When adding or modifying components in the docs site:

1. **Never use hardcoded dark colors:**
   - NO: `text-white`, `bg-neutral-900`, `border-white/10`, `bg-[#0a0a0a]`
   - YES: `text-foreground`, `bg-card`, `border-border`, `bg-background`

2. **Use CSS variables from the theme system:**
   - Backgrounds: `bg-background`, `bg-card`, `bg-muted`, `bg-[hsl(var(--glass-bg))]`
   - Text: `text-foreground`, `text-muted-foreground`, `text-[hsl(var(--text-primary))]`
   - Borders: `border-border`, `border-[hsl(var(--border-default))]`

3. **For opacity variants:**
   - NO: `text-white/60`
   - YES: `text-foreground/60` or `text-muted-foreground`

4. **For inline styles:**
   - Use `useTheme()` hook and conditional values
   - Or use CSS variables: `style={{ backgroundColor: 'hsl(var(--card))' }}`

5. **Always import from `@pikoloo/darwin-ui`:**
   - Use the latest darwin-ui components
   - Do not copy/paste old component code

## Theme Context Requirements

The theme context (`docs/src/contexts/theme-context.tsx`) must:
1. Set `data-theme` attribute on `<html>` for CSS variable switching
2. Toggle `.dark` class on `<html>` for Tailwind's `dark:` prefix
