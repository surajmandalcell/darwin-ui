import { Code, Eye, Palette, Moon } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: 'blue' | 'purple' | 'green' | 'gray';
}

export const features: Feature[] = [
  {
    title: 'TypeScript First',
    description:
      'Built with TypeScript from the ground up. Get full type safety, intelligent autocomplete, and catch errors before runtime.',
    icon: Code,
    accentColor: 'blue',
  },
  {
    title: 'Accessible',
    description:
      'WCAG 2.1 compliant with keyboard navigation, screen reader support, and proper ARIA labels. Accessibility is not optional.',
    icon: Eye,
    accentColor: 'purple',
  },
  {
    title: 'Customizable',
    description:
      'Tailwind CSS powered styling gives you complete control. Override defaults or create entirely new variants with ease.',
    icon: Palette,
    accentColor: 'green',
  },
  {
    title: 'Dark Mode',
    description:
      'Beautiful dark mode by default. All components are designed to look stunning in dark interfaces out of the box.',
    icon: Moon,
    accentColor: 'gray',
  },
];
