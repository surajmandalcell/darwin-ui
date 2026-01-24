"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "../contexts/theme-context";
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
    MoreVertical,
    Filter,
    Download
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

import { Button, Badge, Card } from "@pikoloo/darwin-ui";

import { cn } from "@/lib/utils";

// Mock Data
const revenueData = [
    { month: "Jan", revenue: 4500, previous: 4100 },
    { month: "Feb", revenue: 5200, previous: 4800 },
    { month: "Mar", revenue: 4800, previous: 5000 },
    { month: "Apr", revenue: 6100, previous: 5600 },
    { month: "May", revenue: 5900, previous: 6300 },
    { month: "Jun", revenue: 7200, previous: 6800 },
];

const pieData = [
    { name: "Desktop", value: 45, color: "#3b82f6" },
    { name: "Mobile", value: 35, color: "#10b981" },
    { name: "Tablet", value: 20, color: "#8b5cf6" },
];

const tableData = [
    { id: 1, name: "Premium Plan", status: "active", revenue: "$2,400.00", growth: "+12.5%", date: "Just now" },
    { id: 2, name: "Basic Plan", status: "active", revenue: "$1,200.00", growth: "+8.2%", date: "2 mins ago" },
    { id: 3, name: "Enterprise", status: "pending", revenue: "$4,800.00", growth: "+24.1%", date: "5 hours ago" },
    { id: 4, name: "Starter", status: "inactive", revenue: "$240.00", growth: "-2.4%", date: "1 day ago" },
];

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
        <div className="group relative p-3 rounded-lg border border-border bg-card hover-card-lift overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative flex items-center justify-between mb-2">
                <div className="p-2 rounded-md bg-muted border border-border text-muted-foreground group-hover:text-blue-400 transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border",
                    changeType === "up"
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/10"
                        : "text-red-400 bg-red-500/10 border-red-500/10"
                )}>
                    {changeType === "up" ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    {change}
                </div>
            </div>

            <div className="relative">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{title}</p>
                <p className="text-xl font-bold text-foreground tracking-tight tabular-nums">{value}</p>
            </div>
        </div>
    );
}

interface DashboardShowcaseProps {
    showTitleBar?: boolean;
    interactive?: boolean;
}

export default function DashboardShowcase({ showTitleBar = true, interactive = true }: DashboardShowcaseProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [activeNav, setActiveNav] = useState("dashboard");
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Theme-aware chart colors
    const chartColors = useMemo(() => ({
        grid: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)",
        axis: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        tick: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)",
        cursor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        dotStroke: isDark ? "#0a0a0a" : "#fafafa",
        lineFaded: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    }), [isDark]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional hydration pattern for client-only chart rendering
        setMounted(true);
    }, []);

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div
            className={`relative w-full overflow-hidden font-sans bg-card ${!showTitleBar ? 'h-full' : ''}`}
        >
            {/* Window Title Bar - Compact */}
            {showTitleBar && (
                <div className="bg-card border-b border-border h-8 flex items-center px-3 justify-between select-none">
                    <div className="flex gap-1.5 group">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] group-hover:bg-[#ff5f57]/80 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] group-hover:bg-[#febc2e]/80 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] group-hover:bg-[#28c840]/80 transition-colors" />
                    </div>
                    <div className="text-[11px] font-medium text-muted-foreground/60 flex items-center gap-1.5">
                        <LayoutDashboard className="w-3 h-3" />
                        <span>Dashboard</span>
                    </div>
                    <div className="w-12" />
                </div>
            )}

            <div className={`flex flex-col md:flex-row ${showTitleBar ? 'min-h-162.5 md:h-200 xl:h-212.5' : 'h-full'}`}>
                {/* Sidebar - Compact */}
                <div className="w-50 shrink-0 border-r border-border bg-card hidden md:flex flex-col">
                    <div className="p-3">

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between px-3 mb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    <span>Platform</span>
                                </div>
                                <nav className="space-y-0.5">
                                    {[
                                        { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
                                        { id: "analytics", icon: BarChart3, label: "Analytics" },
                                        { id: "users", icon: Users, label: "All Users" },
                                        { id: "activity", icon: Activity, label: "Realtime" },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveNav(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 group relative",
                                                activeNav === item.id
                                                    ? "text-foreground"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {activeNav === item.id && (
                                                <div className="absolute inset-0 bg-muted/60 rounded-md border border-border/40" />
                                            )}
                                            <item.icon className={cn("w-4 h-4 relative z-10", activeNav === item.id ? "text-blue-400" : "text-muted-foreground group-hover:text-foreground/80")} />
                                            <span className="relative z-10">{item.label}</span>
                                            {activeNav === item.id && <div className="absolute left-0 w-0.5 h-4 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div>
                                <div className="flex items-center justify-between px-3 mb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    <span>Settings</span>
                                </div>
                                <nav className="space-y-0.5">
                                    {[
                                        { id: "settings", icon: Settings, label: "General" },
                                        { id: "notifications", icon: Bell, label: "Updates", badge: 3 },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveNav(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 group",
                                                activeNav === item.id
                                                    ? "bg-muted/60 text-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                                            )}
                                        >
                                            <item.icon className={cn("w-4 h-4", activeNav === item.id ? "text-blue-400" : "text-muted-foreground")} />
                                            <span className="flex-1 text-left">{item.label}</span>
                                            {item.badge && (
                                                <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto p-4 border-t border-border/60">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-purple-500 border border-border" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">Olivia Martin</p>
                                <p className="text-xs text-muted-foreground truncate">olivia@untitledui.com</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 bg-card overflow-auto">
                    <div className="p-5">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                            <div>
                                <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Dashboard Overview</h1>
                                <p className="text-sm text-muted-foreground mt-1">Monitor your key metrics and performance</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "relative transition-all duration-300",
                                    searchFocused ? "w-64" : "w-64 lg:w-48"
                                )}>
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                        className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/40 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-500/50 focus:bg-muted/60 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] transition-all"
                                    />
                                    {searchFocused && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border/50">
                                            ESC
                                        </div>
                                    )}
                                </div>
                                <div className="h-5 w-px bg-border/80 mx-1" />
                                <Button size="icon" variant="ghost" className="relative">
                                    <Bell className="w-4 h-4" />
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-[#050505]" />
                                </Button>
                                <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
                                    Add Widget
                                </Button>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                            <MetricCard title="Total Revenue" value="$48,234.00" change="+12.5%" changeType="up" icon={DollarSign} />
                            <MetricCard title="Active Users" value="12,420" change="+8.2%" changeType="up" icon={Users} />
                            <MetricCard title="Conversion" value="3.24%" change="-0.4%" changeType="down" icon={Activity} />
                            <MetricCard title="Growth Rate" value="+24.5%" change="+4.1%" changeType="up" icon={TrendingUp} />
                        </div>

                        <div className="grid xl:grid-cols-3 gap-4 mb-5">
                            {/* Main Chart */}
                            <Card className="xl:col-span-2 p-4 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-foreground">Revenue Trend</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-emerald-400 font-medium">+12.5%</span>
                                            <span className="text-xs text-muted-foreground">vs last month</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="text-xs">
                                            Last 6 months <ChevronDown className="w-3 h-3 ml-2" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-7 w-7">
                                            <Download className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-55 w-full min-w-0">
                                        {mounted ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                                                    <XAxis
                                                        dataKey="month"
                                                        stroke={chartColors.axis}
                                                        tick={{ fill: chartColors.tick, fontSize: 11 }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        dy={10}
                                                    />
                                                    <YAxis
                                                        stroke={chartColors.axis}
                                                        tick={{ fill: chartColors.tick, fontSize: 11 }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickFormatter={(value) => `$${value}`}
                                                    />
                                                    <Tooltip
                                                        content={({ active, payload }) => {
                                                            if (active && payload && payload.length) {
                                                                return (
                                                                    <div className="bg-card/90 backdrop-blur-md border border-border rounded-xl shadow-sm p-3">
                                                                        <p className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">{payload[0].payload.month}</p>
                                                                        <div className="flex items-baseline gap-1">
                                                                            <p className="text-lg font-bold text-foreground tabular-nums">${payload[0].value}</p>
                                                                            <span className="text-[10px] text-emerald-400 font-medium">+12%</span>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        }}
                                                        cursor={{ stroke: chartColors.cursor, strokeWidth: 1, strokeDasharray: '4 4' }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="revenue"
                                                        stroke="#3b82f6"
                                                        strokeWidth={2}
                                                        fillOpacity={1}
                                                        fill="url(#colorRevenue)"
                                                        activeDot={{ r: 6, fill: "#3b82f6", stroke: chartColors.dotStroke, strokeWidth: 2, className: "animate-pulse" }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="previous"
                                                        stroke={chartColors.lineFaded}
                                                        strokeWidth={2}
                                                        strokeDasharray="4 4"
                                                        fill="transparent"
                                                        activeDot={false}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">Loading chart...</div>
                                    )}
                                </div>
                            </Card>

                            {/* Pie Chart Card */}
                            <Card className="p-4 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-foreground">Traffic Source</h3>
                                    <Button size="icon" variant="ghost" className="h-6 w-6">
                                        <MoreVertical className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                                <div className="flex-1 min-h-45 relative w-full">
                                    {mounted ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                    cornerRadius={4}
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-sm px-3 py-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-2 h-2 rounded-full" style={{ background: payload[0].payload.color }} />
                                                                        <span className="text-xs font-medium text-foreground">{payload[0].name}: {payload[0].value}%</span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : null}

                                    {/* Center Text */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-2xl font-bold text-foreground">100%</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Total</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-2">
                                    {pieData.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                                                <span className="text-foreground/70 group-hover:text-foreground transition-colors">{item.name}</span>
                                            </div>
                                            <span className="font-semibold text-foreground tabular-nums">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Table Section */}
                        <Card className="overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
                                    <div className="h-4 w-px bg-border" />
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary">All Status</Badge>
                                        <Badge variant="secondary">Revenue</Badge>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost">
                                        <Filter className="w-3.5 h-3.5 mr-2" />
                                        Filter
                                    </Button>
                                    <Button size="sm" variant="primary" onClick={handleShowToast}>
                                        <Download className="w-3.5 h-3.5 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/20 border-b border-border/60">
                                            <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Plan Name</th>
                                            <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                            <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Revenue</th>
                                            <th className="px-4 py-2 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Growth</th>
                                            <th className="px-4 py-2 text-right text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        {tableData.map((row) => (
                                            <tr key={row.id} className="group hover:bg-muted/20 transition-colors">
                                                <td className="px-4 py-2.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-muted/60 flex items-center justify-center text-[10px] font-bold text-foreground border border-border/40">
                                                            {row.name.charAt(0)}
                                                        </div>
                                                        <span className="text-xs font-medium text-foreground">{row.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <Badge
                                                        variant={
                                                            row.status === "active" ? "success"
                                                                : row.status === "pending" ? "warning"
                                                                    : row.status === "inactive" ? "secondary"
                                                                        : "destructive"
                                                        }
                                                        className="text-[10px]"
                                                    >
                                                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.date}</td>
                                                <td className="px-4 py-2.5 text-xs font-medium text-foreground tabular-nums">{row.revenue}</td>
                                                <td className="px-4 py-2.5 text-xs font-medium tabular-nums" style={row.growth.startsWith("+") ? { color: '#34d399' } : { color: '#f87171' }}>
                                                    {row.growth}
                                                </td>
                                                <td className="px-4 py-2.5 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setShowModal(true)}>
                                                            <Eye className="w-3 h-3" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-6 w-6 hover:text-red-400 hover:bg-red-500/10">
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="border-t border-border/60 px-4 py-2 flex items-center justify-between">
                                <p className="text-[10px] text-muted-foreground">Showing 1-4 of 24 items</p>
                                <div className="flex gap-1">
                                    <Button size="sm" variant="ghost" disabled className="h-6 text-[10px] px-2">Prev</Button>
                                    <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2">Next</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs"
                    onClick={() => setShowModal(false)}
                    style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                    <div
                        className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-md p-6 relative overflow-hidden animate-modal-enter"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            boxShadow: isDark
                                ? '0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px -10px rgba(0,0,0,0.8)'
                                : '0 0 0 1px rgba(0,0,0,0.05), 0 20px 50px -10px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Glossy header effect */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-muted/20 pointer-events-none" />

                        <div className="relative">
                            <div className="mb-6 flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                    <LayoutDashboard className="w-6 h-6" />
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted/60 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">Create New Widget</h3>
                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                Add a new widget to your dashboard. You can customize the data source and display options in the next step.
                            </p>

                            <div className="space-y-3">
                                <Button variant="primary" className="w-full justify-center">Continue Setup</Button>
                                <Button variant="ghost" className="w-full justify-center" onClick={() => setShowModal(false)}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div
                    className="absolute bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-card border border-emerald-500/20 rounded-xl shadow-md animate-toast-enter overflow-hidden"
                    style={{
                        boxShadow: isDark ? '0 10px 30px -5px rgba(0,0,0,0.5)' : '0 10px 30px -5px rgba(0,0,0,0.15)'
                    }}
                >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">Export Success</span>
                        <span className="text-xs text-muted-foreground">Your report is ready to download.</span>
                    </div>
                    <button onClick={() => setShowToast(false)} className="text-muted-foreground hover:text-foreground ml-2 transition-colors">
                        <X className="w-4 h-4" />
                    </button>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/20">
                        <div
                            className="h-full bg-emerald-500 animate-progress"
                            style={{ animationDuration: '3s' }}
                        />
                    </div>
                </div>
            )}

            {/* Non-interactive overlay */}
            {!interactive && (
                <div className="absolute inset-0 z-40" aria-hidden="true" />
            )}
        </div>
    );
}
