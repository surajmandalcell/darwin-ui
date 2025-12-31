import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-white/[0.01] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand - Spans 2 columns */}
          <div className="col-span-2">
            <div className="text-xl font-bold text-white mb-3">Darwin UI</div>
            <p className="text-white/60 text-sm mb-6 max-w-xs leading-relaxed">
              A modern component library for building beautiful React
              applications with TypeScript and Tailwind CSS.
            </p>
            <a
              href="https://github.com/surajmandalcell/darwin-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/docs"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/components/button"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/examples"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/docs/getting-started"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/guides"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/surajmandalcell/darwin-ui/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/surajmandalcell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="mailto:surajmandalcell@gmail.com"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/surajmandalcell/darwin-ui/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">
            &copy; {currentYear} Made by{' '}
            <a
              href="https://github.com/surajmandalcell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:underline"
            >
              Suraj Mandal
            </a>
          </div>
          <div className="text-white/40 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
