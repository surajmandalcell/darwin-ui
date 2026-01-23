// Component code examples
export const componentCodeExamples: Record<string, { importCode: string; usageCode: string }> = {
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
    usageCode: `// Using the fromItems helper
<ContextMenu.fromItems items={[
  { label: 'Cut', onClick: handleCut },
  { label: 'Copy', onClick: handleCopy },
  { separator: true }, // Separator-only item
  { label: 'Delete', onClick: handleDelete, destructive: true },
]}>
  <div>Right-click me</div>
</ContextMenu.fromItems>

// Using compound components
<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div>Right-click me</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onSelect={handleCut}>Cut</ContextMenu.Item>
    <ContextMenu.Item onSelect={handleCopy}>Copy</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item onSelect={handleDelete} destructive>Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`,
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
    importCode: `import { Sidebar } from '@pikoloo/darwin-ui';
import { Home, Folder, Settings } from 'lucide-react';`,
    usageCode: `const items = [
  { label: 'Dashboard', onClick: () => navigate('/dashboard'), icon: Home },
  { label: 'Projects', onClick: () => navigate('/projects'), icon: Folder },
  { label: 'Settings', onClick: () => navigate('/settings'), icon: Settings },
];

// Basic sidebar
<Sidebar
  items={items}
  activeItem="Dashboard"
  onLogout={() => logout()}
/>

// Collapsible sidebar
<Sidebar
  items={items}
  activeItem="Dashboard"
  onLogout={() => logout()}
  collapsible
  defaultCollapsed={false}
/>

// Controlled collapsed state
const [collapsed, setCollapsed] = useState(false);

<Sidebar
  items={items}
  activeItem="Dashboard"
  onLogout={() => logout()}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
/>`,
  },
  'topbar': {
    importCode: `import { Topbar } from '@pikoloo/darwin-ui';
import { Home, Folder, Settings } from 'lucide-react';`,
    usageCode: `const items = [
  { label: 'Home', onClick: () => navigate('/'), icon: Home },
  { label: 'Projects', onClick: () => navigate('/projects'), icon: Folder },
  { label: 'Settings', onClick: () => navigate('/settings'), icon: Settings },
];

// Basic topbar
<Topbar
  items={items}
  activeItem="Home"
  logo={<span className="font-bold">MyApp</span>}
/>

// Sticky topbar with actions
<Topbar
  items={items}
  activeItem="Home"
  sticky
  logo={<img src="/logo.svg" alt="Logo" />}
  actions={
    <>
      <Button variant="ghost" size="icon">
        <Bell className="h-4 w-4" />
      </Button>
      <Avatar src="/user.jpg" size="sm" />
    </>
  }
/>

// Variant styles
<Topbar items={items} variant="default" />   // Solid background
<Topbar items={items} variant="transparent" /> // No background
<Topbar items={items} variant="bordered" />  // Border only`,
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

// Default variant - full grid with thumbnails
<Upload
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={6}
  label="Drop your images here"
/>

// Compact variant - smaller drop zone, 2-column grid
<Upload
  variant="compact"
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={4}
/>

// Inline variant - single row, same height as Input
<Upload
  variant="inline"
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={4}
  label="Product images"
/>`,
  },
  'window': {
    importCode: `import { Window } from '@pikoloo/darwin-ui';`,
    usageCode: `<Window title="My Window" isOpen={true} onClose={handleClose}>
  <div className="p-4">Window content</div>
</Window>`,
  },
  'backgrounds': {
    importCode: `import { motion } from 'framer-motion';`,
    usageCode: `// Hero Default - Three animated gradient orbs
<div className="relative overflow-hidden">
  {/* Indigo orb - top right */}
  <motion.div
    className="absolute w-[800px] h-[800px] rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
      top: '-20%',
      right: '-10%',
    }}
    animate={{
      scale: [1, 1.2, 1],
      x: [0, 30, 0],
      y: [0, -20, 0],
    }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  />

  {/* Pink orb - bottom left */}
  <motion.div
    className="absolute w-[600px] h-[600px] rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
      bottom: '-10%',
      left: '-5%',
    }}
    animate={{
      scale: [1, 1.15, 1],
      x: [0, -20, 0],
      y: [0, 30, 0],
    }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
  />

  {/* Cyan orb - center */}
  <motion.div
    className="absolute w-[400px] h-[400px] rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
      top: '40%',
      left: '30%',
    }}
    animate={{ scale: [1, 1.3, 1] }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
  />

  {/* Noise texture overlay */}
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")\`,
    }}
  />

  {/* Grid overlay */}
  <div className="absolute inset-0 opacity-[0.03]">
    <div className="absolute inset-0" style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
      backgroundSize: '100px 100px',
    }} />
  </div>

  {/* Your content goes here */}
  <div className="relative z-10">
    {children}
  </div>
</div>`,
  },
  'hover-effects': {
    importCode: `import { motion } from 'framer-motion';`,
    usageCode: `// Gradient Reveal - gradient fades in on hover
<motion.div
  className="relative bg-muted/20 border border-border/60 rounded-2xl p-8 overflow-hidden"
  whileHover="hover"
>
  <motion.div
    className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/5 rounded-2xl"
    initial={{ opacity: 0 }}
    variants={{ hover: { opacity: 1 } }}
    transition={{ duration: 0.3 }}
  />
  <div className="relative z-10">Card content</div>
</motion.div>

// Lift Effect - card lifts on hover
<motion.div
  className="bg-card border border-border rounded-lg p-4"
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  Card content
</motion.div>

// Scale Effect
<motion.div
  className="bg-card border border-border rounded-lg p-4"
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  Card content
</motion.div>

// Glow Effect
<div className="relative group">
  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300" />
  <div className="relative bg-card border border-border rounded-lg p-4">
    Card content
  </div>
</div>`,
  },
};
