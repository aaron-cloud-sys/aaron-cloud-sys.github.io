import React, { useState } from 'react';
import { TELEMETRY_NODES } from '../data/portfolioData';
import { Cpu, Activity, ShieldCheck, Database, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

export default function TelemetryGraph() {
  const [selectedNode, setSelectedNode] = useState(TELEMETRY_NODES[0]);
  const [simulating, setSimulating] = useState(false);
  const [pulseCount, setPulseCount] = useState(1);

  const handleSimulateNode = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setPulseCount((prev) => prev + 1);
    }, 1200);
  };

  const icons = [Cpu, ShieldCheck, Database, Activity];

  return (
    <section id="telemetry" className="border-b border-zinc-900 bg-black py-28 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-zinc-900 pb-6">
          <div>
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">
              // 01 ARCHITECTURAL TOPOLOGY & LIVE NODES
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Autonomous Node Matrix
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 mt-2 sm:mt-0">
            SELECT NODE TO INSPECT TELEMETRY
          </p>
        </div>

        {/* Node Grid Selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {TELEMETRY_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const Icon = icons[index] || Cpu;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-5 text-left border font-mono transition-all ${
                  isSelected
                    ? 'border-white bg-zinc-900 text-white'
                    : 'border-zinc-900 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 border ${isSelected ? 'border-white bg-white text-black' : 'border-zinc-800 bg-black text-zinc-400'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-zinc-500">NODE 0{index + 1}</span>
                </div>
                <div className="text-xs font-bold uppercase truncate mb-1">
                  {node.name.replace(/_/g, ' ')}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span>LATENCY: {node.latency}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Telemetry Inspector Display */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          
          {/* Top Inspector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-5 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-1">
                <span>NODE STATUS: </span>
                <span className="text-white font-bold">{selectedNode.status}</span>
                <span>//</span>
                <span>THROUGHPUT: {selectedNode.throughput}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-mono">
                {selectedNode.name}
              </h3>
            </div>

            <button
              onClick={handleSimulateNode}
              disabled={simulating}
              className="flex items-center gap-2 border border-white bg-white px-4 py-2 font-mono text-xs font-bold text-black uppercase transition hover:bg-zinc-200 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${simulating ? 'animate-spin' : ''}`} />
              <span>{simulating ? 'PINGING TELEMETRY...' : 'PING NODE STREAM'}</span>
            </button>
          </div>

          {/* Detailed Topology Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
            
            {/* Description & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                {selectedNode.description}
              </p>

              <div className="grid grid-cols-3 gap-2 bg-black p-4 border border-zinc-900 text-xs">
                {Object.entries(selectedNode.metrics).map(([key, val]) => (
                  <div key={key}>
                    <div className="text-[10px] text-zinc-500 uppercase">{key}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Stream Telemetry Packet View */}
            <div className="lg:col-span-5 bg-black p-4 border border-zinc-900 text-[11px] text-zinc-400">
              <div className="flex items-center justify-between text-zinc-600 border-b border-zinc-900 pb-2 mb-3">
                <span>TELEMETRY PACKET [PULSE #{pulseCount}]</span>
                <span className="text-white">ACTIVE</span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Runtime Kernel:</span>
                  <span className="text-zinc-200">agy.core.node_v4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Avg Roundtrip:</span>
                  <span className="text-zinc-200">{selectedNode.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Audit Status:</span>
                  <span className="text-white font-semibold">100% VERIFIED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Buffer Allocation:</span>
                  <span className="text-zinc-200">128 MB</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-900 text-white font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                    <span>Integrity Signature:</span>
                  </span>
                  <span className="text-[10px] text-zinc-400">0x9f32...88ab</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
