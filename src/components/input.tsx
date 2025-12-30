import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "default" | "search";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant = "default", ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					// Glass effect for input
					"flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm hover:bg-white/10",
					className,
				)}
				ref={ref}
				{...(props as any)}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
