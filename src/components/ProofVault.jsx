import React, { useRef, useEffect } from 'react';
import { QUANT_BENCHMARKS, CAPABILITY_VAULT } from '../data/portfolioData';
import { Cpu, Database, Layout, Shield, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Cpu, Database, Layout, Shield];

export default function ProofVault() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const benchRefs = useRef([]);
  const capRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo(
        benchRefs.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: benchRefs.current[0], start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo(
        capRefs.current.filter(Boolean),
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: capRefs.current[0], start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proof"
      style={{
        position: 'relative',
        background: '#000',
        borderBottom: '1px solid #111',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Edge-bleeding section number */}
      <div
        style={{
          position: 'absolute',
          top: '-4%',
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
        04
      </div>

      {/* Rotated side label */}
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
        PROOF
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '84rem', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid #111' }}
        >
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
            // 04 AUDITED BENCHMARKS &amp; CAPABILITY MATRIX
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
            Proof &amp; Competencies
          </h2>
        </div>

        {/* Benchmark bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            background: '#111',
            border: '2px solid #111',
            marginBottom: '4rem',
          }}
        >
          {QUANT_BENCHMARKS.map((bench, i) => (
            <div
              key={bench.id}
              ref={(el) => (benchRefs.current[i] = el)}
              style={{
                background: '#000',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#050505';
                const num = e.currentTarget.querySelector('.bench-value');
                if (num) gsap.to(num, { y: -4, duration: 0.3, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000';
                const num = e.currentTarget.querySelector('.bench-value');
                if (num) gsap.to(num, { y: 0, duration: 0.3, ease: 'power2.out' });
              }}
            >
              {/* Background index watermark */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-0.5rem',
                  right: '0.75rem',
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '5rem',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <div
                className="bench-value"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '0.65rem',
                  willChange: 'transform',
                }}
              >
                {bench.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.05em',
                  marginBottom: '0.4rem',
                }}
              >
                {bench.metric}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.08em',
                }}
              >
                {bench.context}
              </div>
            </div>
          ))}
        </div>

        {/* Capability vault - 4 column panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 2,
            background: '#111',
            border: '2px solid #111',
          }}
        >
          {CAPABILITY_VAULT.map((cap, idx) => {
            const Icon = ICONS[idx] || Cpu;
            return (
              <div
                key={cap.category}
                ref={(el) => (capRefs.current[idx] = el)}
                style={{
                  background: '#000',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#060606')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#000')}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      padding: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={14} style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#fff',
                    }}
                  >
                    {cap.category}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {cap.tech.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.4rem 0.6rem',
                        border: '1px solid rgba(255,255,255,0.05)',
                        background: 'rgba(255,255,255,0.015)',
                        transition: 'border-color 0.2s, background 0.2s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                      }}
                    >
                      <Check size={10} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          color: 'rgba(255,255,255,0.55)',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {item}
                      </span>
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
