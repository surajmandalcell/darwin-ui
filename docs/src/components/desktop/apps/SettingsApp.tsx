"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState, DesktopState } from '../../../contexts/desktop-context';
import { useDesktop } from '../../../contexts/desktop-context';

type WallpaperId = DesktopState['settings']['wallpaper'];
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Paintbrush,
  Gauge,
  Eye,
  Image,
  Info,
} from 'lucide-react';

interface SettingsAppProps {
  windowState: WindowState;
}

const settingsSections = [
  { id: 'appearance', name: 'Appearance', icon: <Palette className="w-4 h-4" /> },
  { id: 'wallpaper', name: 'Wallpaper', icon: <Image className="w-4 h-4" /> },
  { id: 'accent', name: 'Accent Color', icon: <Paintbrush className="w-4 h-4" /> },
  { id: 'animations', name: 'Animations', icon: <Gauge className="w-4 h-4" /> },
  { id: 'accessibility', name: 'Accessibility', icon: <Eye className="w-4 h-4" /> },
  { id: 'about', name: 'About', icon: <Info className="w-4 h-4" /> },
];

const accentColors = [
  { id: 'blue', name: 'Blue', color: '#3b82f6' },
  { id: 'purple', name: 'Purple', color: '#8b5cf6' },
  { id: 'pink', name: 'Pink', color: '#ec4899' },
  { id: 'red', name: 'Red', color: '#ef4444' },
  { id: 'orange', name: 'Orange', color: '#f97316' },
  { id: 'yellow', name: 'Yellow', color: '#eab308' },
  { id: 'green', name: 'Green', color: '#22c55e' },
  { id: 'cyan', name: 'Cyan', color: '#06b6d4' },
];

const wallpapers: { id: WallpaperId; name: string; gradient: string }[] = [
  { id: 'sonoma', name: 'Sonoma', gradient: 'bg-indigo-900' },
  { id: 'ventura', name: 'Ventura', gradient: 'bg-blue-900' },
  { id: 'monterey', name: 'Monterey', gradient: 'bg-purple-900' },
  { id: 'gradient', name: 'Minimal', gradient: 'bg-gray-900' },
];

export function SettingsApp({ windowState: _windowState }: SettingsAppProps) {
  const { state, updateSettings } = useDesktop();
  const [activeSection, setActiveSection] = useState('appearance');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [accentColor, setAccentColor] = useState('blue');
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', name: 'Light', icon: <Sun className="w-5 h-5" /> },
                  { id: 'dark', name: 'Dark', icon: <Moon className="w-5 h-5" /> },
                  { id: 'system', name: 'Auto', icon: <Monitor className="w-5 h-5" /> },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id as typeof theme)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      theme === option.id
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className={theme === option.id ? 'text-blue-400' : 'text-white/60'}>
                      {option.icon}
                    </div>
                    <span className={`text-sm ${theme === option.id ? 'text-blue-400' : 'text-white/70'}`}>
                      {option.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Sound Effects</h4>
                  <p className="text-sm text-white/50">Play sounds for interactions</p>
                </div>
                <button
                  onClick={() => setSoundEffects(!soundEffects)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    soundEffects ? 'bg-blue-500' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow"
                    animate={{ x: soundEffects ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'wallpaper':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Desktop Wallpaper</h3>
            <div className="grid grid-cols-2 gap-4">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => updateSettings({ wallpaper: wp.id })}
                  className={`aspect-video rounded-xl ${wp.gradient} transition-all ${
                    state.settings.wallpaper === wp.id
                      ? 'ring-2 ring-blue-500 scale-105'
                      : 'hover:scale-102 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="h-full flex items-end p-3">
                    <span className="text-xs font-medium text-white/80">{wp.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'accent':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
            <div className="grid grid-cols-4 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setAccentColor(color.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                    accentColor === color.id
                      ? 'bg-white/10'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full transition-transform ${
                      accentColor === color.id ? 'scale-125 ring-2 ring-white/50' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-xs text-white/60">{color.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'animations':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Animation Speed</h3>
              <div className="flex gap-2">
                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setAnimationSpeed(speed)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      animationSpeed === speed
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Reduce Motion</h4>
                  <p className="text-sm text-white/50">Minimize animations</p>
                </div>
                <button
                  onClick={() => setReduceMotion(!reduceMotion)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    reduceMotion ? 'bg-blue-500' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow"
                    animate={{ x: reduceMotion ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'accessibility':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Accessibility</h3>

            {[
              { name: 'Reduce Motion', desc: 'Minimize animations throughout the interface', enabled: reduceMotion, toggle: () => setReduceMotion(!reduceMotion) },
              { name: 'High Contrast', desc: 'Increase contrast for better visibility', enabled: false, toggle: () => {} },
              { name: 'Larger Text', desc: 'Use larger font sizes', enabled: false, toggle: () => {} },
            ].map((option) => (
              <div
                key={option.name}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div>
                  <h4 className="font-medium text-white">{option.name}</h4>
                  <p className="text-sm text-white/50">{option.desc}</p>
                </div>
                <button
                  onClick={option.toggle}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    option.enabled ? 'bg-blue-500' : 'bg-white/20'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow"
                    animate={{ x: option.enabled ? 26 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </motion.div>
        );

      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-blue-500 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">D</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Darwin UI</h2>
            <p className="text-white/50 mb-6">Version 1.0.0</p>

            <div className="space-y-2 text-sm text-white/60">
              <p>A beautiful, macOS-inspired React component library</p>
              <p>Built with React, TypeScript, and Framer Motion</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40">
                Made with love for the React community
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-neutral-900">
      {/* Sidebar */}
      <motion.div
        className="w-52 bg-neutral-950 border-r border-white/10 flex flex-col p-3"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <nav className="space-y-0.5">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {section.icon}
              <span>{section.name}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <div key={activeSection}>
            {renderContent()}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SettingsApp;
