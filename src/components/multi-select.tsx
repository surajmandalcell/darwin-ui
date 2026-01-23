"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
	label: string;
	value: string;
}

interface MultiSelectProps {
	value: string[];
	onChange: (next: string[]) => void;
	options: Option[];
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

function ChevronIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

function XIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

export function MultiSelect({
	value,
	onChange,
	options,
	placeholder = "Select...",
	disabled = false,
	className,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const buttonRef = React.useRef<HTMLButtonElement | null>(null);
	const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 });

	React.useEffect(() => {
		if (open && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setDropdownPosition({
				top: rect.bottom + window.scrollY + 4,
				left: rect.left + window.scrollX,
				width: rect.width,
			});
		}
	}, [open]);

	React.useEffect(() => {
		function onDocClick(e: MouseEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) setOpen(false);
		}
		if (open) document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, [open]);

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
		if (value.length <= 2) {
			return value.map((v) => options.find((o) => o.value === v)?.label || v).join(", ");
		}
		return `${value.length} selected`;
	}, [value, options]);

	const dropdown = typeof window !== "undefined" ? (
		createPortal(
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						style={{
							position: 'fixed',
							top: `${dropdownPosition.top}px`,
							left: `${dropdownPosition.left}px`,
							minWidth: `${dropdownPosition.width}px`,
						}}
						className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-[hsl(var(--border-default))] bg-[hsl(var(--overlay-bg))] backdrop-blur-md shadow-md"
					>
						<ul role="listbox" className="p-1">
							{options.map((opt) => {
								const isSelected = value.includes(opt.value);
								return (
									<li
										key={opt.value}
										role="option"
										aria-selected={isSelected}
										onClick={() => toggle(opt.value)}
										className={cn(
											"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-[hsl(var(--glass-bg-hover))]",
											isSelected ? "text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-secondary))]"
										)}
									>
										<span className="absolute left-2 flex h-4 w-4 items-center justify-center">
											{isSelected && (
												<motion.span
													initial={{ scale: 0, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													exit={{ scale: 0, opacity: 0 }}
													transition={{ duration: 0.1 }}
												>
													<CheckIcon className="h-3 w-3 text-[hsl(var(--brand-primary))]" />
												</motion.span>
											)}
										</span>
										{opt.label}
									</li>
								);
							})}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>,
			document.body
		)
	) : null;

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
					"flex h-9 w-full items-center justify-between rounded-md border border-[hsl(var(--border-default))] bg-[hsl(var(--glass-bg))] px-3 py-2 text-sm text-[hsl(var(--text-primary))] shadow-sm ring-offset-background placeholder:text-[hsl(var(--text-tertiary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[hsl(var(--glass-bg-hover))] transition-colors backdrop-blur-sm",
				)}
			>
				<span className={cn("truncate", !displayValue && "text-[hsl(var(--text-tertiary))]")}>
					{displayValue || placeholder}
				</span>
				<span className="ml-2 h-4 w-4 opacity-50">
					<motion.span
						animate={{ rotate: open ? 180 : 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="block"
					>
						<ChevronIcon className="h-4 w-4" />
					</motion.span>
				</span>
			</button>
			{dropdown}
			{value.length > 0 && (
				<div className="flex flex-wrap gap-1.5 mt-2">
					{value.map((v) => (
						<motion.span
							key={v}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.15 }}
							className="inline-flex items-center gap-1.5 px-2 py-1 bg-[hsl(var(--glass-bg))] border border-[hsl(var(--border-default))] rounded-md text-[hsl(var(--text-secondary))] text-xs backdrop-blur-sm"
						>
							{options.find((o) => o.value === v)?.label || v}
							<button
								type="button"
								className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-secondary))] transition-colors rounded-sm hover:bg-[hsl(var(--glass-bg-hover))] p-0.5"
								onClick={(e) => removeTag(e, v)}
							>
								<XIcon className="h-3 w-3" />
							</button>
						</motion.span>
					))}
				</div>
			)}
		</div>
	);
}
