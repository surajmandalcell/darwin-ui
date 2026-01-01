"use client";

import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@pikoloo/darwin-ui';
import { ArrowRight } from 'lucide-react';

interface ShowcaseCardProps {
  title: string;
  description: string;
  slug: string;
  preview: ReactNode;
  badge?: string;
}

export function ShowcaseCard({
  title,
  description,
  slug,
  preview,
  badge,
}: ShowcaseCardProps) {

  return (
    <div className="min-h-[280px]">
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 flex flex-col h-full min-h-[280px]">
        {/* Badge (if provided) */}
        {badge && (
          <Badge
            variant="info"
            className="absolute top-4 right-4 z-10 text-xs"
          >
            {badge}
          </Badge>
        )}

        {/* Preview container */}
        <div className="relative p-4 flex-1 flex items-center justify-center overflow-hidden min-h-[180px]">
          <div className="w-full flex items-center justify-center">
            {preview}
          </div>
        </div>

        {/* Info footer - compact for bento */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-md p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white text-sm mb-0.5">{title}</h3>
              <p className="text-xs text-white/50 line-clamp-1">{description}</p>
            </div>
            <Link
              to={`/docs/components/${slug}`}
              className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label={`View ${title} docs`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
