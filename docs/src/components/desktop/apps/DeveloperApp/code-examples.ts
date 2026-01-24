// Component example type
interface ComponentExample {
  name: string;
  description?: string;
  code: string;
  previewKey?: string;
}

interface ComponentCodeExample {
  importCode: string;
  usageCode: string;
  examples?: ComponentExample[];
}

// Component code examples
export const componentCodeExamples: Record<string, ComponentCodeExample> = {
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
    examples: [
      {
        name: 'Multiple Open',
        description: 'Multiple items can be open simultaneously',
        previewKey: 'accordion-multiple',
        code: `<Accordion type="multiple">
  <AccordionItem value="a">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>Can open multiple at once.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>This stays open when others open.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
      {
        name: 'Glass',
        description: 'Frosted glass effect with blur backdrop',
        previewKey: 'accordion-glass',
        code: `<Accordion type="single" defaultValue="item-1" glass>
  <AccordionItem value="item-1">
    <AccordionTrigger>Glass Section</AccordionTrigger>
    <AccordionContent>Glassmorphism accordion styling.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect for fallback avatars',
        previewKey: 'avatar-glass',
        code: `<Avatar fallback="John Doe" size="md" glass />
<Avatar fallback="JS" size="lg" glass />`,
      },
    ],
  },
  'badge': {
    importCode: `import { Badge } from '@pikoloo/darwin-ui';`,
    usageCode: `<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>`,
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect badge',
        previewKey: 'badge-glass',
        code: `<Badge variant="glass">Glass Badge</Badge>`,
      },
    ],
  },
  'button': {
    importCode: `import { Button } from '@pikoloo/darwin-ui';
import { Plus, Settings, Download } from 'lucide-react';`,
    usageCode: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>`,
    examples: [
      {
        name: 'With Icons',
        description: 'Buttons with leading icons',
        previewKey: 'button-with-icon',
        code: `<Button variant="primary">
  <Plus className="h-4 w-4 mr-2" />
  Create New
</Button>
<Button variant="secondary">
  <Download className="h-4 w-4 mr-2" />
  Download
</Button>`,
      },
      {
        name: 'Icon Only',
        description: 'Square icon buttons',
        previewKey: 'button-icon-only',
        code: `<Button variant="primary" size="icon">
  <Plus className="h-4 w-4" />
</Button>
<Button variant="secondary" size="icon">
  <Settings className="h-4 w-4" />
</Button>
<Button variant="ghost" size="icon">
  <Heart className="h-4 w-4" />
</Button>`,
      },
      {
        name: 'Loading State',
        description: 'Button with loading spinner',
        previewKey: 'button-loading',
        code: `const [loading, setLoading] = useState(false);

<Button
  variant="primary"
  loading={loading}
  onClick={() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }}
>
  {loading ? 'Processing...' : 'Click to load'}
</Button>`,
      },
      {
        name: 'Glass',
        description: 'Frosted glass hover effect',
        previewKey: 'button-glass',
        code: `<Button variant="primary" glass>Glass Button</Button>
<Button variant="secondary" glass>Secondary Glass</Button>
<Button variant="outline" glass>Outline Glass</Button>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect with blur backdrop',
        previewKey: 'card-glass',
        code: `<Card glass>
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
    <CardDescription>Frosted glass effect</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content with glassmorphism styling.</p>
  </CardContent>
</Card>`,
      },
    ],
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
    examples: [
      {
        name: 'Indeterminate',
        description: 'Select all with indeterminate state',
        previewKey: 'checkbox-indeterminate',
        code: `const [all, setAll] = useState(false);
const [items, setItems] = useState([true, false, true]);
const someChecked = items.some(Boolean) && !items.every(Boolean);

<Checkbox
  label="Select all"
  checked={all}
  indeterminate={someChecked}
  onChange={(checked) => {
    setAll(checked);
    setItems([checked, checked, checked]);
  }}
/>
<div className="pl-6">
  {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
    <Checkbox key={item} label={item} checked={items[i]} onChange={...} />
  ))}
</div>`,
      },
      {
        name: 'Glass',
        description: 'Frosted glass effect checkbox',
        previewKey: 'checkbox-glass',
        code: `<Checkbox label="Glass checkbox" glass />
<Checkbox label="Glass checked" checked glass />`,
      },
    ],
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
  { label: '', onClick: () => {}, separator: true },
  { label: 'Delete', onClick: handleDelete, destructive: true },
]}>
  <div>Right-click me</div>
</ContextMenu.fromItems>`,
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect context menu',
        previewKey: 'context-menu-glass',
        code: `<ContextMenu.fromItems items={[
  { label: 'Cut', onClick: () => {} },
  { label: 'Copy', onClick: () => {} },
  { label: 'Paste', onClick: () => {} },
]} glass>
  <div className="p-6 border border-dashed rounded-lg text-center">
    Right-click for glass menu
  </div>
</ContextMenu.fromItems>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect dialog',
        previewKey: 'dialog-glass',
        code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="primary">Open Glass Dialog</Button>
  </DialogTrigger>
  <DialogContent glass>
    <DialogClose />
    <DialogHeader>
      <DialogTitle>Glass Dialog</DialogTitle>
      <DialogDescription>Frosted glass effect styling.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="primary" onClick={() => setOpen(false)}>Done</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect dropdown',
        previewKey: 'dropdown-menu-glass',
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Glass Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent glass>
    <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => {}}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => {}} destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
  },
  'image': {
    importCode: `import { Image } from '@pikoloo/darwin-ui';`,
    usageCode: `<Image
  src="/photo.jpg"
  alt="Photo"
  rounded="lg"
  clickToEnlarge
/>`,
    examples: [
      {
        name: 'Click to Enlarge',
        description: 'Opens full-size in lightbox',
        previewKey: 'image-click-to-enlarge',
        code: `<Image
  src="/landscape.jpg"
  alt="Mountain landscape"
  className="w-48 h-32 object-cover"
  rounded="lg"
  clickToEnlarge
/>`,
      },
    ],
  },
  'input': {
    importCode: `import { Input } from '@pikoloo/darwin-ui';`,
    usageCode: `<Input placeholder="Enter text..." />
<Input error placeholder="Error state" />
<Input success placeholder="Success state" />`,
    examples: [
      {
        name: 'With Label',
        description: 'Input with label and helper text',
        previewKey: 'input-with-label',
        code: `<div className="space-y-1">
  <label className="text-sm font-medium">Email address</label>
  <Input type="email" placeholder="you@example.com" />
  <p className="text-xs text-muted-foreground">
    We'll never share your email.
  </p>
</div>`,
      },
    ],
  },
  'modal': {
    importCode: `import { Modal } from '@pikoloo/darwin-ui';`,
    usageCode: `<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
  <p>Modal content here</p>
</Modal>`,
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect modal',
        previewKey: 'modal-glass',
        code: `<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Glass Modal" glass>
  <p>Glassmorphism modal styling.</p>
  <div className="flex gap-2 justify-end mt-4">
    <Button variant="primary" onClick={() => setIsOpen(false)}>Done</Button>
  </div>
</Modal>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect popover',
        previewKey: 'popover-glass',
        code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Glass Popover</Button>
  </PopoverTrigger>
  <PopoverContent glass>
    <h4 className="font-medium mb-1">Glass Popover</h4>
    <p className="text-sm text-muted-foreground">Frosted glass effect.</p>
  </PopoverContent>
</Popover>`,
      },
    ],
  },
  'progress': {
    importCode: `import { Progress, CircularProgress } from '@pikoloo/darwin-ui';`,
    usageCode: `<Progress value={65} showValue />
<Progress variant="success" value={100} />
<Progress indeterminate variant="gradient" />

<CircularProgress value={75} showValue />
<CircularProgress indeterminate />`,
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect progress track',
        previewKey: 'progress-glass',
        code: `<Progress value={65} glass />
<Progress value={80} variant="success" glass showValue />`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect dropdown',
        previewKey: 'select-glass',
        code: `<Select
  glass
  placeholder="Select an option..."
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
/>`,
      },
    ],
  },
  'skeleton': {
    importCode: `import { Skeleton } from '@pikoloo/darwin-ui';`,
    usageCode: `<Skeleton className="h-4 w-full" />
<Skeleton className="h-12 w-12 rounded-full" />`,
    examples: [
      {
        name: 'Card Skeleton',
        description: 'Loading placeholder for cards',
        previewKey: 'skeleton-card',
        code: `<div className="space-y-3">
  <div className="flex items-center gap-3">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
  <Skeleton className="h-24 w-full rounded-lg" />
</div>`,
      },
      {
        name: 'Glass',
        description: 'Frosted glass effect skeleton',
        previewKey: 'skeleton-glass',
        code: `<div className="space-y-3">
  <Skeleton className="h-12 w-12 rounded-full" glass />
  <Skeleton className="h-4 w-3/4" glass />
  <Skeleton className="h-4 w-1/2" glass />
</div>`,
      },
    ],
  },
  'switch': {
    importCode: `import { Switch } from '@pikoloo/darwin-ui';`,
    usageCode: `<Switch
  label="Enable feature"
  checked={enabled}
  onChange={setEnabled}
/>`,
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect switch',
        previewKey: 'switch-glass',
        code: `<Switch label="Glass switch" glass />
<Switch label="Glass enabled" checked glass />`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect table header',
        previewKey: 'table-glass',
        code: `<Table glass>
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
</Table>`,
      },
    ],
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
  { label: 'Dashboard', onClick: () => navigate('/dashboard') },
  { label: 'Projects', onClick: () => navigate('/projects') },
  { label: 'Settings', onClick: () => navigate('/settings') },
];

<Sidebar items={items} activeItem="Dashboard" onLogout={() => logout()} />`,
    examples: [
      {
        name: 'Collapsible',
        description: 'Sidebar that can collapse to icons only',
        previewKey: 'sidebar-collapsible',
        code: `const [active, setActive] = useState('Dashboard');
const [collapsed, setCollapsed] = useState(false);

const items = [
  { label: 'Dashboard', onClick: () => setActive('Dashboard') },
  { label: 'Projects', onClick: () => setActive('Projects') },
  { label: 'Settings', onClick: () => setActive('Settings') },
];

<Sidebar
  items={items}
  activeItem={active}
  onLogout={() => {}}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  collapsible
/>`,
      },
      {
        name: 'Glass',
        description: 'Frosted glass effect sidebar',
        previewKey: 'sidebar-glass',
        code: `<Sidebar
  items={items}
  activeItem="Dashboard"
  onLogout={() => {}}
  glass
/>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect topbar',
        previewKey: 'topbar-glass',
        code: `<Topbar
  items={items}
  activeItem="Home"
  glass
  logo={<span className="font-bold">App</span>}
/>`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect slider track',
        previewKey: 'slider-glass',
        code: `<Slider value={50} onChange={setValue} min={0} max={100} glass />`,
      },
    ],
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
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect tabs list',
        previewKey: 'tabs-glass',
        code: `<Tabs value={tab} onValueChange={setTab} glass>
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Overview content</TabsContent>
  <TabsContent value="tab2">Settings content</TabsContent>
</Tabs>`,
      },
    ],
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
    examples: [
      {
        name: 'Position Variants',
        description: 'Tooltip placement options',
        previewKey: 'tooltip-positions',
        code: `<Tooltip>
  <TooltipTrigger><Button>Top</Button></TooltipTrigger>
  <TooltipContent side="top">Tooltip on top</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger><Button>Bottom</Button></TooltipTrigger>
  <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger><Button>Left</Button></TooltipTrigger>
  <TooltipContent side="left">Tooltip on left</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger><Button>Right</Button></TooltipTrigger>
  <TooltipContent side="right">Tooltip on right</TooltipContent>
</Tooltip>`,
      },
      {
        name: 'Glass',
        description: 'Frosted glass effect tooltip',
        previewKey: 'tooltip-glass',
        code: `<Tooltip>
  <TooltipTrigger><Button>Hover me</Button></TooltipTrigger>
  <TooltipContent glass>Glass tooltip</TooltipContent>
</Tooltip>`,
      },
    ],
  },
  'upload': {
    importCode: `import { Upload } from '@pikoloo/darwin-ui';`,
    usageCode: `const [files, setFiles] = useState<string[]>([]);

const handleUpload = async (files: File[]) => {
  const urls = await uploadToServer(files);
  return urls;
};

<Upload
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={4}
  label="Drop your images here"
/>`,
    examples: [
      {
        name: 'Glass',
        description: 'Frosted glass effect upload zone',
        previewKey: 'upload-glass',
        code: `<Upload
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={4}
  label="Glass dropzone"
  glass
/>`,
      },
    ],
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
