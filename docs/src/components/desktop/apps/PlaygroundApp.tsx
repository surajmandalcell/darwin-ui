"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { WindowState } from '../../../contexts/desktop-context';
import {
  Play,
  Copy,
  Check,
  RotateCcw,
  Settings,
  Code2,
} from 'lucide-react';
import { Button } from '@smc/darwin-ui';

interface PlaygroundAppProps {
  windowState: WindowState;
}

const templates = [
  { id: 'button', name: 'Button', code: `<Button variant="primary">Click me</Button>` },
  { id: 'input', name: 'Input', code: `<Input placeholder="Enter text..." />` },
  { id: 'toggle', name: 'Toggle', code: `<Toggle checked={true} onChange={() => {}} />` },
  { id: 'checkbox', name: 'Checkbox', code: `<Checkbox checked={true} label="Accept terms" />` },
  { id: 'alert', name: 'Alert', code: `<Alert variant="info">This is an alert</Alert>` },
];

const buttonVariants = ['primary', 'secondary', 'ghost', 'destructive'] as const;
const buttonSizes = ['sm', 'default', 'lg'] as const;

export function PlaygroundApp({ windowState: _windowState }: PlaygroundAppProps) {
  const [activeTemplate, setActiveTemplate] = useState('button');
  const [code, setCode] = useState(templates[0].code);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  // Button playground state
  const [buttonVariant, setButtonVariant] = useState<typeof buttonVariants[number]>('primary');
  const [buttonSize, setButtonSize] = useState<typeof buttonSizes[number]>('default');
  const [buttonText, setButtonText] = useState('Click me');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setButtonVariant('primary');
    setButtonSize('default');
    setButtonText('Click me');
    setButtonDisabled(false);
  };

  // Generate code from current state
  const generatedCode = `<Button
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}
>
  ${buttonText}
</Button>`;

  return (
    <div className="flex h-full bg-[#1e1e20]">
      {/* Templates Sidebar */}
      <motion.div
        className="w-44 bg-[#161618] border-r border-white/10 flex flex-col"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="p-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Templates
        </div>
        <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                setActiveTemplate(template.id);
                setCode(template.code);
              }}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTemplate === template.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {template.name}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1c] border-b border-white/10">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-green-400" />
            <span className="text-sm text-white/70">Live Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded transition-colors ${
                showSettings ? 'text-blue-400 bg-blue-500/20' : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Preview Panel */}
          <div className="flex-1 flex flex-col">
            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0b]">
              <motion.div
                key={`${buttonVariant}-${buttonSize}-${buttonDisabled}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Button
                  variant={buttonVariant}
                  size={buttonSize}
                  disabled={buttonDisabled}
                >
                  {buttonText}
                </Button>
              </motion.div>
            </div>

            {/* Code Panel */}
            <div className="h-40 border-t border-white/10 bg-[#1a1a1c]">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Code2 className="w-4 h-4" />
                  <span>Code</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-auto h-[calc(100%-40px)] text-sm font-mono text-white/80">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <motion.div
              className="w-64 border-l border-white/10 bg-[#161618] overflow-y-auto"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Props
                </h3>
              </div>

              <div className="p-4 space-y-5">
                {/* Variant */}
                <div>
                  <label className="block text-xs text-white/50 mb-2">Variant</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {buttonVariants.map((v) => (
                      <button
                        key={v}
                        onClick={() => setButtonVariant(v)}
                        className={`px-2 py-1.5 text-xs rounded-md transition-colors ${
                          buttonVariant === v
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs text-white/50 mb-2">Size</label>
                  <div className="flex gap-1.5">
                    {buttonSizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setButtonSize(s)}
                        className={`flex-1 px-2 py-1.5 text-xs rounded-md transition-colors ${
                          buttonSize === s
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <label className="block text-xs text-white/50 mb-2">Label</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                {/* Disabled */}
                <div className="flex items-center justify-between">
                  <label className="text-xs text-white/50">Disabled</label>
                  <button
                    onClick={() => setButtonDisabled(!buttonDisabled)}
                    className={`w-10 h-5 rounded-full transition-colors ${
                      buttonDisabled ? 'bg-blue-500' : 'bg-white/20'
                    }`}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow"
                      animate={{ x: buttonDisabled ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaygroundApp;
