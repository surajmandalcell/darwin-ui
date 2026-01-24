"use client";

import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Expand, X } from "lucide-react";
import FocusLock from "react-focus-lock";
import { useOverlay } from "../contexts/overlay-context";
import { useEscapeKey } from "../hooks/use-escape-key";

// Image props using standard HTML img attributes
export type MacOSImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	className?: string;
	rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
	clickToEnlarge?: boolean;
};

export function Image({
	className,
	rounded = "md",
	clickToEnlarge = false,
	...props
}: MacOSImageProps) {
	const [isEnlarged, setIsEnlarged] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [overlayId, setOverlayId] = useState<string | null>(null);
	const { registerOverlay, unregisterOverlay } = useOverlay();

	const roundedClass = {
		none: "",
		sm: "rounded-md",
		md: "rounded-lg",
		lg: "rounded-xl",
		xl: "rounded-2xl",
		full: "rounded-full",
	}[rounded];

	const baseClass = twMerge(roundedClass, className);

	// Register/unregister overlay when image viewer opens/closes
	useEffect(() => {
		if (isEnlarged && !isClosing && !overlayId) {
			const id = registerOverlay("image-viewer", {
				blocksScroll: true,
				isFullscreen: true,
			});
			setOverlayId(id);
		} else if (!isEnlarged && overlayId) {
			unregisterOverlay(overlayId);
			setOverlayId(null);
		}
	}, [isEnlarged, isClosing, overlayId, registerOverlay, unregisterOverlay]);

	// Get the image source for the enlarged view
	const getImageSrc = (): string => {
		if ("src" in props && typeof props.src === "string") {
			return props.src;
		}
		return "";
	};

	const getImageAlt = (): string => {
		if ("alt" in props && typeof props.alt === "string") {
			return props.alt;
		}
		return "Image";
	};

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsEnlarged(false);
			setIsClosing(false);
		}, 200);
	};

	// ESC key to close
	useEscapeKey(handleClose, isEnlarged);

	// Render the enlarged overlay
	const renderEnlargedOverlay = () => {
		if (!isEnlarged || !clickToEnlarge) return null;

		return (
			<FocusLock returnFocus>
				<div
					className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 ${
						isClosing
							? "animate-out fade-out duration-200"
							: "animate-in fade-in duration-200"
					}`}
					style={{ zIndex: "var(--z-fullscreen)" }}
					onClick={handleClose}
					role="dialog"
					aria-modal="true"
					aria-label={`Enlarged view of ${getImageAlt()}`}
				>
					<button
						className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer z-10"
						onClick={(e) => {
							e.stopPropagation();
							handleClose();
						}}
						aria-label="Close image viewer"
					>
						<X className="w-8 h-8" />
					</button>
					<div
						className={`relative max-w-7xl max-h-[90vh] ${
							isClosing
								? "animate-out zoom-out-95 duration-200"
								: "animate-in zoom-in-95 duration-200"
						}`}
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={getImageSrc()}
							alt={getImageAlt()}
							className="object-contain rounded-xl max-w-full max-h-[90vh] w-auto h-auto"
						/>
					</div>
				</div>
			</FocusLock>
		);
	};

	// Wrapper for click-to-enlarge functionality
	const wrapWithClickToEnlarge = (element: React.ReactNode) => {
		if (!clickToEnlarge) return element;

		return (
			<>
				<div
					onClick={() => setIsEnlarged(true)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							setIsEnlarged(true);
						}
					}}
					role="button"
					tabIndex={0}
					className="cursor-pointer group relative inline-block"
				>
					{element}
					<div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none rounded-xl">
						<Expand className="text-transparent group-hover:text-zinc-100 text-sm transition-all duration-300" />
					</div>
				</div>
				{renderEnlargedOverlay()}
			</>
		);
	};

	// Use regular img element
	const imgElement = (
		<img
			{...props}
			className={baseClass}
		/>
	);
	return wrapWithClickToEnlarge(imgElement);
}
