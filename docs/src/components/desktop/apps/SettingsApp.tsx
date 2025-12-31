"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Paintbrush,
  Gauge,
  Eye,
  Info,
  Apple,
} from 'lucide-react';

interface SettingsAppProps {
  windowState: WindowState;
}

const settingsSections = [
  { id: 'appearance', name: 'Appearance', icon: <Palette className="w-4 h-4" /> },
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

// Animation variants for content transitions
const contentVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
} as const;

const staggerContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
} as const;

const staggerItemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
} as const;

// Custom Toggle Switch Component with spring animation and overshoot
interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
}

function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
        enabled ? 'bg-blue-500' : 'bg-white/20'
      }`}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
        initial={false}
        animate={{
          x: enabled ? 26 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
          mass: 0.8,
        }}
        whileHover={{ scale: 1.05 }}
      />
      {/* Glow effect when enabled */}
      <AnimatePresence>
        {enabled && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Custom Animated Slider Component with value indicator
interface AnimatedSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

function AnimatedSlider({ value, onChange, min = 0, max = 100, label }: AnimatedSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative pt-2 pb-2">
      {label && (
        <div className="flex justify-between mb-3">
          <span className="text-sm text-white/70">{label}</span>
          <span className="text-sm text-white/50">{value}%</span>
        </div>
      )}
      <div className="relative h-2">
        {/* Track background */}
        <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden">
          {/* Filled track with smooth animation */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Input slider (invisible, for interaction) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => { setIsDragging(true); setShowTooltip(true); }}
          onMouseUp={() => { setIsDragging(false); setShowTooltip(false); }}
          onMouseLeave={() => setShowTooltip(false)}
          onMouseEnter={() => isDragging && setShowTooltip(true)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />

        {/* Animated thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
          animate={{
            scale: isDragging ? 1.2 : 1,
            boxShadow: isDragging
              ? '0 0 20px rgba(59, 130, 246, 0.5)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />

        {/* Value tooltip that appears above thumb on drag */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute -top-8 bg-neutral-800 text-white text-xs px-2 py-1 rounded pointer-events-none"
              style={{ left: `calc(${percentage}% - 16px)` }}
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {value}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Animated Card Component with hover lift and press effects
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function AnimatedCard({ children, className = '', onClick }: AnimatedCardProps) {
  return (
    <motion.div
      className={`bg-white/5 rounded-xl backdrop-blur-sm ${className}`}
      initial={{ scale: 1, y: 0 }}
      whileHover={{
        scale: 1.01,
        y: -2,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.07)'
      }}
      whileTap={onClick ? { scale: 0.99, y: 0 } : undefined}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

export function SettingsApp({ windowState: _windowState }: SettingsAppProps) {
  const [activeSection, setActiveSection] = useState('appearance');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [accentColor, setAccentColor] = useState('blue');
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [transparency, setTransparency] = useState(80);
  const [fontSize, setFontSize] = useState(100);

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return (
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={staggerItemVariants}>
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', name: 'Light', icon: <Sun className="w-5 h-5" /> },
                  { id: 'dark', name: 'Dark', icon: <Moon className="w-5 h-5" /> },
                  { id: 'system', name: 'Auto', icon: <Monitor className="w-5 h-5" /> },
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setTheme(option.id as typeof theme)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                      theme === option.id
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-white/5 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <motion.div
                      className={theme === option.id ? 'text-blue-400' : 'text-white/60'}
                      animate={{ rotate: theme === option.id ? [0, -10, 10, 0] : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {option.icon}
                    </motion.div>
                    <span className={`text-sm ${theme === option.id ? 'text-blue-400' : 'text-white/70'}`}>
                      {option.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItemVariants}>
              <AnimatedSlider
                value={transparency}
                onChange={setTransparency}
                label="Window Transparency"
              />
            </motion.div>

            <motion.div
              variants={staggerItemVariants}
              className="pt-4 border-t border-white/10"
            >
              <AnimatedCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Sound Effects</h4>
                    <p className="text-sm text-white/50">Play sounds for interactions</p>
                  </div>
                  <ToggleSwitch enabled={soundEffects} onToggle={() => setSoundEffects(!soundEffects)} />
                </div>
              </AnimatedCard>
            </motion.div>
          </motion.div>
        );

      case 'accent':
        return (
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <motion.h3
              variants={staggerItemVariants}
              className="text-lg font-semibold text-white mb-4"
            >
              Accent Color
            </motion.h3>
            <div className="grid grid-cols-4 gap-3">
              {accentColors.map((color, index) => (
                <motion.button
                  key={color.id}
                  variants={staggerItemVariants}
                  custom={index}
                  onClick={() => setAccentColor(color.id)}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                    accentColor === color.id
                      ? 'bg-white/10'
                      : ''
                  }`}
                  whileHover={{ scale: 1.08, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full shadow-lg"
                    style={{ backgroundColor: color.color }}
                    animate={{
                      scale: accentColor === color.id ? 1.2 : 1,
                      boxShadow: accentColor === color.id
                        ? `0 0 20px ${color.color}60`
                        : '0 2px 8px rgba(0, 0, 0, 0.3)'
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                  <span className="text-xs text-white/60">{color.name}</span>
                  {accentColor === color.id && (
                    <motion.div
                      className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                      layoutId="accent-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 'animations':
        return (
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={staggerItemVariants}>
              <h3 className="text-lg font-semibold text-white mb-4">Animation Speed</h3>
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                  <motion.button
                    key={speed}
                    onClick={() => setAnimationSpeed(speed)}
                    className={`relative flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                      animationSpeed === speed
                        ? 'text-white'
                        : 'text-white/70'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {animationSpeed === speed && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500 rounded-lg"
                        layoutId="speed-indicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItemVariants}>
              <AnimatedSlider
                value={fontSize}
                onChange={setFontSize}
                min={80}
                max={120}
                label="Interface Scale"
              />
            </motion.div>

            <motion.div
              variants={staggerItemVariants}
              className="pt-4 border-t border-white/10"
            >
              <AnimatedCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Reduce Motion</h4>
                    <p className="text-sm text-white/50">Minimize animations</p>
                  </div>
                  <ToggleSwitch enabled={reduceMotion} onToggle={() => setReduceMotion(!reduceMotion)} />
                </div>
              </AnimatedCard>
            </motion.div>

            {/* Animation preview */}
            <motion.div variants={staggerItemVariants}>
              <AnimatedCard className="p-4">
                <h4 className="font-medium text-white mb-3">Preview</h4>
                <div className="flex gap-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 bg-blue-500/30 rounded-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: animationSpeed === 'slow' ? 2 : animationSpeed === 'fast' ? 0.5 : 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </AnimatedCard>
            </motion.div>
          </motion.div>
        );

      case 'accessibility':
        return (
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <motion.h3
              variants={staggerItemVariants}
              className="text-lg font-semibold text-white mb-4"
            >
              Accessibility
            </motion.h3>

            {[
              { name: 'Reduce Motion', desc: 'Minimize animations throughout the interface', enabled: reduceMotion, toggle: () => setReduceMotion(!reduceMotion) },
              { name: 'High Contrast', desc: 'Increase contrast for better visibility', enabled: false, toggle: () => {} },
              { name: 'Larger Text', desc: 'Use larger font sizes', enabled: false, toggle: () => {} },
            ].map((option, index) => (
              <motion.div
                key={option.name}
                variants={staggerItemVariants}
                custom={index}
              >
                <AnimatedCard className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{option.name}</h4>
                      <p className="text-sm text-white/50">{option.desc}</p>
                    </div>
                    <ToggleSwitch enabled={option.enabled} onToggle={option.toggle} />
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'about':
        return (
          <motion.div
            variants={staggerContainerVariants}
            initial="initial"
            animate="animate"
            className="text-center py-8"
          >
            <motion.div
              variants={staggerItemVariants}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/[0.08] flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <motion.div
                animate={{
                  filter: ['drop-shadow(0 0 10px rgba(59, 130, 246, 0))', 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))', 'drop-shadow(0 0 10px rgba(59, 130, 246, 0))']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Apple className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
            <motion.h2
              variants={staggerItemVariants}
              className="text-2xl font-bold text-white mb-1"
            >
              Darwin UI
            </motion.h2>
            <motion.p
              variants={staggerItemVariants}
              className="text-white/50 mb-6"
            >
              Version 1.0.0
            </motion.p>

            <motion.div
              variants={staggerItemVariants}
              className="space-y-2 text-sm text-white/60"
            >
              <p>A beautiful, macOS-inspired React component library</p>
              <p>Built with React, TypeScript, and Framer Motion</p>
            </motion.div>

            <motion.div
              variants={staggerItemVariants}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <motion.p
                className="text-xs text-white/40"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Made with love for the React community
              </motion.p>
            </motion.div>
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
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <nav className="space-y-0.5">
          {settingsSections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                activeSection === section.id
                  ? 'text-blue-400'
                  : 'text-white/70'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Active indicator bar - slides in from left */}
              {activeSection === section.id && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full"
                  layoutId="sidebar-indicator"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Background highlight */}
              {activeSection === section.id && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 rounded-lg"
                  layoutId="sidebar-highlight"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <motion.span
                animate={{
                  scale: activeSection === section.id ? 1.1 : 1,
                  color: activeSection === section.id ? '#60a5fa' : 'rgba(255, 255, 255, 0.7)'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {section.icon}
              </motion.span>
              <span className="relative z-10">{section.name}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SettingsApp;
