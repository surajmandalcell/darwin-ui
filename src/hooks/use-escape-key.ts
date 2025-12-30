"use client";

import { useEffect } from "react";

export function useEscapeKey(callback: () => void, enabled = true) {
	useEffect(() => {
		if (!enabled) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				callback();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [callback, enabled]);
}
