"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: 'tsx' | 'jsx' | 'typescript' | 'javascript' | 'bash' | 'css' | 'json';
  showLineNumbers?: boolean;
  fileName?: string;
  highlightLines?: number[];
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  fileName,
  highlightLines = []
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border bg-card my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {language}
          </span>
          {fileName && (
            <span className="text-xs text-foreground/60 font-mono">{fileName}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 hover:bg-foreground/10 text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        wrapLines={highlightLines.length > 0}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: highlightLines.includes(lineNumber)
              ? 'rgba(59, 130, 246, 0.15)'
              : 'transparent',
            display: 'block',
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }
        })}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          fontFamily: 'var(--font-mono)',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-mono)',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
