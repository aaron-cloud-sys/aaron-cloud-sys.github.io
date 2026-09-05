import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoNoir() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const quoteRef = useRef(null);
  const sectionNumRef = useRef(null);

  const words = [
    'In', 'high-stakes', 'enterprise', 'operations,', 'human', 'latency', 'is', 'structural', 'failure.',
    'We', 'engineer', 'autonomous', 'multi-agent', 'pipelines,', 'deterministic', 'data', 'extraction', 'engines,',
    'and', 'zero-error', 'compliance', 'protocols', 'that', 'transform', 'complex', 'operational', 'bottlenecks',
    'into', 'seamless,', 'instantaneous', 'execution.'
  ];

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const wordSpans = el.querySelectorAll('.scrub-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        {
          opacity: 0.08,
          y: 18,
          clipPath: 'inset(0% 0% 100% 0%)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 0.9,
          },
        }
      );

      if (sectionNumRef.current) {
        gsap.fromTo(
          sectionNumRef.current,
          { y: 0, opacity: 0.06 },
          {
            y: -60,
            opacity: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { backgroundSize: '100% 100%', opacity: 0.85 },
          {
            backgroundSize: '110% 110%',
            opacity: 1,
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              end: 'bottom 30%',
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative border-b border-zinc-900 bg-black py-28 sm:py-40 px-4 sm:px-8 overflow-hidden"
    >
      <span
        ref={sectionNumRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.15em',
          right: '-0.05em',
          fontSize: 'clamp(9rem, 22vw, 22rem)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.06)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          fontFamily: 'inherit',
        }}
      >
        01
      </span>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-2.4rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.12)',
            whiteSpace: 'nowrap',
          }}
        >
          PHILOSOPHY
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-zinc-700" />
          <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
            // PHILOSOPHY &amp; MANDATE
          </span>
        </div>

        <p
          ref={textRef}
          className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.35] mb-14"
          style={{ position: 'relative' }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="scrub-word inline-block mr-[0.32em]"
              style={{
                willChange: 'opacity, transform, clip-path',
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          ))}
        </p>

        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            width: '100%',
            height: '1px',
            marginBottom: '3rem',
            overflow: 'visible',
          }}
        >
          <svg
            width="100%"
            height="32"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: '-16px',
              left: 0,
              display: 'block',
            }}
          >
            <line
              x1="0"
              y1="28"
              x2="960"
              y2="4"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            <circle cx="0" cy="28" r="2.5" fill="rgba(255,255,255,0.18)" />
            <circle cx="960" cy="4" r="1.5" fill="rgba(255,255,255,0.08)" />
          </svg>
        </div>

        <div
          ref={quoteRef}
          style={{
            borderLeft: '3px solid rgba(255,255,255,0.90)',
            paddingLeft: '1.75rem',
            paddingTop: '1.25rem',
            paddingBottom: '1.25rem',
            paddingRight: '1.5rem',
            background:
              'radial-gradient(ellipse 80% 120% at 10% 50%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.00) 70%)',
            backgroundColor: 'rgba(24,24,27,0.55)',
            backdropFilter: 'blur(2px)',
            backgroundSize: '100% 100%',
            borderRadius: '0 2px 2px 0',
            marginBottom: '3.5rem',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.95)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.5rem',
            }}
          >
            WHAT DIFFERENCE COULD ZERO LATENCY MAKE?
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.38)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            PRECISION DEFINES EVERYTHING. ZERO SURPRISES. ZERO REGRESSIONS.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: '0.5rem',
          }}
        >
          {['ZERO LATENCY', 'ZERO ERROR', 'ZERO COMPROMISE'].map((label) => (
            <div
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '2px',
                padding: '0.55rem 1.1rem',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.75)',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
