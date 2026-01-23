"use client";

import * as React from "react";
import { cn } from "../lib/utils";

interface AvatarProps {
	src?: string | null;
	alt?: string;
	fallback?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	className?: string;
}

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

function stringToColor(str: string): string {
	// Use CSS variable-based colors for theme compatibility
	const colors = [
		"bg-[hsl(var(--avatar-color-1))]",
		"bg-[hsl(var(--avatar-color-2))]",
		"bg-[hsl(var(--avatar-color-3))]",
		"bg-[hsl(var(--avatar-color-4))]",
		"bg-[hsl(var(--avatar-color-5))]",
		"bg-[hsl(var(--avatar-color-6))]",
		"bg-[hsl(var(--avatar-color-7))]",
		"bg-[hsl(var(--avatar-color-8))]",
		"bg-[hsl(var(--avatar-color-9))]",
		"bg-[hsl(var(--avatar-color-10))]",
	];

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	return colors[Math.abs(hash) % colors.length];
}

function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
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
	const bgColor = fallback ? stringToColor(fallback) : "bg-[hsl(var(--avatar-fallback-bg))]";

	return (
		<div
			className={cn(
				"relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
				sizeClasses[size],
				showFallback && bgColor,
				"ring-1 ring-[hsl(var(--border-default))]",
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
					"font-medium",
					fallback ? "text-[hsl(var(--avatar-color-text))]" : "text-[hsl(var(--avatar-fallback-text))]"
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
				<div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--avatar-group-overflow-bg))] text-sm font-medium text-[hsl(var(--avatar-group-overflow-text))] ring-2 ring-background">
					+{remainingCount}
				</div>
			)}
		</div>
	);
}

export { Avatar, AvatarGroup };
