"use client";

import { lazy, Suspense, useRef } from "react";
import remarkGfm from "remark-gfm";
import { Skeleton } from "./skeleton";
import {
	cropAndResizeImage,
	fileToBase64,
	validateImageFile,
} from "../lib/image-utils";
import type { ICommand } from "@uiw/react-md-editor";
import { useAlert } from "./alert";

// @ts-ignore
import "@uiw/react-md-editor/markdown-editor.css";
// @ts-ignore
import "@uiw/react-markdown-preview/markdown.css";

function EditorSkeleton() {
	return (
		<div className="rounded-[6px] overflow-hidden border border-white/10 dark:border-black/10 bg-zinc-900 h-[420px] flex flex-col">
			<div className="border-b border-white/10 dark:border-black/10 p-2 h-10">
				<div className="flex gap-2">
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-12" />
					<Skeleton className="h-6 w-10" />
					<Skeleton className="h-6 w-20" />
				</div>
			</div>
			<div className="p-3 space-y-2 flex-1">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-4 w-5/6" />
				<Skeleton className="h-4 w-4/6" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		</div>
	);
}

const MDEditorLazy = lazy(() => import("@uiw/react-md-editor"));

interface MdEditorProps {
	value: string;
	onChange: (val: string) => void;
	placeholder?: string;
}

export function MdEditor({ value, onChange, placeholder }: MdEditorProps) {
	const { showAlert } = useAlert();
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Custom image upload command
	const imageUploadCommand: ICommand = {
		name: "image-upload",
		keyCommand: "image-upload",
		buttonProps: { "aria-label": "Insert image" },
		icon: (
			<svg width="12" height="12" viewBox="0 0 20 20">
				<path
					fill="currentColor"
					d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
				/>
			</svg>
		),
		execute: () => {
			fileInputRef.current?.click();
		},
	};

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validate file
		const validation = validateImageFile(file);
		if (!validation.valid) {
			showAlert({
				title: "Invalid Image",
				message: validation.error || "Please select a valid image file.",
				type: "error",
			});
			return;
		}

		try {
			// Convert to base64
			const base64 = await fileToBase64(file);

			// Crop and resize
			const resized = await cropAndResizeImage(base64, 800, 600, 0.85);

			// Get current cursor position or append to end
			const textarea = document.querySelector(
				"#md-editor textarea",
			) as HTMLTextAreaElement;
			const cursorPos = textarea?.selectionStart || value.length;

			// Insert markdown image syntax
			const imageMarkdown = `\n\n![Image](${resized})\n\n`;
			const newValue =
				value.slice(0, cursorPos) + imageMarkdown + value.slice(cursorPos);

			onChange(newValue);

			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			showAlert({
				title: "Upload Failed",
				message: "Failed to upload image. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleImageUpload}
				className="hidden"
			/>
			<div
				data-color-mode="dark"
				className="rounded-[6px] overflow-hidden border border-white/10 dark:border-black/10 bg-white/5 dark:bg-black/5"
			>
				<Suspense fallback={<EditorSkeleton />}>
					<MDEditorLazy
						id="md-editor"
						value={value}
						onChange={(v) => onChange(v || "")}
						previewOptions={{ remarkPlugins: [remarkGfm] }}
						textareaProps={{
							placeholder:
								placeholder || "Write your post content in Markdown...",
						}}
						height={466}
						className="rounded-2xl! overflow-hidden"
						extraCommands={[imageUploadCommand]}
					/>
				</Suspense>
			</div>
		</>
	);
}
