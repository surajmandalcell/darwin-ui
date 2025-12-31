import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Check, X } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "default" | "search";
	error?: boolean;
	success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant = "default", error, success, ...props }, ref) => {
		const [shouldShake, setShouldShake] = React.useState(false);

		React.useEffect(() => {
			if (error) {
				setShouldShake(true);
				const timer = setTimeout(() => setShouldShake(false), 500);
				return () => clearTimeout(timer);
			}
		}, [error]);

		return (
			<div className="relative w-full">
				<motion.input
					type={type}
					animate={shouldShake ? { x: [-10, 10, -10, 10, 0] } : {}}
					transition={{ duration: 0.4 }}
					className={cn(
						// Glass effect for input
						"flex h-9 w-full rounded-md border bg-white/5 px-3 py-1 text-sm text-white/90 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm hover:bg-white/10",
						error && "border-red-500/50 focus-visible:ring-red-500/50",
						success && "border-green-500/50 focus-visible:ring-green-500/50",
						!error && !success && "border-white/10 focus-visible:ring-blue-500/50",
						className,
					)}
					ref={ref}
					{...(props as any)}
				/>
				{error && (
					<X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
				)}
				{success && !error && (
					<Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
				)}
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
