"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  BookOpen,
  Zap,
  Palette,
  Layers,
  Monitor,
  MousePointer,
  Code2,
  ExternalLink,
} from 'lucide-react';
import {
  Badge,
  Button,
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@pikoloo/darwin-ui';

// Import from local files
import { pageTransitionVariants, containerVariants, itemVariants, featureCardVariants, iconVariants } from './animations';
import { CodeBlock } from '../../../CodeBlock';
import { componentPreviews } from './previews';
import { componentCodeExamples } from './code-examples';

// Component preview wrapper with animations
function AnimatedPreviewWrapper({ children, componentKey }: { children: React.ReactNode; componentKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={componentKey}
        className="component-preview"
        initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          filter: "blur(4px)",
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Agentic Coding page - AI agent documentation access
export function AgenticCodingPage() {
  const context7Example = `Use Context7 to fetch Darwin UI documentation:
https://context7.com/surajmandalcell/darwin-ui`;

  const cursorPrompt = `When working with Darwin UI, always fetch the latest
documentation from Context7 first:

"Use context7 MCP to get Darwin UI docs before implementing"`;

  const claudePrompt = `For Darwin UI components, reference the latest docs:
- Context7: context7.com/surajmandalcell/darwin-ui
- Docs: darwin-ui.mandalsuraj.com`;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
          <Badge variant="new">New</Badge>
          <Badge variant="info">AI-Ready</Badge>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Agentic Coding
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Get up-to-date Darwin UI documentation directly in your AI coding assistant.
        </motion.p>
      </motion.div>

      {/* What is Agentic Coding */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">What is Agentic Coding?</h2>
        <p className="text-muted-foreground">
          Agentic coding uses AI assistants like Claude, Cursor, or GitHub Copilot to help you write code.
          The challenge? AI models have knowledge cutoffs and may not know about the latest API changes.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Solution:</strong> Use Context7 to give your AI assistant access to
          the latest Darwin UI documentation in real-time.
        </p>
      </motion.div>

      {/* Context7 Integration */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Context7 Integration</h2>
        <p className="text-muted-foreground">
          Darwin UI is indexed on Context7, providing structured documentation that AI agents can fetch and understand.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://context7.com/surajmandalcell/darwin-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-foreground">Context7 Library</h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">context7.com/surajmandalcell/darwin-ui</p>
            <p className="text-xs text-muted-foreground mt-2">Structured docs for AI agents</p>
          </a>

          <a
            href="https://darwin-ui.mandalsuraj.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-foreground">Documentation</h3>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">darwin-ui.mandalsuraj.com</p>
            <p className="text-xs text-muted-foreground mt-2">Human-readable documentation</p>
          </a>
        </div>
      </motion.div>

      {/* How to Use */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">How to Use</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">With Cursor / Claude Code</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you have Context7 MCP configured, simply ask your AI to fetch Darwin UI docs:
            </p>
            <CodeBlock code={cursorPrompt} language="bash" />
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Manual Reference</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Include this in your prompt to help AI find the latest docs:
            </p>
            <CodeBlock code={claudePrompt} language="bash" />
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Direct URL</h3>
            <p className="text-sm text-muted-foreground mb-3">
              AI agents can fetch documentation directly:
            </p>
            <CodeBlock code={context7Example} language="bash" />
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Always Up-to-Date', desc: 'AI gets the latest API and component changes' },
            { title: 'Accurate Code', desc: 'Reduces hallucinations and incorrect prop usage' },
            { title: 'Faster Development', desc: 'No need to manually copy-paste docs into prompts' },
            { title: 'Better Examples', desc: 'AI can reference real code examples from docs' },
          ].map((benefit) => (
            <div key={benefit.title} className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
              <div>
                <p className="font-medium text-foreground">{benefit.title}</p>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Introduction page content with enhanced animations
export function IntroductionPage() {
  const features = [
    { icon: <Layers className="w-5 h-5" />, title: 'Glass Morphism', desc: 'Translucent, frosted-glass effects with depth and elegance' },
    { icon: <Zap className="w-5 h-5" />, title: 'Framer Motion', desc: 'Buttery smooth animations with spring physics built-in' },
    { icon: <Palette className="w-5 h-5" />, title: 'Tailwind CSS', desc: 'Utility-first styling with full customization support' },
    { icon: <Code2 className="w-5 h-5" />, title: 'TypeScript First', desc: 'Full type safety and IntelliSense support' },
    { icon: <MousePointer className="w-5 h-5" />, title: 'Accessible', desc: 'ARIA-compliant with keyboard navigation' },
    { icon: <Monitor className="w-5 h-5" />, title: 'macOS Native Feel', desc: 'Authentic desktop experience in the browser' },
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Darwin UI
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground leading-relaxed"
          variants={itemVariants}
        >
          A beautiful, macOS-inspired React component library with native-feeling
          interactions and buttery smooth animations.
        </motion.p>
      </motion.div>

      {/* Design Philosophy */}
      <motion.div
        className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-3">Design Philosophy</h2>
        <p className="text-muted-foreground leading-relaxed">
          Darwin UI brings the polish and refinement of macOS to React applications.
          Every component is crafted with attention to detail—from subtle backdrop blurs
          and glass-morphism effects to spring-based animations that feel natural.
          We believe great UI should be both beautiful and functional, providing
          delightful interactions without sacrificing accessibility or performance.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="p-4 rounded-xl bg-muted/50 border border-border cursor-pointer"
            variants={featureCardVariants}
            custom={i}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-blue-400 mb-3"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              {feature.icon}
            </motion.div>
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Install</h2>
        <CodeBlock code="npm install @pikoloo/darwin-ui" language="bash" />
      </motion.div>
    </motion.div>
  );
}

// Installation page content with staggered animations
export function InstallationPage() {
  const installMethods = [
    { title: 'Using npm', code: 'npm install @pikoloo/darwin-ui' },
    { title: 'Using yarn', code: 'yarn add @pikoloo/darwin-ui' },
    { title: 'Using pnpm', code: 'pnpm add @pikoloo/darwin-ui' },
    { title: 'Using bun', code: 'bun add @pikoloo/darwin-ui' },
  ];

  const stylesImportCode = `// Import Darwin UI styles in your app entry point
import '@pikoloo/darwin-ui/styles.css';`;

  const providerSetupCode = `import {
  OverlayProvider,
  AlertProvider,
  ToastProvider
} from '@pikoloo/darwin-ui';

function App({ children }) {
  return (
    <OverlayProvider>
      <AlertProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AlertProvider>
    </OverlayProvider>
  );
}`;

  const firstComponentCode = `import { Button } from '@pikoloo/darwin-ui';

function MyComponent() {
  return (
    <div className="p-4 space-x-2">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}`;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Installation
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Get up and running with Darwin UI in minutes.
        </motion.p>
      </motion.div>

      {/* Step 1: Install Package */}
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-2xl font-semibold text-foreground">1. Install the Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {installMethods.map((method) => (
            <motion.div key={method.title} variants={itemVariants}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{method.title}</h3>
              <CodeBlock code={method.code} language="bash" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Step 2: Import Styles */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">2. Import Styles</h2>
        <p className="text-muted-foreground mb-4">
          Add the Darwin UI stylesheet to your application entry point (e.g., <code className="text-blue-400 bg-muted/50 px-1.5 py-0.5 rounded">_app.tsx</code>, <code className="text-blue-400 bg-muted/50 px-1.5 py-0.5 rounded">main.tsx</code>, or <code className="text-blue-400 bg-muted/50 px-1.5 py-0.5 rounded">layout.tsx</code>):
        </p>
        <CodeBlock code={stylesImportCode} language="typescript" />
      </motion.div>

      {/* Step 3: Setup Providers */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">3. Setup Providers</h2>
        <p className="text-muted-foreground mb-4">
          Wrap your application with Darwin UI providers to enable overlays, alerts, and toasts:
        </p>
        <CodeBlock code={providerSetupCode} language="typescript" />
      </motion.div>

      {/* Step 4: Use Components */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">4. Start Using Components</h2>
        <p className="text-muted-foreground mb-4">
          Import and use any Darwin UI component in your application:
        </p>
        <CodeBlock code={firstComponentCode} language="typescript" />
        <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground mb-3">Preview:</p>
          <div className="flex items-center gap-2">
            <Button type="button">Default</Button>
            <Button type="button" variant="primary">Primary</Button>
            <Button type="button" variant="secondary">Secondary</Button>
          </div>
        </div>
      </motion.div>

      {/* Peer Dependencies */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">Peer Dependencies</h2>
        <p className="text-muted-foreground mb-4">
          Darwin UI requires React 18+ and Framer Motion for animations:
        </p>
        <CodeBlock
          code="npm install react react-dom framer-motion"
          language="bash"
        />
      </motion.div>
    </motion.div>
  );
}

// ShadCN CLI documentation page
export function ShadcnCliPage() {
  const shadcnInstallCode = `# Add individual components via ShadCN CLI
npx shadcn@latest add https://darwin-ui.mandalsuraj.com/registry/button.json
npx shadcn@latest add https://darwin-ui.mandalsuraj.com/registry/card.json
npx shadcn@latest add https://darwin-ui.mandalsuraj.com/registry/input.json`;

  const npmInstallCode = `# Install the full package
npm install @pikoloo/darwin-ui`;

  const availableComponents = [
    'accordion', 'avatar', 'badge', 'button', 'card', 'checkbox',
    'close-button', 'context-menu', 'date-select', 'dialog',
    'dropdown-menu', 'image', 'input', 'modal', 'multi-select',
    'popover', 'progress', 'reveal', 'search-input', 'select',
    'sidebar', 'skeleton', 'slider', 'switch', 'table', 'tabs',
    'textarea', 'tooltip', 'upload', 'charts'
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          ShadCN CLI
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Darwin UI is fully compatible with ShadCN CLI for deep customization.
        </motion.p>
      </motion.div>

      {/* Two Methods Comparison */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Two Installation Methods</h2>
        <p className="text-muted-foreground">
          Choose the method that best fits your project needs:
        </p>

        <div className="grid grid-cols-1 gap-4">
          {/* Method 1: Full Package */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="success">Recommended</Badge>
              <h3 className="font-semibold text-foreground">npm install</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Install the complete package. Get all components, automatic updates, and tree-shaking.
            </p>
            <CodeBlock code={npmInstallCode} language="bash" />
            <div className="text-xs text-muted-foreground/70 space-y-1">
              <p>+ All components included</p>
              <p>+ Automatic updates via npm</p>
              <p>+ Tree-shaking removes unused code</p>
            </div>
          </div>

          {/* Method 2: ShadCN CLI */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Advanced</Badge>
              <h3 className="font-semibold text-foreground">ShadCN CLI</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy component source code into your project for deep customization.
            </p>
            <CodeBlock code={shadcnInstallCode} language="bash" />
            <div className="text-xs text-muted-foreground/70 space-y-1">
              <p>+ Full control over component code</p>
              <p>+ Customize internals freely</p>
              <p>+ No external dependency</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* When to Use Each */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">When to Use Each Method</h2>
        <div className="overflow-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Scenario</TableHeaderCell>
                <TableHeaderCell>Recommended</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>New project using Darwin UI throughout</TableCell>
                <TableCell><Badge variant="success">npm install</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Adding a few components to existing ShadCN project</TableCell>
                <TableCell><Badge variant="secondary">ShadCN CLI</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Need to modify component internals</TableCell>
                <TableCell><Badge variant="secondary">ShadCN CLI</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Want automatic updates</TableCell>
                <TableCell><Badge variant="success">npm install</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Building a design system on top</TableCell>
                <TableCell><Badge variant="secondary">ShadCN CLI</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Available Components */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Available Registry Components</h2>
        <p className="text-muted-foreground">
          All these components can be installed via ShadCN CLI:
        </p>
        <div className="flex flex-wrap gap-2">
          {availableComponents.map((comp) => (
            <Badge key={comp} variant="outline" className="text-xs">
              {comp}
            </Badge>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-400">
            <strong>Registry URL pattern:</strong>
            <code className="ml-2 bg-muted px-2 py-0.5 rounded">
              https://darwin-ui.mandalsuraj.com/registry/[component].json
            </code>
          </p>
        </div>
      </motion.div>

      {/* Customization Workflow */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Customization Workflow</h2>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">1</div>
            <div>
              <p className="font-medium text-foreground">Install component via CLI</p>
              <p className="text-sm text-muted-foreground">Component source is copied to your project (usually <code className="bg-muted px-1 rounded">components/ui/</code>)</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">2</div>
            <div>
              <p className="font-medium text-foreground">Dependencies installed automatically</p>
              <p className="text-sm text-muted-foreground">Required packages like framer-motion are added to your package.json</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">3</div>
            <div>
              <p className="font-medium text-foreground">Customize freely</p>
              <p className="text-sm text-muted-foreground">Modify styles, props, behavior - the code is yours</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Quick Start page content with enhanced animations
export function QuickStartPage({ onNavigate }: { onNavigate?: (section: string, page: string) => void }) {
  const exampleCode = `import { Button, Window, Input } from '@pikoloo/darwin-ui';

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

  const nextSteps = [
    { title: 'Explore Components', desc: 'Browse all available components', section: 'components', page: 'button' },
    { title: 'Theming Guide', desc: 'Customize colors and styles', section: 'theming', page: 'colors' },
    { title: 'Installation', desc: 'Set up Darwin UI in your project', section: 'getting-started', page: 'installation' },
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Quick Start
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Build your first Darwin UI app in 5 minutes.
        </motion.p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-3">Basic Example</h2>
        <p className="text-muted-foreground mb-4">
          Import components and start building immediately:
        </p>
        <CodeBlock code={exampleCode} language="tsx" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-xl font-semibold text-foreground mb-3"
          variants={itemVariants}
        >
          What&apos;s Next?
        </motion.h2>
        <div className="space-y-3">
          {nextSteps.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border cursor-pointer transition-colors"
              variants={itemVariants}
              custom={i}
              whileHover={{
                x: 8,
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate?.(item.section, item.page)}
            >
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </motion.div>
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// CSS Isolation page - using Darwin UI with other CSS libraries
export function CssIsolationPage() {
  const cssLayersExample = `/* In your global CSS file (e.g., globals.css) */
@layer base, darwin-ui, components, utilities;

/* Import Darwin UI in its own layer */
@import '@pikoloo/darwin-ui/styles.css' layer(darwin-ui);

/* Your custom styles go in the components/utilities layers */
@layer components {
  .my-custom-button {
    /* These styles won't conflict with Darwin UI */
  }
}`;

  const tailwindConfigExample = `// tailwind.config.js
module.exports = {
  // Use a prefix to avoid class collisions
  prefix: 'tw-',

  // Or use important: true if Darwin UI should take precedence
  // important: true,

  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}

/* Now Tailwind classes use prefix: tw-flex, tw-p-4, tw-text-white */
/* Darwin UI classes remain unchanged */`;

  const cssVariablesExample = `/* Darwin UI uses CSS variables for theming */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --border: 220 13% 91%;
  /* ... other variables */
}

/* Override specific variables for your brand */
:root {
  --primary: 210 100% 50%;  /* Your brand color */
}

/* Or scope overrides to specific sections */
.marketing-section {
  --primary: 340 82% 52%;  /* Different accent for marketing */
}`;

  const importOrderExample = `/* CORRECT: Darwin UI first, then your overrides */
import '@pikoloo/darwin-ui/styles.css';
import './your-styles.css';  /* Your styles override Darwin UI */

/* OR with CSS @import */
@import '@pikoloo/darwin-ui/styles.css';
@import './your-tailwind.css';  /* Tailwind utilities last */`;

  const troubleshootingCode = `/* Problem: Tailwind's reset overrides Darwin UI */
/* Solution: Exclude Darwin UI elements from Tailwind's preflight */

// tailwind.config.js
module.exports = {
  corePlugins: {
    preflight: false,  // Disable Tailwind's reset completely
  },
}

/* Or use @layer to control specificity */
@layer base {
  /* Tailwind reset styles */
}
@layer darwin-ui {
  /* Darwin UI styles (higher specificity) */
}`;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
          <Badge variant="info">Integration Guide</Badge>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          CSS Isolation
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Using Darwin UI alongside Tailwind, Bootstrap, or other CSS frameworks without conflicts.
        </motion.p>
      </motion.div>

      {/* Why CSS Isolation Matters */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Why CSS Isolation Matters</h2>
        <p className="text-muted-foreground">
          When multiple CSS frameworks coexist, they can conflict through:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
          <li><strong className="text-foreground">CSS resets</strong> - Tailwind&apos;s Preflight can override Darwin UI&apos;s base styles</li>
          <li><strong className="text-foreground">Class name collisions</strong> - Shared utility class names like <code className="text-blue-400 bg-muted/50 px-1 rounded">.border</code> or <code className="text-blue-400 bg-muted/50 px-1 rounded">.shadow</code></li>
          <li><strong className="text-foreground">Specificity wars</strong> - Both frameworks competing for the same selectors</li>
          <li><strong className="text-foreground">CSS variable conflicts</strong> - Same variable names with different values</li>
        </ul>
      </motion.div>

      {/* Method 1: CSS Layers */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Method 1: CSS Layers (Recommended)</h2>
        <p className="text-muted-foreground">
          CSS <code className="text-blue-400 bg-muted/50 px-1 rounded">@layer</code> gives you explicit control over cascade order.
          Later layers have higher specificity.
        </p>
        <CodeBlock code={cssLayersExample} language="css" />
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm text-emerald-400">
            <strong>Pro tip:</strong> CSS layers are supported in all modern browsers (Chrome 99+, Firefox 97+, Safari 15.4+).
          </p>
        </div>
      </motion.div>

      {/* Method 2: Import Order */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Method 2: Import Order</h2>
        <p className="text-muted-foreground">
          The simplest approach: import Darwin UI first, then your custom styles. Later imports override earlier ones.
        </p>
        <CodeBlock code={importOrderExample} language="typescript" />
      </motion.div>

      {/* Method 3: Tailwind Prefix */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Method 3: Tailwind Prefix</h2>
        <p className="text-muted-foreground">
          Add a prefix to all Tailwind classes to eliminate any possibility of collision.
        </p>
        <CodeBlock code={tailwindConfigExample} language="javascript" />
      </motion.div>

      {/* CSS Variables */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">CSS Variables Strategy</h2>
        <p className="text-muted-foreground">
          Darwin UI uses CSS variables for all colors and theming. You can override specific variables
          without replacing the entire stylesheet.
        </p>
        <CodeBlock code={cssVariablesExample} language="css" />
      </motion.div>

      {/* Troubleshooting */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Troubleshooting</h2>
        <p className="text-muted-foreground">
          If Tailwind&apos;s reset (Preflight) is overriding Darwin UI styles:
        </p>
        <CodeBlock code={troubleshootingCode} language="javascript" />
      </motion.div>

      {/* Quick Reference Table */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-foreground">Quick Reference</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Scenario</TableHeaderCell>
              <TableHeaderCell>Recommended Solution</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>New project with Tailwind</TableCell>
              <TableCell>CSS Layers or import order</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Existing Tailwind project</TableCell>
              <TableCell>Tailwind prefix + CSS layers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bootstrap project</TableCell>
              <TableCell>CSS layers (Bootstrap last)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Only Darwin UI</TableCell>
              <TableCell>No isolation needed</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  );
}

// Generic component page with enhanced animations
export function ComponentPage({ name }: { name: string }) {
  // Convert kebab-case to PascalCase for display
  const displayName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const PreviewComponent = componentPreviews[name];
  const codeExample = componentCodeExamples[name];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
          variants={itemVariants}
        >
          <span>Components</span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            <ChevronRight className="w-3 h-3" />
          </motion.div>
          <span className="text-muted-foreground">{displayName}</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          {displayName}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          A beautiful, accessible {name.replace(/-/g, ' ')} component with native macOS styling.
        </motion.p>
      </motion.div>

      <motion.div
        className="p-6 rounded-xl bg-muted/50 border border-border overflow-hidden"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="text-sm font-medium text-muted-foreground mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Preview
        </motion.h3>
        <div className="flex items-center justify-center min-h-[100px] p-4 w-full">
          <div className="w-full">
            <AnimatedPreviewWrapper componentKey={name}>
              {PreviewComponent ? (
                <PreviewComponent key={name} />
              ) : (
                <p className="text-muted-foreground text-sm text-center">No preview available</p>
              )}
            </AnimatedPreviewWrapper>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-xl font-semibold text-foreground mb-3"
          variants={itemVariants}
        >
          Import
        </motion.h2>
        <motion.div variants={itemVariants}>
          <CodeBlock
            code={codeExample?.importCode || `import { ${displayName} } from '@pikoloo/darwin-ui';`}
            language="tsx"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-xl font-semibold text-foreground mb-3"
          variants={itemVariants}
        >
          Usage
        </motion.h2>
        <motion.div variants={itemVariants}>
          <CodeBlock
            code={codeExample?.usageCode || `<${displayName} />`}
            language="tsx"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Colors theming page
export function ColorsPage() {
  const cssVariablesCode = `/* Darwin UI CSS Variables */
:root {
  /* Primary accent colors */
  --darwin-accent-blue: 59 130 246;
  --darwin-accent-purple: 168 85 247;
  --darwin-accent-green: 34 197 94;
  --darwin-accent-orange: 249 115 22;

  /* Semantic colors */
  --darwin-success: 34 197 94;
  --darwin-warning: 234 179 8;
  --darwin-destructive: 239 68 68;
  --darwin-info: 59 130 246;

  /* Surface colors */
  --darwin-surface: 255 255 255;
  --darwin-surface-elevated: 255 255 255;
  --darwin-border: 0 0 0 / 0.1;
}`;

  const accentUsageCode = `import { Button, Badge } from '@pikoloo/darwin-ui';

// Use accent colors via component variants
<Button variant="primary">Blue Accent</Button>

// Or apply custom accent via className
<Button className="bg-purple-500 hover:bg-purple-600">
  Purple Button
</Button>

// Badge variants map to accent colors
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="info">Info</Badge>`;

  const accentColors = [
    { name: 'Blue', color: 'bg-blue-500', hex: '#3B82F6' },
    { name: 'Purple', color: 'bg-purple-500', hex: '#A855F7' },
    { name: 'Green', color: 'bg-green-500', hex: '#22C55E' },
    { name: 'Orange', color: 'bg-orange-500', hex: '#F97316' },
  ];

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
          variants={itemVariants}
        >
          <span>Theming</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-muted-foreground">Colors</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Colors
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Darwin UI uses CSS variables for consistent, customizable colors across all components.
        </motion.p>
      </motion.div>

      {/* Accent Colors Preview */}
      <motion.div
        className="p-6 rounded-xl bg-muted/50 border border-border"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">Accent Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accentColors.map((accent, i) => (
            <motion.div
              key={accent.name}
              className="text-center"
              variants={itemVariants}
              custom={i}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-full h-16 rounded-lg ${accent.color} mb-2`} />
              <p className="text-foreground font-medium">{accent.name}</p>
              <p className="text-muted-foreground text-sm font-mono">{accent.hex}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badge Variants */}
      <motion.div
        className="p-6 rounded-xl bg-muted/50 border border-border"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.25 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">Semantic Colors</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { variant: undefined, label: 'Default' },
            { variant: 'secondary' as const, label: 'Secondary' },
            { variant: 'success' as const, label: 'Success' },
            { variant: 'warning' as const, label: 'Warning' },
            { variant: 'destructive' as const, label: 'Destructive' },
            { variant: 'info' as const, label: 'Info' },
          ].map((badge) => (
            <Badge key={badge.label} variant={badge.variant}>{badge.label}</Badge>
          ))}
        </div>
      </motion.div>

      {/* CSS Variables Reference */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">CSS Variables Reference</h2>
        <p className="text-muted-foreground mb-4">
          All colors are defined as CSS custom properties using RGB values for easy opacity manipulation:
        </p>
        <CodeBlock code={cssVariablesCode} language="css" />
      </motion.div>

      {/* Usage Examples */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">Usage Examples</h2>
        <CodeBlock code={accentUsageCode} language="typescript" />
      </motion.div>
    </motion.div>
  );
}

// Dark Mode theming page
export function DarkModePage() {
  const themeProviderCode = `import { ThemeProvider } from '@pikoloo/darwin-ui';

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="darwin-theme">
      {children}
    </ThemeProvider>
  );
}`;

  const useThemeCode = `import { useTheme } from '@pikoloo/darwin-ui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}`;

  const localStorageNote = `// Theme preference is automatically persisted to localStorage
// using the key specified in ThemeProvider

// Default behavior:
// - 'system': Follows OS preference
// - 'light': Always light mode
// - 'dark': Always dark mode

// The storageKey prop determines the localStorage key:
localStorage.getItem('darwin-theme'); // Returns: 'light' | 'dark' | 'system'`;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
          variants={itemVariants}
        >
          <span>Theming</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-muted-foreground">Dark Mode</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Dark Mode
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Darwin UI supports automatic dark mode with system preference detection and localStorage persistence.
        </motion.p>
      </motion.div>

      {/* Preview */}
      <motion.div
        className="p-6 rounded-xl bg-muted/50 border border-border"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">Preview</h3>
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
          <div className="flex gap-2">
            <Button type="button" variant="secondary" size="sm">Light</Button>
            <Button type="button" variant="primary" size="sm">Dark</Button>
          </div>
        </div>
      </motion.div>

      {/* ThemeProvider Setup */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">ThemeProvider Setup</h2>
        <p className="text-muted-foreground mb-4">
          Wrap your application with ThemeProvider to enable dark mode support:
        </p>
        <CodeBlock code={themeProviderCode} language="typescript" />
      </motion.div>

      {/* localStorage Persistence */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">localStorage Persistence</h2>
        <p className="text-muted-foreground mb-4">
          Theme preference is automatically saved and restored from localStorage:
        </p>
        <CodeBlock code={localStorageNote} language="typescript" />
      </motion.div>

      {/* Toggle Implementation */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">Toggle Implementation</h2>
        <p className="text-muted-foreground mb-4">
          Use the <code className="text-blue-400 bg-muted/50 px-1.5 py-0.5 rounded">useTheme</code> hook to access and change the current theme:
        </p>
        <CodeBlock code={useThemeCode} language="typescript" />
      </motion.div>
    </motion.div>
  );
}

// Customization theming page
export function CustomizationPage() {
  const cssOverridesCode = `/* Override Darwin UI CSS variables in your stylesheet */
:root {
  /* Change the primary accent to your brand color */
  --darwin-accent-blue: 99 102 241; /* Indigo */

  /* Customize surface colors */
  --darwin-surface: 15 23 42;
  --darwin-surface-elevated: 30 41 59;

  /* Adjust border opacity */
  --darwin-border: 255 255 255 / 0.1;
}

/* Target specific components */
.darwin-button-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.darwin-card {
  backdrop-filter: blur(20px);
}`;

  const classNameCode = `import { Button, Card } from '@pikoloo/darwin-ui';

// All components accept className for custom styling
<Button
  className="bg-gradient-to-r from-pink-500 to-violet-500
             hover:from-pink-600 hover:to-violet-600"
>
  Gradient Button
</Button>

<Card className="border-2 border-dashed border-blue-500/50">
  <CardContent>Custom bordered card</CardContent>
</Card>

// Combine with Tailwind utilities
<Input
  className="focus:ring-2 focus:ring-purple-500
             focus:border-transparent"
  placeholder="Purple focus ring"
/>`;

  const tailwindConfigCode = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        darwin: {
          surface: 'rgb(var(--darwin-surface) / <alpha-value>)',
          accent: 'rgb(var(--darwin-accent-blue) / <alpha-value>)',
          success: 'rgb(var(--darwin-success) / <alpha-value>)',
          warning: 'rgb(var(--darwin-warning) / <alpha-value>)',
          destructive: 'rgb(var(--darwin-destructive) / <alpha-value>)',
        },
      },
    },
  },
};

// Usage with extended colors:
// <div className="bg-darwin-surface text-darwin-accent">`;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
          variants={itemVariants}
        >
          <span>Theming</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-muted-foreground">Customization</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Customization
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Customize Darwin UI components to match your brand with CSS variables, className props, and Tailwind integration.
        </motion.p>
      </motion.div>

      {/* Preview */}
      <motion.div
        className="p-6 rounded-xl bg-muted/50 border border-border"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">Customization Examples</h3>
        <div className="flex flex-wrap gap-3">
          <Button type="button" className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
            Gradient
          </Button>
          <Button type="button" className="bg-emerald-500 hover:bg-emerald-600">
            Custom Green
          </Button>
          <Button type="button" variant="secondary" className="border-2 border-dashed">
            Dashed Border
          </Button>
        </div>
      </motion.div>

      {/* CSS Variable Overrides */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">CSS Variable Overrides</h2>
        <p className="text-muted-foreground mb-4">
          Override CSS custom properties to change colors globally across all components:
        </p>
        <CodeBlock code={cssOverridesCode} language="css" />
      </motion.div>

      {/* className Prop */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">Component className Prop</h2>
        <p className="text-muted-foreground mb-4">
          Every Darwin UI component accepts a <code className="text-blue-400 bg-muted/50 px-1.5 py-0.5 rounded">className</code> prop for inline customization:
        </p>
        <CodeBlock code={classNameCode} language="typescript" />
      </motion.div>

      {/* Tailwind Integration */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">Tailwind CSS Integration</h2>
        <p className="text-muted-foreground mb-4">
          Extend your Tailwind config to use Darwin UI&apos;s CSS variables as custom colors:
        </p>
        <CodeBlock code={tailwindConfigCode} language="javascript" />
      </motion.div>
    </motion.div>
  );
}

// Theming page router
export function ThemingPage({ name }: { name: string }) {
  switch (name) {
    case 'colors':
      return <ColorsPage />;
    case 'dark-mode':
      return <DarkModePage />;
    case 'customization':
      return <CustomizationPage />;
    default:
      return (
        <motion.div
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Theming content for {name} coming soon...
        </motion.div>
      );
  }
}

// Page content router
export function PageContent({ section, page, onNavigate }: { section: string; page: string; onNavigate?: (section: string, page: string) => void }) {
  if (section === 'getting-started') {
    switch (page) {
      case 'agentic-coding':
        return <AgenticCodingPage />;
      case 'introduction':
        return <IntroductionPage />;
      case 'installation':
        return <InstallationPage />;
      case 'shadcn-cli':
        return <ShadcnCliPage />;
      case 'quick-start':
        return <QuickStartPage onNavigate={onNavigate} />;
      case 'css-isolation':
        return <CssIsolationPage />;
    }
  }

  if (section === 'components') {
    return <ComponentPage name={page} />;
  }

  if (section === 'theming') {
    return <ThemingPage name={page} />;
  }

  // Default fallback
  return (
    <motion.div
      className="text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content for {section}/{page} coming soon...
    </motion.div>
  );
}

export default PageContent;
