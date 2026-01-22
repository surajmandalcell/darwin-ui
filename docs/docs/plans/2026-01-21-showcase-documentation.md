# Darwin UI Showcase & Complete Documentation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a polished component showcase landing page with scroll animations, complete all documentation pages with real content, and ensure full responsiveness across all viewports.

**Architecture:** Replace the current macOS desktop landing with a traditional marketing/showcase page at `/`. The desktop environment moves to `/desktop`. New showcase page has 3 scroll sections: hero, component grid, and dashboard demo. Documentation pages in DeveloperApp get complete content.

**Tech Stack:** React 19, Framer Motion, Tailwind CSS v4, Vite

---

## Phase 1: Foundation & Logo

### Task 1: Create iOS-Style Apple Logo SVG

**Files:**
- Modify: `src/components/icons/DarwinLogo.tsx`

**Step 1: Replace DarwinLogo with iOS app icon style**

```tsx
"use client";

import { cn } from '@/lib/utils';

interface DarwinLogoProps {
  className?: string;
  showBackground?: boolean;
}

export function DarwinLogo({ className, showBackground = false }: DarwinLogoProps) {
  const logo = (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Apple silhouette */}
      <path
        d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
      />
    </svg>
  );

  if (!showBackground) return logo;

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center",
      "rounded-[22%] overflow-hidden",
      className
    )}>
      {/* iOS-style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
      {/* Shine overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)'
        }}
      />
      <div className="relative text-white p-2">
        {logo}
      </div>
    </div>
  );
}

export default DarwinLogo;
```

**Step 2: Verify the component renders**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors

**Step 3: Commit**

```bash
git add src/components/icons/DarwinLogo.tsx
git commit -m "feat(logo): iOS-style Apple logo with optional squircle background"
```

---

### Task 2: Update App Router for New Showcase Page

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/ShowcasePage.tsx`

**Step 1: Create ShowcasePage placeholder**

```tsx
// src/pages/ShowcasePage.tsx
export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      <h1>Showcase - Coming Soon</h1>
    </div>
  );
}
```

**Step 2: Update App.tsx routes**

```tsx
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { DesktopProvider } from "./contexts/desktop-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@pikoloo/darwin-ui";
import { Desktop } from "./components/desktop/Desktop";
import DocsPage from "./pages/DocsPage";
import ChangelogPage from "./pages/ChangelogPage";
import ShowcasePage from "./pages/ShowcasePage";

function App() {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <AlertProvider>
          <ToastProvider>
            <Routes>
              {/* Showcase Landing Page */}
              <Route path="/" element={<ShowcasePage />} />

              {/* Standalone Documentation */}
              <Route path="/docs" element={<DocsPage />} />

              {/* Standalone Changelog */}
              <Route path="/changelog" element={<ChangelogPage />} />

              {/* Desktop Environment */}
              <Route
                path="/desktop"
                element={
                  <DesktopProvider>
                    <Desktop />
                  </DesktopProvider>
                }
              />
            </Routes>
          </ToastProvider>
        </AlertProvider>
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default App;
```

**Step 3: Build and verify routes work**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/App.tsx src/pages/ShowcasePage.tsx
git commit -m "feat(routes): add showcase landing page, move desktop to /desktop"
```

---

## Phase 2: Showcase Page Implementation

### Task 3: Build Hero Section

**Files:**
- Modify: `src/pages/ShowcasePage.tsx`

**Step 1: Implement hero section with logo and tagline**

```tsx
"use client";

import { motion } from 'framer-motion';
import { DarwinLogo } from '../components/icons/DarwinLogo';
import { Button } from '@pikoloo/darwin-ui';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
                radial-gradient(ellipse 60% 40% at 20% 80%, rgba(236, 72, 153, 0.08), transparent 50%)
              `
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <DarwinLogo showBackground className="w-20 h-20 mx-auto mb-8" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Darwin UI
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            A macOS-inspired React component library with glass-morphism aesthetics,
            smooth animations, and dark theme by default.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://github.com/pikoloo/darwin-ui" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>

          {/* Version badge */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-white/40">
              v1.3.0 — 36+ Components
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
```

**Step 2: Build and verify**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/pages/ShowcasePage.tsx
git commit -m "feat(showcase): hero section with animated logo and CTAs"
```

---

### Task 4: Build Component Grid Section

**Files:**
- Modify: `src/pages/ShowcasePage.tsx`
- Create: `src/components/showcase/ComponentGridSection.tsx`

**Step 1: Create ComponentGridSection**

```tsx
// src/components/showcase/ComponentGridSection.tsx
"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Button, Badge, Input, Switch, Checkbox,
  Progress, Slider, Avatar, AvatarFallback,
  Card, CardHeader, CardTitle, CardContent
} from '@pikoloo/darwin-ui';
import { Search, Bell, Settings, User, Mail, Lock, Check } from 'lucide-react';

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function ComponentCard({ title, children, delay = 0, className = '' }: ComponentCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
    >
      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite'
        }}
      />
      <p className="text-xs text-white/40 uppercase tracking-wider mb-4">{title}</p>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export function ComponentGridSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section ref={sectionRef} className="min-h-screen py-24 px-4 relative">
      {/* Section title */}
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Beautiful Components
        </h2>
        <p className="text-lg text-white/50">
          36+ production-ready components with smooth animations and accessibility built-in.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Buttons - spans 2 cols on larger screens */}
        <ComponentCard title="Buttons" delay={0.1} className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </ComponentCard>

        {/* Badges */}
        <ComponentCard title="Badges" delay={0.15}>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">New</Badge>
          </div>
        </ComponentCard>

        {/* Input */}
        <ComponentCard title="Input" delay={0.2}>
          <Input placeholder="Enter your email..." />
        </ComponentCard>

        {/* Switches */}
        <ComponentCard title="Toggles" delay={0.25}>
          <div className="space-y-3">
            <Switch label="Dark mode" defaultChecked />
            <Switch label="Notifications" />
          </div>
        </ComponentCard>

        {/* Checkboxes */}
        <ComponentCard title="Checkboxes" delay={0.3}>
          <div className="space-y-2">
            <Checkbox label="Remember me" defaultChecked />
            <Checkbox label="Send updates" />
          </div>
        </ComponentCard>

        {/* Progress */}
        <ComponentCard title="Progress" delay={0.35} className="sm:col-span-2">
          <div className="space-y-4">
            <Progress value={75} showLabel />
            <Progress value={45} />
          </div>
        </ComponentCard>

        {/* Slider */}
        <ComponentCard title="Slider" delay={0.4}>
          <Slider defaultValue={60} />
        </ComponentCard>

        {/* Avatar */}
        <ComponentCard title="Avatar" delay={0.45}>
          <div className="flex -space-x-2">
            <Avatar className="border-2 border-background">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>+3</AvatarFallback>
            </Avatar>
          </div>
        </ComponentCard>

        {/* Card Preview - spans 2 cols */}
        <ComponentCard title="Cards" delay={0.5} className="lg:col-span-2">
          <Card className="bg-white/[0.02]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/50">Your weekly report is ready.</p>
            </CardContent>
          </Card>
        </ComponentCard>
      </div>

      {/* See all components link */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <a
          href="/docs"
          className="inline-flex items-center text-white/60 hover:text-white transition-colors group"
        >
          View all 36+ components
          <motion.span
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
```

**Step 2: Add shimmer keyframe to index.css**

Add to `src/index.css` in the `@keyframes` section:

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Step 3: Import and use in ShowcasePage**

Add import and component to ShowcasePage after hero section.

**Step 4: Build and verify**

Run: `npm run build`

**Step 5: Commit**

```bash
git add src/components/showcase/ComponentGridSection.tsx src/pages/ShowcasePage.tsx src/index.css
git commit -m "feat(showcase): component grid section with bento layout and shimmer effects"
```

---

### Task 5: Build Dashboard Demo Section

**Files:**
- Create: `src/components/showcase/DashboardDemoSection.tsx`
- Modify: `src/pages/ShowcasePage.tsx`

**Step 1: Create DashboardDemoSection**

The DashboardShowcase component already exists at `src/components/DashboardShowcase.tsx`. Wrap it in a scroll-animated section.

```tsx
// src/components/showcase/DashboardDemoSection.tsx
"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DashboardShowcase } from '../DashboardShowcase';

export function DashboardDemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen py-24 px-4 relative">
      {/* Section heading */}
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Build Real Interfaces
        </h2>
        <p className="text-lg text-white/50">
          See how Darwin UI components work together in a production dashboard.
        </p>
      </motion.div>

      {/* Dashboard preview with scale and shadow */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
          <DashboardShowcase />
        </div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Add to ShowcasePage**

**Step 3: Build and verify**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/showcase/DashboardDemoSection.tsx src/pages/ShowcasePage.tsx
git commit -m "feat(showcase): dashboard demo section with existing DashboardShowcase"
```

---

### Task 6: Add Footer and Final Polish to ShowcasePage

**Files:**
- Modify: `src/pages/ShowcasePage.tsx`

**Step 1: Add footer section**

```tsx
// Add footer component at end of ShowcasePage
<footer className="py-12 px-4 border-t border-white/10">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <DarwinLogo className="w-5 h-5" />
      <span className="text-white/40 text-sm">Darwin UI</span>
    </div>
    <div className="flex gap-6 text-sm text-white/40">
      <a href="/docs" className="hover:text-white transition-colors">Docs</a>
      <a href="/changelog" className="hover:text-white transition-colors">Changelog</a>
      <a href="/desktop" className="hover:text-white transition-colors">Desktop</a>
      <a href="https://github.com/pikoloo/darwin-ui" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
    </div>
  </div>
</footer>
```

**Step 2: Build and verify**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/pages/ShowcasePage.tsx
git commit -m "feat(showcase): add footer navigation"
```

---

## Phase 3: Complete Documentation Content

### Task 7: Audit and Complete Introduction Section

**Files:**
- Modify: `src/components/desktop/apps/DeveloperApp.tsx`

**Step 1: Review current Introduction content**

Check lines ~280-400 for Introduction section rendering and ensure it has:
- Clear explanation of what Darwin UI is
- Feature highlights
- Design philosophy
- No placeholder text

**Step 2: Update Introduction content to be complete**

Ensure the Introduction section includes:
- Project overview paragraph
- Key features list (glass-morphism, Framer Motion, Tailwind, TypeScript, Accessibility)
- Quick install command
- "Why Darwin UI?" section

**Step 3: Build and verify**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/desktop/apps/DeveloperApp.tsx
git commit -m "docs: complete Introduction section content"
```

---

### Task 8: Complete Installation Section

**Files:**
- Modify: `src/components/desktop/apps/DeveloperApp.tsx`

**Step 1: Verify Installation section has**

- npm/yarn/pnpm install commands
- Import styles instruction
- Provider setup (OverlayProvider, AlertProvider, ToastProvider)
- First component example

**Step 2: Add any missing content**

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git commit -m "docs: complete Installation section"
```

---

### Task 9: Complete Theming Sections (Colors, Dark Mode, Customization)

**Files:**
- Modify: `src/components/desktop/apps/DeveloperApp.tsx`

**Step 1: Complete Colors section**

Include CSS variables reference, accent colors, usage examples.

**Step 2: Complete Dark Mode section**

Explain ThemeProvider, localStorage persistence, toggle implementation.

**Step 3: Complete Customization section**

Show CSS variable overrides, component className prop usage, Tailwind integration.

**Step 4: Build and verify**

**Step 5: Commit**

```bash
git commit -m "docs: complete Theming sections (Colors, Dark Mode, Customization)"
```

---

### Task 10: Verify All Component Documentation Pages

**Files:**
- Modify: `src/components/desktop/apps/DeveloperApp.tsx`

**Step 1: Audit each component section**

For each of the 33 components, verify:
- Has a working live preview
- Has code example
- Has props table or description
- No placeholder text

Components to check: Accordion, Avatar, Badge, Button, Card, Charts, Checkbox, CloseButton, ContactForm, ContextMenu, DateSelect, Dialog, DropdownMenu, Image, Input, MdEditor, Modal, MultiSelect, Popover, Progress, Reveal, SearchInput, Select, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Tooltip, Upload, Window

**Step 2: Fix any incomplete sections**

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git commit -m "docs: audit and complete all component documentation"
```

---

## Phase 4: Responsiveness & Micro-interactions

### Task 11: Add Global Micro-interactions

**Files:**
- Modify: `src/index.css`

**Step 1: Add focus and active states**

```css
/* Global micro-interactions */
button, a, [role="button"] {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

button:active:not(:disabled),
a:active,
[role="button"]:active {
  transform: scale(0.98);
}

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}

/* Smooth transitions on interactive elements */
input, select, textarea {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
```

**Step 2: Build and verify**

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: global micro-interactions for buttons, links, and inputs"
```

---

### Task 12: Responsive Audit - Mobile (320px)

**Files:**
- Modify: Various components as needed

**Step 1: Test at 320px viewport**

Check:
- ShowcasePage hero text doesn't overflow
- Component grid stacks to single column
- Dashboard demo is scrollable
- Navigation is accessible
- No horizontal scrollbar

**Step 2: Fix any issues found**

Common fixes:
- Add `text-sm` or `text-xs` on mobile
- Use `px-4` instead of larger padding
- Ensure `max-w-full` and `overflow-hidden` where needed

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git commit -m "fix: responsive layout at 320px viewport"
```

---

### Task 13: Responsive Audit - Large Screens (2560px+)

**Files:**
- Modify: Various components as needed

**Step 1: Test at 2560px viewport**

Check:
- Content doesn't stretch too wide (use max-w-7xl containers)
- Grid layouts use appropriate column counts
- Text remains readable
- Images don't pixelate

**Step 2: Fix any issues**

**Step 3: Build and verify**

**Step 4: Commit**

```bash
git commit -m "fix: responsive layout at large viewports (2560px+)"
```

---

## Phase 5: Final Verification

### Task 14: Run Full Build and Type Check

**Step 1: Run build**

```bash
npm run build
```

Expected: No errors

**Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors (or only acceptable warnings)

**Step 3: Commit any final fixes**

---

### Task 15: Visual QA Checklist

**Step 1: Manual verification**

Open dev server and check:

- [ ] Logo renders with iOS-style appearance
- [ ] Hero section animates on load
- [ ] Component grid has shimmer on hover
- [ ] Dashboard section slides up on scroll
- [ ] All documentation pages have real content
- [ ] Buttons/inputs have hover/focus states
- [ ] No console errors
- [ ] Works at 320px, 768px, 1024px, 1440px, 2560px

**Step 2: Fix any issues found**

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final QA fixes and polish"
```

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | 1-2 | Foundation: Logo, Routes |
| 2 | 3-6 | Showcase Page: Hero, Grid, Dashboard, Footer |
| 3 | 7-10 | Documentation: All pages complete |
| 4 | 11-13 | Polish: Micro-interactions, Responsiveness |
| 5 | 14-15 | Verification: Build, TypeScript, Visual QA |

Total: 15 tasks
