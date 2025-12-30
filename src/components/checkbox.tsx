"use client";

import { useId } from "react";
import type React from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	boxClassName?: string;
	label?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export function Checkbox({
	className = "",
	boxClassName = "",
	label,
	checked,
	onChange,
	disabled,
	...props
}: CheckboxProps) {
	const id = useId();

	return (
		<label
			htmlFor={id}
			className={`inline-flex items-center gap-2 text-[13px] text-slate-100 ${
				disabled ? "opacity-50 cursor-default" : "cursor-pointer"
			} ${className}`}
		>
			<span className="relative flex h-4 w-4 items-center justify-center">
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
					className={`flex h-4 w-4 items-center justify-center rounded-sm border text-white transition-colors ${
						checked
							? "border-sky-500 bg-sky-500"
							: "border-slate-500 bg-slate-900"
					} ${boxClassName}`}
				>
					<svg
						viewBox="0 0 16 16"
						aria-hidden="true"
						className={`h-[11px] w-[11px] transition-opacity ${
							checked ? "opacity-100" : "opacity-0"
						}`}
					>
						<polyline
							points="3.5 8.5 6.5 11.5 12.5 4.5"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</span>
			{label ? <span>{label}</span> : null}
		</label>
	);
}
