/**
 * Centralized code examples for documentation
 * Keeps DocPageResolver.tsx clean and maintainable
 */

// ============================================================================
// Installation Examples
// ============================================================================

export const INSTALL_NPM = `npm install @pikoloo/darwin-ui`;

export const INSTALL_YARN = `yarn add @pikoloo/darwin-ui`;

export const INSTALL_PNPM = `pnpm add @pikoloo/darwin-ui`;

export const IMPORT_STYLES = `import '@pikoloo/darwin-ui/styles.css';`;

export const PROVIDER_SETUP = `import { ToastProvider, AlertProvider, OverlayProvider } from '@pikoloo/darwin-ui';

function App() {
  return (
    <OverlayProvider>
      <AlertProvider>
        <ToastProvider>
          <YourApp />
        </ToastProvider>
      </AlertProvider>
    </OverlayProvider>
  );
}`;

export const FIRST_COMPONENT = `import { Button } from '@pikoloo/darwin-ui';

function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Click me!
    </Button>
  );
}`;

// ============================================================================
// Theming Examples
// ============================================================================

export const CSS_VARIABLES = `:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --muted: 240 3.7% 15.9%;
  --accent: 240 3.7% 15.9%;
  --destructive: 0 62.8% 30.6%;
  --border: 240 3.7% 15.9%;
  --radius: 0.75rem;
}`;

export const CUSTOM_THEME = `/* Override CSS variables in your own CSS */
:root {
  --primary: 220 90% 56%;        /* Blue primary color */
  --secondary: 280 60% 50%;      /* Purple secondary */
  --radius: 0.5rem;              /* Sharper corners */
}`;

export const COMPONENT_OVERRIDE = `import { Button } from '@pikoloo/darwin-ui';

function MyButton() {
  return (
    <Button
      className="bg-linear-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
    >
      Custom styled button
    </Button>
  );
}`;

// ============================================================================
// Hook Examples
// ============================================================================

export const USE_MEDIA_QUERY_EXAMPLE = `import { useMediaQuery } from '@pikoloo/darwin-ui';

function ResponsiveComponent() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div>
      {isDesktop && <DesktopLayout />}
      {isTablet && <TabletLayout />}
      {isMobile && <MobileLayout />}
    </div>
  );
}`;

export const USE_IS_MOBILE_EXAMPLE = `import { useIsMobile } from '@pikoloo/darwin-ui';

function Navigation() {
  const isMobile = useIsMobile(); // true if viewport width < 768px

  return (
    <nav>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </nav>
  );
}`;

export const USE_ESCAPE_KEY_EXAMPLE = `import { useEscapeKey } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal when Escape is pressed
  useEscapeKey(() => setIsOpen(false), isOpen);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Modal Title</h2>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  );
}`;

// ============================================================================
// Component Examples
// ============================================================================

export const BUTTON_EXAMPLE = `import { Button } from '@pikoloo/darwin-ui';
import { Download } from 'lucide-react';

function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="ghost">
        <Download className="mr-2 w-4 h-4" />
        Download
      </Button>
    </div>
  );
}`;

export const BADGE_EXAMPLE = `import { Badge } from '@pikoloo/darwin-ui';

function StatusBadges() {
  return (
    <div className="flex gap-2">
      <Badge variant="success">Published</Badge>
      <Badge variant="warning">Draft</Badge>
      <Badge variant="destructive">Archived</Badge>
      <Badge variant="info">New</Badge>
    </div>
  );
}`;

export const CARD_EXAMPLE = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@pikoloo/darwin-ui';
import { Button } from '@pikoloo/darwin-ui';

function ProductCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Plan</CardTitle>
        <CardDescription>Everything you need to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$29<span className="text-sm text-muted-foreground">/month</span></p>
        <ul className="mt-4 space-y-2">
          <li>✓ Unlimited projects</li>
          <li>✓ Priority support</li>
          <li>✓ Advanced analytics</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  );
}`;

export const INPUT_EXAMPLE = `import { Input } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');

  return (
    <form>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </form>
  );
}`;

export const SELECT_EXAMPLE = `import { Select } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function CountrySelector() {
  const [country, setCountry] = useState('us');

  return (
    <Select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    >
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
    </Select>
  );
}`;

export const CHECKBOX_EXAMPLE = `import { Checkbox } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={(e) => setAccepted(e.target.checked)}
    />
  );
}`;

export const SWITCH_EXAMPLE = `import { Switch } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        label="Email notifications"
        checked={emailNotifications}
        onChange={(e) => setEmailNotifications(e.target.checked)}
      />
      <Switch
        label="Push notifications"
        checked={pushNotifications}
        onChange={(e) => setPushNotifications(e.target.checked)}
      />
    </div>
  );
}`;

export const TABLE_EXAMPLE = `import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@pikoloo/darwin-ui';

function UsersTable() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`;

export const MODAL_EXAMPLE = `import { Modal, Button } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Perform delete action
    console.log('Item deleted');
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Deletion"
      >
        <p className="mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}`;

export const TOAST_EXAMPLE = `import { ToastProvider, useToast, Button } from '@pikoloo/darwin-ui';

function NotificationButton() {
  const { showToast } = useToast();

  return (
    <div className="space-x-2">
      <Button onClick={() => showToast('Successfully saved!', { type: 'success', title: 'Success' })}>
        Success Toast
      </Button>
      <Button onClick={() => showToast('An error occurred', { type: 'error', title: 'Error' })}>
        Error Toast
      </Button>
      <Button onClick={() => showToast('Please review the changes', { type: 'warning', title: 'Warning' })}>
        Warning Toast
      </Button>
    </div>
  );
}`;

export const ALERT_EXAMPLE = `import { AlertProvider, useAlert, Button } from '@pikoloo/darwin-ui';

function DeleteButton() {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert({
      title: 'Delete File',
      message: 'Are you sure you want to delete this file? This action cannot be undone.',
      type: 'error',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm: () => {
        console.log('File deleted');
      },
      onCancel: () => {
        console.log('Cancelled');
      },
    });
  };

  return <Button variant="destructive" onClick={handleClick}>Delete File</Button>;
}`;

export const SKELETON_EXAMPLE = `import { Skeleton } from '@pikoloo/darwin-ui';

function LoadingCard() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}`;

export const IMAGE_EXAMPLE = `import { Image } from '@pikoloo/darwin-ui';

function Gallery() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
      alt="Beautiful landscape"
      className="w-full h-64 object-cover"
      rounded="lg"
    />
  );
}`;

export const DATE_SELECT_EXAMPLE = `import { DateSelect } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function EventScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <DateSelect
      value={selectedDate}
      onChange={(config) => {
        setSelectedDate(config.startDate);
        console.log('Selected date:', config);
      }}
      label="Select event date"
    />
  );
}`;

export const MULTI_SELECT_EXAMPLE = `import { MultiSelect } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function TechStackSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select technologies"
    />
  );
}`;

export const SEARCH_INPUT_EXAMPLE = `import { SearchInput } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');

  return (
    <SearchInput
      placeholder="Search users..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}`;

export const CONTEXT_MENU_EXAMPLE = `import { ContextMenu, Button } from '@pikoloo/darwin-ui';

function FileItem() {
  const menuItems = [
    { label: 'Open', onClick: () => console.log('Open') },
    { label: 'Rename', onClick: () => console.log('Rename') },
    { separator: true, label: '', onClick: () => {} },
    { label: 'Delete', onClick: () => console.log('Delete') },
  ];

  return (
    <ContextMenu items={menuItems} trigger="right-click">
      <Button variant="secondary">Right click me</Button>
    </ContextMenu>
  );
}`;

export const UPLOAD_EXAMPLE = `import { Upload } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function ImageUploader() {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = async (files: File[]) => {
    // Upload to your backend
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.urls; // Return array of uploaded URLs
  };

  return (
    <Upload
      value={images}
      onChange={setImages}
      onUpload={handleUpload}
      maxFiles={6}
      label="Upload product images"
    />
  );
}`;

export const REVEAL_EXAMPLE = `import Reveal from '@pikoloo/darwin-ui/components/reveal';

function AnimatedSection() {
  return (
    <div>
      <Reveal type="fade" duration={0.6}>
        <h2>Fade in on scroll</h2>
      </Reveal>

      <Reveal type="slide" direction="up" delay={0.2}>
        <p>Slide up with delay</p>
      </Reveal>

      <Reveal type="scale" threshold={0.3}>
        <img src="/hero.jpg" alt="Hero" />
      </Reveal>
    </div>
  );
}`;

export const WINDOW_EXAMPLE = `import { Window } from '@pikoloo/darwin-ui';

function AppWindow() {
  return (
    <Window title="My Application">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Window Content</h2>
        <p>This window has macOS-style traffic lights and a draggable title bar.</p>
      </div>
    </Window>
  );
}`;

export const CLOSE_BUTTON_EXAMPLE = `import { CloseButton } from '@pikoloo/darwin-ui';

function Notification() {
  return (
    <div className="relative bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <CloseButton
        className="absolute top-2 right-2"
        onClick={() => console.log('Dismissed')}
      />
      <p>This is a dismissible notification</p>
    </div>
  );
}`;

export const CHARTS_EXAMPLE = `import { AreaChart, BarChart, LineChart, PieChart, DonutChart, StackedBarChart } from '@pikoloo/darwin-ui';

const data = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
];

function Analytics() {
  return (
    <div className="space-y-8">
      <AreaChart
        data={data}
        xKey="month"
        areas={[
          { dataKey: 'revenue', fill: '#60a5fa', name: 'Revenue' },
          { dataKey: 'expenses', fill: '#f87171', name: 'Expenses' },
        ]}
        height={300}
        showGrid
        showLegend
      />

      <BarChart
        data={data}
        xKey="month"
        bars={[
          { dataKey: 'revenue', fill: '#34d399', name: 'Revenue' },
          { dataKey: 'expenses', fill: '#fbbf24', name: 'Expenses' },
        ]}
        height={300}
      />
    </div>
  );
}`;

// ============================================================================
// New Components Examples
// ============================================================================

export const TABS_EXAMPLE = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@pikoloo/darwin-ui';

function SettingsTabs() {
  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p>General settings content</p>
      </TabsContent>
      <TabsContent value="security">
        <p>Security settings content</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p>Notification preferences</p>
      </TabsContent>
    </Tabs>
  );
}`;

export const ACCORDION_EXAMPLE = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@pikoloo/darwin-ui';

function FAQ() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Darwin UI?</AccordionTrigger>
        <AccordionContent>
          Darwin UI is a macOS-inspired React component library with glass-morphism aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! All components follow WAI-ARIA guidelines for accessibility.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

export const AVATAR_EXAMPLE = `import { Avatar, AvatarImage, AvatarFallback } from '@pikoloo/darwin-ui';

function UserAvatar() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback>V</AvatarFallback>
      </Avatar>

      {/* Fallback when image fails */}
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  );
}`;

export const PROGRESS_EXAMPLE = `import { Progress, CircularProgress } from '@pikoloo/darwin-ui';

function UploadProgress() {
  const [progress, setProgress] = useState(45);

  return (
    <div className="space-y-6">
      {/* Linear progress bar */}
      <Progress value={progress} max={100} />

      {/* With label */}
      <Progress value={75} max={100} showLabel />

      {/* Circular progress */}
      <CircularProgress value={60} size={80} strokeWidth={8} />
    </div>
  );
}`;

export const SLIDER_EXAMPLE = `import { Slider } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function VolumeControl() {
  const [volume, setVolume] = useState(50);

  return (
    <div className="space-y-4">
      <Slider
        value={volume}
        onChange={setVolume}
        min={0}
        max={100}
        step={1}
      />
      <p className="text-sm text-white/60">Volume: {volume}%</p>
    </div>
  );
}`;

export const TEXTAREA_EXAMPLE = `import { Textarea } from '@pikoloo/darwin-ui';
import { useState } from 'react';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');

  return (
    <Textarea
      placeholder="Enter your feedback..."
      value={feedback}
      onChange={(e) => setFeedback(e.target.value)}
      rows={4}
      maxLength={500}
      showCount
    />
  );
}`;

export const DIALOG_EXAMPLE = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from '@pikoloo/darwin-ui';

function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input placeholder="Name" />
          <Input placeholder="Email" className="mt-4" />
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export const DROPDOWN_MENU_EXAMPLE = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button } from '@pikoloo/darwin-ui';
import { Settings, User, LogOut } from 'lucide-react';

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;

export const POPOVER_EXAMPLE = `import { Popover, PopoverTrigger, PopoverContent, Button } from '@pikoloo/darwin-ui';

function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Notifications</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Notifications</h4>
          <p className="text-sm text-white/60">You have 3 unread messages.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;

export const TOOLTIP_EXAMPLE = `import { Tooltip, TooltipTrigger, TooltipContent, Button } from '@pikoloo/darwin-ui';

function IconButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Settings</p>
      </TooltipContent>
    </Tooltip>
  );
}`;
