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
    <Reveal type="fade" delay={delay} duration={0.6} threshold={0.1}>
      <div className="group relative overflow-visible rounded-2xl border border-white/10 hover:border-white/20 bg-gradient-to-br from-white/[0.02] to-transparent transition-all duration-300 flex flex-col h-full">
        {/* Badge (if provided) */}
        {badge && (
          <Badge
            variant="info"
            className="absolute top-4 right-4 z-10 text-xs"
          >
            {badge}
          </Badge>
        )}

        {/* Preview container - 320px height (h-80) */}
        <div className="relative p-10 h-80 flex items-center justify-center overflow-visible">
          <div className="w-full flex items-center justify-center relative">
            {preview}
          </div>
        </div>

        {/* Info footer */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-md p-6">
          <h3 className="font-semibold text-white text-xl mb-2">{title}</h3>
          <p className="text-sm text-white/60 mb-4 line-clamp-2">{description}</p>
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
