"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Grid,
  Maximize2,
  Share2,
} from 'lucide-react';
import { Button, Input, Checkbox, Switch } from '@smc/darwin-ui';

interface PreviewAppProps {
  windowState: WindowState;
}

interface Slide {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  color: string;
}

const slides: Slide[] = [
  {
    id: 'button',
    title: 'Button',
    description: 'Beautiful buttons with multiple variants and states',
    color: 'bg-blue-600',
    component: (
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
  },
  {
    id: 'input',
    title: 'Input',
    description: 'Text inputs with validation and placeholder states',
    color: 'bg-green-600',
    component: (
      <div className="space-y-3 w-64">
        <Input placeholder="Enter your name..." />
        <Input placeholder="Enter email..." type="email" />
        <Input placeholder="Disabled" disabled />
      </div>
    ),
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'macOS-style checkboxes with smooth animations',
    color: 'bg-purple-600',
    component: (
      <div className="space-y-3">
        <Checkbox label="Enable notifications" defaultChecked />
        <Checkbox label="Send email updates" />
        <Checkbox label="Remember my choice" defaultChecked />
      </div>
    ),
  },
  {
    id: 'switch',
    title: 'Switch',
    description: 'Smooth toggle switches for boolean options',
    color: 'bg-orange-600',
    component: (
      <div className="space-y-4">
        <div className="flex items-center justify-between w-48">
          <span className="text-white/80">Dark mode</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between w-48">
          <span className="text-white/80">Notifications</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between w-48">
          <span className="text-white/80">Auto-save</span>
          <Switch defaultChecked />
        </div>
      </div>
    ),
  },
];

export function PreviewApp({ windowState: _windowState }: PreviewAppProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const currentSlide = slides[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, goToNext]);

  return (
    <div className="flex flex-col h-full bg-neutral-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded transition-colors ${
              showGrid ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-sm text-white/60">
          {currentIndex + 1} / {slides.length}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showGrid ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 p-4 overflow-y-auto"
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {slides.map((slide, idx) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowGrid(false);
                    }}
                    className={`aspect-video rounded-xl ${slide.color} p-4 flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${
                      currentIndex === idx ? 'ring-2 ring-white' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="text-white/90 font-semibold">{slide.title}</div>
                    <div className="text-xs text-white/60 mt-1 line-clamp-2">
                      {slide.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`absolute inset-0 flex flex-col items-center justify-center ${currentSlide.color}`}
            >
              {/* Title */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentSlide.title}
                </h2>
                <p className="text-white/70">{currentSlide.description}</p>
              </motion.div>

              {/* Component Preview */}
              <motion.div
                className="p-8 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-white/10 shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                {currentSlide.component}
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex items-center justify-center gap-2 p-3 bg-neutral-900 border-t border-white/10">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`w-16 h-10 rounded-md ${slide.color} transition-all ${
              currentIndex === idx
                ? 'ring-2 ring-white scale-110'
                : 'opacity-60 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewApp;
