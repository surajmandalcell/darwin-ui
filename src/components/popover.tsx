"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface PopoverContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined);

function usePopoverContext() {
	const context = React.useContext(PopoverContext);
	if (!context) {
		throw new Error("Popover components must be used within a Popover provider");
	}
	return context;
}

interface PopoverProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
}

function Popover({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: PopoverProps) {
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const triggerRef = React.useRef<HTMLButtonElement>(null);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const handleOpenChange = onOpenChange || setInternalOpen;

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (open && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
				const contentElement = document.querySelector('[data-popover-content]');
				if (contentElement && !contentElement.contains(event.target as Node)) {
					handleOpenChange(false);
				}
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				handleOpenChange(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open, handleOpenChange]);

	return (
		<PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerRef }}>
			<div className="relative inline-block">{children}</div>
		</PopoverContext.Provider>
	);
}

interface PopoverTriggerProps {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

function PopoverTrigger({ children, className, asChild }: PopoverTriggerProps) {
	const { open, onOpenChange, triggerRef } = usePopoverContext();

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<{
			ref?: React.Ref<HTMLButtonElement>;
			onClick?: () => void;
			'aria-expanded'?: boolean;
			'aria-haspopup'?: "dialog" | "menu" | "listbox" | "tree" | "grid" | true | false;
		}>, {
			ref: triggerRef,
			onClick: () => onOpenChange(!open),
			"aria-expanded": open,
			"aria-haspopup": "dialog" as const,
		});
	}

	return (
		<button
			ref={triggerRef}
			type="button"
			onClick={() => onOpenChange(!open)}
			aria-expanded={open}
			aria-haspopup="dialog"
			className={className}
		>
			{children}
		</button>
	);
}

interface PopoverContentProps {
	children: React.ReactNode;
	className?: string;
	align?: "start" | "center" | "end";
	side?: "top" | "bottom" | "left" | "right";
	sideOffset?: number;
}

function PopoverContent({
	children,
	className,
	align = "center",
	side = "bottom",
	sideOffset = 8,
}: PopoverContentProps) {
	const { open, triggerRef } = usePopoverContext();
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

	const getTransformOrigin = () => {
		switch (side) {
			case "top": return align === "start" ? "bottom left" : align === "end" ? "bottom right" : "bottom center";
			case "bottom": return align === "start" ? "top left" : align === "end" ? "top right" : "top center";
			case "left": return "right center";
			case "right": return "left center";
			default: return "top center";
		}
	};

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
		switch (side) {
			case "top":
				return { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 5 } };
			case "bottom":
				return { initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -5 } };
			case "left":
				return { initial: { opacity: 0, x: 5 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 5 } };
			case "right":
				return { initial: { opacity: 0, x: -5 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -5 } };
			default:
				return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
		}
	};

	const animationProps = getAnimationProps();

	const content = (
		<AnimatePresence>
			{open && (
				<motion.div
					data-popover-content
					{...animationProps}
					transition={{ duration: 0.15, ease: "easeOut" }}
					className={cn(
						"fixed w-72 rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur-md p-4 shadow-xl",
						className
					)}
					style={{
						zIndex: 9999,
						top: position.top,
						left: position.left,
						transform: getTransform(),
						transformOrigin: getTransformOrigin(),
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

interface PopoverCloseProps {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

function PopoverClose({ children, className, asChild }: PopoverCloseProps) {
	const { onOpenChange } = usePopoverContext();

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
			onClick: () => onOpenChange(false),
		});
	}

	return (
		<button
			type="button"
			onClick={() => onOpenChange(false)}
			className={className}
		>
			{children}
		</button>
	);
}

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
