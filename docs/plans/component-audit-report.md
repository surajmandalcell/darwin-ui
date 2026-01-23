# Component Visual Audit Report

**Date**: 2026-01-23
**Darwin UI Version**: Current main branch
**Auditor**: Claude Code Visual Regression System

---

## Summary

| Metric | Count |
|--------|-------|
| Components Audited | 30 |
| Issues Found | 9 |
| Critical (Broken UX) | 4 |
| Important (Contrast/Visibility) | 3 |
| Minor (Aesthetic) | 2 |

---

## Design Standards Reference

### Light Mode
| Element | Expected Value |
|---------|---------------|
| Primary text | `zinc-900` (#18181b) |
| Secondary text | `zinc-700` (#3f3f46) |
| Muted text | `zinc-500` (#71717a) |
| Borders | `black/10` |
| Backgrounds | white / transparent |

### Dark Mode
| Element | Expected Value |
|---------|---------------|
| Primary text | `zinc-100` (#f4f4f5) |
| Secondary text | `zinc-300` (#d4d4d8) |
| Muted text | `zinc-500` (#71717a) |
| Borders | `white/10` |
| Backgrounds | `zinc-900` / transparent |

### Interactive States
| State | Expectation |
|-------|-------------|
| Hover | Increased contrast from base |
| Focus | `blue-500/50` ring, inset |
| Active/Pressed | Visible press feedback |
| Disabled | Reduced opacity (50%) |

---

## Critical Issues (Require Immediate Fix)

### 1. Checkbox - Light Mode Contrast Issue
**File:** `src/components/checkbox.tsx` (Line 50)
**Mode:** Light
**Issue:** Unchecked checkbox uses `bg-zinc-800 border-zinc-600` which appears as a dark filled square on light backgrounds.
**Fix:** Change to `bg-white dark:bg-zinc-800 border-black/10 dark:border-zinc-600`

### 2. Tabs - Active Tab Visibility in Dark Mode
**File:** `src/components/tabs.tsx` (Lines 83-94)
**Mode:** Dark
**Issue:** Active tab text is nearly invisible. The "Overview" tab label disappears against the background.
**Fix:** Increase background opacity from `dark:bg-white/10` to `dark:bg-white/15` or `dark:bg-white/20`

### 3. Table - Body Text Invisible in Light Mode
**File:** `src/components/table.tsx`
**Mode:** Light
**Issue:** Table body text (names, emails in cells) is completely invisible. Only headers and badges show.
**Fix:** Use `text-[hsl(var(--text-primary))]` for table body cells

### 4. Card - Title Invisible in Dark Mode
**File:** `src/components/card.tsx`
**Mode:** Dark
**Issue:** CardTitle text is not visible in dark mode.
**Fix:** Use `text-[hsl(var(--text-primary))]` for CardTitle

---

## Important Issues (Should Fix)

### 5. Select/MultiSelect - Dropdown Option Contrast
**File:** `src/components/select.tsx` (Lines 200, 333, 405)
**Mode:** Both
**Issue:** Unselected options use `text-zinc-400 dark:text-zinc-500` - too light for WCAG compliance.
**Fix:** Use `text-zinc-700 dark:text-zinc-300`

### 6. Accordion - Trigger Text in Dark Mode
**File:** `src/components/accordion.tsx`
**Mode:** Dark
**Issue:** Accordion trigger titles are nearly invisible in dark mode - only chevron icons visible.
**Fix:** Ensure trigger text uses `text-zinc-900 dark:text-zinc-100`

### 7. DateSelect - Placeholder Invisible in Light Mode
**File:** `src/components/date-select.tsx`
**Mode:** Light
**Issue:** "Select date" placeholder is invisible in the input field.
**Fix:** Use `placeholder:text-zinc-500` or `placeholder:text-[hsl(var(--text-secondary))]`

---

## Minor Issues

### 8. Upload - Button Text Contrast
**File:** `src/components/upload.tsx` (Line 73)
**Mode:** Light
**Issue:** Add button uses `text-zinc-400` in resting state - has duplicate dark mode classes.
**Fix:** Clean up duplicate classes, use `text-zinc-700 dark:text-zinc-300`

### 9. ContactForm - Input Field Low Contrast in Dark Mode
**File:** `src/components/contact-form.tsx`
**Mode:** Dark
**Issue:** Input field borders and placeholder text have very low contrast.
**Fix:** Increase border opacity and adjust placeholder colors

---

## Issues by Component Group

### Group 1: Interactive Components (10 total)

| Component | Light Mode | Dark Mode | Status |
|-----------|------------|-----------|--------|
| button | PASS | PASS | OK |
| checkbox | FAIL | PASS | Critical |
| switch | PASS | PASS | OK |
| slider | PASS | PASS | OK |
| input | PASS | PASS | OK |
| select | ISSUE | ISSUE | Medium |
| multi-select | ISSUE | ISSUE | Medium |
| search-input | PASS | PASS | OK |
| textarea | PASS | PASS | OK |
| upload | ISSUE | PASS | Minor |

### Group 2: Navigation & Feedback Components (10 total)

| Component | Light Mode | Dark Mode | Status |
|-----------|------------|-----------|--------|
| accordion | PASS | FAIL | Important |
| tabs | PASS | FAIL | Critical |
| sidebar | PASS | PASS | OK |
| dropdown-menu | PASS | PASS | OK |
| context-menu | PASS | PASS | OK |
| popover | PASS | PASS | OK |
| tooltip | PASS | PASS | OK |
| dialog | PASS | PASS | OK |
| modal | PASS | PASS | OK |
| progress | PASS | PASS | OK |

### Group 3: Display Components (10 total)

| Component | Light Mode | Dark Mode | Status |
|-----------|------------|-----------|--------|
| avatar | PASS | PASS | OK |
| badge | PASS | PASS | OK |
| card | PASS | FAIL | Critical |
| charts | PASS | PASS | OK |
| close-button | PASS | PASS | OK |
| contact-form | PASS | ISSUE | Minor |
| date-select | FAIL | PASS | Medium |
| image | PASS | PASS | OK |
| reveal | PASS | PASS | OK |
| skeleton | PASS | PASS | OK |
| table | FAIL | PASS | Critical |
| window | PASS | PASS | OK |

---

## Screenshots

Screenshots are stored in:
- Light mode: `tmp/audit/light/base/{component}.png`
- Dark mode: `tmp/audit/dark/base/{component}.png`

---

## Recommended Fix Order

1. **checkbox.tsx** - Critical light mode issue
2. **tabs.tsx** - Critical dark mode issue
3. **table.tsx** - Critical light mode issue
4. **card.tsx** - Critical dark mode issue
5. **accordion.tsx** - Important dark mode issue
6. **select.tsx** - Medium contrast issue
7. **date-select.tsx** - Medium placeholder issue
8. **upload.tsx** - Minor cleanup
9. **contact-form.tsx** - Minor contrast issue

---

## Audit Metadata

- Viewport: 1400x900
- Browser: Chromium (Playwright)
- Screenshots: PNG format
- Test modes: Light, Dark
- Test states: Base (hover/focus/active planned for future)
- Audit agents: 3 parallel agents
