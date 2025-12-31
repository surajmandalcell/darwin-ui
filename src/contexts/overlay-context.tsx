"use client";

import { createContext, useContext, useState, type ReactNode, useCallback } from "react";

interface OverlayConfig {
	blocksScroll: boolean;
	isFullscreen: boolean;
}

interface OverlayContextType {
	registerOverlay: (type: string, config: OverlayConfig) => string;
	unregisterOverlay: (id: string) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
	const [_overlays, setOverlays] = useState<Map<string, { type: string; config: OverlayConfig }>>(
		new Map()
	);

	const registerOverlay = useCallback((type: string, config: OverlayConfig): string => {
		const id = `${type}-${Date.now()}-${Math.random()}`;
		setOverlays((prev) => {
			const next = new Map(prev);
			next.set(id, { type, config });
			return next;
		});
		return id;
	}, []);

	const unregisterOverlay = useCallback((id: string) => {
		setOverlays((prev) => {
			const next = new Map(prev);
			next.delete(id);
			return next;
		});
	}, []);

	return (
		<OverlayContext.Provider value={{ registerOverlay, unregisterOverlay }}>
			{children}
		</OverlayContext.Provider>
	);
}

export function useOverlay() {
	const context = useContext(OverlayContext);
	if (context === undefined) {
		throw new Error("useOverlay must be used within an OverlayProvider");
	}
	return context;
}
