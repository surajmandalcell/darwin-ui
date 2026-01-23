"use client";

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, ExternalLink, Copy, Check } from 'lucide-react';

import type { DeveloperAppProps } from './types';
import { docSections } from './doc-sections';
import { DocsNavigation } from './navigation';
import { PageContent } from './pages';
import { generatePageContext } from './utils';

export function DeveloperApp({ windowState: _windowState, initialSection, initialPage }: DeveloperAppProps) {
  // Validate and use initial section/page from URL if provided
  const getValidSection = () => {
    if (initialSection && initialSection in docSections) {
      return initialSection;
    }
    return 'getting-started';
  };

  const getValidPage = (section: string) => {
    const sectionData = docSections[section as keyof typeof docSections];
    if (initialPage && sectionData?.pages.some(p => p.id === initialPage)) {
      return initialPage;
    }
    return sectionData?.pages[0]?.id || 'introduction';
  };

  const navigate = useNavigate();
  const validSection = getValidSection();
  const [activeSection, setActiveSection] = useState(validSection);
  const [activePage, setActivePage] = useState(getValidPage(validSection));
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'components', 'theming', validSection]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync URL params to state on navigation/reload - only when URL has specific page
  useEffect(() => {
    // Only sync if we have BOTH section AND page from URL
    if (!initialSection || !initialPage) return;
    if (!(initialSection in docSections)) return;

    const sectionData = docSections[initialSection as keyof typeof docSections];
    const pageExists = sectionData?.pages.some(p => p.id === initialPage);
    if (!pageExists) return;

    // Only update if different from current state
    if (activeSection !== initialSection || activePage !== initialPage) {
      setActiveSection(initialSection);
      setActivePage(initialPage);
      if (!expandedSections.includes(initialSection)) {
        setExpandedSections(prev => [...prev, initialSection]);
      }
    }
  }, [initialSection, initialPage]);

  const copyForAI = async () => {
    const markdown = generatePageContext(activeSection, activePage);
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigateTo = (sectionId: string, pageId: string) => {
    setActiveSection(sectionId);
    setActivePage(pageId);
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections([...expandedSections, sectionId]);
    }
    // Update URL
    navigate(`/docs/${sectionId}/${pageId}`);
    // Smooth scroll to top
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-card relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-muted border border-border/50 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-semibold text-foreground">Documentation</span>
        </div>
        <button
          type="button"
          onClick={() => setShowMobileMenu(true)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-64 bg-card z-50 border-l border-border flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="font-semibold text-foreground">Menu</span>
                <button
                  type="button"
                  onClick={() => setShowMobileMenu(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <DocsNavigation
                activeSection={activeSection}
                activePage={activePage}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                navigateTo={navigateTo}
                onNavigate={() => setShowMobileMenu(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex w-56 bg-card border-r border-border flex-col overflow-hidden flex-shrink-0"
        initial={{ x: -56, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Sidebar Header */}
        <motion.div
          className="p-4 border-b border-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-6 h-6 rounded bg-muted border border-border/50 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            </motion.div>
            <span className="font-semibold text-foreground text-sm">Documentation</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <DocsNavigation
          activeSection={activeSection}
          activePage={activePage}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          navigateTo={navigateTo}
        />

        {/* Sidebar Footer */}
        <motion.div
          className="p-3 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.div>
            <span>GitHub</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        className="flex-1 overflow-y-auto scroll-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          {/* Copy for AI button */}
          <div className="flex justify-end mb-4">
            <motion.button
              type="button"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground/90 hover:bg-muted rounded-md transition-colors flex items-center gap-1.5 border border-border"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyForAI}
              title="Copy page context for AI"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy for AI
                </>
              )}
            </motion.button>
          </div>
          <AnimatePresence mode="wait">
            <PageContent
              key={`${activeSection}-${activePage}`}
              section={activeSection}
              page={activePage}
              onNavigate={navigateTo}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default DeveloperApp;

// Re-export types for convenience
export type { DeveloperAppProps } from './types';
