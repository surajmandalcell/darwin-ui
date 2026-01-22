"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";

interface TooltipContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	delayDuration: number;
	triggerRef: React.RefObject<HTMLElement | null>;
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
	const triggerRef = React.useRef<HTMLElement>(null);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const handleOpenChange = onOpenChange || setInternalOpen;

	return (
		<TooltipContext.Provider value={{ open, onOpenChange: handleOpenChange, delayDuration, triggerRef }}>
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
	const { onOpenChange, delayDuration, triggerRef } = useTooltipContext();
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
			ref?: React.Ref<HTMLElement>;
			onMouseEnter?: () => void;
			onMouseLeave?: () => void;
			onFocus?: () => void;
			onBlur?: () => void;
		}>, {
			ref: triggerRef,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onFocus: () => onOpenChange(true),
			onBlur: () => onOpenChange(false),
		});
	}

	return (
		<span
			ref={triggerRef as React.RefObject<HTMLSpanElement>}
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
	const { open, triggerRef } = useTooltipContext();
	const [mounted, setMounted] = React.useState(false);
	const [position, setPosition] = React.useState({ top: 0, left: 0 });

	// Ensure we only render portal on client
	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Calculate position based on trigger element
	React.useEffect(() => {
		if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			let top = 0;
			let left = 0;

			switch (side) {
				case "top":
					top = rect.top - sideOffset;
					left = align === "start" ? rect.left : align === "end" ? rect.right : rect.left + rect.width / 2;
					break;
				case "bottom":
					top = rect.bottom + sideOffset;
					left = align === "start" ? rect.left : align === "end" ? rect.right : rect.left + rect.width / 2;
					break;
				case "left":
					top = rect.top + rect.height / 2;
					left = rect.left - sideOffset;
					break;
				case "right":
					top = rect.top + rect.height / 2;
					left = rect.right + sideOffset;
					break;
			}

			setPosition({ top, left });
		}
	}, [open, side, align, sideOffset, triggerRef]);

	const getTransform = () => {
		const transforms = [];
		if (side === "top") transforms.push("translateY(-100%)");
		if (side === "left") transforms.push("translateX(-100%)", "translateY(-50%)");
		if (side === "right") transforms.push("translateY(-50%)");
		if ((side === "top" || side === "bottom") && align === "center") transforms.push("translateX(-50%)");
		if ((side === "top" || side === "bottom") && align === "end") transforms.push("translateX(-100%)");
		return transforms.join(" ");
	};

	const getAnimationProps = () => {
		// Using opacity-only animation to prevent hover detection issues
		// Y/X axis shifts can cause tooltip to move under cursor and flicker
		return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
	};

	const animationProps = getAnimationProps();

	const content = (
		<AnimatePresence>
			{open && (
				<motion.div
					role="tooltip"
					{...animationProps}
					transition={{ duration: getDuration("normal"), ease: "easeOut" }}
					className={cn(
						"fixed overflow-hidden rounded-md bg-neutral-800 px-3 py-1.5 text-xs text-white/90 shadow-lg border border-white/10",
						className
					)}
					style={{
						zIndex: 9999,
						top: position.top,
						left: position.left,
						transform: getTransform(),
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);

	// Use portal to escape stacking context
	if (!mounted) return null;
	return createPortal(content, document.body);
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
