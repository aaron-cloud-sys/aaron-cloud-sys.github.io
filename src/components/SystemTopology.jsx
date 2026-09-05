import React, { useState, useRef, useEffect } from 'react';
import { Cpu, ShieldCheck, Database, Activity, Terminal, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOPOLOGY_NODES = [
  {
    id: 'node-ingestion',
    label: 'Agentic Ingestion Orchestrator',
    shortLabel: 'DOC_INGEST_V4',
    category: 'INTELLIGENCE',
    icon: Cpu,
    x: 22,
    y: 28,
    status: 'OPTIMAL',
    latency: '11ms',
    throughput: '182 POs / Month',
    integrity: 'SHA-256 Validated',
    precision: '99.8% Extraction Accuracy',
    description:
      'Autonomous multimodal document intelligence parsing commercial purchase orders, tax invoices, and bank guarantees into strict validated JSON schemas.',
    stack: ['Python 3.12', 'Pydantic V2', 'LangChain', 'PyMuPDF', 'LayoutLM'],
    connections: ['node-orchestrator', 'node-gem'],
  },
  {
    id: 'node-gem',
    label: 'GeM Compliance Autopilot',
    shortLabel: 'GEM_CDP_CORE',
    category: 'REGULATORY',
    icon: ShieldCheck,
    x: 78,
    y: 26,
    status: 'ACTIVE',
    latency: '24ms',
    throughput: '80+ Government Contracts',
    integrity: '0 Compliance Errors',
    precision: '100% Contract Adherence',
    description:
      'Non-destructive browser automation via Chrome DevTools Protocol on port 9222. Automates ePBG bank guarantee fulfillment, full-order invoices, and OTP verification.',
    stack: ['Chrome CDP', 'Playwright', 'Node.js', 'React Synthetic Events', 'OCR'],
    connections: ['node-orchestrator', 'node-dispatch'],
  },
  {
    id: 'node-orchestrator',
    label: 'Central Deterministic Runtime',
    shortLabel: 'CORE_KERNEL',
    category: 'ORCHESTRATION',
    icon: Layers,
    isCenter: true,
    x: 50,
    y: 52,
    status: 'NOMINAL',
    latency: '8ms',
    throughput: 'Continuous Event Stream',
    integrity: 'Lock-Free AsyncIO',
    precision: '<12ms Cycle Latency',
    description:
      'The central nerve center coordinating document ingestion, cross-ledger accounting feeds, statutory portal submissions, and real-time operational notifications.',
    stack: ['FastAPI', 'AsyncIO', 'Webhooks', 'Pydantic', 'Distributed Lock'],
    connections: ['node-ingestion', 'node-gem', 'node-ledger', 'node-dispatch'],
  },
  {
    id: 'node-ledger',
    label: 'Institutional Ledger Reconciler',
    shortLabel: 'FIN_AUDIT_V3',
    category: 'QUANTITATIVE',
    icon: Database,
    x: 24,
    y: 78,
    status: 'ACTIVE',
    latency: '9ms',
    throughput: '₹95L+ Audited / Run',
    integrity: 'Zero Discrepancy Margin',
    precision: '99.8% Mathematical Precision',
    description:
      'Algorithmic dual-entry accounting engine cross-referencing commercial PO lines against real-time bank statement feeds and statutory GST breakdowns.',
    stack: ['Python', 'NumPy', 'Pandas', 'OpenPyXL', 'PostgreSQL'],
    connections: ['node-orchestrator'],
  },
  {
    id: 'node-dispatch',
    label: 'Commercial Fleet Dispatch Core',
    shortLabel: 'FLEET_OPS_CORE',
    category: 'OPERATIONS',
    icon: Activity,
    x: 76,
    y: 76,
    status: 'OPTIMAL',
    latency: '28ms',
    throughput: '50+ Commercial Dispatches',
    integrity: 'Waybill Synced',
    precision: '98% On-Time Delivery',
    description:
      'Dynamic operations engine orchestrating OEM manufacturing build specs, logistics waybills, and institutional client delivery handoffs.',
    stack: ['SharePoint REST', 'PyAutoGUI', 'Excel Automation', 'Logistics API'],
    connections: ['node-orchestrator', 'node-gem'],
  },
];

export default function SystemTopology() {
  const [activeNodeId, setActiveNodeId] = useState('node-orchestrator');
  const [isPinging, setIsPinging] = useState(false);
  const [pulseWave, setPulseWave] = useState(0);
  const sectionRef = useRef(null);
  const graphRef = useRef(null);

  const activeNode = TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[2];

  const handlePingNode = () => {
    if (isPinging) return;
    soundFx.playBlip();
    setIsPinging(true);
    setPulseWave((prev) => prev + 1);
    setTimeout(() => {
      soundFx.playSuccess();
      setIsPinging(false);
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      id="topology"
      className="relative border-b border-zinc-900 bg-black pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-8 overflow-hidden scroll-mt-28"
    >
      {/* Background Architectural Index */}
      <div
        aria-hidden="true"
        className="absolute top-2 right-4 font-mono text-[12rem] sm:text-[18rem] font-black text-transparent select-none pointer-events-none z-0"
        style={{
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
          lineHeight: 0.8,
        }}
      >
        02
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
              // 02 SYSTEM TOPOLOGY &amp; OPERATIONAL NODES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Autonomous Node Matrix
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-md leading-relaxed">
            Live interactive topological graph of autonomous execution runtime. Select any node to inspect subsystem SLA, integrity telemetry, and active protocol stack.
          </div>
        </div>

        {/* Main Grid: Interactive Canvas on Left, Telemetry Drawer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Topological Map Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950/70 border border-zinc-800/80 p-6 sm:p-8 relative overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Top Bar Indicators */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 uppercase tracking-wider font-semibold">
                  TOPOLOGY RUNTIME: NOMINAL
                </span>
              </div>
              <div className="text-zinc-500 uppercase tracking-widest text-[11px]">
                5 ACTIVE PIPELINE NODES
              </div>
            </div>

            {/* Interactive Topological Stage */}
            <div
              ref={graphRef}
              className="relative w-full aspect-[4/3] bg-black/80 border border-zinc-900/90 rounded-sm overflow-hidden"
            >
              {/* Subtle Coordinate Grid Overlay */}
              <div className="absolute inset-0 bg-noir-grid opacity-30 pointer-events-none" />

              {/* Dynamic Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {TOPOLOGY_NODES.map((source) =>
                  source.connections.map((targetId) => {
                    const target = TOPOLOGY_NODES.find((n) => n.id === targetId);
                    if (!target || source.id > target.id) return null;

                    const isSourceActive = source.id === activeNodeId;
                    const isTargetActive = target.id === activeNodeId;
                    const isEdgeActive = isSourceActive || isTargetActive;

                    return (
                      <g key={`${source.id}-${target.id}`}>
                        <line
                          x1={`${source.x}%`}
                          y1={`${source.y}%`}
                          x2={`${target.x}%`}
                          y2={`${target.y}%`}
                          stroke={isEdgeActive ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.1)'}
                          strokeWidth={isEdgeActive ? 2 : 1}
                          strokeDasharray={isEdgeActive ? 'none' : '4 4'}
                        />
                        {isEdgeActive && (
                          <circle r="3" fill="#ffffff">
                            <animateMotion
                              path={`M ${source.x * 4.8} ${source.y * 3.6} L ${target.x * 4.8} ${target.y * 3.6}`}
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })
                )}
              </svg>

              {/* Node Hotspots */}
              {TOPOLOGY_NODES.map((node) => {
                const isSelected = node.id === activeNodeId;
                const IconComponent = node.icon;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveNodeId(node.id);
                    }}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-transform duration-300 ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                    }`}
                  >
                    {/* Glowing Pulse Ring for Selected Node */}
                    {isSelected && (
                      <span className="absolute -inset-2.5 rounded-full border border-white/30 animate-ping pointer-events-none opacity-40" />
                    )}

                    {/* Node Circle Box */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border transition-all duration-300 shadow-xl ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 group-hover:border-zinc-500 group-hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Node Text Label (Properly Offset to Prevent Overlap) */}
                    <div
                      style={{ fontFamily: 'var(--font-mono)' }}
                      className={`mt-2.5 px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                        isSelected
                          ? 'bg-white text-black'
                          : 'bg-zinc-900/90 text-zinc-400 border border-zinc-800/80 group-hover:text-white'
                      }`}
                    >
                      {node.shortLabel}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Hint */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>* Click node to inspect verified operational telemetry</span>
              <span>ESTABLISHED CDP LINK // ZERO PROCESS KILL</span>
            </div>
          </div>

          {/* Subsystem Telemetry Drawer (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            {/* Header / Subsystem Capsule */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                  SUBSYSTEM INSPECTION
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                {activeNode.status}
              </span>
            </div>

            {/* Node Title */}
            <h3
              style={{ fontFamily: 'var(--font-editorial)' }}
              className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight"
            >
              {activeNode.label}
            </h3>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              {activeNode.description}
            </p>

            {/* Telemetry Metrics Strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 border border-zinc-900 bg-black/60 p-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Cycle Latency
                </div>
                <div className="font-mono text-base font-bold text-white mt-0.5">
                  {activeNode.latency}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Throughput Volume
                </div>
                <div className="font-mono text-base font-bold text-white mt-0.5">
                  {activeNode.throughput}
                </div>
              </div>
              <div className="col-span-2 pt-2 border-t border-zinc-900">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Mathematical Precision / SLA
                </div>
                <div className="font-mono text-sm font-semibold text-emerald-400 mt-0.5">
                  {activeNode.precision}
                </div>
              </div>
            </div>

            {/* Protocol Stack Badges */}
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2.5">
                Active Protocol Stack &amp; Tooling
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Ping Button */}
            <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between gap-4">
              <button
                onClick={handlePingNode}
                disabled={isPinging}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 hover:bg-zinc-200 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                {isPinging ? 'TRANSMITTING STREAM...' : 'Ping Node Telemetry'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
