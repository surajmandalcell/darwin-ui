"use client";

import { ChevronsLeft, LogOut, Menu, X } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getDuration, getSpring } from "../lib/animation-config";
import { Tooltip, TooltipTrigger, TooltipContent } from "./floating";

interface SidebarItemProps {
	label: string;
	onClick: () => void;
	active?: boolean;
	icon?: React.ComponentType<{ className?: string }>;
	isCollapsed?: boolean;
}

function SidebarItem({
	label,
	onClick,
	active,
	icon: Icon,
	isCollapsed,
}: SidebarItemProps) {
	const buttonContent = (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group flex w-full items-center rounded-[var(--radius-lg,0.75rem)] text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
				isCollapsed
					? "justify-center aspect-square p-0"
					: "gap-3 px-3 py-2",
				active
					? "bg-blue-500 text-white shadow-sm shadow-blue-500/25"
					: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-zinc-100",
			)}
		>
			{Icon ? (
				<Icon
					className={cn(
						"shrink-0 transition-colors",
						isCollapsed ? "h-5 w-5" : "h-4 w-4",
						active ? "text-white" : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200",
					)}
				/>
			) : null}
			<AnimatePresence mode="wait">
				{!isCollapsed && (
					<motion.span
						initial={{ opacity: 0, width: 0 }}
						animate={{ opacity: 1, width: "auto" }}
						exit={{ opacity: 0, width: 0 }}
						transition={{ duration: getDuration("normal") }}
						className="whitespace-nowrap overflow-hidden"
					>
						{label}
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	);

	// Wrap with tooltip only when collapsed
	if (isCollapsed) {
		return (
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
				<TooltipContent side="right" sideOffset={12} className="font-medium">
					{label}
				</TooltipContent>
			</Tooltip>
		);
	}

	return buttonContent;
}

interface SidebarProps {
	items: {
		label: string;
		onClick: () => void;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	activeItem: string;
	onLogout: () => void;
	/** Controlled collapsed state */
	collapsed?: boolean;
	/** Default collapsed state for uncontrolled mode */
	defaultCollapsed?: boolean;
	/** Callback when collapsed state changes */
	onCollapsedChange?: (collapsed: boolean) => void;
	/** Whether to show the collapse toggle button. Auto-enabled if collapsed props are provided */
	collapsible?: boolean;
	/** Enable frosted glass effect on desktop sidebar */
	glass?: boolean;
}

export function Sidebar({
	items,
	activeItem,
	onLogout,
	collapsed,
	defaultCollapsed = false,
	onCollapsedChange,
	collapsible,
	glass = false,
}: SidebarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const [internalCollapsed, setInternalCollapsed] =
		React.useState(defaultCollapsed);

	// Determine if controlled or uncontrolled
	const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
	const handleCollapsedChange = onCollapsedChange ?? setInternalCollapsed;

	// Auto-enable collapsible if any collapse prop is provided
	const isCollapsible =
		collapsible ??
		(collapsed !== undefined ||
			onCollapsedChange !== undefined ||
			defaultCollapsed === true);

	// Explicitly filter out Settings to handle it separately
	const topItems = items.filter((item) => item.label !== "Settings");
	const settingsItem = items.find((item) => item.label === "Settings");

	const closeMobileMenu = () => setMobileMenuOpen(false);

	const handleItemClick = (onClick: () => void) => {
		onClick();
		closeMobileMenu();
	};

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				type="button"
				onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				className="fixed right-2 top-2 z-50 bg-black/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-full md:hidden border border-black/10 dark:border-white/10 transition-colors hover:bg-black/15 dark:hover:bg-white/15"
				aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
			>
				{mobileMenuOpen ? (
					<X className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
				) : (
					<Menu className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
				)}
			</button>

			{/* Mobile Overlay */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-30 bg-black/30 dark:bg-black/50 backdrop-blur-sm md:hidden"
						onClick={closeMobileMenu}
						role="button"
						tabIndex={0}
						aria-label="Close menu"
					/>
				)}
			</AnimatePresence>

			{/* Mobile Sidebar */}
			<motion.div
				initial={{ x: "-100%" }}
				animate={{ x: mobileMenuOpen ? 0 : "-100%" }}
				transition={getSpring("smooth")}
				className="fixed left-0 top-0 z-40 h-full w-64 border-r border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 p-4 pt-20 shadow-lg backdrop-blur-md md:hidden"
			>
				<div className="flex h-full flex-col">
					<div className="space-y-1">
						{topItems.map((item) => (
							<SidebarItem
								key={item.label}
								label={item.label}
								onClick={() => handleItemClick(item.onClick)}
								icon={item.icon}
								active={activeItem === item.label}
							/>
						))}
					</div>

					<div className="mt-auto space-y-1 border-t border-black/10 dark:border-white/10 pt-4">
						{settingsItem && (
							<SidebarItem
								key={settingsItem.label}
								label={settingsItem.label}
								onClick={() => handleItemClick(settingsItem.onClick)}
								icon={settingsItem.icon}
								active={activeItem === settingsItem.label}
							/>
						)}
						<SidebarItem
							label="Logout"
							onClick={() => handleItemClick(onLogout)}
							icon={LogOut}
						/>
					</div>
				</div>
			</motion.div>

			{/* Desktop Sidebar */}
			<motion.div
				animate={{ width: isCollapsed ? 56 : 200 }}
				transition={getSpring("smooth")}
				className={cn(
					"hidden h-full shrink-0 flex-col md:flex",
					isCollapsed ? "p-2" : "p-3",
					glass && "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-r border-white/20 dark:border-white/10"
				)}
			>
				<div className={cn("flex-1", isCollapsed ? "space-y-1" : "space-y-1")}>
					{topItems.map((item) => (
						<SidebarItem
							key={item.label}
							label={item.label}
							onClick={item.onClick}
							icon={item.icon}
							active={activeItem === item.label}
							isCollapsed={isCollapsed}
						/>
					))}
				</div>

				<div className={cn(
					"mt-auto space-y-1 pt-3",
					isCollapsed
						? "border-t border-zinc-200 dark:border-white/10"
						: "border-t border-zinc-200 dark:border-white/10"
				)}>
					{/* Collapse toggle button */}
					{isCollapsible && (
						<Tooltip delayDuration={0}>
							<TooltipTrigger asChild>
								<button
									type="button"
									onClick={() => handleCollapsedChange(!isCollapsed)}
									aria-expanded={!isCollapsed}
									aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
									className={cn(
										"group flex w-full items-center rounded-[var(--radius-lg,0.75rem)] text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-all duration-200 ease-out hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-700 dark:hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
										isCollapsed ? "justify-center aspect-square p-0" : "gap-3 px-3 py-2",
									)}
								>
									<motion.div
										animate={{ rotate: isCollapsed ? 180 : 0 }}
										transition={{ duration: getDuration("slow"), ease: "easeInOut" }}
									>
										<ChevronsLeft className={cn(isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
									</motion.div>
									<AnimatePresence mode="wait">
										{!isCollapsed && (
											<motion.span
												initial={{ opacity: 0, width: 0 }}
												animate={{ opacity: 1, width: "auto" }}
												exit={{ opacity: 0, width: 0 }}
												transition={{ duration: getDuration("normal") }}
												className="whitespace-nowrap overflow-hidden"
											>
												Collapse
											</motion.span>
										)}
									</AnimatePresence>
								</button>
							</TooltipTrigger>
							{isCollapsed && (
								<TooltipContent side="right" sideOffset={12} className="font-medium">
									Expand
								</TooltipContent>
							)}
						</Tooltip>
					)}

					{settingsItem && (
						<SidebarItem
							key={settingsItem.label}
							label={settingsItem.label}
							onClick={settingsItem.onClick}
							icon={settingsItem.icon}
							active={activeItem === settingsItem.label}
							isCollapsed={isCollapsed}
						/>
					)}
					<SidebarItem
						label="Logout"
						onClick={onLogout}
						icon={LogOut}
						isCollapsed={isCollapsed}
					/>
				</div>
			</motion.div>
		</>
	);
}
