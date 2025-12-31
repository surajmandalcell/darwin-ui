"use client";

import * as React from "react";
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
	const { open } = usePopoverContext();

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

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					data-popover-content
					{...animationProps}
					transition={{ duration: 0.15, ease: "easeOut" }}
					className={cn(
						"absolute z-50 w-72 rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur-md p-4 shadow-xl",
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
