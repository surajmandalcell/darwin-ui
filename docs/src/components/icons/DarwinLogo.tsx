"use client";

import { cn } from '@/lib/utils';

interface DarwinLogoProps {
  className?: string;
  showBackground?: boolean;
}

// Custom Darwin logo - inspired by classic Mac OS apple but flipped vertically
// Creates a unique identity while paying homage to the inspiration
export function DarwinLogo({ className, showBackground = false }: DarwinLogoProps) {
  const logo = (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", !showBackground && className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flipped Apple shape - bite on bottom, leaf pointing down */}
      <path
        d="M12 2C9.5 2 8 3.5 8 3.5C8 3.5 6 3 4.5 5C3 7 3 10 4 13C5 16 7 19.5 9.5 21C11 22 12 22 12 22C12 22 13 22 14.5 21C17 19.5 19 16 20 13C21 10 21 7 19.5 5C18 3 16 3.5 16 3.5C16 3.5 14.5 2 12 2Z"
        fillRule="evenodd"
      />
      {/* Bite mark on bottom - inverted */}
      <path
        d="M10 18.5C10 18.5 11 20 12 20C13 20 14 18.5 14 18.5C14 18.5 13 17.5 12 17.5C11 17.5 10 18.5 10 18.5Z"
        fill="currentColor"
        className="opacity-0"
      />
      {/* Leaf pointing downward */}
      <path
        d="M12 2C12 2 13 4 15 4.5C15 4.5 14 2.5 12 2Z"
        fillRule="evenodd"
      />
      {/* Stem going up */}
      <path
        d="M12 2L12.5 0.5C12.5 0.5 13.5 1 13 2C12.5 3 12 3 12 3L12 2Z"
        fillRule="evenodd"
      />
    </svg>
  );

  if (!showBackground) return logo;

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center",
      "rounded-[22%] overflow-hidden",
      className
    )}>
      {/* iOS-style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
      {/* Shine overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)'
        }}
      />
      <div className="relative text-white p-2">
        {logo}
      </div>
    </div>
  );
}

// Simple version without complexity - just a stylized, flipped apple
export function DarwinLogoSimple({ className }: DarwinLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main apple body - rounder at bottom (flipped from normal apple) */}
      <path
        d="M18.71 9.04C18.61 9.03 16.59 9.13 16.59 11.56C16.59 14.38 19.26 15.38 19.31 15.4C19.3 15.45 18.9 16.81 17.9 18.21C17.04 19.44 16.14 20.66 14.73 20.68C13.34 20.71 12.92 19.85 11.33 19.85C9.74 19.85 9.27 20.66 7.95 20.71C6.59 20.76 5.54 19.39 4.67 18.16C2.89 15.65 1.52 11.07 3.36 8.03C4.27 6.53 5.84 5.57 7.54 5.55C8.87 5.52 10.13 6.47 10.96 6.47C11.78 6.47 13.31 5.33 14.93 5.51C15.61 5.53 17.43 5.77 18.71 9.04ZM14.24 3.78C14.97 2.89 15.44 1.66 15.31 0.43C14.26 0.48 12.99 1.13 12.23 2.01C11.56 2.78 10.99 4.04 11.14 5.24C12.31 5.33 13.51 4.67 14.24 3.78Z"
        transform="scale(1, -1) translate(0, -24)"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default DarwinLogo;
