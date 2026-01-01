"use client";

import { motion } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import { Apple, ExternalLink, Github, Heart } from 'lucide-react';

interface AboutAppProps {
  windowState: WindowState;
}

export function AboutApp({ windowState: _windowState }: AboutAppProps) {
  return (
    <div className="h-full bg-neutral-900 flex items-center justify-center p-8">
      <motion.div
        className="flex flex-col items-center text-center max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-xl"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', damping: 15 }}
        >
          <Apple className="w-12 h-12 text-white" />
        </motion.div>

        {/* App Name */}
        <motion.h1
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Darwin UI
        </motion.h1>

        {/* Version */}
        <motion.p
          className="text-sm text-white/50 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Version 1.3.0
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm text-white/70 mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          A macOS-inspired React component library for building beautiful, modern interfaces with glassmorphism aesthetics.
        </motion.p>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech, i) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-white/10 mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
        />

        {/* Credits */}
        <motion.div
          className="text-xs text-white/40 mb-6 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400" /> by Suraj Mandal
          </p>
        </motion.div>

        {/* GitHub Link */}
        <motion.a
          href="https://github.com/surajmandalcell/darwin-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/80 hover:text-white transition-colors border border-white/10"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Github className="w-4 h-4" />
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3 text-white/40" />
        </motion.a>

        {/* Copyright */}
        <motion.p
          className="mt-6 text-[10px] text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Copyright 2024-2025 Darwin UI. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AboutApp;
