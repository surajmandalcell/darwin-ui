"use client";

import {
	ArrowLeftRight as ArrowLeftRightIcon,
	Image as ImageIcon,
	Star as StarIcon,
	StarOff as StarOffIcon,
	Trash2 as Trash2Icon,
	Upload as UploadIcon,
	X as XIcon,
} from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Image } from "./image";

interface UploadProps {
	value: string[];
	onChange: (urls: string[]) => void;
	onUpload: (
		files: File[],
		onProgress?: (index: number, percent: number) => void,
	) => Promise<string[]>;
	maxFiles?: number;
	label?: string;
	/** Visual variant: default (full grid), compact (smaller), inline (single row) */
	variant?: "default" | "compact" | "inline";
}

export function Upload({
	value,
	onChange,
	onUpload,
	maxFiles = 6,
	label,
	variant = "default",
}: UploadProps) {
	const [errors, setErrors] = React.useState<string[]>([]);
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);
	const [pending, setPending] = React.useState<
		{ id: string; preview: string; progress: number }[]
	>([]);

	function removeAt(index: number) {
		const next = (value || []).filter((_, i) => i !== index);
		onChange(next);
	}

	function setCover(index: number) {
		if (index === 0) return;
		const next = [...(value || [])];
		const [picked] = next.splice(index, 1);
		next.unshift(picked);
		onChange(next);
	}

	function swap(i: number, j: number) {
		const next = [...(value || [])];
		if (i < 0 || j < 0 || i >= next.length || j >= next.length) return;
		[next[i], next[j]] = [next[j], next[i]];
		onChange(next);
	}

	// Shared file input handler
	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.currentTarget;
		const files = input.files;
		if (!files || files.length === 0) return;
		try {
			const picked = Array.from(files).slice(
				0,
				Math.max(0, maxFiles - (value?.length || 0)),
			);
			const local = picked.map((f, i) => ({
				id: f.name + "-" + Date.now() + "-" + i,
				preview: URL.createObjectURL(f),
				progress: 1,
			}));
			setPending((prev) => [...prev, ...local]);
			const urls = await onUpload(
				picked,
				(index: number, percent: number) => {
					setPending((prev) => {
						const copy = prev.slice();
						const start = prev.length - local.length;
						const idx = start + index;
						if (copy[idx]) copy[idx].progress = Math.max(1, percent);
						return copy;
					});
				},
			);
			local.forEach((l) => URL.revokeObjectURL(l.preview));
			setPending((prev) =>
				prev.filter((p) => !local.some((l) => l.id === p.id)),
			);
			if (urls?.length)
				onChange([...(value || []), ...urls].slice(0, maxFiles));
		} catch (e: any) {
			setErrors([e?.message || "Upload failed"]);
		} finally {
			input.value = "";
		}
	};

	// Hidden file input
	const fileInput = (
		<input
			ref={fileInputRef}
			type="file"
			accept="image/*"
			multiple
			className="sr-only"
			onChange={handleFileSelect}
		/>
	);

	// =========================================================================
	// INLINE VARIANT - Single row, input height
	// =========================================================================
	if (variant === "inline") {
		const hasImages = (value?.length || 0) + (pending.length || 0) > 0;

		return (
			<div className="flex flex-col gap-1">
				{fileInput}
				<div className="flex items-center gap-2 h-10 px-3 rounded-[var(--radius-lg,0.75rem)] border border-[hsl(var(--border))] bg-[hsl(var(--muted))] overflow-hidden">
					{/* Thumbnails */}
					{hasImages && (
						<div className="flex items-center gap-1.5 overflow-x-auto py-1 flex-1">
							{value.map((url, index) => (
								<div
									key={url + index}
									className="relative shrink-0 h-7 w-7 rounded overflow-hidden group"
								>
									<Image
										src={url}
										alt={`Image ${index + 1}`}
										className="h-full w-full object-cover"
										width={28}
										height={28}
									/>
									<button
										onClick={() => removeAt(index)}
										className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
										aria-label="Remove"
									>
										<XIcon className="size-3 text-white" />
									</button>
								</div>
							))}
							{pending.map((p) => (
								<div
									key={"pending-" + p.id}
									className="relative shrink-0 h-7 w-7 rounded overflow-hidden"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={p.preview}
										alt="Uploading"
										className="h-full w-full object-cover opacity-60"
									/>
									<div className="absolute inset-x-0 bottom-0 h-1 bg-zinc-700">
										<div
											className="h-full bg-blue-500 transition-all"
											style={{ width: `${p.progress}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					)}

					{/* Empty state / Add button */}
					{!hasImages && (
						<span className="text-sm text-[hsl(var(--muted-foreground))] flex-1">
							{label || "No images"}
						</span>
					)}

					{/* Add button */}
					<button
						onClick={() => fileInputRef.current?.click()}
						className="shrink-0 h-6 w-6 rounded bg-[hsl(var(--background))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--foreground))]/20 transition-colors"
						aria-label="Add image"
					>
						<UploadIcon className="size-3.5" />
					</button>

					{/* Clear all button */}
					{hasImages && (
						<button
							onClick={() => onChange([])}
							className="shrink-0 h-6 w-6 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors"
							aria-label="Remove all"
						>
							<Trash2Icon className="size-3.5" />
						</button>
					)}
				</div>
				{errors.length > 0 && (
					<div className="text-xs text-red-500">{errors[0]}</div>
				)}
			</div>
		);
	}

	// =========================================================================
	// COMPACT VARIANT - Smaller drop zone, 2-column grid
	// =========================================================================
	if (variant === "compact") {
		return (
			<div className="flex flex-col gap-2">
				{fileInput}
				<div className="relative flex flex-col overflow-hidden rounded-[var(--radius-lg,0.75rem)] border border-dashed border-[hsl(var(--border))] p-3">
					{(value?.length || 0) + (pending.length || 0) > 0 ? (
						<div className="flex w-full flex-col gap-2">
							<div className="flex items-center justify-between gap-2">
								<span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
									{value.length + pending.length} image{value.length + pending.length !== 1 ? "s" : ""}
								</span>
								<div className="flex gap-1.5">
									<button
										onClick={() => fileInputRef.current?.click()}
										className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
									>
										<UploadIcon className="size-3" />
										Add
									</button>
									<button
										onClick={() => onChange([])}
										className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
									>
										<Trash2Icon className="size-3" />
									</button>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-2">
								{value.map((url, index) => (
									<div
										key={url + index}
										className="relative rounded overflow-hidden group"
									>
										<Image
											src={url}
											alt={`Image ${index + 1}`}
											className="w-full h-16 object-cover"
											width={120}
											height={64}
										/>
										<button
											onClick={() => removeAt(index)}
											className="absolute top-1 right-1 size-5 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
											aria-label="Remove"
										>
											<XIcon className="size-3 text-white" />
										</button>
										{index === 0 && (
											<span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white font-medium">
												Cover
											</span>
										)}
									</div>
								))}
								{pending.map((p) => (
									<div
										key={"pending-" + p.id}
										className="relative rounded overflow-hidden"
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={p.preview}
											alt="Uploading"
											className="w-full h-16 object-cover opacity-60"
										/>
										<div className="absolute inset-x-1 bottom-1">
											<div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500 transition-all"
													style={{ width: `${p.progress}%` }}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div
							className="flex items-center justify-center gap-3 py-4 cursor-pointer"
							onClick={() => fileInputRef.current?.click()}
						>
							<div className="flex size-8 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
								<ImageIcon className="size-3.5 text-[hsl(var(--muted-foreground))]" />
							</div>
							<div className="text-left">
								<p className="text-sm font-medium text-[hsl(var(--foreground))]">
									Upload images
								</p>
								<p className="text-xs text-[hsl(var(--muted-foreground))]">
									{label || `Max ${maxFiles} files`}
								</p>
							</div>
						</div>
					)}
				</div>
				{errors.length > 0 && (
					<div className="text-xs text-red-500">{errors[0]}</div>
				)}
			</div>
		);
	}

	// =========================================================================
	// DEFAULT VARIANT - Full grid with thumbnails
	// =========================================================================
	return (
		<div className="flex flex-col gap-2">
			{fileInput}
			{/* Drop area */}
			<div className="relative flex min-h-52 flex-col overflow-hidden rounded-xl border border-dashed border-black/20 dark:border-white/20 p-4">
				{(value?.length || 0) + (pending.length || 0) > 0 ? (
					<div className="flex w-full flex-col gap-3">
						<div className="flex items-center justify-between gap-2">
							<h3 className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
								Images ({value.length + pending.length})
							</h3>
							<div className="flex gap-2">
								<button
									onClick={() => fileInputRef.current?.click()}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20 rounded-md text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-zinc-100 transition-all duration-200"
								>
									<UploadIcon className="size-3.5" />
									Add
								</button>
								<button
									onClick={() => onChange([])}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-md text-xs text-red-500 hover:text-red-500 transition-all duration-200"
								>
									<Trash2Icon className="size-3.5" />
									Remove all
								</button>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
							{value.map((url, index) => (
								<div
									key={url + index}
									className="relative flex flex-col rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 overflow-hidden group"
								>
									<Image
										height={80}
										width={82}
										src={url}
										alt={`Image ${index + 1}`}
										className="object-cover w-full max-h-20"
									/>
									<Button
										onClick={() => removeAt(index)}
										className="border-background focus-visible:border-background absolute top-0 right-0 size-6 rounded-full shadow-none bg-red-500 hover:bg-red-500/90 flex items-center justify-center p-0"
										aria-label="Remove image"
									>
										<XIcon className="size-3.5 text-white" />
									</Button>
									<div className="flex min-w-0 items-center justify-between gap-2 border-t border-black/10 dark:border-white/10 p-2">
										<span className="truncate text-[12px] text-zinc-500 dark:text-zinc-400">
											{index === 0 ? "Cover" : `Image ${index + 1}`}
										</span>
										<div className="flex gap-1">
											<button
												title={index === 0 ? "Already cover" : "Make cover"}
												onClick={() => setCover(index)}
												className="p-1 rounded bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-zinc-900 dark:text-zinc-100"
											>
												{index === 0 ? (
													<StarIcon className="w-3.5 h-3.5 text-amber-500" />
												) : (
													<StarOffIcon className="w-3.5 h-3.5" />
												)}
											</button>
											<button
												title="Swap with next"
												onClick={() =>
													swap(index, Math.min(index + 1, value.length - 1))
												}
												className="p-1 rounded bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-zinc-900 dark:text-zinc-100"
											>
												<ArrowLeftRightIcon className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
								</div>
							))}
							{pending.map((p, i) => (
								<div
									key={"pending-" + p.id}
									className="relative flex flex-col rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 overflow-hidden"
								>
									<div className="aspect-square w-full bg-zinc-800">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={p.preview}
											alt={`Pending ${i + 1}`}
											className="h-full w-full object-cover opacity-80"
										/>
									</div>
									<div className="absolute inset-x-0 bottom-0 p-2">
										<div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
											<div
												className="h-full bg-blue-500 rounded-full transition-all"
												style={{ width: `${p.progress}%` }}
											/>
										</div>
										<div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
											Uploading… {p.progress}%
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
						<div
							className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"
							aria-hidden="true"
						>
							<ImageIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
						</div>
						<p className="mb-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
							Drop your images here
						</p>
						{label && <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>}
						<p className="text-xs text-zinc-500 dark:text-zinc-400">Max {maxFiles} files</p>
						<div className="mt-3" />
					</div>
				)}
				<div className="py-3 px-0">
					<div
						className="border border-dashed border-black/20 dark:border-white/20 rounded-[var(--radius-lg,0.75rem)] min-h-[50px] flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm cursor-pointer hover:bg-black/5 dark:bg-white/5"
						onClick={() => fileInputRef.current?.click()}
					>
						Click to select images
					</div>
				</div>
			</div>

			{errors.length > 0 && (
				<div
					className="flex items-center gap-1 text-xs text-red-500"
					role="alert"
				>
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	);
}
