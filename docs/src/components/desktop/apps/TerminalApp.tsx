"use client";

import { useEffect, useRef, useCallback, useState } from 'react';
import type { WindowState } from '../../../contexts/desktop-context';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Plus, X } from 'lucide-react';

interface TerminalAppProps {
  windowState: WindowState;
}

interface TerminalTab {
  id: string;
  name: string;
  terminal: Terminal | null;
  fitAddon: FitAddon | null;
  commandHistory: string[];
  historyIndex: number;
  currentInput: string;
}

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

// File system simulation
const fileSystem: Record<string, string | Record<string, string>> = {
  '/home/guest': {
    'notes.txt': 'Welcome to Darwin UI!\nThis is a sample text file.\n\nFeel free to explore the terminal.',
    'readme.md': '# Darwin UI\n\nA modern React component library.\n\n## Features\n- Beautiful components\n- Fully customizable\n- TypeScript support',
    '.bashrc': '# Bash configuration\nexport PS1="\\u@darwin-ui:\\w\\$ "\nalias ll="ls -la"',
  },
  '/home/guest/Documents': {
    'project.txt': 'Project ideas:\n1. Build a dashboard\n2. Create a landing page\n3. Design a portfolio',
  },
  '/home/guest/Downloads': {},
  '/home/guest/Desktop': {
    'shortcuts.txt': 'Keyboard shortcuts:\n- Ctrl+L: Clear screen\n- Ctrl+C: Cancel command\n- Tab: Auto-complete',
  },
};

// Available commands
const availableCommands = [
  'help', 'clear', 'echo', 'date', 'whoami', 'ls', 'pwd', 'cd', 'cat',
  'storage', 'history', 'touch', 'mkdir', 'rm', 'hostname', 'uname',
  'env', 'export', 'neofetch', 'cowsay', 'fortune', 'cal', 'uptime'
];

// Environment variables
const envVars: Record<string, string> = {
  USER: 'guest',
  HOME: '/home/guest',
  SHELL: '/bin/bash',
  TERM: 'xterm-256color',
  PATH: '/usr/local/bin:/usr/bin:/bin',
  PWD: '/home/guest',
  HOSTNAME: 'darwin-ui',
  LANG: 'en_US.UTF-8',
};

// Helper to get memory usage
function getMemoryUsage(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const perf = performance as any;
    if (perf?.memory?.usedJSHeapSize) {
      return `${Math.round(perf.memory.usedJSHeapSize / 1024 / 1024)}MB`;
    }
  } catch {
    // Ignore
  }
  return 'N/A';
}

// ASCII art for neofetch (generated dynamically to get current memory)
function getNeofetchArt(): string {
  return `
${colors.cyan}        .--.         ${colors.reset}${colors.brightWhite}guest${colors.reset}@${colors.brightCyan}darwin-ui${colors.reset}
${colors.cyan}       |o_o |        ${colors.reset}${colors.brightWhite}-----------------${colors.reset}
${colors.cyan}       |:_/ |        ${colors.reset}${colors.yellow}OS:${colors.reset} Darwin UI Desktop
${colors.cyan}      //   \\ \\       ${colors.reset}${colors.yellow}Kernel:${colors.reset} xterm.js 5.x
${colors.cyan}     (|     | )      ${colors.reset}${colors.yellow}Shell:${colors.reset} bash 5.0
${colors.cyan}    /'\\_   _/'\`\\     ${colors.reset}${colors.yellow}Terminal:${colors.reset} xterm-256color
${colors.cyan}    \\___)=(___/      ${colors.reset}${colors.yellow}CPU:${colors.reset} JavaScript Engine
${colors.reset}                     ${colors.yellow}Memory:${colors.reset} ${getMemoryUsage()}
`;
}

// Fortune messages
const fortunes = [
  "A bug in the code is worth two in the documentation.",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "// This code works, don't touch it",
  "It's not a bug, it's an undocumented feature.",
  "To understand recursion, you must first understand recursion.",
  "There's no place like 127.0.0.1",
  "I don't always test my code, but when I do, I do it in production.",
  "The best code is no code at all.",
  "Works on my machine.",
  "May your builds be fast and your deploys be smooth.",
];

// Calendar helper
function generateCalendar(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let cal = `${colors.brightWhite}     ${monthNames[month]} ${year}${colors.reset}\n`;
  cal += `${colors.cyan}Su Mo Tu We Th Fr Sa${colors.reset}\n`;

  let day = 1;
  for (let i = 0; i < 6; i++) {
    let week = '';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        week += '   ';
      } else if (day > daysInMonth) {
        week += '   ';
      } else {
        if (day === today) {
          week += `${colors.brightGreen}${day.toString().padStart(2)}${colors.reset} `;
        } else {
          week += `${day.toString().padStart(2)} `;
        }
        day++;
      }
    }
    cal += week + '\n';
    if (day > daysInMonth) break;
  }

  return cal;
}

// Cowsay helper
function cowsay(message: string): string {
  const maxWidth = 40;
  const words = message.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxWidth) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  const width = Math.max(...lines.map(l => l.length));
  const border = '-'.repeat(width + 2);

  let output = ` ${border}\n`;
  if (lines.length === 1) {
    output += `< ${lines[0].padEnd(width)} >\n`;
  } else {
    lines.forEach((line, i) => {
      if (i === 0) output += `/ ${line.padEnd(width)} \\\n`;
      else if (i === lines.length - 1) output += `\\ ${line.padEnd(width)} /\n`;
      else output += `| ${line.padEnd(width)} |\n`;
    });
  }
  output += ` ${border}\n`;
  output += `        \\   ^__^\n`;
  output += `         \\  (oo)\\_______\n`;
  output += `            (__)\\       )\\/\\\n`;
  output += `                ||----w |\n`;
  output += `                ||     ||\n`;

  return output;
}

// Command handler
function executeCommand(
  cmd: string,
  currentDir: string,
  setCurrentDir: (dir: string) => void
): string {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return `${colors.brightCyan}${colors.bold}Darwin UI Terminal - Available Commands${colors.reset}

${colors.yellow}Navigation:${colors.reset}
  ${colors.green}pwd${colors.reset}          Print working directory
  ${colors.green}cd${colors.reset}  <dir>    Change directory
  ${colors.green}ls${colors.reset}  [dir]    List directory contents

${colors.yellow}File Operations:${colors.reset}
  ${colors.green}cat${colors.reset} <file>   Display file contents
  ${colors.green}touch${colors.reset} <file> Create empty file
  ${colors.green}mkdir${colors.reset} <dir>  Create directory
  ${colors.green}rm${colors.reset}  <file>   Remove file

${colors.yellow}System:${colors.reset}
  ${colors.green}whoami${colors.reset}       Print current user
  ${colors.green}hostname${colors.reset}     Print hostname
  ${colors.green}uname${colors.reset} [-a]   Print system information
  ${colors.green}date${colors.reset}         Print current date/time
  ${colors.green}uptime${colors.reset}       Show system uptime
  ${colors.green}env${colors.reset}          Print environment variables
  ${colors.green}export${colors.reset}       Set environment variable

${colors.yellow}Storage:${colors.reset}
  ${colors.green}storage${colors.reset}      View localStorage usage
  ${colors.green}storage clear${colors.reset} Clear localStorage

${colors.yellow}Fun:${colors.reset}
  ${colors.green}neofetch${colors.reset}     Display system info with art
  ${colors.green}fortune${colors.reset}      Get a random fortune
  ${colors.green}cowsay${colors.reset} <msg> Make a cow say something
  ${colors.green}cal${colors.reset}          Display calendar

${colors.yellow}Utility:${colors.reset}
  ${colors.green}echo${colors.reset} <text>  Print text to terminal
  ${colors.green}clear${colors.reset}        Clear terminal screen
  ${colors.green}history${colors.reset}      Show command history

${colors.dim}Use Tab for auto-completion, Up/Down for history${colors.reset}`;

    case 'clear':
      return '\x1b[2J\x1b[H';

    case 'date':
      return `${colors.brightGreen}${new Date().toString()}${colors.reset}`;

    case 'whoami':
      return `${colors.cyan}${envVars.USER}${colors.reset}`;

    case 'hostname':
      return `${colors.cyan}${envVars.HOSTNAME}${colors.reset}`;

    case 'uname':
      if (args.includes('-a') || args.includes('--all')) {
        return `${colors.brightYellow}Darwin darwin-ui 5.0.0 Darwin-UI-Desktop x86_64 JavaScript/V8${colors.reset}`;
      }
      return `${colors.brightYellow}Darwin${colors.reset}`;

    case 'pwd':
      return `${colors.cyan}${currentDir}${colors.reset}`;

    case 'cd': {
      const target = args[0] || envVars.HOME;
      let newDir = target;

      if (target === '~' || target === '') {
        newDir = envVars.HOME;
      } else if (target === '..') {
        const parts = currentDir.split('/').filter(Boolean);
        parts.pop();
        newDir = '/' + parts.join('/') || envVars.HOME;
      } else if (target === '.') {
        newDir = currentDir;
      } else if (!target.startsWith('/')) {
        newDir = currentDir === '/' ? `/${target}` : `${currentDir}/${target}`;
      }

      // Normalize path
      newDir = newDir.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

      // Check if directory exists
      const validDirs = [
        '/home/guest',
        '/home/guest/Documents',
        '/home/guest/Downloads',
        '/home/guest/Desktop',
        '/home',
        '/'
      ];

      if (validDirs.includes(newDir)) {
        setCurrentDir(newDir);
        envVars.PWD = newDir;
        return '';
      }
      return `${colors.red}cd: ${target}: No such file or directory${colors.reset}`;
    }

    case 'ls': {
      const target = args[0] || currentDir;
      let dir = target;

      if (!target.startsWith('/')) {
        dir = currentDir === '/' ? `/${target}` : `${currentDir}/${target}`;
      }
      dir = dir.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

      if (dir === '/home/guest' || dir === '~') {
        const files = Object.keys(fileSystem['/home/guest'] || {});
        const dirs = ['Documents', 'Downloads', 'Desktop'];
        return dirs.map(d => `${colors.brightBlue}${d}/${colors.reset}`).join('  ') + '  ' +
               files.map(f => f.startsWith('.') ? `${colors.dim}${f}${colors.reset}` : f).join('  ');
      }

      const fsDir = fileSystem[dir];
      if (fsDir && typeof fsDir === 'object') {
        const files = Object.keys(fsDir);
        if (files.length === 0) return `${colors.dim}(empty directory)${colors.reset}`;
        return files.map(f => f.startsWith('.') ? `${colors.dim}${f}${colors.reset}` : f).join('  ');
      }

      if (dir === '/') {
        return `${colors.brightBlue}home/${colors.reset}  ${colors.brightBlue}usr/${colors.reset}  ${colors.brightBlue}bin/${colors.reset}  ${colors.brightBlue}etc/${colors.reset}`;
      }
      if (dir === '/home') {
        return `${colors.brightBlue}guest/${colors.reset}`;
      }

      return `${colors.red}ls: cannot access '${target}': No such file or directory${colors.reset}`;
    }

    case 'cat': {
      if (!args[0]) {
        return `${colors.red}cat: missing file operand${colors.reset}`;
      }

      let filepath = args[0];
      if (!filepath.startsWith('/')) {
        filepath = currentDir === '/' ? `/${filepath}` : `${currentDir}/${filepath}`;
      }

      // Find the file
      const dirPath = filepath.substring(0, filepath.lastIndexOf('/')) || '/home/guest';
      const fileName = filepath.substring(filepath.lastIndexOf('/') + 1);

      const dir = fileSystem[dirPath];
      if (dir && typeof dir === 'object' && dir[fileName]) {
        return `${colors.white}${dir[fileName]}${colors.reset}`;
      }

      return `${colors.red}cat: ${args[0]}: No such file or directory${colors.reset}`;
    }

    case 'touch': {
      if (!args[0]) {
        return `${colors.red}touch: missing file operand${colors.reset}`;
      }
      const fileName = args[0];
      const dir = fileSystem[currentDir];
      if (dir && typeof dir === 'object') {
        dir[fileName] = '';
        return `${colors.dim}Created: ${fileName}${colors.reset}`;
      }
      return `${colors.red}touch: cannot create '${fileName}'${colors.reset}`;
    }

    case 'mkdir': {
      if (!args[0]) {
        return `${colors.red}mkdir: missing operand${colors.reset}`;
      }
      return `${colors.dim}Created directory: ${args[0]}${colors.reset}`;
    }

    case 'rm': {
      if (!args[0]) {
        return `${colors.red}rm: missing operand${colors.reset}`;
      }
      const fileName = args[0];
      const dir = fileSystem[currentDir];
      if (dir && typeof dir === 'object' && dir[fileName]) {
        delete dir[fileName];
        return `${colors.dim}Removed: ${fileName}${colors.reset}`;
      }
      return `${colors.red}rm: cannot remove '${fileName}': No such file or directory${colors.reset}`;
    }

    case 'echo': {
      let output = args.join(' ');
      // Handle environment variables
      output = output.replace(/\$(\w+)/g, (_, varName) => envVars[varName] || '');
      // Handle quoted strings
      output = output.replace(/^["']|["']$/g, '');
      return output;
    }

    case 'storage': {
      if (args[0] === 'clear') {
        try {
          localStorage.clear();
          return `${colors.green}LocalStorage cleared successfully${colors.reset}`;
        } catch {
          return `${colors.red}Failed to clear localStorage${colors.reset}`;
        }
      }

      try {
        const used = JSON.stringify(localStorage).length;
        const keys = Object.keys(localStorage);
        let output = `${colors.brightCyan}${colors.bold}LocalStorage Usage${colors.reset}\n`;
        output += `${colors.yellow}Total size:${colors.reset} ${(used / 1024).toFixed(2)} KB\n`;
        output += `${colors.yellow}Items:${colors.reset} ${keys.length}\n\n`;

        if (keys.length > 0) {
          output += `${colors.dim}Keys:${colors.reset}\n`;
          keys.slice(0, 10).forEach(key => {
            const size = JSON.stringify(localStorage.getItem(key)).length;
            output += `  ${colors.cyan}${key}${colors.reset} (${size} bytes)\n`;
          });
          if (keys.length > 10) {
            output += `  ${colors.dim}... and ${keys.length - 10} more${colors.reset}\n`;
          }
        }

        return output;
      } catch {
        return `${colors.red}Unable to access localStorage${colors.reset}`;
      }
    }

    case 'env':
      return Object.entries(envVars)
        .map(([k, v]) => `${colors.cyan}${k}${colors.reset}=${colors.yellow}${v}${colors.reset}`)
        .join('\n');

    case 'export': {
      if (!args[0]) {
        return Object.entries(envVars)
          .map(([k, v]) => `declare -x ${colors.cyan}${k}${colors.reset}="${v}"`)
          .join('\n');
      }
      const match = args.join(' ').match(/^(\w+)=(.*)$/);
      if (match) {
        envVars[match[1]] = match[2].replace(/^["']|["']$/g, '');
        return '';
      }
      return `${colors.red}export: invalid syntax${colors.reset}`;
    }

    case 'history':
      return ''; // Handled separately in terminal

    case 'neofetch':
      return getNeofetchArt();

    case 'fortune':
      return `${colors.brightYellow}${fortunes[Math.floor(Math.random() * fortunes.length)]}${colors.reset}`;

    case 'cowsay': {
      const message = args.join(' ') || 'Moo!';
      return cowsay(message);
    }

    case 'cal':
      return generateCalendar();

    case 'uptime': {
      const uptime = Math.floor(performance.now() / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;
      return `${colors.brightGreen}up ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${colors.reset}`;
    }

    default:
      if (command) {
        return `${colors.red}${command}: command not found${colors.reset}\n${colors.dim}Type 'help' for available commands${colors.reset}`;
      }
      return '';
  }
}

// Helper function to clear all child elements safely
function clearElement(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function TerminalApp({ windowState }: TerminalAppProps) {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    {
      id: '1',
      name: 'Terminal 1',
      terminal: null,
      fitAddon: null,
      commandHistory: [],
      historyIndex: -1,
      currentInput: '',
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [currentDir, setCurrentDir] = useState('/home/guest');
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const currentInputRef = useRef('');
  const tabsRef = useRef(tabs);

  // Keep tabs ref updated
  useEffect(() => {
    tabsRef.current = tabs;
  }, [tabs]);

  const getPrompt = useCallback(() => {
    const dir = currentDir === envVars.HOME ? '~' : currentDir.split('/').pop() || '/';
    return `${colors.brightGreen}guest${colors.reset}@${colors.brightCyan}darwin-ui${colors.reset}:${colors.brightBlue}${dir}${colors.reset}$ `;
  }, [currentDir]);

  const initTerminal = useCallback((tabId: string) => {
    if (!terminalContainerRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      cursorStyle: 'block',
      fontFamily: '"SF Mono", "Fira Code", "JetBrains Mono", Menlo, Monaco, monospace',
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 1.2,
      letterSpacing: 0,
      theme: {
        background: '#0a0a0a',
        foreground: '#e4e4e7',
        cursor: '#22c55e',
        cursorAccent: '#0a0a0a',
        selectionBackground: '#3f3f46',
        selectionForeground: '#e4e4e7',
        black: '#18181b',
        red: '#ef4444',
        green: '#22c55e',
        yellow: '#eab308',
        blue: '#3b82f6',
        magenta: '#a855f7',
        cyan: '#06b6d4',
        white: '#e4e4e7',
        brightBlack: '#52525b',
        brightRed: '#f87171',
        brightGreen: '#4ade80',
        brightYellow: '#facc15',
        brightBlue: '#60a5fa',
        brightMagenta: '#c084fc',
        brightCyan: '#22d3ee',
        brightWhite: '#fafafa',
      },
      scrollback: 1000,
      convertEol: true,
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(terminalContainerRef.current);

    // Delay fit to ensure container has dimensions
    setTimeout(() => {
      fitAddon.fit();
    }, 100);

    // Welcome message
    terminal.writeln(`${colors.brightCyan}${colors.bold}Darwin UI Terminal v2.0.0${colors.reset}`);
    terminal.writeln(`${colors.dim}Powered by xterm.js | Type 'help' for commands${colors.reset}`);
    terminal.writeln('');
    terminal.write(getPrompt());

    // Handle input
    let currentInput = '';
    let historyIndex = -1;

    terminal.onKey(({ key, domEvent }) => {
      const currentTab = tabsRef.current.find(t => t.id === tabId);
      if (!currentTab) return;

      const ev = domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      // Handle Ctrl+C
      if (ev.ctrlKey && ev.key === 'c') {
        terminal.write('^C\r\n');
        currentInput = '';
        currentInputRef.current = '';
        terminal.write(getPrompt());
        return;
      }

      // Handle Ctrl+L (clear)
      if (ev.ctrlKey && ev.key === 'l') {
        terminal.clear();
        terminal.write(getPrompt());
        return;
      }

      // Handle Tab (auto-completion)
      if (ev.key === 'Tab') {
        ev.preventDefault();
        const input = currentInput.trim();
        if (input) {
          const matches = availableCommands.filter(cmd => cmd.startsWith(input));
          if (matches.length === 1) {
            // Clear current input and write completion
            for (let i = 0; i < currentInput.length; i++) {
              terminal.write('\b \b');
            }
            currentInput = matches[0];
            currentInputRef.current = currentInput;
            terminal.write(matches[0]);
          } else if (matches.length > 1) {
            terminal.writeln('');
            terminal.writeln(matches.map(m => `${colors.cyan}${m}${colors.reset}`).join('  '));
            terminal.write(getPrompt() + currentInput);
          }
        }
        return;
      }

      // Handle Enter
      if (ev.key === 'Enter') {
        terminal.writeln('');

        if (currentInput.trim()) {
          // Add to history
          setTabs(prev => prev.map(t => {
            if (t.id === tabId) {
              const newHistory = [...t.commandHistory, currentInput.trim()];
              return { ...t, commandHistory: newHistory, historyIndex: -1 };
            }
            return t;
          }));

          // Handle history command specially
          if (currentInput.trim() === 'history') {
            const tab = tabsRef.current.find(t => t.id === tabId);
            if (tab) {
              [...tab.commandHistory, currentInput.trim()].forEach((cmd, i) => {
                terminal.writeln(`  ${colors.dim}${(i + 1).toString().padStart(4)}${colors.reset}  ${cmd}`);
              });
            }
          } else {
            // Execute command
            const output = executeCommand(currentInput.trim(), currentDir, setCurrentDir);

            if (output === '\x1b[2J\x1b[H') {
              terminal.clear();
            } else if (output) {
              output.split('\n').forEach(line => {
                terminal.writeln(line);
              });
            }
          }
        }

        currentInput = '';
        currentInputRef.current = '';
        historyIndex = -1;
        terminal.write(getPrompt());
        return;
      }

      // Handle Backspace
      if (ev.key === 'Backspace') {
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          currentInputRef.current = currentInput;
          terminal.write('\b \b');
        }
        return;
      }

      // Handle Up Arrow (history)
      if (ev.key === 'ArrowUp') {
        const tab = tabsRef.current.find(t => t.id === tabId);
        if (tab && tab.commandHistory.length > 0) {
          const newIndex = historyIndex === -1
            ? tab.commandHistory.length - 1
            : Math.max(0, historyIndex - 1);

          if (newIndex !== historyIndex || historyIndex === -1) {
            // Clear current line
            for (let i = 0; i < currentInput.length; i++) {
              terminal.write('\b \b');
            }

            historyIndex = newIndex;
            currentInput = tab.commandHistory[historyIndex];
            currentInputRef.current = currentInput;
            terminal.write(currentInput);
          }
        }
        return;
      }

      // Handle Down Arrow (history)
      if (ev.key === 'ArrowDown') {
        const tab = tabsRef.current.find(t => t.id === tabId);
        if (tab && historyIndex !== -1) {
          // Clear current line
          for (let i = 0; i < currentInput.length; i++) {
            terminal.write('\b \b');
          }

          if (historyIndex < tab.commandHistory.length - 1) {
            historyIndex++;
            currentInput = tab.commandHistory[historyIndex];
          } else {
            historyIndex = -1;
            currentInput = '';
          }
          currentInputRef.current = currentInput;
          terminal.write(currentInput);
        }
        return;
      }

      // Handle printable characters
      if (printable && key.length === 1) {
        currentInput += key;
        currentInputRef.current = currentInput;
        terminal.write(key);
      }
    });

    // Update tab with terminal instance
    setTabs(prev => prev.map(t => {
      if (t.id === tabId) {
        return { ...t, terminal, fitAddon };
      }
      return t;
    }));

    return { terminal, fitAddon };
  }, [getPrompt, currentDir]);

  // Initialize terminal for active tab
  useEffect(() => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (activeTab && !activeTab.terminal && terminalContainerRef.current) {
      // Clear container using safe method
      clearElement(terminalContainerRef.current);
      initTerminal(activeTabId);
    }
  }, [activeTabId, tabs, initTerminal]);

  // Handle window resize
  useEffect(() => {
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (activeTab?.fitAddon && activeTab?.terminal) {
      const timer = setTimeout(() => {
        activeTab.fitAddon?.fit();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [windowState.size.width, windowState.size.height, activeTabId, tabs]);

  // Resize observer
  useEffect(() => {
    if (!terminalContainerRef.current) return;

    const observer = new ResizeObserver(() => {
      const activeTab = tabs.find(t => t.id === activeTabId);
      if (activeTab?.fitAddon) {
        setTimeout(() => {
          activeTab.fitAddon?.fit();
        }, 50);
      }
    });

    observer.observe(terminalContainerRef.current);
    return () => observer.disconnect();
  }, [activeTabId, tabs]);

  const addTab = () => {
    const newId = String(Date.now());
    const newTab: TerminalTab = {
      id: newId,
      name: `Terminal ${tabs.length + 1}`,
      terminal: null,
      fitAddon: null,
      commandHistory: [],
      historyIndex: -1,
      currentInput: '',
    };

    // Clean up old terminal
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (activeTab?.terminal) {
      activeTab.terminal.dispose();
    }

    setTabs(prev => [...prev.map(t => ({ ...t, terminal: null, fitAddon: null })), newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;

    const tabToClose = tabs.find(t => t.id === id);
    if (tabToClose?.terminal) {
      tabToClose.terminal.dispose();
    }

    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);

    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const switchTab = (id: string) => {
    if (id === activeTabId) return;

    // Dispose current terminal
    const currentTab = tabs.find(t => t.id === activeTabId);
    if (currentTab?.terminal) {
      currentTab.terminal.dispose();
    }

    // Clear terminal refs for all tabs
    setTabs(prev => prev.map(t => ({ ...t, terminal: null, fitAddon: null })));
    setActiveTabId(id);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Tabs */}
      <div className="flex items-center bg-neutral-900 border-b border-white/10">
        <div className="flex-1 flex items-center overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-white/10 transition-colors ${
                activeTabId === tab.id
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-neutral-900 text-white/50 hover:text-white/80'
              }`}
            >
              <span className="text-xs font-mono">{tab.name}</span>
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

      {/* Terminal Container */}
      <div
        ref={terminalContainerRef}
        className="flex-1 p-2"
        style={{ minHeight: 0 }}
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-neutral-900 border-t border-white/10 text-xs font-mono">
        <span className="text-white/40">{currentDir}</span>
        <span className="text-white/40">bash</span>
      </div>
    </div>
  );
}

export default TerminalApp;
