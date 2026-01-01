"use client";

import { ChangelogApp } from '../components/desktop/apps/ChangelogApp';
import type { WindowState } from '../contexts/desktop-context';

// Standalone changelog page that reuses ChangelogApp's content
export default function ChangelogPage() {
  // Create a mock window state since ChangelogApp expects it
  const mockWindowState: WindowState = {
    id: 'changelog',
    appId: 'changelog',
    title: 'Changelog',
    isOpen: true,
    isMinimized: false,
    isMaximized: true,
    position: { x: 0, y: 0 },
    size: { width: typeof window !== 'undefined' ? window.innerWidth : 1920, height: typeof window !== 'undefined' ? window.innerHeight : 1080 },
    zIndex: 1,
  };

  return (
    <div className="h-screen w-screen bg-neutral-900 overflow-hidden">
      <ChangelogApp windowState={mockWindowState} />
    </div>
  );
}
