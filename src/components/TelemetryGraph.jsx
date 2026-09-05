import React, { useState, useRef, useEffect } from 'react';
import { TELEMETRY_NODES } from '../data/portfolioData';
import { Cpu, Activity, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SVG mini-network graph showing 4 nodes, selected one highlighted
function NetworkGraph({ selectedIndex }) {
  const nodes = [
    { x: 80, y: 60, label: '01' },
    { x: 220, y: 40, label: '02' },
    { x: 200, y: 140, label: '03' },
    { x: 80, y: 150, label: '04' },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3]
  ];

  return (
    <svg
      viewBox="0 50 300 110"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={
            a === selectedIndex || b === selectedIndex
              ? 'rgba(255,255,255,0.35)'
              : 'rgba(255,255,255,0.07)'
          }
          strokeWidth={a === selectedIndex || b === selectedIndex ? 1.5 : 0.8}
          strokeDasharray={a === selectedIndex || b === selectedIndex ? 'none' : '3 4'}
        />
      ))}

      {/* Scanning sweep line */}
      <line
        x1="0" y1="100" x2="300" y2="100"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        style={{ animation: 'none' }}
      />

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isSelected = i === selectedIndex;
        return (
          <g key={i}>
            {isSelected && (
              <>
                <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
                  <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1">
                  <animate attributeName="r" values="10;16;10" dur="2s" begin="0.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" begin="0.3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={isSelected ? 8 : 5}
              fill={isSelected ? '#ffffff' : '#1a1a1a'}
              stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.2)'}
              strokeWidth={isSelected ? 0 : 1}
            />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              style={{
                fontFamily: 'monospace',
                fontSize: 8,
                fill: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const ICONS = [Cpu, ShieldCheck, Database, Activity];

export default function TelemetryGraph() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [pulseCount, setPulseCount] = useState(1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const panelRef = useRef(null);
  const rippleRef = useRef(null);

  const selectedNode = TELEMETRY_NODES[selectedIdx];

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    // Ripple effect
    if (rippleRef.current) {
      gsap.fromTo(
        rippleRef.current,
        { scale: 1, opacity: 0.6 },
        { scale: 3, opacity: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
    setTimeout(() => {
      setSimulating(false);
      setPulseCount((p) => p + 1);
    }, 1400);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: panelRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="telemetry"
      style={{
        position: 'relative',
        background: '#000',
        borderBottom: '1px solid #111',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Edge-bleed section number */}
      <div
        style={{
          position: 'absolute',
          top: '-6%',
          left: '-2%',
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
        02
      </div>

      {/* Side label */}
      <div
        style={{
          position: 'absolute',
          right: '-2rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.12)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        TOPOLOGY
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '84rem', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '1px solid #111' }}>
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
            // 02 ARCHITECTURAL TOPOLOGY &amp; LIVE NODES
          </div>
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
            Autonomous Node Matrix
          </h2>
        </div>

        {/* Node grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2px',
            marginBottom: '2px',
          }}
        >
          {TELEMETRY_NODES.map((node, i) => {
            const isSelected = i === selectedIdx;
            const Icon = ICONS[i] || Cpu;
            return (
              <button
                key={node.id}
                ref={(el) => (cardsRef.current[i] = el)}
                onClick={() => setSelectedIdx(i)}
                style={{
                  padding: '1.75rem',
                  textAlign: 'left',
                  background: isSelected ? '#0e0e0e' : '#050505',
                  border: `1px solid ${isSelected ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s, background 0.25s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                    e.currentTarget.style.background = '#0a0a0a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = '#050505';
                  }
                }}
              >
                {/* Selection top bar */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: '#fff',
                    }}
                  />
                )}

                {/* Node number */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    color: isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.2em',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>NODE 0{i + 1}</span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: isSelected ? '#fff' : 'rgba(255,255,255,0.2)',
                      display: 'block',
                      animation: isSelected ? 'cursor-blink 1.5s step-end infinite' : 'none',
                    }}
                  />
                </div>

                {/* Icon */}
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '0.6rem',
                    border: `1px solid ${isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    background: isSelected ? 'rgba(255,255,255,0.08)' : 'transparent',
                    marginBottom: '1rem',
                    transition: 'all 0.25s',
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: isSelected ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  />
                </div>

                {/* Node name */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.4,
                    marginBottom: '0.75rem',
                  }}
                >
                  {node.name.replace(/_/g, ' ')}
                </div>

                {/* Latency bar */}
                <div style={{ marginBottom: '0.4rem' }}>
                  <div
                    style={{
                      height: 2,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 1,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: isSelected ? '#fff' : 'rgba(255,255,255,0.25)',
                        width: isSelected ? '72%' : '40%',
                        transition: 'width 0.6s ease',
                        borderRadius: 1,
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.1em',
                  }}
                >
                  LATENCY: {node.latency}
                </div>
              </button>
            );
          })}
        </div>

        {/* Inspector panel */}
        <div
          ref={panelRef}
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#050505',
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr 1fr',
            gap: 0,
          }}
        >
          {/* Network graph */}
          <div
            style={{
              borderRight: '1px solid rgba(255,255,255,0.07)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              NETWORK TOPOLOGY
            </div>
            <div style={{ flex: 1, minHeight: 160 }}>
              <NetworkGraph selectedIndex={selectedIdx} />
            </div>
          </div>

          {/* Description + metrics */}
          <div
            style={{
              padding: '2rem',
              borderRight: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Node status header */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <span>STATUS: <span style={{ color: '#fff' }}>{selectedNode.status}</span></span>
                <span>//</span>
                <span>THROUGHPUT: {selectedNode.throughput}</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                  fontWeight: 700,
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  lineHeight: 1.3,
                }}
              >
                {selectedNode.name}
              </h3>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
              }}
            >
              {selectedNode.description}
            </p>

            {/* Metrics grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: '#111',
              }}
            >
              {Object.entries(selectedNode.metrics).map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: '#000',
                    padding: '0.9rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      color: 'rgba(255,255,255,0.3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: 4,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry packet + ping button */}
          <div
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              TELEMETRY PACKET [PULSE #{pulseCount}]
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
              {[
                { label: 'Runtime Kernel:', value: 'agy.core.node_v4' },
                { label: 'Avg Roundtrip:', value: selectedNode.latency },
                { label: 'Audit Status:', value: '100% VERIFIED', highlight: true },
                { label: 'Buffer:', value: '128 MB' },
                { label: 'Integrity:', value: '0x9f32...88ab' },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: row.highlight ? '#fff' : 'rgba(255,255,255,0.65)',
                      fontWeight: row.highlight ? 700 : 400,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Ping button with ripple */}
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <div
                ref={rippleRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: 0,
                  pointerEvents: 'none',
                  opacity: 0,
                }}
              />
              <button
                onClick={handleSimulate}
                disabled={simulating}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: simulating ? '#111' : '#fff',
                  color: simulating ? 'rgba(255,255,255,0.5)' : '#000',
                  border: 'none',
                  padding: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: simulating ? 'default' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                <RefreshCw
                  size={12}
                  style={{
                    animation: simulating ? 'radar-sweep 0.8s linear infinite' : 'none',
                  }}
                />
                {simulating ? 'PINGING...' : 'PING NODE STREAM'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
