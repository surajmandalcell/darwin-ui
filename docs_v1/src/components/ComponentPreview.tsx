"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
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
  Mail,
  User,
  Lock,
  ArrowRight
} from "lucide-react";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// Button Component
// ============================================
function Button({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const variants = {
    default: "bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.08] shadow-sm",
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] border border-blue-500/50",
    secondary: "bg-white/[0.04] text-white/80 hover:bg-white/[0.08] border border-white/[0.06]",
    success: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500/50",
    warning: "bg-amber-500 text-white hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] border border-amber-500/50",
    destructive: "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/50",
    outline: "bg-transparent text-white/80 hover:text-white hover:bg-white/[0.06] border border-white/[0.15]",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.06]",
  };

  const sizes = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-11 px-6 text-base",
    icon: "h-9 w-9 p-0",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 press-effect",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        "disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

// ============================================
// Badge Component
// ============================================
function Badge({
  children,
  variant = "default",
  animate = false,
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "info" | "outline";
  animate?: boolean;
}) {
  const variants = {
    default: "bg-white/[0.08] text-white/80 border-white/[0.06]",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    destructive: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    outline: "bg-transparent text-white/60 border-white/[0.15]",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border",
      variants[variant],
      animate && "animate-pulse"
    )}>
      {animate && (
        <span className="relative flex h-2 w-2">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            variant === 'success' ? 'bg-emerald-400' :
              variant === 'warning' ? 'bg-amber-400' :
                variant === 'destructive' ? 'bg-red-400' : 'bg-blue-400'
          )}></span>
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            variant === 'success' ? 'bg-emerald-500' :
              variant === 'warning' ? 'bg-amber-500' :
                variant === 'destructive' ? 'bg-red-500' : 'bg-blue-500'
          )}></span>
        </span>
      )}
      {children}
    </span>
  );
}

// ============================================
// Input Component
// ============================================
function Input({
  placeholder = "Enter text...",
  type = "text",
  disabled = false,
  icon: Icon,
  label,
  error,
}: {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: React.ElementType;
  label?: string;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-xs font-medium text-white/60 ml-1 block">{label}</label>
      )}
      <div className={cn(
        "relative rounded-lg transition-all duration-200 focus-glow-blue",
        "bg-white/[0.04] border",
        focused ? "border-blue-500/50 bg-white/[0.06]" : "border-white/[0.08] hover:border-white/[0.12]",
        error && "border-red-500/50 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
        disabled && "opacity-60 cursor-not-allowed"
      )}>
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full h-10 bg-transparent border-none text-sm text-white placeholder:text-white/30",
            "focus:ring-0 focus:outline-none",
            Icon ? "pl-9 pr-4" : "px-4"
          )}
        />
      </div>
      {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
}

// ============================================
// Checkbox Component
// ============================================
function Checkbox({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="peer sr-only"
        />
        <div
          className={cn(
            "w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all duration-200",
            checked
              ? "bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
              : "bg-white/[0.04] border-white/[0.15] group-hover:border-white/[0.25]"
          )}
        >
          <Check
            className={cn(
              "w-3.5 h-3.5 text-white transition-all duration-200",
              checked ? "opacity-100 scale-100 animate-checkmark" : "opacity-0 scale-50"
            )}
            strokeWidth={3}
          />
        </div>
      </div>
      <span className={cn(
        "text-sm transition-colors duration-200",
        checked ? "text-white" : "text-white/60 group-hover:text-white/80"
      )}>
        {label}
      </span>
    </label>
  );
}

// ============================================
// Switch Component
// ============================================
function Switch({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <div
        onClick={() => setChecked(!checked)}
        className={cn(
          "w-11 h-6 rounded-full relative transition-all duration-300 ease-out-expo border border-transparent",
          checked
            ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            : "bg-white/[0.1] group-hover:bg-white/[0.15]"
        )}
      >
        <div
          className={cn(
            "absolute top-[2px] w-5 h-5 rounded-full bg-white shadow-sm switch-thumb",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
      <span className={cn(
        "text-sm transition-colors duration-200",
        checked ? "text-white" : "text-white/60 group-hover:text-white/80"
      )}>
        {label}
      </span>
    </label>
  );
}

// ============================================
// Card Component
// ============================================
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "rounded-xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl p-6 shadow-xl hover-card-lift",
      "hover:border-white/[0.12] hover:bg-white/[0.02]",
      className
    )}>
      {children}
    </div>
  );
}

// ============================================
// Alert Component
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
// Skeleton Component
// ============================================
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white/[0.06] rounded-lg animate-pulse",
        className
      )}
    />
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
      {/* <Button variant="success">Success</Button> */}
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" loading>Loading</Button>
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
      <Badge variant="success" animate>Online</Badge>
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
      <Input placeholder="name@example.com" label="Email Address" icon={Mail} />
      <Input placeholder="Enter password" type="password" label="Password" icon={Lock} />
      <Input placeholder="Disabled input" disabled label="Disabled" />
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
      <Card className="max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 mb-4">
          <Settings className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Advanced Configuration</h3>
        <p className="text-sm text-white/50 mb-6 leading-relaxed">
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
      <div className="flex items-center gap-5 w-full max-w-xs p-4 border border-white/[0.06] rounded-xl bg-white/[0.02]">
        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-4 w-3/4 bg-white/[0.08]" />
          <Skeleton className="h-3 w-1/2 bg-white/[0.08]" />
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={() => setIsOpen(false)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div
            className="w-[90%] max-w-md bg-[#0a0a0a] rounded-2xl border border-white/[0.08] p-6 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center border border-white/[0.04]">
                  <Info className="w-5 h-5 text-white/80" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Confirm Action</h3>
              <p className="text-sm text-white/60 mb-8 leading-relaxed">
                Are you sure you want to continue? This action cannot be undone and will permanently make changes to your account.
              </p>

              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setIsOpen(false)} className="flex-1">Cancel</Button>
                <Button variant="primary" onClick={() => setIsOpen(false)} className="flex-1">Confirm</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
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
    <div className="component-preview relative min-h-[120px]">
      <Button variant="primary" onClick={handleClick}>
        Trigger Toast Notification
      </Button>

      {showToast && (
        <div
          className="absolute bottom-4 z-20 flex items-center gap-3 px-4 py-3 bg-[#0f172a] border border-emerald-500/20 rounded-xl shadow-xl"
          style={{
            animation: 'slideUpToast 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
          }}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Success</p>
            <p className="text-xs text-white/50">Your changes have been saved.</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
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
        <label className="text-xs font-medium text-white/60 mb-1.5 block ml-1">Assign To</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-10 px-4 rounded-lg text-sm text-left flex items-center justify-between transition-all duration-200",
            "bg-white/[0.04] border",
            isOpen
              ? "border-blue-500/50 bg-white/[0.06] shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
              : "border-white/[0.08] hover:border-white/[0.12] text-white"
          )}
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white/40" />
            {selected}
          </div>
          <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 py-1.5 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl z-10 overflow-hidden"
            style={{ animation: 'fadeInDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { setSelected(option); setIsOpen(false); }}
                className={cn(
                  "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors",
                  option === selected
                    ? "bg-blue-600/10 text-blue-400 font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {option}
                {option === selected && <Check className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
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
            <tr className="bg-white/[0.02] border-b border-white/[0.06]">
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-[11px] font-semibold text-white/50 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.map((row, i) => (
              <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{row.name}</span>
                    <span className="text-xs text-white/40">{row.email}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-white/60">{row.role}</td>
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
