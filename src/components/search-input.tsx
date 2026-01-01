"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	wrapperClassName?: string;
}

export function SearchInput({ className, wrapperClassName, ...props }: SearchInputProps) {
	return (
		<div className={cn("relative", wrapperClassName)}>
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none z-10" />
			<input
				type="search"
				className={cn(
					"flex h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 py-1 text-sm text-white/90 shadow-sm transition-colors placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm hover:bg-white/10",
					className
				)}
				{...props}
			/>
		</div>
	);
}
