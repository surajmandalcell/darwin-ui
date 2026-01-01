"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  changelog,
  getChangeTypeColor,
  getChangeTypeLabel,
  type ChangelogEntry,
  type ChangelogChange,
} from '../../../data/changelog';
import {
  ChevronRight,
  Calendar,
  Tag,
  Package,
  ExternalLink,
  Plus,
  Wrench,
  Bug,
  Trash2,
  AlertTriangle,
  Shield,
} from 'lucide-react';
import { Badge } from '@pikoloo/darwin-ui';

interface ChangelogAppProps {
  windowState: WindowState;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

// Get icon for change type
function getChangeTypeIcon(type: ChangelogChange['type']) {
  const icons = {
    added: Plus,
    changed: Wrench,
    fixed: Bug,
    removed: Trash2,
    deprecated: AlertTriangle,
    security: Shield,
  };
  return icons[type];
}

// Version card component
function VersionCard({ entry, isExpanded, onToggle }: {
  entry: ChangelogEntry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  // Group changes by type
  const groupedChanges = entry.changes.reduce((acc, change) => {
    if (!acc[change.type]) acc[change.type] = [];
    acc[change.type].push(change);
    return acc;
  }, {} as Record<string, ChangelogChange[]>);

  const changeOrder: ChangelogChange['type'][] = ['added', 'changed', 'fixed', 'deprecated', 'removed', 'security'];

  return (
    <motion.div
      variants={itemVariants}
      className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
    >
      {/* Header */}
      <motion.button
        className="w-full p-4 flex flex-col md:flex-row items-start md:items-center justify-between text-left hover:bg-white/5 transition-colors gap-4 md:gap-0"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-400" />
            <span className="text-lg font-semibold text-white">v{entry.version}</span>
          </div>
          <Badge variant="info">{entry.title}</Badge>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span>{entry.date}</span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5 text-white/50" />
          </motion.div>
        </div>
      </motion.button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-4 pb-4 border-t border-white/10 pt-4">
              {entry.description && (
                <p className="text-white/70 text-sm mb-4">{entry.description}</p>
              )}

              <div className="space-y-4">
                {changeOrder.map((type) => {
                  const changes = groupedChanges[type];
                  if (!changes || changes.length === 0) return null;

                  const Icon = getChangeTypeIcon(type);
                  const colorClass = getChangeTypeColor(type);

                  return (
                    <div key={type}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${colorClass}`}>
                          <Icon className="w-3 h-3" />
                          {getChangeTypeLabel(type)}
                        </span>
                        <span className="text-white/40 text-xs">({changes.length})</span>
                      </div>
                      <ul className="space-y-1.5 ml-1">
                        {changes.map((change, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-white/30 mt-1">•</span>
                            <span className="text-white/80">
                              {change.component && (
                                <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs mr-1.5">
                                  {change.component}
                                </code>
                              )}
                              {change.description}
                              {change.breaking && (
                                <Badge variant="destructive" className="ml-2 text-[10px]">Breaking</Badge>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ChangelogApp({ windowState: _windowState }: ChangelogAppProps) {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set([changelog[0]?.version]));

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => {
      const next = new Set(prev);
      if (next.has(version)) {
        next.delete(version);
      } else {
        next.add(version);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedVersions(new Set(changelog.map(e => e.version)));
  };

  const collapseAll = () => {
    setExpandedVersions(new Set());
  };

  return (
    <div className="h-full flex flex-col bg-neutral-950">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-white/10 bg-neutral-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Changelog</h1>
              <p className="text-white/50 text-sm">All notable changes to Darwin UI</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              className="px-3 py-1.5 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded-md transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={expandAll}
            >
              Expand All
            </motion.button>
            <motion.button
              className="px-3 py-1.5 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded-md transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={collapseAll}
            >
              Collapse All
            </motion.button>
            <motion.a
              href="https://github.com/surajmandalcell/darwin-ui/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/60 hover:text-white/90 hover:bg-white/10 rounded-md transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-3 h-3" />
              GitHub Releases
            </motion.a>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-white/40">Latest:</span>
            <Badge variant="success">v{changelog[0]?.version}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40">Total Releases:</span>
            <span className="text-white/80">{changelog.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40">Components:</span>
            <span className="text-white/80">35+</span>
          </div>
        </div>
      </div>

      {/* Version List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {changelog.map((entry) => (
            <VersionCard
              key={entry.version}
              entry={entry}
              isExpanded={expandedVersions.has(entry.version)}
              onToggle={() => toggleVersion(entry.version)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ChangelogApp;
