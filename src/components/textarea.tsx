"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Check, X } from "lucide-react";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean;
	success?: boolean;
	resize?: "none" | "vertical" | "horizontal" | "both";
	autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			className,
			error,
			success,
			resize = "vertical",
			autoResize = false,
			onChange,
			...props
		},
		ref
	) => {
		const [shouldShake, setShouldShake] = React.useState(false);
		const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

		const resizeClasses = {
			none: "resize-none",
			vertical: "resize-y",
			horizontal: "resize-x",
			both: "resize",
		};

		React.useEffect(() => {
			if (error) {
				setShouldShake(true);
				const timer = setTimeout(() => setShouldShake(false), 500);
				return () => clearTimeout(timer);
			}
		}, [error]);

		const handleAutoResize = React.useCallback(() => {
			const textarea = textareaRef.current;
			if (textarea && autoResize) {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			}
		}, [autoResize]);

		const handleChange = React.useCallback(
			(event: React.ChangeEvent<HTMLTextAreaElement>) => {
				handleAutoResize();
				onChange?.(event);
			},
			[handleAutoResize, onChange]
		);

		React.useEffect(() => {
			handleAutoResize();
		}, [handleAutoResize]);

		const setRefs = React.useCallback(
			(element: HTMLTextAreaElement | null) => {
				textareaRef.current = element;
				if (typeof ref === "function") {
					ref(element);
				} else if (ref) {
					ref.current = element;
				}
			},
			[ref]
		);

		return (
			<div className="relative w-full">
				<motion.textarea
					ref={setRefs}
					animate={shouldShake ? { x: [-6, 6, -6, 6, 0] } : {}}
					transition={{
						duration: 0.3,
						ease: "easeInOut",
					}}
					onChange={handleChange}
					className={cn(
						"flex min-h-[80px] w-full rounded-md border bg-[hsl(var(--glass-bg))] px-3 py-2 text-sm text-[hsl(var(--text-primary))] shadow-sm transition-colors placeholder:text-[hsl(var(--text-muted))] focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm hover:bg-[hsl(var(--glass-bg-hover))]",
						error && "border-[hsl(var(--error)/0.5)] focus-visible:ring-[hsl(var(--error)/0.5)]",
						success && "border-[hsl(var(--success)/0.5)] focus-visible:ring-[hsl(var(--success)/0.5)]",
						!error && !success && "border-[hsl(var(--border-default))] focus-visible:ring-[hsl(var(--ring))]",
						autoResize ? "resize-none overflow-hidden" : resizeClasses[resize],
						className
					)}
					{...(props as any)}
				/>
				{error && (
					<X className="absolute right-3 top-3 w-4 h-4 text-[hsl(var(--error))]" />
				)}
				{success && !error && (
					<Check className="absolute right-3 top-3 w-4 h-4 text-[hsl(var(--success))]" />
				)}
			</div>
		);
	}
);

Textarea.displayName = "Textarea";

export { Textarea };
