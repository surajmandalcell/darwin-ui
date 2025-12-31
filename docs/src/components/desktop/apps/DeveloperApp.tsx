"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  ChevronRight,
  BookOpen,
  Zap,
  Palette,
  Layout,
  MousePointer,
  Code2,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

interface DeveloperAppProps {
  windowState: WindowState;
}

// Documentation structure
const docSections = {
  'getting-started': {
    title: 'Getting Started',
    icon: <Zap className="w-4 h-4" />,
    pages: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'installation', title: 'Installation' },
      { id: 'quick-start', title: 'Quick Start' },
    ],
  },
  'components': {
    title: 'Components',
    icon: <Layout className="w-4 h-4" />,
    pages: [
      { id: 'button', title: 'Button' },
      { id: 'input', title: 'Input' },
      { id: 'checkbox', title: 'Checkbox' },
      { id: 'toggle', title: 'Toggle' },
      { id: 'select', title: 'Select' },
      { id: 'slider', title: 'Slider' },
      { id: 'window', title: 'Window' },
      { id: 'tooltip', title: 'Tooltip' },
      { id: 'alert', title: 'Alert' },
      { id: 'toast', title: 'Toast' },
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

// Code block with copy functionality
function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#1a1a1c] border border-white/10">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-xs text-white/50 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Introduction page content
function IntroductionPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Darwin UI
        </motion.h1>
        <motion.p
          className="text-xl text-white/70 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          A beautiful, macOS-inspired React component library with native-feeling
          interactions and buttery smooth animations.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { icon: <Zap className="w-5 h-5" />, title: 'Fast & Lightweight', desc: 'Tree-shakeable with zero runtime overhead' },
          { icon: <Palette className="w-5 h-5" />, title: 'Beautiful Design', desc: 'macOS-inspired aesthetics out of the box' },
          { icon: <Code2 className="w-5 h-5" />, title: 'TypeScript First', desc: 'Full type safety and IntelliSense support' },
          { icon: <MousePointer className="w-5 h-5" />, title: 'Accessible', desc: 'ARIA-compliant with keyboard navigation' },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-3">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-white/60">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Install</h2>
        <CodeBlock code="npm install @smc/darwin-ui" language="bash" />
      </motion.div>
    </motion.div>
  );
}

// Installation page content
function InstallationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Installation</h1>
        <p className="text-lg text-white/70">
          Get up and running with Darwin UI in minutes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Using npm</h2>
          <CodeBlock code="npm install @smc/darwin-ui" language="bash" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Using yarn</h2>
          <CodeBlock code="yarn add @smc/darwin-ui" language="bash" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Using pnpm</h2>
          <CodeBlock code="pnpm add @smc/darwin-ui" language="bash" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Using bun</h2>
          <CodeBlock code="bun add @smc/darwin-ui" language="bash" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-3">Peer Dependencies</h2>
        <p className="text-white/70 mb-4">
          Darwin UI requires React 18+ and Framer Motion for animations:
        </p>
        <CodeBlock
          code="npm install react react-dom framer-motion"
          language="bash"
        />
      </div>
    </motion.div>
  );
}

// Quick Start page content
function QuickStartPage() {
  const exampleCode = `import { Button, Window, Input } from '@smc/darwin-ui';

function App() {
  return (
    <Window title="My App" isOpen={true}>
      <div className="p-4 space-y-4">
        <Input placeholder="Enter your name" />
        <Button variant="primary">
          Get Started
        </Button>
      </div>
    </Window>
  );
}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Quick Start</h1>
        <p className="text-lg text-white/70">
          Build your first Darwin UI app in 5 minutes.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-3">Basic Example</h2>
        <p className="text-white/70 mb-4">
          Import components and start building immediately:
        </p>
        <CodeBlock code={exampleCode} language="tsx" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-3">What's Next?</h2>
        <div className="space-y-3">
          {[
            { title: 'Explore Components', desc: 'Browse all available components' },
            { title: 'Theming Guide', desc: 'Customize colors and styles' },
            { title: 'Examples', desc: 'See Darwin UI in action' },
          ].map((item) => (
            <motion.div
              key={item.title}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 cursor-pointer transition-colors"
              whileHover={{ x: 4 }}
            >
              <ChevronRight className="w-4 h-4 text-blue-400" />
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Generic component page
function ComponentPage({ name }: { name: string }) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
          <span>Components</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/70">{capitalizedName}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{capitalizedName}</h1>
        <p className="text-lg text-white/70">
          A beautiful, accessible {name} component with native macOS styling.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-3">Import</h2>
        <CodeBlock
          code={`import { ${capitalizedName} } from '@smc/darwin-ui';`}
          language="tsx"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-3">Usage</h2>
        <CodeBlock
          code={`<${capitalizedName} />`}
          language="tsx"
        />
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-medium text-white/50 mb-4">Preview</h3>
        <div className="flex items-center justify-center min-h-[100px]">
          <p className="text-white/40 text-sm">
            Open the Playground app to interact with this component
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Page content router
function PageContent({ section, page }: { section: string; page: string }) {
  if (section === 'getting-started') {
    switch (page) {
      case 'introduction':
        return <IntroductionPage />;
      case 'installation':
        return <InstallationPage />;
      case 'quick-start':
        return <QuickStartPage />;
    }
  }

  if (section === 'components') {
    return <ComponentPage name={page} />;
  }

  // Default fallback
  return (
    <div className="text-white/50">
      Content for {section}/{page} coming soon...
    </div>
  );
}

export function DeveloperApp({ windowState: _windowState }: DeveloperAppProps) {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activePage, setActivePage] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'components']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigateTo = (sectionId: string, pageId: string) => {
    setActiveSection(sectionId);
    setActivePage(pageId);
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  return (
    <div className="flex h-full bg-[#1e1e20]">
      {/* Sidebar */}
      <motion.div
        className="w-56 bg-[#161618] border-r border-white/10 flex flex-col overflow-hidden"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">Documentation</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {Object.entries(docSections).map(([sectionId, section]) => (
            <div key={sectionId}>
              <button
                onClick={() => toggleSection(sectionId)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                <motion.div
                  animate={{ rotate: expandedSections.includes(sectionId) ? 90 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>

              <AnimatePresence>
                {expandedSections.includes(sectionId) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-7 py-1 space-y-0.5">
                      {section.pages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => navigateTo(sectionId, page.id)}
                          className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                            activeSection === sectionId && activePage === page.id
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {page.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          <AnimatePresence mode="wait">
            <PageContent
              key={`${activeSection}-${activePage}`}
              section={activeSection}
              page={activePage}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DeveloperApp;
