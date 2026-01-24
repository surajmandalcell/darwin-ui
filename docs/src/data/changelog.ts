/**
 * Changelog Data
 *
 * This file contains all version releases for Darwin UI.
 *
 * HOW TO UPDATE:
 * 1. Add a new entry at the TOP of the `changelog` array
 * 2. Follow the ChangelogEntry interface structure
 * 3. Use semantic versioning (MAJOR.MINOR.PATCH)
 * 4. Group changes by type: added, changed, fixed, removed
 *
 * VERSIONING GUIDE:
 * - MAJOR: Breaking changes, incompatible API changes
 * - MINOR: New features, backwards compatible
 * - PATCH: Bug fixes, minor improvements
 */

export interface ChangelogChange {
  type: 'added' | 'changed' | 'fixed' | 'removed' | 'deprecated' | 'security';
  description: string;
  component?: string;
  breaking?: boolean;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description?: string;
  changes: ChangelogChange[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: '2.0.0',
    date: '2025-01-24',
    title: 'Frosted Glass, Accessibility & Visual Testing',
    description: 'Major release with frosted glass effects across components, comprehensive accessibility improvements, visual regression testing infrastructure, and HSL color variable standardization.',
    changes: [
      // Added
      { type: 'added', description: 'Frosted glass effect support for Accordion, Badge, Button, Card, Input, Sidebar, and Table components' },
      { type: 'added', description: 'Visual regression testing setup with Playwright for component screenshot validation' },
      { type: 'added', description: 'Visual regression audit command for automated component testing' },
      { type: 'added', description: 'Pixel-based contrast validation tests for accessibility compliance' },
      { type: 'added', description: 'CSS Isolation documentation section in DeveloperApp' },
      { type: 'added', description: 'Component examples section with tabs for preview and code' },
      { type: 'added', description: 'NotFoundPage component with enhanced routing' },
      { type: 'added', description: 'Code quality guidelines and mandatory checks documentation' },
      { type: 'added', component: 'Button', description: 'Text and icon variations' },
      { type: 'added', component: 'DeveloperApp', description: 'Search functionality and organized documentation sections' },
      // Changed
      { type: 'changed', description: 'All component styles now use HSL color variables for consistent theming', breaking: true },
      { type: 'changed', description: 'Focus ring pattern implemented for all form elements using ring-inset for improved accessibility' },
      { type: 'changed', description: 'Animation system consolidated using animation-config.ts for consistent timing' },
      { type: 'changed', description: 'Dark mode text colors standardized for improved contrast and readability' },
      { type: 'changed', description: 'CSS variables adopted for border radius across all components' },
      { type: 'changed', component: 'Floating', description: 'Replaced Tooltip component with unified Floating component' },
      { type: 'changed', component: 'TerminalApp', description: 'Theme-aware styling with dynamic theme switching' },
      { type: 'changed', component: 'CodeBlock', description: 'Dynamic syntax highlighting with adjusted import paths' },
      // Fixed
      { type: 'fixed', description: 'Text color accessibility across Button, ContextMenu, DropdownMenu, Sidebar, and Tabs' },
      { type: 'fixed', description: 'Focus styles and transition effects consistency across components' },
      { type: 'fixed', description: 'Avatar, CloseButton, ContactForm, and Upload components HSL color compatibility' },
      { type: 'fixed', description: 'Styling consistency in Breadcrumbs, UnifiedNavbar, ExampleApp, NotesApp, and TerminalApp' },
      // Removed
      { type: 'removed', description: 'Deprecated TypeScript configuration options' },
      { type: 'removed', description: 'Unused component examples and legacy code' },
      { type: 'removed', description: 'Standalone Textarea component (merged into Input component)' },
    ],
  },
  {
    version: '1.5.0',
    date: '2025-01-22',
    title: 'Light Mode & Theme System',
    description: 'Full light mode support with theme-aware styling across all components, dock hover scaling effects, and improved desktop experience.',
    changes: [
      // Added
      { type: 'added', description: 'Full light mode support with theme toggle in navbar and menu bar' },
      { type: 'added', description: 'Theme-aware wallpaper that adapts to light/dark mode' },
      { type: 'added', component: 'Dock', description: 'Mouse hover scaling effect with smooth animations' },
      { type: 'added', component: 'Dock', description: 'Theme toggle button in dock for quick theme switching' },
      { type: 'added', description: 'Light mode compatibility rules documentation for future development' },
      { type: 'added', description: 'Makefile for managing documentation build and development tasks' },
      { type: 'added', description: 'Darwin UI documentation and llms.txt generator for AI assistants' },
      // Changed
      { type: 'changed', description: 'All desktop components now use theme-aware colors (foreground, background, border CSS variables)' },
      { type: 'changed', component: 'MenuBar', description: 'Updated to use theme-aware backgrounds and hover states' },
      { type: 'changed', component: 'DesktopWindow', description: 'Updated to use theme-aware colors for light mode' },
      { type: 'changed', component: 'DockItem', description: 'Updated to use theme-aware colors and hover effects' },
      { type: 'changed', description: 'Showcase components updated with theme-aware styling throughout' },
      { type: 'changed', description: 'Components updated to use new color variables for consistent styling' },
      // Fixed
      { type: 'fixed', component: 'Avatar', description: 'Ring color now uses theme-aware colors for avatar groups' },
      { type: 'fixed', component: 'Button', description: 'Primary variant now has proper white text in light mode' },
      { type: 'fixed', component: 'SearchInput', description: 'Placeholder color now adapts to current theme' },
      { type: 'fixed', component: 'ContextMenu', description: 'Hover background now uses theme-aware colors' },
      { type: 'fixed', description: 'Desktop window drag glitch resolved by syncing transform reset with layout update' },
      { type: 'fixed', description: 'Focus state overlay and resize handle visibility improvements' },
      { type: 'fixed', description: 'Mobile responsiveness improvements across desktop components' },
    ],
  },
  {
    version: '1.4.0',
    date: '2025-01-22',
    title: 'Showcase Redesign & Animation Improvements',
    description: 'Major showcase page redesign with new interactive components, global animation configuration system, improved UX fixes, and Agentic Coding documentation.',
    changes: [
      // Added
      { type: 'added', description: 'FloatingElement component with multi-dimensional parallax animations' },
      { type: 'added', description: 'HeroComponentPreview with interactive component rotation showcase' },
      { type: 'added', description: 'AgenticCodingSection with typing animation for AI integration showcase' },
      { type: 'added', description: 'Variable-size grid cells in ComponentShowcaseSection for dynamic layouts' },
      { type: 'added', description: 'Premium CTA section with gradient effects in footer redesign' },
      { type: 'added', description: 'Global animation configuration system (animation-config.ts) for centralized animation control' },
      { type: 'added', description: 'prefers-reduced-motion support across all animated components' },
      { type: 'added', description: 'Agentic Coding documentation page with Context7 integration for AI assistants' },
      { type: 'added', component: 'Sidebar', description: 'Collapsible mode with tooltip navigation' },
      // Changed
      { type: 'changed', description: 'ShowcasePage completely redesigned with animated hero section and feature highlights' },
      { type: 'changed', description: 'DashboardDemoSection upgraded with Production title badge and glow effects' },
      { type: 'changed', description: 'ComponentGridSection refactored to ComponentShowcaseSection with improved architecture' },
      { type: 'changed', component: 'DropdownMenu', description: 'Click timing improved - changed mousedown to click event for reliable item selection' },
      { type: 'changed', component: 'Select', description: 'Click timing improved - changed mousedown to click event for reliable option selection' },
      { type: 'changed', component: 'Tooltip', description: 'Animation changed to opacity-only (removed Y-axis shift that caused hover flicker)' },
      { type: 'changed', component: 'Checkbox', description: 'Scale animation removed for better UX - checkbox no longer moves away from cursor' },
      { type: 'changed', component: 'Badge', description: 'Hover effects removed - badges are status indicators and should not suggest interactivity' },
      // Fixed
      { type: 'fixed', description: 'ComponentShowcaseSection grid layout and responsive styling' },
      { type: 'fixed', description: 'Section spacing optimization for better responsive layouts' },
      { type: 'fixed', description: 'Removed duplicate Agentic Ready badge from AgenticCodingSection' },
      { type: 'fixed', component: 'DropdownMenu', description: 'Menu items now register clicks reliably on first tap' },
      { type: 'fixed', component: 'Select', description: 'Options now register selection reliably on first tap' },
    ],
  },
  {
    version: '1.3.0',
    date: '2025-12-31',
    title: 'Changelog Feature & Branding Update',
    description: 'New changelog system with dedicated page, custom Darwin logo branding, Example app, and comprehensive component demos.',
    changes: [
      { type: 'added', description: 'Changelog feature with dedicated /changelog page and structured data format' },
      { type: 'added', description: 'Example App - Dashboard showcasing all components in real-world UI scenarios' },
      { type: 'added', description: 'Custom Darwin logo replacing Apple icon throughout the UI for unique branding' },
      { type: 'added', description: 'Component demos for all 35 library components in documentation' },
      { type: 'added', description: 'Release command for streamlined version publishing' },
      { type: 'changed', description: 'MenuBar now uses custom Darwin logo in the system menu' },
      { type: 'changed', description: 'About modal redesigned with new Darwin branding' },
      { type: 'fixed', description: 'Preview issues in component documentation' },
      { type: 'removed', description: 'Orphaned docs components that were no longer in use' },
    ],
  },
  {
    version: '1.2.0',
    date: '2025-12-31',
    title: 'DE & Component Improvements',
    description: 'Major release featuring a complete macOS-inspired desktop environment with multiple apps, 15 new components, and significant UI/UX improvements.',
    changes: [
      // Added
      { type: 'added', description: 'Desktop environment with window management, dock, and menu bar' },
      { type: 'added', description: 'Developer App - Interactive component documentation browser' },
      { type: 'added', description: 'Example App - Dashboard showcasing all components in real-world UI' },
      { type: 'added', description: 'Terminal App - Functional terminal emulator with command support' },
      { type: 'added', description: 'Notes App - Simple note-taking application' },
      { type: 'added', description: 'Settings App - System preferences interface' },
      { type: 'added', component: 'DropdownMenu', description: 'Full-featured dropdown menu with keyboard navigation' },
      { type: 'added', component: 'Popover', description: 'Flexible popover component with portal support' },
      { type: 'added', component: 'Tooltip', description: 'Accessible tooltip with multiple positions' },
      { type: 'added', component: 'Progress', description: 'Linear and circular progress indicators' },
      { type: 'added', component: 'Slider', description: 'Range slider with customizable track and thumb' },
      { type: 'added', component: 'Tabs', description: 'Tabbed navigation component' },
      { type: 'added', component: 'Textarea', description: 'Multi-line text input with auto-resize' },
      { type: 'added', component: 'Accordion', description: 'Collapsible content sections' },
      { type: 'added', component: 'Avatar', description: 'User avatar with fallback and group support' },
      { type: 'added', component: 'DateSelect', description: 'Date picker with calendar interface' },
      { type: 'added', component: 'Dialog', description: 'Modal dialog with focus trap and portal rendering' },
      { type: 'added', component: 'Sidebar', description: 'Navigation sidebar with active state' },
      { type: 'added', component: 'Upload', description: 'File upload with drag-and-drop support' },
      { type: 'added', component: 'Image', description: 'Image component with click-to-enlarge' },
      { type: 'added', description: 'Custom Darwin logo replacing Apple icon throughout the UI' },
      { type: 'added', description: 'Window persistence using localStorage' },
      // Changed
      { type: 'changed', description: 'All overlay components (Dialog, Popover, Tooltip, DropdownMenu) now use portals for proper z-index handling' },
      { type: 'changed', component: 'SearchInput', description: 'Added wrapperClassName prop for better layout control' },
      { type: 'changed', description: 'Enhanced animations with spring physics using Framer Motion' },
      { type: 'changed', description: 'Improved accessibility with proper ARIA attributes and keyboard navigation' },
      // Fixed
      { type: 'fixed', description: 'Charts now render correctly with full-width containers' },
      { type: 'fixed', description: 'Dialog and modal z-index issues in nested contexts' },
      { type: 'fixed', description: 'SearchInput icon alignment when using custom widths' },
    ],
  },
  {
    version: '1.1.0',
    date: '2025-12-30',
    title: 'Animation System & Documentation',
    description: 'Complete migration to Framer Motion for animations, new Alert/Toast systems, and comprehensive documentation overhaul.',
    changes: [
      // Added
      { type: 'added', component: 'Alert', description: 'Inline alert component with multiple variants (info, success, warning, error)' },
      { type: 'added', component: 'AlertProvider', description: 'Modal-style alert dialogs with confirm/cancel actions' },
      { type: 'added', component: 'Toast', description: 'Toast notification system with ToastProvider' },
      { type: 'added', description: 'Command palette with fuzzy search (Cmd+K)' },
      { type: 'added', description: 'Breadcrumb navigation in documentation' },
      { type: 'added', description: 'Previous/Next page navigation' },
      { type: 'added', component: 'Reveal', description: 'Scroll-triggered reveal animations' },
      // Changed
      { type: 'changed', description: 'Migrated from CSS animations to Framer Motion for all interactive components', breaking: true },
      { type: 'changed', description: 'Decoupled components from Next.js-specific APIs for broader framework compatibility' },
      { type: 'changed', component: 'Button', description: 'Added loading, disabled states with smooth transitions' },
      { type: 'changed', component: 'Checkbox', description: 'Added indeterminate state and spring animations' },
      { type: 'changed', component: 'Input', description: 'Added error and success validation states' },
      { type: 'changed', component: 'Switch', description: 'Enhanced with spring physics and focus states' },
      { type: 'changed', component: 'Card', description: 'Improved hover effects and border treatments' },
      { type: 'changed', description: 'Complete landing page redesign with interactive demos' },
      // Fixed
      { type: 'fixed', component: 'Image', description: 'Fixed OverlayProvider compatibility issue' },
      { type: 'fixed', description: 'Build warnings in production builds' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-12-30',
    title: 'Initial Release',
    description: 'First stable release of Darwin UI - a macOS-inspired React component library with dark theme and Tailwind CSS integration.',
    changes: [
      // Added
      { type: 'added', component: 'Button', description: 'Versatile button with 10 variants and 3 sizes' },
      { type: 'added', component: 'Badge', description: 'Status badges with semantic colors' },
      { type: 'added', component: 'Card', description: 'Container component with header, content, and footer sections' },
      { type: 'added', component: 'Input', description: 'Text input with validation states' },
      { type: 'added', component: 'Checkbox', description: 'Checkbox with label support' },
      { type: 'added', component: 'Switch', description: 'Toggle switch component' },
      { type: 'added', component: 'Select', description: 'Dropdown select with custom styling' },
      { type: 'added', component: 'MultiSelect', description: 'Multi-selection dropdown with tags' },
      { type: 'added', component: 'SearchInput', description: 'Search input with icon' },
      { type: 'added', component: 'Skeleton', description: 'Loading placeholder with shimmer effect' },
      { type: 'added', component: 'Modal', description: 'Modal dialog with backdrop' },
      { type: 'added', component: 'ContextMenu', description: 'Right-click context menu' },
      { type: 'added', component: 'Table', description: 'Data table with sorting and loading states' },
      { type: 'added', component: 'Window', description: 'macOS-style window chrome with traffic lights' },
      { type: 'added', component: 'CloseButton', description: 'Red close button matching macOS style' },
      { type: 'added', component: 'MdEditor', description: 'Markdown editor with preview' },
      { type: 'added', component: 'CompactContactForm', description: 'Pre-built contact form component' },
      { type: 'added', description: 'Chart components: LineChart, BarChart, AreaChart, PieChart, DonutChart, StackedBarChart' },
      { type: 'added', description: 'useEscapeKey hook for modal dismissal' },
      { type: 'added', description: 'useContactForm hook for form handling' },
      { type: 'added', description: 'OverlayProvider for managing overlay stacking' },
      { type: 'added', description: 'Comprehensive documentation with API references' },
      { type: 'added', description: 'NPM package published as @pikoloo/darwin-ui' },
    ],
  },
];

// Helper to get latest version
export const getLatestVersion = () => changelog[0];

// Helper to get version by number
export const getVersion = (version: string) => changelog.find(v => v.version === version);

// Get change type color
export const getChangeTypeColor = (type: ChangelogChange['type']) => {
  const colors = {
    added: 'text-green-400 bg-green-500/10 border-green-500/20',
    changed: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    fixed: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    removed: 'text-red-400 bg-red-500/10 border-red-500/20',
    deprecated: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    security: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };
  return colors[type];
};

// Get change type label
export const getChangeTypeLabel = (type: ChangelogChange['type']) => {
  const labels = {
    added: 'Added',
    changed: 'Changed',
    fixed: 'Fixed',
    removed: 'Removed',
    deprecated: 'Deprecated',
    security: 'Security',
  };
  return labels[type];
};
