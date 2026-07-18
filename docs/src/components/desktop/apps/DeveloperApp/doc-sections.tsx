import { Zap, Layout, Palette } from 'lucide-react';
import { docRoutes } from '../../../../../doc-routes';
import type { DocSection } from './types';

// Documentation structure
export const docSections: Record<string, DocSection> = {
  'getting-started': {
    title: 'Getting Started',
    icon: <Zap className="w-4 h-4" />,
    pages: docRoutes['getting-started'],
  },
  'components': {
    title: 'Components',
    icon: <Layout className="w-4 h-4" />,
    pages: docRoutes.components,
  },
  'theming': {
    title: 'Theming',
    icon: <Palette className="w-4 h-4" />,
    pages: docRoutes.theming,
  },
};
