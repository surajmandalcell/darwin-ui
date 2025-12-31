"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  Search,
  Plus,
  FileText,
  Trash2,
} from 'lucide-react';

interface NotesAppProps {
  windowState: WindowState;
}

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const STORAGE_KEY = 'darwin-ui-notes';

// Initial sample note
const defaultNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Notes',
    content: 'This is your first note. Start writing!',
    updatedAt: new Date().toISOString(),
  },
];

// Load notes from localStorage
const loadNotes = (): Note[] => {
  if (typeof window === 'undefined') return defaultNotes;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultNotes;
  } catch {
    return defaultNotes;
  }
};

// Save notes to localStorage
const saveNotes = (notes: Note[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Ignore storage errors
  }
};

export function NotesApp({ windowState: _windowState }: NotesAppProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    if (loaded.length > 0) {
      setSelectedNoteId(loaded[0].id);
    }
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveNotes(notes);
    }
  }, [notes, isLoaded]);

  // Get the currently selected note
  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  // Filter notes based on search
  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  // Create a new note
  const handleCreateNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  }, []);

  // Update note title
  const handleTitleChange = useCallback((title: string) => {
    if (!selectedNoteId) return;
    setNotes(prev => prev.map(note =>
      note.id === selectedNoteId
        ? { ...note, title, updatedAt: new Date().toISOString() }
        : note
    ));
  }, [selectedNoteId]);

  // Update note content
  const handleContentChange = useCallback((content: string) => {
    if (!selectedNoteId) return;
    setNotes(prev => prev.map(note =>
      note.id === selectedNoteId
        ? { ...note, content, updatedAt: new Date().toISOString() }
        : note
    ));
  }, [selectedNoteId]);

  // Delete a note
  const handleDeleteNote = useCallback((noteId: string) => {
    setNotes(prev => {
      const filtered = prev.filter(n => n.id !== noteId);
      // If we deleted the selected note, select the first available
      if (selectedNoteId === noteId) {
        setSelectedNoteId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  }, [selectedNoteId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  // Get preview text from content
  const getPreview = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(0, 2).join(' ').substring(0, 100) || 'No content';
  };

  return (
    <div className="flex h-full bg-neutral-900">
      {/* Notes List Sidebar */}
      <motion.div
        className="w-72 bg-neutral-950 border-r border-white/10 flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {/* Header with New Note button */}
        <div className="p-3 border-b border-white/10">
          <button
            onClick={handleCreateNote}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>

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

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-white/40 text-sm">
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                className={`relative group border-b border-white/5 ${
                  selectedNoteId === note.id
                    ? 'bg-yellow-500/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <button
                  onClick={() => setSelectedNoteId(note.id)}
                  className="w-full text-left p-3"
                >
                  <h3 className="font-medium text-white text-sm truncate pr-8">
                    {note.title || 'Untitled Note'}
                  </h3>
                  <p className="text-xs text-white/40 mt-1">
                    {formatDate(note.updatedAt)}
                  </p>
                  <p className="text-xs text-white/50 mt-1 line-clamp-2">
                    {getPreview(note.content)}
                  </p>
                </button>
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                  className="absolute top-3 right-3 p-1 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedNote ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNote.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Title input */}
              <div className="px-6 pt-6 pb-2">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Note title..."
                  className="w-full text-2xl font-bold text-white bg-transparent border-none outline-none placeholder:text-white/30"
                />
                <p className="text-xs text-white/40 mt-1">
                  Last edited {formatDate(selectedNote.updatedAt)}
                </p>
              </div>

              {/* Content textarea */}
              <div className="flex-1 px-6 pb-6 overflow-hidden">
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Start writing..."
                  className="w-full h-full text-white/80 bg-transparent border-none outline-none resize-none text-sm leading-relaxed placeholder:text-white/30"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">No note selected</p>
              <button
                onClick={handleCreateNote}
                className="text-yellow-500 hover:text-yellow-400 text-sm"
              >
                Create a new note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesApp;
