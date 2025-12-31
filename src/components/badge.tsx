"use client";

import type React from "react";
import { cn } from "../lib/utils";
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
		default: "border-white/10 bg-white/8 text-white/80 hover:bg-white/12",
		secondary: "border-transparent bg-white/5 text-white/60 hover:bg-white/8",
		outline: "border-white/15 text-white/70 bg-transparent",
		destructive: "border-transparent bg-red-500/15 text-red-400/90 hover:bg-red-500/20",
		success: "border-transparent bg-green-500/15 text-green-400/90 hover:bg-green-500/20",
		published: "border-transparent bg-green-500/15 text-green-400/90 hover:bg-green-500/20",
		warning: "border-transparent bg-amber-500/15 text-amber-400/90 hover:bg-amber-500/20",
		draft: "border-transparent bg-amber-500/15 text-amber-400/90 hover:bg-amber-500/20",
		read: "border-transparent bg-amber-500/15 text-amber-400/90 hover:bg-amber-500/20",
		info: "border-transparent bg-blue-500/15 text-blue-400/90 hover:bg-blue-500/20",
		new: "border-transparent bg-blue-500/15 text-blue-400/90 hover:bg-blue-500/20",
		responded: "border-transparent bg-emerald-500/15 text-emerald-400/90 hover:bg-emerald-500/20",
		archived: "border-transparent bg-white/5 text-white/40 hover:bg-white/8",
	};

	return (
		<motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.15 }}
			{...(props as any)}
			className={cn(
				"inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500/50",
				variants[variant],
				className,
			)}
		>
			{children}
		</motion.span>
	);
}