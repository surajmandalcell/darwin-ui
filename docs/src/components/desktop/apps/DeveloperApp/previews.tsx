"use client";

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  Topbar,
} from '@pikoloo/darwin-ui';
import { containerVariants, itemVariants } from './animations';

// Component preview wrapper with animations
export function AnimatedPreviewWrapper({ children, componentKey }: { children: React.ReactNode; componentKey: string }) {
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
              <Button type="button" variant={btn.variant}>{btn.label}</Button>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button type="button" variant="primary" loading={loading} onClick={handleLoadingClick}>
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
            <Button type="button" variant="primary" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="secondary" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="destructive" size="icon">
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
            <Button type="button" variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="secondary">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="outline">
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
          <Button type="button" variant="primary" size="sm">Action</Button>
          <Button type="button" variant="ghost" size="sm">Cancel</Button>
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
            height={280}
            outerRadius={70}
            showLegend
          />
        );
      case 'donut':
        return (
          <DonutChart
            data={pieData}
            nameKey="category"
            valueKey="sales"
            height={280}
            innerRadius={50}
            outerRadius={70}
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
            type="button"
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
            style={{ width: '100%', height: chartType === 'pie' || chartType === 'donut' ? 280 : 220 }}
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
    { label: 'Delete', onClick: () => {}, destructive: true },
  ];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ContextMenu.fromItems items={menuItems}>
        <div className="p-8 border border-dashed border-border rounded-lg text-center">
          <p className="text-muted-foreground text-sm">Right-click here to open context menu</p>
        </div>
      </ContextMenu.fromItems>
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
      <Button type="button" variant="primary" onClick={() => setIsOpen(true)}>
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
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="button" variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
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
          <Button type="button" variant="primary">Open Dialog</Button>
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
              <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="button" variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
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
          <Button type="button" variant="outline">Open Menu</Button>
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
          <Button type="button" variant="outline">Show Info</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Popover Content</h4>
            <p className="text-sm text-muted-foreground">
              This is a popover with some helpful information. It can contain any content.
            </p>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="primary" size="sm">Learn More</Button>
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
      <Button type="button" variant="outline" size="sm" onClick={() => setKey(k => k + 1)}>
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
            <Button type="button" variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a tooltip!
          </TooltipContent>
        </Tooltip>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Tooltip>
          <TooltipTrigger>
            <Button type="button" variant="ghost">Left tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Appears on the left
          </TooltipContent>
        </Tooltip>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Tooltip>
          <TooltipTrigger>
            <Button type="button" variant="secondary">Bottom</Button>
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

// Background presets
type BackgroundPreset = 'hero' | 'sunset' | 'ocean' | 'aurora' | 'minimal';

const backgroundPresets: Record<BackgroundPreset, {
  name: string;
  orbs: Array<{
    color: string;
    size: number;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    animation: { scale: number[]; x?: number[]; y?: number[] };
    duration: number;
  }>;
}> = {
  hero: {
    name: 'Hero Default',
    orbs: [
      {
        color: 'rgba(99, 102, 241, 0.15)',
        size: 300,
        position: { top: '-20%', right: '-10%' },
        animation: { scale: [1, 1.2, 1], x: [0, 15, 0], y: [0, -10, 0] },
        duration: 20,
      },
      {
        color: 'rgba(236, 72, 153, 0.12)',
        size: 220,
        position: { bottom: '-10%', left: '-5%' },
        animation: { scale: [1, 1.15, 1], x: [0, -10, 0], y: [0, 15, 0] },
        duration: 15,
      },
      {
        color: 'rgba(34, 211, 238, 0.08)',
        size: 150,
        position: { top: '40%', left: '30%' },
        animation: { scale: [1, 1.3, 1] },
        duration: 12,
      },
    ],
  },
  sunset: {
    name: 'Sunset',
    orbs: [
      {
        color: 'rgba(249, 115, 22, 0.18)',
        size: 280,
        position: { top: '-15%', right: '-5%' },
        animation: { scale: [1, 1.15, 1], x: [0, 20, 0] },
        duration: 18,
      },
      {
        color: 'rgba(236, 72, 153, 0.15)',
        size: 250,
        position: { bottom: '-20%', left: '10%' },
        animation: { scale: [1, 1.2, 1], y: [0, -15, 0] },
        duration: 14,
      },
      {
        color: 'rgba(234, 179, 8, 0.1)',
        size: 180,
        position: { top: '30%', left: '50%' },
        animation: { scale: [1, 1.25, 1] },
        duration: 16,
      },
    ],
  },
  ocean: {
    name: 'Ocean',
    orbs: [
      {
        color: 'rgba(59, 130, 246, 0.18)',
        size: 300,
        position: { top: '-25%', right: '0%' },
        animation: { scale: [1, 1.2, 1], x: [0, 15, 0] },
        duration: 20,
      },
      {
        color: 'rgba(34, 211, 238, 0.15)',
        size: 220,
        position: { bottom: '-15%', left: '-10%' },
        animation: { scale: [1, 1.15, 1], y: [0, 20, 0] },
        duration: 16,
      },
      {
        color: 'rgba(6, 182, 212, 0.1)',
        size: 160,
        position: { top: '50%', left: '40%' },
        animation: { scale: [1, 1.2, 1] },
        duration: 14,
      },
    ],
  },
  aurora: {
    name: 'Aurora',
    orbs: [
      {
        color: 'rgba(34, 197, 94, 0.15)',
        size: 320,
        position: { top: '-30%', left: '20%' },
        animation: { scale: [1, 1.3, 1], x: [0, -20, 0] },
        duration: 22,
      },
      {
        color: 'rgba(168, 85, 247, 0.12)',
        size: 250,
        position: { top: '10%', right: '-10%' },
        animation: { scale: [1, 1.2, 1], y: [0, 15, 0] },
        duration: 18,
      },
      {
        color: 'rgba(34, 211, 238, 0.08)',
        size: 180,
        position: { bottom: '-5%', left: '30%' },
        animation: { scale: [1, 1.25, 1] },
        duration: 15,
      },
    ],
  },
  minimal: {
    name: 'Minimal',
    orbs: [
      {
        color: 'rgba(99, 102, 241, 0.08)',
        size: 400,
        position: { top: '50%', left: '50%' },
        animation: { scale: [1, 1.15, 1] },
        duration: 20,
      },
    ],
  },
};

// Backgrounds Preview
function BackgroundsPreview() {
  const [preset, setPreset] = useState<BackgroundPreset>('hero');
  const currentPreset = backgroundPresets[preset];

  return (
    <motion.div
      className="w-full space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Preset selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(backgroundPresets) as [BackgroundPreset, typeof backgroundPresets[BackgroundPreset]][]).map(([key, value]) => (
          <Button
            key={key}
            type="button"
            variant={preset === key ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setPreset(key)}
          >
            {value.name}
          </Button>
        ))}
      </div>

      {/* Preview container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={preset}
          className="relative h-64 rounded-xl overflow-hidden bg-background border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient orbs */}
          {currentPreset.orbs.map((orb, i) => (
            <motion.div
              key={`${preset}-orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                ...orb.position,
                transform: orb.position.top === '50%' && orb.position.left === '50%' ? 'translate(-50%, -50%)' : undefined,
              }}
              animate={orb.animation}
              transition={{ duration: orb.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-muted-foreground/60 font-medium">
              {currentPreset.name}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// Hover Effects Preview
function HoverEffectsPreview() {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Gradient Reveal */}
        <motion.div
          className="relative p-4 bg-muted/20 border border-border/60 rounded-xl overflow-hidden cursor-pointer"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-violet-500/20 to-indigo-500/5 rounded-xl"
            initial={{ opacity: 0 }}
            variants={{ hover: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10 text-center">
            <span className="text-xs font-medium text-muted-foreground">Gradient Reveal</span>
          </div>
        </motion.div>

        {/* Lift */}
        <motion.div
          className="p-4 bg-muted/20 border border-border/60 rounded-xl cursor-pointer text-center"
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-xs font-medium text-muted-foreground">Lift</span>
        </motion.div>

        {/* Scale */}
        <motion.div
          className="p-4 bg-muted/20 border border-border/60 rounded-xl cursor-pointer text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-xs font-medium text-muted-foreground">Scale</span>
        </motion.div>

        {/* Glow */}
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
          <div className="relative p-4 bg-muted/20 border border-border/60 rounded-xl text-center">
            <span className="text-xs font-medium text-muted-foreground">Glow</span>
          </div>
        </div>

        {/* Border Glow */}
        <motion.div
          className="relative p-4 rounded-xl cursor-pointer text-center overflow-hidden"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
              backgroundSize: '300% 100%',
            }}
            initial={{ opacity: 0 }}
            variants={{ hover: { opacity: 1 } }}
            animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
            transition={{
              opacity: { duration: 0.3 },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
          <div className="absolute inset-px rounded-[11px] bg-muted/90" />
          <span className="relative z-10 text-xs font-medium text-muted-foreground">Border Glow</span>
        </motion.div>

        {/* Slide Arrow */}
        <motion.div
          className="p-4 bg-muted/20 border border-border/60 rounded-xl cursor-pointer flex items-center justify-center gap-2"
          whileHover="hover"
        >
          <span className="text-xs font-medium text-muted-foreground">Slide Arrow</span>
          <motion.span
            className="text-muted-foreground"
            variants={{ hover: { x: 4 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Component previews map
export const componentPreviews: Record<string, React.ComponentType> = {
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
  'backgrounds': BackgroundsPreview,
  'hover-effects': HoverEffectsPreview,
};

// ============================================================================
// EXAMPLE PREVIEWS - Individual variant/example previews for documentation
// ============================================================================

// Button Examples
function ButtonWithIconExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="primary">
        <Plus className="h-4 w-4 mr-2" />
        Create New
      </Button>
      <Button type="button" variant="secondary">
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
}

function ButtonIconOnlyExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="primary" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
      <Button type="button" variant="secondary" size="icon">
        <Settings className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      <Button type="button" variant="destructive" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ButtonLoadingExample() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button
        type="button"
        variant="primary"
        loading={loading}
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      >
        {loading ? 'Processing...' : 'Click to load'}
      </Button>
      <Button type="button" variant="secondary" loading>Always loading</Button>
    </div>
  );
}

// Input Examples
function InputWithLabelExample() {
  return (
    <div className="flex flex-col gap-1 max-w-xs">
      <label className="text-sm font-medium text-foreground">Email address</label>
      <Input type="email" placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">We&apos;ll never share your email.</p>
    </div>
  );
}

// Checkbox Examples
function CheckboxIndeterminateExample() {
  const [all, setAll] = useState(false);
  const [items, setItems] = useState([true, false, true]);

  const someChecked = items.some(Boolean) && !items.every(Boolean);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        label="Select all"
        checked={all}
        indeterminate={someChecked}
        onChange={(checked) => {
          setAll(checked);
          setItems([checked, checked, checked]);
        }}
      />
      <div className="pl-6 flex flex-col gap-1">
        {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
          <Checkbox
            key={item}
            label={item}
            checked={items[i]}
            onChange={(checked) => {
              const newItems = [...items];
              newItems[i] = checked;
              setItems(newItems);
              setAll(newItems.every(Boolean));
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton Examples
function SkeletonCardExample() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  );
}

// Accordion Examples
function AccordionMultipleExample() {
  return (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="a">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>Can open multiple items at once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>This stays open when others open.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Tooltip Examples
function TooltipPositionsExample() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip>
        <TooltipTrigger><Button type="button" variant="outline">Top</Button></TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger><Button type="button" variant="outline">Bottom</Button></TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger><Button type="button" variant="outline">Left</Button></TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger><Button type="button" variant="outline">Right</Button></TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
    </div>
  );
}

// Sidebar Examples
function SidebarCollapsibleExample() {
  const [active, setActive] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { label: 'Dashboard', onClick: () => setActive('Dashboard') },
    { label: 'Projects', onClick: () => setActive('Projects') },
    { label: 'Settings', onClick: () => setActive('Settings') },
  ];
  return (
    <div className="space-y-2">
      <Switch label="Collapsed" checked={collapsed} onChange={setCollapsed} />
      <div className="flex h-48 rounded-lg border border-border overflow-hidden">
        <Sidebar items={items} activeItem={active} onLogout={() => {}} collapsed={collapsed} onCollapsedChange={setCollapsed} collapsible />
        <div className="flex-1 p-4 flex items-center justify-center">
          <span className="text-muted-foreground">Current: {active}</span>
        </div>
      </div>
    </div>
  );
}

// Image Examples
function ImageClickToEnlargeExample() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
      alt="Mountain landscape"
      className="w-48 h-32 object-cover"
      rounded="lg"
      clickToEnlarge
    />
  );
}

// Glass Example Components - These show glassmorphism styling concepts
// Note: Glass styling is achieved via className, not a glass prop
const glassStyles = "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10";

function CardGlassExample() {
  return (
    <Card className={`max-w-sm ${glassStyles}`}>
      <CardHeader>
        <CardTitle>Glass Card</CardTitle>
        <CardDescription>Frosted glass effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Content with glassmorphism styling.</p>
      </CardContent>
    </Card>
  );
}

function BadgeGlassExample() {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${glassStyles}`}>
      Glass Badge
    </span>
  );
}

function ButtonGlassExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="primary" className="backdrop-blur-sm">Glass Button</Button>
      <Button type="button" variant="secondary" className="backdrop-blur-sm">Secondary Glass</Button>
      <Button type="button" variant="outline" className={glassStyles}>Outline Glass</Button>
    </div>
  );
}

function AccordionGlassExample() {
  return (
    <div className={`max-w-sm rounded-lg ${glassStyles}`}>
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Glass Section</AccordionTrigger>
          <AccordionContent>Glassmorphism accordion styling.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Another Section</AccordionTrigger>
          <AccordionContent>Frosted glass effect.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function AvatarGlassExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar fallback="John Doe" size="md" className={glassStyles} />
      <Avatar fallback="JS" size="lg" className={glassStyles} />
    </div>
  );
}

function CheckboxGlassExample() {
  const [checked, setChecked] = useState(false);
  return (
    <div className={`flex flex-col gap-3 p-4 rounded-lg ${glassStyles}`}>
      <Checkbox label="Glass checkbox" checked={checked} onChange={setChecked} />
      <Checkbox label="Glass checked" checked onChange={() => {}} />
    </div>
  );
}

function SwitchGlassExample() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className={`flex flex-col gap-3 p-4 rounded-lg ${glassStyles}`}>
      <Switch label="Glass switch" checked={enabled} onChange={setEnabled} />
      <Switch label="Glass enabled" checked onChange={() => {}} />
    </div>
  );
}

function DialogGlassExample() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="primary">Open Glass Dialog</Button>
      </DialogTrigger>
      <DialogContent className={glassStyles}>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Glass Dialog</DialogTitle>
          <DialogDescription>Frosted glass effect styling.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="primary" onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ModalGlassExample() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="primary" onClick={() => setIsOpen(true)}>Open Glass Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Glass Modal" className={glassStyles}>
        <p className="text-muted-foreground mb-4">Glassmorphism modal styling.</p>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="primary" onClick={() => setIsOpen(false)}>Done</Button>
        </div>
      </Modal>
    </>
  );
}

function DropdownMenuGlassExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline">Glass Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={glassStyles}>
        <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => {}} destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ContextMenuGlassExample() {
  return (
    <ContextMenu.fromItems items={[
      { label: 'Cut', onClick: () => {} },
      { label: 'Copy', onClick: () => {} },
      { label: 'Paste', onClick: () => {} },
    ]}>
      <div className={`p-6 rounded-lg text-center ${glassStyles}`}>
        <span className="text-sm text-muted-foreground">Right-click for glass menu</span>
      </div>
    </ContextMenu.fromItems>
  );
}

function PopoverGlassExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline">Glass Popover</Button>
      </PopoverTrigger>
      <PopoverContent className={glassStyles}>
        <h4 className="font-medium text-foreground mb-1">Glass Popover</h4>
        <p className="text-sm text-muted-foreground">Frosted glass effect.</p>
      </PopoverContent>
    </Popover>
  );
}

function TooltipGlassExample() {
  return (
    <Tooltip>
      <TooltipTrigger><Button type="button" variant="outline">Hover me</Button></TooltipTrigger>
      <TooltipContent className={glassStyles}>Glass tooltip</TooltipContent>
    </Tooltip>
  );
}

function ProgressGlassExample() {
  return (
    <div className={`space-y-4 w-full max-w-xs p-4 rounded-lg ${glassStyles}`}>
      <Progress value={65} />
      <Progress value={80} variant="success" showValue />
    </div>
  );
}

function SelectGlassExample() {
  const [value, setValue] = useState('');
  return (
    <div className="w-full max-w-xs">
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={glassStyles}
      >
        <option value="" disabled>Select an option...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  );
}

function SkeletonGlassExample() {
  return (
    <div className={`space-y-3 p-4 rounded-lg ${glassStyles}`}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function TableGlassExample() {
  return (
    <div className={`rounded-lg overflow-hidden ${glassStyles}`}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell><Badge variant="success">Active</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function TabsGlassExample() {
  const [tab, setTab] = useState('tab1');
  return (
    <div className={`p-4 rounded-lg ${glassStyles}`}>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="tab1">Overview</TabsTrigger>
          <TabsTrigger value="tab2">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">Overview content</div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">Settings content</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SliderGlassExample() {
  const [value, setValue] = useState(50);
  return (
    <div className={`w-full max-w-xs p-4 rounded-lg ${glassStyles}`}>
      <Slider value={value} onChange={setValue} min={0} max={100} />
    </div>
  );
}

function UploadGlassExample() {
  const [files, setFiles] = useState<string[]>([]);
  const handleUpload = async (uploadedFiles: File[]) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return uploadedFiles.map(f => URL.createObjectURL(f));
  };
  return (
    <div className={`rounded-lg ${glassStyles}`}>
      <Upload
        value={files}
        onChange={setFiles}
        onUpload={handleUpload}
        maxFiles={4}
        label="Glass dropzone"
      />
    </div>
  );
}

function SidebarGlassExample() {
  const [active, setActive] = useState('Dashboard');
  const items = [
    { label: 'Dashboard', onClick: () => setActive('Dashboard') },
    { label: 'Projects', onClick: () => setActive('Projects') },
    { label: 'Settings', onClick: () => setActive('Settings') },
  ];
  return (
    <div className={`flex h-48 rounded-lg overflow-hidden ${glassStyles}`}>
      <Sidebar items={items} activeItem={active} onLogout={() => {}} />
      <div className="flex-1 p-4 flex items-center justify-center">
        <span className="text-muted-foreground">Current: {active}</span>
      </div>
    </div>
  );
}

function TopbarGlassExample() {
  const items = [
    { label: 'Home', onClick: () => {} },
    { label: 'Projects', onClick: () => {} },
    { label: 'Settings', onClick: () => {} },
  ];
  return (
    <div className={`w-full rounded-lg overflow-hidden ${glassStyles}`}>
      <Topbar items={items} activeItem="Home" logo={<span className="font-bold">App</span>} />
    </div>
  );
}

// Component example previews map
export const componentExamplePreviews: Record<string, React.ComponentType> = {
  // Button
  'button-with-icon': ButtonWithIconExample,
  'button-icon-only': ButtonIconOnlyExample,
  'button-loading': ButtonLoadingExample,
  'button-glass': ButtonGlassExample,
  // Input
  'input-with-label': InputWithLabelExample,
  // Checkbox
  'checkbox-indeterminate': CheckboxIndeterminateExample,
  'checkbox-glass': CheckboxGlassExample,
  // Skeleton
  'skeleton-card': SkeletonCardExample,
  'skeleton-glass': SkeletonGlassExample,
  // Accordion
  'accordion-multiple': AccordionMultipleExample,
  'accordion-glass': AccordionGlassExample,
  // Tooltip
  'tooltip-positions': TooltipPositionsExample,
  'tooltip-glass': TooltipGlassExample,
  // Sidebar
  'sidebar-collapsible': SidebarCollapsibleExample,
  'sidebar-glass': SidebarGlassExample,
  // Image
  'image-click-to-enlarge': ImageClickToEnlargeExample,
  // Glass Examples
  'card-glass': CardGlassExample,
  'badge-glass': BadgeGlassExample,
  'avatar-glass': AvatarGlassExample,
  'switch-glass': SwitchGlassExample,
  'dialog-glass': DialogGlassExample,
  'modal-glass': ModalGlassExample,
  'dropdown-menu-glass': DropdownMenuGlassExample,
  'context-menu-glass': ContextMenuGlassExample,
  'popover-glass': PopoverGlassExample,
  'progress-glass': ProgressGlassExample,
  'select-glass': SelectGlassExample,
  'table-glass': TableGlassExample,
  'tabs-glass': TabsGlassExample,
  'slider-glass': SliderGlassExample,
  'upload-glass': UploadGlassExample,
  'topbar-glass': TopbarGlassExample,
};
