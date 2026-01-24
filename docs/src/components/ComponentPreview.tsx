"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Check,
    X,
    AlertTriangle,
    Info,
    Plus,
    Download,
    Settings,
    ChevronDown,
    Loader2,
    User,
    ArrowRight
} from "lucide-react";

// Import Library Components
import {
    Button,
    Badge,
    Input,
    Checkbox,
    Switch,
    Card,
    Skeleton,
} from "@pikoloo/darwin-ui";

// ============================================
// Local Components (if library counterpart is different or missing inline version)
// ============================================

function Alert({
    variant = "info",
    title,
    description,
}: {
    variant?: "info" | "success" | "warning" | "error";
    title: string;
    description: string;
}) {
    const config = {
        info: { icon: Info, colors: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
        success: { icon: Check, colors: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
        warning: { icon: AlertTriangle, colors: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
        error: { icon: X, colors: "bg-red-500/10 border-red-500/20 text-red-400" },
    };
    const { icon: Icon, colors } = config[variant];

    return (
        <div className={cn(
            "flex gap-3 p-4 rounded-xl border backdrop-blur-sm",
            "animate-in slide-in-from-bottom-2 duration-300",
            colors
        )}>
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
                <h4 className="font-semibold text-sm mb-1">{title}</h4>
                <p className="text-sm opacity-90 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

// ============================================
// Preview Containers
// ============================================
export function ButtonPreview() {
    return (
        <div className="component-preview flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" className="gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading
            </Button>
        </div>
    );
}

export function ButtonSizePreview() {
    return (
        <div className="component-preview items-end gap-6">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="secondary"><Plus className="w-4 h-4" /></Button>
        </div>
    );
}

export function ButtonWithIconPreview() {
    return (
        <div className="component-preview gap-4">
            <Button variant="primary">
                <Plus className="w-4 h-4" />
                Create New
            </Button>
            <Button variant="secondary">
                <Download className="w-4 h-4" />
                Download
            </Button>
            <Button variant="outline" className="gap-3 group">
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
        </div>
    );
}

export function BadgePreview() {
    return (
        <div className="component-preview gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Online</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    );
}

export function InputPreview() {
    return (
        <div className="component-preview flex-col items-stretch max-w-sm mx-auto gap-5">
            <Input placeholder="name@example.com" />
            <Input placeholder="Enter password" type="password" />
            <Input placeholder="Disabled input" disabled />
        </div>
    );
}

export function CheckboxPreview() {
    return (
        <div className="component-preview flex-col items-start gap-4">
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Remember me on this device" />
        </div>
    );
}

export function SwitchPreview() {
    return (
        <div className="component-preview flex-col items-start gap-5">
            <Switch label="Push Notifications" defaultChecked />
            <Switch label="Marketing Emails" />
            <Switch label="Two-factor Authentication" defaultChecked />
        </div>
    );
}

export function CardPreview() {
    return (
        <div className="component-preview">
            <Card className="max-w-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 mb-4">
                    <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Advanced Configuration</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Customize your workspace with advanced settings. Manage team permissions, integrations, and billing.
                </p>
                <div className="flex gap-3">
                    <Button variant="secondary" className="w-full">Cancel</Button>
                    <Button variant="primary" className="w-full">Save Changes</Button>
                </div>
            </Card>
        </div>
    );
}

export function AlertPreview() {
    return (
        <div className="component-preview flex-col items-stretch gap-4 max-w-md mx-auto">
            <Alert variant="info" title="Update Available" description="A new version of Darwin UI is available. Update now to get the latest features." />
            <Alert variant="success" title="Payment Successful" description="Your subscription has been renewed. You can download the invoice from settings." />
            <Alert variant="warning" title="Storage Almost Full" description="You have used 85% of your storage space. Upgrade to avoid interruption." />
            <Alert variant="error" title="Connection Failed" description="Could not connect to the server. Please check your internet connection." />
        </div>
    );
}

export function SkeletonPreview() {
    return (
        <div className="component-preview">
            <div className="flex items-center gap-5 w-full max-w-xs p-4 border border-border rounded-xl bg-muted/30">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2.5">
                    <Skeleton className="h-4 w-3/4 bg-muted" />
                    <Skeleton className="h-3 w-1/2 bg-muted" />
                </div>
            </div>
        </div>
    );
}

export function ModalPreview() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="component-preview">
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                Open Demo Modal
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-[6px] flex items-center justify-center z-[100]"
                    onClick={() => setIsOpen(false)}
                >
                    <Card
                        className="w-[90%] max-w-md bg-card border-border p-6 shadow-md relative overflow-hidden"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 left-0 right-0 h-24 bg-muted/30 pointer-events-none" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                                    <Info className="w-5 h-5 text-foreground/80" />
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-2">Confirm Action</h3>
                            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                                Are you sure you want to continue? This action cannot be undone and will permanently make changes to your account.
                            </p>

                            <div className="flex gap-3 justify-end">
                                <Button variant="secondary" onClick={() => setIsOpen(false)} className="flex-1">Cancel</Button>
                                <Button variant="primary" onClick={() => setIsOpen(false)} className="flex-1">Confirm</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export function ToastPreview() {
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="component-preview relative min-h-30">
            <Button variant="primary" onClick={handleClick}>
                Trigger Toast Notification
            </Button>

            {showToast && (
                <div
                    className="absolute bottom-4 z-20 flex items-center gap-3 px-4 py-3 bg-card border border-emerald-500/20 rounded-xl shadow-md animate-in slide-in-from-bottom-5 fade-in duration-300"
                >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Success</p>
                        <p className="text-xs text-muted-foreground">Your changes have been saved.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export function SelectPreview() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Marketing Team");
    const options = ["Engineering Team", "Marketing Team", "Design Team", "Sales Team"];

    return (
        <div className="component-preview min-h-[200px] items-start pt-10">
            <div className="relative w-64">
                <label className="text-xs font-medium text-foreground/60 mb-1.5 block ml-1">Assign To</label>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full h-10 px-4 rounded-lg text-sm text-left flex items-center justify-between transition-all duration-200",
                        "bg-foreground/[0.04] border",
                        isOpen
                            ? "border-blue-500/50 bg-foreground/[0.06] ring-2 ring-blue-500/20"
                            : "border-foreground/[0.08] hover:border-foreground/[0.12] text-foreground"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-foreground/40" />
                        {selected}
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-foreground/40 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>

                {isOpen && (
                    <div
                        className="absolute top-full left-0 right-0 mt-2 py-1.5 bg-card border border-border rounded-xl shadow-md z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => { setSelected(option); setIsOpen(false); }}
                                className={cn(
                                    "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors",
                                    option === selected
                                        ? "bg-blue-600/10 text-blue-400 font-medium"
                                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                                )}
                            >
                                {option}
                                {option === selected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function TablePreview() {
    const data = [
        { name: "John Doe", email: "john@untitledui.com", role: "Admin", status: "Active" },
        { name: "Jane Smith", email: "jane@untitledui.com", role: "Editor", status: "Pending" },
        { name: "Bob Johnson", email: "bob@untitledui.com", role: "Viewer", status: "Inactive" },
    ];

    return (
        <div className="component-preview p-0 overflow-hidden block">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted/30 border-b border-border">
                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((row, i) => (
                            <tr key={i} className="group hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-3.5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground">{row.name}</span>
                                        <span className="text-xs text-muted-foreground">{row.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5 text-sm text-foreground/60">{row.role}</td>
                                <td className="px-6 py-3.5">
                                    <Badge variant={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "destructive"}>
                                        {row.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-3.5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-7 w-7"><Settings className="w-3.5 h-3.5" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
