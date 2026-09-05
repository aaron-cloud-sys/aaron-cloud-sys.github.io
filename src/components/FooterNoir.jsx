import React, { useState } from 'react';
import { BRAND_IDENTITY } from '../data/portfolioData';
import { soundFx } from '../utils/audio';
import { Copy, Check, Mail, FileText, ArrowUpRight, Terminal, Globe2, ShieldCheck } from 'lucide-react';

export default function FooterNoir() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BRAND_IDENTITY.email);
    soundFx.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-black pt-28 pb-16 px-4 sm:px-8 border-t border-zinc-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-noir-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Main Haute-Horlogerie Conversion Stage */}
        <div className="glass-card border border-zinc-700/80 bg-zinc-950/90 p-8 sm:p-16 text-center max-w-5xl mx-auto mb-20 relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 border border-zinc-800 bg-black px-3.5 py-1 font-mono text-[11px] text-zinc-400 mb-6 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>// DIRECT DISPATCH & ARCHITECTURAL INTAKE</span>
            </div>

            <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white uppercase mb-6 leading-tight font-display">
              Ready to automate high-stakes pipelines?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              Whether you require autonomous document intelligence pipelines, non-destructive browser automation, or financial multi-ledger audit engines, I am available for high-impact production engagements.
            </p>

            {/* Direct Conversion Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white px-7 py-4 font-mono text-xs font-bold text-black uppercase transition hover:bg-zinc-200 shadow-lg"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>COPY EMAIL: {BRAND_IDENTITY.email}</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${BRAND_IDENTITY.email}`}
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 border border-zinc-800 bg-black px-6 py-4 font-mono text-xs font-semibold text-white uppercase transition hover:border-white hover:bg-zinc-900"
              >
                <Mail className="h-4 w-4" />
                <span>OPEN MAIL CLIENT</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
              </a>

              <a
                href={BRAND_IDENTITY.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 border border-zinc-800 bg-black px-6 py-4 font-mono text-xs font-semibold text-zinc-300 uppercase transition hover:border-zinc-500 hover:text-white"
              >
                <FileText className="h-4 w-4" />
                <span>DOWNLOAD RESUME PDF</span>
              </a>
            </div>

            {/* Social Network Anchors */}
            <div className="flex items-center justify-center gap-8 mt-12 font-mono text-xs text-zinc-400">
              <a
                href={BRAND_IDENTITY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-600" />
              </a>

              <a
                href={BRAND_IDENTITY.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-600" />
              </a>
            </div>

          </div>
        </div>

        {/* Global System Telemetry Diagnostics Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 pt-8 font-mono text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-zinc-400" />
            <span className="text-white font-bold uppercase">{BRAND_IDENTITY.name}</span>
            <span>// {BRAND_IDENTITY.version}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Globe2 className="h-3.5 w-3.5" />
              <span>{BRAND_IDENTITY.coordinates} ({BRAND_IDENTITY.location.split('//')[0].trim()})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-zinc-300 font-semibold">ALL SYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
