"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { containerVariants, sidebarItemVariants } from './animations';
import { docSections } from './doc-sections';
import type { SidebarNavItemProps, DocsNavigationProps } from './types';

// Sidebar navigation item with active indicator
export function SidebarNavItem({
  page,
  isActive,
  onClick,
  index
}: SidebarNavItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
        isActive
          ? 'text-blue-400'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
      variants={sidebarItemVariants}
      custom={index}
      initial="hidden"
      animate="show"
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-blue-500/20 rounded-md"
          layoutId="activeIndicator"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        />
      )}
      <span className="relative z-10">{page.title}</span>
    </motion.button>
  );
}

// Extracted Navigation Component
export function DocsNavigation({
  activeSection,
  activePage,
  expandedSections,
  toggleSection,
  navigateTo,
  onNavigate
}: DocsNavigationProps) {
  return (
    <nav className="flex-1 overflow-y-auto p-3 space-y-1">
      {Object.entries(docSections).map(([sectionId, section], sectionIndex) => (
        <motion.div
          key={sectionId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <motion.button
            type="button"
            onClick={() => toggleSection(sectionId)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: expandedSections.includes(sectionId) ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ChevronRight className="w-3 h-3" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {section.icon}
            </motion.div>
            <span className="font-medium">{section.title}</span>
          </motion.button>

          <AnimatePresence>
            {expandedSections.includes(sectionId) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    },
                    opacity: {
                      duration: 0.2,
                      delay: 0.1
                    }
                  }
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    },
                    opacity: {
                      duration: 0.1
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div
                  className="pl-7 py-1 space-y-0.5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {section.pages.map((page, pageIndex) => (
                    <SidebarNavItem
                      key={page.id}
                      page={page}
                      isActive={activeSection === sectionId && activePage === page.id}
                      onClick={() => {
                        navigateTo(sectionId, page.id);
                        onNavigate?.();
                      }}
                      index={pageIndex}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </nav>
  );
}
