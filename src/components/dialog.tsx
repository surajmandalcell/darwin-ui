"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { getDuration } from "../lib/animation-config";
import { useOverlay } from "../contexts/overlay-context";
import { useEscapeKey } from "../hooks/use-escape-key";

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

interface DialogContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

function useDialogContext() {
	const context = React.useContext(DialogContext);
	if (!context) {
		throw new Error("Dialog components must be used within a Dialog provider");
	}
	return context;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
	const [overlayId, setOverlayId] = React.useState<string | null>(null);
	const { registerOverlay, unregisterOverlay } = useOverlay();

	React.useEffect(() => {
		if (open && !overlayId) {
			const id = registerOverlay("dialog", {
				blocksScroll: true,
				isFullscreen: false,
			});
			setOverlayId(id);
		} else if (!open && overlayId) {
			unregisterOverlay(overlayId);
			setOverlayId(null);
		}
	}, [open, overlayId, registerOverlay, unregisterOverlay]);

	useEscapeKey(() => onOpenChange(false), open);

	return (
		<DialogContext.Provider value={{ open, onOpenChange }}>
			{children}
		</DialogContext.Provider>
	);
}

interface DialogTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
}

function DialogTrigger({ children, asChild }: DialogTriggerProps) {
	const { onOpenChange } = useDialogContext();

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
			onClick: () => onOpenChange(true),
		});
	}

	return (
		<button type="button" onClick={() => onOpenChange(true)}>
			{children}
		</button>
	);
}

interface DialogContentProps {
	children: React.ReactNode;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	/** Enable frosted glass effect */
	glass?: boolean;
}

function DialogContent({ children, className, size = "md", glass = false }: DialogContentProps) {
	const { open, onOpenChange } = useDialogContext();
	const [mounted, setMounted] = React.useState(false);

	// Ensure we only render portal on client
	React.useEffect(() => {
		setMounted(true);
	}, []);

	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		full: "max-w-[90vw]",
	};

	const content = (
		<AnimatePresence>
			{open && (
				<FocusLock returnFocus>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: getDuration("fast") }}
						className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center"
						style={{ zIndex: 9999 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								onOpenChange(false);
							}
						}}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={{
								duration: getDuration("slow"),
								ease: [0.16, 1, 0.3, 1],
							}}
							role="dialog"
							aria-modal="true"
							className={cn(
								"relative w-full border rounded-[var(--radius-xl,1rem)] shadow-2xl",
								glass
									? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-white/20 dark:border-white/10"
									: "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-black/10 dark:border-white/10",
								sizeClasses[size],
								className
							)}
						>
							{children}
						</motion.div>
					</motion.div>
				</FocusLock>
			)}
		</AnimatePresence>
	);

	// Use portal to escape stacking context
	if (!mounted) return null;
	return createPortal(content, document.body);
}

interface DialogHeaderProps {
	children: React.ReactNode;
	className?: string;
}

function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<div className={cn("px-6 pt-6 pb-0", className)}>
			{children}
		</div>
	);
}

interface DialogTitleProps {
	children: React.ReactNode;
	className?: string;
}

function DialogTitle({ children, className }: DialogTitleProps) {
	return (
		<h2 className={cn("text-lg font-semibold text-zinc-900 dark:text-zinc-100", className)}>
			{children}
		</h2>
	);
}

interface DialogDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

function DialogDescription({ children, className }: DialogDescriptionProps) {
	return (
		<p className={cn("mt-1 text-sm text-zinc-500 dark:text-zinc-400", className)}>
			{children}
		</p>
	);
}

interface DialogBodyProps {
	children: React.ReactNode;
	className?: string;
}

function DialogBody({ children, className }: DialogBodyProps) {
	return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

interface DialogFooterProps {
	children: React.ReactNode;
	className?: string;
}

function DialogFooter({ children, className }: DialogFooterProps) {
	return (
		<div className={cn("flex items-center justify-end gap-2 px-6 pb-6 pt-0", className)}>
			{children}
		</div>
	);
}

interface DialogCloseProps {
	children?: React.ReactNode;
	className?: string;
	asChild?: boolean;
}

function DialogClose({ children, className, asChild }: DialogCloseProps) {
	const { onOpenChange } = useDialogContext();

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
			onClick: () => onOpenChange(false),
		});
	}

	if (!children) {
		return (
			<button
				type="button"
				onClick={() => onOpenChange(false)}
				className={cn(
					"absolute right-4 top-4 rounded-[var(--radius-md,0.5rem)] p-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-inset",
					className
				)}
			>
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</button>
		);
	}

	return (
		<button type="button" onClick={() => onOpenChange(false)} className={className}>
			{children}
		</button>
	);
}

export {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogBody,
	DialogFooter,
	DialogClose,
};
