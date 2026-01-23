"use client";

import { useId } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { getSpring } from "../lib/animation-config";

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
			className={`inline-flex items-center gap-2 text-[13px] text-zinc-900 dark:text-zinc-100 ${
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
					className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 ${
						checked
							? "bg-emerald-500"
							: "bg-zinc-600"
					}`}
				>
					<motion.span
						animate={{
							x: checked ? 16 : 0,
						}}
						transition={getSpring("snappy")}
						className="h-4 w-4 rounded-full bg-white shadow-sm"
					/>
				</span>
			</span>
			{label ? <span>{label}</span> : null}
		</label>
	);
}
