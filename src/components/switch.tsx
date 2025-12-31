"use client";

import { useId } from "react";
import type React from "react";
import { motion } from "framer-motion";

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
				<motion.span
					animate={{
						backgroundColor: checked ? "rgb(16 185 129)" : "rgb(71 85 105)",
					}}
					transition={{ duration: 0.2 }}
					className="flex h-5 w-9 items-center rounded-full px-0.5"
				>
					<motion.span
						animate={{
							x: checked ? 16 : 0,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 15,
						}}
						className="h-4 w-4 rounded-full bg-white shadow-sm"
					/>
				</motion.span>
			</span>
			{label ? <span>{label}</span> : null}
		</label>
	);
}
