"use client";

import { useId } from "react";
import type React from "react";
import { motion } from "framer-motion";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	boxClassName?: string;
	label?: string;
	checked?: boolean;
	indeterminate?: boolean;
	onChange?: (checked: boolean) => void;
}

export function Checkbox({
	className = "",
	boxClassName = "",
	label,
	checked,
	indeterminate = false,
	onChange,
	disabled,
	...props
}: CheckboxProps) {
	const id = useId();
	const isActive = checked || indeterminate;

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
				<motion.span
					animate={{
						backgroundColor: isActive ? "rgb(14 165 233)" : "rgb(15 23 42)",
						borderColor: isActive ? "rgb(14 165 233)" : "rgb(100 116 139)",
						scale: checked && !disabled ? 1.05 : 1,
					}}
					transition={{
						backgroundColor: { type: "spring", stiffness: 500, damping: 30 },
						borderColor: { type: "spring", stiffness: 500, damping: 30 },
						scale: { type: "spring", stiffness: 400, damping: 15 },
					}}
					className={`flex h-4 w-4 items-center justify-center rounded-sm border text-white ${boxClassName}`}
				>
					{indeterminate ? (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 25 }}
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
							transition={{
								type: "spring",
								stiffness: 500,
								damping: 25,
							}}
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
								transition={{ duration: 0.2 }}
							/>
						</motion.svg>
					)}
				</motion.span>
			</span>
			{label ? <span>{label}</span> : null}
		</label>
	);
}
