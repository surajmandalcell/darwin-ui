"use client";

import { useState, useRef } from 'react';
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
  ExternalLink,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button, Input, Checkbox, Switch, Select, Badge, Skeleton } from '@smc/darwin-ui';

interface DeveloperAppProps {
  windowState: WindowState;
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

// Feature card variants
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
    boxShadow: "0 12px 40px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
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

// Code block glow variants
const codeBlockVariants = {
  initial: {
    borderColor: "rgba(255, 255, 255, 0.1)"
  },
  hover: {
    borderColor: "rgba(59, 130, 246, 0.4)",
    boxShadow: "0 0 20px -5px rgba(59, 130, 246, 0.3)",
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
      className="relative group rounded-lg overflow-hidden bg-neutral-900 border border-white/10"
      variants={codeBlockVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <motion.span
          className="text-xs text-white/50 font-mono"
          animate={{ opacity: isHovered ? 0.8 : 0.5 }}
        >
          {language}
        </motion.span>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded transition-colors overflow-hidden"
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
        className="p-4 overflow-x-auto text-sm font-mono text-white/90"
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

// Introduction page content with enhanced animations
function IntroductionPage() {
  const features = [
    { icon: <Zap className="w-5 h-5" />, title: 'Fast & Lightweight', desc: 'Tree-shakeable with zero runtime overhead' },
    { icon: <Palette className="w-5 h-5" />, title: 'Beautiful Design', desc: 'macOS-inspired aesthetics out of the box' },
    { icon: <Code2 className="w-5 h-5" />, title: 'TypeScript First', desc: 'Full type safety and IntelliSense support' },
    { icon: <MousePointer className="w-5 h-5" />, title: 'Accessible', desc: 'ARIA-compliant with keyboard navigation' },
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
          className="text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Darwin UI
        </motion.h1>
        <motion.p
          className="text-xl text-white/70 leading-relaxed"
          variants={itemVariants}
        >
          A beautiful, macOS-inspired React component library with native-feeling
          interactions and buttery smooth animations.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
            variants={featureCardVariants}
            custom={i}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.div
              className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-blue-400 mb-3"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              {feature.icon}
            </motion.div>
            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-white/60">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Install</h2>
        <CodeBlock code="npm install @smc/darwin-ui" language="bash" />
      </motion.div>
    </motion.div>
  );
}

// Installation page content with staggered animations
function InstallationPage() {
  const installMethods = [
    { title: 'Using npm', code: 'npm install @smc/darwin-ui' },
    { title: 'Using yarn', code: 'yarn add @smc/darwin-ui' },
    { title: 'Using pnpm', code: 'pnpm add @smc/darwin-ui' },
    { title: 'Using bun', code: 'bun add @smc/darwin-ui' },
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
          className="text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Installation
        </motion.h1>
        <motion.p
          className="text-lg text-white/70"
          variants={itemVariants}
        >
          Get up and running with Darwin UI in minutes.
        </motion.p>
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {installMethods.map((method) => (
          <motion.div key={method.title} variants={itemVariants}>
            <h2 className="text-xl font-semibold text-white mb-3">{method.title}</h2>
            <CodeBlock code={method.code} language="bash" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-white mb-3">Peer Dependencies</h2>
        <p className="text-white/70 mb-4">
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

// Quick Start page content with enhanced animations
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

  const nextSteps = [
    { title: 'Explore Components', desc: 'Browse all available components' },
    { title: 'Theming Guide', desc: 'Customize colors and styles' },
    { title: 'Examples', desc: 'See Darwin UI in action' },
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
          className="text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Quick Start
        </motion.h1>
        <motion.p
          className="text-lg text-white/70"
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
        <h2 className="text-xl font-semibold text-white mb-3">Basic Example</h2>
        <p className="text-white/70 mb-4">
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
          className="text-xl font-semibold text-white mb-3"
          variants={itemVariants}
        >
          What's Next?
        </motion.h2>
        <div className="space-y-3">
          {nextSteps.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 cursor-pointer transition-colors"
              variants={itemVariants}
              custom={i}
              whileHover={{
                x: 8,
                borderColor: "rgba(59, 130, 246, 0.5)",
                backgroundColor: "rgba(59, 130, 246, 0.05)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </motion.div>
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
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
      className="flex flex-wrap gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
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

function TogglePreview() {
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

function AlertPreview() {
  const alerts = [
    { icon: Info, color: 'blue', title: 'Information', desc: 'This is an informational alert message.' },
    { icon: CheckCircle, color: 'green', title: 'Success', desc: 'Your changes have been saved successfully.' },
    { icon: AlertTriangle, color: 'amber', title: 'Warning', desc: 'Please review your settings before proceeding.' },
    { icon: AlertCircle, color: 'red', title: 'Error', desc: 'Something went wrong. Please try again.' },
  ];

  return (
    <motion.div
      className="flex flex-col gap-3 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {alerts.map((alert, i) => {
        const Icon = alert.icon;
        return (
          <motion.div
            key={alert.title}
            className={`flex items-start gap-3 p-3 rounded-lg bg-${alert.color}-500/10 border border-${alert.color}-500/20`}
            variants={itemVariants}
            custom={i}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: `rgba(var(--${alert.color}-500), 0.1)`,
              borderColor: `rgba(var(--${alert.color}-500), 0.2)`
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
            >
              <Icon className={`w-5 h-5 text-${alert.color}-400 shrink-0 mt-0.5`} />
            </motion.div>
            <div>
              <div className="text-sm font-medium text-white/90">{alert.title}</div>
              <div className="text-sm text-white/60">{alert.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ToastPreview() {
  return (
    <motion.div
      className="flex flex-col gap-3 w-full max-w-sm"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {[
        { icon: CheckCircle, color: 'green', title: 'Success', desc: 'Your file has been uploaded.' },
        { icon: AlertCircle, color: 'red', title: 'Error', desc: 'Failed to save changes.' },
      ].map((toast, i) => {
        const Icon = toast.icon;
        return (
          <motion.div
            key={toast.title}
            className="bg-neutral-900/95 backdrop-blur-md shadow-md rounded-md border border-white/10"
            variants={itemVariants}
            custom={i}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 40px -12px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-3 flex items-start gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 500, damping: 15 }}
              >
                <Icon className={`w-4 h-4 text-${toast.color}-400 shrink-0 mt-0.5`} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-white/90 text-sm font-semibold mb-0.5">{toast.title}</div>
                <div className="text-white/70 text-sm">{toast.desc}</div>
              </div>
            </div>
          </motion.div>
        );
      })}
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
      whileHover={{
        y: -4,
        boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.5)"
      }}
    >
      <div className="rounded-lg border border-white/10 bg-neutral-950/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 bg-white/5">
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
            className="text-xs font-medium text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            My Window
          </motion.div>
          <div className="w-12" />
        </div>
        <motion.div
          className="p-4 text-sm text-white/70"
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

function TooltipPreview() {
  return (
    <motion.div
      className="flex gap-4 items-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {[
        { label: 'Hover me', tooltip: 'Tooltip content', variant: 'outline' as const },
        { label: 'Another one', tooltip: 'More info here', variant: 'secondary' as const },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          className="relative group"
          variants={itemVariants}
          custom={i}
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button variant={item.variant} size="sm">{item.label}</Button>
          </motion.div>
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white/90 bg-neutral-900 rounded border border-white/10 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {item.tooltip}
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-r border-b border-white/10 rotate-45 -mt-1"
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SliderPreview() {
  const [value, setValue] = useState(50);

  return (
    <motion.div
      className="w-full max-w-xs space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Volume</span>
          <motion.span
            className="text-white/50"
            key={value}
            initial={{ scale: 1.2, color: "rgb(96 165 250)" }}
            animate={{ scale: 1, color: "rgba(255, 255, 255, 0.5)" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {value}%
          </motion.span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }}>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Component previews map
const componentPreviews: Record<string, React.ComponentType> = {
  button: ButtonPreview,
  input: InputPreview,
  checkbox: CheckboxPreview,
  toggle: TogglePreview,
  select: SelectPreview,
  slider: SliderPreview,
  window: WindowPreview,
  tooltip: TooltipPreview,
  alert: AlertPreview,
  toast: ToastPreview,
};

// Generic component page with enhanced animations
function ComponentPage({ name }: { name: string }) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const PreviewComponent = componentPreviews[name];

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
          className="flex items-center gap-2 text-sm text-white/50 mb-2"
          variants={itemVariants}
        >
          <span>Components</span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            <ChevronRight className="w-3 h-3" />
          </motion.div>
          <span className="text-white/70">{capitalizedName}</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          {capitalizedName}
        </motion.h1>
        <motion.p
          className="text-lg text-white/70"
          variants={itemVariants}
        >
          A beautiful, accessible {name} component with native macOS styling.
        </motion.p>
      </motion.div>

      <motion.div
        className="p-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        whileHover={{
          borderColor: "rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.06)"
        }}
      >
        <motion.h3
          className="text-sm font-medium text-white/50 mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Preview
        </motion.h3>
        <div className="flex items-center justify-center min-h-[100px] p-4">
          <AnimatedPreviewWrapper componentKey={name}>
            {PreviewComponent ? (
              <PreviewComponent key={name} />
            ) : (
              <p className="text-white/40 text-sm">No preview available</p>
            )}
          </AnimatedPreviewWrapper>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-xl font-semibold text-white mb-3"
          variants={itemVariants}
        >
          Import
        </motion.h2>
        <motion.div variants={itemVariants}>
          <CodeBlock
            code={`import { ${capitalizedName} } from '@smc/darwin-ui';`}
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
          className="text-xl font-semibold text-white mb-3"
          variants={itemVariants}
        >
          Usage
        </motion.h2>
        <motion.div variants={itemVariants}>
          <CodeBlock
            code={`<${capitalizedName} />`}
            language="tsx"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Theming page with enhanced animations
function ThemingPage({ name }: { name: string }) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');

  const themingPreviews: Record<string, React.ReactNode> = {
    colors: (
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
    ),
    'dark-mode': (
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
    ),
  };

  const preview = themingPreviews[name];

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
          className="flex items-center gap-2 text-sm text-white/50 mb-2"
          variants={itemVariants}
        >
          <span>Theming</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/70">{capitalizedName}</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          {capitalizedName}
        </motion.h1>
        <motion.p
          className="text-lg text-white/70"
          variants={itemVariants}
        >
          Customize the look and feel of Darwin UI components.
        </motion.p>
      </motion.div>

      {preview && (
        <motion.div
          className="p-6 rounded-xl bg-white/5 border border-white/10"
          variants={itemVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          whileHover={{
            borderColor: "rgba(255, 255, 255, 0.15)"
          }}
        >
          <h3 className="text-sm font-medium text-white/50 mb-4">Preview</h3>
          <div className="flex items-center justify-center min-h-[100px] p-4">
            {preview}
          </div>
        </motion.div>
      )}

      <motion.div
        className="p-6 rounded-xl bg-white/5 border border-white/10"
        variants={itemVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <p className="text-white/60 text-sm">
          Detailed theming documentation coming soon...
        </p>
      </motion.div>
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

  if (section === 'theming') {
    return <ThemingPage name={page} />;
  }

  // Default fallback
  return (
    <motion.div
      className="text-white/50"
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
          : 'text-white/60 hover:text-white hover:bg-white/5'
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

export function DeveloperApp({ windowState: _windowState }: DeveloperAppProps) {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activePage, setActivePage] = useState('introduction');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'components']);
  const contentRef = useRef<HTMLDivElement>(null);

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
    <div className="flex h-full bg-neutral-900">
      {/* Sidebar */}
      <motion.div
        className="w-56 bg-neutral-950 border-r border-white/10 flex flex-col overflow-hidden"
        initial={{ x: -56, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Sidebar Header */}
        <motion.div
          className="p-4 border-b border-white/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-6 h-6 rounded bg-white/[0.08] border border-white/[0.08] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            </motion.div>
            <span className="font-semibold text-white text-sm">Documentation</span>
          </div>
        </motion.div>

        {/* Navigation */}
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
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
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
                          onClick={() => navigateTo(sectionId, page.id)}
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

        {/* Sidebar Footer */}
        <motion.div
          className="p-3 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors"
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
        <div className="max-w-3xl mx-auto p-8">
          <AnimatePresence mode="wait">
            <PageContent
              key={`${activeSection}-${activePage}`}
              section={activeSection}
              page={activePage}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default DeveloperApp;
