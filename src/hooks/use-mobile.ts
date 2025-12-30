"use client";

import { useMediaQuery } from './use-media-query';

/**
 * Hook to detect mobile devices
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}
