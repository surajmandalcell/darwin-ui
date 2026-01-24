/**
 * llms.txt Generator for Darwin UI Documentation
 *
 * Generates LLM-friendly documentation files following the llmstxt.org specification.
 * Produces both llms.txt (concise) and llms-full.txt (comprehensive with code examples).
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
const BASE_URL = 'https://darwin-ui.mandalsuraj.com';
const REPO_URL = 'https://github.com/surajmandalcell/darwin-ui';
const NPM_URL = 'https://www.npmjs.com/package/@pikoloo/darwin-ui';
const CONTEXT7_URL = 'https://context7.com/surajmandalcell/darwin-ui';

// Component categories with detailed information
interface Component {
  id: string;
  title: string;
  description: string;
  props?: string[];
  example?: string;
}

const LAYOUT_COMPONENTS: Component[] = [
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Collapsible content sections with smooth Framer Motion animations',
    props: ['items: { title, content }[]', 'defaultOpen?: number', 'allowMultiple?: boolean'],
    example: `<Accordion items={[
  { title: 'Section 1', content: 'Content here' },
  { title: 'Section 2', content: 'More content' }
]} />`
  },
  {
    id: 'card',
    title: 'Card',
    description: 'Glass-morphism container with header, content, and footer sections',
    props: ['children', 'className?: string', 'variant?: "default" | "glass"'],
    example: `<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Body content</Card.Content>
  <Card.Footer>Footer actions</Card.Footer>
</Card>`
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    description: 'Navigation sidebar with collapsible mode, tooltips, and active state indicators',
    props: ['items: SidebarItem[]', 'collapsed?: boolean', 'onCollapse?: () => void'],
    example: `<Sidebar
  items={[
    { icon: HomeIcon, label: 'Home', href: '/' },
    { icon: SettingsIcon, label: 'Settings', href: '/settings' }
  ]}
/>`
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Tabbed navigation with animated indicator and keyboard support',
    props: ['tabs: { label, content }[]', 'defaultIndex?: number', 'onChange?: (index) => void'],
    example: `<Tabs tabs={[
  { label: 'Tab 1', content: <div>Content 1</div> },
  { label: 'Tab 2', content: <div>Content 2</div> }
]} />`
  },
  {
    id: 'window',
    title: 'Window',
    description: 'macOS-style window chrome with traffic light buttons (close, minimize, maximize)',
    props: ['title?: string', 'children', 'onClose?: () => void', 'onMinimize?: () => void'],
    example: `<Window title="My Application">
  <p>Window content goes here</p>
</Window>`
  },
];

const FORM_COMPONENTS: Component[] = [
  {
    id: 'button',
    title: 'Button',
    description: 'Versatile button with 10 variants (primary, secondary, ghost, etc.) and 3 sizes',
    props: ['variant?: ButtonVariant', 'size?: "sm" | "md" | "lg"', 'disabled?: boolean', 'loading?: boolean'],
    example: `<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>`
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Checkbox with indeterminate state support and spring animations',
    props: ['checked?: boolean', 'indeterminate?: boolean', 'onChange?: (checked) => void', 'label?: string'],
    example: `<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Accept terms"
/>`
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Text input with validation states (error, success), icons, and clear button',
    props: ['value?: string', 'onChange?: (e) => void', 'error?: string', 'success?: boolean', 'icon?: ReactNode'],
    example: `<Input
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>`
  },
  {
    id: 'search-input',
    title: 'SearchInput',
    description: 'Search input with magnifying glass icon and clear functionality',
    props: ['value?: string', 'onChange?: (value) => void', 'onSearch?: (value) => void', 'placeholder?: string'],
    example: `<SearchInput
  placeholder="Search..."
  onSearch={(query) => console.log(query)}
/>`
  },
  {
    id: 'select',
    title: 'Select',
    description: 'Dropdown select with custom styling and keyboard navigation',
    props: ['options: { value, label }[]', 'value?: string', 'onChange?: (value) => void', 'placeholder?: string'],
    example: `<Select
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ]}
  value={selected}
  onChange={setSelected}
/>`
  },
  {
    id: 'multi-select',
    title: 'MultiSelect',
    description: 'Multi-selection dropdown with tag display and search filtering',
    props: ['options: Option[]', 'value?: string[]', 'onChange?: (values) => void', 'searchable?: boolean'],
    example: `<MultiSelect
  options={options}
  value={selectedItems}
  onChange={setSelectedItems}
  placeholder="Select items..."
/>`
  },
  {
    id: 'slider',
    title: 'Slider',
    description: 'Range slider with customizable track, thumb, and step values',
    props: ['value?: number', 'onChange?: (value) => void', 'min?: number', 'max?: number', 'step?: number'],
    example: `<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
/>`
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Toggle switch with spring physics animation',
    props: ['checked?: boolean', 'onChange?: (checked) => void', 'disabled?: boolean', 'label?: string'],
    example: `<Switch
  checked={isDarkMode}
  onChange={setIsDarkMode}
  label="Dark Mode"
/>`
  },
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Multi-line text input with auto-resize and character count',
    props: ['value?: string', 'onChange?: (e) => void', 'autoResize?: boolean', 'maxLength?: number'],
    example: `<Textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  autoResize
  placeholder="Enter description..."
/>`
  },
  {
    id: 'date-select',
    title: 'DateSelect',
    description: 'Date picker with calendar interface and range selection support',
    props: ['value?: Date', 'onChange?: (date) => void', 'minDate?: Date', 'maxDate?: Date'],
    example: `<DateSelect
  value={selectedDate}
  onChange={setSelectedDate}
/>`
  },
  {
    id: 'upload',
    title: 'Upload',
    description: 'File upload with drag-and-drop support and file type validation',
    props: ['accept?: string', 'multiple?: boolean', 'onUpload?: (files) => void', 'maxSize?: number'],
    example: `<Upload
  accept="image/*"
  onUpload={(files) => handleUpload(files)}
  multiple
/>`
  },
  {
    id: 'contact-form',
    title: 'ContactForm',
    description: 'Pre-built contact form with name, email, message fields and validation',
    props: ['onSubmit?: (data) => void', 'loading?: boolean'],
    example: `<ContactForm onSubmit={async (data) => {
  await sendMessage(data);
}} />`
  },
];

const FEEDBACK_COMPONENTS: Component[] = [
  {
    id: 'alert',
    title: 'Alert',
    description: 'Inline alerts and modal-style alert dialogs with semantic variants',
    props: ['variant?: "info" | "success" | "warning" | "error"', 'title?: string', 'children'],
    example: `<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>`
  },
  {
    id: 'badge',
    title: 'Badge',
    description: 'Status badges with semantic colors and optional dot indicator',
    props: ['variant?: BadgeVariant', 'size?: "sm" | "md"', 'dot?: boolean'],
    example: `<Badge variant="success">Active</Badge>
<Badge variant="warning" dot>Pending</Badge>`
  },
  {
    id: 'dialog',
    title: 'Dialog',
    description: 'Modal dialog with focus trap, portal rendering, and backdrop click dismiss',
    props: ['open?: boolean', 'onClose?: () => void', 'title?: string', 'children'],
    example: `<Dialog open={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
  <Button onClick={handleConfirm}>Yes</Button>
</Dialog>`
  },
  {
    id: 'dropdown-menu',
    title: 'DropdownMenu',
    description: 'Full-featured dropdown menu with keyboard navigation, submenus, and separators',
    props: ['trigger: ReactNode', 'items: MenuItem[]', 'align?: "start" | "end"'],
    example: `<DropdownMenu
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete, variant: 'danger' }
  ]}
/>`
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Modal dialog with glass-morphism backdrop and smooth animations',
    props: ['isOpen?: boolean', 'onClose?: () => void', 'size?: "sm" | "md" | "lg"'],
    example: `<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <Modal.Header>Modal Title</Modal.Header>
  <Modal.Body>Content here</Modal.Body>
</Modal>`
  },
  {
    id: 'popover',
    title: 'Popover',
    description: 'Flexible popover with portal support and multiple placement options',
    props: ['content: ReactNode', 'trigger: ReactNode', 'placement?: Placement'],
    example: `<Popover
  trigger={<Button>Show Info</Button>}
  content={<div>Popover content</div>}
  placement="bottom"
/>`
  },
  {
    id: 'toast',
    title: 'Toast',
    description: 'Toast notification system with auto-dismiss and action buttons',
    props: ['message: string', 'variant?: ToastVariant', 'duration?: number', 'action?: { label, onClick }'],
    example: `// Using the toast function
toast.success('File uploaded successfully');
toast.error('Failed to save changes');
toast.info('Processing...', { duration: 5000 });`
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Accessible tooltip with multiple positions and delay options',
    props: ['content: string | ReactNode', 'children', 'side?: "top" | "bottom" | "left" | "right"'],
    example: `<Tooltip content="Delete this item" side="top">
  <Button variant="ghost" icon={<TrashIcon />} />
</Tooltip>`
  },
  {
    id: 'context-menu',
    title: 'ContextMenu',
    description: 'Right-click context menu with keyboard support',
    props: ['items: MenuItem[]', 'children'],
    example: `<ContextMenu items={[
  { label: 'Copy', shortcut: '⌘C', onClick: handleCopy },
  { label: 'Paste', shortcut: '⌘V', onClick: handlePaste }
]}>
  <div>Right-click me</div>
</ContextMenu>`
  },
];

const DATA_DISPLAY_COMPONENTS: Component[] = [
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'User avatar with image fallback to initials and group stacking',
    props: ['src?: string', 'alt?: string', 'fallback?: string', 'size?: "sm" | "md" | "lg"'],
    example: `<Avatar src="/user.jpg" fallback="JD" size="md" />
<Avatar.Group>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
</Avatar.Group>`
  },
  {
    id: 'charts',
    title: 'Charts',
    description: 'SVG-based charts: Line, Bar, Area, Pie, Donut, and Stacked Bar with animations',
    props: ['data: ChartData[]', 'width?: number', 'height?: number', 'colors?: string[]'],
    example: `<LineChart
  data={[
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 120 }
  ]}
/>
<PieChart data={pieData} donut />`
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Image component with lazy loading and click-to-enlarge lightbox',
    props: ['src: string', 'alt: string', 'enlargeable?: boolean', 'aspectRatio?: string'],
    example: `<Image
  src="/photo.jpg"
  alt="Description"
  enlargeable
  aspectRatio="16/9"
/>`
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Linear and circular progress indicators with animated fill',
    props: ['value: number', 'max?: number', 'variant?: "linear" | "circular"', 'showLabel?: boolean'],
    example: `<Progress value={75} max={100} showLabel />
<Progress value={50} variant="circular" />`
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'Loading placeholder with shimmer animation effect',
    props: ['width?: string | number', 'height?: string | number', 'variant?: "text" | "circular" | "rectangular"'],
    example: `<Skeleton width={200} height={20} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" height={100} />`
  },
  {
    id: 'table',
    title: 'Table',
    description: 'Data table with sorting, selection, and loading states',
    props: ['columns: Column[]', 'data: T[]', 'sortable?: boolean', 'selectable?: boolean', 'loading?: boolean'],
    example: `<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' }
  ]}
  data={users}
  sortable
/>`
  },
];

const UTILITY_COMPONENTS: Component[] = [
  {
    id: 'close-button',
    title: 'CloseButton',
    description: 'Red close button matching macOS traffic light style',
    props: ['onClick?: () => void', 'size?: "sm" | "md"'],
    example: `<CloseButton onClick={() => handleClose()} />`
  },
  {
    id: 'md-editor',
    title: 'MdEditor',
    description: 'Markdown editor with live preview and toolbar',
    props: ['value?: string', 'onChange?: (value) => void', 'preview?: boolean'],
    example: `<MdEditor
  value={markdown}
  onChange={setMarkdown}
  preview
/>`
  },
  {
    id: 'reveal',
    title: 'Reveal',
    description: 'Scroll-triggered reveal animations with multiple effects',
    props: ['children', 'animation?: "fade" | "slide" | "scale"', 'delay?: number', 'once?: boolean'],
    example: `<Reveal animation="slide" delay={0.2}>
  <Card>Content that animates in on scroll</Card>
</Reveal>`
  },
];

const THEMING = [
  { id: 'colors', title: 'Colors', description: 'HSL-based color system with CSS custom properties for easy theming' },
  { id: 'dark-mode', title: 'Dark Mode', description: 'Dark theme optimized by default with light mode support via class toggle' },
  { id: 'customization', title: 'Customization', description: 'Customize via CSS variables or Tailwind config extension' },
];

const HOOKS = [
  { name: 'useMediaQuery', signature: 'useMediaQuery(query: string): boolean', description: 'Responsive design hook that returns true when media query matches' },
  { name: 'useIsMobile', signature: 'useIsMobile(): boolean', description: 'Returns true when viewport is below 768px (mobile breakpoint)' },
  { name: 'useEscapeKey', signature: 'useEscapeKey(callback: () => void): void', description: 'Calls callback when Escape key is pressed, useful for modal dismissal' },
  { name: 'useContactForm', signature: 'useContactForm(config): FormState', description: 'Form handling hook with built-in validation for contact forms' },
];

const UTILITIES = [
  { name: 'cn', signature: 'cn(...classes): string', description: 'Tailwind class merging utility using clsx and tailwind-merge' },
  { name: 'prefersReducedMotion', signature: 'prefersReducedMotion(): boolean', description: 'Check if user prefers reduced motion' },
  { name: 'getDuration', signature: 'getDuration(key): number', description: 'Get animation duration respecting reduced motion preference' },
  { name: 'getSpring', signature: 'getSpring(preset): SpringConfig', description: 'Get spring animation config (snappy, smooth, gentle)' },
  { name: 'configureAnimations', signature: 'configureAnimations(config): void', description: 'Configure global animation settings (disable, customize durations)' },
];

// Generate concise llms.txt
function generateLlmsTxt(): string {
  const lines: string[] = [];

  lines.push('# Darwin UI');
  lines.push('');
  lines.push('> Darwin UI is a macOS-inspired React component library featuring glass-morphism aesthetics, dark theme (with light mode support), and Tailwind CSS integration. It provides 36+ production-ready components with Framer Motion animations and full accessibility support.');
  lines.push('');

  lines.push('## Overview');
  lines.push('');
  lines.push('Darwin UI brings the refined aesthetics of macOS to React applications. Key features include:');
  lines.push('');
  lines.push('- **macOS-inspired design**: Glass-morphism effects, traffic light buttons, window chrome');
  lines.push('- **Dark & Light themes**: Optimized for dark mode by default with full light mode support');
  lines.push('- **Framer Motion animations**: Smooth spring physics and micro-interactions with prefers-reduced-motion support');
  lines.push('- **Tailwind CSS**: Full integration with Tailwind for easy customization');
  lines.push('- **Accessible**: WAI-ARIA compliant with keyboard navigation support');
  lines.push('- **TypeScript**: Full type definitions included');
  lines.push('- **Animation Configuration**: Global animation settings via configureAnimations()');
  lines.push('');

  lines.push('### Installation');
  lines.push('');
  lines.push('```bash');
  lines.push('npm install @pikoloo/darwin-ui');
  lines.push('```');
  lines.push('');
  lines.push('Import the styles in your app entry point:');
  lines.push('');
  lines.push('```javascript');
  lines.push("import '@pikoloo/darwin-ui/styles.css';");
  lines.push('```');
  lines.push('');

  lines.push('## Agentic Coding');
  lines.push('');
  lines.push('Darwin UI is indexed on Context7 for AI assistant integration. AI agents can fetch up-to-date documentation:');
  lines.push('');
  lines.push(`- **Context7**: ${CONTEXT7_URL}`);
  lines.push(`- **Documentation**: ${BASE_URL}`);
  lines.push('');
  lines.push('When working with Darwin UI in AI assistants (Claude, Cursor, etc.), reference Context7 for the latest API documentation.');
  lines.push('');

  lines.push('## Getting Started');
  lines.push('');
  lines.push(`- [Introduction](${BASE_URL}/docs#introduction): Overview of Darwin UI and its macOS-inspired design philosophy`);
  lines.push(`- [Agentic Coding](${BASE_URL}/docs#agentic-coding): How to use Darwin UI with AI coding assistants`);
  lines.push(`- [Installation](${BASE_URL}/docs#installation): How to install and set up Darwin UI in your project`);
  lines.push(`- [Quick Start](${BASE_URL}/docs#quick-start): Get up and running with your first Darwin UI components`);
  lines.push('');

  lines.push('## Components');
  lines.push('');
  lines.push('### Layout & Navigation');
  for (const c of LAYOUT_COMPONENTS) {
    lines.push(`- [${c.title}](${BASE_URL}/docs#${c.id}): ${c.description}`);
  }
  lines.push('');

  lines.push('### Forms & Inputs');
  for (const c of FORM_COMPONENTS) {
    lines.push(`- [${c.title}](${BASE_URL}/docs#${c.id}): ${c.description}`);
  }
  lines.push('');

  lines.push('### Feedback & Overlays');
  for (const c of FEEDBACK_COMPONENTS) {
    lines.push(`- [${c.title}](${BASE_URL}/docs#${c.id}): ${c.description}`);
  }
  lines.push('');

  lines.push('### Data Display');
  for (const c of DATA_DISPLAY_COMPONENTS) {
    lines.push(`- [${c.title}](${BASE_URL}/docs#${c.id}): ${c.description}`);
  }
  lines.push('');

  lines.push('### Utilities');
  for (const c of UTILITY_COMPONENTS) {
    lines.push(`- [${c.title}](${BASE_URL}/docs#${c.id}): ${c.description}`);
  }
  lines.push('');

  lines.push('## Animation Configuration');
  lines.push('');
  lines.push('Darwin UI provides a global animation configuration system:');
  lines.push('');
  lines.push('```typescript');
  lines.push("import { configureAnimations, ANIMATION_CONFIG } from '@pikoloo/darwin-ui';");
  lines.push('');
  lines.push('// Disable all animations');
  lines.push('configureAnimations({ enabled: false });');
  lines.push('');
  lines.push('// Customize durations');
  lines.push('configureAnimations({');
  lines.push('  durations: { fast: 0.05, normal: 0.1, slow: 0.15 }');
  lines.push('});');
  lines.push('');
  lines.push('// Disable specific animation types');
  lines.push('configureAnimations({');
  lines.push('  disable: { hover: true, scale: true }');
  lines.push('});');
  lines.push('```');
  lines.push('');
  lines.push('The library automatically respects `prefers-reduced-motion` system preference.');
  lines.push('');

  lines.push('## Theming');
  lines.push('');
  for (const item of THEMING) {
    lines.push(`- [${item.title}](${BASE_URL}/docs#${item.id}): ${item.description}`);
  }
  lines.push('');

  lines.push('## Hooks');
  lines.push('');
  for (const hook of HOOKS) {
    lines.push(`- **${hook.name}**: ${hook.description}`);
  }
  lines.push('');

  lines.push('## Utilities');
  lines.push('');
  for (const util of UTILITIES) {
    lines.push(`- **${util.name}**: ${util.description}`);
  }
  lines.push('');

  lines.push('## Resources');
  lines.push('');
  lines.push(`- [GitHub Repository](${REPO_URL}): Source code and issue tracking`);
  lines.push(`- [NPM Package](${NPM_URL}): Package details and version history`);
  lines.push(`- [Changelog](${BASE_URL}/changelog): Release notes and version history`);
  lines.push(`- [Context7 Docs](${CONTEXT7_URL}): AI-optimized documentation`);
  lines.push('');

  return lines.join('\n');
}

// Generate comprehensive llms-full.txt with code examples
function generateLlmsFullTxt(): string {
  const lines: string[] = [];

  lines.push('# Darwin UI - Complete Documentation');
  lines.push('');
  lines.push('> Darwin UI is a macOS-inspired React component library featuring glass-morphism aesthetics, dark theme (with light mode support), and Tailwind CSS integration. It provides 36+ production-ready components with Framer Motion animations and full accessibility support.');
  lines.push('');

  lines.push('## Quick Reference');
  lines.push('');
  lines.push('| Resource | URL |');
  lines.push('|----------|-----|');
  lines.push(`| Documentation | ${BASE_URL} |`);
  lines.push(`| GitHub | ${REPO_URL} |`);
  lines.push(`| NPM | ${NPM_URL} |`);
  lines.push(`| Context7 (AI) | ${CONTEXT7_URL} |`);
  lines.push('');

  lines.push('## Installation');
  lines.push('');
  lines.push('```bash');
  lines.push('npm install @pikoloo/darwin-ui');
  lines.push('# or');
  lines.push('pnpm add @pikoloo/darwin-ui');
  lines.push('# or');
  lines.push('yarn add @pikoloo/darwin-ui');
  lines.push('```');
  lines.push('');
  lines.push('### Setup');
  lines.push('');
  lines.push('Import the CSS in your app entry point:');
  lines.push('');
  lines.push('```tsx');
  lines.push("// app.tsx or main.tsx");
  lines.push("import '@pikoloo/darwin-ui/styles.css';");
  lines.push("import { Button, Card, Window } from '@pikoloo/darwin-ui';");
  lines.push('```');
  lines.push('');

  // Layout Components
  lines.push('---');
  lines.push('');
  lines.push('## Layout & Navigation Components');
  lines.push('');
  for (const c of LAYOUT_COMPONENTS) {
    lines.push(`### ${c.title}`);
    lines.push('');
    lines.push(c.description);
    lines.push('');
    lines.push(`**Documentation**: [${BASE_URL}/docs#${c.id}](${BASE_URL}/docs#${c.id})`);
    lines.push('');
    if (c.props) {
      lines.push('**Props**:');
      for (const prop of c.props) {
        lines.push(`- \`${prop}\``);
      }
      lines.push('');
    }
    if (c.example) {
      lines.push('**Example**:');
      lines.push('```tsx');
      lines.push(c.example);
      lines.push('```');
      lines.push('');
    }
  }

  // Form Components
  lines.push('---');
  lines.push('');
  lines.push('## Form & Input Components');
  lines.push('');
  for (const c of FORM_COMPONENTS) {
    lines.push(`### ${c.title}`);
    lines.push('');
    lines.push(c.description);
    lines.push('');
    lines.push(`**Documentation**: [${BASE_URL}/docs#${c.id}](${BASE_URL}/docs#${c.id})`);
    lines.push('');
    if (c.props) {
      lines.push('**Props**:');
      for (const prop of c.props) {
        lines.push(`- \`${prop}\``);
      }
      lines.push('');
    }
    if (c.example) {
      lines.push('**Example**:');
      lines.push('```tsx');
      lines.push(c.example);
      lines.push('```');
      lines.push('');
    }
  }

  // Feedback Components
  lines.push('---');
  lines.push('');
  lines.push('## Feedback & Overlay Components');
  lines.push('');
  for (const c of FEEDBACK_COMPONENTS) {
    lines.push(`### ${c.title}`);
    lines.push('');
    lines.push(c.description);
    lines.push('');
    lines.push(`**Documentation**: [${BASE_URL}/docs#${c.id}](${BASE_URL}/docs#${c.id})`);
    lines.push('');
    if (c.props) {
      lines.push('**Props**:');
      for (const prop of c.props) {
        lines.push(`- \`${prop}\``);
      }
      lines.push('');
    }
    if (c.example) {
      lines.push('**Example**:');
      lines.push('```tsx');
      lines.push(c.example);
      lines.push('```');
      lines.push('');
    }
  }

  // Data Display Components
  lines.push('---');
  lines.push('');
  lines.push('## Data Display Components');
  lines.push('');
  for (const c of DATA_DISPLAY_COMPONENTS) {
    lines.push(`### ${c.title}`);
    lines.push('');
    lines.push(c.description);
    lines.push('');
    lines.push(`**Documentation**: [${BASE_URL}/docs#${c.id}](${BASE_URL}/docs#${c.id})`);
    lines.push('');
    if (c.props) {
      lines.push('**Props**:');
      for (const prop of c.props) {
        lines.push(`- \`${prop}\``);
      }
      lines.push('');
    }
    if (c.example) {
      lines.push('**Example**:');
      lines.push('```tsx');
      lines.push(c.example);
      lines.push('```');
      lines.push('');
    }
  }

  // Utility Components
  lines.push('---');
  lines.push('');
  lines.push('## Utility Components');
  lines.push('');
  for (const c of UTILITY_COMPONENTS) {
    lines.push(`### ${c.title}`);
    lines.push('');
    lines.push(c.description);
    lines.push('');
    lines.push(`**Documentation**: [${BASE_URL}/docs#${c.id}](${BASE_URL}/docs#${c.id})`);
    lines.push('');
    if (c.props) {
      lines.push('**Props**:');
      for (const prop of c.props) {
        lines.push(`- \`${prop}\``);
      }
      lines.push('');
    }
    if (c.example) {
      lines.push('**Example**:');
      lines.push('```tsx');
      lines.push(c.example);
      lines.push('```');
      lines.push('');
    }
  }

  // Animation Configuration
  lines.push('---');
  lines.push('');
  lines.push('## Animation System');
  lines.push('');
  lines.push('Darwin UI uses Framer Motion with a configurable animation system.');
  lines.push('');
  lines.push('### Duration Presets');
  lines.push('');
  lines.push('| Key | Duration | Use Case |');
  lines.push('|-----|----------|----------|');
  lines.push('| instant | 0s | No animation |');
  lines.push('| fast | 0.1s | Quick interactions |');
  lines.push('| normal | 0.15s | Standard transitions |');
  lines.push('| slow | 0.2s | Deliberate animations |');
  lines.push('| reveal | 0.4s | Page reveals |');
  lines.push('');
  lines.push('### Spring Presets');
  lines.push('');
  lines.push('| Preset | Description |');
  lines.push('|--------|-------------|');
  lines.push('| snappy | Quick, responsive feel |');
  lines.push('| smooth | Natural, fluid motion |');
  lines.push('| gentle | Soft, subtle movement |');
  lines.push('');
  lines.push('### Configuration');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { configureAnimations } from '@pikoloo/darwin-ui';");
  lines.push('');
  lines.push('// Disable all animations (e.g., for testing)');
  lines.push('configureAnimations({ enabled: false });');
  lines.push('');
  lines.push('// Customize durations');
  lines.push('configureAnimations({');
  lines.push('  durations: { fast: 0.05, normal: 0.1, slow: 0.15 }');
  lines.push('});');
  lines.push('');
  lines.push('// Disable specific animation types');
  lines.push('configureAnimations({');
  lines.push('  disable: { hover: true, scale: true }');
  lines.push('});');
  lines.push('```');
  lines.push('');
  lines.push('The library automatically respects the `prefers-reduced-motion` system preference.');
  lines.push('');

  // Theming
  lines.push('---');
  lines.push('');
  lines.push('## Theming');
  lines.push('');
  lines.push('Darwin UI uses CSS custom properties (HSL format) for theming.');
  lines.push('');
  lines.push('### Color Variables');
  lines.push('');
  lines.push('```css');
  lines.push(':root {');
  lines.push('  --background: 0 0% 100%;');
  lines.push('  --foreground: 0 0% 3.9%;');
  lines.push('  --card: 0 0% 100%;');
  lines.push('  --primary: 0 0% 9%;');
  lines.push('  --secondary: 0 0% 96.1%;');
  lines.push('  --muted: 0 0% 96.1%;');
  lines.push('  --accent: 0 0% 96.1%;');
  lines.push('  --border: 0 0% 89.8%;');
  lines.push('}');
  lines.push('');
  lines.push('.dark {');
  lines.push('  --background: 0 0% 3.9%;');
  lines.push('  --foreground: 0 0% 98%;');
  lines.push('  /* ... dark theme values */');
  lines.push('}');
  lines.push('```');
  lines.push('');
  lines.push('### Usage in Components');
  lines.push('');
  lines.push('```tsx');
  lines.push('<div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">');
  lines.push('  Themed content');
  lines.push('</div>');
  lines.push('```');
  lines.push('');

  // Hooks
  lines.push('---');
  lines.push('');
  lines.push('## Hooks');
  lines.push('');
  for (const hook of HOOKS) {
    lines.push(`### ${hook.name}`);
    lines.push('');
    lines.push(`\`${hook.signature}\``);
    lines.push('');
    lines.push(hook.description);
    lines.push('');
  }

  // Utilities
  lines.push('---');
  lines.push('');
  lines.push('## Utility Functions');
  lines.push('');
  for (const util of UTILITIES) {
    lines.push(`### ${util.name}`);
    lines.push('');
    lines.push(`\`${util.signature}\``);
    lines.push('');
    lines.push(util.description);
    lines.push('');
  }

  // Common Patterns
  lines.push('---');
  lines.push('');
  lines.push('## Common Patterns');
  lines.push('');
  lines.push('### Form with Validation');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { Input, Button, Alert } from '@pikoloo/darwin-ui';");
  lines.push('');
  lines.push('function LoginForm() {');
  lines.push('  const [email, setEmail] = useState("");');
  lines.push('  const [error, setError] = useState("");');
  lines.push('');
  lines.push('  const handleSubmit = (e: FormEvent) => {');
  lines.push('    e.preventDefault();');
  lines.push('    if (!email.includes("@")) {');
  lines.push('      setError("Invalid email address");');
  lines.push('      return;');
  lines.push('    }');
  lines.push('    // Submit logic');
  lines.push('  };');
  lines.push('');
  lines.push('  return (');
  lines.push('    <form onSubmit={handleSubmit}>');
  lines.push('      <Input');
  lines.push('        value={email}');
  lines.push('        onChange={(e) => setEmail(e.target.value)}');
  lines.push('        error={error}');
  lines.push('        placeholder="Email"');
  lines.push('      />');
  lines.push('      <Button type="submit">Sign In</Button>');
  lines.push('    </form>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('### Modal with Confirmation');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { Modal, Button } from '@pikoloo/darwin-ui';");
  lines.push('');
  lines.push('function ConfirmDialog({ isOpen, onClose, onConfirm }) {');
  lines.push('  return (');
  lines.push('    <Modal isOpen={isOpen} onClose={onClose}>');
  lines.push('      <Modal.Header>Confirm Action</Modal.Header>');
  lines.push('      <Modal.Body>');
  lines.push('        <p>Are you sure you want to proceed?</p>');
  lines.push('      </Modal.Body>');
  lines.push('      <Modal.Footer>');
  lines.push('        <Button variant="ghost" onClick={onClose}>Cancel</Button>');
  lines.push('        <Button variant="danger" onClick={onConfirm}>Delete</Button>');
  lines.push('      </Modal.Footer>');
  lines.push('    </Modal>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('*Generated automatically. For the most up-to-date documentation, visit the links above.*');
  lines.push('');

  return lines.join('\n');
}

// Generate and write both files
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate llms.txt (concise)
const llmsTxt = generateLlmsTxt();
const llmsTxtPath = path.join(publicDir, 'llms.txt');
fs.writeFileSync(llmsTxtPath, llmsTxt);
console.log(`Generated llms.txt at ${llmsTxtPath}`);
console.log(`  Size: ${llmsTxt.length} characters`);

// Generate llms-full.txt (comprehensive)
const llmsFullTxt = generateLlmsFullTxt();
const llmsFullPath = path.join(publicDir, 'llms-full.txt');
fs.writeFileSync(llmsFullPath, llmsFullTxt);
console.log(`Generated llms-full.txt at ${llmsFullPath}`);
console.log(`  Size: ${llmsFullTxt.length} characters`);
