"use client";

import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { docsTree } from './Sidebar';

interface DocNavItem {
  title: string;
  href: string;
}

export function DocNavigation() {
  const location = useLocation();
  const { previous, next } = getAdjacentPages(location.pathname);

  if (!previous && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-white/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Page */}
        {previous ? (
          <Link
            to={previous.href}
            className="group flex flex-col gap-2 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wide font-medium">
              <ArrowLeft className="w-3 h-3" />
              Previous
            </div>
            <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
              {previous.title}
            </div>
          </Link>
        ) : (
          <div /> // Empty space to maintain grid alignment
        )}

        {/* Next Page */}
        {next && (
          <Link
            to={next.href}
            className="group flex flex-col gap-2 p-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all sm:items-end sm:text-right"
          >
            <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wide font-medium">
              Next
              <ArrowRight className="w-3 h-3" />
            </div>
            <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
              {next.title}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

// Get previous and next pages from docsTree
function getAdjacentPages(currentPath: string): {
  previous?: DocNavItem;
  next?: DocNavItem;
} {
  // Flatten the docs tree into a single array
  const allPages: DocNavItem[] = [];

  docsTree.forEach((section) => {
    section.items.forEach((item) => {
      allPages.push({
        title: item.title,
        href: item.href,
      });
    });
  });

  // Find current page index
  const currentIndex = allPages.findIndex((page) => page.href === currentPath);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : undefined,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : undefined,
  };
}
