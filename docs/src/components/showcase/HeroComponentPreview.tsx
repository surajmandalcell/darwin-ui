"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Badge, Switch, Slider, Progress } from '@pikoloo/darwin-ui';
import { DarwinLogo } from '../icons/DarwinLogo';
import { FloatingElement } from './FloatingElement';

interface ComponentShowcase {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

const componentShowcases: ComponentShowcase[] = [
  {
    id: 'buttons',
    label: 'Buttons',
    render: () => (
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
        <Button variant="destructive" size="sm">Delete</Button>
      </div>
    ),
  },
  {
    id: 'inputs',
    label: 'Controls',
    render: () => (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/50">Dark Mode</span>
          <Switch defaultChecked />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-white/50">Volume</span>
          <Slider defaultValue={65} max={100} step={1} className="w-full" />
        </div>
        <div className="space-y-2">
          <span className="text-xs text-white/50">Progress</span>
          <Progress value={72} className="h-2" />
        </div>
      </div>
    ),
  },
  {
    id: 'badges',
    label: 'Badges',
    render: () => (
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    ),
  },
];

export function HeroComponentPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-rotation after 8 seconds
    setTimeout(() => setIsPaused(false), 8000);
  }, []);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % componentShowcases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative">
      {/* Main card */}
      <FloatingElement pattern="figure8" depth={2} duration={8}>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <DarwinLogo showBackground className="w-10 h-10" />
            <div>
              <div className="text-sm font-medium text-white">Darwin UI</div>
              <div className="text-xs text-white/40">Component Library</div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="p-1 bg-white/[0.02] rounded-lg mb-4">
            <div className="flex gap-1">
              {componentShowcases.map((showcase, index) => (
                <button
                  key={showcase.id}
                  onClick={() => handleTabClick(index)}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    activeIndex === index
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {showcase.label}
                </button>
              ))}
            </div>
          </div>

          {/* Component showcase area */}
          <div className="min-h-[120px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={componentShowcases[activeIndex].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {componentShowcases[activeIndex].render()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </FloatingElement>

      {/* Floating user avatar card - top right */}
      <FloatingElement
        pattern="orbit"
        depth={3}
        duration={6}
        delay={0.5}
        className="absolute -top-6 -right-6"
      >
        <div className="bg-white/[0.03] backdrop-blur border border-white/[0.08] rounded-xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white">
              JD
            </div>
            <div className="text-xs">
              <div className="text-white/80">John Doe</div>
              <div className="text-white/30">Online</div>
            </div>
          </div>
        </div>
      </FloatingElement>

      {/* Floating build status card - bottom left */}
      <FloatingElement
        pattern="drift"
        depth={1}
        duration={7}
        delay={1}
        className="absolute -bottom-4 -left-8"
      >
        <div className="bg-white/[0.03] backdrop-blur border border-white/[0.08] rounded-xl p-3 px-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/60">Build passing</span>
          </div>
        </div>
      </FloatingElement>
    </div>
  );
}

export default HeroComponentPreview;
