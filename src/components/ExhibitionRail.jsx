import React, { useState, useRef, useEffect } from 'react';
import { EXHIBITION_WORKS } from '../data/portfolioData';
import { ArrowUpRight, X, Activity, ShieldCheck, Play, CheckCircle2, Terminal, RefreshCw, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExhibitionRail() {
  const [activeProject, setActiveProject] = useState(null);
  const [modalTab, setModalTab] = useState('spec'); // 'spec' | 'simulator'
  const [simStep, setSimStep] = useState(0);
  const [simRunning, setSimRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsRef = useRef([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      rowsRef.current.filter(Boolean).forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (activeProject && modalRef.current) {
      setModalTab('spec');
      setSimStep(0);
      setSimRunning(false);
      setSimLogs([]);
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [activeProject]);

  const runSimulation = () => {
    if (simRunning) return;
    soundFx.playClick();
    setSimRunning(true);
    setSimStep(1);
    setSimLogs([
      `[00:01] INITIATING RUNTIME KERNEL // TARGET: ${activeProject.code}`,
      `[00:03] MOUNTING LOCAL FILE INPUT STREAM: ${activeProject.telemetrySnippet.input || 'CONTRACT_PAYLOAD.pdf'}`,
    ]);

    setTimeout(() => {
      soundFx.playBlip();
      setSimStep(2);
      setSimLogs((prev) => [
        ...prev,
        `[00:12] MULTIMODAL OCR PASS COMPLETED (DPI: 300) // 100% TOKENS DETECTED`,
        `[00:15] PYDANTIC V2 SCHEMA APPLIED // 18 STRICT TYPES CONFIRMED`,
      ]);
    }, 900);

    setTimeout(() => {
      soundFx.playBlip();
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        `[00:24] ATTACHING TO CDP PORT 9222 // NON-DESTRUCTIVE EVENT INJECTION`,
        `[00:28] DISPATCHING SYNTHETIC DOM VALUE SETTERS + EVENT BUBBLING`,
      ]);
    }, 1800);

    setTimeout(() => {
      soundFx.playSuccess();
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        `[00:36] VERIFICATION CHECKSUM: ${activeProject.telemetrySnippet.validationHash || '0x7f9a8821bc09'}`,
        `[00:40] STATUS: RUNTIME SUCCESS (0 AUDIT REJECTIONS // VERIFIED_100%)`,
      ]);
      setSimRunning(false);
    }, 2700);
  };

  return (
    <section
      ref={sectionRef}
      id="exhibition"
      className="relative border-b border-zinc-900 bg-black pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-8 overflow-hidden scroll-mt-28"
    >
      {/* Background Section Index */}
      <div
        aria-hidden="true"
        className="absolute top-2 right-4 font-mono text-[12rem] sm:text-[18rem] font-black text-transparent select-none pointer-events-none z-0"
        style={{
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
          lineHeight: 0.8,
        }}
      >
        03
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
              // 03 FLAGSHIP PRODUCTION ARCHITECTURES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Engineered Deployments
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-md leading-relaxed">
            Autonomous agentic pipelines, deterministic ingestion engines, and statutory compliance autopilot verified across commercial enterprises.
          </div>
        </div>

        {/* Project Rows */}
        <div className="flex flex-col divide-y divide-zinc-900">
          {EXHIBITION_WORKS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (rowsRef.current[i] = el)}
              onClick={() => {
                soundFx.playClick();
                setActiveProject(project);
              }}
              className="group py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start cursor-pointer transition-all duration-300 hover:bg-zinc-950/60 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-sm"
            >
              {/* Giant Index Outline */}
              <div
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="lg:col-span-2 text-5xl sm:text-7xl font-black text-transparent group-hover:text-white transition-all duration-300 leading-none select-none"
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                }}
              >
                0{i + 1}
              </div>

              {/* Main Content */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-white border border-zinc-800 bg-zinc-900 px-2 py-0.5 uppercase">
                    {project.code}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">//</span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider">
                    {project.domain}
                  </span>
                </div>

                <h3
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight group-hover:text-zinc-100 transition-colors"
                >
                  {project.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
                  {project.subtitle}
                </p>

                {/* Stack Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] sm:text-[11px] text-zinc-400 bg-zinc-900/80 border border-zinc-800/80 px-2.5 py-1 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Hero Metric & CTA */}
              <div className="lg:col-span-3 flex lg:flex-col justify-between items-end lg:items-end gap-4 pt-2 border-t lg:border-t-0 lg:border-l border-zinc-900 lg:pl-6">
                <div className="text-right">
                  <div
                    style={{ fontFamily: 'var(--font-mono)' }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight"
                  >
                    {project.heroStat}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
                    {project.heroMetric}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-wider group-hover:bg-zinc-200 transition-all shadow-lg">
                  <span>Inspect Spec</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Architecture & Live Simulator Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto pt-24 pb-12"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundFx.playClick();
              setActiveProject(null);
            }
          }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl my-auto text-left"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveProject(null);
              }}
              className="absolute top-4 right-4 p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-zinc-900 pb-6 mb-6 pr-10">
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-1.5">
                <span>{activeProject.code}</span>
                <span>//</span>
                <span>VERIFIED PRODUCTION DEPLOYMENT</span>
              </div>
              <h3
                style={{ fontFamily: 'var(--font-editorial)' }}
                className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight"
              >
                {activeProject.title}
              </h3>

              {/* Segmented Mode Tabs */}
              <div className="flex items-center gap-2 mt-5">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setModalTab('spec');
                  }}
                  className={`px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer transition-all border ${
                    modalTab === 'spec'
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  Architecture Specification
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setModalTab('simulator');
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer transition-all border ${
                    modalTab === 'simulator'
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3 text-emerald-400" />
                  Live Pipeline Simulator
                </button>
              </div>
            </div>

            {/* TAB 1: SPECIFICATION */}
            {modalTab === 'spec' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/70 border border-zinc-900">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
                      <Activity className="w-3.5 h-3.5 text-zinc-400" />
                      The Engineering Bottleneck
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      {activeProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 bg-black/70 border border-zinc-900">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      The Autonomous Architecture
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-800/80">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-white mb-2">
                    Verified Operational Outcome
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {activeProject.impact}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
                    Ground-Truth Telemetry Trace
                  </div>
                  <pre className="p-4 bg-black border border-zinc-900 font-mono text-xs text-zinc-400 overflow-x-auto leading-relaxed">
                    {JSON.stringify(activeProject.telemetrySnippet, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE SIMULATOR */}
            {modalTab === 'simulator' && (
              <div className="space-y-6">
                <div className="p-4 bg-black border border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Interactive Execution Runtime Test
                    </div>
                    <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                      Trigger an end-to-end simulated pass across OCR extraction, Pydantic schema validation, and CDP dispatch.
                    </div>
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={simRunning}
                    className="px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${simRunning ? 'animate-spin' : ''}`} />
                    {simRunning ? 'EXECUTING...' : 'RUN PIPELINE TEST'}
                  </button>
                </div>

                {/* 4 Execution Steps */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {[
                    { step: 1, title: 'Document Ingestion', sub: 'PDF stream read' },
                    { step: 2, title: 'OCR & Multimodal', sub: 'Bounding box extract' },
                    { step: 3, title: 'Schema Audit', sub: 'Pydantic validation' },
                    { step: 4, title: 'CDP Dispatch', sub: 'Zero error commit' },
                  ].map((s) => {
                    const isDone = simStep >= s.step;
                    const isCurrent = simStep === s.step && simRunning;

                    return (
                      <div
                        key={s.step}
                        className={`p-3 border transition-all ${
                          isDone
                            ? 'bg-zinc-900/80 border-emerald-500/50'
                            : 'bg-black/60 border-zinc-900 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[10px] text-zinc-500">STAGE 0{s.step}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                          )}
                        </div>
                        <div className="font-mono text-xs font-bold text-white leading-tight">
                          {s.title}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500 mt-0.5">{s.sub}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Console Logs */}
                <div className="border border-zinc-900 bg-black p-4 font-mono text-xs text-zinc-300">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3 text-[10px] text-zinc-500 uppercase tracking-wider">
                    <span>LIVE PIPELINE EXECUTION STREAM</span>
                    <span>PORT 9222 // DETERMINISTIC</span>
                  </div>
                  <div className="space-y-1.5 min-h-[120px] max-h-[160px] overflow-y-auto">
                    {simLogs.length === 0 ? (
                      <span className="text-zinc-600 italic">Click 'RUN PIPELINE TEST' to initialize execution stream...</span>
                    ) : (
                      simLogs.map((log, idx) => (
                        <div key={idx} className="leading-relaxed">
                          <span className="text-emerald-400 font-bold">&gt;</span> {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider hover:text-white hover:border-zinc-600 transition-all cursor-pointer"
              >
                Dismiss Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
