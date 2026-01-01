"use client";

import React, { useState, useEffect } from "react";
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
        <div className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover-card-lift overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70 group-hover:text-blue-400 transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                </div>
                <div className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border shadow-sm backdrop-blur-md",
                    changeType === "up"
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/10"
                        : "text-red-400 bg-red-500/10 border-red-500/10"
                )}>
                    {changeType === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {change}
                </div>
            </div>

            <div className="relative">
                <p className="text-[11px] font-medium text-white/50 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-2xl font-bold text-white tracking-tight tabular-nums drop-shadow-sm">{value}</p>
            </div>
        </div>
    );
}

export default function DashboardShowcase() {
    const [activeNav, setActiveNav] = useState("dashboard");
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div
            className="relative w-full rounded-[20px] overflow-hidden border border-white/10 shadow-lg font-sans bg-neutral-950"
        >
            {/* Window Title Bar */}
            <div className="bg-neutral-950 border-b border-white/10 h-11 flex items-center px-4 justify-between select-none">
                <div className="flex gap-2 group">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] group-hover:bg-[#ff5f57]/80 transition-colors shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] group-hover:bg-[#febc2e]/80 transition-colors shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840] group-hover:bg-[#28c840]/80 transition-colors shadow-sm" />
                </div>
                <div className="text-[13px] font-medium text-white/30 flex items-center gap-2">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                </div>
                <div className="w-16" />
            </div>

            <div className="flex h-[700px] xl:h-[600px]">
                {/* Sidebar */}
                <div className="w-[240px] flex-shrink-0 border-r border-white/10 bg-neutral-950 hidden md:flex flex-col">
                    <div className="p-5">

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between px-3 mb-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
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
                                                    ? "text-white"
                                                    : "text-white/50 hover:text-white"
                                            )}
                                        >
                                            {activeNav === item.id && (
                                                <div className="absolute inset-0 bg-white/[0.06] rounded-md border border-white/[0.04]" />
                                            )}
                                            <item.icon className={cn("w-4 h-4 relative z-10", activeNav === item.id ? "text-blue-400" : "text-white/40 group-hover:text-white/80")} />
                                            <span className="relative z-10">{item.label}</span>
                                            {activeNav === item.id && <div className="absolute left-0 w-0.5 h-4 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div>
                                <div className="flex items-center justify-between px-3 mb-2 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
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
                                                    ? "bg-white/[0.06] text-white"
                                                    : "text-white/50 hover:text-white hover:bg-white/[0.02]"
                                            )}
                                        >
                                            <item.icon className={cn("w-4 h-4", activeNav === item.id ? "text-blue-400" : "text-white/40")} />
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

                    <div className="mt-auto p-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-purple-500 border border-white/10" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Olivia Martin</p>
                                <p className="text-xs text-white/40 truncate">olivia@untitledui.com</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-white/40" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 bg-neutral-950 overflow-auto">
                    <div className="p-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                                <p className="text-sm text-white/50 mt-1">Monitor your key metrics and performance</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "relative transition-all duration-300",
                                    searchFocused ? "w-64" : "w-64 lg:w-48"
                                )}>
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                        className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] transition-all"
                                    />
                                    {searchFocused && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/50 border border-white/5">
                                            ESC
                                        </div>
                                    )}
                                </div>
                                <div className="h-5 w-[1px] bg-white/[0.08] mx-1" />
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                            <MetricCard title="Total Revenue" value="$48,234.00" change="+12.5%" changeType="up" icon={DollarSign} />
                            <MetricCard title="Active Users" value="12,420" change="+8.2%" changeType="up" icon={Users} />
                            <MetricCard title="Conversion" value="3.24%" change="-0.4%" changeType="down" icon={Activity} />
                            <MetricCard title="Growth Rate" value="+24.5%" change="+4.1%" changeType="up" icon={TrendingUp} />
                        </div>

                        <div className="grid xl:grid-cols-3 gap-6 mb-8">
                            {/* Main Chart */}
                            <div className="xl:col-span-2 space-y-6">
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-base font-semibold text-white">Revenue Trend</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-emerald-400 font-medium">+12.5%</span>
                                                <span className="text-xs text-white/40">vs last month</span>
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
                                    <div className="h-[300px] w-full min-w-0">
                                        {mounted ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                                    <XAxis
                                                        dataKey="month"
                                                        stroke="rgba(255,255,255,0.1)"
                                                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        dy={10}
                                                    />
                                                    <YAxis
                                                        stroke="rgba(255,255,255,0.1)"
                                                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickFormatter={(value) => `$${value}`}
                                                    />
                                                    <Tooltip
                                                        content={({ active, payload, label: _label }) => {
                                                            if (active && payload && payload.length) {
                                                                return (
                                                                    <div className="bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-xl shadow-sm p-3">
                                                                        <p className="text-[11px] font-medium text-white/50 mb-1 uppercase tracking-wider">{payload[0].payload.month}</p>
                                                                        <div className="flex items-baseline gap-1">
                                                                            <p className="text-lg font-bold text-white tabular-nums">${payload[0].value}</p>
                                                                            <span className="text-[10px] text-emerald-400 font-medium">+12%</span>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        }}
                                                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="revenue"
                                                        stroke="#3b82f6"
                                                        strokeWidth={2}
                                                        fillOpacity={1}
                                                        fill="url(#colorRevenue)"
                                                        activeDot={{ r: 6, fill: "#3b82f6", stroke: "#0a0a0a", strokeWidth: 2, className: "animate-pulse" }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="previous"
                                                        stroke="rgba(255,255,255,0.1)"
                                                        strokeWidth={2}
                                                        strokeDasharray="4 4"
                                                        fill="transparent"
                                                        activeDot={false}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10">Loading chart...</div>
                                        )}
                                    </div>
                                </Card>
                            </div>

                            {/* Pie Chart Card */}
                            <Card className="p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base font-semibold text-white">Traffic Source</h3>
                                    <Button size="icon" variant="ghost" className="h-7 w-7">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex-1 min-h-[250px] relative w-full">
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
                                                                <div className="bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-lg shadow-sm px-3 py-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-2 h-2 rounded-full" style={{ background: payload[0].payload.color }} />
                                                                        <span className="text-xs font-medium text-white">{payload[0].name}: {payload[0].value}%</span>
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
                                        <span className="text-2xl font-bold text-white">100%</span>
                                        <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Total</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-2">
                                    {pieData.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between text-sm group cursor-pointer hover:bg-white/[0.02] p-2 rounded-lg transition-colors">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                                                <span className="text-white/70 group-hover:text-white transition-colors">{item.name}</span>
                                            </div>
                                            <span className="font-semibold text-white tabular-nums">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Table Section */}
                        <Card className="overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-base font-semibold text-white">Recent Transactions</h3>
                                    <div className="h-4 w-[1px] bg-white/[0.1]" />
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
                                        <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Plan Name</th>
                                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Revenue</th>
                                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Growth</th>
                                            <th className="px-6 py-3 text-right text-[11px] font-semibold text-white/50 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.04]">
                                        {tableData.map((row) => (
                                            <tr key={row.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-xs font-bold text-white border border-white/[0.04]">
                                                            {row.name.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-white">{row.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant={
                                                            row.status === "active" ? "success"
                                                                : row.status === "pending" ? "warning"
                                                                    : row.status === "inactive" ? "secondary"
                                                                        : "destructive"
                                                        }
                                                    >
                                                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-white/50">{row.date}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-white tabular-nums">{row.revenue}</td>
                                                <td className="px-6 py-4 text-sm font-medium tabular-nums" style={row.growth.startsWith("+") ? { color: '#34d399' } : { color: '#f87171' }}>
                                                    {row.growth}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setShowModal(true)}>
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-red-400 hover:bg-red-500/10">
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="border-t border-white/[0.06] px-6 py-3 flex items-center justify-between">
                                <p className="text-xs text-white/40">Showing 1-4 of 24 items</p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" disabled>Previous</Button>
                                    <Button size="sm" variant="ghost">Next</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[4px]"
                    onClick={() => setShowModal(false)}
                    style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                    <div
                        className="w-full max-w-sm bg-neutral-950 border border-white/10 rounded-2xl shadow-md p-6 relative overflow-hidden animate-modal-enter"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px -10px rgba(0,0,0,0.8)'
                        }}
                    >
                        {/* Glossy header effect */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-white/[0.02] pointer-events-none" />

                        <div className="relative">
                            <div className="mb-6 flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                    <LayoutDashboard className="w-6 h-6" />
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white transition-colors p-1 hover:bg-white/[0.06] rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Create New Widget</h3>
                            <p className="text-sm text-white/60 mb-6 leading-relaxed">
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
                    className="absolute bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-slate-900 border border-emerald-500/20 rounded-xl shadow-md animate-toast-enter overflow-hidden"
                    style={{
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.5)'
                    }}
                >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">Export Success</span>
                        <span className="text-xs text-white/50">Your report is ready to download.</span>
                    </div>
                    <button onClick={() => setShowToast(false)} className="text-white/40 hover:text-white ml-2 transition-colors">
                        <X className="w-4 h-4" />
                    </button>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/20">
                        <div
                            className="h-full bg-emerald-500 animate-progress"
                            style={{ animationDuration: '3s' }}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
