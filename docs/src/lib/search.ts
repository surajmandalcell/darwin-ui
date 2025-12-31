import Fuse from 'fuse.js';
import { docsTree } from '../components/Sidebar';

export interface SearchableContent {
  id: string;
  title: string;
  description: string;
  path: string;
  section: string; // "Getting Started" | "Components" | "Hooks"
  keywords: string[];
}

// Build search index from documentation tree
export function buildSearchIndex(): SearchableContent[] {
  const index: SearchableContent[] = [];

  docsTree.forEach((section) => {
    section.items.forEach((item) => {
      const pathSegments = item.href.split('/');
      const category = pathSegments[2]; // "components", "hooks", "getting-started"

      index.push({
        id: item.href,
        title: item.title,
        description: getDescription(item.title, category),
        path: item.href,
        section: section.title,
        keywords: getKeywords(item.title, category),
      });
    });
  });

  return index;
}

// Get description for search results
function getDescription(title: string, _category: string): string {
  const descriptions: Record<string, string> = {
    // Getting Started
    'Introduction': 'Getting started with Darwin UI component library',
    'Installation': 'Install Darwin UI via NPM and configure your project',
    'Theming': 'Customize colors, styles, and design tokens',

    // Components
    'Button': '11 variants with hover states, loading, and icons',
    'Badge': 'Status indicators and labels with multiple variants',
    'Card': 'Container component with header, content, and footer',
    'Input': 'Text input with error/success states and animations',
    'Select': 'Dropdown selection with search and custom rendering',
    'Checkbox': 'Checkbox with indeterminate state and animations',
    'Switch': 'Toggle switch with smooth spring animations',
    'Table': 'Data table with sorting and custom cell rendering',
    'Modal': 'Dialog with backdrop, animations, and focus trap',
    'Toast': 'Notification system with auto-dismiss and variants',
    'Alert': 'Alert dialogs with confirmation and custom actions',
    'Charts': '6 chart types powered by Recharts',
    'Skeleton': 'Loading placeholders with pulse animation',

    // Hooks
    'useMediaQuery': 'React hook for responsive media query matching',
    'useIsMobile': 'Convenience hook for mobile device detection',
    'useEscapeKey': 'Hook to handle Escape key press events',
  };

  return descriptions[title] || `${title} documentation`;
}

// Get keywords for better search matching
function getKeywords(title: string, category: string): string[] {
  const baseKeywords = [title.toLowerCase(), category];

  const specificKeywords: Record<string, string[]> = {
    'Button': ['cta', 'action', 'click', 'submit', 'primary', 'secondary'],
    'Input': ['form', 'text field', 'textbox', 'validation'],
    'Select': ['dropdown', 'picker', 'options', 'menu'],
    'Modal': ['dialog', 'popup', 'overlay', 'lightbox'],
    'Toast': ['notification', 'snackbar', 'alert', 'message'],
    'Table': ['data', 'grid', 'rows', 'columns', 'sorting'],
    'Charts': ['graph', 'visualization', 'data viz', 'recharts'],
  };

  return [...baseKeywords, ...(specificKeywords[title] || [])];
}

// Create Fuse instance with optimized options
export function createSearchEngine(index: SearchableContent[]) {
  return new Fuse(index, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'keywords', weight: 0.2 },
    ],
    threshold: 0.3, // 0 = perfect match, 1 = match anything
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  });
}
