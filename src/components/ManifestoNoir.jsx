import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoNoir() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const words = [
    "In", "high-stakes", "enterprise", "operations,", "human", "latency", "is", "structural", "failure.",
    "We", "engineer", "autonomous", "multi-agent", "pipelines,", "deterministic", "data", "extraction", "engines,",
    "and", "zero-error", "compliance", "protocols", "that", "transform", "complex", "operational", "bottlenecks",
    "into", "seamless,", "instantaneous", "execution."
  ];

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const wordSpans = el.querySelectorAll('.scrub-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordSpans,
        { opacity: 0.12, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative border-b border-zinc-900 bg-black py-28 sm:py-36 px-4 sm:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        
        {/* Overhead Tag */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-zinc-700" />
          <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
            // PHILOSOPHY & MANDATE
          </span>
        </div>

        {/* Scrubbed Narrative */}
        <p
          ref={textRef}
          className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.3] mb-14"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="scrub-word inline-block mr-[0.32em] transition-colors"
            >
              {word}
            </span>
          ))}
        </p>

        {/* Chiaroscuro Quotation Box (Referencing inspiration.mp4) */}
        <div className="border-l-2 border-white pl-6 py-2 font-mono text-sm sm:text-base text-zinc-400 uppercase tracking-widest bg-zinc-950/40 p-4">
          <div className="text-white font-bold text-base sm:text-lg mb-1">
            WHAT DIFFERENCE COULD ZERO LATENCY MAKE?
          </div>
          <div className="text-zinc-500 text-xs tracking-wider">
            PRECISION DEFINES EVERYTHING. ZERO SURPRISES. ZERO REGRESSIONS.
          </div>
        </div>

      </div>
    </section>
  );
}
