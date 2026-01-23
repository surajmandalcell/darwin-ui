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
		"bg-[hsl(var(--glass-bg-hover))] text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--glass-bg-active))] border border-[hsl(var(--border-default))]",
	primary:
		"bg-[hsl(var(--brand-primary))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--brand-primary-hover))]",
	secondary:
		"bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--glass-bg-hover))] border border-[hsl(var(--border-default))]",
	success:
		"bg-[hsl(var(--success))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--success)/0.9)]",
	warning:
		"bg-[hsl(var(--warning))] text-[hsl(var(--text-on-warning))] hover:bg-[hsl(var(--warning)/0.9)]",
	info: "bg-[hsl(var(--info))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--info)/0.9)]",
	destructive:
		"bg-[hsl(var(--error))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--error)/0.9)]",
	outline:
		"border border-[hsl(var(--border-strong))] bg-transparent hover:bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))]",
	ghost:
		"hover:bg-[hsl(var(--glass-bg-hover))] text-[hsl(var(--text-secondary))]",
	link: "text-[hsl(var(--brand-primary))] underline-offset-4 hover:underline",
	accent:
		"bg-[hsl(var(--accent))] text-[hsl(var(--text-on-filled))] hover:bg-[hsl(var(--accent-hover))]",
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
					"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50",
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
