"use client";

import { useParams } from 'react-router-dom';
import { UnifiedNavbar } from '../components/UnifiedNavbar';
import { DeveloperApp } from '../components/desktop/apps/DeveloperApp';
import type { WindowState } from '../contexts/desktop-context';

// Standalone docs page that reuses DeveloperApp's content
export default function DocsPage() {
  const { section, page } = useParams<{ section?: string; page?: string }>();

  // Create a mock window state since DeveloperApp doesn't actually use it
  const mockWindowState: WindowState = {
    id: 'docs',
    appId: 'developer',
    title: 'Documentation',
    isOpen: true,
    isMinimized: false,
    isMaximized: true,
    position: { x: 0, y: 0 },
    size: { width: typeof window !== 'undefined' ? window.innerWidth : 1920, height: typeof window !== 'undefined' ? window.innerHeight : 1080 },
    zIndex: 1,
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden flex flex-col">
      <UnifiedNavbar />
      <div className="flex-1 overflow-hidden">
        <DeveloperApp
          windowState={mockWindowState}
          initialSection={section}
          initialPage={page}
        />
      </div>
    </div>
  );
}
