"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Zap, Terminal, Code2, Wand2 } from 'lucide-react';

const codeLines = [
  '// Claude, add a date picker to the form',
  'import { DateSelect } from "@pikoloo/darwin-ui";',
  '',
  '<DateSelect',
  '  value={selectedDate}',
  '  onChange={setSelectedDate}',
  '  placeholder="Choose date"',
  '/>',
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function AgenticCodingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(codeRef, { once: true, margin: "-100px" });

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isInView || currentLineIndex >= codeLines.length) return;

    setIsTyping(true);
    const currentLine = codeLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      // Type next character with slight randomization (30-50ms)
      const delay = Math.random() * 20 + 30;
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.substring(0, currentCharIndex + 1));
          } else {
            newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      // Line complete, pause then move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        if (currentLineIndex + 1 >= codeLines.length) {
          setIsTyping(false);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView, currentLineIndex, currentCharIndex]);

  // Determine if a line is a comment
  const isComment = (line: string) => line.trim().startsWith('//');

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 lg:py-24 xl:py-28 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Emerald glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-emerald-500/8 blur-[120px] rounded-full" />
      </div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-400/5 blur-[100px] rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Code editor */}
          <motion.div
            ref={codeRef}
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0d0d0f] shadow-2xl shadow-black/50">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-4 text-xs text-white/40 font-medium">FormComponent.tsx</span>
              </div>

              {/* Code content */}
              <div className="p-4 font-mono text-sm min-h-[280px]">
                {displayedLines.map((line, index) => (
                  <div key={index} className="flex">
                    {/* Line number */}
                    <span className="w-8 text-right pr-4 text-white/20 select-none text-xs leading-6">
                      {index + 1}
                    </span>
                    {/* Code line */}
                    <span
                      className={`leading-6 ${
                        isComment(codeLines[index])
                          ? 'text-white/30 italic'
                          : 'text-emerald-400/90'
                      }`}
                    >
                      {line}
                      {/* Cursor at end of current line being typed */}
                      {index === currentLineIndex && isTyping && cursorVisible && (
                        <span className="inline-block w-[2px] h-4 bg-emerald-400 ml-px align-middle" />
                      )}
                    </span>
                  </div>
                ))}
                {/* Cursor on empty new line if between lines */}
                {!isTyping && currentLineIndex >= codeLines.length && cursorVisible && (
                  <div className="flex">
                    <span className="w-8 text-right pr-4 text-white/20 select-none text-xs leading-6">
                      {displayedLines.length + 1}
                    </span>
                    <span className="inline-block w-[2px] h-4 bg-emerald-400 align-middle" />
                  </div>
                )}
                {/* Placeholder lines for consistent height */}
                {displayedLines.length < 8 && (
                  [...Array(8 - displayedLines.length)].map((_, i) => (
                    <div key={`placeholder-${i}`} className="flex">
                      <span className="w-8 text-right pr-4 text-white/10 select-none text-xs leading-6">
                        {displayedLines.length + i + 1}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                Agentic Ready
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-white">Agentic Coding</span>
                <br />
                <span className="text-white/40">Supported by Default</span>
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg text-white/50 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Darwin UI is designed for the AI-assisted development era. Clean APIs, predictable patterns, and comprehensive TypeScript support make it the perfect choice for agentic coding workflows.
            </motion.p>

            {/* Feature cards */}
            <div className="space-y-3 pt-4">
              <FeatureCard
                icon={<Terminal className="w-5 h-5 text-emerald-400" />}
                title="Claude Code Compatible"
                description="Works seamlessly with Claude, Cursor, and AI coding assistants."
                delay={0.3}
              />
              <FeatureCard
                icon={<Code2 className="w-5 h-5 text-emerald-400" />}
                title="Clean API Surface"
                description="Predictable props and patterns that AI can understand and generate."
                delay={0.4}
              />
              <FeatureCard
                icon={<Wand2 className="w-5 h-5 text-emerald-400" />}
                title="Self-Documenting"
                description="TypeScript types and JSDoc comments guide AI suggestions."
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
