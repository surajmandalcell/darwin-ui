import { Zap, Layout, Palette } from 'lucide-react';
import type { DocSection } from './types';

// Documentation structure
export const docSections: Record<string, DocSection> = {
  'getting-started': {
    title: 'Getting Started',
    icon: <Zap className="w-4 h-4" />,
    pages: [
      { id: 'agentic-coding', title: 'Agentic Coding' },
      { id: 'introduction', title: 'Introduction' },
      { id: 'installation', title: 'Installation' },
      { id: 'shadcn-cli', title: 'ShadCN CLI' },
      { id: 'quick-start', title: 'Quick Start' },
      { id: 'css-isolation', title: 'CSS Isolation' },
    ],
  },
  'components': {
    title: 'Components',
    icon: <Layout className="w-4 h-4" />,
    pages: [
      // Form Controls
      { id: 'button', title: 'Button', group: 'Form Controls' },
      { id: 'input', title: 'Input', group: 'Form Controls' },
      { id: 'textarea', title: 'Textarea', group: 'Form Controls' },
      { id: 'checkbox', title: 'Checkbox', group: 'Form Controls' },
      { id: 'switch', title: 'Switch', group: 'Form Controls' },
      { id: 'select', title: 'Select', group: 'Form Controls' },
      { id: 'multi-select', title: 'MultiSelect', group: 'Form Controls' },
      { id: 'search-input', title: 'SearchInput', group: 'Form Controls' },
      { id: 'slider', title: 'Slider', group: 'Form Controls' },
      { id: 'date-select', title: 'DateSelect', group: 'Form Controls' },
      { id: 'upload', title: 'Upload', group: 'Form Controls' },
      // Feedback
      { id: 'badge', title: 'Badge', group: 'Feedback' },
      { id: 'progress', title: 'Progress', group: 'Feedback' },
      { id: 'skeleton', title: 'Skeleton', group: 'Feedback' },
      // Overlays
      { id: 'dialog', title: 'Dialog', group: 'Overlays' },
      { id: 'modal', title: 'Modal', group: 'Overlays' },
      { id: 'popover', title: 'Popover', group: 'Overlays' },
      { id: 'tooltip', title: 'Tooltip', group: 'Overlays' },
      { id: 'dropdown-menu', title: 'DropdownMenu', group: 'Overlays' },
      { id: 'context-menu', title: 'ContextMenu', group: 'Overlays' },
      // Data Display
      { id: 'table', title: 'Table', group: 'Data Display' },
      { id: 'card', title: 'Card', group: 'Data Display' },
      { id: 'avatar', title: 'Avatar', group: 'Data Display' },
      { id: 'image', title: 'Image', group: 'Data Display' },
      { id: 'charts', title: 'Charts', group: 'Data Display' },
      // Navigation
      { id: 'tabs', title: 'Tabs', group: 'Navigation' },
      { id: 'accordion', title: 'Accordion', group: 'Navigation' },
      { id: 'sidebar', title: 'Sidebar', group: 'Navigation' },
      // Layout
      { id: 'window', title: 'Window', group: 'Layout' },
      // Effects
      { id: 'reveal', title: 'Reveal', group: 'Effects' },
      { id: 'backgrounds', title: 'Backgrounds', group: 'Effects' },
      { id: 'hover-effects', title: 'Hover Effects', group: 'Effects' },
      // Specialized
      { id: 'contact-form', title: 'ContactForm', group: 'Specialized' },
      { id: 'md-editor', title: 'MdEditor', group: 'Specialized' },
      { id: 'close-button', title: 'CloseButton', group: 'Specialized' },
    ],
  },
  'theming': {
    title: 'Theming',
    icon: <Palette className="w-4 h-4" />,
    pages: [
      { id: 'colors', title: 'Colors' },
      { id: 'dark-mode', title: 'Dark Mode' },
      { id: 'customization', title: 'Customization' },
    ],
  },
};
