import type { WindowState } from '../../../../contexts/desktop-context';

export interface DeveloperAppProps {
  windowState: WindowState;
  initialSection?: string;
  initialPage?: string;
}

export interface DocPage {
  id: string;
  title: string;
  group?: string;
}

export interface DocSection {
  title: string;
  icon: React.ReactNode;
  pages: DocPage[];
}

export interface SidebarNavItemProps {
  page: DocPage;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export interface DocsNavigationProps {
  activeSection: string;
  activePage: string;
  expandedSections: string[];
  toggleSection: (id: string) => void;
  navigateTo: (section: string, page: string) => void;
  onNavigate?: () => void;
  searchQuery?: string;
}

export interface PageContentProps {
  section: string;
  page: string;
  onNavigate?: (section: string, page: string) => void;
}
