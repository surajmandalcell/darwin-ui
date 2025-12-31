import type React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
			"bg-white/10 text-white/90 hover:bg-white/20 border border-white/5 backdrop-blur-sm shadow-sm",
		primary:
			"bg-blue-600 text-white hover:bg-blue-700 shadow-sm border border-blue-500/50",
		secondary:
			"bg-white/5 text-white/70 hover:bg-white/10 border border-white/5 backdrop-blur-sm",
		success: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
		warning: "bg-amber-500 text-black hover:bg-amber-600 shadow-sm",
		info: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
		destructive:
			"bg-red-500/80 text-white hover:bg-red-600 shadow-sm border border-red-500/20",
		outline:
			"border border-white/20 bg-transparent hover:bg-white/10 hover:text-white shadow-sm",
		ghost: "hover:bg-white/10 hover:text-white",
		link: "text-blue-400 underline-offset-4 hover:underline",
		accent: "bg-purple-600 text-white hover:bg-purple-700 shadow-sm",
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
			whileHover={!isDisabled ? { scale: 1.02 } : {}}
			whileTap={!isDisabled ? { scale: 0.98 } : {}}
			transition={{ duration: 0.15, ease: "easeOut" }}
			className={cn(
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
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
