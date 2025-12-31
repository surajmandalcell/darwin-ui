export interface TechStackItem {
  name: string;
  logo: string; // SVG as string or URL
  url: string;
}

export const techStack: TechStackItem[] = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    url: 'https://react.dev',
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    url: 'https://tailwindcss.com',
  },
  {
    name: 'Vite',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    url: 'https://vitejs.dev',
  },
  {
    name: 'Framer Motion',
    logo: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg',
    url: 'https://www.framer.com/motion',
  },
  {
    name: 'Recharts',
    logo: 'https://recharts.org/img/favicon.ico',
    url: 'https://recharts.org',
  },
];
