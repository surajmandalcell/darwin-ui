"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// Framework-agnostic pathname hook
const usePathname = () => {
	const [pathname, setPathname] = useState(
		typeof window !== "undefined" ? window.location.pathname : "/"
	);

	useEffect(() => {
		const handleLocationChange = () => {
			setPathname(window.location.pathname);
		};

		// Listen to popstate for browser back/forward
		window.addEventListener("popstate", handleLocationChange);

		// For SPAs using pushState/replaceState
		const originalPushState = window.history.pushState;
		const originalReplaceState = window.history.replaceState;

		window.history.pushState = function(...args) {
			originalPushState.apply(this, args);
			handleLocationChange();
		};

		window.history.replaceState = function(...args) {
			originalReplaceState.apply(this, args);
			handleLocationChange();
		};

		return () => {
			window.removeEventListener("popstate", handleLocationChange);
			window.history.pushState = originalPushState;
			window.history.replaceState = originalReplaceState;
		};
	}, []);

	return pathname;
};

export interface ContextMenuItem {
	label: string;
	onClick: () => void;
	shortcut?: string;
	disabled?: boolean;
	separator?: boolean;
}

interface ContextMenuProps {
	children: React.ReactNode;
	items: ContextMenuItem[];
	className?: string;
	trigger?: "contextmenu" | "click";
}

const MENU_CONFIG = {
	WIDTH: 200,
	ITEM_HEIGHT: 32,
	PADDING: 16,
	OFFSET: 10,
};

const MENU_STYLES = {
	base: "text-white bg-neutral-900/50 backdrop-blur-md shadow-md border border-white/10",
	contextMenu: "fixed z-50 min-w-32 text-sm p-1 w-fit rounded-[6px]",
	clickMenu:
		"absolute left-0 top-full z-50 min-w-32 w-56 text-sm p-1 rounded-[6px] transition-all duration-150 ease-out",
	menuItem:
		"w-full text-left px-1.5 py-1 transition-all duration-150 ease-out flex items-center justify-between rounded-[4px] truncate cursor-pointer whitespace-nowrap text-white/90",
	menuItemDisabled: "text-white/40 cursor-not-allowed",
	menuItemEnabled: "hover:bg-blue-600 focus:outline-hidden focus:ring-0",
};

const useMenuPosition = () => {
	return useCallback((clientX: number, clientY: number, itemCount: number) => {
		const menuHeight =
			itemCount * MENU_CONFIG.ITEM_HEIGHT + MENU_CONFIG.PADDING;
		let x = clientX;
		let y = clientY;

		if (x + MENU_CONFIG.WIDTH > window.innerWidth) {
			x = window.innerWidth - MENU_CONFIG.WIDTH - MENU_CONFIG.OFFSET;
		}
		if (y + menuHeight > window.innerHeight) {
			y = window.innerHeight - menuHeight - MENU_CONFIG.OFFSET;
		}

		return { x, y };
	}, []);
};

const useClickOutside = (isOpen: boolean, onClose: () => void) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleMouseDown = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("scroll", onClose);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("scroll", onClose);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	return ref;
};

const MenuItems: React.FC<{
	items: ContextMenuItem[];
	onItemClick: (item: ContextMenuItem) => void;
}> = ({ items, onItemClick }) => (
	<div className="py-1">
		{items.map((item, index) => (
			<React.Fragment key={index}>
				{item.separator && <div className="my-1 h-px bg-white/20" />}
				<button
					onClick={() => onItemClick(item)}
					disabled={item.disabled}
					className={twMerge(
						MENU_STYLES.menuItem,
						item.disabled
							? MENU_STYLES.menuItemDisabled
							: MENU_STYLES.menuItemEnabled,
					)}
				>
					<span>{item.label}</span>
					{item.shortcut && (
						<span className="ml-auto text-xs tracking-widest text-white/60">
							{item.shortcut}
						</span>
					)}
				</button>
			</React.Fragment>
		))}
	</div>
);

export function ContextMenu({
	children,
	items,
	className = "",
	trigger = "contextmenu",
}: ContextMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const getMenuPosition = useMenuPosition();
	const menuRef = useClickOutside(isOpen, () => setIsOpen(false));

	const handleContextMenu = useCallback(
		(event: React.MouseEvent) => {
			if (trigger !== "contextmenu") return;
			event.preventDefault();
			event.stopPropagation();

			const newPosition = getMenuPosition(
				event.clientX,
				event.clientY,
				items.length,
			);
			setPosition(newPosition);
			setIsOpen(true);
		},
		[trigger, getMenuPosition, items.length],
	);

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			if (trigger !== "click") return;
			event.preventDefault();
			event.stopPropagation();
			setIsOpen((prev) => !prev);
		},
		[trigger],
	);

	const handleItemClick = useCallback((item: ContextMenuItem) => {
		if (!item.disabled) {
			item.onClick();
			setIsOpen(false);
		}
	}, []);

	const containerClasses = twMerge(
		"flex flex-row items-center gap-[8px] hover:cursor-pointer text-sm transition-colors duration-150 rounded text-foreground/90 hover:text-primary hover:bg-foreground/5",
		className,
		trigger === "click" ? "relative py-2 px-4" : "",
	);

	return (
		<>
			<div
				ref={containerRef}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
				className={containerClasses}
			>
				{children}
			</div>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-40"
						style={{ backgroundColor: "transparent" }}
					/>

					<div
						ref={menuRef}
						className={twMerge(
							MENU_STYLES.base,
							trigger === "contextmenu"
								? MENU_STYLES.contextMenu
								: MENU_STYLES.clickMenu,
							trigger === "click" &&
								(isOpen
									? "opacity-100 translate-y-1 pointer-events-auto"
									: "opacity-0 -translate-y-1 pointer-events-none"),
						)}
						style={
							trigger === "contextmenu"
								? { left: position.x, top: position.y }
								: undefined
						}
					>
						<MenuItems items={items} onItemClick={handleItemClick} />
					</div>
				</>
			)}
		</>
	);
}

export function ContextMenuFlat({
	children,
	items,
	className = "",
	trigger = "click",
}: {
	children: React.ReactNode;
	items: ContextMenuItem[];
	className?: string;
	trigger?: "contextmenu" | "click";
}) {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const closeMenu = useCallback(() => setOpen(false), []);

	useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				closeMenu();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeMenu();
		};

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [closeMenu]);

	const isActive = useCallback(
		(href: string) => {
			const base = href.split("#")[0] || "/";
			return base === "/"
				? pathname === "/"
				: pathname === base || pathname.startsWith(base + "/");
		},
		[pathname],
	);

	const handleTrigger = useCallback(
		(e: React.MouseEvent, triggerType: string) => {
			if (trigger !== triggerType) return;
			e.preventDefault();
			e.stopPropagation();
			setOpen((prev) => !prev);
		},
		[trigger],
	);

	const handleBlur = useCallback(
		(e: React.FocusEvent) => {
			const next = e.relatedTarget as Node | null;
			if (!(next && containerRef.current?.contains(next))) {
				closeMenu();
			}
		},
		[closeMenu],
	);

	return (
		<div
			ref={containerRef}
			className={`relative inline-block ${className}`}
			onContextMenu={(e) => handleTrigger(e, "contextmenu")}
			onBlur={handleBlur}
		>
			<button
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				className={twMerge(
					"text-sm text-foreground/90 hover:text-primary hover:bg-foreground/5 transition-colors duration-150 inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30",
					trigger === "click" ? "px-4 py-2" : "",
				)}
				onClick={(e) => handleTrigger(e, "click")}
			>
				{children}
			</button>

			<div
				role="menu"
				className={twMerge(
					"absolute left-0 top-full z-60 w-56 rounded-md bg-background/95 p-1 shadow-lg backdrop-blur transition-all duration-150 ease-out hover:cursor-pointer",
					open
						? "opacity-100 translate-y-1 pointer-events-auto"
						: "opacity-0 -translate-y-1 pointer-events-none",
				)}
				style={{ boxShadow: "0px 4px 12px 4px #cccccc14" }}
			>
				<nav className="flex flex-col items-start">
					{items.map((item, index) => {
						const href = (item as unknown as { href?: string })?.href;
						const active = href ? isActive(href) : false;
						const disabled = item.disabled;

						const handleItemClick = () => {
							if (!disabled) {
								item.onClick?.();
								closeMenu();
							}
						};

						const itemClasses = twMerge(
							"w-full text-left rounded px-2 py-1.5 text-sm transition-colors duration-150 whitespace-nowrap flex items-center justify-between",
							disabled
								? "text-foreground/40 cursor-not-allowed"
								: active
									? "font-medium text-primary/70 bg-foreground/5"
									: "text-foreground/90 hover:bg-foreground/5 hover:text-primary",
						);

						return (
							<button
								key={index}
								type="button"
								role="menuitem"
								onClick={handleItemClick}
								disabled={disabled}
								className={itemClasses}
							>
								<span>{item.label}</span>
								{item.shortcut && (
									<span className="ml-auto text-xs tracking-widest text-foreground/60">
										{item.shortcut}
									</span>
								)}
							</button>
						);
					})}
				</nav>
			</div>
		</div>
	);
}

export default ContextMenu;
