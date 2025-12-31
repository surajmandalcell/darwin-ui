"use client";

import { useState, useEffect, useRef } from 'react';
import type { WindowState } from '../../../contexts/desktop-context';
import { Copy, Check, Plus, X } from 'lucide-react';

interface TerminalAppProps {
  windowState: WindowState;
}

interface Tab {
  id: string;
  name: string;
  history: string[];
}

const welcomeMessage = `
Darwin UI Terminal v1.0.0
Type 'help' for available commands.

`;

const commands: Record<string, string> = {
  help: `Available commands:
  install    - Show installation commands
  create     - Create a new project
  docs       - Open documentation
  version    - Show version info
  clear      - Clear terminal
  `,
  install: `# Install Darwin UI

npm install @smc/darwin-ui

# Or with yarn
yarn add @smc/darwin-ui

# Or with pnpm
pnpm add @smc/darwin-ui

# Or with bun
bun add @smc/darwin-ui
`,
  create: `# Create a new project with Darwin UI

npx create-next-app@latest my-app
cd my-app
npm install @smc/darwin-ui framer-motion

# Start development server
npm run dev
`,
  docs: `Opening documentation...
Visit: https://darwin-ui.dev/docs
`,
  version: `Darwin UI v1.0.0
React 18.2.0
Framer Motion 11.0.0
`,
};

export function TerminalApp({ windowState: _windowState }: TerminalAppProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', name: 'Terminal', history: [welcomeMessage] }
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find(t => t.id === activeTab)!;

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentTab?.history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd === 'clear') {
      setTabs(tabs.map(t =>
        t.id === activeTab ? { ...t, history: [] } : t
      ));
      return;
    }

    if (commands[trimmedCmd]) {
      output = commands[trimmedCmd];
    } else if (trimmedCmd) {
      output = `Command not found: ${trimmedCmd}\nType 'help' for available commands.`;
    }

    setTabs(tabs.map(t =>
      t.id === activeTab
        ? { ...t, history: [...t.history, `$ ${cmd}`, output] }
        : t
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const addTab = () => {
    const newId = String(Date.now());
    setTabs([...tabs, { id: newId, name: `Terminal ${tabs.length + 1}`, history: [welcomeMessage] }]);
    setActiveTab(newId);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;

    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  const copyCommand = async (cmd: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 font-mono text-sm">
      {/* Tabs */}
      <div className="flex items-center bg-neutral-900 border-b border-white/10">
        <div className="flex-1 flex items-center overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-white/10 transition-colors ${
                activeTab === tab.id
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-950 text-white/50 hover:text-white/80'
              }`}
            >
              <span className="text-xs">{tab.name}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="p-0.5 hover:bg-white/10 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addTab}
          className="p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4"
        onClick={() => inputRef.current?.focus()}
      >
        {currentTab.history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.startsWith('$ ') ? (
              <div className="flex items-center gap-2 group">
                <span className="text-green-400">$</span>
                <span className="text-white">{line.slice(2)}</span>
              </div>
            ) : line.startsWith('#') ? (
              <div className="text-white/40 mt-2">{line}</div>
            ) : line.includes('npm ') || line.includes('yarn ') || line.includes('pnpm ') || line.includes('bun ') || line.includes('npx ') ? (
              <div className="flex items-center gap-2 group my-1">
                <code className="text-cyan-400">{line}</code>
                <button
                  onClick={() => copyCommand(line)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                >
                  {copied === line ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-white/50" />
                  )}
                </button>
              </div>
            ) : (
              <div className="text-white/80">{line}</div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            autoFocus
          />
        </form>
      </div>

      {/* Quick Commands */}
      <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border-t border-white/10">
        <span className="text-xs text-white/40">Quick:</span>
        {['install', 'create', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TerminalApp;
