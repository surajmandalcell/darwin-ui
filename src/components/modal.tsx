"use client";

import type React from "react";
import { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { motion, AnimatePresence } from "framer-motion";
import { getDuration } from "../lib/animation-config";
import { useOverlay } from "../contexts/overlay-context";
import { useEscapeKey } from "../hooks/use-escape-key";
import { CloseButton } from "./close-button";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	className = "",
	size = "md",
}: ModalProps) {
	const [overlayId, setOverlayId] = useState<string | null>(null);
	const { registerOverlay, unregisterOverlay } = useOverlay();

	// Register/unregister overlay when modal opens/closes
	useEffect(() => {
		if (isOpen && !overlayId) {
			const id = registerOverlay("modal", {
				blocksScroll: true,
				isFullscreen: false,
			});
			setOverlayId(id);
		} else if (!isOpen && overlayId) {
			unregisterOverlay(overlayId);
			setOverlayId(null);
		}
	}, [isOpen, overlayId, registerOverlay, unregisterOverlay]);

	// ESC key to close
	useEscapeKey(onClose, isOpen);

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-md",
		lg: "max-w-4xl",
		xl: "max-w-6xl",
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<FocusLock returnFocus>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: getDuration("fast") }}
						className="fixed inset-0 bg-[hsl(var(--overlay-backdrop))] backdrop-blur-[6px] p-4 overflow-y-auto"
						style={{ zIndex: "var(--z-modal)" }}
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								onClose();
							}
						}}
					>
						<div className="min-h-full flex items-center justify-center py-0 pointer-events-none">
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 10 }}
								transition={{
									duration: getDuration("slow"),
									ease: [0.16, 1, 0.3, 1],
								}}
								className={`bg-[hsl(var(--overlay-bg))] backdrop-blur-md shadow-md border border-[hsl(var(--border-default))] rounded-md w-full ${sizeClasses[size]} flex flex-col max-h-[calc(100vh-2rem)] ${className} pointer-events-auto`}
								role="dialog"
								aria-modal="true"
								aria-labelledby="modal-title"
							>
								<div className="flex items-center justify-start px-4 py-2 border-b border-[hsl(var(--border-default))] relative shrink-0">
									<CloseButton onClick={onClose} />
									<div
										id="modal-title"
										className="text-[hsl(var(--text-primary))] text-sm font-medium ml-2"
									>
										{title}
									</div>
								</div>
								<div className="p-4 overflow-y-auto">{children}</div>
							</motion.div>
						</div>
					</motion.div>
				</FocusLock>
			)}
		</AnimatePresence>
	);
}
