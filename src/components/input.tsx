"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Check, X, Search } from "lucide-react";
import { getDuration } from "../lib/animation-config";

// ============================================================================
// Types
// ============================================================================

type InputVariant = "text" | "search" | "password" | "email" | "number";
type InputSize = "sm" | "md" | "lg";

interface BaseInputProps {
	/** Size variant */
	size?: InputSize;
	/** Error state - shows red border and X icon */
	error?: boolean;
	/** Success state - shows green border and check icon */
	success?: boolean;
	/** Icon to show on the left */
	leftIcon?: React.ReactNode;
	/** Icon to show on the right (overridden by error/success icons) */
	rightIcon?: React.ReactNode;
	/** Additional wrapper class */
	wrapperClassName?: string;
}

export interface InputProps
	extends BaseInputProps,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	/** Input type variant */
	variant?: InputVariant;
}

export interface TextAreaProps
	extends BaseInputProps,
		Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
	/** Resize behavior */
	resize?: "none" | "vertical" | "horizontal" | "both";
	/** Auto-resize based on content */
	autoResize?: boolean;
}

// ============================================================================
// Size Classes
// ============================================================================

const inputSizeClasses: Record<InputSize, string> = {
	sm: "h-8 text-xs px-2.5",
	md: "h-9 text-sm px-3",
	lg: "h-10 text-base px-4",
};

const textareaSizeClasses: Record<InputSize, string> = {
	sm: "text-xs px-2.5 py-1.5 min-h-15",
	md: "text-sm px-3 py-2 min-h-20",
	lg: "text-base px-4 py-2.5 min-h-25",
};

const iconSizeClasses: Record<InputSize, string> = {
	sm: "w-3.5 h-3.5",
	md: "w-4 h-4",
	lg: "w-5 h-5",
};

// ============================================================================
// Shared Styles
// ============================================================================

const baseInputClasses =
	"flex w-full rounded-lg bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 shadow-sm transition-all duration-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/10 focus:bg-white/90 dark:focus:bg-zinc-900/90 focus:backdrop-blur-md";

const getStateClasses = (error?: boolean, success?: boolean) => {
	if (error) {
		return "ring-1 ring-inset ring-red-500/50 focus:ring-2 focus:ring-red-500";
	}
	if (success) {
		return "ring-1 ring-inset ring-emerald-500/50 focus:ring-2 focus:ring-emerald-500";
	}
	return "ring-1 ring-inset ring-black/10 dark:ring-white/10 focus:ring-2 focus:ring-blue-500";
};

// ============================================================================
// Shake Animation Hook
// ============================================================================

function useShakeAnimation(error?: boolean) {
	const [shouldShake, setShouldShake] = React.useState(false);

	React.useEffect(() => {
		if (error) {
			setShouldShake(true);
			const timer = setTimeout(() => setShouldShake(false), 500);
			return () => clearTimeout(timer);
		}
	}, [error]);

	return shouldShake;
}

// ============================================================================
// Input Component
// ============================================================================

const InputBase = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			variant = "text",
			size = "md",
			error,
			success,
			leftIcon,
			rightIcon,
			wrapperClassName,
			...props
		},
		ref,
	) => {
		const shouldShake = useShakeAnimation(error);
		const hasLeftIcon = !!leftIcon;
		const hasRightContent = error || success || !!rightIcon;

		const inputType =
			variant === "text"
				? type || "text"
				: variant === "search"
					? "search"
					: variant;

		return (
			<div className={cn("relative w-full", wrapperClassName)}>
				{hasLeftIcon && (
					<span
						className={cn(
							"absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 pointer-events-none z-10",
							iconSizeClasses[size],
						)}
					>
						{leftIcon}
					</span>
				)}
				<motion.input
					type={inputType}
					animate={shouldShake ? { x: [-6, 6, -6, 6, 0] } : {}}
					transition={{
						duration: getDuration("normal") * 2,
						ease: "easeInOut",
					}}
					className={cn(
						baseInputClasses,
						inputSizeClasses[size],
						getStateClasses(error, success),
						hasLeftIcon && "pl-9",
						hasRightContent && "pr-9",
						"file:border-0 file:bg-transparent file:text-sm file:font-medium",
						className,
					)}
					ref={ref}
					// biome-ignore lint/suspicious/noExplicitAny: Framer Motion onDrag conflicts with HTML onDrag
					{...(props as any)}
				/>
				{error && (
					<X
						className={cn(
							"absolute right-3 top-1/2 -translate-y-1/2 text-red-500",
							iconSizeClasses[size],
						)}
					/>
				)}
				{success && !error && (
					<Check
						className={cn(
							"absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500",
							iconSizeClasses[size],
						)}
					/>
				)}
				{!error && !success && rightIcon && (
					<span
						className={cn(
							"absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 pointer-events-none",
							iconSizeClasses[size],
						)}
					>
						{rightIcon}
					</span>
				)}
			</div>
		);
	},
);
InputBase.displayName = "Input";

// ============================================================================
// TextArea Component
// ============================================================================

const TextAreaBase = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			className,
			size = "md",
			error,
			success,
			leftIcon,
			rightIcon,
			wrapperClassName,
			resize = "vertical",
			autoResize = false,
			onChange,
			...props
		},
		ref,
	) => {
		const shouldShake = useShakeAnimation(error);
		const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

		const resizeClasses = {
			none: "resize-none",
			vertical: "resize-y",
			horizontal: "resize-x",
			both: "resize",
		};

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
			[handleAutoResize, onChange],
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
			[ref],
		);

		return (
			<div className={cn("relative w-full", wrapperClassName)}>
				<motion.textarea
					ref={setRefs}
					animate={shouldShake ? { x: [-6, 6, -6, 6, 0] } : {}}
					transition={{
						duration: getDuration("normal") * 2,
						ease: "easeInOut",
					}}
					onChange={handleChange}
					className={cn(
						baseInputClasses,
						textareaSizeClasses[size],
						getStateClasses(error, success),
						autoResize ? "resize-none overflow-hidden" : resizeClasses[resize],
						className,
					)}
					// biome-ignore lint/suspicious/noExplicitAny: Framer Motion onDrag conflicts with HTML onDrag
					{...(props as any)}
				/>
				{error && (
					<X
						className={cn(
							"absolute right-3 top-3 text-red-500",
							iconSizeClasses[size],
						)}
					/>
				)}
				{success && !error && (
					<Check
						className={cn(
							"absolute right-3 top-3 text-emerald-500",
							iconSizeClasses[size],
						)}
					/>
				)}
			</div>
		);
	},
);
TextAreaBase.displayName = "Input.TextArea";

// ============================================================================
// Compound Components
// ============================================================================

type InputComponent = typeof InputBase & {
	Search: typeof SearchInput;
	TextArea: typeof TextAreaBase;
	Password: typeof PasswordInput;
};

const SearchInput = React.forwardRef<
	HTMLInputElement,
	Omit<InputProps, "variant" | "leftIcon">
>((props, ref) => (
	<InputBase
		ref={ref}
		variant="search"
		leftIcon={<Search className="w-full h-full" />}
		{...props}
	/>
));
SearchInput.displayName = "Input.Search";

const PasswordInput = React.forwardRef<
	HTMLInputElement,
	Omit<InputProps, "variant" | "type">
>((props, ref) => <InputBase ref={ref} variant="password" {...props} />);
PasswordInput.displayName = "Input.Password";

// ============================================================================
// Export
// ============================================================================

const Input = InputBase as InputComponent;
Input.Search = SearchInput;
Input.TextArea = TextAreaBase;
Input.Password = PasswordInput;

export { Input };

// Backward compatibility - will be removed in next major version
export { TextAreaBase as Textarea };
export type { TextAreaProps as TextareaProps };

// Direct export for SearchInput (also available as Input.Search)
export { SearchInput };
