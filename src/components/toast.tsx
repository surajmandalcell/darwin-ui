"use client";

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import React, { useCallback, useState } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

interface Toast {
	id: string;
	title?: string;
	message: string;
	type: ToastType;
	duration?: number;
}

interface ToastContextValue {
	showToast: (
		message: string,
		options?: {
			title?: string;
			type?: ToastType;
			duration?: number;
		},
	) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
	undefined,
);

export function useToast() {
	const context = React.useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within ToastProvider");
	}
	return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const showToast = useCallback(
		(
			message: string,
			options: {
				title?: string;
				type?: ToastType;
				duration?: number;
			} = {},
		) => {
			const id = Math.random().toString(36).substring(7);
			const toast: Toast = {
				id,
				message,
				title: options.title,
				type: options.type || "info",
				duration: options.duration || 3000,
			};

			setToasts((prev) => [...prev, toast]);

			const duration = toast.duration ?? 3000;
			if (duration > 0) {
				setTimeout(() => {
					removeToast(id);
				}, duration);
			}
		},
		[removeToast],
	);

	const getIcon = (type: ToastType) => {
		const iconClass = "w-4 h-4";
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
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div
				className="fixed top-4 right-4 flex flex-col gap-2 pointer-events-none"
				style={{ zIndex: "var(--z-toast)" }}
			>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className="bg-[rgba(30,30,31,0.95)] backdrop-blur-xl shadow-[0px_20px_30px_0px_rgba(0,0,0,0.25),0px_0px_15px_0px_rgba(0,0,0,0.1),inset_0px_0px_0px_1px_rgba(255,255,255,0.075),0px_0px_0px_1px_rgba(0,0,0,0.5)] rounded-md min-w-80 max-w-md pointer-events-auto animate-in slide-in-from-right duration-300"
					>
						<div className="p-4 flex items-start gap-3">
							{getIcon(toast.type)}
							<div className="flex-1 min-w-0">
								{toast.title && (
									<div className="text-white/90 text-sm font-semibold mb-0.5">
										{toast.title}
									</div>
								)}
								<div className="text-white/70 text-sm">{toast.message}</div>
							</div>
							<button
								type="button"
								onClick={() => removeToast(toast.id)}
								className="text-white/40 hover:text-white/70 transition-colors shrink-0"
								aria-label="Close"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}
