"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type OptionLike = { value: string; label: React.ReactNode };

interface SelectProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
	children: React.ReactNode;
	onChange?: (e: { target: { value: string } }) => void;
	value?: string;
	defaultValue?: string;
	disabled?: boolean;
}

export function Select({
	children,
	className = "",
	value,
	defaultValue,
	onChange,
	disabled,
	...props
}: SelectProps) {
	const [open, setOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const buttonRef = React.useRef<HTMLButtonElement | null>(null);
	const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 });

	const options = React.useMemo<OptionLike[]>(() => {
		return React.Children.toArray(children).flatMap((child) => {
			if (!React.isValidElement(child)) return [] as OptionLike[];
			const props = child.props as {
				value?: string;
				children?: React.ReactNode;
			};
			const val = props.value ?? String(props.children ?? "");
			return [{ value: String(val), label: props.children }];
		});
	}, [children]);

	const selected = React.useMemo(() => {
		const v =
			(value as string) ?? (defaultValue as string) ?? options[0]?.value ?? "";
		const match = options.find((o) => o.value === v);
		return { value: v, label: match?.label ?? v };
	}, [value, defaultValue, options]);

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

	function handleSelect(val: string) {
		onChange?.({ target: { value: val } });
		setOpen(false);
	}

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
						className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-[#1a1a1a]/95 backdrop-blur-xl shadow-xl"
					>
						<ul role="listbox" className="p-1">
							{options.map((opt) => (
								<li
									key={opt.value}
									role="option"
									aria-selected={opt.value === selected.value}
									onClick={() => handleSelect(opt.value)}
									className={cn(
										"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none transition-colors hover:bg-white/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
										opt.value === selected.value ? "bg-white/10 text-white" : "text-white/80"
									)}
								>
									{opt.label}
								</li>
							))}
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
			{...props}
		>
			<button
				ref={buttonRef}
				type="button"
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className={cn(
					"flex h-9 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 shadow-sm ring-offset-background placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/10 transition-colors backdrop-blur-sm",
				)}
			>
				<span className="truncate">{selected.label}</span>
				<span className="ml-2 h-4 w-4 opacity-50">
					<motion.svg
						animate={{ rotate: open ? 180 : 0 }}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-4 w-4"
					>
						<path d="m6 9 6 6 6-6" />
					</motion.svg>
				</span>
			</button>
			{dropdown}
		</div>
	);
}