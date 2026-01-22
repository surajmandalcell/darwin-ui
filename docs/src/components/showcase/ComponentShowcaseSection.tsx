"use client";

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Slider,
  Select,
  Badge,
  Avatar,
  AvatarGroup,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Progress,
  Skeleton,
  Image,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  SearchInput,
  CloseButton,
} from '@pikoloo/darwin-ui';
import {
  Upload as UploadIcon,
  Calendar,
  Bell,
  AlertCircle,
  MoreHorizontal,
  Info,
  X,
} from 'lucide-react';

// Category definitions
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'form-controls', label: 'Form Controls' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'charts', label: 'Charts' },
  { id: 'layout', label: 'Layout' },
  { id: 'rich-content', label: 'Rich Content' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

// Grid size definitions
// sm: 1x1 (default), md: 1x1 with more padding, wide: 2x1, tall: 1x2, large: 2x2
type GridSize = 'sm' | 'md' | 'wide' | 'tall' | 'large';

// Size classes with responsive adjustments
const SIZE_CLASSES: Record<GridSize, string> = {
  sm: '',
  md: '',
  wide: 'col-span-2',
  tall: 'row-span-2',
  large: 'col-span-2 row-span-2',
};

interface ComponentDef {
  id: string;
  name: string;
  category: CategoryId;
  size: GridSize;
  preview: React.ReactNode;
}

// Small chart SVG representations
function MiniAreaChart() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,35 Q10,30 20,25 T40,20 T60,15 T80,10 L80,40 L0,40 Z"
        fill="url(#areaGrad)"
      />
      <path
        d="M0,35 Q10,30 20,25 T40,20 T60,15 T80,10"
        fill="none"
        stroke="rgba(99, 102, 241, 0.8)"
        strokeWidth="2"
      />
    </svg>
  );
}

function MiniBarChart() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect x="5" y="20" width="10" height="18" rx="2" fill="rgba(34, 197, 94, 0.6)" />
      <rect x="20" y="10" width="10" height="28" rx="2" fill="rgba(34, 197, 94, 0.8)" />
      <rect x="35" y="15" width="10" height="23" rx="2" fill="rgba(34, 197, 94, 0.6)" />
      <rect x="50" y="5" width="10" height="33" rx="2" fill="rgba(34, 197, 94, 1)" />
      <rect x="65" y="12" width="10" height="26" rx="2" fill="rgba(34, 197, 94, 0.7)" />
    </svg>
  );
}

function MiniLineChart() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <path
        d="M5,30 L20,22 L35,28 L50,15 L65,20 L75,10"
        fill="none"
        stroke="rgba(236, 72, 153, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="22" r="2" fill="rgba(236, 72, 153, 1)" />
      <circle cx="50" cy="15" r="2" fill="rgba(236, 72, 153, 1)" />
      <circle cx="75" cy="10" r="2" fill="rgba(236, 72, 153, 1)" />
    </svg>
  );
}

function MiniPieChart() {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <circle cx="20" cy="20" r="16" fill="rgba(99, 102, 241, 0.3)" />
      <path
        d="M20,20 L20,4 A16,16 0 0,1 34,14 Z"
        fill="rgba(99, 102, 241, 0.8)"
      />
      <path
        d="M20,20 L34,14 A16,16 0 0,1 28,34 Z"
        fill="rgba(34, 197, 94, 0.8)"
      />
      <path
        d="M20,20 L28,34 A16,16 0 0,1 8,30 Z"
        fill="rgba(236, 72, 153, 0.8)"
      />
    </svg>
  );
}

function MiniDonutChart() {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="5" />
      <circle
        cx="20"
        cy="20"
        r="14"
        fill="none"
        stroke="rgba(99, 102, 241, 0.8)"
        strokeWidth="5"
        strokeDasharray="44 88"
        strokeDashoffset="0"
      />
      <circle
        cx="20"
        cy="20"
        r="14"
        fill="none"
        stroke="rgba(34, 197, 94, 0.8)"
        strokeWidth="5"
        strokeDasharray="25 88"
        strokeDashoffset="-44"
      />
      <circle
        cx="20"
        cy="20"
        r="14"
        fill="none"
        stroke="rgba(236, 72, 153, 0.8)"
        strokeWidth="5"
        strokeDasharray="19 88"
        strokeDashoffset="-69"
      />
    </svg>
  );
}

function MiniStackedBarChart() {
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      <rect x="5" y="25" width="12" height="13" rx="1" fill="rgba(99, 102, 241, 0.8)" />
      <rect x="5" y="15" width="12" height="10" rx="1" fill="rgba(34, 197, 94, 0.8)" />
      <rect x="22" y="18" width="12" height="20" rx="1" fill="rgba(99, 102, 241, 0.8)" />
      <rect x="22" y="8" width="12" height="10" rx="1" fill="rgba(34, 197, 94, 0.8)" />
      <rect x="39" y="22" width="12" height="16" rx="1" fill="rgba(99, 102, 241, 0.8)" />
      <rect x="39" y="12" width="12" height="10" rx="1" fill="rgba(34, 197, 94, 0.8)" />
      <rect x="56" y="15" width="12" height="23" rx="1" fill="rgba(99, 102, 241, 0.8)" />
      <rect x="56" y="5" width="12" height="10" rx="1" fill="rgba(34, 197, 94, 0.8)" />
    </svg>
  );
}

// All 36 components with grid sizes
const COMPONENTS: ComponentDef[] = [
  // Form Controls (11)
  {
    id: 'button',
    name: 'Button',
    category: 'form-controls',
    size: 'sm',
    preview: (
      <div className="flex gap-1.5 flex-wrap justify-center">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">Alt</Button>
      </div>
    ),
  },
  {
    id: 'input',
    name: 'Input',
    category: 'form-controls',
    size: 'wide',
    preview: (
      <div className="w-full space-y-2">
        <Input placeholder="Type your email..." className="text-xs w-full" />
        <Input placeholder="Password..." type="password" className="text-xs w-full" />
      </div>
    ),
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'form-controls',
    size: 'wide',
    preview: <Textarea placeholder="Write your message here..." rows={3} className="text-xs resize-none w-full" />,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'form-controls',
    size: 'sm',
    preview: (
      <div className="space-y-1">
        <Checkbox label="Option A" defaultChecked />
        <Checkbox label="Option B" />
      </div>
    ),
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'form-controls',
    size: 'sm',
    preview: (
      <div className="space-y-1">
        <Switch label="Active" defaultChecked />
        <Switch label="Notify" />
      </div>
    ),
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'form-controls',
    size: 'wide',
    preview: (
      <div className="w-full space-y-3 px-1">
        <Slider defaultValue={65} />
        <Slider defaultValue={30} />
      </div>
    ),
  },
  {
    id: 'select',
    name: 'Select',
    category: 'form-controls',
    size: 'tall',
    preview: (
      <div className="w-full space-y-2">
        <Select defaultValue="react" className="w-full">
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="svelte">Svelte</option>
        </Select>
        <div className="text-[10px] text-white/40 space-y-1 pl-1">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> React</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Vue</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Svelte</div>
        </div>
      </div>
    ),
  },
  {
    id: 'multiselect',
    name: 'MultiSelect',
    category: 'form-controls',
    size: 'tall',
    preview: (
      <div className="w-full space-y-2">
        <div className="flex items-center gap-1 flex-wrap p-2 rounded-lg bg-white/5 border border-white/10">
          <Badge variant="info" className="text-[10px]">React</Badge>
          <Badge variant="success" className="text-[10px]">Vue</Badge>
          <Badge variant="warning" className="text-[10px]">Svelte</Badge>
          <span className="text-white/40 text-xs">+2</span>
        </div>
        <div className="text-[10px] text-white/40 space-y-1 pl-1">
          <div className="flex items-center gap-2"><Checkbox label="Angular" /></div>
          <div className="flex items-center gap-2"><Checkbox label="Next.js" /></div>
        </div>
      </div>
    ),
  },
  {
    id: 'dateselect',
    name: 'DateSelect',
    category: 'form-controls',
    size: 'sm',
    preview: (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10">
        <Calendar className="w-3.5 h-3.5 text-white/50" />
        <span className="text-xs text-white/70">Jan 22, 2026</span>
      </div>
    ),
  },
  {
    id: 'searchinput',
    name: 'SearchInput',
    category: 'form-controls',
    size: 'wide',
    preview: <SearchInput placeholder="Search components, docs, examples..." className="text-xs w-full" />,
  },
  {
    id: 'upload',
    name: 'Upload',
    category: 'form-controls',
    size: 'sm',
    preview: (
      <div className="flex flex-col items-center gap-1 p-2 rounded-lg border border-dashed border-white/20 bg-white/[0.02]">
        <UploadIcon className="w-4 h-4 text-white/40" />
        <span className="text-[10px] text-white/40">Drop files</span>
      </div>
    ),
  },

  // Data Display (7)
  {
    id: 'badge',
    name: 'Badge',
    category: 'data-display',
    size: 'sm',
    preview: (
      <div className="flex gap-1 flex-wrap justify-center">
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
    ),
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'data-display',
    size: 'sm',
    preview: (
      <AvatarGroup max={3}>
        <Avatar fallback="JD" size="sm" />
        <Avatar fallback="SM" size="sm" />
        <Avatar fallback="AK" size="sm" />
        <Avatar fallback="+5" size="sm" />
      </AvatarGroup>
    ),
  },
  {
    id: 'card',
    name: 'Card',
    category: 'data-display',
    size: 'sm',
    preview: (
      <Card className="bg-white/[0.02] p-2">
        <CardHeader className="p-1">
          <CardTitle className="text-xs">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          <p className="text-[10px] text-white/50">Stats ready</p>
        </CardContent>
      </Card>
    ),
  },
  {
    id: 'table',
    name: 'Table',
    category: 'data-display',
    size: 'wide',
    preview: (
      <div className="text-[10px] border border-white/10 rounded overflow-hidden w-full">
        <div className="flex bg-white/5 border-b border-white/10">
          <div className="flex-1 px-2 py-1 text-white/60">Name</div>
          <div className="flex-1 px-2 py-1 text-white/60">Status</div>
          <div className="flex-1 px-2 py-1 text-white/60">Role</div>
        </div>
        <div className="flex border-b border-white/5">
          <div className="flex-1 px-2 py-1 text-white/80">Alice</div>
          <div className="flex-1 px-2 py-1"><Badge variant="success" className="text-[8px] px-1">Active</Badge></div>
          <div className="flex-1 px-2 py-1 text-white/60">Admin</div>
        </div>
        <div className="flex">
          <div className="flex-1 px-2 py-1 text-white/80">Bob</div>
          <div className="flex-1 px-2 py-1"><Badge variant="warning" className="text-[8px] px-1">Pending</Badge></div>
          <div className="flex-1 px-2 py-1 text-white/60">User</div>
        </div>
      </div>
    ),
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'data-display',
    size: 'wide',
    preview: (
      <div className="space-y-3 w-full px-1">
        <Progress value={75} showValue />
        <Progress value={40} variant="success" />
        <Progress value={90} variant="warning" />
      </div>
    ),
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'data-display',
    size: 'sm',
    preview: (
      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
    ),
  },
  {
    id: 'image',
    name: 'Image',
    category: 'data-display',
    size: 'sm',
    preview: (
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=60&fit=crop"
        alt="Mountain"
        className="w-full h-12 object-cover"
        rounded="md"
      />
    ),
  },

  // Feedback (6)
  {
    id: 'alert',
    name: 'Alert',
    category: 'feedback',
    size: 'sm',
    preview: (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[10px] text-amber-200">Warning alert</span>
      </div>
    ),
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'feedback',
    size: 'sm',
    preview: (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 shadow-lg">
        <Bell className="w-3.5 h-3.5 text-white/60" />
        <span className="text-[10px] text-white/80">Notification</span>
      </div>
    ),
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'feedback',
    size: 'sm',
    preview: (
      <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-xl">
        <div className="text-xs font-medium text-white mb-1">Confirm?</div>
        <p className="text-[10px] text-white/50 mb-2">Are you sure?</p>
        <div className="flex gap-1">
          <Button size="sm" className="text-[10px] h-5 px-2">Yes</Button>
          <Button size="sm" variant="ghost" className="text-[10px] h-5 px-2">No</Button>
        </div>
      </div>
    ),
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'feedback',
    size: 'sm',
    preview: (
      <div className="relative p-2 rounded-lg bg-neutral-900/90 border border-white/10 shadow-2xl">
        <button className="absolute top-1 right-1 text-white/40 hover:text-white/60">
          <X className="w-3 h-3" />
        </button>
        <div className="text-xs font-medium text-white mb-1">Modal</div>
        <p className="text-[10px] text-white/50">Full-screen overlay</p>
      </div>
    ),
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'feedback',
    size: 'sm',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <div className="px-2 py-1 rounded bg-neutral-800 text-[10px] text-white shadow-lg">
          Helpful tip
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800" />
        <Info className="w-4 h-4 text-white/50" />
      </div>
    ),
  },
  {
    id: 'popover',
    name: 'Popover',
    category: 'feedback',
    size: 'sm',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-lg">
          <div className="text-[10px] text-white/80">Quick actions</div>
          <div className="flex gap-1 mt-1">
            <div className="w-4 h-4 rounded bg-white/10" />
            <div className="w-4 h-4 rounded bg-white/10" />
          </div>
        </div>
        <Button size="sm" variant="outline" className="text-[10px] h-5">Open</Button>
      </div>
    ),
  },

  // Navigation (5)
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'navigation',
    size: 'wide',
    preview: (
      <div className="w-full">
        <div className="flex bg-white/5 rounded-lg p-0.5 mb-2">
          <div className="flex-1 px-3 py-1.5 text-[10px] bg-white/10 text-white rounded text-center">Overview</div>
          <div className="flex-1 px-3 py-1.5 text-[10px] text-white/50 text-center">Analytics</div>
          <div className="flex-1 px-3 py-1.5 text-[10px] text-white/50 text-center">Reports</div>
        </div>
        <div className="text-[10px] text-white/60 p-2 bg-white/[0.02] rounded-lg">Dashboard overview content</div>
      </div>
    ),
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'navigation',
    size: 'tall',
    preview: (
      <Accordion type="single" defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[10px] py-1.5">Getting Started</AccordionTrigger>
          <AccordionContent className="text-[10px] text-white/50 pb-2">Installation guide and setup instructions</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-[10px] py-1.5">Components</AccordionTrigger>
          <AccordionContent className="text-[10px] text-white/50 pb-2">Browse all components</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-[10px] py-1.5">Theming</AccordionTrigger>
          <AccordionContent className="text-[10px] text-white/50 pb-2">Customize colors and styles</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    id: 'dropdownmenu',
    name: 'DropdownMenu',
    category: 'navigation',
    size: 'sm',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <div className="p-1 rounded-lg bg-white/5 border border-white/10 shadow-lg w-full">
          <div className="px-2 py-1 text-[10px] text-white/80 hover:bg-white/5 rounded">Edit</div>
          <div className="px-2 py-1 text-[10px] text-white/80 hover:bg-white/5 rounded">Delete</div>
        </div>
        <Button size="sm" variant="outline" className="text-[10px] h-5">
          <MoreHorizontal className="w-3 h-3" />
        </Button>
      </div>
    ),
  },
  {
    id: 'contextmenu',
    name: 'ContextMenu',
    category: 'navigation',
    size: 'sm',
    preview: (
      <div className="text-center">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 mb-1">
          <div className="px-2 py-0.5 text-[10px] text-white/80 hover:bg-white/5 rounded">Copy</div>
          <div className="px-2 py-0.5 text-[10px] text-white/80 hover:bg-white/5 rounded">Paste</div>
          <div className="h-px bg-white/10 my-0.5" />
          <div className="px-2 py-0.5 text-[10px] text-red-400 hover:bg-white/5 rounded">Delete</div>
        </div>
        <span className="text-[10px] text-white/40">Right-click menu</span>
      </div>
    ),
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'navigation',
    size: 'tall',
    preview: (
      <div className="flex gap-2 h-full">
        <div className="w-16 bg-white/5 border border-white/10 rounded p-2 flex flex-col">
          <div className="w-full h-4 bg-white/10 rounded mb-2" />
          <div className="w-full h-4 bg-indigo-500/30 rounded mb-2" />
          <div className="w-full h-4 bg-white/10 rounded mb-2" />
          <div className="w-full h-4 bg-white/10 rounded mb-2" />
          <div className="mt-auto w-full h-4 bg-white/5 rounded" />
        </div>
        <div className="flex-1 text-[10px] text-white/50 flex flex-col">
          <div className="text-white/80 mb-2">Main Content</div>
          <div className="flex-1 bg-white/[0.02] rounded-lg p-2">
            <Skeleton className="h-2 w-full rounded mb-1" />
            <Skeleton className="h-2 w-3/4 rounded mb-1" />
            <Skeleton className="h-2 w-1/2 rounded" />
          </div>
        </div>
      </div>
    ),
  },

  // Charts (6) - All large for better visualization
  {
    id: 'areachart',
    name: 'AreaChart',
    category: 'charts',
    size: 'large',
    preview: (
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/60">Revenue Over Time</span>
          <Badge variant="success" className="text-[8px]">+12.5%</Badge>
        </div>
        <div className="flex-1 min-h-[100px]">
          <MiniAreaChart />
        </div>
        <div className="flex justify-between text-[9px] text-white/40 mt-1">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
        </div>
      </div>
    ),
  },
  {
    id: 'barchart',
    name: 'BarChart',
    category: 'charts',
    size: 'large',
    preview: (
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/60">Monthly Sales</span>
          <Badge variant="info" className="text-[8px]">Q1 2026</Badge>
        </div>
        <div className="flex-1 min-h-[100px]">
          <MiniBarChart />
        </div>
        <div className="flex justify-between text-[9px] text-white/40 mt-1">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
        </div>
      </div>
    ),
  },
  {
    id: 'linechart',
    name: 'LineChart',
    category: 'charts',
    size: 'large',
    preview: (
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/60">User Growth</span>
          <Badge variant="warning" className="text-[8px]">Live</Badge>
        </div>
        <div className="flex-1 min-h-[100px]">
          <MiniLineChart />
        </div>
        <div className="flex justify-between text-[9px] text-white/40 mt-1">
          <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        </div>
      </div>
    ),
  },
  {
    id: 'piechart',
    name: 'PieChart',
    category: 'charts',
    size: 'large',
    preview: (
      <div className="h-full w-full flex items-center gap-4">
        <div className="h-28 w-28 flex-shrink-0">
          <MiniPieChart />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-white/60">Desktop</span>
            <span className="text-white/80 ml-auto">45%</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-white/60">Mobile</span>
            <span className="text-white/80 ml-auto">32%</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <span className="text-white/60">Tablet</span>
            <span className="text-white/80 ml-auto">23%</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'donutchart',
    name: 'DonutChart',
    category: 'charts',
    size: 'large',
    preview: (
      <div className="h-full w-full flex items-center gap-4">
        <div className="h-28 w-28 flex-shrink-0 relative">
          <MiniDonutChart />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-bold text-white">73%</div>
              <div className="text-[8px] text-white/40">Complete</div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-white/60">Completed</span>
            <span className="text-white/80 ml-auto">73%</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-white/60">In Progress</span>
            <span className="text-white/80 ml-auto">18%</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <span className="text-white/60">Pending</span>
            <span className="text-white/80 ml-auto">9%</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'stackedbarchart',
    name: 'StackedBarChart',
    category: 'charts',
    size: 'large',
    preview: (
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/60">Category Distribution</span>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-[8px]">
              <div className="w-2 h-2 rounded bg-indigo-500"></div>
              <span className="text-white/40">A</span>
            </div>
            <div className="flex items-center gap-1 text-[8px]">
              <div className="w-2 h-2 rounded bg-emerald-500"></div>
              <span className="text-white/40">B</span>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[100px]">
          <MiniStackedBarChart />
        </div>
        <div className="flex justify-between text-[9px] text-white/40 mt-1">
          <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
        </div>
      </div>
    ),
  },

  // Layout (3)
  {
    id: 'window',
    name: 'Window',
    category: 'layout',
    size: 'large',
    preview: (
      <div className="rounded-lg border border-white/10 overflow-hidden bg-neutral-900/80 shadow-lg w-full h-full flex flex-col">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="text-[10px] text-white/40 ml-auto">Terminal</span>
        </div>
        <div className="flex-1 p-3 font-mono text-[10px] text-white/60 space-y-1">
          <div><span className="text-emerald-400">$</span> npm install @pikoloo/darwin-ui</div>
          <div className="text-white/40">added 42 packages in 2.3s</div>
          <div><span className="text-emerald-400">$</span> npm run dev</div>
          <div className="text-cyan-400">Ready on http://localhost:3000</div>
        </div>
      </div>
    ),
  },
  {
    id: 'closebutton',
    name: 'CloseButton',
    category: 'layout',
    size: 'sm',
    preview: (
      <div className="flex items-center justify-center gap-2">
        <CloseButton />
        <span className="text-[10px] text-white/40">Close</span>
      </div>
    ),
  },
  {
    id: 'reveal',
    name: 'Reveal',
    category: 'layout',
    size: 'sm',
    preview: (
      <div className="space-y-1">
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500/40 to-transparent rounded animate-pulse" />
        <div className="h-2 w-3/4 bg-gradient-to-r from-indigo-500/30 to-transparent rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
        <div className="h-2 w-1/2 bg-gradient-to-r from-indigo-500/20 to-transparent rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
        <span className="text-[10px] text-white/40 block text-center">Scroll reveal</span>
      </div>
    ),
  },

  // Rich Content (2)
  {
    id: 'mdeditor',
    name: 'MdEditor',
    category: 'rich-content',
    size: 'large',
    preview: (
      <div className="rounded-lg border border-white/10 overflow-hidden bg-neutral-950/80 w-full h-full flex flex-col">
        <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/5">
          <span className="px-1.5 py-0.5 text-[9px] bg-blue-500/20 text-blue-400 rounded font-bold">B</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-white/10 text-white/60 rounded italic">I</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-white/10 text-white/60 rounded underline">U</span>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <span className="px-1.5 py-0.5 text-[9px] bg-white/10 text-white/60 rounded">H1</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-white/10 text-white/60 rounded">H2</span>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <span className="px-1.5 py-0.5 text-[9px] bg-white/10 text-white/60 rounded">Link</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-white/10 text-white/60 rounded">Code</span>
        </div>
        <div className="flex-1 p-3 font-mono text-[10px] text-white/70 space-y-1">
          <div className="text-white font-bold text-sm"># Welcome to Darwin UI</div>
          <div className="text-white/60">A beautiful component library for React.</div>
          <div className="mt-2"><span className="text-pink-400">**Bold**</span> and <span className="text-cyan-400">*italic*</span> text supported.</div>
          <div className="mt-1 p-1 bg-white/5 rounded text-emerald-400 text-[9px]">`code blocks`</div>
        </div>
      </div>
    ),
  },
  {
    id: 'contactform',
    name: 'ContactForm',
    category: 'rich-content',
    size: 'large',
    preview: (
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 w-full h-full flex flex-col">
        <div className="text-sm font-medium text-white mb-3">Get in Touch</div>
        <div className="space-y-2 flex-1">
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="First name" className="text-xs" />
            <Input placeholder="Last name" className="text-xs" />
          </div>
          <Input placeholder="Email address" className="text-xs" />
          <Textarea placeholder="Your message..." rows={2} className="text-xs resize-none" />
        </div>
        <Button size="sm" className="w-full mt-3 text-xs">Send Message</Button>
      </div>
    ),
  },
];

interface ComponentCardProps {
  component: ComponentDef;
  delay?: number;
}

function ComponentCard({ component, delay = 0 }: ComponentCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Get size-specific classes
  const sizeClass = SIZE_CLASSES[component.size];

  // Determine if this is a larger cell for styling adjustments
  const isLarge = component.size === 'large';
  const isTall = component.size === 'tall';
  const isWide = component.size === 'wide';

  return (
    <motion.div
      ref={ref}
      className={`relative p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors duration-300 ${sizeClass}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite'
        }}
      />

      {/* Component name */}
      <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3 font-medium">{component.name}</p>

      {/* Preview - adjust height based on size */}
      <div className={`relative z-10 flex items-center justify-center ${
        isLarge ? 'min-h-[160px] h-[calc(100%-2rem)]' :
        isTall ? 'min-h-[140px] h-[calc(100%-2rem)]' :
        isWide ? 'min-h-[60px]' :
        'min-h-[60px]'
      }`}>
        {component.preview}
      </div>
    </motion.div>
  );
}

export function ComponentShowcaseSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const filteredComponents = activeCategory === 'all'
    ? COMPONENTS
    : COMPONENTS.filter(c => c.category === activeCategory);

  return (
    <section ref={sectionRef} className="min-h-screen py-16 md:py-20 lg:py-24 xl:py-28 px-4 relative">
      {/* Header */}
      <motion.div
        className="text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Beautiful Components</h2>
        <p className="text-lg text-white/50">36 production-ready components with smooth animations and accessibility built-in.</p>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div
        className="max-w-[1400px] mx-auto px-2 md:px-8 lg:px-16 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/[0.02] text-white/50 border border-white/5 hover:bg-white/5 hover:text-white/70'
              }`}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-1.5 text-xs text-white/30">
                  {COMPONENTS.filter(c => c.category === category.id).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Component Grid */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 auto-rows-[120px]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredComponents.map((component, index) => (
              <ComponentCard
                key={component.id}
                component={component}
                delay={index * 0.03}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View Docs Link */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <a href="/docs" className="inline-flex items-center text-white/60 hover:text-white transition-colors group">
          Explore all components in documentation
          <motion.span className="ml-2" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
        </a>
      </motion.div>

      {/* Shimmer keyframes (injected via style) */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
