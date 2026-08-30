import React, { useEffect, useRef } from 'react';
import { BRAND_IDENTITY } from '../data/portfolioData';
import { ArrowDown, Play, Terminal, Shield, Activity, Database } from 'lucide-react';
import gsap from 'gsap';

export default function HeroNoir() {
  const containerRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const tagRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      )
        .fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          barRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-4 sm:px-8 border-b border-zinc-900 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full my-auto">
        
        {/* Overhead Identification Tag */}
        <div ref={tagRef} className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            // {BRAND_IDENTITY.coordinates}
          </span>
          <span className="h-px w-10 bg-zinc-800" />
          <span className="font-mono text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            {BRAND_IDENTITY.version}
          </span>
        </div>

        {/* Monolithic Kinetic Typography Header */}
        <div className="mb-10 max-w-6xl">
          <div className="overflow-hidden mb-1">
            <h1
              ref={headlineLine1Ref}
              className="font-mono text-xs sm:text-base tracking-[0.25em] text-zinc-400 font-semibold uppercase"
            >
              {BRAND_IDENTITY.name} : {BRAND_IDENTITY.tagline}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2
              ref={headlineLine2Ref}
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white uppercase leading-[0.95] text-balance font-display"
            >
              Zero Latency. Zero Error.
            </h2>
          </div>
        </div>

        {/* Narrative Thesis */}
        <p
          ref={bioRef}
          className="text-lg sm:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-12 font-light tracking-wide"
        >
          Specialized in engineering autonomous multi-agent pipelines, deterministic document ingestion, and quantitative enterprise operations. Slashed processing cycles by <span className="text-white font-medium border-b border-zinc-500">60%</span> and managed <span className="text-white font-medium border-b border-zinc-500">₹1.5Cr+</span> in mission-critical logistics and compliance pipelines.
        </p>

        {/* Call to Actions */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-20">
          <a
            href="#exhibition"
            className="group flex items-center gap-3 bg-white text-black px-7 py-4 font-mono text-xs font-bold uppercase tracking-wider transition hover:bg-zinc-200"
          >
            <span>INSPECT ARCHITECTURE</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>

          <a
            href="#telemetry"
            className="flex items-center gap-2.5 border border-zinc-800 bg-zinc-950 px-6 py-4 font-mono text-xs text-zinc-200 tracking-wider uppercase transition hover:border-white hover:bg-zinc-900 hover:text-white"
          >
            <Play className="h-3.5 w-3.5 fill-white text-white" />
            <span>LIVE SYSTEM NODES</span>
          </a>

          <a
            href="#cli-console"
            className="flex items-center gap-2 border border-zinc-800 bg-transparent px-5 py-4 font-mono text-xs text-zinc-400 tracking-wider uppercase transition hover:border-zinc-600 hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>TERMINAL CLI</span>
          </a>
        </div>

      </div>

      {/* Bottom Telemetry Strip */}
      <div
        ref={barRef}
        className="mx-auto max-w-7xl w-full grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900"
      >
        <div className="bg-black p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-1">
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            <span>CORE DISCIPLINE</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-white uppercase">
            AGENTIC LLM PARSERS
          </div>
        </div>

        <div className="bg-black p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-1">
            <Shield className="h-3.5 w-3.5 text-zinc-400" />
            <span>COMPLIANCE ACCURACY</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-white uppercase">
            99.8% PRECISION
          </div>
        </div>

        <div className="bg-black p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-1">
            <Activity className="h-3.5 w-3.5 text-zinc-400" />
            <span>COMMERCIAL VOLUME</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-white uppercase">
            ₹1.5CR+ FULFILLED
          </div>
        </div>

        <div className="bg-black p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 mb-1">
            <Database className="h-3.5 w-3.5 text-zinc-400" />
            <span>EXECUTION STACK</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-white uppercase">
            PYTHON / CDP / REACT 19
          </div>
        </div>
      </div>

    </section>
  );
}
