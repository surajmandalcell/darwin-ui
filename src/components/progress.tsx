"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface ProgressProps {
	value?: number;
	max?: number;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "success" | "warning" | "danger" | "gradient";
	indeterminate?: boolean;
	showValue?: boolean;
	className?: string;
}

function Progress({
	value = 0,
	max = 100,
	size = "md",
	variant = "default",
	indeterminate = false,
	showValue = false,
	className,
}: ProgressProps) {
	const percentage = Math.min(100, Math.max(0, (value / max) * 100));

	const sizeClasses = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	const variantClasses = {
		default: "bg-[hsl(var(--brand-primary))]",
		success: "bg-[hsl(var(--success))]",
		warning: "bg-[hsl(var(--warning))]",
		danger: "bg-[hsl(var(--error))]",
		gradient: "bg-gradient-to-r from-[hsl(var(--brand-primary))] via-[hsl(var(--accent))] to-[hsl(var(--error))]",
	};

	return (
		<div className={cn("w-full", className)}>
			<div
				role="progressbar"
				aria-valuenow={indeterminate ? undefined : value}
				aria-valuemin={0}
				aria-valuemax={max}
				className={cn(
					"w-full overflow-hidden rounded-full bg-[hsl(var(--glass-bg-hover))]",
					sizeClasses[size]
				)}
			>
				{indeterminate ? (
					<motion.div
						className={cn("h-full w-1/3 rounded-full", variantClasses[variant])}
						animate={{
							x: ["-100%", "400%"],
						}}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: "easeInOut",
						}}
					/>
				) : (
					<motion.div
						className={cn("h-full rounded-full", variantClasses[variant])}
						initial={{ width: 0 }}
						animate={{ width: `${percentage}%` }}
						transition={{ duration: 0.4, ease: "easeOut" }}
					/>
				)}
			</div>
			{showValue && !indeterminate && (
				<div className="mt-1 text-right text-xs text-[hsl(var(--text-secondary))]">
					{Math.round(percentage)}%
				</div>
			)}
		</div>
	);
}

interface CircularProgressProps {
	value?: number;
	max?: number;
	size?: number;
	strokeWidth?: number;
	variant?: "default" | "success" | "warning" | "danger";
	indeterminate?: boolean;
	showValue?: boolean;
	className?: string;
}

function CircularProgress({
	value = 0,
	max = 100,
	size = 40,
	strokeWidth = 4,
	variant = "default",
	indeterminate = false,
	showValue = false,
	className,
}: CircularProgressProps) {
	const percentage = Math.min(100, Math.max(0, (value / max) * 100));
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;

	const variantColors = {
		default: "stroke-[hsl(var(--brand-primary))]",
		success: "stroke-[hsl(var(--success))]",
		warning: "stroke-[hsl(var(--warning))]",
		danger: "stroke-[hsl(var(--error))]",
	};

	return (
		<div
			role="progressbar"
			aria-valuenow={indeterminate ? undefined : value}
			aria-valuemin={0}
			aria-valuemax={max}
			className={cn("relative inline-flex items-center justify-center", className)}
			style={{ width: size, height: size }}
		>
			<svg width={size} height={size} className="rotate-[-90deg]">
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					className="text-[hsl(var(--glass-bg-hover))]"
				/>
				{indeterminate ? (
					<motion.circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={circumference}
						className={variantColors[variant]}
						animate={{
							strokeDashoffset: [circumference, -circumference],
							rotate: [0, 360],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "linear",
						}}
						style={{ transformOrigin: "center" }}
					/>
				) : (
					<motion.circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={circumference}
						className={variantColors[variant]}
						initial={{ strokeDashoffset: circumference }}
						animate={{ strokeDashoffset: offset }}
						transition={{ duration: 0.4, ease: "easeOut" }}
					/>
				)}
			</svg>
			{showValue && !indeterminate && (
				<span className="absolute text-xs font-medium text-[hsl(var(--text-secondary))]">
					{Math.round(percentage)}%
				</span>
			)}
		</div>
	);
}

export { Progress, CircularProgress };
