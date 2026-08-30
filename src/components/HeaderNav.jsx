import React, { useState, useEffect } from 'react';
import { BRAND_IDENTITY } from '../data/portfolioData';
import { Terminal, Copy, Check, FileText, ArrowUpRight } from 'lucide-react';

export default function HeaderNav() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(BRAND_IDENTITY.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 pointer-events-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        
        {/* Left: Brand Monogram */}
        <a
          href="#"
          className="pointer-events-auto group flex items-center gap-3 border border-zinc-800/80 bg-zinc-950/80 px-3.5 py-2 backdrop-blur-md transition hover:border-zinc-500 hover:bg-zinc-900"
        >
          <div className="flex h-6 w-6 items-center justify-center bg-white text-black font-mono text-xs font-bold">
            AS
          </div>
          <div className="text-left font-mono">
            <span className="block text-xs font-bold tracking-widest text-white uppercase">
              {BRAND_IDENTITY.name}
            </span>
            <span className="block text-[9px] tracking-wider text-zinc-500 uppercase">
              AUTONOMOUS SYSTEMS
            </span>
          </div>
        </a>

        {/* Center: System Status Indicator */}
        <div className="hidden lg:flex items-center gap-3 border border-zinc-800/80 bg-zinc-950/80 px-4 py-2 backdrop-blur-md font-mono text-[11px] text-zinc-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span>PIPELINES OPERATIONAL</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-300 font-semibold">{time || '12:00:00 IST'}</span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 border border-zinc-800/80 bg-zinc-950/80 px-3.5 py-2 font-mono text-xs text-zinc-300 backdrop-blur-md transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span className="font-semibold text-white">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>EMAIL</span>
              </>
            )}
          </button>

          <a
            href={BRAND_IDENTITY.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-1.5 border border-white bg-white px-3.5 py-2 font-mono text-xs font-bold text-black backdrop-blur-md transition hover:bg-zinc-200"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>RESUME</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

      </div>
    </header>
  );
}
