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
		default: "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300",
		secondary: "border-transparent bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300",
		outline: "border-black/20 dark:border-white/20 text-zinc-700 dark:text-zinc-300 bg-transparent",
		destructive: "border-transparent bg-red-500/15 text-red-600 dark:text-red-400",
		success: "border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
		published: "border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
		warning: "border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400",
		draft: "border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400",
		read: "border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400",
		info: "border-transparent bg-sky-500/15 text-sky-600 dark:text-sky-400",
		new: "border-transparent bg-sky-500/15 text-sky-600 dark:text-sky-400",
		responded: "border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
		archived: "border-transparent bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300",
	};

	return (
		<motion.span
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: getDuration("normal") }}
			{...(props as any)}
			className={cn(
				"inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50",
				variants[variant],
				className,
			)}
		>
			{children}
		</motion.span>
	);
}