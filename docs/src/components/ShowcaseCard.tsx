"use client";

import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@smc/darwin-ui/components/reveal';
import { Badge } from '@smc/darwin-ui';
import { ArrowRight } from 'lucide-react';

interface ShowcaseCardProps {
  title: string;
  description: string;
  slug: string;
  preview: ReactNode;
  badge?: string;
  delay?: number;
}

export function ShowcaseCard({
  title,
  description,
  slug,
  preview,
  badge,
  delay = 0
}: ShowcaseCardProps) {
  return (
    <Reveal type="slide" direction="up" delay={delay} duration={0.5} threshold={0.1}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover-card-lift h-full flex flex-col">
        {/* Shimmer overlay */}
        <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Badge (if provided) */}
        {badge && (
          <Badge
            variant="info"
            className="absolute top-4 right-4 z-10 text-xs"
          >
            {badge}
          </Badge>
        )}

        {/* Preview container (interactive) */}
        <div className="relative p-6 min-h-[200px] flex items-center justify-center flex-1">
          <div className="w-full flex items-center justify-center">
            {preview}
          </div>
        </div>

        {/* Info footer */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-md p-4">
          <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
          <p className="text-sm text-white/60 mb-3 line-clamp-2">{description}</p>
          <Link
            to={`/docs/components/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
          >
            <span>View Docs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
