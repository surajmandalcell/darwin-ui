"use client";

import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Monitor, BookOpen, History } from 'lucide-react';
import { DarwinLogo } from './icons/DarwinLogo';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/desktop', label: 'Desktop', icon: Monitor },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/changelog', label: 'Changelog', icon: History },
];

export function HomepageNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Stay visible for 1.5 seconds after hover away
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 1500);
  }, []);

  return (
    <nav
      className="flex-shrink-0 h-10 bg-neutral-900 border-b border-white/10 flex items-center px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo - always visible, in same position as first nav item */}
      <Link
        to="/"
        className="flex items-center justify-center text-white/70 hover:text-white transition-colors mr-4"
      >
        <DarwinLogo className="w-5 h-5" />
      </Link>

      {/* Nav items - expand from logo on hover */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex items-center gap-6 overflow-hidden"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <Link
                    to={item.path}
                    className="relative flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors pb-[11px] pt-[11px]"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default HomepageNavbar;
