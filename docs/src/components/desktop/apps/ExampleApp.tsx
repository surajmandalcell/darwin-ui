"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Bell,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Mail,
  Star,
  ChevronRight,
} from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvatarGroup,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  Checkbox,
  Select,
  SearchInput,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Skeleton,
  LineChart,
  BarChart,
} from '@smc/darwin-ui';

interface ExampleAppProps {
  windowState: WindowState;
}

// Sidebar navigation items
const navItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard' },
  { icon: Users, label: 'Team', id: 'team' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

// Sample data
const teamMembers = [
  { name: 'Sarah Chen', role: 'Product Lead', status: 'online', avatar: 'SC' },
  { name: 'Mike Johnson', role: 'Engineer', status: 'online', avatar: 'MJ' },
  { name: 'Emily Davis', role: 'Designer', status: 'away', avatar: 'ED' },
  { name: 'Alex Kim', role: 'Engineer', status: 'offline', avatar: 'AK' },
];

const recentActivity = [
  { user: 'Sarah', action: 'pushed to main', time: '2m ago', type: 'code' },
  { user: 'Mike', action: 'opened PR #142', time: '15m ago', type: 'pr' },
  { user: 'Emily', action: 'uploaded designs', time: '1h ago', type: 'design' },
  { user: 'Alex', action: 'fixed bug #89', time: '2h ago', type: 'bug' },
];

const chartData = [
  { name: 'Mon', users: 120, revenue: 2400 },
  { name: 'Tue', users: 180, revenue: 3200 },
  { name: 'Wed', users: 150, revenue: 2800 },
  { name: 'Thu', users: 220, revenue: 4100 },
  { name: 'Fri', users: 280, revenue: 5200 },
  { name: 'Sat', users: 190, revenue: 3800 },
  { name: 'Sun', users: 160, revenue: 3100 },
];

// Stat Card Component
function StatCard({ title, value, change, trend, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/5">
          <Icon className="w-4 h-4 text-white/60" />
        </div>
        <Badge variant={trend === 'up' ? 'success' : 'destructive'}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {change}
        </Badge>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/50">{title}</p>
    </motion.div>
  );
}

// Dashboard Content
function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 text-sm">Welcome back, here's your overview</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            wrapperClassName="w-48"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Users" value="12,847" change="12%" trend="up" icon={Users} />
        <StatCard title="Revenue" value="$48,294" change="8%" trend="up" icon={TrendingUp} />
        <StatCard title="Active Sessions" value="1,429" change="3%" trend="down" icon={BarChart3} />
        <StatCard title="Conversion Rate" value="3.24%" change="0.5%" trend="up" icon={ArrowUpRight} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Users</CardTitle>
                <CardDescription>User activity over the past week</CardDescription>
              </div>
              <Select defaultValue="7d">
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <LineChart
                data={chartData}
                xKey="name"
                lines={[{ dataKey: 'users', name: 'Users', stroke: '#60a5fa' }]}
                height={180}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Daily revenue breakdown</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Export CSV</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Share Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <BarChart
                data={chartData}
                xKey="name"
                bars={[{ dataKey: 'revenue', name: 'Revenue', fill: '#34d399' }]}
                height={180}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Team Members */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Team</CardTitle>
              <AvatarGroup max={3}>
                {teamMembers.map((member) => (
                  <Avatar key={member.name} fallback={member.avatar} size="sm" />
                ))}
              </AvatarGroup>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar fallback={member.avatar} size="sm" />
                  <div>
                    <p className="text-sm text-white font-medium">{member.name}</p>
                    <p className="text-xs text-white/50">{member.role}</p>
                  </div>
                </div>
                <Badge variant={member.status === 'online' ? 'success' : member.status === 'away' ? 'warning' : 'secondary'}>
                  {member.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'code' ? 'bg-blue-400' :
                      activity.type === 'pr' ? 'bg-green-400' :
                      activity.type === 'design' ? 'bg-purple-400' : 'bg-orange-400'
                    }`} />
                    <span className="text-sm text-white/80">
                      <span className="font-medium text-white">{activity.user}</span> {activity.action}
                    </span>
                  </div>
                  <span className="text-xs text-white/40">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex-1">
          <h3 className="font-medium text-white mb-1">Quick Actions</h3>
          <p className="text-sm text-white/50">Common tasks and settings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Notifications</span>
            <Switch checked={notifications} onChange={setNotifications} />
          </div>
          <Checkbox label="Dark mode" checked={true} onChange={() => {}} />
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Send Report
          </Button>
        </div>
      </div>
    </div>
  );
}

// Team Content
function TeamContent() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar fallback={member.avatar} size="lg" />
                    <div className="flex-1">
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-sm text-white/50">{member.role}</p>
                    </div>
                    <Badge variant={member.status === 'online' ? 'success' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="online" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {teamMembers.filter(m => m.status === 'online').map((member) => (
              <Card key={member.name}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar fallback={member.avatar} size="lg" />
                    <div className="flex-1">
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-sm text-white/50">{member.role}</p>
                    </div>
                    <Badge variant="success">online</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="offline" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {teamMembers.filter(m => m.status !== 'online').map((member) => (
              <Card key={member.name}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar fallback={member.avatar} size="lg" />
                    <div className="flex-1">
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-sm text-white/50">{member.role}</p>
                    </div>
                    <Badge variant="secondary">{member.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Analytics Content
function AnalyticsContent() {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Analytics</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/50">Page Views</span>
              <Badge variant="info">Live</Badge>
            </div>
            <p className="text-3xl font-bold text-white">24,892</p>
            <Progress value={75} className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/50">Bounce Rate</span>
              <Badge variant="warning">Attention</Badge>
            </div>
            <p className="text-3xl font-bold text-white">32.4%</p>
            <Progress value={32} variant="warning" className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/50">Avg. Session</span>
              <Badge variant="success">Good</Badge>
            </div>
            <p className="text-3xl font-bold text-white">4m 32s</p>
            <Progress value={85} variant="success" className="mt-3" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Visitors and page views over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <LineChart
              data={chartData}
              xKey="name"
              lines={[
                { dataKey: 'users', name: 'Visitors', stroke: '#60a5fa' },
                { dataKey: 'revenue', name: 'Page Views', stroke: '#34d399' },
              ]}
              height={240}
              showLegend
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Content
function SettingsContent() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-white">Email Notifications</p>
              <p className="text-xs text-white/50">Receive updates via email</p>
            </div>
            <Switch checked={emailNotif} onChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-white">Push Notifications</p>
              <p className="text-xs text-white/50">Receive push notifications</p>
            </div>
            <Switch checked={pushNotif} onChange={setPushNotif} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-white">Weekly Digest</p>
              <p className="text-xs text-white/50">Get a weekly summary</p>
            </div>
            <Switch checked={weeklyDigest} onChange={setWeeklyDigest} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Theme</span>
            <Select defaultValue="dark">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Language</span>
            <Select defaultValue="en">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}

export function ExampleApp({ windowState: _windowState }: ExampleAppProps) {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <DashboardContent />;
      case 'team': return <TeamContent />;
      case 'analytics': return <AnalyticsContent />;
      case 'settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-full bg-neutral-900">
      {/* Sidebar */}
      <motion.div
        className="w-16 bg-neutral-950 border-r border-white/10 flex flex-col items-center py-4"
        initial={{ x: -16, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {/* Logo */}
        <motion.div
          className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Star className="w-5 h-5 text-white" />
        </motion.div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => setActiveNav(item.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* User Avatar */}
        <Avatar fallback="JD" size="sm" />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNav}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExampleApp;
