import React, { useEffect, useRef, useState, useCallback } from 'react';
import { animate } from 'animejs';

const MILESTONES = [
  {
    id: 'doc-intel',
    timestamp: 'Q3 2025',
    title: 'Autonomous Document Intelligence',
    description:
      'Built zero-hallucination extraction pipeline processing 150+ POs with 60% turnaround reduction',
  },
  {
    id: 'gem-compliance',
    timestamp: 'Q2 2025',
    title: 'GeM Compliance Autopilot',
    description:
      'Engineered non-destructive CDP browser automation achieving 0 compliance errors across 80+ government contracts',
  },
  {
    id: 'financial-recon',
    timestamp: 'Q1 2025',
    title: 'Multi-Ledger Financial Reconciliation',
    description:
      'Deployed deterministic audit engine reconciling Rs.95L+ across 200+ institutional accounts at 99.8% precision',
  },
  {
    id: 'fleet-ops',
    timestamp: 'Q4 2024',
    title: 'Commercial Fleet Operations',
    description:
      'Coordinated 50+ vehicle dispatches with 98% on-time delivery rate across enterprise logistics',
  },
  {
    id: 'portfolio-arch',
    timestamp: 'Q3 2024',
    title: 'Portfolio Architecture System',
    description:
      'Crafted this very portfolio: React 19, GSAP, Lenis, Visx data viz, monochromatic noir aesthetic',
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const nodeRefs = useRef([]);
  const contentRefs = useRef([]);
  const revealedRef = useRef(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  // Spine draw-on-scroll via scroll listener
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !spineRef.current) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const rawProgress = (viewH - sectionTop) / (sectionHeight + viewH);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for milestone reveals
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = Number(entry.target.dataset.idx);
      if (revealedRef.current.has(idx)) return;
      revealedRef.current.add(idx);

      const node = nodeRefs.current[idx];
      const content = contentRefs.current[idx];

      // Node: fade + scale in with anime.js
      if (node) {
        try {
          animate(node, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 600,
            ease: 'outExpo',
          });

          // Pulse ring animation on the node
          const pulseRing = node.querySelector('.pulse-ring');
          if (pulseRing) {
            animate(pulseRing, {
              scale: [1, 2.4],
              opacity: [0.6, 0],
              duration: 1200,
              delay: 300,
              ease: 'outExpo',
            });
          }
        } catch {
          // Graceful fallback
          node.style.opacity = '1';
          node.style.transform = 'scale(1)';
        }
      }

      // Content: slide in from alternating sides
      if (content) {
        const isOdd = idx % 2 === 0;
        try {
          animate(content, {
            translateX: [isOdd ? -60 : 60, 0],
            opacity: [0, 1],
            duration: 800,
            delay: 200,
            ease: 'outExpo',
          });
        } catch {
          content.style.opacity = '1';
          content.style.transform = 'none';
        }
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
      rootMargin: '0px',
    });

    const sentinels = sectionRef.current?.querySelectorAll('.milestone-sentinel');
    sentinels?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observerCallback]);

  // Spine path total length for dashoffset calculation
  const SPINE_HEIGHT = MILESTONES.length * 220 + 40;
  const dashOffset = SPINE_HEIGHT * (1 - scrollProgress);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative border-b border-zinc-900 bg-black overflow-hidden scroll-mt-24"
      style={{
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 4rem)',
      }}
    >
      {/* Background section number */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-4%',
          right: '-2%',
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
        05
      </div>

      {/* Rotated side label */}
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
            fontSize: '0.55rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.12)',
            whiteSpace: 'nowrap',
          }}
        >
          EVOLUTION
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '72rem', margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            marginBottom: '4rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            // 05 ARCHITECTURAL EVOLUTION TIMELINE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#fff',
              textTransform: 'uppercase',
              lineHeight: 0.95,
            }}
          >
            System Deployment History
          </h2>
        </div>

        {/* Timeline container */}
        <div
          className="timeline-container"
          style={{ position: 'relative' }}
        >
          {/* SVG Spine (center line) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              height: '100%',
              width: '2px',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            className="spine-wrapper hidden md:block"
          >
            <svg
              ref={spineRef}
              width="2"
              height="100%"
              style={{ display: 'block', overflow: 'visible' }}
              preserveAspectRatio="none"
            >
              {/* Background track */}
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              {/* Animated draw line */}
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="rgba(161,161,170,0.5)"
                strokeWidth="2"
                strokeDasharray={SPINE_HEIGHT}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
          </div>

          {/* Mobile spine (left-aligned) */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: 0,
              height: '100%',
              width: '2px',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            className="spine-mobile block md:hidden"
          >
            <svg
              width="2"
              height="100%"
              style={{ display: 'block', overflow: 'visible' }}
              preserveAspectRatio="none"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="rgba(161,161,170,0.5)"
                strokeWidth="2"
                strokeDasharray={SPINE_HEIGHT}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
          </div>

          {/* Milestones */}
          {MILESTONES.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={milestone.id}
                data-idx={idx}
                className="milestone-sentinel"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: idx < MILESTONES.length - 1 ? 'clamp(3rem, 6vw, 5rem)' : 0,
                  minHeight: '120px',
                }}
              >
                {/* Desktop layout */}
                <div className="hidden md:flex w-full items-start" style={{ position: 'relative' }}>
                  {/* Left content area */}
                  <div
                    style={{
                      width: 'calc(50% - 28px)',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      paddingRight: '2rem',
                    }}
                  >
                    {isLeft && (
                      <div
                        ref={(el) => (contentRefs.current[idx] = el)}
                        style={{
                          opacity: 0,
                          maxWidth: '380px',
                          textAlign: 'right',
                        }}
                      >
                        <MilestoneContent milestone={milestone} idx={idx} align="right" />
                      </div>
                    )}
                  </div>

                  {/* Center node */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TimelineNode ref={(el) => (nodeRefs.current[idx] = el)} />
                  </div>

                  {/* Right content area */}
                  <div
                    style={{
                      width: 'calc(50% - 28px)',
                      marginLeft: 'auto',
                      paddingLeft: '2rem',
                    }}
                  >
                    {!isLeft && (
                      <div
                        ref={(el) => (contentRefs.current[idx] = el)}
                        style={{
                          opacity: 0,
                          maxWidth: '380px',
                        }}
                      >
                        <MilestoneContent milestone={milestone} idx={idx} align="left" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile layout: all content on right of spine */}
                <div className="flex md:hidden w-full items-start" style={{ position: 'relative' }}>
                  {/* Node on left */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '0',
                      zIndex: 2,
                    }}
                  >
                    <TimelineNode ref={(el) => {
                      if (!nodeRefs.current[idx]) nodeRefs.current[idx] = el;
                    }} />
                  </div>

                  {/* Content on right */}
                  <div
                    ref={(el) => {
                      if (!contentRefs.current[idx]) contentRefs.current[idx] = el;
                    }}
                    style={{
                      opacity: 0,
                      marginLeft: '52px',
                      flex: 1,
                    }}
                  >
                    <MilestoneContent milestone={milestone} idx={idx} align="left" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Timeline node (the circle on the spine) */
const TimelineNode = React.forwardRef(function TimelineNode(_, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#000',
        border: '2px solid rgba(255,255,255,0.7)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        transform: 'scale(0)',
      }}
    >
      {/* Inner dot */}
      <div
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)',
        }}
      />
      {/* Pulse ring element (animated on reveal) */}
      <div
        className="pulse-ring"
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

/* Milestone content card */
function MilestoneContent({ milestone, idx, align }) {
  return (
    <div>
      {/* Timestamp badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          padding: '0.3rem 0.75rem',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            background: 'rgba(255,255,255,0.5)',
          }}
        />
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {milestone.timestamp}
        </span>
      </div>

      {/* Sequence number */}
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '0.55rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '0.35rem',
          textAlign: align,
        }}
      >
        DEPLOY.{String(idx + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.35rem)',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          marginBottom: '0.6rem',
          textAlign: align,
        }}
      >
        {milestone.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: 'rgba(161,161,170,0.8)',
          lineHeight: 1.65,
          letterSpacing: '0.01em',
          textAlign: align,
        }}
      >
        {milestone.description}
      </p>

      {/* Subtle decorative line */}
      <div
        style={{
          marginTop: '1rem',
          height: '1px',
          width: '40px',
          background: 'rgba(255,255,255,0.08)',
          marginLeft: align === 'right' ? 'auto' : 0,
          marginRight: align === 'left' ? 'auto' : 0,
        }}
      />
    </div>
  );
}
