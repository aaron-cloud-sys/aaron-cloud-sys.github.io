import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AmbientCanvas() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Overhead Volumetric Chiaroscuro Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_50%,transparent_75%)] blur-3xl opacity-80" />

      {/* Dynamic Cursor Light Aura */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_45%,transparent_75%)] blur-3xl"
      />

      {/* Ultra-Fine Architectural Matrix Grid */}
      <div className="absolute inset-0 bg-noir-grid opacity-40" />
    </div>
  );
}
