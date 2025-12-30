"use client";

import React, { useState, useEffect } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import { Expand, X } from "lucide-react";
import FocusLock from "react-focus-lock";
import { useOverlay } from "../contexts/overlay-context";
import { useEscapeKey } from "../hooks/use-escape-key";

// Support both Next.js Image and regular img elements
export type MacOSImageProps = (
	| (Omit<NextImageProps, "className" | "onClick"> & { useNext?: true })
	| (Omit<React.ImgHTMLAttributes<HTMLImageElement>, "className"> & {
			useNext: false;
	  })
) & {
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
		sm: "rounded-sm",
		md: "rounded-md",
		lg: "rounded-lg",
		xl: "rounded-xl",
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
					className={`fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 ${
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
						className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
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
						<NextImage
							src={getImageSrc()}
							alt={getImageAlt()}
							width={1920}
							height={1080}
							className="object-contain rounded-lg max-w-full max-h-[90vh] w-auto h-auto"
						/>
					</div>
				</div>
			</FocusLock>
		);
	};

	// Check if image has fill prop (for Next.js Image)
	const hasFill = "fill" in props && props.fill === true;

	// Wrapper for click-to-enlarge functionality
	const wrapWithClickToEnlarge = (element: React.ReactNode) => {
		if (!clickToEnlarge) return element;

		// For fill images, wrapper should be block and fill parent
		// For non-fill images, wrapper should be inline-block
		const wrapperClass = hasFill
			? "cursor-pointer group relative block w-full h-full"
			: "cursor-pointer group relative inline-block";

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
					className={wrapperClass}
				>
					{element}
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none rounded-lg">
						<Expand className="text-white/0 group-hover:text-white/90 text-sm transition-all duration-300" />
					</div>
				</div>
				{renderEnlargedOverlay()}
			</>
		);
	};

	// Use Next.js Image by default, or regular img if useNext is false
	if ("useNext" in props && props.useNext === false) {
		const { useNext: _useNext, ...imgProps } = props;
		const imgElement = (
			<img
				{...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)}
				className={baseClass}
			/>
		);
		return wrapWithClickToEnlarge(imgElement);
	}

	// Default to Next.js Image
	const { useNext: _useNext, ...nextImageProps } = props as NextImageProps & {
		useNext?: boolean;
	};

	// Add default sizes for fill images if not provided
	const imagePropsWithSizes =
		hasFill && !nextImageProps.sizes
			? { ...nextImageProps, sizes: "100vw" }
			: nextImageProps;

	const imageElement = (
		<NextImage {...imagePropsWithSizes} className={baseClass} />
	);
	return wrapWithClickToEnlarge(imageElement);
}
