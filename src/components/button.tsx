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
			"bg-blue-500 text-[#ffffff] hover:bg-blue-500/90",
		secondary:
			"bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--glass-bg-hover))] border border-[hsl(var(--border-default))]",
		success: "bg-green-500 text-[#ffffff] hover:bg-green-500/90",
		warning: "bg-amber-500 text-black hover:bg-amber-500/90",
		info: "bg-blue-400 text-[#ffffff] hover:bg-blue-400/90",
		destructive:
			"bg-red-500 text-[#ffffff] hover:bg-red-500/90",
		outline:
			"border border-[hsl(var(--border-strong))] bg-transparent hover:bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))]",
		ghost: "hover:bg-[hsl(var(--glass-bg-hover))] text-[hsl(var(--text-secondary))]",
		link: "text-blue-400 underline-offset-4 hover:underline",
		accent: "bg-purple-500 text-[#ffffff] hover:bg-purple-500/90",
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
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50",
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
