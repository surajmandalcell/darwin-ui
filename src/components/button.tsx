"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getDuration } from "../lib/animation-config";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// ============================================================================
// Types
// ============================================================================

export type ButtonVariant =
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

export type ButtonSize = "default" | "sm" | "lg" | "icon";

// Legacy exports for backward compatibility
export type Variant = ButtonVariant;
export type Size = ButtonSize;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Button style variant */
	variant?: ButtonVariant;
	/** Button size */
	size?: ButtonSize;
	/** Additional CSS classes */
	className?: string;
	/** Button content */
	children?: React.ReactNode;
	/** Show loading spinner */
	loading?: boolean;
	/** Text to show while loading (replaces children) */
	loadingText?: string;
	/** Icon to show on the left side */
	leftIcon?: React.ReactNode;
	/** Icon to show on the right side */
	rightIcon?: React.ReactNode;
	/** Make button full width */
	fullWidth?: boolean;
	/** Render as icon-only button (square aspect ratio) */
	iconOnly?: boolean;
}

// ============================================================================
// Variant & Size Classes
// ============================================================================

const variantClasses: Record<ButtonVariant, string> = {
	default:
		"bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 hover:bg-black/15 dark:hover:bg-white/15 border border-black/10 dark:border-white/10",
	primary: "bg-blue-500 text-white hover:bg-blue-600",
	secondary:
		"bg-black/5 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10",
	success: "bg-emerald-500 text-white hover:bg-emerald-500/90",
	warning: "bg-amber-500 text-black hover:bg-amber-500/90",
	info: "bg-sky-500 text-white hover:bg-sky-500/90",
	destructive: "bg-red-500 text-white hover:bg-red-500/90",
	outline:
		"border border-zinc-300 dark:border-zinc-600 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-300",
	ghost: "hover:bg-black/10 dark:hover:bg-white/10 text-zinc-400 dark:text-zinc-500",
	link: "text-blue-500 underline-offset-4 hover:underline",
	accent: "bg-violet-500 text-white hover:bg-violet-600",
};

const sizeClasses: Record<ButtonSize, string> = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-md px-3 text-xs",
	lg: "h-10 rounded-md px-8",
	icon: "h-9 w-9",
};

const iconSizeClasses: Record<ButtonSize, string> = {
	default: "w-4 h-4",
	sm: "w-3.5 h-3.5",
	lg: "w-5 h-5",
	icon: "w-4 h-4",
};

// ============================================================================
// Button Base Component
// ============================================================================

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			variant = "default",
			size = "default",
			className,
			loading = false,
			loadingText,
			leftIcon,
			rightIcon,
			fullWidth = false,
			iconOnly = false,
			disabled,
			...props
		},
		ref,
	) => {
		const isDisabled = disabled || loading;
		const effectiveSize = iconOnly ? "icon" : size;
		const iconClasses = iconSizeClasses[effectiveSize];

		const content = loading ? (
			<>
				<Loader2 className={cn(iconClasses, "animate-spin")} />
				{loadingText && <span>{loadingText}</span>}
			</>
		) : (
			<>
				{leftIcon && (
					<span className={cn(iconClasses, "shrink-0")}>{leftIcon}</span>
				)}
				{children}
				{rightIcon && (
					<span className={cn(iconClasses, "shrink-0")}>{rightIcon}</span>
				)}
			</>
		);

		return (
			<motion.button
				ref={ref}
				disabled={isDisabled}
				whileHover={!isDisabled ? { opacity: 0.9 } : {}}
				whileTap={!isDisabled ? { scale: 0.99 } : {}}
				transition={{ duration: getDuration("fast") }}
				className={cn(
					"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50",
					variantClasses[variant],
					sizeClasses[effectiveSize],
					fullWidth && "w-full",
					className,
				)}
				// biome-ignore lint/suspicious/noExplicitAny: Framer Motion onDrag conflicts with HTML onDrag
				{...(props as any)}
			>
				{content}
			</motion.button>
		);
	},
);
ButtonBase.displayName = "Button";

// ============================================================================
// Compound Components
// ============================================================================

const IconButton = React.forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "iconOnly" | "leftIcon" | "rightIcon">
>((props, ref) => <ButtonBase ref={ref} iconOnly size="icon" {...props} />);
IconButton.displayName = "Button.Icon";

const LinkButton = React.forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "variant">
>((props, ref) => <ButtonBase ref={ref} variant="link" {...props} />);
LinkButton.displayName = "Button.Link";

const GhostButton = React.forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "variant">
>((props, ref) => <ButtonBase ref={ref} variant="ghost" {...props} />);
GhostButton.displayName = "Button.Ghost";

const OutlineButton = React.forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "variant">
>((props, ref) => <ButtonBase ref={ref} variant="outline" {...props} />);
OutlineButton.displayName = "Button.Outline";

const DestructiveButton = React.forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "variant">
>((props, ref) => <ButtonBase ref={ref} variant="destructive" {...props} />);
DestructiveButton.displayName = "Button.Destructive";

// ============================================================================
// Export
// ============================================================================

type ButtonComponent = typeof ButtonBase & {
	Icon: typeof IconButton;
	Link: typeof LinkButton;
	Ghost: typeof GhostButton;
	Outline: typeof OutlineButton;
	Destructive: typeof DestructiveButton;
};

const Button = ButtonBase as ButtonComponent;
Button.Icon = IconButton;
Button.Link = LinkButton;
Button.Ghost = GhostButton;
Button.Outline = OutlineButton;
Button.Destructive = DestructiveButton;

export { Button };
