import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorAura() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power3' });

    const handleMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.9)',
        duration: 0.25,
      });
      gsap.to(dot, { scale: 0.4, duration: 0.2 });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.25,
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const refreshInteractiveTargets = () => {
      const targets = document.querySelectorAll('button, a, input, [data-interactive="true"]');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    refreshInteractiveTargets();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference hidden md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-40 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 backdrop-blur-[1px] hidden md:block"
      />
    </>
  );
}
