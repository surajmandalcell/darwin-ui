# Darwin UI

A beautiful macOS-inspired React component library with glass-morphism aesthetic and full light/dark theme support.

[![npm version](https://img.shields.io/npm/v/@pikoloo/darwin-ui.svg)](https://www.npmjs.com/package/@pikoloo/darwin-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Documentation](https://darwin-ui.mandalsuraj.com) | [GitHub](https://github.com/surajmandalcell/darwin-ui)

## Features

- 35+ beautifully crafted React components
- Light & Dark mode with theme-aware styling
- Glass-morphism aesthetic throughout
- Built for React 19 with TypeScript
- Tailwind CSS v4 + Framer Motion powered
- shadcn-compatible registry
- Accessible and keyboard-friendly
- Lightweight and tree-shakeable
- AI-friendly with llms.txt documentation

## Installation

### Using npm/yarn/pnpm

```bash
npm install @pikoloo/darwin-ui
# or
yarn add @pikoloo/darwin-ui
# or
pnpm add @pikoloo/darwin-ui
```

### Using shadcn CLI

```bash
# Add individual components
npx shadcn add https://darwin-ui.mandalsuraj.com/registry/button.json
npx shadcn add https://darwin-ui.mandalsuraj.com/registry/card.json
```

## Quick Start

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@pikoloo/darwin-ui";
import "@pikoloo/darwin-ui/styles";

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Darwin UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Layout

- **Card** - Composable card with header, content, footer
- **Window** - macOS-style window container
- **Sidebar** - Responsive navigation sidebar
- **Tabs** - Tabbed content navigation
- **Accordion** - Collapsible content sections

### Forms

- **Button** - 11 variants (primary, secondary, destructive, ghost, etc.)
- **Input** - Glass-effect styled input
- **Textarea** - Multi-line text input
- **Select** - Custom dropdown with portal rendering
- **MultiSelect** - Multi-selection dropdown
- **Checkbox** - Custom checkbox with label
- **Switch** - Toggle switch component
- **Slider** - Range slider input
- **SearchInput** - Search input field
- **DateSelect** - Date picker component
- **Upload** - File upload component

### Data Display

- **Table** - Full table system with loading/empty states
- **Badge** - Status badges with 13 variants
- **Avatar** - User avatar with fallback
- **Progress** - Linear and circular progress indicators
- **Skeleton** - Loading placeholder
- **Image** - Optimized image component

### Overlays

- **Modal** - Accessible modal dialog
- **Dialog** - Composable dialog component
- **Popover** - Floating popover content
- **Tooltip** - Hover tooltips
- **DropdownMenu** - Dropdown menu with items
- **ContextMenu** - Right-click context menu

### Feedback

- **Toast** - Toast notifications with auto-dismiss
- **Alert** - Alert dialogs with type indicators

### Charts

- **AreaChart** - Area chart visualization
- **BarChart** - Bar chart visualization
- **LineChart** - Line chart visualization
- **PieChart** - Pie chart visualization
- **DonutChart** - Donut chart visualization
- **StackedBarChart** - Stacked bar chart

### Utility

- **CloseButton** - Consistent close button
- **MdEditor** - Markdown editor
- **Reveal** - Animation reveal component
- **CompactContactForm** - Pre-built contact form

## Hooks

```tsx
import { useIsMobile, useMediaQuery, useEscapeKey } from "@pikoloo/darwin-ui";

// Detect mobile devices
const isMobile = useIsMobile();

// Custom media query
const isDesktop = useMediaQuery("(min-width: 1024px)");

// ESC key handler
useEscapeKey(() => closeModal());
```

## CSS Setup

Darwin UI requires importing its stylesheet for components to render correctly.

### Quick Setup

```css
/* In your globals.css or index.css */
@import '@pikoloo/darwin-ui/styles.css';

/* Tell Tailwind v4 to scan darwin-ui for class names */
@source "../node_modules/@pikoloo/darwin-ui/dist";
```

### Dark Mode

Darwin UI defaults to dark mode. For theme switching, set both a data attribute and class:

```js
// Set both for full compatibility
document.documentElement.setAttribute('data-theme', theme); // 'light' or 'dark'
document.documentElement.classList.toggle('dark', theme === 'dark');
```

See the [CSS Setup documentation](https://darwin-ui.mandalsuraj.com) for a complete ThemeProvider example.

### What's Included

The stylesheet provides:
- Tailwind v4 import with class-based dark mode
- Complete CSS variables for light and dark themes
- `@theme inline` block for Tailwind v4 color utilities
- Core animations (modal, toast, progress)
- Border color fix for Tailwind v4

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with care by [Suraj Mandal](https://github.com/surajmandalcell)
