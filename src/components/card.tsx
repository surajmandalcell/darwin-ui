"use client";

import React from "react";
import { cn } from "../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Enable frosted glass effect */
	glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, glass, ...props }, ref) => (
		<div
			ref={ref}
			{...(props as any)}
			className={cn(
				"rounded-2xl border text-card-foreground transition-colors duration-150",
				glass
					? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-white/20 dark:border-white/10"
					: "bg-card border-border hover:border-border/80",
				className,
			)}
		/>
	)
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"font-semibold leading-none tracking-tight text-card-foreground",
			className,
		)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export const CardAction = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center gap-2 p-6 pt-0", className)}
		{...props}
	/>
));
CardAction.displayName = "CardAction";
