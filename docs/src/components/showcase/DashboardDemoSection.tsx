"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DashboardShowcase from '../DashboardShowcase';

export function DashboardDemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen py-16 md:py-20 lg:py-24 xl:py-28 px-4 relative">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 text-xs font-medium bg-white/[0.03] border border-white/[0.06] rounded-full text-white/50 mb-4">
          Real World Example
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Build Production Interfaces</h2>
        <p className="text-lg text-white/40 max-w-2xl mx-auto">
          See how Darwin UI components come together in a complete dashboard application.
        </p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Wrapper with horizontal scroll for small screens */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="min-w-[320px] sm:min-w-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <DashboardShowcase />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
