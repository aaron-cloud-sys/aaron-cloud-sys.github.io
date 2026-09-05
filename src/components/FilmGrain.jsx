import React, { useRef, useEffect } from 'react';

/**
 * FilmGrain - Animated canvas noise overlay
 *
 * Creates a 35mm film grain texture at 12fps (filmic, not digital).
 * Fixed over the entire viewport. Matches inspiration.mp4 chiaroscuro mood.
 * Zero external dependencies, pure Canvas API.
 */

export default function FilmGrain() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const FPS = 12; // filmic 12fps, not 60fps
    const FRAME_INTERVAL = 1000 / FPS;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawGrain = (timestamp) => {
      rafRef.current = requestAnimationFrame(drawGrain);

      const elapsed = timestamp - lastFrameRef.current;
      if (elapsed < FRAME_INTERVAL) return;
      lastFrameRef.current = timestamp;

      const w = canvas.width;
      const h = canvas.height;

      // Create noise using ImageData
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Random grain value - sparse and subtle
        const grainValue = Math.random() > 0.97 ? Math.floor(Math.random() * 60 + 10) : 0;
        data[i] = grainValue;
        data[i + 1] = grainValue;
        data[i + 2] = grainValue;
        data[i + 3] = grainValue > 0 ? Math.floor(Math.random() * 55 + 20) : 0;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.putImageData(imageData, 0, 0);
    };

    rafRef.current = requestAnimationFrame(drawGrain);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: 0.35,
      }}
      aria-hidden="true"
    />
  );
}
