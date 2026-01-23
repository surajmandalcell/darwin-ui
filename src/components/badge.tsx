"use client";

import type React from "react";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";
import { motion } from "framer-motion";

export type BadgeVariant =
	| "default"
	| "secondary"
	| "outline"
	| "destructive"
	| "success"
	| "warning"
	| "info"
	| "published"
	| "draft"
	| "archived"
	| "new"
	| "read"
	| "responded";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	children: React.ReactNode;
}

export function Badge({
	variant = "default",
	className,
	children,
	...props
}: BadgeProps) {
	const variants: Record<BadgeVariant, string> = {
		default: "border-[hsl(var(--border-default))] bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-secondary))]",
		secondary: "border-transparent bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-tertiary))]",
		outline: "border-[hsl(var(--border-strong))] text-[hsl(var(--text-secondary))] bg-transparent",
		destructive: "border-transparent bg-[hsl(var(--error-bg))] text-[hsl(var(--error))]",
		success: "border-transparent bg-[hsl(var(--success-bg))] text-[hsl(var(--success))]",
		published: "border-transparent bg-[hsl(var(--success-bg))] text-[hsl(var(--success))]",
		warning: "border-transparent bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))]",
		draft: "border-transparent bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))]",
		read: "border-transparent bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning))]",
		info: "border-transparent bg-[hsl(var(--info-bg))] text-[hsl(var(--info))]",
		new: "border-transparent bg-[hsl(var(--info-bg))] text-[hsl(var(--info))]",
		responded: "border-transparent bg-[hsl(var(--success-bg))] text-[hsl(var(--success))]",
		archived: "border-transparent bg-[hsl(var(--glass-bg))] text-[hsl(var(--text-muted))]",
	};

	return (
		<motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: getDuration("normal") }}
			{...(props as any)}
			className={cn(
				"inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]",
				variants[variant],
				className,
			)}
		>
			{children}
		</motion.span>
	);
}