import React, { useState, useRef, useEffect } from 'react';
import { CLI_COMMANDS } from '../data/portfolioData';
import { CornerDownLeft } from 'lucide-react';

const AVAILABLE_COMMANDS = ['help', 'about', 'skills', 'projects', 'metrics', 'contact', 'resume', 'clear'];

export default function CommandConsole() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { command: 'init', output: "Welcome to Ayush Swain CLI v4.0.0. Type 'help' for available system commands." },
    { command: 'metrics', output: CLI_COMMANDS.metrics },
  ]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const cmdHistory = useRef([]);

  const executeCommand = (cmdStr) => {
    const clean = cmdStr.trim().toLowerCase();
    if (!clean) return;

    if (clean === 'clear') {
      setHistory([]);
      setInputVal('');
      cmdHistory.current = [];
      setCmdIndex(-1);
      return;
    }

    cmdHistory.current = [clean, ...cmdHistory.current.slice(0, 20)];
    setCmdIndex(-1);

    const output = CLI_COMMANDS[clean] || `Command not found: '${clean}'. Type 'help' for available commands.`;
    setHistory((prev) => [...prev, { command: clean, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.current.length - 1);
      setCmdIndex(next);
      setInputVal(cmdHistory.current[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInputVal(next === -1 ? '' : (cmdHistory.current[next] || ''));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = inputVal.toLowerCase();
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(partial) && c !== partial);
      if (match) setInputVal(match);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section
      id="cli-console"
      className="scroll-mt-24"
      style={{
        position: 'relative',
        background: '#000',
        borderBottom: '1px solid #111',
        padding: 'clamp(5.5rem, 11vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Edge-bleed section number */}
      <div
        style={{
          position: 'absolute',
          top: '-4%',
          right: '-2%',
          fontFamily: 'var(--font-editorial)',
          fontSize: 'clamp(14rem, 28vw, 24rem)',
          fontWeight: 900,
          lineHeight: 1,
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          color: 'transparent',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.06em',
          zIndex: 0,
        }}
      >
        06
      </div>

      {/* Side label */}
      <div
        style={{
          position: 'absolute',
          left: '-2rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.12)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        TERMINAL
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '56rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #111' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            // 06 DIRECT INTERACTIVE CLI CONSOLE
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: '#fff',
                textTransform: 'uppercase',
                lineHeight: 0.95,
              }}
            >
              System Command Line
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              TAB autocomplete / ARROWS for history
            </span>
          </div>
        </div>

        {/* Quick command pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.25rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              paddingTop: '0.3rem',
              marginRight: '0.25rem',
            }}
          >
            QUICK:
          </span>
          {AVAILABLE_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => { executeCommand(cmd); inputRef.current?.focus(); }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                padding: '0.25rem 0.65rem',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'lowercase',
                transition: 'border-color 0.15s, color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal window */}
        <div
          style={{
            border: `1px solid ${isFocused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
            background: '#050505',
            transition: 'border-color 0.25s',
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
              background: '#0a0a0a',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {['#2a2a2a', '#2a2a2a', '#2a2a2a'].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: c,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.08em',
                }}
              >
                ayush@terminal: ~ bash
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.1em',
              }}
            >
              BASH / NODE_v22
            </span>
          </div>

          {/* Log area */}
          <div
            style={{
              padding: '1.5rem',
              maxHeight: '22rem',
              minHeight: '14rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#1a1a1a #000',
            }}
          >
            {history.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>ayush</span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>@</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>system:~$</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)' }}>{item.command}</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.65,
                    paddingLeft: '1rem',
                    borderLeft: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              background: '#000',
              padding: '0.75rem 1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#fff',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              ayush@system:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="type a command..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#fff',
                caretColor: '#fff',
              }}
            />
            <button
              onClick={() => { executeCommand(inputVal); inputRef.current?.focus(); }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.4)',
                padding: '0.3rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              <CornerDownLeft size={13} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
