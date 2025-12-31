import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Copy, Check } from 'lucide-react';

// Lazy load the dashboard showcase for better performance
const DashboardShowcase = lazy(
  () => import('../../../components/DashboardShowcase')
);

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCommand = 'npm install @smc/darwin-ui';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Centered text content */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm text-white/80 font-medium">
              23 Production-Ready Components
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-6 max-w-5xl">
            Build beautiful interfaces, faster
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-10 leading-relaxed">
            A comprehensive component library built with React, TypeScript, and
            Tailwind CSS. Dark mode by default.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link
              to="/docs/getting-started"
              className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-lg transition-colors duration-200 font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/docs/components/button"
              className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-lg transition-colors duration-200 text-white font-semibold"
            >
              View Docs
            </Link>
            <a
              href="https://github.com/surajmandalcell/darwin-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 hover:bg-white/5 rounded-lg transition-colors duration-200 text-white font-semibold inline-flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>

          {/* Install command */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-sm">
            <span className="text-white/70">{installCommand}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              aria-label="Copy install command"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/60" />
              )}
            </button>
          </div>
        </div>

        {/* Dashboard showcase - FULL WIDTH below */}
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10"
            style={{
              boxShadow: 'var(--shadow-screenshot)',
            }}
          >
            <Suspense
              fallback={
                <div className="w-full h-[600px] bg-white/[0.02] animate-pulse" />
              }
            >
              <DashboardShowcase />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
