"use client";

import React from "react";
import { createPortal } from "react-dom";

interface Option {
	label: string;
	value: string;
}

interface MultiSelectProps {
	value: string[];
	onChange: (next: string[]) => void;
	options: Option[];
	placeholder?: string;
}

export function MultiSelect({
	value,
	onChange,
	options,
	placeholder,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement | null>(null);
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
		const onDoc = (e: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);

	function toggle(val: string) {
		const has = value.includes(val);
		onChange(has ? value.filter((v) => v !== val) : [...value, val]);
	}

	const dropdown = open && typeof window !== "undefined" ? (
		createPortal(
			<div
				style={{
					position: 'fixed',
					top: `${dropdownPosition.top}px`,
					left: `${dropdownPosition.left}px`,
					width: `${dropdownPosition.width}px`,
				}}
				className="z-9999 rounded-md border border-white/10 bg-[#121212] p-2 shadow-lg"
			>
				{options.map((opt) => (
					<label
						key={opt.value}
						className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 cursor-pointer text-sm text-white/90"
					>
						<input
							type="checkbox"
							className="accent-blue-500"
							checked={value.includes(opt.value)}
							onChange={() => toggle(opt.value)}
						/>
						<span>{opt.label}</span>
					</label>
				))}
			</div>,
			document.body
		)
	) : null;

	return (
		<div className="relative" ref={ref}>
			<button
				ref={buttonRef}
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="w-full min-h-8 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-white/90 text-sm text-left flex items-center justify-between hover:bg-white/10"
			>
				<span className="truncate">
					{value.length ? value.join(", ") : placeholder || "Select..."}
				</span>
				<span className="text-white/50 text-xs">{open ? "▲" : "▼"}</span>
			</button>
			{dropdown}
			{value.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{value.map((v) => (
						<span
							key={v}
							className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 border border-white/15 rounded text-white/80 text-xs"
						>
							{options.find((o) => o.value === v)?.label || v}
							<button
								type="button"
								className="text-white/60 hover:text-red-400"
								onClick={() => toggle(v)}
							>
								×
							</button>
						</span>
					))}
				</div>
			)}
		</div>
	);
}
