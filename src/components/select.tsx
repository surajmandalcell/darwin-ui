"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export interface SelectOption {
	value: string;
	label: React.ReactNode;
	disabled?: boolean;
}

interface BaseSelectProps {
	/** Placeholder text when no selection */
	placeholder?: string;
	/** Disable the select */
	disabled?: boolean;
	/** Additional class for the container */
	className?: string;
	/** Max items to display as text before showing count */
	maxDisplayCount?: number;
}

interface SingleSelectProps extends BaseSelectProps {
	type?: "single";
	value?: string;
	defaultValue?: string;
	onChange?: (e: { target: { value: string } }) => void;
	/** Options as array (alternative to children) */
	options?: SelectOption[];
	/** Children (SelectOption elements) */
	children?: React.ReactNode;
}

interface MultiSelectProps extends BaseSelectProps {
	type: "multiple";
	value: string[];
	onChange: (values: string[]) => void;
	/** Options as array */
	options: SelectOption[];
	/** Show tags below the select */
	showTags?: boolean;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

// ============================================================================
// Hooks
// ============================================================================

function useDropdownPosition(
	open: boolean,
	buttonRef: React.RefObject<HTMLButtonElement | null>,
) {
	const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });

	React.useEffect(() => {
		if (open && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setPosition({
				top: rect.bottom + window.scrollY + 4,
				left: rect.left + window.scrollX,
				width: rect.width,
			});
		}
	}, [open, buttonRef]);

	return position;
}

function useClickOutside(
	ref: React.RefObject<HTMLElement | null>,
	open: boolean,
	onClose: () => void,
) {
	React.useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		}
		if (open) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open, onClose, ref]);
}

// ============================================================================
// Select Component
// ============================================================================

function SelectBase(props: SelectProps) {
	const isMultiple = props.type === "multiple";

	if (isMultiple) {
		return <MultiSelectInternal {...(props as MultiSelectProps)} />;
	}
	return <SingleSelectInternal {...(props as SingleSelectProps)} />;
}

// ============================================================================
// Single Select Internal
// ============================================================================

function SingleSelectInternal({
	children,
	className,
	value,
	defaultValue,
	onChange,
	disabled,
	options: optionsProp,
	placeholder,
}: SingleSelectProps) {
	const [open, setOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const position = useDropdownPosition(open, buttonRef);

	useClickOutside(containerRef, open, () => setOpen(false));

	// Parse options from children or props
	const options = React.useMemo<SelectOption[]>(() => {
		if (optionsProp) return optionsProp;
		return React.Children.toArray(children).flatMap((child) => {
			if (!React.isValidElement(child)) return [];
			const childProps = child.props as {
				value?: string;
				children?: React.ReactNode;
				disabled?: boolean;
			};
			const val = childProps.value ?? String(childProps.children ?? "");
			return [
				{
					value: String(val),
					label: childProps.children,
					disabled: childProps.disabled,
				},
			];
		});
	}, [children, optionsProp]);

	// Determine selected value
	const selected = React.useMemo(() => {
		const v = value ?? defaultValue ?? options[0]?.value ?? "";
		const match = options.find((o) => o.value === v);
		return { value: v, label: match?.label ?? v };
	}, [value, defaultValue, options]);

	function handleSelect(val: string) {
		onChange?.({ target: { value: val } });
		setOpen(false);
	}

	const dropdown =
		typeof window !== "undefined"
			? createPortal(
					<AnimatePresence>
						{open && (
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: -10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: -10 }}
								transition={{ duration: getDuration("normal"), ease: "easeOut" }}
								style={{
									position: "fixed",
									top: `${position.top}px`,
									left: `${position.left}px`,
									minWidth: `${position.width}px`,
								}}
								className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-md"
							>
								<ul role="listbox" className="py-1 px-1 flex flex-col gap-0.5">
									{options.map((opt) => (
										<li
											key={opt.value}
											role="option"
											aria-selected={opt.value === selected.value}
											data-disabled={opt.disabled || undefined}
											onClick={() => !opt.disabled && handleSelect(opt.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													if (!opt.disabled) handleSelect(opt.value);
												}
											}}
											tabIndex={opt.disabled ? -1 : 0}
											className={cn(
												"relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
												opt.disabled &&
													"pointer-events-none opacity-50 cursor-not-allowed",
												opt.value === selected.value
													? "bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-100"
													: "text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5",
											)}
										>
											{opt.label}
										</li>
									))}
								</ul>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body,
				)
			: null;

	return (
		<div
			ref={containerRef}
			className={cn("relative inline-block w-full", className)}
		>
			<button
				ref={buttonRef}
				type="button"
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className={cn(
					"flex h-9 w-full items-center justify-between rounded-md ring-1 ring-inset ring-black/10 dark:ring-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 backdrop-blur-sm",
				)}
			>
				<span
					className={cn(
						"truncate",
						!selected.label && "text-zinc-500 dark:text-zinc-400",
					)}
				>
					{selected.label || placeholder || "Select..."}
				</span>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: getDuration("slow"), ease: "easeOut" }}
					className="ml-2 h-4 w-4 opacity-50"
				>
					<ChevronDown className="h-4 w-4" />
				</motion.span>
			</button>
			{dropdown}
		</div>
	);
}

// ============================================================================
// Multi Select Internal
// ============================================================================

function MultiSelectInternal({
	value,
	onChange,
	options,
	placeholder = "Select...",
	disabled = false,
	className,
	maxDisplayCount = 2,
	showTags = true,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const position = useDropdownPosition(open, buttonRef);

	useClickOutside(containerRef, open, () => setOpen(false));

	function toggle(val: string) {
		const has = value.includes(val);
		onChange(has ? value.filter((v) => v !== val) : [...value, val]);
	}

	function removeTag(e: React.MouseEvent, val: string) {
		e.stopPropagation();
		onChange(value.filter((v) => v !== val));
	}

	const displayValue = React.useMemo(() => {
		if (value.length === 0) return null;
		if (value.length <= maxDisplayCount) {
			return value
				.map((v) => options.find((o) => o.value === v)?.label || v)
				.join(", ");
		}
		return `${value.length} selected`;
	}, [value, options, maxDisplayCount]);

	const dropdown =
		typeof window !== "undefined"
			? createPortal(
					<AnimatePresence>
						{open && (
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: -10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: -10 }}
								transition={{ duration: getDuration("normal"), ease: "easeOut" }}
								style={{
									position: "fixed",
									top: `${position.top}px`,
									left: `${position.left}px`,
									minWidth: `${position.width}px`,
								}}
								className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-md"
							>
								<ul role="listbox" className="p-1">
									{options.map((opt) => {
										const isSelected = value.includes(opt.value);
										return (
											<li
												key={opt.value}
												role="option"
												aria-selected={isSelected}
												data-disabled={opt.disabled || undefined}
												onClick={() => !opt.disabled && toggle(opt.value)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														e.preventDefault();
														if (!opt.disabled) toggle(opt.value);
													}
												}}
												tabIndex={opt.disabled ? -1 : 0}
												className={cn(
													"relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-black/10 dark:hover:bg-white/10",
													opt.disabled &&
														"pointer-events-none opacity-50 cursor-not-allowed",
													isSelected
														? "text-zinc-900 dark:text-zinc-100"
														: "text-zinc-700 dark:text-zinc-300",
												)}
											>
												<span className="absolute left-2 flex h-4 w-4 items-center justify-center">
													<AnimatePresence>
														{isSelected && (
															<motion.span
																initial={{ scale: 0, opacity: 0 }}
																animate={{ scale: 1, opacity: 1 }}
																exit={{ scale: 0, opacity: 0 }}
																transition={{ duration: getDuration("fast") }}
															>
																<Check className="h-3 w-3 text-blue-500" />
															</motion.span>
														)}
													</AnimatePresence>
												</span>
												{opt.label}
											</li>
										);
									})}
								</ul>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body,
				)
			: null;

	return (
		<div
			ref={containerRef}
			className={cn("relative inline-block w-full", className)}
		>
			<button
				ref={buttonRef}
				type="button"
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className={cn(
					"flex h-9 w-full items-center justify-between rounded-md ring-1 ring-inset ring-black/10 dark:ring-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 backdrop-blur-sm",
				)}
			>
				<span
					className={cn(
						"truncate",
						!displayValue && "text-zinc-500 dark:text-zinc-400",
					)}
				>
					{displayValue || placeholder}
				</span>
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: getDuration("slow"), ease: "easeOut" }}
					className="ml-2 h-4 w-4 opacity-50"
				>
					<ChevronDown className="h-4 w-4" />
				</motion.span>
			</button>
			{dropdown}
			{showTags && value.length > 0 && (
				<div className="flex flex-wrap gap-1.5 mt-2">
					<AnimatePresence>
						{value.map((v) => (
							<motion.span
								key={v}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ duration: getDuration("normal") }}
								className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-zinc-700 dark:text-zinc-300 text-xs backdrop-blur-sm"
							>
								{options.find((o) => o.value === v)?.label || v}
								<button
									type="button"
									className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors rounded-sm hover:bg-black/5 dark:hover:bg-white/10 p-0.5"
									onClick={(e) => removeTag(e, v)}
								>
									<X className="h-3 w-3" />
								</button>
							</motion.span>
						))}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
}

// ============================================================================
// Compound Components
// ============================================================================

interface SelectOptionProps {
	value?: string;
	children: React.ReactNode;
	disabled?: boolean;
}

function SelectOptionComponent(_props: SelectOptionProps) {
	// This is a marker component - options are extracted by the parent
	return null;
}
SelectOptionComponent.displayName = "Select.Option";

// Multi Select convenience component
const MultiSelectComponent = React.forwardRef<
	HTMLDivElement,
	Omit<MultiSelectProps, "type">
>((props, _ref) => <SelectBase type="multiple" {...props} />);
MultiSelectComponent.displayName = "Select.Multiple";

// ============================================================================
// Export
// ============================================================================

type SelectComponent = typeof SelectBase & {
	Option: typeof SelectOptionComponent;
	Multiple: typeof MultiSelectComponent;
};

const Select = SelectBase as SelectComponent;
Select.Option = SelectOptionComponent;
Select.Multiple = MultiSelectComponent;

export { Select };

// Backward compatibility - will be removed in next major version
export { MultiSelectComponent as MultiSelect };
