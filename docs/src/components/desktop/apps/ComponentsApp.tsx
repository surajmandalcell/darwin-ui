"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  LayoutGrid,
  List,
  Columns,
  Search,
  ChevronRight,
  FormInput,
  ToggleLeft,
  Square,
  Sliders,
  MessageSquare,
  Bell,
  Layers,
  MousePointer,
  PanelTop,
} from 'lucide-react';

interface ComponentsAppProps {
  windowState: WindowState;
}

type ViewMode = 'grid' | 'list' | 'columns';

const categories = [
  { id: 'all', name: 'All Components', icon: <Layers className="w-4 h-4" />, count: 15 },
  { id: 'form', name: 'Form', icon: <FormInput className="w-4 h-4" />, count: 6 },
  { id: 'feedback', name: 'Feedback', icon: <MessageSquare className="w-4 h-4" />, count: 4 },
  { id: 'layout', name: 'Layout', icon: <PanelTop className="w-4 h-4" />, count: 3 },
  { id: 'overlay', name: 'Overlay', icon: <Layers className="w-4 h-4" />, count: 2 },
];

const components = [
  { id: 'button', name: 'Button', category: 'form', icon: <MousePointer className="w-5 h-5" />, description: 'Interactive button with multiple variants', color: 'bg-blue-500' },
  { id: 'input', name: 'Input', category: 'form', icon: <FormInput className="w-5 h-5" />, description: 'Text input with validation states', color: 'bg-green-500' },
  { id: 'checkbox', name: 'Checkbox', category: 'form', icon: <Square className="w-5 h-5" />, description: 'Checkable input for boolean values', color: 'bg-purple-500' },
  { id: 'toggle', name: 'Toggle', category: 'form', icon: <ToggleLeft className="w-5 h-5" />, description: 'Switch between on and off states', color: 'bg-orange-500' },
  { id: 'select', name: 'Select', category: 'form', icon: <ChevronRight className="w-5 h-5" />, description: 'Dropdown selection component', color: 'bg-cyan-500' },
  { id: 'slider', name: 'Slider', category: 'form', icon: <Sliders className="w-5 h-5" />, description: 'Range input for numeric values', color: 'bg-pink-500' },
  { id: 'alert', name: 'Alert', category: 'feedback', icon: <Bell className="w-5 h-5" />, description: 'Display important messages', color: 'bg-red-500' },
  { id: 'toast', name: 'Toast', category: 'feedback', icon: <MessageSquare className="w-5 h-5" />, description: 'Brief notification popups', color: 'bg-yellow-500' },
  { id: 'tooltip', name: 'Tooltip', category: 'feedback', icon: <MessageSquare className="w-5 h-5" />, description: 'Contextual information on hover', color: 'bg-indigo-500' },
  { id: 'progress', name: 'Progress', category: 'feedback', icon: <Sliders className="w-5 h-5" />, description: 'Visual progress indicators', color: 'bg-teal-500' },
  { id: 'window', name: 'Window', category: 'layout', icon: <PanelTop className="w-5 h-5" />, description: 'macOS-style window container', color: 'bg-gray-500' },
  { id: 'card', name: 'Card', category: 'layout', icon: <Square className="w-5 h-5" />, description: 'Content container with styling', color: 'bg-slate-500' },
  { id: 'tabs', name: 'Tabs', category: 'layout', icon: <Layers className="w-5 h-5" />, description: 'Tabbed content navigation', color: 'bg-violet-500' },
  { id: 'modal', name: 'Modal', category: 'overlay', icon: <Layers className="w-5 h-5" />, description: 'Dialog overlay component', color: 'bg-fuchsia-500' },
  { id: 'popover', name: 'Popover', category: 'overlay', icon: <MessageSquare className="w-5 h-5" />, description: 'Floating content container', color: 'bg-rose-500' },
];

export function ComponentsApp({ windowState: _windowState }: ComponentsAppProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const filteredComponents = components.filter((comp) => {
    const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full bg-neutral-900">
      {/* Finder-style Sidebar */}
      <motion.div
        className="w-48 bg-neutral-800 border-r border-white/10 flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="p-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Categories
        </div>
        <nav className="flex-1 px-2 space-y-0.5">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-white/70 hover:bg-white/5'
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              {cat.icon}
              <span className="flex-1 text-left">{cat.name}</span>
              <span className="text-xs text-white/40">{cat.count}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2 bg-neutral-900 border-b border-white/10">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-white/5 rounded-md p-0.5">
            {[
              { mode: 'grid' as const, icon: <LayoutGrid className="w-4 h-4" /> },
              { mode: 'list' as const, icon: <List className="w-4 h-4" /> },
              { mode: 'columns' as const, icon: <Columns className="w-4 h-4" /> },
            ].map(({ mode, icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === mode
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Components Grid/List */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${viewMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 lg:grid-cols-3 gap-4'
                  : viewMode === 'list'
                  ? 'space-y-2'
                  : 'grid grid-cols-4 gap-3'
              }
            >
              {filteredComponents.map((comp, index) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedComponent(comp.id)}
                  className={`cursor-pointer rounded-xl border transition-all ${
                    selectedComponent === comp.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  } ${viewMode === 'list' ? 'flex items-center gap-4 p-3' : 'p-4'}`}
                >
                  {/* Icon */}
                  <div
                    className={`${
                      viewMode === 'columns' ? 'w-10 h-10' : 'w-12 h-12'
                    } rounded-xl ${comp.color} flex items-center justify-center text-white ${
                      viewMode === 'list' ? '' : 'mb-3'
                    }`}
                  >
                    {comp.icon}
                  </div>

                  {/* Info */}
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <h3 className="font-medium text-white text-sm">{comp.name}</h3>
                    {viewMode !== 'columns' && (
                      <p className="text-xs text-white/50 mt-1 line-clamp-2">
                        {comp.description}
                      </p>
                    )}
                  </div>

                  {viewMode === 'list' && (
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredComponents.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-white/40">
              <Search className="w-8 h-8 mb-2" />
              <p>No components found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComponentsApp;
