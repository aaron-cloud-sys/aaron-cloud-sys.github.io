import React, { useState, useEffect } from 'react';
import { BRAND_IDENTITY } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { Volume2, VolumeX, Copy, Check, ArrowUpRight, Terminal } from 'lucide-react';

export default function HeaderNav() {
  const [copied, setCopied] = useState(false);
  const [timeIST, setTimeIST] = useState('');
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Upper navigation vanishes at top and reveals by the 5th scroll (~480px)
      const isScrolled = window.scrollY >= 480;
      setVisible(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeIST(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(BRAND_IDENTITY.email);
    soundFx.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    setMuted(isMuted);
    if (!isMuted) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { label: '3D GATEWAY', href: '#hero' },
    { label: 'TOPOLOGY', href: '#topology' },
    { label: 'ARCHITECTURES', href: '#exhibition' },
    { label: 'TELEMETRY', href: '#telemetry' },
    { label: 'TIMELINE', href: '#timeline' },
    { label: 'TERMINAL', href: '#cli-console' },
  ];

  return (
    <header
      className={`fixed top-3 left-0 right-0 z-40 px-3 sm:px-6 transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-6 pointer-events-none [&_*]:pointer-events-none'
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
        
        {/* Left: Brand Identity Emblem */}
        <a
          href="#"
          onClick={() => soundFx.playClick()}
          className="pointer-events-auto group flex items-center gap-3 bg-zinc-950/80 border border-zinc-800/80 px-3.5 py-2 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-zinc-900/90 shadow-2xl"
        >
          <div className="flex h-6 w-6 items-center justify-center bg-white text-black font-mono text-xs font-black tracking-tighter shadow-sm transition-transform group-hover:scale-105">
            AS
          </div>
          <div className="text-left font-mono">
            <span className="block text-[11px] font-bold tracking-widest text-white uppercase group-hover:text-zinc-200">
              {BRAND_IDENTITY.name}
            </span>
            <span className="block text-[8.5px] tracking-wider text-zinc-500 uppercase">
              AUTONOMOUS SYSTEMS ARCHITECT
            </span>
          </div>
        </a>

        {/* Center: Interactive Nav Anchor Bar */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-zinc-950/80 border border-zinc-800/80 px-3 py-1.5 backdrop-blur-xl font-mono text-[11px] shadow-2xl">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => soundFx.playClick()}
              className="px-3 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}
          <div className="h-3 w-px bg-zinc-800 mx-1.5" />
          <div className="flex items-center gap-2 px-2 text-[10px] text-zinc-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </span>
            <span className="text-zinc-300 font-medium">{timeIST || '12:00:00 IST'}</span>
          </div>
        </nav>

        {/* Right: Tactical Controls & Audio Toggle */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 bg-zinc-950/80 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-white/30 backdrop-blur-xl transition shadow-lg cursor-pointer"
            title={muted ? 'Unmute Acoustic Feedback' : 'Mute Acoustic Feedback'}
          >
            {muted ? (
              <VolumeX className="h-3.5 w-3.5 text-zinc-500" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-zinc-200" />
            )}
          </button>

          {/* Copy Email Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-800/80 px-3 py-2 font-mono text-xs text-zinc-300 backdrop-blur-xl transition hover:border-white/40 hover:bg-zinc-900 hover:text-white shadow-lg cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span className="font-bold text-white text-[11px]">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-[11px]">EMAIL</span>
              </>
            )}
          </button>

          {/* Resume Link */}
          <a
            href={BRAND_IDENTITY.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 bg-white text-black font-mono text-xs font-bold px-3.5 py-2 uppercase tracking-wider transition hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span>Resume</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
