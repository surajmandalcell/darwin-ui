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
  Eye,
  Trash2,
  X,
  Check,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const revenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 5900 },
  { month: "Jun", revenue: 7200 },
];

const pieData = [
  { name: "Desktop", value: 45, color: "#3b82f6" },
  { name: "Mobile", value: 35, color: "#10b981" },
  { name: "Tablet", value: 20, color: "#8b5cf6" },
];

const tableData = [
  { id: 1, name: "Premium Plan", status: "active", revenue: "$2,400", growth: "+12%" },
  { id: 2, name: "Basic Plan", status: "active", revenue: "$1,200", growth: "+8%" },
  { id: 3, name: "Enterprise", status: "pending", revenue: "$4,800", growth: "+24%" },
];

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
    default: "bg-white/[0.08] text-white/90 hover:bg-white/[0.12] border border-white/[0.06]",
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20",
    ghost: "text-white/60 hover:text-white hover:bg-white/[0.06]",
    destructive: "bg-red-500/80 text-white hover:bg-red-600",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    icon: "h-8 w-8 p-0",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
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
    default: "bg-white/[0.08] text-white/70",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    destructive: "bg-red-500/15 text-red-400 border border-red-500/20",
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full", variants[variant])}>
      {children}
    </span>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl",
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
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          <Icon className="w-4 h-4 text-white/50" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          changeType === "up" ? "text-emerald-400" : "text-red-400"
        )}>
          {changeType === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-xs text-white/40 mb-1">{title}</p>
      <p className="text-xl font-semibold text-white tracking-tight">{value}</p>
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
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, rgba(10,10,10,1) 0%, rgba(5,5,5,1) 100%)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.8)'
      }}
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between h-12 px-4 bg-black/40 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-sm" />
        </div>
        <span className="text-xs font-medium text-white/40 tracking-wide">Darwin UI Dashboard</span>
        <div className="w-16" />
      </div>

      <div className="flex" style={{ minHeight: '480px' }}>
        {/* Sidebar */}
        <div className="w-52 shrink-0 border-r border-white/[0.06] bg-black/20 hidden md:block">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
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
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    activeNav === item.id
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">Dashboard</h1>
              <p className="text-sm text-white/40 mt-0.5">Welcome back, here's your overview</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-44 h-9 pl-9 pr-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                />
              </div>
              <Button size="icon" variant="ghost">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <MetricCard title="Total Revenue" value="$48,234" change="+12.5%" changeType="up" icon={DollarSign} />
            <MetricCard title="Active Users" value="2,420" change="+8.2%" changeType="up" icon={Users} />
            <MetricCard title="Conversion" value="3.24%" change="-0.4%" changeType="down" icon={Activity} />
            <MetricCard title="Growth Rate" value="+24.5%" change="+4.1%" changeType="up" icon={TrendingUp} />
          </div>

          {/* Charts Row */}
          <div className="grid xl:grid-cols-3 gap-4 mb-6">
            {/* Area Chart */}
            <Card className="xl:col-span-2 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Revenue Overview</h3>
                <Button size="sm" variant="ghost">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                      }}
                      labelStyle={{ color: "#fff", fontWeight: 500 }}
                      itemStyle={{ color: "rgba(255,255,255,0.7)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Pie Chart */}
            <Card className="p-5">
              <h3 className="text-sm font-medium text-white mb-4">Traffic Source</h3>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={32}
                      outerRadius={52}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-white/50">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-medium text-white">Recent Plans</h3>
              <Button size="sm" variant="primary" onClick={handleShowToast}>
                Add New
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Revenue</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Growth</th>
                    <th className="px-5 py-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 text-sm text-white font-medium">{row.name}</td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            row.status === "active" ? "success" : row.status === "pending" ? "warning" : "destructive"
                          }
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-white/70">{row.revenue}</td>
                      <td className="px-5 py-3.5 text-sm text-emerald-400 font-medium">{row.growth}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="icon" variant="ghost" onClick={() => setShowModal(true)}>
                            <Eye className="w-4 h-4" />
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
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          style={{ animation: 'fadeIn 0.15s ease-out' }}
        >
          <div
            className="w-80 bg-[#0f0f0f] rounded-2xl border border-white/[0.08] p-6 shadow-2xl"
            style={{
              animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">Plan Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              This modal demonstrates Darwin UI's Modal component with backdrop blur and smooth animations.
            </p>
            <div className="flex gap-3">
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
        <div
          className="absolute bottom-5 right-5 flex items-center gap-2.5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-xl z-50"
          style={{
            animation: 'slideInFromBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.3)'
          }}
        >
          <div className="p-1 rounded-full bg-emerald-500/20">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-emerald-400">Action completed successfully!</span>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
