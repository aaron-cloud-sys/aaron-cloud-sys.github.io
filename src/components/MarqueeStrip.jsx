import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

/**
 * MarqueeStrip - Velocity-reactive infinite scrolling brand strip
 *
 * Scrolls at a base pace and speeds up dynamically based on
 * Lenis scroll velocity. Matches the noir chiaroscuro aesthetic.
 */

const ITEMS = [
  'AYUSH SWAIN',
  '///',
  'AI SYSTEMS ARCHITECT',
  '///',
  'AUTONOMOUS PIPELINES',
  '///',
  'ZERO LATENCY',
  '///',
  'ZERO ERROR',
  '///',
  'AGENTIC WORKFLOWS',
  '///',
];

export default function MarqueeStrip({ reversed = false }) {
  const trackRef = useRef(null);
  const speedRef = useRef(0.4); // rem per frame base speed
  const rafRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      posRef.current += reversed ? -speedRef.current : speedRef.current;

      if (!reversed && posRef.current >= halfWidth) {
        posRef.current = 0;
      }
      if (reversed && posRef.current <= -halfWidth) {
        posRef.current = 0;
      }

      track.style.transform = `translateX(${-Math.abs(posRef.current)}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Lenis velocity modulation
    let currentTargetSpeed = 0.4;
    const handleScroll = (e) => {
      const velocity = Math.abs(e.velocity || 0);
      currentTargetSpeed = 0.4 + velocity * 0.7;
      gsap.to(speedRef, {
        current: currentTargetSpeed,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    // Listen on window scroll as fallback, lenis emits on the lenis object
    window.addEventListener('scroll', () => {}, { passive: true });

    // Hook into GSAP ticker to grab Lenis velocity from the data attribute set by App.jsx
    const tickerFn = () => {
      const vel = parseFloat(document.documentElement.dataset.lenisVelocity || '0');
      if (vel !== undefined) {
        const targetSpeed = 0.4 + Math.abs(vel) * 0.5;
        gsap.to(speedRef, {
          current: targetSpeed,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    };

    gsap.ticker.add(tickerFn);

    return () => {
      cancelAnimationFrame(rafRef.current);
      gsap.ticker.remove(tickerFn);
    };
  }, [reversed]);

  const duplicatedItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: '#000',
        padding: '14px 0',
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap"
        style={{ willChange: 'transform', gap: 0 }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className="font-mono uppercase inline-flex items-center"
            style={{
              fontSize: 'clamp(0.55rem, 1.1vw, 0.72rem)',
              letterSpacing: item === '///' ? '0.05em' : '0.22em',
              color: item === '///' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.45)',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              fontWeight: item === '///' ? 300 : 600,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
