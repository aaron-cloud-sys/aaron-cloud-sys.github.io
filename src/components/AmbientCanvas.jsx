import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AmbientCanvas() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Overhead Cinematic Beam (Directly referencing inspiration.mp4 spotlight) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_45%,transparent_75%)] blur-3xl opacity-90" />

      {/* Dynamic Cursor Light Aura */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.015)_45%,transparent_75%)] blur-3xl"
      />

      {/* Subtle Matrix Noise Grid */}
      <div className="absolute inset-0 bg-noir-grid opacity-60" />
    </div>
  );
}
