"use client";

import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShowcaseCard } from '../components/ShowcaseCard';
import { CodeBlock } from '../components/CodeBlock';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Select,
  Checkbox,
  Switch,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Modal,
  ToastProvider,
  useToast,
  useAlert,
  AlertProvider,
  OverlayProvider,
  Skeleton,
  Image,
  DateSelect,
  MultiSelect,
  SearchInput,
  ContextMenu,
  Upload,
  Reveal,
  CloseButton,
  Window,
  AreaChart,
} from '@smc/darwin-ui';

// Lazy load the dashboard showcase for better performance
const DashboardShowcase = lazy(() => import('../components/DashboardShowcase'));

export default function LandingPage() {
  // Scroll to showcase section
  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('showcase');
    showcaseSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <OverlayProvider>
        <AlertProvider>
          <ToastProvider>
            <HeroSection scrollToShowcase={scrollToShowcase} />

            {/* Component Showcase Grid */}
            <ComponentShowcaseSection />

            {/* Dashboard Demo Section */}
            <DashboardSection />

            {/* CTA Section */}
            <CTASection />
          </ToastProvider>
        </AlertProvider>
      </OverlayProvider>
    </div>
  );
}

// Hero Section Component
function HeroSection({ scrollToShowcase }: { scrollToShowcase: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <img
            src="/darwin-logo.svg"
            alt="Darwin UI"
            className="w-32 h-32 mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-md mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
          <span className="text-white/70">v1.1.0 Available Now</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent mb-6"
        >
          Darwin UI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          26 Premium Components. One Beautiful System.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={scrollToShowcase}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
          >
            Explore Components
            <ArrowDown className="w-5 h-5" />
          </button>
          <Link to="/docs/getting-started/introduction">
            <Button size="lg" variant="secondary" className="rounded-full px-8">
              View Docs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a
            href="https://github.com/surajmandalcell/darwin-ui"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="ghost" className="rounded-full px-8">
              <Github className="mr-2 w-5 h-5" />
              GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Component Showcase Grid Section
function ComponentShowcaseSection() {
  const { showToast } = useToast();
  const { showAlert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [contextMenuItems] = useState([
    { label: 'Copy', onClick: () => alert('Copied!') },
    { label: 'Paste', onClick: () => alert('Pasted!') },
    { separator: true, label: '', onClick: () => {} },
    { label: 'Delete', onClick: () => alert('Deleted!') },
  ]);

  const showcaseComponents = [
    {
      title: 'Button',
      slug: 'button',
      description: '11 variants with hover states and icons',
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="success" size="sm">Success</Button>
        </div>
      ),
    },
    {
      title: 'Badge',
      slug: 'badge',
      description: 'Status indicators with multiple variants',
      preview: (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      ),
    },
    {
      title: 'Card',
      slug: 'card',
      description: 'Container component with header and actions',
      preview: (
        <Card className="w-full max-w-xs">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">Card content goes here</p>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Input',
      slug: 'input',
      description: 'Text input with focus states',
      preview: (
        <Input placeholder="Enter text..." className="max-w-xs" />
      ),
    },
    {
      title: 'Select',
      slug: 'select',
      description: 'Dropdown selection component',
      preview: (
        <Select className="max-w-xs">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Select>
      ),
    },
    {
      title: 'Checkbox',
      slug: 'checkbox',
      description: 'Interactive checkbox with states',
      preview: (
        <div className="space-y-2">
          <Checkbox label="Option 1" defaultChecked />
          <Checkbox label="Option 2" />
        </div>
      ),
    },
    {
      title: 'Switch',
      slug: 'switch',
      description: 'Toggle switch component',
      preview: (
        <div className="space-y-2">
          <Switch label="Enable feature" defaultChecked />
          <Switch label="Disabled" disabled />
        </div>
      ),
    },
    {
      title: 'Table',
      slug: 'table',
      description: 'Data table with styling',
      preview: (
        <div className="w-full overflow-hidden">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Item 1</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item 2</TableCell>
                <TableCell>Inactive</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ),
    },
    {
      title: 'Modal',
      slug: 'modal',
      description: 'Dialog with backdrop and animations',
      preview: (
        <>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
          >
            <p>This is a modal dialog with smooth animations.</p>
          </Modal>
        </>
      ),
    },
    {
      title: 'Toast',
      slug: 'toast',
      description: 'Notification system with auto-dismiss',
      preview: (
        <Button
          onClick={() =>
            showToast('This is a toast notification', {
              title: 'Success!',
              type: 'success',
            })
          }
        >
          Show Toast
        </Button>
      ),
    },
    {
      title: 'Alert',
      slug: 'alert',
      description: 'Alert dialogs with variants',
      preview: (
        <Button
          onClick={() =>
            showAlert({
              title: 'Alert',
              message: 'This is an alert message',
              type: 'info',
            })
          }
        >
          Show Alert
        </Button>
      ),
    },
    {
      title: 'Charts',
      slug: 'charts',
      description: '6 chart types with Recharts',
      preview: (
        <div className="w-full h-32">
          <AreaChart
            data={[
              { name: 'A', value: 400 },
              { name: 'B', value: 300 },
              { name: 'C', value: 600 },
              { name: 'D', value: 500 },
            ]}
            xKey="name"
            areas={[{ dataKey: 'value', fill: '#60a5fa' }]}
            height={120}
          />
        </div>
      ),
      badge: 'Popular',
    },
    {
      title: 'Skeleton',
      slug: 'skeleton',
      description: 'Loading placeholder animations',
      preview: (
        <div className="space-y-2 w-full max-w-xs">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ),
    },
    {
      title: 'Image',
      slug: 'image',
      description: 'Optimized image with click-to-enlarge',
      preview: (
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400"
          alt="Demo"
          className="w-32 h-24 object-cover"
          rounded="md"
        />
      ),
    },
    {
      title: 'DateSelect',
      slug: 'date-select',
      description: 'Calendar date picker',
      preview: (
        <DateSelect
          value={selectedDate}
          onChange={(config) => setSelectedDate(config.startDate)}
        />
      ),
    },
    {
      title: 'MultiSelect',
      slug: 'multi-select',
      description: 'Multiple selection with pills',
      preview: (
        <MultiSelect
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
          ]}
          value={multiSelectValues}
          onChange={setMultiSelectValues}
          placeholder="Select frameworks"
        />
      ),
    },
    {
      title: 'SearchInput',
      slug: 'search-input',
      description: 'Search with debounce and clear',
      preview: (
        <SearchInput
          placeholder="Search components..."
          onChange={(e) => console.log(e.target.value)}
          className="max-w-xs"
        />
      ),
    },
    {
      title: 'ContextMenu',
      slug: 'context-menu',
      description: 'Right-click context menus',
      preview: (
        <ContextMenu items={contextMenuItems} trigger="click">
          <Button variant="secondary">Right Click Me</Button>
        </ContextMenu>
      ),
    },
    {
      title: 'Upload',
      slug: 'upload',
      description: 'Drag-drop file upload',
      preview: (
        <div className="w-full max-w-xs">
          <Upload
            value={uploadedFiles}
            onChange={setUploadedFiles}
            onUpload={async (files) => {
              // Mock upload - return URLs
              return files.map((f) => URL.createObjectURL(f));
            }}
            maxFiles={3}
          />
        </div>
      ),
    },
    {
      title: 'Reveal',
      slug: 'reveal',
      description: 'Scroll-triggered animations',
      preview: (
        <Reveal type="fade" duration={0.6}>
          <p className="text-white/80">Scroll animated text</p>
        </Reveal>
      ),
    },
    {
      title: 'Window',
      slug: 'window',
      description: 'macOS window chrome with traffic lights',
      preview: (
        <div className="w-full max-w-xs">
          <Window title="Example Window">
            <div className="p-4 text-sm">Window content</div>
          </Window>
        </div>
      ),
      badge: 'New',
    },
    {
      title: 'CloseButton',
      slug: 'close-button',
      description: 'Accessible dismiss button',
      preview: (
        <CloseButton onClick={() => alert('Closed!')} />
      ),
    },
  ];

  return (
    <section id="showcase" className="py-24 px-4 relative">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Component Library
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore our comprehensive collection of production-ready components
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {showcaseComponents.map((component, index) => (
            <ShowcaseCard
              key={component.slug}
              {...component}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Dashboard Demo Section
function DashboardSection() {
  return (
    <section className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Real-World Example
          </h2>
          <p className="text-xl text-white/60">
            See how components work together in a complete dashboard
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <Suspense
            fallback={
              <div className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Skeleton className="h-12 w-64 mx-auto mb-4" />
                  <Skeleton className="h-6 w-48 mx-auto" />
                </div>
              </div>
            }
          >
            <DashboardShowcase />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const installCommand = 'npm install @smc/darwin-ui';

  return (
    <section className="py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Ready to build?
        </h2>
        <p className="text-xl text-white/60 mb-12">
          Get started with Darwin UI in seconds
        </p>

        {/* Install Command */}
        <CodeBlock
          code={installCommand}
          language="bash"
          showLineNumbers={false}
        />

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link to="/docs/getting-started/installation">
            <Button size="lg" className="rounded-full px-8">
              Installation Guide
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a
            href="https://github.com/surajmandalcell/darwin-ui"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="secondary" className="rounded-full px-8">
              <Github className="mr-2 w-5 h-5" />
              View on GitHub
            </Button>
          </a>
          <a
            href="https://www.npmjs.com/package/@smc/darwin-ui"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="ghost" className="rounded-full px-8">
              NPM Package
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
