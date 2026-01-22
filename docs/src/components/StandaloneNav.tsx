"use client";

import { Link, useLocation } from 'react-router-dom';
import { Monitor, BookOpen, History } from 'lucide-react';
import { DarwinLogo } from './icons/DarwinLogo';

const navItems = [
  { path: '/desktop', label: 'Desktop', icon: Monitor },
  { path: '/docs', label: 'Docs', icon: BookOpen },
  { path: '/changelog', label: 'Changelog', icon: History },
];

export function StandaloneNav() {
  const location = useLocation();

  return (
    <div className="fixed top-4 left-4 z-50">
      <div
        className="flex items-center rounded-lg overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10"
      >
        {/* Logo - links to home */}
        <Link
          to="/"
          className="flex items-center justify-center p-2 text-white/70 hover:text-white transition-colors"
        >
          <DarwinLogo className="w-5 h-5" />
        </Link>

        {/* Nav items */}
        <div className="flex items-center gap-1 pr-3 pl-4">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

            return (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] rounded-md transition-colors
                  ${isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
