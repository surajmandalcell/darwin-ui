import type { WindowState } from '../../../../contexts/desktop-context';

export interface DeveloperAppProps {
  windowState: WindowState;
  initialSection?: string;
  initialPage?: string;
}

export interface DocSection {
  title: string;
  icon: React.ReactNode;
  pages: { id: string; title: string }[];
}

export interface SidebarNavItemProps {
  page: { id: string; title: string };
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
}

export interface PageContentProps {
  section: string;
  page: string;
  onNavigate?: (section: string, page: string) => void;
}
