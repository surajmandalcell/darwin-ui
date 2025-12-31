"use client";

import { motion, useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

type AnimationType = "clip" | "fade" | "slide" | "scale" | "blur";
type AnimationDirection = "up" | "down" | "left" | "right";

type RevealProps = {
	children: ReactNode;
	duration?: number;
	delay?: number;
	overflowVisible?: boolean;
	type?: AnimationType;
	direction?: AnimationDirection;
	className?: React.ComponentProps<"div">["className"];
	classNameParent?: React.ComponentProps<"div">["className"];
	threshold?: number;
	once?: boolean;
};

const getInitialVariant = (
	type: AnimationType,
	direction: AnimationDirection,
) => {
	const distance = 60;
	const scale = 0.8;

	switch (type) {
		case "clip":
			return {
				clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
				top: 100,
			};
		case "fade":
			return { opacity: 0 };
		case "slide":
			return {
				opacity: 0,
				...(direction === "up" && { y: distance }),
				...(direction === "down" && { y: -distance }),
				...(direction === "left" && { x: distance }),
				...(direction === "right" && { x: -distance }),
			};
		case "scale":
			return { opacity: 0, scale };
		case "blur":
			return { opacity: 0, filter: "blur(10px)" };
		default:
			return { opacity: 0, y: 10 };
	}
};

const getAnimateVariant = (type: AnimationType) => {
	switch (type) {
		case "clip":
			return {
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
				top: 0,
			};
		case "fade":
			return { opacity: 1 };
		case "slide":
			return { opacity: 1, x: 0, y: 0 };
		case "scale":
			return { opacity: 1, scale: 1 };
		case "blur":
			return { opacity: 1, filter: "blur(0px)" };
		default:
			return { opacity: 1, y: 0 };
	}
};

const Reveal = ({
	children,
	duration = 0.6,
	delay = 0,
	overflowVisible = false,
	type = "clip",
	direction = "up",
	className = "",
	classNameParent = "",
	threshold = 0.1,
	once = true,
}: RevealProps) => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		amount: threshold,
		once,
	});

	const initialVariant = getInitialVariant(type, direction);
	const animateVariant = getAnimateVariant(type);

	return (
		<div
			ref={ref}
			className={twMerge(
				overflowVisible
					? "relative overflow-visible"
					: "relative overflow-hidden",
				classNameParent,
			)}
		>
			<motion.div
				initial={initialVariant}
				animate={isInView ? animateVariant : initialVariant}
				transition={{
					duration,
					delay: isInView ? delay : 0,
					ease: "easeOut",
				}}
				className={twMerge("relative", className)}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Reveal;
