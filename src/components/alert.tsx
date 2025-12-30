"use client";

import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { useOverlay } from "../contexts/overlay-context";
import { useEscapeKey } from "../hooks/use-escape-key";
import { Button } from "./button";

export type AlertType = "info" | "success" | "warning" | "error";

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
							className="absolute inset-0 bg-black/50 backdrop-blur-sm"
							aria-label={alert.cancelText || "Dismiss alert"}
							onClick={() => handleClose(alert.onCancel)}
						/>
						<div
							className={`relative bg-[rgba(30,30,31,0.95)] backdrop-blur-xl shadow-[0px_20px_30px_0px_rgba(0,0,0,0.25),0px_0px_15px_0px_rgba(0,0,0,0.1),inset_0px_0px_0px_1px_rgba(255,255,255,0.075),0px_0px_0px_1px_rgba(0,0,0,0.5)] rounded-md w-full max-w-md ${
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
