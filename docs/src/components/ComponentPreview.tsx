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
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const variants = {
    default: "bg-white/[0.08] text-white/90 hover:bg-white/[0.12] border border-white/[0.06]",
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25",
    secondary: "bg-white/[0.04] text-white/80 hover:bg-white/[0.08] border border-white/[0.08]",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25",
    warning: "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25",
    destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25",
    outline: "bg-transparent text-white/80 hover:bg-white/[0.06] border border-white/[0.15]",
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
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
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
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
}) {
  const variants = {
    default: "bg-white/[0.08] text-white/70 border border-white/[0.06]",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    destructive: "bg-red-500/15 text-red-400 border border-red-500/20",
    info: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  };
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full",
      variants[variant]
    )}>
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
}: {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full h-10 px-4 rounded-lg text-sm text-white placeholder:text-white/30",
        "bg-white/[0.04] border border-white/[0.08]",
        "focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    />
  );
}

// ============================================
// Checkbox Component
// ============================================
function Checkbox({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => setChecked(!checked)}
        className={cn(
          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
          checked
            ? "bg-blue-500 border-blue-500"
            : "bg-white/[0.04] border-white/[0.15] group-hover:border-white/[0.25]"
        )}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>
      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
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
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => setChecked(!checked)}
        className={cn(
          "w-11 h-6 rounded-full relative transition-all duration-200",
          checked ? "bg-blue-500" : "bg-white/[0.08]"
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
            checked ? "left-6" : "left-1"
          )}
        />
      </div>
      <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
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
      "rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-5",
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
    <div className={cn("flex gap-3 p-4 rounded-xl border", colors)}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-sm opacity-80">{description}</p>
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
    <div className="component-preview flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export function ButtonSizePreview() {
  return (
    <div className="component-preview items-end">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Plus className="w-4 h-4" /></Button>
    </div>
  );
}

export function ButtonWithIconPreview() {
  return (
    <div className="component-preview">
      <Button variant="primary">
        <Plus className="w-4 h-4" />
        Add Item
      </Button>
      <Button variant="secondary">
        <Download className="w-4 h-4" />
        Download
      </Button>
      <Button variant="outline">
        <Settings className="w-4 h-4" />
        Settings
      </Button>
    </div>
  );
}

export function BadgePreview() {
  return (
    <div className="component-preview">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}

export function InputPreview() {
  return (
    <div className="component-preview flex-col items-stretch max-w-sm mx-auto">
      <Input placeholder="Enter your email..." />
      <Input placeholder="Disabled input" disabled />
    </div>
  );
}

export function CheckboxPreview() {
  return (
    <div className="component-preview flex-col items-start gap-4">
      <Checkbox label="Accept terms and conditions" />
      <Checkbox label="Subscribe to newsletter" defaultChecked />
      <Checkbox label="Remember me" />
    </div>
  );
}

export function SwitchPreview() {
  return (
    <div className="component-preview flex-col items-start gap-4">
      <Switch label="Enable notifications" />
      <Switch label="Dark mode" defaultChecked />
      <Switch label="Auto-save" />
    </div>
  );
}

export function CardPreview() {
  return (
    <div className="component-preview">
      <Card className="max-w-xs">
        <h3 className="text-base font-semibold text-white mb-2">Card Title</h3>
        <p className="text-sm text-white/60 mb-4">
          This is a card component with glass-morphism styling.
        </p>
        <Button variant="primary" size="sm">Learn More</Button>
      </Card>
    </div>
  );
}

export function AlertPreview() {
  return (
    <div className="component-preview flex-col items-stretch gap-3 max-w-md mx-auto">
      <Alert variant="info" title="Information" description="This is an informational message." />
      <Alert variant="success" title="Success" description="Your changes have been saved." />
      <Alert variant="warning" title="Warning" description="Please review before continuing." />
      <Alert variant="error" title="Error" description="Something went wrong." />
    </div>
  );
}

export function SkeletonPreview() {
  return (
    <div className="component-preview">
      <div className="flex items-center gap-4 w-full max-w-xs">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
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
        Open Modal
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={() => setIsOpen(false)}
          style={{ animation: 'fadeIn 0.15s ease-out' }}
        >
          <div
            className="w-[90%] max-w-md bg-[#0f0f0f] rounded-2xl border border-white/[0.08] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Modal Title</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/60 mb-6">
              This is a modal dialog with backdrop blur, focus trapping, and smooth animations.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
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
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
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
    <div className="component-preview relative min-h-[100px]">
      <Button variant="primary" onClick={handleClick}>
        Show Toast
      </Button>

      {showToast && (
        <div
          className="absolute bottom-4 right-4 flex items-center gap-2.5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-xl"
          style={{
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.3)'
          }}
        >
          <div className="p-1 rounded-full bg-emerald-500/20">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-emerald-400">Success!</span>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function SelectPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select option...");
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="component-preview">
      <div className="relative w-48">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-10 px-4 rounded-lg text-sm text-left flex items-center justify-between",
            "bg-white/[0.04] border border-white/[0.08] text-white/80",
            "hover:bg-white/[0.06] transition-all duration-200"
          )}
        >
          {selected}
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 py-1 bg-[#0f0f0f] border border-white/[0.08] rounded-lg shadow-xl z-10"
            style={{ animation: 'fadeIn 0.15s ease-out' }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { setSelected(option); setIsOpen(false); }}
                className="w-full px-4 py-2 text-sm text-left text-white/70 hover:text-white hover:bg-white/[0.06]"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function TablePreview() {
  const data = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    { name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  ];

  return (
    <div className="component-preview p-0 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase">Name</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase">Email</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white/40 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-5 py-3 text-sm text-white">{row.name}</td>
                <td className="px-5 py-3 text-sm text-white/60">{row.email}</td>
                <td className="px-5 py-3">
                  <Badge variant={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "destructive"}>
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
