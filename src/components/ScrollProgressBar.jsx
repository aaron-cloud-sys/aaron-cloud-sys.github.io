import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * ScrollProgressBar - A thin horizontal progress indicator fixed to the top
 * of the viewport that fills as the user scrolls down the page.
 * Uses GSAP ticker reading Lenis velocity for buttery smooth updates.
 * Pure monochromatic: white line on black.
 */
export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    // Use GSAP ticker for 60fps smooth updates synced with Lenis
    gsap.ticker.add(updateProgress);

    return () => {
      gsap.ticker.remove(updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{ height: '2px' }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 100%)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
