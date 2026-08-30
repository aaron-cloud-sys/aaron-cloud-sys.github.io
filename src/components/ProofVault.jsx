import React from 'react';
import { QUANT_BENCHMARKS, CAPABILITY_VAULT } from '../data/portfolioData';
import { Award, Check, TrendingUp, Cpu, Database, Layout, Shield } from 'lucide-react';

export default function ProofVault() {
  const capabilityIcons = [Cpu, Database, Layout, Shield];

  return (
    <section id="proof" className="border-b border-zinc-900 bg-black py-28 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-zinc-900 pb-6">
          <div>
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">
              // 03 AUDITED BENCHMARKS & CAPABILITY MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Proof & Competencies
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 mt-2 sm:mt-0">
            MATHEMATICAL PRECISION & ENTERPRISE SCALE
          </p>
        </div>

        {/* Quant Benchmarks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 mb-20">
          {QUANT_BENCHMARKS.map((bench) => (
            <div
              key={bench.id}
              className="bg-black p-8 transition hover:bg-zinc-950"
            >
              <div className="font-mono text-4xl sm:text-6xl font-bold text-white tracking-tighter mb-3">
                {bench.value}
              </div>
              <div className="font-mono text-sm font-semibold uppercase text-zinc-200 mb-1">
                {bench.metric}
              </div>
              <div className="text-xs text-zinc-500">
                {bench.context}
              </div>
            </div>
          ))}
        </div>

        {/* Capability Matrix 4 Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPABILITY_VAULT.map((cap, idx) => {
            const Icon = capabilityIcons[idx] || Cpu;
            return (
              <div
                key={cap.category}
                className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 transition hover:border-zinc-500"
              >
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 mb-6">
                  <div className="p-2.5 border border-zinc-800 bg-black text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm font-bold uppercase text-white tracking-wider">
                    {cap.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cap.tech.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 border border-zinc-900 bg-black px-3 py-2 text-xs font-mono text-zinc-300"
                    >
                      <Check className="h-3 w-3 text-white shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
