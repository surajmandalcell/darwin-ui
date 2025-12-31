"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface TooltipContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	delayDuration: number;
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

function useTooltipContext() {
	const context = React.useContext(TooltipContext);
	if (!context) {
		throw new Error("Tooltip components must be used within a Tooltip provider");
	}
	return context;
}

interface TooltipProviderProps {
	children: React.ReactNode;
	delayDuration?: number;
}

function TooltipProvider({ children }: TooltipProviderProps) {
	return <>{children}</>;
}

interface TooltipProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	delayDuration?: number;
}

function Tooltip({
	children,
	open: controlledOpen,
	onOpenChange,
	defaultOpen = false,
	delayDuration = 300,
}: TooltipProps) {
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const handleOpenChange = onOpenChange || setInternalOpen;

	return (
		<TooltipContext.Provider value={{ open, onOpenChange: handleOpenChange, delayDuration }}>
			<div className="relative inline-flex">{children}</div>
		</TooltipContext.Provider>
	);
}

interface TooltipTriggerProps {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

function TooltipTrigger({ children, className, asChild }: TooltipTriggerProps) {
	const { onOpenChange, delayDuration } = useTooltipContext();
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const handleMouseEnter = () => {
		timeoutRef.current = setTimeout(() => {
			onOpenChange(true);
		}, delayDuration);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		onOpenChange(false);
	};

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<{
			onMouseEnter?: () => void;
			onMouseLeave?: () => void;
			onFocus?: () => void;
			onBlur?: () => void;
		}>, {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onFocus: () => onOpenChange(true),
			onBlur: () => onOpenChange(false),
		});
	}

	return (
		<span
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={() => onOpenChange(true)}
			onBlur={() => onOpenChange(false)}
			className={className}
		>
			{children}
		</span>
	);
}

interface TooltipContentProps {
	children: React.ReactNode;
	className?: string;
	side?: "top" | "bottom" | "left" | "right";
	sideOffset?: number;
	align?: "start" | "center" | "end";
}

function TooltipContent({
	children,
	className,
	side = "top",
	sideOffset = 6,
	align = "center",
}: TooltipContentProps) {
	const { open } = useTooltipContext();

	const alignClasses = {
		start: "left-0",
		center: "left-1/2 -translate-x-1/2",
		end: "right-0",
	};

	const sideStyles: Record<string, React.CSSProperties> = {
		top: { bottom: "100%", marginBottom: sideOffset },
		bottom: { top: "100%", marginTop: sideOffset },
		left: { right: "100%", marginRight: sideOffset, top: "50%", transform: "translateY(-50%)" },
		right: { left: "100%", marginLeft: sideOffset, top: "50%", transform: "translateY(-50%)" },
	};

	const getAnimationProps = () => {
		switch (side) {
			case "top":
				return { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 4 } };
			case "bottom":
				return { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } };
			case "left":
				return { initial: { opacity: 0, x: 4 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 4 } };
			case "right":
				return { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -4 } };
			default:
				return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
		}
	};

	const animationProps = getAnimationProps();

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					role="tooltip"
					{...animationProps}
					transition={{ duration: 0.15, ease: "easeOut" }}
					className={cn(
						"absolute z-50 overflow-hidden rounded-md bg-neutral-800 px-3 py-1.5 text-xs text-white/90 shadow-lg border border-white/10",
						side === "top" || side === "bottom" ? alignClasses[align] : "",
						className
					)}
					style={sideStyles[side]}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
