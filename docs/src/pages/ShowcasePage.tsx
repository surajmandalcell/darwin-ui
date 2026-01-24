"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { DarwinLogo } from '../components/icons/DarwinLogo';
import { Button } from '@pikoloo/darwin-ui';
import { ArrowRight, Github, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ComponentShowcaseSection } from '../components/showcase/ComponentShowcaseSection';
import { DashboardDemoSection } from '../components/showcase/DashboardDemoSection';
import { AgenticCodingSection } from '../components/showcase/AgenticCodingSection';
import { UnifiedNavbar } from '../components/UnifiedNavbar';
import { HeroComponentPreview } from '../components/showcase/HeroComponentPreview';
import { useRef } from 'react';

export default function ShowcasePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <UnifiedNavbar />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen relative flex items-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-200 h-200 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              top: '-20%',
              right: '-10%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-150 h-150 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
              bottom: '-10%',
              left: '-5%',
            }}
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-100 h-100 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
              top: '40%',
              left: '30%',
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }} />
        </div>

        <motion.div
          className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 lg:px-20"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">
            {/* Left side - Text content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/30 border border-border/60 text-muted-foreground backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  v1.3.0 — 36+ Components
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em] font-heading">
                  <span className="block text-foreground">Build</span>
                  <span className="block bg-linear-to-r from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent">
                    beautiful
                  </span>
                  <span className="block text-muted-foreground/50">interfaces.</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                A macOS-inspired React component library. Glass-morphism, spring animations, dark theme. Built for developers who care about design.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/docs">
                  <Button size="lg" className="group h-12 px-6 text-sm font-medium">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="https://github.com/surajmandalcell/darwin-ui" target="_blank" rel="noopener noreferrer">
                  <button type="button" className="h-12 px-6 text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-lg transition-all flex items-center gap-2 hover:bg-muted/20">
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </button>
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-10 pt-8 border-t border-border/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  { value: '36+', label: 'Components' },
                  { value: '100%', label: 'TypeScript' },
                  { value: '<5kb', label: 'Per component' },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <HeroComponentPreview />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-px h-8 bg-linear-to-b from-muted-foreground/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Feature highlights */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-28 px-6 md:px-12 lg:px-20 relative">
        <div className="max-w-350 mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[
              {
                title: 'Glass Morphism',
                desc: 'Frosted glass effects with depth and translucency that feel native to macOS.',
                gradient: 'from-violet-500/20 to-indigo-500/5',
              },
              {
                title: 'Spring Physics',
                desc: 'Buttery smooth animations powered by Framer Motion with natural spring physics.',
                gradient: 'from-cyan-500/20 to-emerald-500/5',
              },
              {
                title: 'Dark by Default',
                desc: 'Designed for dark interfaces first. Every component looks stunning in the dark.',
                gradient: 'from-pink-500/20 to-orange-500/5',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group relative bg-muted/20 border border-border/60 rounded-2xl p-8 hover:bg-muted/40 hover:border-border transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-foreground mb-3 font-heading">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Component Grid Section */}
      <ComponentShowcaseSection />

      {/* Dashboard Demo Section */}
      <DashboardDemoSection />

      {/* Agentic Coding Section */}
      <AgenticCodingSection />

      {/* Footer */}
      <footer>
        {/* Top CTA Section */}
        <div className="pt-0 pb-48 px-6 md:px-12 lg:px-20">
          <div className="max-w-350 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                Ready to build something beautiful?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Start using Darwin UI in your projects today. Free, open source, and designed for developers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/docs">
                  <Button size="lg" className="group h-12 px-8 text-sm font-medium">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="https://github.com/surajmandalcell/darwin-ui" target="_blank" rel="noopener noreferrer">
                  <button type="button" className="h-12 px-8 text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-lg transition-all flex items-center gap-2 hover:bg-muted/20">
                    <Github className="w-4 h-4" />
                    Star on GitHub
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 py-8 px-6 md:px-12 lg:px-20">
          <div className="max-w-350 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <DarwinLogo className="w-6 h-6" />
              <span className="text-muted-foreground text-sm">Darwin UI</span>
              <span className="text-muted-foreground/50 text-sm">·</span>
              <span className="text-muted-foreground/50 text-xs">Open source under MIT</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/docs" className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors">Docs</Link>
              <Link to="/changelog" className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors">Changelog</Link>
              <a href="https://github.com/surajmandalcell/darwin-ui" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors">GitHub</a>
              <a href="https://twitter.com/surajmandalcell" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
