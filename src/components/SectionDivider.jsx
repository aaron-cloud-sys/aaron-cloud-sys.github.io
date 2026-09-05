import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionDivider - A premium animated SVG divider between major sections.
 * Features an SVG waveform line that draws itself as it enters the viewport,
 * with a subtle center diamond marker and timestamp metadata.
 *
 * Replaces plain border-b section breaks with something visually distinct.
 */
export default function SectionDivider({ label = '', index = '' }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.inOut',
    });
  }, [isVisible]);

  // Generate a subtle waveform path
  const generateWavePath = () => {
    const width = 1200;
    const midY = 20;
    const amp = 6;
    let d = `M 0 ${midY}`;

    for (let x = 0; x <= width; x += 4) {
      const progress = x / width;
      // Envelope: stronger in the middle, fade at edges
      const envelope = Math.sin(progress * Math.PI);
      const y = midY + Math.sin(x * 0.04) * amp * envelope;
      d += ` L ${x} ${y.toFixed(2)}`;
    }

    return d;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: '60px' }}
    >
      {/* SVG waveform line */}
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <path
          ref={pathRef}
          d={generateWavePath()}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />

        {/* Center diamond marker */}
        <rect
          x="596"
          y="16"
          width="8"
          height="8"
          fill="white"
          transform="rotate(45 600 20)"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 1s',
          }}
        />
      </svg>

      {/* Metadata label */}
      {label && (
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 1.2s',
          }}
        >
          {index && <span className="text-zinc-500 mr-2">{index}</span>}
          {label}
        </div>
      )}
    </div>
  );
}
