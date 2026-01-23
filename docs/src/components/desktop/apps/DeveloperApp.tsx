"use client";

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  ChevronRight,
  BookOpen,
  Zap,
  Palette,
  Layout,
  Layers,
  Monitor,
  MousePointer,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Menu,
  X,
  Plus,
  Settings,
  Heart,
  Share2,
  Trash2,
  Download,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarGroup,
  Button,
  Input,
  Checkbox,
  Switch,
  Select,
  Badge,
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  DateSelect,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Image,
  Modal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
  CircularProgress,
  Reveal,
  SearchInput,
  Sidebar,
  Slider,
  MultiSelect,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Upload,
  ContextMenu,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  DonutChart,
  StackedBarChart,
  CloseButton,
} from '@pikoloo/darwin-ui';

interface DeveloperAppProps {
  windowState: WindowState;
  initialSection?: string;
  initialPage?: string;
}

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
} as const;

// Page transition variants
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)"
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
} as const;

// Feature card variants (no hover border glow)
const featureCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
} as const;

// Icon animation variants
const iconVariants = {
  initial: { rotate: 0 },
  hover: {
    rotate: [0, -10, 10, -5, 5, 0],
    scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const
    }
  }
};

// Sidebar navigation variants
const sidebarItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  })
};

// Code block variants (no hover glow)
const codeBlockVariants = {
  initial: {
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  hover: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    transition: {
      duration: 0.3
    }
  }
} as const;

// Documentation structure
const docSections = {
  'getting-started': {
    title: 'Getting Started',
    icon: <Zap className="w-4 h-4" />,
    pages: [
      { id: 'agentic-coding', title: 'Agentic Coding' },
      { id: 'introduction', title: 'Introduction' },
      { id: 'installation', title: 'Installation' },
      { id: 'shadcn-cli', title: 'ShadCN CLI' },
      { id: 'quick-start', title: 'Quick Start' },
    ],
  },
  'components': {
    title: 'Components',
    icon: <Layout className="w-4 h-4" />,
    pages: [
      { id: 'accordion', title: 'Accordion' },
      { id: 'avatar', title: 'Avatar' },
      { id: 'badge', title: 'Badge' },
      { id: 'button', title: 'Button' },
      { id: 'card', title: 'Card' },
      { id: 'charts', title: 'Charts' },
      { id: 'checkbox', title: 'Checkbox' },
      { id: 'close-button', title: 'CloseButton' },
      { id: 'contact-form', title: 'ContactForm' },
      { id: 'context-menu', title: 'ContextMenu' },
      { id: 'date-select', title: 'DateSelect' },
      { id: 'dialog', title: 'Dialog' },
      { id: 'dropdown-menu', title: 'DropdownMenu' },
      { id: 'image', title: 'Image' },
      { id: 'input', title: 'Input' },
      { id: 'md-editor', title: 'MdEditor' },
      { id: 'modal', title: 'Modal' },
      { id: 'multi-select', title: 'MultiSelect' },
      { id: 'popover', title: 'Popover' },
      { id: 'progress', title: 'Progress' },
      { id: 'reveal', title: 'Reveal' },
      { id: 'search-input', title: 'SearchInput' },
      { id: 'select', title: 'Select' },
      { id: 'sidebar', title: 'Sidebar' },
      { id: 'skeleton', title: 'Skeleton' },
      { id: 'slider', title: 'Slider' },
      { id: 'switch', title: 'Switch' },
      { id: 'table', title: 'Table' },
      { id: 'tabs', title: 'Tabs' },
      { id: 'textarea', title: 'Textarea' },
      { id: 'tooltip', title: 'Tooltip' },
      { id: 'upload', title: 'Upload' },
      { id: 'window', title: 'Window' },
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

// Code block with copy functionality and animations
function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="relative group rounded-lg overflow-hidden bg-card border border-foreground/10 shadow-sm"
      variants={codeBlockVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-foreground/10">
        <motion.span
          className="text-xs text-muted-foreground font-mono"
          animate={{ opacity: isHovered ? 0.8 : 0.5 }}
        >
          {language}
        </motion.span>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground/90 hover:bg-muted rounded transition-colors overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-1.5"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Check className="w-3 h-3 text-green-400" />
                </motion.div>
                <span className="text-green-400">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <motion.pre
        className="p-4 overflow-x-auto text-sm font-mono text-foreground/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <motion.code
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {code}
        </motion.code>
      </motion.pre>
    </motion.div>
  );
}

// Agentic Coding page - AI agent documentation access
function AgenticCodingPage() {
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
            <CodeBlock code={cursorPrompt} language="text" />
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Manual Reference</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Include this in your prompt to help AI find the latest docs:
            </p>
            <CodeBlock code={claudePrompt} language="text" />
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Direct URL</h3>
            <p className="text-sm text-muted-foreground mb-3">
              AI agents can fetch documentation directly:
            </p>
            <CodeBlock code={context7Example} language="text" />
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
function IntroductionPage() {
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
function InstallationPage() {
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
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
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
function ShadcnCliPage() {
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
              <p>✓ All components included</p>
              <p>✓ Automatic updates via npm</p>
              <p>✓ Tree-shaking removes unused code</p>
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
              <p>✓ Full control over component code</p>
              <p>✓ Customize internals freely</p>
              <p>✓ No external dependency</p>
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
function QuickStartPage({ onNavigate }: { onNavigate?: (section: string, page: string) => void }) {
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
          What's Next?
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

// Component preview wrapper with animations
function AnimatedPreviewWrapper({ children, componentKey }: { children: React.ReactNode; componentKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={componentKey}
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

// Button preview with micro-interactions
function ButtonPreview() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Text Buttons */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Text Buttons</div>
        <div className="flex flex-wrap gap-3">
          {[
            { variant: 'primary' as const, label: 'Primary' },
            { variant: 'secondary' as const, label: 'Secondary' },
            { variant: 'outline' as const, label: 'Outline' },
            { variant: 'ghost' as const, label: 'Ghost' },
            { variant: 'destructive' as const, label: 'Destructive' },
          ].map((btn, i) => (
            <motion.div
              key={btn.variant}
              variants={itemVariants}
              custom={i}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant={btn.variant}>{btn.label}</Button>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="primary" loading={loading} onClick={handleLoadingClick}>
              {loading ? 'Loading...' : 'Click me'}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Icon Buttons */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Icon Buttons</div>
        <div className="flex flex-wrap gap-3 items-center">
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="secondary" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">With Icons</div>
        <div className="flex flex-wrap gap-3">
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function InputPreview() {
  const [value, setValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [successValue, setSuccessValue] = useState('Valid input');

  return (
    <motion.div
      className="flex flex-col gap-3 w-full max-w-xs"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {[
        { placeholder: 'Type something...', value, onChange: setValue, state: {} },
        { placeholder: 'Error state', value: errorValue, onChange: setErrorValue, state: { error: true } },
        { placeholder: 'Success state', value: successValue, onChange: setSuccessValue, state: { success: true } },
      ].map((input, i) => (
        <motion.div
          key={input.placeholder}
          variants={itemVariants}
          custom={i}
          whileFocus={{ scale: 1.02 }}
        >
          <Input
            placeholder={input.placeholder}
            value={input.value}
            onChange={(e) => input.onChange(e.target.value)}
            {...input.state}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function CheckboxPreview() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {[
        { label: 'Unchecked option', checked: checked1, onChange: setChecked1 },
        { label: 'Checked option', checked: checked2, onChange: setChecked2 },
        { label: 'Indeterminate', checked: checked3, onChange: setChecked3, indeterminate: !checked3 },
      ].map((cb, i) => (
        <motion.div
          key={cb.label}
          variants={itemVariants}
          custom={i}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Checkbox
            label={cb.label}
            checked={cb.checked}
            onChange={cb.onChange}
            indeterminate={cb.indeterminate}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function SelectPreview() {
  const [value, setValue] = useState('option1');

  return (
    <motion.div
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </motion.div>
    </motion.div>
  );
}

function WindowPreview() {
  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-muted/50">
          <motion.div
            className="flex gap-1.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((color, i) => (
              <motion.div
                key={color}
                className={`w-3 h-3 rounded-full ${color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 500, damping: 15 }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
          <motion.div
            className="text-xs font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            My Window
          </motion.div>
          <div className="w-12" />
        </div>
        <motion.div
          className="p-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Window content goes here...
        </motion.div>
      </div>
    </motion.div>
  );
}

// Badge Preview
function BadgePreview() {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {[
        { variant: undefined, label: 'Default' },
        { variant: 'secondary' as const, label: 'Secondary' },
        { variant: 'outline' as const, label: 'Outline' },
        { variant: 'success' as const, label: 'Success' },
        { variant: 'warning' as const, label: 'Warning' },
        { variant: 'destructive' as const, label: 'Destructive' },
        { variant: 'info' as const, label: 'Info' },
        { variant: 'new' as const, label: 'New' },
      ].map((badge, i) => (
        <motion.div
          key={badge.label}
          variants={itemVariants}
          custom={i}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge variant={badge.variant}>{badge.label}</Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Card Preview
function CardPreview() {
  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description of the card content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Cards can contain any content including text, images, and other components.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="primary" size="sm">Action</Button>
          <Button variant="ghost" size="sm">Cancel</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Charts Preview with dynamic switching
type ChartType = 'bar' | 'line' | 'area' | 'stacked' | 'pie' | 'donut';

function ChartsPreview() {
  const [chartType, setChartType] = useState<ChartType>('bar');

  // Time-series data for bar/line/area/stacked
  const timeSeriesData = [
    { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { name: 'Mar', revenue: 5000, expenses: 3200, profit: 1800 },
    { name: 'Apr', revenue: 2780, expenses: 1908, profit: 872 },
    { name: 'May', revenue: 1890, expenses: 1200, profit: 690 },
  ];

  // Category data for pie/donut
  const pieData = [
    { category: 'Product A', sales: 400 },
    { category: 'Product B', sales: 300 },
    { category: 'Product C', sales: 200 },
    { category: 'Product D', sales: 100 },
  ];

  const chartTypeOptions: { value: ChartType; label: string }[] = [
    { value: 'bar', label: 'Bar' },
    { value: 'line', label: 'Line' },
    { value: 'area', label: 'Area' },
    { value: 'stacked', label: 'Stacked' },
    { value: 'pie', label: 'Pie' },
    { value: 'donut', label: 'Donut' },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart
            data={timeSeriesData}
            xKey="name"
            bars={[
              { dataKey: 'revenue', name: 'Revenue', fill: '#60a5fa' },
              { dataKey: 'expenses', name: 'Expenses', fill: '#f87171' },
            ]}
            height={220}
            showLegend
          />
        );
      case 'line':
        return (
          <LineChart
            data={timeSeriesData}
            xKey="name"
            lines={[
              { dataKey: 'revenue', name: 'Revenue', stroke: '#60a5fa' },
              { dataKey: 'expenses', name: 'Expenses', stroke: '#34d399' },
            ]}
            height={220}
            showLegend
          />
        );
      case 'area':
        return (
          <AreaChart
            data={timeSeriesData}
            xKey="name"
            areas={[
              { dataKey: 'revenue', name: 'Revenue', fill: '#60a5fa', stroke: '#60a5fa' },
              { dataKey: 'profit', name: 'Profit', fill: '#34d399', stroke: '#34d399' },
            ]}
            height={220}
            showLegend
            stacked
          />
        );
      case 'stacked':
        return (
          <StackedBarChart
            data={timeSeriesData}
            xKey="name"
            stackKeys={[
              { dataKey: 'expenses', name: 'Expenses', fill: '#f87171' },
              { dataKey: 'profit', name: 'Profit', fill: '#34d399' },
            ]}
            height={220}
            showLegend
          />
        );
      case 'pie':
        return (
          <PieChart
            data={pieData}
            nameKey="category"
            valueKey="sales"
            height={220}
            showLegend
          />
        );
      case 'donut':
        return (
          <DonutChart
            data={pieData}
            nameKey="category"
            valueKey="sales"
            height={220}
            showLegend
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full min-w-0 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%' }}
    >
      {/* Chart type selector */}
      <div className="flex flex-wrap gap-2">
        {chartTypeOptions.map((option) => (
          <Button
            key={option.value}
            variant={chartType === option.value ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setChartType(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Chart display with animation */}
      <div className="w-full min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={chartType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', height: 220 }}
          >
            {renderChart()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// CloseButton Preview
function CloseButtonPreview() {
  return (
    <motion.div
      className="flex items-center gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
        <CloseButton onClick={() => {}} />
        <span className="text-xs text-muted-foreground">Default</span>
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Dismissible item</span>
            <CloseButton onClick={() => {}} />
          </div>
        </div>
        <span className="text-xs text-muted-foreground">In context</span>
      </motion.div>
    </motion.div>
  );
}

// ContextMenu Preview
function ContextMenuPreview() {
  const menuItems = [
    { label: 'Cut', onClick: () => {} },
    { label: 'Copy', onClick: () => {} },
    { label: 'Paste', onClick: () => {} },
    { label: '', onClick: () => {}, separator: true },
    { label: 'Delete', onClick: () => {} },
  ];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ContextMenu items={menuItems}>
        <div className="p-8 border border-dashed border-border rounded-lg text-center">
          <p className="text-muted-foreground text-sm">Right-click here to open context menu</p>
        </div>
      </ContextMenu>
    </motion.div>
  );
}

// Modal Preview
function ModalPreview() {
  const [isOpen, setIsOpen] = useState(false);

  // Check if we're in the browser (for SSR compatibility with portal)
  const isBrowser = typeof window !== 'undefined';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      {/* Use portal to render modal at document body level to escape stacking context */}
      {isBrowser && createPortal(
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This is a modal dialog. You can put any content here.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
            </div>
          </div>
        </Modal>,
        document.body
      )}
    </motion.div>
  );
}

// MultiSelect Preview
function MultiSelectPreview() {
  const [selected, setSelected] = useState<string[]>(['react']);

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
  ];

  return (
    <motion.div
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <MultiSelect
        value={selected}
        onChange={setSelected}
        options={options}
        placeholder="Select frameworks..."
      />
    </motion.div>
  );
}

// SearchInput Preview
function SearchInputPreview() {
  const [query, setQuery] = useState('');

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components..."
      />
    </motion.div>
  );
}

// Skeleton Preview
function SkeletonPreview() {
  return (
    <motion.div
      className="flex flex-col gap-3 w-full max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="flex items-center gap-3"
        variants={itemVariants}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Skeleton className="h-12 w-12 rounded-full" />
        </motion.div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Skeleton className="h-24 w-full rounded-lg" />
      </motion.div>
      <motion.div className="flex gap-2" variants={itemVariants}>
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </motion.div>
    </motion.div>
  );
}

// Switch Preview
function SwitchPreview() {
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(true);

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} whileHover={{ x: 4 }}>
        <Switch
          label="Enable notifications"
          checked={enabled1}
          onChange={setEnabled1}
        />
      </motion.div>
      <motion.div variants={itemVariants} whileHover={{ x: 4 }}>
        <Switch
          label="Dark mode"
          checked={enabled2}
          onChange={setEnabled2}
        />
      </motion.div>
      <motion.div variants={itemVariants} whileHover={{ x: 4 }}>
        <Switch
          label="Disabled"
          checked={false}
          disabled
        />
      </motion.div>
    </motion.div>
  );
}

// Table Preview
function TablePreview() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  ];

  return (
    <motion.div
      className="w-full overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'secondary'}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}

// Accordion Preview
function AccordionPreview() {
  return (
    <motion.div
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Accordion type="single" defaultValue="item-1">
        <motion.div variants={itemVariants}>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Darwin UI?</AccordionTrigger>
            <AccordionContent>
              Darwin UI is a beautiful, macOS-inspired React component library with native-feeling interactions and smooth animations.
            </AccordionContent>
          </AccordionItem>
        </motion.div>
        <motion.div variants={itemVariants}>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes! All components are ARIA-compliant with full keyboard navigation support.
            </AccordionContent>
          </AccordionItem>
        </motion.div>
        <motion.div variants={itemVariants}>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I customize it?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Darwin UI supports extensive theming and customization through CSS variables and Tailwind.
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      </Accordion>
    </motion.div>
  );
}

// Avatar Preview
function AvatarPreview() {
  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Single Avatar</span>
        <div className="flex items-center gap-3">
          <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" size="sm" />
          <Avatar src="https://i.pravatar.cc/150?img=2" alt="User" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=3" alt="User" size="lg" />
          <Avatar fallback="John Doe" size="md" />
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Avatar Group</span>
        <AvatarGroup max={4}>
          <Avatar src="https://i.pravatar.cc/150?img=4" alt="User 1" />
          <Avatar src="https://i.pravatar.cc/150?img=5" alt="User 2" />
          <Avatar src="https://i.pravatar.cc/150?img=6" alt="User 3" />
          <Avatar src="https://i.pravatar.cc/150?img=7" alt="User 4" />
          <Avatar src="https://i.pravatar.cc/150?img=8" alt="User 5" />
          <Avatar src="https://i.pravatar.cc/150?img=9" alt="User 6" />
        </AvatarGroup>
      </motion.div>
    </motion.div>
  );
}

// DateSelect Preview
function DateSelectPreview() {
  const [dateConfig, setDateConfig] = useState<{ startDate?: Date } | null>(null);

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <DateSelect
        label="Select a date"
        onChange={(config) => setDateConfig(config)}
      />
      {dateConfig?.startDate && (
        <motion.p
          className="mt-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Selected: {dateConfig.startDate.toLocaleDateString()}
        </motion.p>
      )}
    </motion.div>
  );
}

// Dialog Preview
function DialogPreview() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="primary">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

// DropdownMenu Preview
function DropdownMenuPreview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => {}}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>Settings</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>Preferences</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {}} destructive>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

// Image Preview
function ImagePreview() {
  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Click to Enlarge</span>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
          alt="Mountain landscape"
          className="w-48 h-32 object-cover"
          rounded="lg"
          clickToEnlarge
        />
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Different Rounded Options</span>
        <div className="flex gap-2">
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&h=100&fit=crop"
            alt="Ocean"
            className="w-16 h-16 object-cover"
            rounded="sm"
          />
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop"
            alt="Nature"
            className="w-16 h-16 object-cover"
            rounded="full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Popover Preview
function PopoverPreview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Show Info</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Popover Content</h4>
            <p className="text-sm text-muted-foreground">
              This is a popover with some helpful information. It can contain any content.
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="primary" size="sm">Learn More</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
}

// Progress Preview
function ProgressPreview() {
  const [value, setValue] = useState(65);

  // Animate progress value
  useState(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      className="flex flex-col gap-6 w-full max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <span className="text-xs text-muted-foreground">Linear Progress</span>
        <Progress value={value} showValue />
        <Progress value={45} variant="success" />
        <Progress value={75} variant="warning" />
        <Progress indeterminate variant="gradient" />
      </motion.div>
      <motion.div variants={itemVariants} className="space-y-3">
        <span className="text-xs text-muted-foreground">Circular Progress</span>
        <div className="flex items-center gap-4">
          <CircularProgress value={value} showValue />
          <CircularProgress value={80} variant="success" showValue />
          <CircularProgress indeterminate variant="default" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Reveal Preview
function RevealPreview() {
  const [key, setKey] = useState(0);

  return (
    <motion.div
      className="flex flex-col gap-4 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Button variant="outline" size="sm" onClick={() => setKey(k => k + 1)}>
        Replay Animations
      </Button>
      <div key={key} className="grid grid-cols-2 gap-4">
        <Reveal type="slide" direction="up" delay={0}>
          <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
            <span className="text-sm text-muted-foreground">Slide Up</span>
          </div>
        </Reveal>
        <Reveal type="fade" delay={0.1}>
          <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
            <span className="text-sm text-muted-foreground">Fade In</span>
          </div>
        </Reveal>
        <Reveal type="scale" delay={0.2}>
          <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
            <span className="text-sm text-muted-foreground">Scale</span>
          </div>
        </Reveal>
        <Reveal type="blur" delay={0.3}>
          <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
            <span className="text-sm text-muted-foreground">Blur</span>
          </div>
        </Reveal>
      </div>
    </motion.div>
  );
}

// Slider Preview
function SliderPreview() {
  const [value, setValue] = useState(50);

  return (
    <motion.div
      className="w-full max-w-sm space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Volume</span>
          <span className="text-sm font-mono text-blue-400">{value}%</span>
        </div>
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">With value display</span>
        </div>
        <Slider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          showValue
        />
      </motion.div>
    </motion.div>
  );
}

// Tabs Preview
function TabsPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-muted-foreground text-sm">
              This is the overview tab content. It provides a general summary of the item.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="features">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-muted-foreground text-sm">
              Features tab showing available capabilities and options.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-muted-foreground text-sm">
              Settings tab for configuration options and preferences.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Textarea Preview
function TextareaPreview() {
  const [value, setValue] = useState('');
  const maxChars = 200;

  return (
    <motion.div
      className="w-full max-w-sm space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <Textarea
          placeholder="Write your message here..."
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, maxChars))}
          rows={4}
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${value.length >= maxChars ? 'text-red-400' : 'text-muted-foreground'}`}>
            {value.length}/{maxChars}
          </span>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Textarea
          placeholder="Error state textarea"
          error
          rows={2}
        />
      </motion.div>
    </motion.div>
  );
}

// Tooltip Preview
function TooltipPreview() {
  return (
    <motion.div
      className="flex flex-wrap gap-4 items-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a tooltip!
          </TooltipContent>
        </Tooltip>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost">Left tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Appears on the left
          </TooltipContent>
        </Tooltip>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Tooltip on bottom
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
}

// Upload Preview
function UploadPreview() {
  const [files, setFiles] = useState<string[]>([]);

  const handleUpload = async (uploadedFiles: File[]): Promise<string[]> => {
    // Simulate upload - in real usage this would upload to a server
    await new Promise(resolve => setTimeout(resolve, 1000));
    return uploadedFiles.map(f => URL.createObjectURL(f));
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Upload
        value={files}
        onChange={setFiles}
        onUpload={handleUpload}
        maxFiles={4}
        label="Upload product images"
      />
    </motion.div>
  );
}

// Sidebar Preview - Shows the actual Sidebar component in a contained preview
function SidebarPreview() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', onClick: () => setActiveItem('Dashboard') },
    { label: 'Projects', onClick: () => setActiveItem('Projects') },
    { label: 'Analytics', onClick: () => setActiveItem('Analytics') },
    { label: 'Settings', onClick: () => setActiveItem('Settings') },
  ];

  return (
    <motion.div
      className="w-full space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Collapsible toggle */}
      <div className="flex items-center gap-2">
        <Switch checked={isCollapsed} onChange={setIsCollapsed} />
        <span className="text-sm text-muted-foreground">
          {isCollapsed ? 'Collapsed' : 'Expanded'}
        </span>
      </div>

      {/* Container to show sidebar in a realistic layout */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex h-80">
          {/* Sidebar area - using the actual Sidebar component */}
          <div className="border-r border-border bg-muted">
            <Sidebar
              items={sidebarItems}
              activeItem={activeItem}
              onLogout={() => setActiveItem('Logged out')}
              collapsed={isCollapsed}
              onCollapsedChange={setIsCollapsed}
              collapsible
            />
          </div>
          {/* Content area */}
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Current page:</p>
              <p className="text-foreground font-medium mt-1">{activeItem}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground/70 text-center">
        Use the toggle or click &quot;Collapse&quot; in the sidebar. On mobile, it shows as a slide-out menu.
      </p>
    </motion.div>
  );
}

// ContactForm Preview
function ContactFormPreview() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setName('');
      setEmail('');
    }, 1500);
  };

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Connect</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

// MdEditor Preview
function MdEditorPreview() {
  const [markdown] = useState(`# Hello World

This is a **markdown** preview.

- Item 1
- Item 2
- Item 3

\`\`\`js
const greeting = "Hello!";
console.log(greeting);
\`\`\`
`);

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/50">
          <div className="flex gap-1">
            <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">B</span>
            <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded italic">I</span>
            <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">H1</span>
          </div>
          <span className="text-xs text-muted-foreground/70 ml-auto">Markdown Editor</span>
        </div>
        <div className="p-3 font-mono text-xs text-muted-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
          {markdown}
        </div>
      </div>
      <p className="text-xs text-muted-foreground/70 mt-2 text-center">Simplified preview (full editor has rich toolbar)</p>
    </motion.div>
  );
}

// Component previews map
const componentPreviews: Record<string, React.ComponentType> = {
  'accordion': AccordionPreview,
  'avatar': AvatarPreview,
  'badge': BadgePreview,
  'button': ButtonPreview,
  'card': CardPreview,
  'charts': ChartsPreview,
  'checkbox': CheckboxPreview,
  'close-button': CloseButtonPreview,
  'contact-form': ContactFormPreview,
  'context-menu': ContextMenuPreview,
  'date-select': DateSelectPreview,
  'dialog': DialogPreview,
  'dropdown-menu': DropdownMenuPreview,
  'image': ImagePreview,
  'input': InputPreview,
  'md-editor': MdEditorPreview,
  'modal': ModalPreview,
  'multi-select': MultiSelectPreview,
  'popover': PopoverPreview,
  'progress': ProgressPreview,
  'reveal': RevealPreview,
  'search-input': SearchInputPreview,
  'select': SelectPreview,
  'sidebar': SidebarPreview,
  'skeleton': SkeletonPreview,
  'slider': SliderPreview,
  'switch': SwitchPreview,
  'table': TablePreview,
  'tabs': TabsPreview,
  'textarea': TextareaPreview,
  'tooltip': TooltipPreview,
  'upload': UploadPreview,
  'window': WindowPreview,
};

// Component code examples
const componentCodeExamples: Record<string, { importCode: string; usageCode: string }> = {
  'accordion': {
    importCode: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@pikoloo/darwin-ui';`,
    usageCode: `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section Title</AccordionTrigger>
    <AccordionContent>
      Content goes here...
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  'avatar': {
    importCode: `import { Avatar, AvatarGroup } from '@pikoloo/darwin-ui';`,
    usageCode: `<Avatar src="/user.jpg" alt="User" size="md" />
<Avatar fallback="John Doe" />

<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>`,
  },
  'badge': {
    importCode: `import { Badge } from '@pikoloo/darwin-ui';`,
    usageCode: `<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>`,
  },
  'button': {
    importCode: `import { Button } from '@pikoloo/darwin-ui';
import { Plus, Settings, Download } from 'lucide-react';`,
    usageCode: `// Text Buttons
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button loading>Loading...</Button>

// Icon Buttons
<Button variant="primary" size="icon">
  <Plus className="h-4 w-4" />
</Button>
<Button variant="secondary" size="icon">
  <Settings className="h-4 w-4" />
</Button>

// Buttons with Icons
<Button variant="primary">
  <Plus className="h-4 w-4 mr-2" />
  Create New
</Button>
<Button variant="secondary">
  <Download className="h-4 w-4 mr-2" />
  Download
</Button>`,
  },
  'card': {
    importCode: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@pikoloo/darwin-ui';`,
    usageCode: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
  },
  'charts': {
    importCode: `import { BarChart, LineChart, AreaChart, PieChart } from '@pikoloo/darwin-ui';`,
    usageCode: `<BarChart
  data={data}
  xKey="name"
  bars={[{ dataKey: 'value', name: 'Sales' }]}
/>

<LineChart
  data={data}
  xKey="name"
  lines={[{ dataKey: 'value', name: 'Revenue' }]}
/>`,
  },
  'checkbox': {
    importCode: `import { Checkbox } from '@pikoloo/darwin-ui';`,
    usageCode: `<Checkbox
  label="Accept terms"
  checked={checked}
  onChange={setChecked}
/>`,
  },
  'close-button': {
    importCode: `import { CloseButton } from '@pikoloo/darwin-ui';`,
    usageCode: `<CloseButton onClick={handleClose} />`,
  },
  'context-menu': {
    importCode: `import { ContextMenu } from '@pikoloo/darwin-ui';`,
    usageCode: `<ContextMenu items={[
  { label: 'Cut', onClick: handleCut },
  { label: 'Copy', onClick: handleCopy },
  { label: '', onClick: () => {}, separator: true },
  { label: 'Delete', onClick: handleDelete },
]}>
  <div>Right-click me</div>
</ContextMenu>`,
  },
  'date-select': {
    importCode: `import { DateSelect } from '@pikoloo/darwin-ui';`,
    usageCode: `<DateSelect
  label="Event Date"
  onChange={(config) => console.log(config)}
/>`,
  },
  'dialog': {
    importCode: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@pikoloo/darwin-ui';`,
    usageCode: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogClose />
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description here</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  'dropdown-menu': {
    importCode: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@pikoloo/darwin-ui';`,
    usageCode: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => {}}>Profile</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => {}}>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  'image': {
    importCode: `import { Image } from '@pikoloo/darwin-ui';`,
    usageCode: `<Image
  src="/photo.jpg"
  alt="Photo"
  rounded="lg"
  clickToEnlarge
/>`,
  },
  'input': {
    importCode: `import { Input } from '@pikoloo/darwin-ui';`,
    usageCode: `<Input placeholder="Enter text..." />
<Input error placeholder="Error state" />
<Input success placeholder="Success state" />`,
  },
  'modal': {
    importCode: `import { Modal } from '@pikoloo/darwin-ui';`,
    usageCode: `<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
  <p>Modal content here</p>
</Modal>`,
  },
  'multi-select': {
    importCode: `import { MultiSelect } from '@pikoloo/darwin-ui';`,
    usageCode: `<MultiSelect
  value={selected}
  onChange={setSelected}
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ]}
  placeholder="Select..."
/>`,
  },
  'popover': {
    importCode: `import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@pikoloo/darwin-ui';`,
    usageCode: `<Popover>
  <PopoverTrigger asChild>
    <Button>Show Info</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h4>Popover Title</h4>
    <p>Content goes here...</p>
  </PopoverContent>
</Popover>`,
  },
  'progress': {
    importCode: `import { Progress, CircularProgress } from '@pikoloo/darwin-ui';`,
    usageCode: `<Progress value={65} showValue />
<Progress variant="success" value={100} />
<Progress indeterminate variant="gradient" />

<CircularProgress value={75} showValue />
<CircularProgress indeterminate />`,
  },
  'reveal': {
    importCode: `import { Reveal } from '@pikoloo/darwin-ui';`,
    usageCode: `<Reveal type="slide" direction="up">
  <div>Slides up on scroll</div>
</Reveal>

<Reveal type="fade" delay={0.2}>
  <div>Fades in with delay</div>
</Reveal>

<Reveal type="scale">
  <div>Scales up</div>
</Reveal>`,
  },
  'search-input': {
    importCode: `import { SearchInput } from '@pikoloo/darwin-ui';`,
    usageCode: `<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search..."
/>`,
  },
  'select': {
    importCode: `import { Select } from '@pikoloo/darwin-ui';`,
    usageCode: `<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>`,
  },
  'skeleton': {
    importCode: `import { Skeleton } from '@pikoloo/darwin-ui';`,
    usageCode: `<Skeleton className="h-4 w-full" />
<Skeleton className="h-12 w-12 rounded-full" />`,
  },
  'switch': {
    importCode: `import { Switch } from '@pikoloo/darwin-ui';`,
    usageCode: `<Switch
  label="Enable feature"
  checked={enabled}
  onChange={setEnabled}
/>`,
  },
  'table': {
    importCode: `import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@pikoloo/darwin-ui';`,
    usageCode: `<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Status</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  'contact-form': {
    importCode: `import { CompactContactForm } from '@pikoloo/darwin-ui';`,
    usageCode: `<CompactContactForm
  title="Quick Connect Form"
  className="max-w-lg"
/>`,
  },
  'md-editor': {
    importCode: `import { MdEditor } from '@pikoloo/darwin-ui';`,
    usageCode: `const [content, setContent] = useState('');

<MdEditor
  value={content}
  onChange={setContent}
  placeholder="Write your content in Markdown..."
/>`,
  },
  'sidebar': {
    importCode: `import { Sidebar } from '@pikoloo/darwin-ui';`,
    usageCode: `const items = [
  { label: 'Dashboard', onClick: () => navigate('/dashboard'), icon: HomeIcon },
  { label: 'Projects', onClick: () => navigate('/projects'), icon: FolderIcon },
  { label: 'Settings', onClick: () => navigate('/settings'), icon: SettingsIcon },
];

<Sidebar
  items={items}
  activeItem="Dashboard"
  onLogout={() => logout()}
/>`,
  },
  'slider': {
    importCode: `import { Slider } from '@pikoloo/darwin-ui';`,
    usageCode: `const [value, setValue] = useState(50);

<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
  showValue
/>`,
  },
  'tabs': {
    importCode: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@pikoloo/darwin-ui';`,
    usageCode: `<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content...
  </TabsContent>
  <TabsContent value="settings">
    Settings content...
  </TabsContent>
</Tabs>`,
  },
  'textarea': {
    importCode: `import { Textarea } from '@pikoloo/darwin-ui';`,
    usageCode: `<Textarea
  placeholder="Write your message..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  rows={4}
/>
<Textarea error placeholder="Error state" />
<Textarea success placeholder="Success state" />`,
  },
  'tooltip': {
    importCode: `import { Tooltip, TooltipTrigger, TooltipContent } from '@pikoloo/darwin-ui';`,
    usageCode: `<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    Helpful tooltip text
  </TooltipContent>
</Tooltip>`,
  },
  'upload': {
    importCode: `import { Upload } from '@pikoloo/darwin-ui';`,
    usageCode: `const [files, setFiles] = useState<string[]>([]);

const handleUpload = async (files: File[]) => {
  // Upload files to your server
  const urls = await uploadToServer(files);
  return urls;
};

<Upload
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={6}
  label="Drop your images here"
/>`,
  },
  'window': {
    importCode: `import { Window } from '@pikoloo/darwin-ui';`,
    usageCode: `<Window title="My Window" isOpen={true} onClose={handleClose}>
  <div className="p-4">Window content</div>
</Window>`,
  },
};

// Generic component page with enhanced animations
function ComponentPage({ name }: { name: string }) {
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
function ColorsPage() {
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
function DarkModePage() {
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
            <Button variant="secondary" size="sm">Light</Button>
            <Button variant="primary" size="sm">Dark</Button>
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
function CustomizationPage() {
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
          <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
            Gradient
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            Custom Green
          </Button>
          <Button variant="secondary" className="border-2 border-dashed">
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
function ThemingPage({ name }: { name: string }) {
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
function PageContent({ section, page, onNavigate }: { section: string; page: string; onNavigate?: (section: string, page: string) => void }) {
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

// Sidebar navigation item with active indicator
function SidebarNavItem({
  page,
  isActive,
  onClick,
  index
}: {
  page: { id: string; title: string };
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
        isActive
          ? 'text-blue-400'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
      variants={sidebarItemVariants}
      custom={index}
      initial="hidden"
      animate="show"
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-blue-500/20 rounded-md"
          layoutId="activeIndicator"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        />
      )}
      <span className="relative z-10">{page.title}</span>
    </motion.button>
  );
}

// Extracted Navigation Component
function DocsNavigation({
  activeSection,
  activePage,
  expandedSections,
  toggleSection,
  navigateTo,
  onNavigate
}: {
  activeSection: string;
  activePage: string;
  expandedSections: string[];
  toggleSection: (id: string) => void;
  navigateTo: (section: string, page: string) => void;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto p-3 space-y-1">
      {Object.entries(docSections).map(([sectionId, section], sectionIndex) => (
        <motion.div
          key={sectionId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <motion.button
            onClick={() => toggleSection(sectionId)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.includes(sectionId) ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ChevronRight className="w-3 h-3" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {section.icon}
            </motion.div>
            <span className="font-medium">{section.title}</span>
          </motion.button>

          <AnimatePresence>
            {expandedSections.includes(sectionId) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    },
                    opacity: {
                      duration: 0.2,
                      delay: 0.1
                    }
                  }
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    },
                    opacity: {
                      duration: 0.1
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div
                  className="pl-7 py-1 space-y-0.5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {section.pages.map((page, pageIndex) => (
                    <SidebarNavItem
                      key={page.id}
                      page={page}
                      isActive={activeSection === sectionId && activePage === page.id}
                      onClick={() => {
                        navigateTo(sectionId, page.id);
                        onNavigate?.();
                      }}
                      index={pageIndex}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </nav>
  );
}

// Generate markdown context for AI from current page
function generatePageContext(section: string, page: string): string {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DeveloperApp({ windowState: _windowState, initialSection, initialPage }: DeveloperAppProps) {
  // Validate and use initial section/page from URL if provided
  const getValidSection = () => {
    if (initialSection && initialSection in docSections) {
      return initialSection;
    }
    return 'getting-started';
  };

  const getValidPage = (section: string) => {
    const sectionData = docSections[section as keyof typeof docSections];
    if (initialPage && sectionData?.pages.some(p => p.id === initialPage)) {
      return initialPage;
    }
    return sectionData?.pages[0]?.id || 'introduction';
  };

  const validSection = getValidSection();
  const [activeSection, setActiveSection] = useState(validSection);
  const [activePage, setActivePage] = useState(getValidPage(validSection));
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'components', 'theming', validSection]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const copyForAI = async () => {
    const markdown = generatePageContext(activeSection, activePage);
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    // Smooth scroll to top
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-card relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted border border-border/50 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-semibold text-foreground">Documentation</span>
        </div>
        <button
          onClick={() => setShowMobileMenu(true)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-64 bg-card z-50 border-l border-border flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="font-semibold text-foreground">Menu</span>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <DocsNavigation
                activeSection={activeSection}
                activePage={activePage}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                navigateTo={navigateTo}
                onNavigate={() => setShowMobileMenu(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex w-56 bg-card border-r border-border flex-col overflow-hidden flex-shrink-0"
        initial={{ x: -56, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Sidebar Header */}
        <motion.div
          className="p-4 border-b border-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-6 h-6 rounded bg-muted border border-border/50 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            </motion.div>
            <span className="font-semibold text-foreground text-sm">Documentation</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <DocsNavigation
          activeSection={activeSection}
          activePage={activePage}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          navigateTo={navigateTo}
        />

        {/* Sidebar Footer */}
        <motion.div
          className="p-3 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.div>
            <span>GitHub</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        className="flex-1 overflow-y-auto scroll-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          {/* Copy for AI button */}
          <div className="flex justify-end mb-4">
            <motion.button
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground/90 hover:bg-muted rounded-md transition-colors flex items-center gap-1.5 border border-border"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyForAI}
              title="Copy page context for AI"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy for AI
                </>
              )}
            </motion.button>
          </div>
          <AnimatePresence mode="wait">
            <PageContent
              key={`${activeSection}-${activePage}`}
              section={activeSection}
              page={activePage}
              onNavigate={navigateTo}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default DeveloperApp;
