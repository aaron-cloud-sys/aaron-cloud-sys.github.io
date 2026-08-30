import React, { useState, useRef, useEffect } from 'react';
import { CLI_COMMANDS, BRAND_IDENTITY } from '../data/portfolioData';
import { Terminal, Send, Check, CornerDownLeft, Sparkles } from 'lucide-react';

export default function CommandConsole() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { command: 'init', output: `Welcome to Ayush Swain CLI v4.0.0. Type 'help' to inspect available system commands.` },
    { command: 'metrics', output: CLI_COMMANDS.metrics }
  ]);
  const bottomRef = useRef(null);

  const availableCommands = ['help', 'about', 'skills', 'projects', 'metrics', 'contact', 'resume', 'clear'];

  const executeCommand = (cmdStr) => {
    const clean = cmdStr.trim().toLowerCase();
    if (!clean) return;

    if (clean === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const output = CLI_COMMANDS[clean] || `Command not found: '${clean}'. Type 'help' for available commands.`;
    setHistory((prev) => [...prev, { command: clean, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section id="cli-console" className="border-b border-zinc-900 bg-black py-28 px-4 sm:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 border-b border-zinc-900 pb-6">
          <div>
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">
              // 04 DIRECT INTERACTIVE CLI CONSOLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-mono">
              System Command Line
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 mt-2 sm:mt-0">
            DISPATCH QUERIES DIRECTLY TO THE ENGINE
          </p>
        </div>

        {/* Quick Clickable Command Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-xs">
          <span className="text-zinc-500 mr-2 text-[11px]">QUICK COMMANDS:</span>
          {availableCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-zinc-400 hover:border-white hover:text-white transition"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="border border-zinc-800 bg-zinc-950/90 font-mono text-xs shadow-2xl">
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full border border-zinc-600 bg-zinc-800" />
                <div className="h-2.5 w-2.5 rounded-full border border-zinc-600 bg-zinc-800" />
                <div className="h-2.5 w-2.5 rounded-full border border-zinc-600 bg-zinc-800" />
              </div>
              <span className="text-zinc-400 text-[11px] ml-2">
                ayush@terminal:~$
              </span>
            </div>
            <span className="text-[10px] text-zinc-600">BASH / NODE_v22</span>
          </div>

          {/* Terminal Log Area */}
          <div className="p-6 max-h-[360px] min-h-[220px] overflow-y-auto space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-white font-bold">ayush@system:~$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="text-zinc-300 pl-4 border-l border-zinc-800 leading-relaxed font-sans text-xs">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Input Form */}
          <div className="flex items-center border-t border-zinc-800 bg-black px-4 py-3">
            <span className="text-white font-bold mr-2 text-sm">ayush@system:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. 'about', 'projects', 'contact')..."
              className="flex-1 bg-transparent text-white placeholder:text-zinc-600 focus:outline-none text-xs font-mono"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-1.5 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-white hover:text-white transition"
              title="Execute"
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
