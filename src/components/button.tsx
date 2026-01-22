import type React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getDuration } from "../lib/animation-config";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type Variant =
	| "default"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "info"
	| "destructive"
	| "outline"
	| "ghost"
	| "link"
	| "accent";

export type Size = "default" | "sm" | "lg" | "icon";

// Extend motion props but override with our specific needs if necessary
// Using any for props spreading to avoid strict DragEvent mismatches between React and Motion types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	className?: string;
	children: React.ReactNode;
	loading?: boolean;
}

export function Button({
	children,
	variant = "default",
	size = "default",
	className,
	loading = false,
	disabled,
	...props
}: ButtonProps) {
	const variants: Record<Variant, string> = {
		default:
			"bg-[hsl(var(--glass-bg-hover))] text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--glass-bg-active))] border border-[hsl(var(--border-default))]",
		primary:
			"bg-[hsl(var(--brand-primary))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--brand-primary-hover))]",
		secondary:
			"bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--glass-bg-hover))] border border-[hsl(var(--border-default))]",
		success: "bg-[hsl(var(--success))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--success)/0.9)]",
		warning: "bg-[hsl(var(--warning))] text-[hsl(var(--text-on-warning))] hover:bg-[hsl(var(--warning)/0.9)]",
		info: "bg-[hsl(var(--info))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--info)/0.9)]",
		destructive:
			"bg-[hsl(var(--error))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--error)/0.9)]",
		outline:
			"border border-[hsl(var(--border-strong))] bg-transparent hover:bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))]",
		ghost: "hover:bg-[hsl(var(--glass-bg-hover))] text-[hsl(var(--text-secondary))]",
		link: "text-[hsl(var(--brand-primary))] underline-offset-4 hover:underline",
		accent: "bg-[hsl(var(--accent))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--accent-hover))]",
	};

	const sizes: Record<Size, string> = {
		default: "h-9 px-4 py-2",
		sm: "h-8 rounded-md px-3 text-xs",
		lg: "h-10 rounded-md px-8",
		icon: "h-9 w-9",
	};

	const isDisabled = disabled || loading;

	return (
		<motion.button
			{...(props as any)}
			disabled={isDisabled}
			whileHover={!isDisabled ? { opacity: 0.9 } : {}}
			whileTap={!isDisabled ? { scale: 0.99 } : {}}
			transition={{ duration: getDuration("fast") }}
			className={cn(
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50",
				variants[variant],
				sizes[size],
				className,
			)}
		>
			{loading && <Loader2 className="w-4 h-4 animate-spin" />}
			{children}
		</motion.button>
	);
}
