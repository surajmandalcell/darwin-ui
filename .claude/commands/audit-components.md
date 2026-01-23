---
description: Run visual regression audit on Darwin UI components
---

# Visual Component Audit

Audit all Darwin UI components for visual issues across light/dark modes and interactive states.

## What This Command Does

1. Starts the dev-browser server (if not running)
2. Visits each component's documentation page at `http://localhost:4200/docs/components/{id}`
3. Captures screenshots in light and dark modes
4. Analyzes for contrast issues, visibility problems, and design inconsistencies
5. Generates a report with findings and fix recommendations

## Design Standards Checked

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Primary text | `zinc-900` (#18181b) | `zinc-100` (#f4f4f5) |
| Secondary text | `zinc-700` (#3f3f46) | `zinc-300` (#d4d4d8) |
| Muted text | `zinc-500` | `zinc-500` |
| Borders | `black/10` | `white/10` |
| Focus ring | `blue-500/50` inset | `blue-500/50` inset |
| Hover | Increased contrast | Increased contrast |

## Components Audited (30)

**Interactive**: button, checkbox, switch, slider, input, select, multi-select, search-input, textarea, upload

**Navigation**: accordion, tabs, sidebar, dropdown-menu, context-menu, popover, tooltip, dialog, modal, progress

**Display**: avatar, badge, card, charts, close-button, contact-form, date-select, image, reveal, skeleton, table, window

## Prerequisites

1. Dev server running: `npm run dev` (port 4200)
2. Dev-browser server: Available in claude plugins cache

## Output

- Screenshots: `tmp/audit/{light,dark}/{base,hover,focus,active}/{component}.png`
- Report: `docs/plans/component-audit-report.md`

## Usage

Run this command to audit all components. For a specific component:

```
Audit just the button component for visual issues
```

For fixes:

```
Audit and fix visual issues in the tabs component
```
