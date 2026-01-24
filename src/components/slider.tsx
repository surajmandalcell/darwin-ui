"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";

interface SliderProps {
	value?: number;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	onChange?: (value: number) => void;
	onChangeEnd?: (value: number) => void;
	size?: "sm" | "md" | "lg";
	showValue?: boolean;
	className?: string;
	/** Enable frosted glass effect on track */
	glass?: boolean;
}

function Slider({
	value: controlledValue,
	defaultValue = 0,
	min = 0,
	max = 100,
	step = 1,
	disabled = false,
	onChange,
	onChangeEnd,
	size = "md",
	showValue = false,
	className,
	glass = false,
}: SliderProps) {
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const [isDragging, setIsDragging] = React.useState(false);
	const trackRef = React.useRef<HTMLDivElement>(null);

	const value = controlledValue !== undefined ? controlledValue : internalValue;
	const percentage = ((value - min) / (max - min)) * 100;

	const sizeClasses = {
		sm: { track: "h-1", thumb: "h-3 w-3" },
		md: { track: "h-2", thumb: "h-4 w-4" },
		lg: { track: "h-3", thumb: "h-5 w-5" },
	};

	const getValueFromPosition = React.useCallback(
		(clientX: number) => {
			if (!trackRef.current) return value;

			const rect = trackRef.current.getBoundingClientRect();
			const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
			const rawValue = min + percent * (max - min);
			const steppedValue = Math.round(rawValue / step) * step;

			return Math.max(min, Math.min(max, steppedValue));
		},
		[min, max, step, value]
	);

	const handleMouseDown = React.useCallback(
		(event: React.MouseEvent) => {
			if (disabled) return;

			event.preventDefault();
			setIsDragging(true);

			const newValue = getValueFromPosition(event.clientX);
			setInternalValue(newValue);
			onChange?.(newValue);
		},
		[disabled, getValueFromPosition, onChange]
	);

	React.useEffect(() => {
		if (!isDragging) return;

		const handleMouseMove = (event: MouseEvent) => {
			const newValue = getValueFromPosition(event.clientX);
			setInternalValue(newValue);
			onChange?.(newValue);
		};

		const handleMouseUp = (event: MouseEvent) => {
			setIsDragging(false);
			const newValue = getValueFromPosition(event.clientX);
			onChangeEnd?.(newValue);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, getValueFromPosition, onChange, onChangeEnd]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent) => {
			if (disabled) return;

			let newValue = value;

			switch (event.key) {
				case "ArrowRight":
				case "ArrowUp":
					newValue = Math.min(max, value + step);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					newValue = Math.max(min, value - step);
					break;
				case "Home":
					newValue = min;
					break;
				case "End":
					newValue = max;
					break;
				default:
					return;
			}

			event.preventDefault();
			setInternalValue(newValue);
			onChange?.(newValue);
			onChangeEnd?.(newValue);
		},
		[disabled, value, min, max, step, onChange, onChangeEnd]
	);

	return (
		<div className={cn("w-full", className)}>
			<div
				ref={trackRef}
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onMouseDown={handleMouseDown}
				onKeyDown={handleKeyDown}
				className={cn(
					"relative flex w-full cursor-pointer touch-none select-none items-center",
					disabled && "cursor-not-allowed opacity-50"
				)}
			>
				{/* Track */}
				<div
					className={cn(
						"relative w-full rounded-full",
						glass
							? "bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm"
							: "bg-black/10 dark:bg-white/10",
						sizeClasses[size].track
					)}
				>
					{/* Filled track */}
					<motion.div
						className="absolute left-0 top-0 h-full rounded-full bg-blue-500"
						style={{ width: `${percentage}%` }}
						transition={{ duration: isDragging ? 0 : 0.1 }}
					/>
				</div>

				{/* Thumb */}
				<motion.div
					className={cn(
						"absolute rounded-full bg-white shadow-md ring-2 ring-blue-500/50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-shadow duration-150",
						sizeClasses[size].thumb
					)}
					style={{
						left: `calc(${percentage}% - ${parseInt(sizeClasses[size].thumb.split(" ")[0].replace("h-", "")) * 2}px)`,
					}}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					animate={{
						scale: isDragging ? 1.1 : 1,
					}}
					transition={{ duration: getDuration("normal") }}
				/>
			</div>

			{showValue && (
				<div className="mt-1 text-right text-xs text-zinc-500 dark:text-zinc-400">{value}</div>
			)}
		</div>
	);
}

export { Slider };
