"use client";

import { useId } from "react";
import type React from "react";

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	label?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export function Switch({
	className = "",
	label,
	checked,
	onChange,
	disabled,
	...props
}: SwitchProps) {
	const id = useId();

	return (
		<label
			htmlFor={id}
			className={`inline-flex items-center gap-2 text-[13px] text-slate-100 ${
				disabled ? "opacity-50 cursor-default" : "cursor-pointer"
			} ${className}`}
		>
			<span className="relative inline-flex items-center">
				<input
					id={id}
					type="checkbox"
					checked={checked}
					disabled={disabled}
					onChange={(e) => onChange && onChange(e.target.checked)}
					{...props}
					className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
				/>
				<span
					className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${
						checked ? "bg-emerald-500" : "bg-slate-600"
					}`}
				>
					<span
						className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
							checked ? "translate-x-4" : "translate-x-0"
						}`}
					/>
				</span>
			</span>
			{label ? <span>{label}</span> : null}
		</label>
	);
}
