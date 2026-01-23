# Darwin UI Changelog

> **For LLMs**: This changelog is structured to help you update code that uses Darwin UI. Each version section contains breaking changes, migration guides, and new features. Search for `BREAKING` to find changes that require code updates.

---

## [Unreleased] - Post v1.5.0

### BREAKING CHANGES

#### Tooltip/Popover → Floating Component

The standalone `Tooltip` and `Popover` components have been replaced with a unified `Floating` component.

**Before (v1.5.0 and earlier):**
```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from '@pikoloo/darwin-ui';
import { Popover, PopoverTrigger, PopoverContent } from '@pikoloo/darwin-ui';

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>
```

**After (v1.6.0+):**
```tsx
// Option 1: Use the pre-configured Tooltip (backward compatible API)
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@pikoloo/darwin-ui';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>

// Option 2: Use the new Floating component directly
import { Floating } from '@pikoloo/darwin-ui';

<Floating mode="tooltip" content="Tooltip text">
  <button>Hover me</button>
</Floating>

// Option 3: Popover mode
<Floating mode="popover" content={<div>Popover content</div>}>
  <button>Click me</button>
</Floating>
```

#### Textarea Removed from Standalone Export

The standalone `Textarea` component file has been removed. Use the `Textarea` export from `input.tsx`.

**Before:**
```tsx
import { Textarea } from '@pikoloo/darwin-ui/textarea';
```

**After:**
```tsx
import { Textarea } from '@pikoloo/darwin-ui';
```

#### MultiSelect Merged into Select

The standalone `MultiSelect` component has been merged into `select.tsx`.

**Before:**
```tsx
import { MultiSelect } from '@pikoloo/darwin-ui/multi-select';
```

**After:**
```tsx
import { MultiSelect } from '@pikoloo/darwin-ui';
```

### New Features

#### Button Component Enhancements

New props added to Button:

```tsx
import { Button } from '@pikoloo/darwin-ui';

// New props available:
<Button
  leftIcon={<Icon />}      // Icon on the left
  rightIcon={<Icon />}     // Icon on the right
  loadingText="Saving..."  // Text shown during loading state
  fullWidth               // Makes button 100% width
  iconOnly                // Square aspect ratio for icon buttons
>
  Click me
</Button>

// Type exports renamed (old names still work):
// Variant → ButtonVariant
// Size → ButtonSize
```

#### HSL Color Variables

All components now use HSL color variables for better theming:

```css
/* Available CSS variables */
--glass-bg
--glass-bg-hover
--glass-bg-active
--text-primary
--text-secondary
--border-default
--border-strong
```

**Migration**: If you were overriding component colors with hardcoded values, update to use the HSL variables:

```tsx
// Before
className="bg-neutral-900 text-white"

// After
className="bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-primary))]"
```

### Improved Components

- **Avatar**: Uses theme-aware ring colors
- **CloseButton**: Updated to HSL variables
- **ContactForm**: Theme-compatible styling
- **Upload**: Consistent color system
- **Sidebar**: Now uses Floating-based tooltips

---

## [1.5.0] - 2026-01-22

### Highlights

- **Light Mode Support**: Full light mode compatibility across all components
- **Theme Toggle**: Built-in theme switching in navbar
- **Animation System**: Centralized animation configuration

### BREAKING CHANGES

None - this is a feature release with backward compatibility.

### New Features

#### Light Mode Support

All components now work in both light and dark modes. Theme is controlled via CSS variables.

```tsx
// Theme toggle is built into the navbar
// Or manually toggle by adding/removing 'dark' class on html element
document.documentElement.classList.toggle('dark');
```

#### Animation Speed Control

New animation context for controlling animation speeds globally:

```tsx
import { AnimationProvider } from '@pikoloo/darwin-ui';

<AnimationProvider speed={1.5}> {/* 1.5x faster */}
  <App />
</AnimationProvider>
```

### Component Updates

All components updated to use theme-aware colors:
- Avatar, Button, Card, Checkbox, ContextMenu
- DateSelect, Dialog, DropdownMenu, Input
- Modal, Progress, Select, Sidebar, Slider
- Switch, Table, Tabs, Toast, Upload

---

## [1.3.0] - 2026-01-15

### BREAKING CHANGES

#### Package Renamed

**Before:**
```bash
npm install @smc/darwin-ui
```

**After:**
```bash
npm install @pikoloo/darwin-ui
```

**Migration**: Update all imports:
```tsx
// Before
import { Button } from '@smc/darwin-ui';

// After
import { Button } from '@pikoloo/darwin-ui';
```

### New Features

#### Sidebar Collapsible Mode

```tsx
import { Sidebar } from '@pikoloo/darwin-ui';

<Sidebar
  collapsible        // Enable collapse/expand
  defaultCollapsed   // Start collapsed
  onCollapse={(collapsed) => console.log(collapsed)}
>
  {/* items */}
</Sidebar>
```

#### Documentation Site

- New showcase landing page at `/`
- Desktop demo moved to `/desktop`
- LLM context generation for docs

---

## [1.2.0] - 2026-01-10

### New Features

- Expanded component set to 30+ components
- Added Dialog, DropdownMenu, Tabs, Accordion
- Added Avatar and AvatarGroup
- Added Progress and CircularProgress
- Added Slider component

---

## [1.1.0] - 2025-12-30

### Added
- Initial public release
- 25 React components with dark theme styling
- 6 chart components (AreaChart, BarChart, LineChart, PieChart, DonutChart, StackedBarChart)
- 4 custom hooks (useMediaQuery, useIsMobile, useEscapeKey, useContactForm)
- shadcn-compatible registry for component installation
- Astro Starlight documentation site
- Full TypeScript support
- Tailwind CSS v4 integration

### Components
- **Layout**: Card, Window, Sidebar
- **Forms**: Button, Input, Select, MultiSelect, Checkbox, Switch, SearchInput, DateSelect, Upload
- **Data Display**: Table, Badge, Skeleton
- **Feedback**: Modal, Toast, Alert
- **Charts**: AreaChart, BarChart, LineChart, PieChart, DonutChart, StackedBarChart
- **Utility**: ContextMenu, CloseButton, Image, MdEditor, Reveal

---

## [1.0.0] - 2025-12-30

### Added
- Initial internal release
- Core component library
- Basic documentation

---

## Component API Reference

### Quick Import Guide

```tsx
// All components from single entry point
import {
  // Layout
  Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription, CardAction,
  Modal,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose,
  Window,
  Sidebar,

  // Forms
  Input, Textarea, SearchInput,
  Select, MultiSelect,
  Checkbox,
  Switch,
  DateSelect,
  Upload,
  MdEditor,
  CompactContactForm,

  // Feedback
  Alert, AlertProvider, useAlert,
  ToastProvider, useToast,
  Progress, CircularProgress,
  Skeleton,

  // Data Display
  Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell, TableEmptyRow, TableLoadingRows,
  Badge,
  Avatar, AvatarGroup,
  Image,

  // Navigation
  Tabs, TabsList, TabsTrigger, TabsContent,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  ContextMenu,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,

  // Charts
  LineChart, BarChart, AreaChart, PieChart, DonutChart, StackedBarChart,

  // Overlay
  Floating,
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
  Popover, PopoverTrigger, PopoverContent, PopoverClose,
  Reveal,

  // Utility
  Button,
  CloseButton,

  // Contexts & Hooks
  OverlayProvider, useOverlay,
  useEscapeKey,
  useContactForm,

  // Utils
  manrope, // Font
  cropAndResizeImage, fileToBase64, validateImageFile, // Image utils
} from '@pikoloo/darwin-ui';

// Styles (required)
import '@pikoloo/darwin-ui/styles';
```

### CSS Setup

```css
/* Required: Import darwin-ui styles */
@import '@pikoloo/darwin-ui/styles';

/* Optional: Override theme variables */
:root {
  --glass-bg: 0 0% 10%;
  --glass-bg-hover: 0 0% 15%;
  --glass-bg-active: 0 0% 20%;
  --text-primary: 0 0% 100%;
  --text-secondary: 0 0% 70%;
  --border-default: 0 0% 20%;
  --border-strong: 0 0% 30%;
}
```

---

## Migration Checklist

### Upgrading to Latest (from any version)

- [ ] Update package: `npm install @pikoloo/darwin-ui@latest`
- [ ] Update imports from `@smc/darwin-ui` to `@pikoloo/darwin-ui`
- [ ] Replace standalone `Tooltip` with `Floating` or wrapped `Tooltip`
- [ ] Replace standalone `Popover` with `Floating` or wrapped `Popover`
- [ ] Replace `@pikoloo/darwin-ui/textarea` with main export
- [ ] Replace `@pikoloo/darwin-ui/multi-select` with main export
- [ ] Update hardcoded colors to HSL variables for theme compatibility
- [ ] Wrap app in `TooltipProvider` if using Tooltip components
- [ ] Import styles: `import '@pikoloo/darwin-ui/styles'`
