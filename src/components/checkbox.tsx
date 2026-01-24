"use client";

import { useId } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { getSpring, getDuration } from "../lib/animation-config";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	boxClassName?: string;
	label?: string;
	checked?: boolean;
	indeterminate?: boolean;
	onChange?: (checked: boolean) => void;
	/** Enable frosted glass effect */
	glass?: boolean;
}

export function Checkbox({
	className = "",
	boxClassName = "",
	label,
	checked,
	indeterminate = false,
	onChange,
	disabled,
	glass = false,
	...props
}: CheckboxProps) {
	const id = useId();
	const isActive = checked || indeterminate;

	return (
		<label
			htmlFor={id}
			className={`inline-flex items-center gap-2 text-[13px] text-zinc-900 dark:text-zinc-100 ${
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
					className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-all duration-150 text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-inset ${
						isActive
							? "bg-blue-500 border-blue-500"
							: glass
								? "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border-white/30 dark:border-white/10"
								: "bg-white dark:bg-zinc-800 border-black/20 dark:border-zinc-600"
					} ${boxClassName}`}
				>
					{indeterminate ? (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={getSpring("snappy")}
							className="w-2 h-0.5 bg-white rounded"
						/>
					) : (
						<motion.svg
							viewBox="0 0 16 16"
							aria-hidden="true"
							className="h-[11px] w-[11px]"
							initial={false}
							animate={{
								opacity: checked ? 1 : 0,
								scale: checked ? 1 : 0.5,
							}}
							transition={getSpring("snappy")}
						>
							<motion.polyline
								points="3.5 8.5 6.5 11.5 12.5 4.5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
								strokeLinejoin="round"
								initial={{ pathLength: 0 }}
								animate={{ pathLength: checked ? 1 : 0 }}
								transition={{ duration: getDuration("slow") }}
							/>
						</motion.svg>
					)}
				</span>
			</span>
			{label ? <span>{label}</span> : null}
		</label>
	);
}
