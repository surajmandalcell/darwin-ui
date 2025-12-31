"use client";

import { LogOut, Menu, X } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItemProps {
	label: string;
	onClick: () => void;
	active?: boolean;
	icon?: React.ComponentType<{ className?: string }>;
}

function SidebarItem({ label, onClick, active, icon: Icon }: SidebarItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50",
				active
					? "bg-blue-600 text-white shadow-sm"
					: "text-white/60 hover:bg-white/5 hover:text-white",
			)}
		>
			{Icon ? (
				<Icon
					className={cn(
						"h-4 w-4 shrink-0 transition-colors",
						active ? "text-white" : "text-white/60 group-hover:text-white",
					)}
				/>
			) : null}
			<span>{label}</span>
		</button>
	);
}

interface SidebarProps {
	items: {
		label: string;
		onClick: () => void;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	activeItem: string;
	onLogout: () => void;
}

export function Sidebar({ items, activeItem, onLogout }: SidebarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
				className="fixed right-2 top-2 z-50 bg-white/10 backdrop-blur-md p-2 rounded-full md:hidden border border-white/10 transition-colors hover:bg-white/20"
				aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
			>
				{mobileMenuOpen ? (
					<X className="h-5 w-5 text-white" />
				) : (
					<Menu className="h-5 w-5 text-white" />
				)}
			</button>

			{/* Mobile Overlay */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
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
				transition={{ type: "spring", damping: 25, stiffness: 200 }}
				className="fixed left-0 top-0 z-40 h-full w-64 border-r border-white/10 bg-neutral-950/95 p-4 pt-20 shadow-lg backdrop-blur-md md:hidden"
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

					<div className="mt-auto space-y-1 border-t border-white/10 pt-4">
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
			<div className="hidden h-full w-48 shrink-0 flex-col p-4 md:flex">
				<div className="flex-1 space-y-1">
					{topItems.map((item) => (
						<SidebarItem
							key={item.label}
							label={item.label}
							onClick={item.onClick}
							icon={item.icon}
							active={activeItem === item.label}
						/>
					))}
				</div>

				<div className="mt-auto space-y-1 border-t border-white/10 pt-4">
					{settingsItem && (
						<SidebarItem
							key={settingsItem.label}
							label={settingsItem.label}
							onClick={settingsItem.onClick}
							icon={settingsItem.icon}
							active={activeItem === settingsItem.label}
						/>
					)}
					<SidebarItem label="Logout" onClick={onLogout} icon={LogOut} />
				</div>
			</div>
		</>
	);
}
