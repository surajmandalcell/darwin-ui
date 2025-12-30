"use client";

import type React from "react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

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
		default: "border-white/10 bg-white/10 text-white/90 hover:bg-white/20 shadow-sm backdrop-blur-sm",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		outline: "border-white/20 text-white/80",
		destructive: "border-transparent bg-destructive/20 text-destructive hover:bg-destructive/30",
		success: "border-transparent bg-green-500/20 text-green-400 hover:bg-green-500/30",
		published: "border-transparent bg-green-500/20 text-green-400 hover:bg-green-500/30",
		warning: "border-transparent bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
		draft: "border-transparent bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
		read: "border-transparent bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
		info: "border-transparent bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
		new: "border-transparent bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
		responded: "border-transparent bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
		archived: "border-transparent bg-white/5 text-white/50 hover:bg-white/10",
	};

	return (
		<motion.span
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			{...(props as any)}
			className={cn(
				"inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background",
				variants[variant],
				className,
			)}
		>
			{children}
		</motion.span>
	);
}