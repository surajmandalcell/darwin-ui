"use client";

import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { Search, FileText, Box, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildSearchIndex, createSearchEngine, type SearchableContent } from '../lib/search';
import './search-dialog.css';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchableContent[]>([]);
  const navigate = useNavigate();

  // Build search index and engine once
  const searchEngine = useMemo(() => {
    const index = buildSearchIndex();
    return createSearchEngine(index);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (search.length < 2) {
      // Show all items if query too short
      setResults(buildSearchIndex());
      return;
    }

    const fuseResults = searchEngine.search(search);
    const items = fuseResults.map((result) => result.item);
    setResults(items);
  }, [search, searchEngine]);

  // Handle selection
  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setSearch('');
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  // Group results by section
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchableContent[]> = {};
    results.forEach((item) => {
      if (!groups[item.section]) {
        groups[item.section] = [];
      }
      groups[item.section].push(item);
    });
    return groups;
  }, [results]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[6px] z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <Command
              className="rounded-xl border border-white/10 bg-neutral-950 shadow-md overflow-hidden"
              label="Search documentation"
              shouldFilter={false} // We handle filtering with Fuse
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="w-5 h-5 text-white/40" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-xs text-white/60">
                  <span className="text-xs">ESC</span>
                </kbd>
              </div>

              {/* Results List */}
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                {search.length > 0 && results.length === 0 && (
                  <div className="py-12 text-center text-white/40 text-sm">
                    No results found for "{search}"
                  </div>
                )}

                {Object.entries(groupedResults).map(([section, items]) => (
                  <Command.Group
                    key={section}
                    heading={section}
                    className="px-2 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider"
                  >
                    {items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={item.id}
                        onSelect={() => handleSelect(item.path)}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors data-[selected=true]:bg-white/10"
                      >
                        {getIcon(item.section)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white">
                            {item.title}
                          </div>
                          <div className="text-xs text-white/50 mt-0.5 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}

                {search.length === 0 && (
                  <div className="py-8 text-center text-white/40 text-sm">
                    Type to search documentation...
                  </div>
                )}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-white/40">
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-flex items-center gap-1.5">
                    <kbd className="rounded bg-white/5 px-1.5 py-0.5">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">
                    <kbd className="rounded bg-white/5 px-1.5 py-0.5">↵</kbd>
                    Select
                  </span>
                </div>
                <span>{results.length} results</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getIcon(section: string) {
  const iconClass = "w-4 h-4 text-white/60 flex-shrink-0 mt-0.5";

  switch (section) {
    case 'Getting Started':
      return <FileText className={iconClass} />;
    case 'Components':
      return <Box className={iconClass} />;
    case 'Hooks':
      return <Code className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
}
