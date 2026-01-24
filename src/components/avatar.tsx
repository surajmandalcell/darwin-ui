"use client";

import * as React from "react";
import { cn } from "../lib/utils";

interface AvatarProps {
	src?: string | null;
	alt?: string;
	fallback?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	className?: string;
	/** Enable frosted glass effect */
	glass?: boolean;
}

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

function stringToColor(str: string): string {
	// Hardcoded vibrant colors for avatar backgrounds
	const colors = [
		"bg-rose-500",
		"bg-pink-500",
		"bg-fuchsia-500",
		"bg-purple-500",
		"bg-violet-500",
		"bg-indigo-500",
		"bg-blue-500",
		"bg-cyan-500",
		"bg-teal-500",
		"bg-emerald-500",
	];

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	return colors[Math.abs(hash) % colors.length];
}

function Avatar({ src, alt, fallback, size = "md", className, glass = false }: AvatarProps) {
	const [imgError, setImgError] = React.useState(false);

	const sizeClasses = {
		xs: "h-6 w-6 text-[10px]",
		sm: "h-8 w-8 text-xs",
		md: "h-10 w-10 text-sm",
		lg: "h-12 w-12 text-base",
		xl: "h-16 w-16 text-lg",
	};

	const showFallback = !src || imgError;
	const initials = fallback ? getInitials(fallback) : "?";
	const bgColor = fallback ? stringToColor(fallback) : "bg-zinc-700";

	return (
		<div
			className={cn(
				"relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
				sizeClasses[size],
				showFallback && (glass ? "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm" : bgColor),
				glass
					? "ring-1 ring-white/30 dark:ring-white/10"
					: "ring-1 ring-white/10 dark:ring-black/10",
				className
			)}
		>
			{!showFallback ? (
				<img
					src={src}
					alt={alt || fallback || "Avatar"}
					className="h-full w-full object-cover"
					onError={() => setImgError(true)}
				/>
			) : (
				<span className={cn(
					"font-medium text-white"
				)}>{initials}</span>
			)}
		</div>
	);
}

interface AvatarGroupProps {
	children: React.ReactNode;
	max?: number;
	className?: string;
}

function AvatarGroup({ children, max, className }: AvatarGroupProps) {
	const childArray = React.Children.toArray(children);
	const visibleChildren = max ? childArray.slice(0, max) : childArray;
	const remainingCount = max ? Math.max(0, childArray.length - max) : 0;

	return (
		<div className={cn("flex -space-x-2", className)}>
			{visibleChildren.map((child, index) => (
				<div key={index} className="relative ring-2 ring-background rounded-full">
					{child}
				</div>
			))}
			{remainingCount > 0 && (
				<div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-sm font-medium text-white ring-2 ring-background">
					+{remainingCount}
				</div>
			)}
		</div>
	);
}

export { Avatar, AvatarGroup };
