import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Copy, Check } from 'lucide-react';

export function FinalCTASection() {
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
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Ready to build?
        </h2>

        {/* Description */}
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          Install Darwin UI and start building beautiful interfaces in minutes.
          No configuration required.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            to="/docs/getting-started"
            className="px-6 py-2.5 bg-white text-black hover:bg-white/90 rounded-lg transition-colors duration-200 font-semibold"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/surajmandalcell/darwin-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-white/[0.05] hover:bg-white/10 rounded-lg transition-colors duration-200 text-white font-semibold inline-flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            View on GitHub
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
    </section>
  );
}
