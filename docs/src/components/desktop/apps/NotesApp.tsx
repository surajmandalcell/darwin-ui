"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  Search,
  Plus,
  Folder,
  FileText,
  Star,
  Clock,
  Bold,
  Italic,
  List,
  Code2,
  Link,
} from 'lucide-react';

interface NotesAppProps {
  windowState: WindowState;
}

interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  starred: boolean;
  updatedAt: Date;
}

const defaultNotes: Note[] = [
  {
    id: '1',
    title: 'Quick Reference',
    folder: 'darwin-ui',
    starred: true,
    updatedAt: new Date(),
    content: `# Darwin UI Quick Reference

## Installation
\`\`\`bash
npm install @smc/darwin-ui
\`\`\`

## Basic Usage
\`\`\`tsx
import { Button, Input, Window } from '@smc/darwin-ui';
\`\`\`

## Components
- Button - Interactive buttons with variants
- Input - Text input fields
- Checkbox - Boolean checkboxes
- Toggle - On/off switches
- Select - Dropdown selects
- Slider - Range inputs
- Window - macOS-style windows
- Alert - Message alerts
- Toast - Notification toasts`,
  },
  {
    id: '2',
    title: 'Keyboard Shortcuts',
    folder: 'darwin-ui',
    starred: false,
    updatedAt: new Date(Date.now() - 86400000),
    content: `# Keyboard Shortcuts

## Desktop
- **Cmd + K** - Open Spotlight search
- **Cmd + W** - Close window
- **Cmd + M** - Minimize window
- **Cmd + Q** - Quit app

## Editor
- **Cmd + S** - Save
- **Cmd + Z** - Undo
- **Cmd + Shift + Z** - Redo
- **Cmd + C** - Copy
- **Cmd + V** - Paste`,
  },
  {
    id: '3',
    title: 'Common Patterns',
    folder: 'examples',
    starred: true,
    updatedAt: new Date(Date.now() - 172800000),
    content: `# Common Patterns

## Form with Validation
\`\`\`tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={error}
  placeholder="Enter email"
/>
\`\`\`

## Modal Dialog
\`\`\`tsx
<Window
  title="Confirm Action"
  isOpen={showModal}
  onClose={() => setShowModal(false)}
>
  <p>Are you sure?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Window>
\`\`\``,
  },
];

const folders = [
  { id: 'all', name: 'All Notes', icon: <FileText className="w-4 h-4" /> },
  { id: 'darwin-ui', name: 'Darwin UI', icon: <Folder className="w-4 h-4" /> },
  { id: 'examples', name: 'Examples', icon: <Folder className="w-4 h-4" /> },
  { id: 'starred', name: 'Starred', icon: <Star className="w-4 h-4" /> },
  { id: 'recent', name: 'Recent', icon: <Clock className="w-4 h-4" /> },
];

export function NotesApp({ windowState: _windowState }: NotesAppProps) {
  const [notes] = useState<Note[]>(defaultNotes);
  const [activeFolder, setActiveFolder] = useState('all');
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter((note) => {
    const matchesFolder =
      activeFolder === 'all' ||
      (activeFolder === 'starred' && note.starred) ||
      (activeFolder === 'recent') ||
      note.folder === activeFolder;

    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-full bg-neutral-900">
      {/* Folders Sidebar */}
      <motion.div
        className="w-44 bg-neutral-950 border-r border-white/10 flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="p-3">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-md text-sm transition-colors">
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-0.5">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeFolder === folder.id
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {folder.icon}
              <span>{folder.name}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Notes List */}
      <motion.div
        className="w-64 bg-neutral-900 border-r border-white/10 flex flex-col"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Search */}
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <motion.button
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`w-full text-left p-3 border-b border-white/5 transition-colors ${
                selectedNote?.id === note.id
                  ? 'bg-yellow-500/10'
                  : 'hover:bg-white/5'
              }`}
              whileHover={{ x: 2 }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-white text-sm truncate">
                  {note.title}
                </h3>
                {note.starred && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />}
              </div>
              <p className="text-xs text-white/40 mt-1">
                {formatDate(note.updatedAt)}
              </p>
              <p className="text-xs text-white/50 mt-1 line-clamp-2">
                {note.content}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Note Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedNote ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border-b border-white/10">
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
                <List className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Code2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
                <Link className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNote.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="prose prose-invert prose-sm max-w-none"
                >
                  <h1 className="text-2xl font-bold text-white mb-4">
                    {selectedNote.title}
                  </h1>
                  <div className="whitespace-pre-wrap text-white/80 font-mono text-sm leading-relaxed">
                    {selectedNote.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a note to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesApp;
