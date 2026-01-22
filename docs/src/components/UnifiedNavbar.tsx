"use client";

import { useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, History } from 'lucide-react';
import { DarwinLogo } from './icons/DarwinLogo';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/changelog', label: 'Changelog', icon: History },
];

export function UnifiedNavbar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHomepage = location.pathname === '/';
  const isDesktopRoute = location.pathname === '/desktop' || location.pathname.startsWith('/desktop/');

  // Don't render on desktop route (MenuBar handles navigation there)
  if (isDesktopRoute) return null;

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 300);
  }, []);

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // On homepage: floating navbar that expands on hover
  if (isHomepage) {
    return (
      <motion.nav
        className="fixed top-4 left-4 z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex items-center h-7 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden"
          initial={false}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={{
            collapsed: {
              paddingLeft: 8,
              paddingRight: 8,
            },
            expanded: {
              paddingLeft: 10,
              paddingRight: 10,
            },
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        >
          {/* Logo - always visible */}
          <Link
            to="/"
            className="flex items-center justify-center text-white/90 hover:text-white transition-colors"
          >
            <DarwinLogo className="w-4 h-4" />
          </Link>

          {/* Nav items - expand outward from logo */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                className="flex items-center gap-1 ml-2 overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: 1,
                  width: 'auto',
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.path);

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <Link
                        to={item.path}
                        className={`
                          flex items-center gap-1.5 px-2 py-1 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors
                          ${isActive
                            ? 'text-white bg-white/10'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    );
  }

  // On other pages: fixed navbar always visible
  return (
    <nav className="flex-shrink-0 h-7 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center px-3 gap-1">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center justify-center px-2 py-1 text-white/90 hover:text-white transition-colors"
      >
        <DarwinLogo className="w-4 h-4" />
      </Link>

      {/* Separator */}
      <div className="w-px h-4 bg-white/10 mx-1" />

      {/* Nav items */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = isActiveRoute(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-1.5 px-2 py-1 rounded-md text-[13px] font-medium transition-colors
              ${isActive
                ? 'text-white bg-white/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default UnifiedNavbar;
