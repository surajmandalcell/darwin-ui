"use client";

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchDialog } from './SearchDialog';

export function SearchButton() {
  const [open, setOpen] = useState(false);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/60 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group"
        aria-label="Search documentation"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-xs text-white/40 group-hover:text-white/60">
          <span className="text-xs">⌘</span>
          <span>K</span>
        </kbd>
      </button>

      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
