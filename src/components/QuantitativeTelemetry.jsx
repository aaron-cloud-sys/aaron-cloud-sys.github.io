import React, { useState, useRef, useEffect } from 'react';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { QUANT_BENCHMARKS, CAPABILITY_VAULT } from '../data/portfolioData';
import { Cpu, Database, Layout, Shield, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THROUGHPUT_DATA = [
  { date: new Date(2024, 8, 1), value: 24, label: 'Sep 24' },
  { date: new Date(2024, 9, 1), value: 38, label: 'Oct 24' },
  { date: new Date(2024, 10, 1), value: 55, label: 'Nov 24' },
  { date: new Date(2024, 11, 1), value: 72, label: 'Dec 24' },
  { date: new Date(2025, 0, 1), value: 89, label: 'Jan 25' },
  { date: new Date(2025, 1, 1), value: 104, label: 'Feb 25' },
  { date: new Date(2025, 2, 1), value: 120, label: 'Mar 25' },
  { date: new Date(2025, 3, 1), value: 135, label: 'Apr 25' },
  { date: new Date(2025, 4, 1), value: 148, label: 'May 25' },
  { date: new Date(2025, 5, 1), value: 156, label: 'Jun 25' },
  { date: new Date(2025, 6, 1), value: 168, label: 'Jul 25' },
  { date: new Date(2025, 7, 1), value: 182, label: 'Aug 25' },
];

const ERROR_RATE_DATA = [
  { date: new Date(2024, 8, 1), errorRate: 4.2, latency: 48 },
  { date: new Date(2024, 9, 1), errorRate: 3.1, latency: 42 },
  { date: new Date(2024, 10, 1), errorRate: 2.2, latency: 35 },
  { date: new Date(2024, 11, 1), errorRate: 1.4, latency: 29 },
  { date: new Date(2025, 0, 1), errorRate: 0.8, latency: 24 },
  { date: new Date(2025, 1, 1), errorRate: 0.3, latency: 19 },
  { date: new Date(2025, 2, 1), errorRate: 0.1, latency: 16 },
  { date: new Date(2025, 3, 1), errorRate: 0.05, latency: 14 },
  { date: new Date(2025, 4, 1), errorRate: 0.02, latency: 13 },
  { date: new Date(2025, 5, 1), errorRate: 0.01, latency: 12 },
  { date: new Date(2025, 6, 1), errorRate: 0.0, latency: 11 },
  { date: new Date(2025, 7, 1), errorRate: 0.0, latency: 11 },
];

const getDate = (d) => d.date;
const getValue = (d) => d.value;
const getError = (d) => d.errorRate;

function ThroughputChart() {
  const [width, setWidth] = useState(500);
  const height = 240;
  const margin = { top: 20, right: 20, bottom: 35, left: 45 };
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width || 500);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const innerWidth = Math.max(width - margin.left - margin.right, 50);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 50);

  const xScale = scaleTime({
    range: [0, innerWidth],
    domain: [getDate(THROUGHPUT_DATA[0]), getDate(THROUGHPUT_DATA[THROUGHPUT_DATA.length - 1])],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, 200],
    nice: true,
  });

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg width={width} height={height}>
        <LinearGradient id="throughput-grad" from="#ffffff" to="#ffffff" fromOpacity={0.25} toOpacity={0.0} />
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AreaClosed
            data={THROUGHPUT_DATA}
            x={(d) => xScale(getDate(d))}
            y={(d) => yScale(getValue(d))}
            yScale={yScale}
            strokeWidth={0}
            curve={curveMonotoneX}
            fill="url(#throughput-grad)"
          />
          <LinePath
            data={THROUGHPUT_DATA}
            x={(d) => xScale(getDate(d))}
            y={(d) => yScale(getValue(d))}
            stroke="#ffffff"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
          {THROUGHPUT_DATA.map((d, i) => (
            <circle
              key={i}
              cx={xScale(getDate(d))}
              cy={yScale(getValue(d))}
              r={i === THROUGHPUT_DATA.length - 1 ? 4 : 2}
              fill="#ffffff"
              stroke="#000000"
              strokeWidth={1}
            />
          ))}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            numTicks={4}
            stroke="#27272a"
            tickStroke="#27272a"
            tickLabelProps={{
              fill: '#71717a',
              fontSize: 9,
              fontFamily: 'var(--font-mono)',
              textAnchor: 'middle',
            }}
          />
          <AxisLeft
            scale={yScale}
            numTicks={4}
            stroke="#27272a"
            tickStroke="#27272a"
            tickLabelProps={{
              fill: '#71717a',
              fontSize: 9,
              fontFamily: 'var(--font-mono)',
              textAnchor: 'end',
              dx: -4,
              dy: 3,
            }}
          />
        </g>
      </svg>
    </div>
  );
}

function ErrorRateChart() {
  const [width, setWidth] = useState(500);
  const height = 240;
  const margin = { top: 20, right: 20, bottom: 35, left: 45 };
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width || 500);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const innerWidth = Math.max(width - margin.left - margin.right, 50);
  const innerHeight = Math.max(height - margin.top - margin.bottom, 50);

  const xScale = scaleTime({
    range: [0, innerWidth],
    domain: [getDate(ERROR_RATE_DATA[0]), getDate(ERROR_RATE_DATA[ERROR_RATE_DATA.length - 1])],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, 5],
  });

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <LinePath
            data={ERROR_RATE_DATA}
            x={(d) => xScale(getDate(d))}
            y={(d) => yScale(getError(d))}
            stroke="#ffffff"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
          {ERROR_RATE_DATA.map((d, i) => (
            <circle
              key={i}
              cx={xScale(getDate(d))}
              cy={yScale(getError(d))}
              r={i === ERROR_RATE_DATA.length - 1 ? 4 : 2}
              fill={i === ERROR_RATE_DATA.length - 1 ? '#34d399' : '#ffffff'}
              stroke="#000000"
              strokeWidth={1}
            />
          ))}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            numTicks={4}
            stroke="#27272a"
            tickStroke="#27272a"
            tickLabelProps={{
              fill: '#71717a',
              fontSize: 9,
              fontFamily: 'var(--font-mono)',
              textAnchor: 'middle',
            }}
          />
          <AxisLeft
            scale={yScale}
            numTicks={4}
            stroke="#27272a"
            tickStroke="#27272a"
            tickFormat={(v) => `${v}%`}
            tickLabelProps={{
              fill: '#71717a',
              fontSize: 9,
              fontFamily: 'var(--font-mono)',
              textAnchor: 'end',
              dx: -4,
              dy: 3,
            }}
          />
        </g>
      </svg>
    </div>
  );
}

const CATEGORY_ICONS = [Cpu, Database, Layout, Shield];

export default function QuantitativeTelemetry() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="telemetry"
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
        04
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
              // 04 QUANTITATIVE TELEMETRY &amp; AUDITED BENCHMARKS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Telemetry Trajectories
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-md leading-relaxed">
            Mathematically audited performance curves from production runs across autonomous ingestion pipelines, multi-ledger accounting audits, and statutory browser fulfillment.
          </div>
        </div>

        {/* Visx Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chart 1 */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 p-6 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Monthly Document Extraction Volume
                </div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  182 POs / Month <span className="text-xs text-emerald-400 font-normal ml-2">(+658% YoY)</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-zinc-800 bg-zinc-900/80 text-[10px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE INGESTION
              </span>
            </div>
            <ThroughputChart />
          </div>

          {/* Chart 2 */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 p-6 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Extraction Error Rate vs Latency
                </div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  0.00% Error Variance <span className="text-xs text-emerald-400 font-normal ml-2">(11ms Avg)</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-zinc-800 bg-zinc-900/80 text-[10px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DETERMINISTIC
              </span>
            </div>
            <ErrorRateChart />
          </div>
        </div>

        {/* Audited Capability Benchmarks Bento Grid */}
        <div className="border-t border-zinc-900 pt-12">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 mb-6">
            // AUDITED PRODUCTION OUTCOMES
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {QUANT_BENCHMARKS.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-600 transition-colors"
              >
                <div
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="text-2xl font-black text-white"
                >
                  {item.value}
                </div>
                <div
                  style={{ fontFamily: 'var(--font-mono)' }}
                  className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 mt-1"
                >
                  {item.metric}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate">
                  {item.context}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capability Vault Matrix */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAPABILITY_VAULT.map((cap, i) => {
            const IconComp = CATEGORY_ICONS[i] || Cpu;
            return (
              <div
                key={cap.category}
                className="p-5 bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <IconComp className="w-4 h-4 text-zinc-400" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                    {cap.category}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {cap.tech.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-zinc-400 font-sans">
                      <span className="w-1 h-1 rounded-full bg-zinc-600" />
                      <span>{t}</span>
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
