import fs from 'fs';
import path from 'path';

const REGISTRY_DIR = path.join(process.cwd(), 'docs', 'public', 'registry');
const SRC_DIR = path.join(process.cwd(), 'src');

interface RegistryItem {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    type: string;
    content: string;
  }[];
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}

interface ComponentDef {
  title: string;
  description: string;
  files: string[];
  dependencies: string[];
  registryDependencies: string[];
  type: 'registry:ui' | 'registry:hook' | 'registry:lib' | 'registry:block';
}

// Component definitions with their dependencies
const components: Record<string, ComponentDef> = {
  // Utils first (dependency for many components)
  utils: {
    title: 'Utils',
    description: 'Utility functions for class name merging with Tailwind CSS.',
    files: ['src/lib/utils.ts'],
    dependencies: ['tailwind-merge', 'clsx'],
    registryDependencies: [],
    type: 'registry:lib',
  },

  // UI Components
  button: {
    title: 'Button',
    description: 'A versatile button component with 11 variants including primary, secondary, destructive, ghost, and more.',
    files: ['src/components/button.tsx'],
    dependencies: ['tailwind-merge', 'clsx'],
    registryDependencies: [],
    type: 'registry:ui',
  },
  badge: {
    title: 'Badge',
    description: 'Status indicator badges with 13 variants for different states like success, warning, published, draft, etc.',
    files: ['src/components/badge.tsx'],
    dependencies: ['tailwind-merge', 'clsx', 'motion'],
    registryDependencies: [],
    type: 'registry:ui',
  },
  card: {
    title: 'Card',
    description: 'Composable card components with glass-morphism styling. Includes CardHeader, CardTitle, CardDescription, CardContent, CardFooter, and CardAction.',
    files: ['src/components/card.tsx'],
    dependencies: [],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  input: {
    title: 'Input',
    description: 'Glass-effect styled input component with default and search variants.',
    files: ['src/components/input.tsx'],
    dependencies: ['lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  checkbox: {
    title: 'Checkbox',
    description: 'Custom checkbox input with label support and checked state callback.',
    files: ['src/components/checkbox.tsx'],
    dependencies: ['lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  switch: {
    title: 'Switch',
    description: 'Toggle switch component with label support for boolean inputs.',
    files: ['src/components/switch.tsx'],
    dependencies: [],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  select: {
    title: 'Select',
    description: 'Custom select/dropdown component with portal rendering and keyboard navigation.',
    files: ['src/components/select.tsx'],
    dependencies: ['@radix-ui/react-popover', 'lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  'multi-select': {
    title: 'MultiSelect',
    description: 'Multi-selection dropdown component for selecting multiple options.',
    files: ['src/components/multi-select.tsx'],
    dependencies: ['@radix-ui/react-popover', 'lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  skeleton: {
    title: 'Skeleton',
    description: 'Loading skeleton placeholder with pulse animation for content loading states.',
    files: ['src/components/skeleton.tsx'],
    dependencies: [],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  table: {
    title: 'Table',
    description: 'Comprehensive table system with TableHead, TableBody, TableCell, TableHeaderCell, TableRow, TableEmptyRow, and TableLoadingRows components.',
    files: ['src/components/table.tsx'],
    dependencies: [],
    registryDependencies: ['utils', 'skeleton'],
    type: 'registry:ui',
  },
  modal: {
    title: 'Modal',
    description: 'Accessible modal dialog with 4 sizes (sm, md, lg, xl), focus lock, and escape key handling.',
    files: ['src/components/modal.tsx'],
    dependencies: ['react-focus-lock', 'lucide-react', 'motion'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  toast: {
    title: 'Toast',
    description: 'Toast notification system with ToastProvider and useToast hook. Supports auto-dismiss with configurable duration.',
    files: ['src/components/toast.tsx'],
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  alert: {
    title: 'Alert',
    description: 'Alert dialog with AlertProvider and useAlert hook. Supports info, success, warning, and error types with icon indicators.',
    files: ['src/components/alert.tsx'],
    dependencies: ['react-focus-lock', 'lucide-react', 'motion'],
    registryDependencies: ['utils', 'button'],
    type: 'registry:ui',
  },
  window: {
    title: 'Window',
    description: 'macOS-style window container with title bar and close button for desktop-like UI.',
    files: ['src/components/window.tsx'],
    dependencies: ['motion'],
    registryDependencies: ['utils', 'close-button'],
    type: 'registry:ui',
  },
  sidebar: {
    title: 'Sidebar',
    description: 'Responsive sidebar navigation with SidebarItem sub-component and mobile menu support.',
    files: ['src/components/sidebar.tsx'],
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  'close-button': {
    title: 'CloseButton',
    description: 'Styled close button component for modals, windows, and dismissible content.',
    files: ['src/components/close-button.tsx'],
    dependencies: ['lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  'search-input': {
    title: 'SearchInput',
    description: 'Search input field component with search icon styling.',
    files: ['src/components/search-input.tsx'],
    dependencies: [],
    registryDependencies: ['input'],
    type: 'registry:ui',
  },
  'context-menu': {
    title: 'ContextMenu',
    description: 'Right-click context menu component with typed menu items. Note: Requires Next.js for navigation features.',
    files: ['src/components/context-menu.tsx'],
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  upload: {
    title: 'Upload',
    description: 'File upload component with drag-and-drop support and file validation.',
    files: ['src/components/upload.tsx'],
    dependencies: ['lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  reveal: {
    title: 'Reveal',
    description: 'Animation reveal component for scroll-triggered or mount animations using motion library.',
    files: ['src/components/reveal.tsx'],
    dependencies: ['motion'],
    registryDependencies: [],
    type: 'registry:ui',
  },

  // Chart components
  charts: {
    title: 'Charts',
    description: 'Recharts-based chart components including AreaChart, BarChart, LineChart, PieChart, DonutChart, and StackedBarChart with Darwin color palette.',
    files: ['src/components/charts.tsx'],
    dependencies: ['recharts'],
    registryDependencies: [],
    type: 'registry:ui',
  },

  // Next.js specific components (marked as requiring Next.js)
  'date-select': {
    title: 'DateSelect',
    description: 'Date selector/picker component using react-day-picker with format utilities.',
    files: ['src/components/date-select.tsx'],
    dependencies: ['react-day-picker', 'date-fns', '@radix-ui/react-popover', 'lucide-react'],
    registryDependencies: ['utils'],
    type: 'registry:ui',
  },
  image: {
    title: 'Image',
    description: 'Optimized image component with custom utilities. Note: Requires Next.js for next/image optimization.',
    files: ['src/components/image.tsx'],
    dependencies: [],
    registryDependencies: [],
    type: 'registry:ui',
  },
  'md-editor': {
    title: 'MdEditor',
    description: 'Markdown editor component using @uiw/react-md-editor. Note: Requires Next.js for dynamic imports.',
    files: ['src/components/md-editor.tsx'],
    dependencies: ['@uiw/react-md-editor', 'remark-gfm'],
    registryDependencies: [],
    type: 'registry:ui',
  },
  'contact-form': {
    title: 'CompactContactForm',
    description: 'Contact form component for user submissions.',
    files: ['src/components/contact-form.tsx'],
    dependencies: ['lucide-react'],
    registryDependencies: ['utils', 'input', 'button'],
    type: 'registry:block',
  },

  // Hooks
  'use-media-query': {
    title: 'useMediaQuery',
    description: 'Custom hook for responsive media query detection.',
    files: ['src/hooks/use-media-query.ts'],
    dependencies: [],
    registryDependencies: [],
    type: 'registry:hook',
  },
  'use-mobile': {
    title: 'useIsMobile',
    description: 'Hook to detect mobile device viewport.',
    files: ['src/hooks/use-mobile.ts'],
    dependencies: [],
    registryDependencies: ['use-media-query'],
    type: 'registry:hook',
  },
  'use-escape-key': {
    title: 'useEscapeKey',
    description: 'Hook for handling ESC key press events.',
    files: ['src/hooks/use-escape-key.ts'],
    dependencies: [],
    registryDependencies: [],
    type: 'registry:hook',
  },
  'use-contact-form': {
    title: 'useContactForm',
    description: 'Form handling hook for contact form submissions.',
    files: ['src/hooks/use-contact-form.ts'],
    dependencies: [],
    registryDependencies: [],
    type: 'registry:hook',
  },

  // Contexts
  'overlay-context': {
    title: 'OverlayProvider',
    description: 'Context provider for overlay state management across modals, alerts, and toasts.',
    files: ['src/contexts/overlay-context.tsx'],
    dependencies: [],
    registryDependencies: [],
    type: 'registry:lib',
  },
};

// Darwin UI CSS variables
const cssVars = {
  dark: {
    background: '0 0% 4%',
    foreground: '0 0% 95%',
    card: '0 0% 6%',
    'card-foreground': '0 0% 95%',
    border: '0 0% 15%',
    ring: '217.2 91.2% 59.8%',
    muted: '0 0% 15%',
    'muted-foreground': '0 0% 65%',
  },
};

function readFileContent(filePath: string): string {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: File not found: ${fullPath}`);
    return '';
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

function buildRegistryItem(name: string, def: ComponentDef): RegistryItem {
  const files = def.files.map((file) => ({
    path: file.replace('src/', ''),
    type: def.type,
    content: readFileContent(file),
  }));

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: def.type,
    title: def.title,
    description: def.description,
    dependencies: def.dependencies.length > 0 ? def.dependencies : undefined,
    registryDependencies: def.registryDependencies.length > 0 ? def.registryDependencies : undefined,
    files,
    cssVars: name === 'utils' ? cssVars : undefined,
  };
}

function buildRegistryIndex() {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'darwin-ui',
    homepage: 'https://darwin-ui.mandalsuraj.com',
    items: Object.entries(components).map(([name, def]) => ({
      name,
      type: def.type,
      title: def.title,
      description: def.description,
      dependencies: def.dependencies.length > 0 ? def.dependencies : undefined,
      registryDependencies: def.registryDependencies.length > 0 ? def.registryDependencies : undefined,
    })),
  };
}

// Build the registry
async function main() {
  // Ensure registry directory exists
  fs.mkdirSync(REGISTRY_DIR, { recursive: true });

  console.log('Building Darwin UI Registry...\n');

  // Build individual component registry files
  for (const [name, def] of Object.entries(components)) {
    const item = buildRegistryItem(name, def);
    const outputPath = path.join(REGISTRY_DIR, `${name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));
    console.log(`  Created: registry/${name}.json`);
  }

  // Build main registry index
  const index = buildRegistryIndex();
  const indexPath = path.join(REGISTRY_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`  Created: registry/index.json`);

  // Create styles registry entry
  const stylesItem: RegistryItem = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: 'styles',
    type: 'registry:style',
    title: 'Darwin UI Styles',
    description: 'Base styles and CSS variables for Darwin UI dark theme.',
    files: [
      {
        path: 'styles/darwin-ui.css',
        type: 'registry:style',
        content: readFileContent('src/styles/darwin-ui.css'),
      },
    ],
    cssVars,
  };
  const stylesPath = path.join(REGISTRY_DIR, 'styles.json');
  fs.writeFileSync(stylesPath, JSON.stringify(stylesItem, null, 2));
  console.log(`  Created: registry/styles.json`);

  console.log('\nRegistry build complete!');
  console.log(`Total items: ${Object.keys(components).length + 1}`);
}

main().catch(console.error);
