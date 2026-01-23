import { docSections } from './doc-sections';

// Generate markdown context for AI from current page
export function generatePageContext(section: string, page: string): string {
  const sectionData = docSections[section as keyof typeof docSections];
  const pageData = sectionData?.pages.find(p => p.id === page);
  const pageTitle = pageData?.title || page;
  const sectionTitle = sectionData?.title || section;

  let context = `# Darwin UI Documentation\n\n`;
  context += `## ${sectionTitle} > ${pageTitle}\n\n`;

  // Add relevant context based on section/page
  if (section === 'getting-started') {
    if (page === 'introduction') {
      context += `Darwin UI is a macOS-inspired React component library with:\n`;
      context += `- Glass-morphism effects with backdrop blur\n`;
      context += `- Framer Motion animations with spring physics\n`;
      context += `- Tailwind CSS styling\n`;
      context += `- Full TypeScript support\n`;
      context += `- ARIA-compliant accessibility\n\n`;
    } else if (page === 'installation') {
      context += `### Installation\n\n`;
      context += `\`\`\`bash\nnpm install @pikoloo/darwin-ui\n\`\`\`\n\n`;
      context += `### Peer Dependencies\n`;
      context += `- react >= 18\n- react-dom >= 18\n- framer-motion >= 10\n- tailwindcss >= 3\n\n`;
    }
  } else if (section === 'components') {
    context += `### Component: ${pageTitle}\n\n`;
    context += `Import: \`import { ${pageTitle} } from '@pikoloo/darwin-ui'\`\n\n`;
    context += `This is a Darwin UI component. For detailed props and examples, refer to the documentation.\n\n`;
  } else if (section === 'theming') {
    context += `### Theming: ${pageTitle}\n\n`;
    context += `Darwin UI supports dark theme by default with customizable CSS variables.\n\n`;
  }

  context += `---\n`;
  context += `Source: Darwin UI Documentation - ${sectionTitle}/${pageTitle}\n`;

  return context;
}
