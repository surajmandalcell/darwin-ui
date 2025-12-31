"use client";

import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowRight, ArrowDown } from 'lucide-react';
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

      {/* Dashboard Product UI - Moved to top for impact */}
      <DashboardSection />

      {/* Component Showcase Grid */}
      <ComponentShowcaseSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Hero Section Component
function HeroSection({ scrollToShowcase }: { scrollToShowcase: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Mesh Gradient Background - ChatGPT Style */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Multiple radial gradients creating mesh effect */}
        <motion.div
          className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, #8656e5 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-[20%] right-[15%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #255ec2 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, -25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[550px] h-[550px] rounded-full opacity-35"
          style={{
            background: 'radial-gradient(circle, #e61eea 0%, transparent 70%)',
            filter: 'blur(85px)',
          }}
          animate={{
            y: [0, 35, 0],
            x: [0, -30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[25%] w-[450px] h-[450px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #12a4ff 0%, transparent 70%)',
            filter: 'blur(75px)',
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 35, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

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
          <Button
            onClick={scrollToShowcase}
            size="lg"
            className="rounded-full px-8 py-6 bg-white text-black hover:bg-white/90 hover:scale-105"
          >
            Explore Components
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
          <Link to="/docs/getting-started/introduction">
            <Button size="lg" variant="secondary" className="rounded-full px-8 py-6">
              View Docs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a
            href="https://github.com/surajmandalcell/darwin-ui"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="lg" variant="ghost" className="rounded-full px-8 py-6">
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

// Dashboard Demo Section
function DashboardSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-white/[0.01] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with cooler styling */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-sm backdrop-blur-sm mb-4"
          >
            <span className="text-purple-400">✨ Product Showcase</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
          >
            Beautiful Dashboard UI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Experience the power of Darwin UI with a fully interactive dashboard
          </motion.p>
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

// Compact Footer
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
