"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Search,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Trash2,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Utility function
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Sample data
const revenueData = [
  { month: "Jan", revenue: 4500, users: 120 },
  { month: "Feb", revenue: 5200, users: 145 },
  { month: "Mar", revenue: 4800, users: 132 },
  { month: "Apr", revenue: 6100, users: 178 },
  { month: "May", revenue: 5900, users: 165 },
  { month: "Jun", revenue: 7200, users: 210 },
];

const pieData = [
  { name: "Desktop", value: 45, color: "#60a5fa" },
  { name: "Mobile", value: 35, color: "#34d399" },
  { name: "Tablet", value: 20, color: "#a78bfa" },
];

const tableData = [
  { id: 1, name: "Premium Plan", status: "active", revenue: "$2,400", growth: "+12%" },
  { id: 2, name: "Basic Plan", status: "active", revenue: "$1,200", growth: "+8%" },
  { id: 3, name: "Enterprise", status: "pending", revenue: "$4,800", growth: "+24%" },
  { id: 4, name: "Starter", status: "inactive", revenue: "$480", growth: "-2%" },
];

// Mini components for the showcase
function Button({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "ghost" | "destructive";
  size?: "default" | "sm" | "icon";
  className?: string;
  [key: string]: any;
}) {
  const variants = {
    default: "bg-white/10 text-white/90 hover:bg-white/20 border border-white/5",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-white/10",
    destructive: "bg-red-500/80 text-white hover:bg-red-600",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    icon: "h-8 w-8",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}) {
  const variants = {
    default: "bg-white/10 text-white/70",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-amber-500/20 text-amber-400",
    destructive: "bg-red-500/20 text-red-400",
  };
  return (
    <span className={cn("px-2 py-1 text-xs rounded-full font-medium", variants[variant])}>
      {children}
    </span>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ElementType;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-white/5">
          <Icon className="w-4 h-4 text-white/60" />
        </div>
        <div className={cn("flex items-center gap-1 text-xs", changeType === "up" ? "text-green-400" : "text-red-400")}>
          {changeType === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-white/50">{title}</p>
        <p className="text-xl font-semibold text-white mt-1">{value}</p>
      </div>
    </Card>
  );
}

export default function DashboardShowcase() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-white/50">Darwin UI Dashboard</span>
        <div className="w-16" />
      </div>

      <div className="flex min-h-[500px]">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/10 bg-black/20 p-4 hidden sm:block">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-sm font-semibold text-white">Darwin UI</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
              { id: "users", icon: Users, label: "Users" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeNav === item.id
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-semibold text-white">Dashboard</h1>
              <p className="text-xs text-white/50">Welcome back, here's your overview</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 h-9 pl-9 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
                />
              </div>
              <Button size="icon" variant="ghost">
                <Bell className="w-4 h-4 text-white/60" />
              </Button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard title="Total Revenue" value="$48,234" change="+12.5%" changeType="up" icon={DollarSign} />
            <MetricCard title="Active Users" value="2,420" change="+8.2%" changeType="up" icon={Users} />
            <MetricCard title="Conversion" value="3.24%" change="-0.4%" changeType="down" icon={Activity} />
            <MetricCard title="Growth Rate" value="+24.5%" change="+4.1%" changeType="up" icon={TrendingUp} />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            {/* Area Chart */}
            <Card className="lg:col-span-2 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Revenue Overview</h3>
                <Button size="sm" variant="ghost">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Pie Chart */}
            <Card className="p-4">
              <h3 className="text-sm font-medium text-white mb-4">Traffic Source</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-white/50">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-sm font-medium text-white">Recent Plans</h3>
              <Button size="sm" variant="primary" onClick={handleShowToast}>
                Add New
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Revenue</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50">Growth</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-white/50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-sm text-white">{row.name}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            row.status === "active" ? "success" : row.status === "pending" ? "warning" : "destructive"
                          }
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-white">{row.revenue}</td>
                      <td className="px-4 py-3 text-sm text-white">{row.growth}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="icon" variant="ghost" onClick={() => setShowModal(true)}>
                            <Eye className="w-4 h-4 text-white/60" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-80 bg-[#151515] rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-white">Plan Details</h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-white/60 mb-4">This modal demonstrates Darwin UI's Modal component with focus lock and backdrop blur.</p>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => setShowModal(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-lg z-50">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400">Action completed successfully!</span>
        </div>
      )}
    </div>
  );
}
