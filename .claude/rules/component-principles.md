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
