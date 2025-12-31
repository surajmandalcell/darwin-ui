"use client";

import { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShowcaseCard } from '../components/ShowcaseCard';
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
      <HeroSection scrollToShowcase={scrollToShowcase} />

      {/* Component Showcase Grid */}
      <ComponentShowcaseSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Hero Section Component
function HeroSection({ scrollToShowcase }: { scrollToShowcase: () => void }) {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Handle mouse enter with 300ms delay
  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDashboardExpanded(true);
    }, 300);
  };

  // Handle mouse leave - collapse immediately
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsDashboardExpanded(false);
  };

  // Handle ESC key to collapse
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDashboardExpanded(false);
      }
    };

    if (isDashboardExpanded) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isDashboardExpanded]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.4) 50%, transparent 80%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[800px] h-[600px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.4), transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Left Side - Content */}
        <div className="max-w-2xl space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
              Darwin UI
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/50 max-w-lg">
              26 premium components for modern web applications
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              onClick={scrollToShowcase}
              className="px-6 py-3 bg-white text-black hover:bg-white/90"
            >
              Explore Components
            </Button>
            <Link to="/docs/getting-started/introduction">
              <Button variant="outline" className="px-6 py-3">
                View Docs
              </Button>
            </Link>
            <a
              href="https://github.com/surajmandalcell/darwin-ui"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="px-6 py-3">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </Button>
            </a>
          </motion.div>

          {/* Install Command */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative group"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors w-fit">
              <code className="flex-1 text-sm font-mono text-white/80">
                npm install @smc/darwin-ui
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('npm install @smc/darwin-ui');
                }}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Screenshot - Interactive on hover */}
      <div
        className="hidden lg:block absolute -right-[15%] top-1/2 -translate-y-1/2 w-[60%] z-20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: isDashboardExpanded ? -250 : 0,
          }}
          transition={{
            opacity: { delay: 0.3, duration: 0.8 },
            x: isDashboardExpanded
              ? { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
              : { delay: 0.3, duration: 0.8 }
          }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}

// Component Showcase Grid Section
function ComponentShowcaseSection() {
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
        <div className="flex flex-col gap-3 items-center">
          <div className="w-64 rounded-lg border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white text-sm">Example Modal</h3>
              <button className="text-white/60 hover:text-white text-xs">✕</button>
            </div>
            <p className="text-white/70 text-xs">Dialog with smooth animations and backdrop blur</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Toast',
      slug: 'toast',
      description: 'Notification system with auto-dismiss',
      preview: (
        <div className="w-72 rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-500/5 p-3 backdrop-blur-sm shadow-lg">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
            <div className="flex-1">
              <p className="font-medium text-white text-sm">Success!</p>
              <p className="text-white/70 text-xs mt-0.5">Toast notification with auto-dismiss</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Alert',
      slug: 'alert',
      description: 'Alert dialogs with variants',
      preview: (
        <div className="w-64 rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-4 backdrop-blur-sm shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">i</div>
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm mb-1">Alert</h4>
              <p className="text-white/70 text-xs">Informational alert message</p>
            </div>
          </div>
        </div>
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

// Compact Footer
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Made by */}
          <div className="text-white/60 text-sm">
            Made by{' '}
            <span className="text-white font-medium">Suraj Mandal</span>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:surajmandalcell@gmail.com"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              surajmandalcell@gmail.com
            </a>
            <a
              href="https://github.com/surajmandalcell"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
