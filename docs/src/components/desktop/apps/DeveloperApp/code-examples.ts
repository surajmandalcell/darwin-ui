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
        name: 'Single Open',
        description: 'Only one item open at a time',
        previewKey: 'accordion-single',
        code: `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section One</AccordionTrigger>
    <AccordionContent>Content for section one.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section Two</AccordionTrigger>
    <AccordionContent>Content for section two.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
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
        name: 'Size Variants',
        description: 'Small, medium, and large avatars',
        previewKey: 'avatar-sizes',
        code: `<Avatar src="/user.jpg" alt="User" size="sm" />
<Avatar src="/user.jpg" alt="User" size="md" />
<Avatar src="/user.jpg" alt="User" size="lg" />`,
      },
      {
        name: 'Avatar Group',
        description: 'Stacked avatars with overflow count',
        previewKey: 'avatar-group',
        code: `<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>`,
      },
      {
        name: 'Fallback Initials',
        description: 'Initials when no image is provided',
        previewKey: 'avatar-fallback',
        code: `<Avatar fallback="John Doe" size="md" />
<Avatar fallback="Jane Smith" size="md" />
<Avatar fallback="AB" size="md" />`,
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
        name: 'All Variants',
        description: 'Available badge color variants',
        previewKey: 'badge-variants',
        code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="new">New</Badge>`,
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
        name: 'Primary Variants',
        description: 'Primary button with different sizes',
        previewKey: 'button-primary',
        code: `<Button variant="primary">Primary</Button>
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="lg">Large</Button>`,
      },
      {
        name: 'Secondary Variants',
        description: 'Secondary, outline, and ghost styles',
        previewKey: 'button-secondary',
        code: `<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`,
      },
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
        name: 'Destructive',
        description: 'Danger/delete actions',
        previewKey: 'button-destructive',
        code: `<Button variant="destructive">Delete</Button>
<Button variant="destructive" size="icon">
  <Trash2 className="h-4 w-4" />
</Button>`,
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
        name: 'Basic Card',
        description: 'Simple card with header and content',
        previewKey: 'card-basic',
        code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A brief description.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here.</p>
  </CardContent>
</Card>`,
      },
      {
        name: 'With Footer Actions',
        description: 'Card with action buttons in footer',
        previewKey: 'card-with-footer',
        code: `<Card>
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Are you sure you want to proceed?</p>
  </CardContent>
  <CardFooter className="flex gap-2 justify-end">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </CardFooter>
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
        name: 'Basic Checkbox',
        description: 'Standard checkbox states',
        previewKey: 'checkbox-basic',
        code: `const [checked, setChecked] = useState(false);

<Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
<Checkbox label="Already checked" checked={true} onChange={() => {}} />
<Checkbox label="Disabled" disabled />`,
      },
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
        name: 'Basic Context Menu',
        description: 'Right-click to open menu',
        previewKey: 'context-menu-basic',
        code: `<ContextMenu.fromItems items={[
  { label: 'Cut', onClick: () => {} },
  { label: 'Copy', onClick: () => {} },
  { label: 'Paste', onClick: () => {} },
  { label: '', onClick: () => {}, separator: true },
  { label: 'Delete', onClick: () => {}, destructive: true },
]}>
  <div className="p-6 border border-dashed rounded-lg text-center">
    Right-click here
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
        name: 'Basic Dialog',
        description: 'Modal dialog with header and footer',
        previewKey: 'dialog-basic',
        code: `const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="primary">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogClose />
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>A description of the dialog.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
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
        name: 'Basic Dropdown',
        description: 'Menu with items and separator',
        previewKey: 'dropdown-menu-basic',
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
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
        name: 'Rounded Variants',
        description: 'Different border radius options',
        previewKey: 'image-basic',
        code: `<Image src="/mountain.jpg" alt="Mountain" className="w-32 h-24" rounded="md" />
<Image src="/ocean.jpg" alt="Ocean" className="w-24 h-24" rounded="full" />`,
      },
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
        name: 'Input States',
        description: 'Default, error, success, and disabled',
        previewKey: 'input-states',
        code: `<Input placeholder="Default input" />
<Input placeholder="Error state" error />
<Input placeholder="Success state" success />
<Input placeholder="Disabled" disabled />`,
      },
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
        name: 'Basic Modal',
        description: 'Simple modal with title and content',
        previewKey: 'modal-basic',
        code: `const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
  <p>Modal content goes here.</p>
  <div className="flex gap-2 justify-end mt-4">
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
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
    examples: [
      {
        name: 'Basic MultiSelect',
        description: 'Select multiple options with tags',
        previewKey: 'multi-select-basic',
        code: `const [selected, setSelected] = useState<string[]>([]);

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

<MultiSelect
  value={selected}
  onChange={setSelected}
  options={options}
  placeholder="Select frameworks..."
/>`,
      },
    ],
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
        name: 'Basic Popover',
        description: 'Click-triggered floating content',
        previewKey: 'popover-basic',
        code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Show Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h4 className="font-medium mb-1">Popover Title</h4>
    <p className="text-sm text-muted-foreground">Additional information here.</p>
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
        name: 'Linear Progress',
        description: 'Different variants and states',
        previewKey: 'progress-variants',
        code: `<Progress value={65} showValue />
<Progress value={100} variant="success" />
<Progress value={45} variant="warning" />
<Progress indeterminate variant="gradient" />`,
      },
      {
        name: 'Circular Progress',
        description: 'Circular indicators',
        previewKey: 'progress-circular',
        code: `<CircularProgress value={75} showValue />
<CircularProgress value={100} variant="success" showValue />
<CircularProgress indeterminate />`,
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
    examples: [
      {
        name: 'Animation Types',
        description: 'Different reveal animations',
        previewKey: 'reveal-types',
        code: `<Reveal type="slide" direction="up">
  <div>Slide Up</div>
</Reveal>

<Reveal type="fade" delay={0.1}>
  <div>Fade In</div>
</Reveal>

<Reveal type="scale" delay={0.2}>
  <div>Scale</div>
</Reveal>

<Reveal type="blur" delay={0.3}>
  <div>Blur</div>
</Reveal>`,
      },
    ],
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
        name: 'Basic Select',
        description: 'Native select dropdown',
        previewKey: 'select-basic',
        code: `const [value, setValue] = useState('');

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="" disabled>Select an option...</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>`,
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
        name: 'Basic Switch',
        description: 'Toggle switches with labels',
        previewKey: 'switch-basic',
        code: `const [enabled, setEnabled] = useState(false);

<Switch label="Enable notifications" checked={enabled} onChange={setEnabled} />
<Switch label="Dark mode" checked={true} onChange={() => {}} />
<Switch label="Disabled switch" disabled />`,
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
        name: 'Basic Table',
        description: 'Table with header and data rows',
        previewKey: 'table-basic',
        code: `const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Email</TableHeaderCell>
      <TableHeaderCell>Role</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.email}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell><Badge variant="secondary">{row.role}</Badge></TableCell>
      </TableRow>
    ))}
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
        name: 'Basic Sidebar',
        description: 'Standard navigation sidebar',
        previewKey: 'sidebar-basic',
        code: `const [active, setActive] = useState('Dashboard');

const items = [
  { label: 'Dashboard', onClick: () => setActive('Dashboard') },
  { label: 'Projects', onClick: () => setActive('Projects') },
  { label: 'Settings', onClick: () => setActive('Settings') },
];

<Sidebar items={items} activeItem={active} onLogout={() => {}} />`,
      },
      {
        name: 'Collapsible Sidebar',
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
        name: 'Basic Slider',
        description: 'Range slider with custom label',
        previewKey: 'slider-basic',
        code: `const [value, setValue] = useState(50);

<div className="flex justify-between mb-2">
  <span>Volume</span>
  <span className="font-mono">{value}%</span>
</div>
<Slider value={value} onChange={setValue} min={0} max={100} />`,
      },
      {
        name: 'With Value Display',
        description: 'Built-in value tooltip',
        previewKey: 'slider-with-value',
        code: `<Slider value={value} onChange={setValue} min={0} max={100} showValue />`,
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
        name: 'Basic Tabs',
        description: 'Tab navigation with content panels',
        previewKey: 'tabs-basic',
        code: `const [tab, setTab] = useState('tab1');

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Settings</TabsTrigger>
    <TabsTrigger value="tab3">Advanced</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <div className="p-4 bg-muted/50 rounded-lg">Overview content</div>
  </TabsContent>
  <TabsContent value="tab2">
    <div className="p-4 bg-muted/50 rounded-lg">Settings content</div>
  </TabsContent>
  <TabsContent value="tab3">
    <div className="p-4 bg-muted/50 rounded-lg">Advanced content</div>
  </TabsContent>
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
    examples: [
      {
        name: 'Basic Textarea',
        description: 'Textarea with different states',
        previewKey: 'textarea-basic',
        code: `const [value, setValue] = useState('');

<Textarea
  placeholder="Write your message..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={3}
/>
<Textarea placeholder="Error state" error rows={2} />
<Textarea placeholder="Success state" success rows={2} />`,
      },
    ],
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
        name: 'Default Dropzone',
        description: 'Standard drag-and-drop upload area',
        previewKey: 'upload-default',
        code: `const [files, setFiles] = useState<string[]>([]);

const handleUpload = async (uploadedFiles: File[]) => {
  // Upload to your server and return URLs
  await new Promise(resolve => setTimeout(resolve, 500));
  return uploadedFiles.map(f => URL.createObjectURL(f));
};

<Upload
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  maxFiles={4}
  label="Drop images here"
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
