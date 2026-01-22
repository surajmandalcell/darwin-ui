"use client";

import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, History } from 'lucide-react';

const navItems = [
  { path: '/desktop', label: 'Desktop', icon: Home },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/changelog', label: 'Changelog', icon: History },
];

export function StandaloneNav() {
  const location = useLocation();

  return (
    <nav className="flex-shrink-0 h-10 bg-neutral-900 border-b border-white/10 flex items-center px-4 gap-6">
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
            {/* Active indicator - subtle bottom border */}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/60 rounded-t-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
