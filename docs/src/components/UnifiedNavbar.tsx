"use client";

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Monitor, BookOpen, History, Gauge, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarwinLogo } from './icons/DarwinLogo';
import { useAnimationSpeed } from '../contexts/animation-speed-context';
import { useTheme } from '../contexts/theme-context';

const navItems = [
  { path: '/desktop', label: 'Desktop', icon: Monitor },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/changelog', label: 'Changelog', icon: History },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center w-7 h-7 rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 text-foreground/60" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-foreground/60" />
      )}
    </button>
  );
}

export function UnifiedNavbar() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isDesktop = location.pathname === '/desktop' || location.pathname.startsWith('/desktop/');

  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (isDesktop) return null;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Homepage: same layout, fixed position, no bg/border, hover reveal
  if (isHomepage) {
    return (
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center px-4 gap-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/"
          className="flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <DarwinLogo className="w-5 h-5" />
        </Link>

        <AnimatePresence>
          {isHovered && navItems.map(({ path, label, icon: Icon }, index) => {
            const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

            return (
              <motion.div
                key={path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link
                  to={path}
                  className={`
                    relative flex items-center gap-2 text-sm transition-colors pb-[11px] pt-[11px]
                    ${isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/60 rounded-t-full" />
                  )}
                </Link>
              </motion.div>
            );
          })}
          {isHovered && (
            <motion.div
              key="theme-toggle"
              className="ml-auto"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{
                duration: 0.2,
                delay: navItems.length * 0.04,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <ThemeToggle />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // Docs/Changelog: same layout with bg/border
  const { speed, setSpeed } = useAnimationSpeed();

  return (
    <nav className="flex-shrink-0 h-10 bg-card border-b border-border flex items-center px-4 gap-6">
      <Link
        to="/"
        className="flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
      >
        <DarwinLogo className="w-5 h-5" />
      </Link>

      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

        return (
          <Link
            key={path}
            to={path}
            className={`
              relative flex items-center gap-2 text-sm transition-colors pb-[11px] pt-[11px]
              ${isActive
                ? 'text-foreground'
                : 'text-foreground/50 hover:text-foreground/80'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/60 rounded-t-full" />
            )}
          </Link>
        );
      })}

      {/* Controls */}
      <div className="ml-auto flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Animation Speed Control */}
        <div className="flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5 text-foreground/30" />
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-16 h-1 bg-foreground/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground/60 [&::-webkit-slider-thumb]:hover:bg-foreground/80 [&::-webkit-slider-thumb]:transition-colors"
            title={`Animation speed: ${speed}x`}
          />
          <span className="text-[10px] text-foreground/40 w-6 tabular-nums">{speed}x</span>
        </div>
      </div>
    </nav>
  );
}
