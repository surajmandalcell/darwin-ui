"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface TabsContextValue {
	value: string;
	onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
	const context = React.useContext(TabsContext);
	if (!context) {
		throw new Error("Tabs components must be used within a Tabs provider");
	}
	return context;
}

interface TabsProps {
	value: string;
	onValueChange: (value: string) => void;
	children: React.ReactNode;
	className?: string;
}

function Tabs({ value, onValueChange, children, className }: TabsProps) {
	return (
		<TabsContext.Provider value={{ value, onValueChange }}>
			<div className={cn("w-full", className)}>{children}</div>
		</TabsContext.Provider>
	);
}

interface TabsListProps {
	children: React.ReactNode;
	className?: string;
}

function TabsList({ children, className }: TabsListProps) {
	return (
		<div
			role="tablist"
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-lg bg-[hsl(var(--glass-bg))] p-1 text-[hsl(var(--text-secondary))] backdrop-blur-sm border border-[hsl(var(--border-default))]",
				className
			)}
		>
			{children}
		</div>
	);
}

interface TabsTriggerProps {
	value: string;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps) {
	const { value: selectedValue, onValueChange } = useTabsContext();
	const isSelected = selectedValue === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isSelected}
			aria-controls={`tabpanel-${value}`}
			disabled={disabled}
			onClick={() => onValueChange(value)}
			className={cn(
				"relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50",
				className
			)}
		>
			{isSelected && (
				<motion.span
					layoutId="active-tab"
					className="absolute inset-0 bg-[hsl(var(--glass-bg-hover))] rounded-md"
					transition={{
						type: "spring",
						bounce: 0.15,
						duration: 0.5,
					}}
				/>
			)}
			<span
				className={cn(
					"relative z-10 transition-colors duration-200",
					isSelected ? "text-[hsl(var(--text-primary))]" : "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
				)}
			>
				{children}
			</span>
		</button>
	);
}

interface TabsContentProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

function TabsContent({ value, children, className }: TabsContentProps) {
	const { value: selectedValue } = useTabsContext();
	const isSelected = selectedValue === value;

	if (!isSelected) return null;

	return (
		<motion.div
			id={`tabpanel-${value}`}
			role="tabpanel"
			aria-labelledby={`tab-${value}`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className={cn("mt-2 focus-visible:outline-none", className)}
		>
			{children}
		</motion.div>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
