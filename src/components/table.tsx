"use client";

import React from "react";
import { Skeleton } from "./skeleton";

export function Table({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full border border-black/10 dark:border-white/10 rounded-[var(--radius-lg,0.75rem)] overflow-x-auto md:overflow-visible">
			<table className="w-full text-sm text-zinc-900 dark:text-zinc-100">{children}</table>
		</div>
	);
}

export function TableHead({ children }: { children: React.ReactNode }) {
	return <thead className="bg-black/5 dark:bg-white/5">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
	return <tbody>{children}</tbody>;
}

type TdProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
	children: React.ReactNode;
	className?: string;
};

export function TableCell({ children, className = "", ...props }: TdProps) {
	return (
		<td className={`px-4 py-2 align-middle ${className}`} {...props}>
			{children}
		</td>
	);
}

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
	children: React.ReactNode;
	className?: string;
};

export function TableHeaderCell({
	children,
	className = "",
	...props
}: ThProps) {
	return (
		<th
			scope="col"
			className={`px-4 py-2 text-left align-middle font-medium text-zinc-600 dark:text-zinc-400 ${className}`}
			{...props}
		>
			{children}
		</th>
	);
}

export function TableRow({
	children,
	className = "",
	fadeIn = false,
}: {
	children: React.ReactNode;
	className?: string;
	fadeIn?: boolean;
}) {
	const [visible, setVisible] = React.useState(!fadeIn);
	React.useEffect(() => {
		if (fadeIn) {
			const id = requestAnimationFrame(() => setVisible(true));
			return () => cancelAnimationFrame(id);
		}
	}, [fadeIn]);

	return (
		<tr
			className={`border-b border-black/10 dark:border-white/10 transition-opacity duration-300 ${className}`}
			style={{ opacity: visible ? 1 : 0 }}
		>
			{children}
		</tr>
	);
}

export function TableEmptyRow({
	colSpan,
	children,
}: {
	colSpan: number;
	children: React.ReactNode;
}) {
	return (
		<tr>
			<td colSpan={colSpan} className="px-8 py-4 text-center">
				<div className="flex flex-col items-center justify-center space-y-3">
					{children}
				</div>
			</td>
		</tr>
	);
}

export function TableLoadingRows({
	rows = 3,
	colSkeletons,
}: {
	rows?: number;
	colSkeletons: string[];
}) {
	const rowIds = Array.from({ length: rows }, (_, index) => `loading-${index}`);

	return (
		<>
			{rowIds.map((rowId) => (
				<TableRow key={rowId}>
					{colSkeletons.map((cls) => (
						<TableCell key={`${rowId}-${cls}`}>
							<Skeleton className={cls} />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
