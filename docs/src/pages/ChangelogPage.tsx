"use client";

import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
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
        <ChangelogApp windowState={mockWindowState} />
      </div>
    </div>
  );
}
