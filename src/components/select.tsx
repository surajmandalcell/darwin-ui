"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import { getDuration } from "../lib/animation-config";
import { cn } from "../lib/utils";

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
	/** Enable frosted glass effect on dropdown */
	glass?: boolean;
}

interface SingleSelectProps extends BaseSelectProps {
	type?: "single";
	value?: string;
	defaultValue?: string;
	onChange?: (e: { target: { value: string } }) => void;
	/** Show a search input, optionally once the option count reaches a threshold */
	searchable?: boolean | number;
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

const DROPDOWN_MAX_HEIGHT = 320;
const SEARCH_INPUT_HEIGHT = 42;

function useDropdownPosition(
	open: boolean,
	buttonRef: React.RefObject<HTMLButtonElement | null>,
	maxHeight = DROPDOWN_MAX_HEIGHT,
) {
	const [position, setPosition] = React.useState<{
		top?: number;
		bottom?: number;
		left: number;
		width: number;
		maxHeight: number;
	}>({ top: 0, left: 0, width: 0, maxHeight });

	React.useEffect(() => {
		if (!open) return;

		function updatePosition() {
			if (!buttonRef.current) return;

			const rect = buttonRef.current.getBoundingClientRect();
			const gap = 4;
			const viewportPadding = 8;
			const spaceBelow =
				window.innerHeight - rect.bottom - gap - viewportPadding;
			const spaceAbove = rect.top - gap - viewportPadding;
			const placeAbove = spaceBelow < maxHeight && spaceAbove > spaceBelow;
			const availableHeight = placeAbove ? spaceAbove : spaceBelow;

			setPosition({
				top: placeAbove ? undefined : rect.bottom + gap,
				bottom: placeAbove ? window.innerHeight - rect.top + gap : undefined,
				left: rect.left,
				width: rect.width,
				maxHeight: Math.min(maxHeight, Math.max(0, availableHeight)),
			});
		}

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);
		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [buttonRef, maxHeight, open]);

	return position;
}

function useClickOutside(
	containerRef: React.RefObject<HTMLElement | null>,
	dropdownRef: React.RefObject<HTMLElement | null>,
	open: boolean,
	onClose: () => void,
) {
	React.useEffect(() => {
		function handleClick(e: MouseEvent) {
			const target = e.target as Node;
			if (
				!containerRef.current?.contains(target) &&
				!dropdownRef.current?.contains(target)
			) {
				onClose();
			}
		}
		if (open) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [containerRef, dropdownRef, onClose, open]);
}

function getTextContent(node: React.ReactNode): string {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}
	if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
		return getTextContent(node.props.children);
	}
	return React.Children.toArray(node).map(getTextContent).join(" ");
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
	glass = false,
	searchable = false,
}: SingleSelectProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [activeValue, setActiveValue] = React.useState<string>();
	const containerRef = React.useRef<HTMLDivElement>(null);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const listboxId = React.useId();
	const closeDropdown = React.useCallback(() => {
		setActiveValue(undefined);
		setOpen(false);
	}, []);

	useClickOutside(containerRef, dropdownRef, open, closeDropdown);

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
	const showSearch =
		searchable === true ||
		(typeof searchable === "number" && options.length >= searchable);
	const position = useDropdownPosition(
		open,
		buttonRef,
		showSearch
			? DROPDOWN_MAX_HEIGHT + SEARCH_INPUT_HEIGHT
			: DROPDOWN_MAX_HEIGHT,
	);

	// Determine selected value
	const selected = React.useMemo(() => {
		const v = value ?? defaultValue ?? options[0]?.value ?? "";
		const match = options.find((o) => o.value === v);
		return { value: v, label: match?.label ?? v };
	}, [value, defaultValue, options]);

	const filteredOptions = React.useMemo(() => {
		const query = search.trim().toLocaleLowerCase();
		if (!showSearch || !query) return options;
		return options.filter(
			(option) =>
				getTextContent(option.label).toLocaleLowerCase().includes(query) ||
				option.value.toLocaleLowerCase().includes(query),
		);
	}, [options, search, showSearch]);

	const activeIndex = React.useMemo(() => {
		const highlightedIndex = filteredOptions.findIndex(
			(option) => option.value === activeValue && !option.disabled,
		);
		if (highlightedIndex >= 0) return highlightedIndex;
		const selectedIndex = filteredOptions.findIndex(
			(option) => option.value === selected.value && !option.disabled,
		);
		return selectedIndex >= 0
			? selectedIndex
			: filteredOptions.findIndex((option) => !option.disabled);
	}, [activeValue, filteredOptions, selected.value]);

	function handleSelect(val: string) {
		onChange?.({ target: { value: val } });
		closeDropdown();
	}

	function moveActive(direction: 1 | -1) {
		let next = activeIndex >= 0 ? activeIndex : direction === 1 ? -1 : 0;
		for (let i = 0; i < filteredOptions.length; i++) {
			next =
				(next + direction + filteredOptions.length) % filteredOptions.length;
			const option = filteredOptions[next];
			if (!option?.disabled) {
				setActiveValue(option.value);
				return;
			}
		}
	}

	function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Escape") {
			e.preventDefault();
			if (search) {
				setSearch("");
				setActiveValue(undefined);
			} else {
				closeDropdown();
				buttonRef.current?.focus();
			}
		} else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			moveActive(e.key === "ArrowDown" ? 1 : -1);
		} else if (e.key === "Enter") {
			e.preventDefault();
			const option =
				filteredOptions.length === 1
					? filteredOptions[0]
					: filteredOptions.find((item) => item.value === activeValue);
			if (option && !option.disabled) handleSelect(option.value);
		}
	}

	const dropdown =
		typeof window !== "undefined"
			? createPortal(
					<AnimatePresence>
						{open && (
							<motion.div
								ref={dropdownRef}
								initial={{ opacity: 0, scale: 0.95, y: -10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: -10 }}
								transition={{
									duration: getDuration("normal"),
									ease: "easeOut",
								}}
								style={{
									position: "fixed",
									top: position.top,
									bottom: position.bottom,
									left: position.left,
									width: position.width,
									maxHeight: position.maxHeight,
								}}
								className={cn(
									"z-50 overflow-hidden rounded-lg border shadow-md flex flex-col",
									glass
										? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 dark:border-white/10"
										: "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-black/10 dark:border-white/10",
								)}
							>
								{showSearch && (
									<div className="shrink-0 border-b border-black/10 dark:border-white/10 p-1">
										<input
											type="search"
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
												setActiveValue(undefined);
											}}
											onKeyDown={handleSearchKeyDown}
											aria-label="Search options"
											aria-controls={listboxId}
											aria-activedescendant={
												activeIndex >= 0
													? `${listboxId}-option-${activeIndex}`
													: undefined
											}
											placeholder="Search options..."
											className="h-8 w-full rounded-md bg-black/5 dark:bg-white/5 px-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								)}
								{/* biome-ignore lint/a11y/useSemanticElements: This styled popup cannot use a native select. */}
								<div
									role="listbox"
									id={listboxId}
									tabIndex={-1}
									className="max-h-80 min-h-0 overflow-y-auto overscroll-contain py-1 px-1 flex flex-col gap-0.5"
								>
									{filteredOptions.map((opt, index) => (
										/* biome-ignore lint/a11y/useSemanticElements: Custom options support richer React labels. */
										<div
											role="option"
											key={opt.value}
											id={`${listboxId}-option-${index}`}
											aria-selected={opt.value === selected.value}
											data-disabled={opt.disabled || undefined}
											onClick={() => !opt.disabled && handleSelect(opt.value)}
											onKeyDown={(e) => {
												if (e.key === "Escape") {
													closeDropdown();
													buttonRef.current?.focus();
												} else if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													if (!opt.disabled) handleSelect(opt.value);
												}
											}}
											onMouseEnter={() =>
												showSearch && setActiveValue(opt.value)
											}
											tabIndex={opt.disabled ? -1 : 0}
											className={cn(
												"relative flex w-full cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors",
												opt.disabled &&
													"pointer-events-none opacity-50 cursor-not-allowed",
												opt.value === selected.value ||
													(showSearch && index === activeIndex)
													? "bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-100"
													: "text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5",
											)}
										>
											<span className="min-w-0 flex-1 truncate">
												{opt.label}
											</span>
										</div>
									))}
									{filteredOptions.length === 0 && (
										<div className="px-2 py-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
											No options found
										</div>
									)}
								</div>
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
				onClick={() => (open ? closeDropdown() : setOpen(true))}
				className={cn(
					"flex h-9 w-full items-center justify-between rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 backdrop-blur-sm",
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
	glass = false,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const position = useDropdownPosition(open, buttonRef);
	const closeDropdown = React.useCallback(() => setOpen(false), []);

	useClickOutside(containerRef, dropdownRef, open, closeDropdown);

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
								ref={dropdownRef}
								initial={{ opacity: 0, scale: 0.95, y: -10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: -10 }}
								transition={{
									duration: getDuration("normal"),
									ease: "easeOut",
								}}
								style={{
									position: "fixed",
									top: position.top,
									bottom: position.bottom,
									left: position.left,
									minWidth: position.width,
									maxHeight: position.maxHeight,
								}}
								className={cn(
									"z-50 min-w-32 overflow-hidden rounded-lg border shadow-md flex flex-col",
									glass
										? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 dark:border-white/10"
										: "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-black/10 dark:border-white/10",
								)}
							>
								{/* biome-ignore lint/a11y/useSemanticElements: This styled popup cannot use a native select. */}
								<div
									role="listbox"
									tabIndex={-1}
									className="max-h-80 min-h-0 overflow-y-auto overscroll-contain p-1"
								>
									{options.map((opt) => {
										const isSelected = value.includes(opt.value);
										return (
											/* biome-ignore lint/a11y/useSemanticElements: Custom options support richer React labels. */
											<div
												role="option"
												key={opt.value}
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
													"relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-black/10 dark:hover:bg-white/10",
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
											</div>
										);
									})}
								</div>
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
					"flex h-9 w-full items-center justify-between rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 backdrop-blur-sm",
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
								className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-zinc-700 dark:text-zinc-300 text-xs backdrop-blur-sm"
							>
								{options.find((o) => o.value === v)?.label || v}
								<button
									type="button"
									className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/10 p-0.5"
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
