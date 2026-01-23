import type React from "react";
import { CloseButton } from "./close-button";
import { motion } from "framer-motion";

interface WindowProps {
	children: React.ReactNode;
	title: string;
}

export function Window({ children, title }: WindowProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="flex h-full w-full flex-col rounded-lg border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 shadow-lg backdrop-blur-md"
		>
			<div className="relative flex items-center justify-center border-b border-black/10 dark:border-white/10 px-4 py-1.5 bg-black/5 dark:bg-white/5 rounded-t-lg">
				<CloseButton
					href="/"
					className="absolute left-4 top-1/2 -translate-y-1/2"
				/>
				<div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wide">
					{title}
				</div>
			</div>
			<div className="flex-1 overflow-hidden flex flex-col relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.4 }}
					className="h-full flex flex-col"
				>
					{children}
				</motion.div>
			</div>
		</motion.div>
	);
}
