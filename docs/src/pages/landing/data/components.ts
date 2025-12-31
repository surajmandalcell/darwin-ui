export interface ComponentItem {
  title: string;
  slug: string;
  description: string;
  category: 'form' | 'data' | 'feedback' | 'layout';
  badge?: string;
}

export const allComponents: ComponentItem[] = [
  // Form Components
  {
    title: 'Button',
    slug: 'button',
    description: '11 variants with loading states',
    category: 'form',
    badge: 'Popular',
  },
  {
    title: 'Input',
    slug: 'input',
    description: 'Text input with validation states',
    category: 'form',
  },
  {
    title: 'Select',
    slug: 'select',
    description: 'Dropdown select with custom styling',
    category: 'form',
  },
  {
    title: 'MultiSelect',
    slug: 'multi-select',
    description: 'Multiple selection with pills',
    category: 'form',
  },
  {
    title: 'Checkbox',
    slug: 'checkbox',
    description: 'Interactive checkbox with states',
    category: 'form',
  },
  {
    title: 'Switch',
    slug: 'switch',
    description: 'Toggle switch component',
    category: 'form',
  },
  {
    title: 'DateSelect',
    slug: 'date-select',
    description: 'Calendar date picker',
    category: 'form',
  },
  {
    title: 'Upload',
    slug: 'upload',
    description: 'Drag-drop file upload',
    category: 'form',
  },
  {
    title: 'SearchInput',
    slug: 'search-input',
    description: 'Search with debounce and clear',
    category: 'form',
  },

  // Data Components
  {
    title: 'Table',
    slug: 'table',
    description: 'Data table with styling',
    category: 'data',
  },
  {
    title: 'Charts',
    slug: 'charts',
    description: '6 chart types with Recharts',
    category: 'data',
    badge: 'Popular',
  },
  {
    title: 'Badge',
    slug: 'badge',
    description: 'Status and label badges',
    category: 'data',
  },
  {
    title: 'Image',
    slug: 'image',
    description: 'Optimized image with click-to-enlarge',
    category: 'data',
  },

  // Feedback Components
  {
    title: 'Modal',
    slug: 'modal',
    description: 'Dialog with backdrop and animations',
    category: 'feedback',
  },
  {
    title: 'Toast',
    slug: 'toast',
    description: 'Notification system with auto-dismiss',
    category: 'feedback',
  },
  {
    title: 'Alert',
    slug: 'alert',
    description: 'Alert dialogs with variants',
    category: 'feedback',
  },
  {
    title: 'Skeleton',
    slug: 'skeleton',
    description: 'Loading placeholder animations',
    category: 'feedback',
  },

  // Layout Components
  {
    title: 'Card',
    slug: 'card',
    description: 'Container with header and content',
    category: 'layout',
  },
  {
    title: 'Window',
    slug: 'window',
    description: 'macOS window chrome with traffic lights',
    category: 'layout',
    badge: 'New',
  },
  {
    title: 'Reveal',
    slug: 'reveal',
    description: 'Scroll-triggered animations',
    category: 'layout',
  },
  {
    title: 'CloseButton',
    slug: 'close-button',
    description: 'Accessible dismiss button',
    category: 'layout',
  },
  {
    title: 'ContextMenu',
    slug: 'context-menu',
    description: 'Right-click context menus',
    category: 'layout',
  },
];

// Group by category
export const componentsByCategory = {
  form: allComponents.filter((c) => c.category === 'form'),
  data: allComponents.filter((c) => c.category === 'data'),
  feedback: allComponents.filter((c) => c.category === 'feedback'),
  layout: allComponents.filter((c) => c.category === 'layout'),
};

// Category metadata
export const categoryMetadata = {
  form: {
    title: 'Beautiful forms, out of the box',
    description:
      'Build elegant forms with comprehensive input components. Includes validation states, custom styling, and accessibility built-in.',
    badge: 'Form Components',
    accentColor: 'blue' as const,
  },
  data: {
    title: 'Display data beautifully',
    description:
      'Powerful components for presenting information. From tables to charts, make your data shine with professional visualizations.',
    badge: 'Data Components',
    accentColor: 'purple' as const,
  },
  feedback: {
    title: 'Engage your users',
    description:
      'Keep users informed with modals, toasts, and alerts. Smooth animations and clear messaging enhance the experience.',
    badge: 'Feedback Components',
    accentColor: 'green' as const,
  },
  layout: {
    title: 'Structure your interface',
    description:
      'Build polished layouts with cards, windows, and utilities. Create professional interfaces with consistent spacing and hierarchy.',
    badge: 'Layout Components',
    accentColor: 'orange' as const,
  },
};
