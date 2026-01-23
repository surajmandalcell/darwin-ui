"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";

interface AccordionContextValue {
	expandedItems: string[];
	toggleItem: (value: string) => void;
	type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

function useAccordionContext() {
	const context = React.useContext(AccordionContext);
	if (!context) {
		throw new Error("Accordion components must be used within an Accordion provider");
	}
	return context;
}

interface AccordionProps {
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	children: React.ReactNode;
	className?: string;
}

function Accordion({
	type = "single",
	defaultValue,
	children,
	className,
}: AccordionProps) {
	const [expandedItems, setExpandedItems] = React.useState<string[]>(() => {
		if (!defaultValue) return [];
		return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
	});

	const toggleItem = React.useCallback(
		(value: string) => {
			setExpandedItems((prev) => {
				if (type === "single") {
					return prev.includes(value) ? [] : [value];
				}
				return prev.includes(value)
					? prev.filter((item) => item !== value)
					: [...prev, value];
			});
		},
		[type]
	);

	return (
		<AccordionContext.Provider value={{ expandedItems, toggleItem, type }}>
			<div className={cn("w-full divide-y divide-white/10 dark:divide-black/10", className)}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

interface AccordionItemProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

function AccordionItem({ value, children, className }: AccordionItemProps) {
	return (
		<div className={cn("py-0", className)} data-value={value}>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child as React.ReactElement<{ itemValue?: string }>, { itemValue: value });
				}
				return child;
			})}
		</div>
	);
}

interface AccordionTriggerProps {
	children: React.ReactNode;
	className?: string;
	itemValue?: string;
}

function AccordionTrigger({ children, className, itemValue }: AccordionTriggerProps) {
	const { expandedItems, toggleItem } = useAccordionContext();
	const isExpanded = itemValue ? expandedItems.includes(itemValue) : false;

	return (
		<button
			type="button"
			onClick={() => itemValue && toggleItem(itemValue)}
			aria-expanded={isExpanded}
			className={cn(
				"flex w-full items-center justify-between py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-all hover:text-zinc-100 dark:hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50 rounded-md",
				className
			)}
		>
			{children}
			<motion.div
				animate={{ rotate: isExpanded ? 180 : 0 }}
				transition={{ duration: getDuration("slow"), ease: "easeInOut" }}
			>
				<ChevronDown className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
			</motion.div>
		</button>
	);
}

interface AccordionContentProps {
	children: React.ReactNode;
	className?: string;
	itemValue?: string;
}

function AccordionContent({ children, className, itemValue }: AccordionContentProps) {
	const { expandedItems } = useAccordionContext();
	const isExpanded = itemValue ? expandedItems.includes(itemValue) : false;

	return (
		<AnimatePresence initial={false}>
			{isExpanded && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: getDuration("slow"), ease: "easeInOut" }}
					className="overflow-hidden"
				>
					<div className={cn("pb-4 text-sm text-zinc-400 dark:text-zinc-500", className)}>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
