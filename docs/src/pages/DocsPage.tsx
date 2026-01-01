"use client";

import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { DeveloperApp } from '../components/desktop/apps/DeveloperApp';
import type { WindowState } from '../contexts/desktop-context';

// Standalone docs page that reuses DeveloperApp's content
export default function DocsPage() {
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
    <div className="h-screen w-screen bg-neutral-900 overflow-hidden flex flex-col">
      {/* Navigation bar */}
      <div className="flex-shrink-0 h-10 bg-neutral-900 border-b border-white/10 flex items-center px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Desktop</span>
        </Link>
      </div>
      {/* App content */}
      <div className="flex-1 overflow-hidden">
        <DeveloperApp windowState={mockWindowState} />
      </div>
    </div>
  );
}
