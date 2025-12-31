"use client";

import { AlertTriangle, CheckCircle, Info, XCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { motion, AnimatePresence } from "framer-motion";
import { useOverlay } from "../contexts/overlay-context";
import { useEscapeKey } from "../hooks/use-escape-key";
import { Button } from "./button";
import { cn } from "../lib/utils";

export type AlertType = "info" | "success" | "warning" | "error";
export type AlertVariant = "info" | "success" | "warning" | "error" | "destructive";

// ============================================================================
// INLINE ALERT COMPONENT (Banner-style alerts)
// ============================================================================

interface InlineAlertProps {
	variant?: AlertVariant;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	dismissible?: boolean;
	onDismiss?: () => void;
	className?: string;
}

const alertVariants: Record<AlertVariant, { bg: string; border: string; icon: string; title: string; description: string }> = {
	info: {
		bg: "bg-blue-500/[0.08]",
		border: "border-blue-500/20",
		icon: "text-blue-400",
		title: "text-blue-50",
		description: "text-blue-200/70",
	},
	success: {
		bg: "bg-emerald-500/[0.08]",
		border: "border-emerald-500/20",
		icon: "text-emerald-400",
		title: "text-emerald-50",
		description: "text-emerald-200/70",
	},
	warning: {
		bg: "bg-amber-500/[0.08]",
		border: "border-amber-500/20",
		icon: "text-amber-400",
		title: "text-amber-50",
		description: "text-amber-200/70",
	},
	error: {
		bg: "bg-red-500/[0.08]",
		border: "border-red-500/20",
		icon: "text-red-400",
		title: "text-red-50",
		description: "text-red-200/70",
	},
	destructive: {
		bg: "bg-red-500/[0.08]",
		border: "border-red-500/20",
		icon: "text-red-400",
		title: "text-red-50",
		description: "text-red-200/70",
	},
};

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
	info: <Info className="w-4 h-4" />,
	success: <CheckCircle className="w-4 h-4" />,
	warning: <AlertTriangle className="w-4 h-4" />,
	error: <XCircle className="w-4 h-4" />,
	destructive: <XCircle className="w-4 h-4" />,
};

export function Alert({
	variant = "info",
	title,
	description,
	children,
	icon,
	dismissible = false,
	onDismiss,
	className,
}: InlineAlertProps) {
	const [isVisible, setIsVisible] = useState(true);
	const styles = alertVariants[variant];

	const handleDismiss = () => {
		setIsVisible(false);
		onDismiss?.();
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: -8, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -8, scale: 0.98 }}
					transition={{
						type: "spring",
						stiffness: 500,
						damping: 30,
						mass: 0.8
					}}
					className={cn(
						"relative flex items-start gap-3 rounded-xl border p-4",
						"backdrop-blur-sm",
						styles.bg,
						styles.border,
						className
					)}
					role="alert"
				>
					{/* Icon */}
					<div className={cn("shrink-0 mt-0.5", styles.icon)}>
						{icon || defaultIcons[variant]}
					</div>

					{/* Content */}
					<div className="flex-1 min-w-0">
						{title && (
							<h5 className={cn("text-sm font-semibold leading-tight", styles.title)}>
								{title}
							</h5>
						)}
						{description && (
							<p className={cn(
								"text-sm leading-relaxed",
								title ? "mt-1" : "",
								styles.description
							)}>
								{description}
							</p>
						)}
						{children}
					</div>

					{/* Dismiss button */}
					{dismissible && (
						<motion.button
							type="button"
							onClick={handleDismiss}
							className={cn(
								"shrink-0 p-1 rounded-lg transition-colors",
								"hover:bg-white/10 active:bg-white/15",
								styles.icon,
								"opacity-60 hover:opacity-100"
							)}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							aria-label="Dismiss alert"
						>
							<X className="w-4 h-4" />
						</motion.button>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ============================================================================
// ALERT DIALOG COMPONENT (Modal-style alerts)
// ============================================================================

interface AlertProps {
	title: string;
	message: string;
	type?: AlertType;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	showCancel?: boolean;
}

interface AlertContextValue {
	showAlert: (props: AlertProps) => void;
}

const AlertContext = React.createContext<AlertContextValue | undefined>(
	undefined,
);

export function useAlert() {
	const context = React.useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within AlertProvider");
	}
	return context;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
	const [alert, setAlert] = useState<AlertProps | null>(null);
	const [isClosing, setIsClosing] = useState(false);
	const [overlayId, setOverlayId] = useState<string | null>(null);
	const { registerOverlay, unregisterOverlay } = useOverlay();

	const showAlert = (props: AlertProps) => {
		setAlert(props);
		setIsClosing(false);
	};

	const handleClose = (callback?: () => void) => {
		setIsClosing(true);
		setTimeout(() => {
			setAlert(null);
			setIsClosing(false);
			callback?.();
		}, 200);
	};

	// Register/unregister overlay when alert opens/closes
	useEffect(() => {
		if (alert && !overlayId) {
			const id = registerOverlay("alert", {
				blocksScroll: true,
				isFullscreen: false,
			});
			setOverlayId(id);
		} else if (!alert && overlayId) {
			unregisterOverlay(overlayId);
			setOverlayId(null);
		}
	}, [alert, overlayId, registerOverlay, unregisterOverlay]);

	// ESC key to close
	useEscapeKey(() => handleClose(alert?.onCancel), !!alert);

	const getIcon = (type: AlertType) => {
		const iconClass = "w-5 h-5";
		switch (type) {
			case "success":
				return <CheckCircle className={`${iconClass} text-green-400`} />;
			case "warning":
				return <AlertTriangle className={`${iconClass} text-yellow-400`} />;
			case "error":
				return <XCircle className={`${iconClass} text-red-400`} />;
			default:
				return <Info className={`${iconClass} text-blue-400`} />;
		}
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			{alert && (
				<FocusLock returnFocus>
					<div
						className={`fixed inset-0 flex items-center justify-center ${
							isClosing
								? "animate-out fade-out duration-200"
								: "animate-in fade-in duration-200"
						}`}
						style={{ zIndex: "var(--z-alert)" }}
					>
						<button
							type="button"
							className="absolute inset-0 bg-black/50 backdrop-blur-[6px]"
							aria-label={alert.cancelText || "Dismiss alert"}
							onClick={() => handleClose(alert.onCancel)}
						/>
						<div
							className={`relative bg-neutral-900/95 backdrop-blur-md shadow-md border border-white/10 rounded-md w-full max-w-md ${
								isClosing
									? "animate-out zoom-out-95 duration-200"
									: "animate-in zoom-in-95 duration-200"
							}`}
							role="alertdialog"
							aria-modal="true"
							aria-labelledby="alert-title"
							aria-describedby="alert-message"
						>
							<div className="p-6">
								<div className="flex items-start gap-3 mb-4">
									{getIcon(alert.type || "info")}
									<div className="flex-1">
										<h3
											id="alert-title"
											className="text-white/90 text-base font-semibold mb-1"
										>
											{alert.title}
										</h3>
										<p id="alert-message" className="text-white/60 text-sm">
											{alert.message}
										</p>
									</div>
								</div>
								<div className="flex justify-end gap-2">
									{alert.showCancel && (
										<Button
											variant="secondary"
											onClick={() => handleClose(alert.onCancel)}
										>
											{alert.cancelText || "Cancel"}
										</Button>
									)}
									<Button onClick={() => handleClose(alert.onConfirm)}>
										{alert.confirmText || "OK"}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</FocusLock>
			)}
		</AlertContext.Provider>
	);
}
