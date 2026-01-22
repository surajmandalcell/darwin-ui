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
		destructive: "border-transparent bg-red-500/15 text-red-400/90",
		success: "border-transparent bg-green-500/15 text-green-400/90",
		published: "border-transparent bg-green-500/15 text-green-400/90",
		warning: "border-transparent bg-amber-500/15 text-amber-400/90",
		draft: "border-transparent bg-amber-500/15 text-amber-400/90",
		read: "border-transparent bg-amber-500/15 text-amber-400/90",
		info: "border-transparent bg-blue-500/15 text-blue-400/90",
		new: "border-transparent bg-blue-500/15 text-blue-400/90",
		responded: "border-transparent bg-emerald-500/15 text-emerald-400/90",
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