"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";

interface DropdownMenuContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | undefined>(undefined);

function useDropdownMenuContext() {
	const context = React.useContext(DropdownMenuContext);
	if (!context) {
		throw new Error("DropdownMenu components must be used within a DropdownMenu provider");
	}
	return context;
}

interface DropdownMenuProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const triggerRef = React.useRef<HTMLButtonElement>(null);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const handleOpenChange = onOpenChange || setInternalOpen;

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (open && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
				handleOpenChange(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				handleOpenChange(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open, handleOpenChange]);

	return (
		<DropdownMenuContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerRef }}>
			<div className="relative inline-block">{children}</div>
		</DropdownMenuContext.Provider>
	);
}

interface DropdownMenuTriggerProps {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

function DropdownMenuTrigger({ children, className, asChild }: DropdownMenuTriggerProps) {
	const { open, onOpenChange, triggerRef } = useDropdownMenuContext();

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<{
			ref?: React.Ref<HTMLButtonElement>;
			onClick?: () => void;
			'aria-expanded'?: boolean;
			'aria-haspopup'?: boolean;
		}>, {
			ref: triggerRef,
			onClick: () => onOpenChange(!open),
			"aria-expanded": open,
			"aria-haspopup": true,
		});
	}

	return (
		<button
			ref={triggerRef}
			type="button"
			onClick={() => onOpenChange(!open)}
			aria-expanded={open}
			aria-haspopup="true"
			className={className}
		>
			{children}
		</button>
	);
}

interface DropdownMenuContentProps {
	children: React.ReactNode;
	className?: string;
	align?: "start" | "center" | "end";
	side?: "top" | "bottom";
	sideOffset?: number;
}

function DropdownMenuContent({
	children,
	className,
	align = "start",
	side = "bottom",
	sideOffset = 4,
}: DropdownMenuContentProps) {
	const { open, triggerRef } = useDropdownMenuContext();
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

			if (side === "bottom") {
				top = rect.bottom + sideOffset;
			} else {
				top = rect.top - sideOffset;
			}

			if (align === "start") {
				left = rect.left;
			} else if (align === "center") {
				left = rect.left + rect.width / 2;
			} else {
				left = rect.right;
			}

			setPosition({ top, left });
		}
	}, [open, side, align, sideOffset, triggerRef]);

	const getTransform = () => {
		const transforms = [];
		if (side === "top") transforms.push("translateY(-100%)");
		if (align === "center") transforms.push("translateX(-50%)");
		if (align === "end") transforms.push("translateX(-100%)");
		return transforms.join(" ") || undefined;
	};

	const content = (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: side === "bottom" ? -5 : 5 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: side === "bottom" ? -5 : 5 }}
					transition={{ duration: getDuration("normal"), ease: "easeOut" }}
					role="menu"
					aria-orientation="vertical"
					className={cn(
						"fixed min-w-[180px] overflow-hidden rounded-lg border border-[hsl(var(--border-default))] bg-[hsl(var(--overlay-bg))] backdrop-blur-md p-1 shadow-xl",
						className
					)}
					style={{
						zIndex: 9999,
						top: position.top,
						left: position.left,
						transform: getTransform(),
						transformOrigin: side === "top" ? "bottom" : "top",
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

interface DropdownMenuItemProps {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	onSelect?: () => void;
	destructive?: boolean;
}

function DropdownMenuItem({
	children,
	className,
	disabled,
	onSelect,
	destructive,
}: DropdownMenuItemProps) {
	const { onOpenChange } = useDropdownMenuContext();

	const handleClick = () => {
		if (disabled) return;
		onSelect?.();
		onOpenChange(false);
	};

	return (
		<button
			type="button"
			role="menuitem"
			disabled={disabled}
			onClick={handleClick}
			className={cn(
				"flex w-full items-center rounded-md px-2 py-1.5 text-sm text-[hsl(var(--text-secondary))] outline-none transition-colors hover:bg-[hsl(var(--glass-bg-hover))] focus:bg-[hsl(var(--glass-bg-hover))]",
				disabled && "pointer-events-none opacity-50",
				destructive && "text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10",
				className
			)}
		>
			{children}
		</button>
	);
}

interface DropdownMenuCheckboxItemProps {
	children: React.ReactNode;
	className?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}

function DropdownMenuCheckboxItem({
	children,
	className,
	checked,
	onCheckedChange,
	disabled,
}: DropdownMenuCheckboxItemProps) {
	return (
		<button
			type="button"
			role="menuitemcheckbox"
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onCheckedChange?.(!checked)}
			className={cn(
				"flex w-full items-center rounded-md px-2 py-1.5 text-sm text-[hsl(var(--text-secondary))] outline-none transition-colors hover:bg-[hsl(var(--glass-bg-hover))] focus:bg-[hsl(var(--glass-bg-hover))]",
				disabled && "pointer-events-none opacity-50",
				className
			)}
		>
			<span className="mr-2 flex h-4 w-4 items-center justify-center">
				{checked && <Check className="h-3 w-3" />}
			</span>
			{children}
		</button>
	);
}

interface DropdownMenuLabelProps {
	children: React.ReactNode;
	className?: string;
}

function DropdownMenuLabel({ children, className }: DropdownMenuLabelProps) {
	return (
		<div className={cn("px-2 py-1.5 text-xs font-semibold text-[hsl(var(--text-tertiary))]", className)}>
			{children}
		</div>
	);
}

interface DropdownMenuSeparatorProps {
	className?: string;
}

function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps) {
	return <div className={cn("-mx-1 my-1 h-px bg-[hsl(var(--border-default))]", className)} />;
}

interface DropdownMenuShortcutProps {
	children: React.ReactNode;
	className?: string;
}

function DropdownMenuShortcut({ children, className }: DropdownMenuShortcutProps) {
	return (
		<span className={cn("ml-auto text-xs tracking-widest text-[hsl(var(--text-muted))]", className)}>
			{children}
		</span>
	);
}

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
};
