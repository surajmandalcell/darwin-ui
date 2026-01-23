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
}

export function Upload({
	value,
	onChange,
	onUpload,
	maxFiles = 6,
	label,
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

	return (
		<div className="flex flex-col gap-2">
			{/* Drop area */}
			<div className="relative flex min-h-52 flex-col overflow-hidden rounded-xl border border-dashed border-white/20 dark:border-black/20 p-4">
				{(value?.length || 0) + (pending.length || 0) > 0 ? (
					<div className="flex w-full flex-col gap-3">
						<div className="flex items-center justify-between gap-2">
							<h3 className="truncate text-sm font-medium text-zinc-400 dark:text-zinc-500">
								Images ({value.length + pending.length})
							</h3>
							<div className="flex gap-2">
								<button
									onClick={() => fileInputRef.current?.click()}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 border border-white/10 dark:border-black/10 hover:border-white/20 dark:border-black/20 rounded-md text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-100 dark:text-zinc-900 transition-all duration-200"
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
									className="relative flex flex-col rounded-md border border-white/10 dark:border-black/10 bg-white/5 dark:bg-black/5 overflow-hidden group"
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
									<div className="flex min-w-0 items-center justify-between gap-2 border-t border-white/10 dark:border-black/10 p-2">
										<span className="truncate text-[12px] text-zinc-400 dark:text-zinc-500">
											{index === 0 ? "Cover" : `Image ${index + 1}`}
										</span>
										<div className="flex gap-1">
											<button
												title={index === 0 ? "Already cover" : "Make cover"}
												onClick={() => setCover(index)}
												className="p-1 rounded bg-white/10 dark:bg-black/10 hover:bg-white/15 dark:hover:bg-black/15 text-zinc-100 dark:text-zinc-900"
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
												className="p-1 rounded bg-white/10 dark:bg-black/10 hover:bg-white/15 dark:hover:bg-black/15 text-zinc-100 dark:text-zinc-900"
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
									className="relative flex flex-col rounded-md border border-white/10 dark:border-black/10 bg-white/5 dark:bg-black/5 overflow-hidden"
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
										<div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
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
							className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 dark:border-black/20 bg-white/5 dark:bg-black/5"
							aria-hidden="true"
						>
							<ImageIcon className="size-4 text-zinc-400 dark:text-zinc-500" />
						</div>
						<p className="mb-1.5 text-sm font-medium text-zinc-100 dark:text-zinc-900">
							Drop your images here
						</p>
						{label && <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">{label}</p>}
						<p className="text-xs text-zinc-500 dark:text-zinc-400">Max {maxFiles} files</p>
						<div className="mt-3" />
					</div>
				)}
				<div className="py-3 px-0">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						multiple
						className="sr-only"
						onChange={async (e) => {
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
						}}
					/>
					<div
						className="border border-dashed border-white/20 dark:border-black/20 rounded-lg min-h-[50px] flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm cursor-pointer hover:bg-white/5 dark:bg-black/5"
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
