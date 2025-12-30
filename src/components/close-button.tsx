"use client";

import { twMerge } from "tailwind-merge";

interface CloseButtonProps {
	onClick?: () => void;
	href?: string;
	className?: string;
}

export function CloseButton({
	onClick,
	href,
	className = "",
}: CloseButtonProps) {
	const baseClasses =
		"w-3.5 h-3.5 bg-red-500 rounded-full hover:bg-red-400 transition-all after:content-[''] after:absolute after:inset-0 after:m-auto after:w-1/3 after:h-1/3 after:rounded-full after:bg-red-700 after:opacity-0 hover:after:opacity-100 after:transition-opacity relative";

	const wrapperClasses =
		"inline-flex items-center justify-center min-w-3.5 min-h-3.5";

	if (href) {
		return (
			<a href={href} className={twMerge(wrapperClasses, className)}>
				<span className={baseClasses} />
			</a>
		);
	}

	return (
		<button
			onClick={onClick}
			className={twMerge(wrapperClasses, className)}
			aria-label="Close"
		>
			<span className={baseClasses} />
		</button>
	);
}
