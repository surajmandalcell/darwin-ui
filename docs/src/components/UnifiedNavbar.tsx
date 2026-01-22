"use client";

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Monitor, BookOpen, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarwinLogo } from './icons/DarwinLogo';

const navItems = [
  { path: '/desktop', label: 'Desktop', icon: Monitor },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/changelog', label: 'Changelog', icon: History },
];

export function UnifiedNavbar() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isDesktop = location.pathname === '/desktop' || location.pathname.startsWith('/desktop/');

  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Don't render on desktop route (MenuBar handles navigation)
  if (isDesktop) return null;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Keep items visible for 500ms after hover ends
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Homepage: same layout, no background/border, hover-reveal nav items
  if (isHomepage) {
    return (
      <nav
        className="flex-shrink-0 h-10 flex items-center px-4 gap-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo - links to home */}
        <Link
          to="/"
          className="flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <DarwinLogo className="w-5 h-5" />
        </Link>

        {/* Nav items - appear on hover */}
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
                  delay: index * 0.05,
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
        </AnimatePresence>
      </nav>
    );
  }

  // Docs/Changelog: full-width bar with background and border
  return (
    <nav className="flex-shrink-0 h-10 bg-neutral-900 border-b border-white/10 flex items-center px-4 gap-6">
      {/* Logo - links to home */}
      <Link
        to="/"
        className="flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <DarwinLogo className="w-5 h-5" />
      </Link>

      {/* Nav items */}
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

        return (
          <Link
            key={path}
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
        );
      })}
    </nav>
  );
}
