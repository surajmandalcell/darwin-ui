"use client";

import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on home page
  if (pathSegments.length === 0) return null;

  // Build breadcrumb items
  const breadcrumbs: Array<{ label: string; href?: string }> = [
    { label: 'Docs', href: '/docs/getting-started/introduction' },
  ];

  // Add intermediate segments
  if (pathSegments.length > 1) {
    const section = pathSegments[1]; // "components", "hooks", "getting-started"
    const category = formatLabel(section);

    if (pathSegments.length > 2) {
      breadcrumbs.push({ label: category, href: undefined }); // Not clickable for category
    } else {
      breadcrumbs.push({ label: category }); // Current page
    }
  }

  // Add current page (last segment)
  if (pathSegments.length > 2) {
    const currentPage = pathSegments[pathSegments.length - 1];
    breadcrumbs.push({ label: formatLabel(currentPage) });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-white/30" aria-hidden="true" />
              )}

              {crumb.href && !isLast ? (
                <Link
                  to={crumb.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-white font-medium' : 'text-white/40'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Format URL segments to readable labels
function formatLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
