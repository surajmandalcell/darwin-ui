"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DashboardShowcase from '../DashboardShowcase';

export function DashboardDemoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen py-24 px-4 relative">
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Build Real Interfaces</h2>
        <p className="text-lg text-white/50">See how Darwin UI components work together in a production dashboard.</p>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
          <DashboardShowcase />
        </div>
      </motion.div>
    </section>
  );
}
