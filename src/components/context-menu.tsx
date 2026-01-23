"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";

// ============================================================================
// Types
// ============================================================================

export interface ContextMenuItem {
	label: string;
	onClick: () => void;
	shortcut?: string;
	disabled?: boolean;
	separator?: boolean;
}

interface ContextMenuContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	position: { x: number; y: number };
	setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuContext = React.createContext<
	ContextMenuContextValue | undefined
>(undefined);

function useContextMenuContext() {
	const context = React.useContext(ContextMenuContext);
	if (!context) {
		throw new Error(
			"ContextMenu components must be used within a ContextMenu provider",
		);
	}
	return context;
}

// ============================================================================
// Context Menu Root
// ============================================================================

interface ContextMenuRootProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

function ContextMenuRoot({
	children,
	open: controlledOpen,
	onOpenChange,
}: ContextMenuRootProps) {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const [position, setPosition] = React.useState({ x: 0, y: 0 });

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const handleOpenChange = onOpenChange || setInternalOpen;

	// Handle click outside and escape
	React.useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const contentElement = document.querySelector(
				"[data-context-menu-content]",
			);
			if (contentElement && !contentElement.contains(event.target as Node)) {
				handleOpenChange(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleOpenChange(false);
			}
		};

		const handleScroll = () => {
			handleOpenChange(false);
		};

		// Small delay to avoid immediately closing on the same click
		const timeoutId = setTimeout(() => {
			document.addEventListener("mousedown", handleClickOutside);
		}, 0);

		document.addEventListener("keydown", handleEscape);
		document.addEventListener("scroll", handleScroll, true);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("scroll", handleScroll, true);
		};
	}, [open, handleOpenChange]);

	return (
		<ContextMenuContext.Provider
			value={{ open, onOpenChange: handleOpenChange, position, setPosition }}
		>
			{children}
		</ContextMenuContext.Provider>
	);
}

// ============================================================================
// Context Menu Trigger
// ============================================================================

interface ContextMenuTriggerProps {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

function ContextMenuTrigger({
	children,
	className,
	asChild,
}: ContextMenuTriggerProps) {
	const { onOpenChange, setPosition } = useContextMenuContext();

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		// Calculate position with viewport bounds checking
		const x = Math.min(event.clientX, window.innerWidth - 200);
		const y = Math.min(event.clientY, window.innerHeight - 200);

		setPosition({ x, y });
		onOpenChange(true);
	};

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(
			children as React.ReactElement<{
				onContextMenu?: (e: React.MouseEvent) => void;
				className?: string;
			}>,
			{
				onContextMenu: handleContextMenu,
			},
		);
	}

	return (
		<div onContextMenu={handleContextMenu} className={className}>
			{children}
		</div>
	);
}

// ============================================================================
// Context Menu Content
// ============================================================================

interface ContextMenuContentProps {
	children: React.ReactNode;
	className?: string;
}

function ContextMenuContent({ children, className }: ContextMenuContentProps) {
	const { open, position } = useContextMenuContext();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const content = (
		<AnimatePresence>
			{open && (
				<motion.div
					data-context-menu-content
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: getDuration("normal"), ease: "easeOut" }}
					role="menu"
					aria-orientation="vertical"
					className={cn(
						"fixed min-w-[180px] overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-1 shadow-xl",
						className,
					)}
					style={{
						zIndex: 9999,
						top: position.y,
						left: position.x,
						transformOrigin: "top left",
					}}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);

	if (!mounted) return null;
	return createPortal(content, document.body);
}

// ============================================================================
// Context Menu Item
// ============================================================================

interface ContextMenuItemProps {
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	onSelect?: () => void;
	destructive?: boolean;
}

function ContextMenuItem({
	children,
	className,
	disabled,
	onSelect,
	destructive,
}: ContextMenuItemProps) {
	const { onOpenChange } = useContextMenuContext();

	const handleClick = () => {
		if (disabled) return;
		onSelect?.();
		onOpenChange(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};

	return (
		<button
			type="button"
			role="menuitem"
			disabled={disabled}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className={cn(
				"flex w-full items-center rounded-md px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 outline-none transition-colors hover:bg-black/10 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-zinc-100 focus:bg-white/10 dark:focus:bg-black/10",
				disabled && "pointer-events-none opacity-50",
				destructive &&
					"text-red-500 hover:text-red-500 hover:bg-red-500/10 focus:bg-red-500/10",
				className,
			)}
		>
			{children}
		</button>
	);
}

// ============================================================================
// Context Menu Checkbox Item
// ============================================================================

interface ContextMenuCheckboxItemProps {
	children: React.ReactNode;
	className?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}

function ContextMenuCheckboxItem({
	children,
	className,
	checked,
	onCheckedChange,
	disabled,
}: ContextMenuCheckboxItemProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onCheckedChange?.(!checked);
		}
	};

	return (
		<button
			type="button"
			role="menuitemcheckbox"
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onCheckedChange?.(!checked)}
			onKeyDown={handleKeyDown}
			className={cn(
				"flex w-full items-center rounded-md px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 outline-none transition-colors hover:bg-black/10 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-zinc-100 focus:bg-white/10 dark:focus:bg-black/10",
				disabled && "pointer-events-none opacity-50",
				className,
			)}
		>
			<span className="mr-2 flex h-4 w-4 items-center justify-center">
				{checked && <Check className="h-3 w-3" />}
			</span>
			{children}
		</button>
	);
}

// ============================================================================
// Context Menu Label
// ============================================================================

interface ContextMenuLabelProps {
	children: React.ReactNode;
	className?: string;
}

function ContextMenuLabel({ children, className }: ContextMenuLabelProps) {
	return (
		<div
			className={cn(
				"px-2 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500",
				className,
			)}
		>
			{children}
		</div>
	);
}

// ============================================================================
// Context Menu Separator
// ============================================================================

interface ContextMenuSeparatorProps {
	className?: string;
}

function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
	return (
		<div
			className={cn("-mx-1 my-1 h-px bg-black/10 dark:bg-white/10", className)}
		/>
	);
}

// ============================================================================
// Context Menu Shortcut
// ============================================================================

interface ContextMenuShortcutProps {
	children: React.ReactNode;
	className?: string;
}

function ContextMenuShortcut({
	children,
	className,
}: ContextMenuShortcutProps) {
	return (
		<span
			className={cn(
				"ml-auto text-xs tracking-widest text-zinc-400 dark:text-zinc-600",
				className,
			)}
		>
			{children}
		</span>
	);
}

// ============================================================================
// Legacy API: fromItems helper
// ============================================================================

interface LegacyContextMenuProps {
	children: React.ReactNode;
	items: ContextMenuItem[];
	className?: string;
}

function LegacyContextMenu({
	children,
	items,
	className,
}: LegacyContextMenuProps) {
	return (
		<ContextMenuRoot>
			<ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				{items.map((item, index) => (
					<React.Fragment key={index}>
						{item.separator && <ContextMenuSeparator />}
						<ContextMenuItem
							disabled={item.disabled}
							onSelect={item.onClick}
						>
							<span>{item.label}</span>
							{item.shortcut && (
								<ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
							)}
						</ContextMenuItem>
					</React.Fragment>
				))}
			</ContextMenuContent>
		</ContextMenuRoot>
	);
}

// ============================================================================
// Compound Export
// ============================================================================

type ContextMenuComponent = typeof ContextMenuRoot & {
	Trigger: typeof ContextMenuTrigger;
	Content: typeof ContextMenuContent;
	Item: typeof ContextMenuItem;
	CheckboxItem: typeof ContextMenuCheckboxItem;
	Label: typeof ContextMenuLabel;
	Separator: typeof ContextMenuSeparator;
	Shortcut: typeof ContextMenuShortcut;
	fromItems: typeof LegacyContextMenu;
};

const ContextMenu = ContextMenuRoot as ContextMenuComponent;
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.CheckboxItem = ContextMenuCheckboxItem;
ContextMenu.Label = ContextMenuLabel;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Shortcut = ContextMenuShortcut;
ContextMenu.fromItems = LegacyContextMenu;

export { ContextMenu };
export default ContextMenu;
