# Atomic Component Principles

## Bleeding Edge Philosophy

Darwin UI is bleeding edge. We prioritize:
- Clean APIs over backward compatibility
- Consolidated variants over separate files
- Breaking changes over legacy cruft

When refactoring:
- DELETE old patterns completely
- NO deprecated exports
- NO re-export aliases for old names
- Users update their code or it breaks

## Self-Containment

Every Darwin UI component is atomic and self-contained:

1. **All styles embedded** - Components include all their styling via Tailwind classes
2. **All interactivity included** - Hover, focus, animations built-in
3. **CSS variables for theming** - Colors use HSL variables from darwin-ui.css
4. **Animation config** - Use getDuration()/getSpring() for consistent timing

## Copy-Paste Ready

To use any component:
1. Import `darwin-ui.css` in your app root
2. Import the component
3. It works - no additional setup needed

## Variant Consolidation

Related components are variants, not separate files:
- `Input.Search`, `Input.TextArea` (not SearchInput, Textarea)
- `Select.Multiple` (not MultiSelect)
- `Button.Icon`, `Button.Ghost` (convenience exports)
- `Floating` -> Tooltip, Popover are just preconfigured Floating

## When Adding Components

1. NEVER hardcode colors - use CSS variables
2. NEVER hardcode animation durations - use animation config
3. Consider if it should be a variant of existing component
4. Embed all styles and interactivity
5. Export from index.ts

## Animation Standards

All animated components must use `/src/lib/animation-config.ts`:

```tsx
import { getDuration, getSpring } from "../lib/animation-config";

// Fade/slide animations
transition={{ duration: getDuration("normal") }}

// Snappy interactions
transition={{ ...getSpring("snappy") }}
```

Duration keys:
- `instant` - 0s (no animation)
- `fast` - 0.1s (quick interactions)
- `normal` - 0.15s (standard transitions)
- `slow` - 0.2s (deliberate animations)
- `reveal` - 0.4s (page reveals)

Spring presets:
- `snappy` - Quick, responsive feel
- `smooth` - Natural, fluid motion
- `gentle` - Soft, subtle movement

## Color Standards

All colors use HSL CSS variables:

```tsx
// Good
className="text-[hsl(var(--text-primary))]"
className="bg-[hsl(var(--glass-bg))]"

// Bad - hardcoded
className="text-gray-900"
className="bg-white/10"
```

## Focus Ring Pattern (CRITICAL)

For form elements (inputs, selects, textareas), use `ring-inset` instead of `border` for focus states. This ensures the focus indicator renders inside the element without gaps or layout shifts.

```tsx
// CORRECT - ring-inset for both default and focus states
className="ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:ring-2 focus:ring-blue-500"

// WRONG - border-based focus (causes gaps/double borders)
className="border border-black/10 focus:border-blue-500"  // ❌ gap between border and ring
className="border focus:ring-2 focus:ring-blue-500"       // ❌ two separate indicators
```

### Pattern Summary

| State | Classes |
|-------|---------|
| Default | `ring-1 ring-inset ring-black/10 dark:ring-white/10` |
| Focus | `focus:ring-2 focus:ring-blue-500` |
| Error | `ring-red-500/50 focus:ring-red-500` |
| Success | `ring-emerald-500/50 focus:ring-emerald-500` |

**Key points:**
- NO `border` class on form inputs - use `ring-inset` only
- Focus just increases ring width from 1 to 2 and changes color
- Transitions smoothly with `transition-all duration-200`

## Dark Mode Pattern (CRITICAL)

When using Tailwind's `dark:` prefix, light mode gets the BASE class, dark mode gets the `dark:` class.

**Light mode = lighter background = DARKER text (higher zinc numbers)**
**Dark mode = darker background = LIGHTER text (lower zinc numbers)**

```tsx
// CORRECT - darker text in light mode, lighter in dark
text-zinc-900 dark:text-zinc-100  // primary text
text-zinc-700 dark:text-zinc-300  // secondary text
text-zinc-500 dark:text-zinc-400  // muted text
bg-zinc-100 dark:bg-zinc-800      // subtle backgrounds
bg-black/5 dark:bg-white/5        // glass backgrounds
hover:bg-black/10 dark:hover:bg-white/10  // hover states

// WRONG - backwards (light text in light mode = invisible)
text-zinc-400 dark:text-zinc-500  // ❌ lighter in light mode
text-zinc-300 dark:text-zinc-700  // ❌ backwards
focus:bg-white/10 dark:focus:bg-black/10  // ❌ backwards
```

### Quick Reference

| Purpose | Light Mode (base) | Dark Mode (dark:) |
|---------|-------------------|-------------------|
| Primary text | zinc-900 | zinc-100 |
| Secondary text | zinc-700 | zinc-300 |
| Muted/disabled | zinc-500 | zinc-400 |
| Borders | black/10 | white/10 |
| Hover bg | black/5 or black/10 | white/5 or white/10 |
| Focus bg | black/5 | white/10 |

### Validation

After editing any component, grep for backwards patterns:
```bash
grep -E "text-zinc-[3-4][0-9]{2} dark:text-zinc-[5-6]" src/components/
```
If this returns results, the colors are backwards.

## Compound Component Pattern

Use compound components for related UI:

```tsx
// Preferred
<Select>
  <Select.Option value="1">One</Select.Option>
  <Select.Option value="2">Two</Select.Option>
</Select>

// Or with convenience export
<Select.Multiple options={options} />
```
