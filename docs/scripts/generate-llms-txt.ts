/**
 * llms.txt Generator for Darwin UI Documentation
 *
 * Generates an LLM-friendly documentation file following the llmstxt.org specification.
 * Run with: npx tsx scripts/generate-llms-txt.ts
 *
 * @see https://llmstxt.org/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Configuration
const BASE_URL = 'https://darwin-ui.pikoloo.com'; // Update with your actual URL
const REPO_URL = 'https://github.com/pikoloo/darwin-ui';
const NPM_URL = 'https://www.npmjs.com/package/@pikoloo/darwin-ui';

// Documentation structure
const GETTING_STARTED = [
  { id: 'introduction', title: 'Introduction', description: 'Overview of Darwin UI and its macOS-inspired design philosophy' },
  { id: 'installation', title: 'Installation', description: 'How to install and set up Darwin UI in your project' },
  { id: 'quick-start', title: 'Quick Start', description: 'Get up and running with your first Darwin UI components' },
];

const COMPONENTS = [
  { id: 'accordion', title: 'Accordion', description: 'Collapsible content sections' },
  { id: 'avatar', title: 'Avatar', description: 'User avatar with fallback and group support' },
  { id: 'badge', title: 'Badge', description: 'Status badges with semantic colors' },
  { id: 'button', title: 'Button', description: 'Versatile button with 10 variants and 3 sizes' },
  { id: 'card', title: 'Card', description: 'Container component with header, content, and footer sections' },
  { id: 'charts', title: 'Charts', description: 'Line, Bar, Area, Pie, Donut, and Stacked Bar charts' },
  { id: 'checkbox', title: 'Checkbox', description: 'Checkbox with indeterminate state and spring animations' },
  { id: 'close-button', title: 'CloseButton', description: 'Red close button matching macOS style' },
  { id: 'contact-form', title: 'ContactForm', description: 'Pre-built contact form component' },
  { id: 'context-menu', title: 'ContextMenu', description: 'Right-click context menu' },
  { id: 'date-select', title: 'DateSelect', description: 'Date picker with calendar interface' },
  { id: 'dialog', title: 'Dialog', description: 'Modal dialog with focus trap and portal rendering' },
  { id: 'dropdown-menu', title: 'DropdownMenu', description: 'Full-featured dropdown menu with keyboard navigation' },
  { id: 'image', title: 'Image', description: 'Image component with click-to-enlarge' },
  { id: 'input', title: 'Input', description: 'Text input with validation states' },
  { id: 'md-editor', title: 'MdEditor', description: 'Markdown editor with preview' },
  { id: 'modal', title: 'Modal', description: 'Modal dialog with backdrop' },
  { id: 'multi-select', title: 'MultiSelect', description: 'Multi-selection dropdown with tags' },
  { id: 'popover', title: 'Popover', description: 'Flexible popover component with portal support' },
  { id: 'progress', title: 'Progress', description: 'Linear and circular progress indicators' },
  { id: 'reveal', title: 'Reveal', description: 'Scroll-triggered reveal animations' },
  { id: 'search-input', title: 'SearchInput', description: 'Search input with icon' },
  { id: 'select', title: 'Select', description: 'Dropdown select with custom styling' },
  { id: 'sidebar', title: 'Sidebar', description: 'Navigation sidebar with active state' },
  { id: 'skeleton', title: 'Skeleton', description: 'Loading placeholder with shimmer effect' },
  { id: 'slider', title: 'Slider', description: 'Range slider with customizable track and thumb' },
  { id: 'switch', title: 'Switch', description: 'Toggle switch component with spring physics' },
  { id: 'table', title: 'Table', description: 'Data table with sorting and loading states' },
  { id: 'tabs', title: 'Tabs', description: 'Tabbed navigation component' },
  { id: 'textarea', title: 'Textarea', description: 'Multi-line text input with auto-resize' },
  { id: 'tooltip', title: 'Tooltip', description: 'Accessible tooltip with multiple positions' },
  { id: 'upload', title: 'Upload', description: 'File upload with drag-and-drop support' },
  { id: 'window', title: 'Window', description: 'macOS-style window chrome with traffic lights' },
];

const THEMING = [
  { id: 'colors', title: 'Colors', description: 'Color system and CSS variables' },
  { id: 'dark-mode', title: 'Dark Mode', description: 'Dark theme configuration and customization' },
  { id: 'customization', title: 'Customization', description: 'How to customize components with CSS variables and Tailwind' },
];

const HOOKS = [
  { name: 'useMediaQuery', description: 'Responsive design hook for media queries' },
  { name: 'useIsMobile', description: 'Hook to detect mobile viewport (< 768px)' },
  { name: 'useEscapeKey', description: 'Hook for modal dismissal on Escape key' },
  { name: 'useContactForm', description: 'Form handling hook with validation' },
];

function generateLlmsTxt(): string {
  const lines: string[] = [];

  // H1: Project name (required)
  lines.push('# Darwin UI');
  lines.push('');

  // Blockquote: Short summary
  lines.push('> Darwin UI is a macOS-inspired React component library featuring glass-morphism aesthetics, dark theme, and Tailwind CSS integration. It provides 30+ production-ready components with Framer Motion animations and full accessibility support.');
  lines.push('');

  // Detailed information
  lines.push('## Overview');
  lines.push('');
  lines.push('Darwin UI brings the refined aesthetics of macOS to React applications. Key features include:');
  lines.push('');
  lines.push('- **macOS-inspired design**: Glass-morphism effects, traffic light buttons, window chrome');
  lines.push('- **Dark theme by default**: Optimized for dark mode with carefully chosen color palettes');
  lines.push('- **Framer Motion animations**: Smooth spring physics and micro-interactions');
  lines.push('- **Tailwind CSS**: Full integration with Tailwind for easy customization');
  lines.push('- **Accessible**: WAI-ARIA compliant with keyboard navigation support');
  lines.push('- **TypeScript**: Full type definitions included');
  lines.push('');

  lines.push('### Installation');
  lines.push('');
  lines.push('```bash');
  lines.push('npm install @pikoloo/darwin-ui');
  lines.push('```');
  lines.push('');
  lines.push('Import the styles in your app entry point:');
  lines.push('');
  lines.push("```javascript");
  lines.push("import '@pikoloo/darwin-ui/styles.css';");
  lines.push('```');
  lines.push('');

  // Getting Started section
  lines.push('## Getting Started');
  lines.push('');
  for (const item of GETTING_STARTED) {
    lines.push(`- [${item.title}](${BASE_URL}/docs#${item.id}): ${item.description}`);
  }
  lines.push('');

  // Components section
  lines.push('## Components');
  lines.push('');
  for (const component of COMPONENTS) {
    lines.push(`- [${component.title}](${BASE_URL}/docs#${component.id}): ${component.description}`);
  }
  lines.push('');

  // Theming section
  lines.push('## Theming');
  lines.push('');
  for (const item of THEMING) {
    lines.push(`- [${item.title}](${BASE_URL}/docs#${item.id}): ${item.description}`);
  }
  lines.push('');

  // Hooks section
  lines.push('## Hooks');
  lines.push('');
  for (const hook of HOOKS) {
    lines.push(`- **${hook.name}**: ${hook.description}`);
  }
  lines.push('');

  // Optional section (for secondary resources)
  lines.push('## Optional');
  lines.push('');
  lines.push(`- [GitHub Repository](${REPO_URL}): Source code and issue tracking`);
  lines.push(`- [NPM Package](${NPM_URL}): Package details and version history`);
  lines.push(`- [Changelog](${BASE_URL}/changelog): Release notes and version history`);
  lines.push('');

  return lines.join('\n');
}

// Generate and write the file
const output = generateLlmsTxt();
const outputPath = path.join(rootDir, 'public', 'llms.txt');

// Ensure public directory exists
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(outputPath, output);
console.log(`Generated llms.txt at ${outputPath}`);
console.log(`File size: ${output.length} characters`);
