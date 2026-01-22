"use client";

import { motion } from 'framer-motion';
import { DarwinLogo } from '../components/icons/DarwinLogo';
import { Button } from '@pikoloo/darwin-ui';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ComponentGridSection } from '../components/showcase/ComponentGridSection';
import { DashboardDemoSection } from '../components/showcase/DashboardDemoSection';

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 92, 246, 0.15), transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
                radial-gradient(ellipse 60% 40% at 20% 80%, rgba(236, 72, 153, 0.08), transparent 50%)
              `
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <DarwinLogo showBackground className="w-20 h-20 mx-auto mb-8" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Darwin UI
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            A macOS-inspired React component library with glass-morphism aesthetics,
            smooth animations, and dark theme by default.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://github.com/surajmandalcell/darwin-ui" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </Button>
            </a>
          </div>

          {/* Version badge */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-white/40">
              v1.3.0 — 36+ Components
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Component Grid Section */}
      <ComponentGridSection />

      {/* Dashboard Demo Section */}
      <DashboardDemoSection />
    </div>
  );
}
