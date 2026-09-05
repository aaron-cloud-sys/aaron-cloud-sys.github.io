import { useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * useMagneticHover - React hook for magnetic button physics.
 *
 * When the cursor enters the element's proximity, the element
 * and its inner label subtly warp toward the cursor position.
 * On leave, it springs back with elastic easing.
 *
 * Usage:
 *   const { ref, onMouseMove, onMouseLeave } = useMagneticHover();
 *   <button ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>...</button>
 */
export function useMagneticHover(strength = 0.35) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Also move inner text/icon slightly more for depth
      const inner = el.querySelector('[data-magnetic-inner]');
      if (inner) {
        gsap.to(inner, {
          x: deltaX * 0.5,
          y: deltaY * 0.5,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
      overwrite: 'auto',
    });

    const inner = el.querySelector('[data-magnetic-inner]');
    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

/**
 * useScrollReveal - React hook for IntersectionObserver-based scroll reveals.
 *
 * Returns a ref and isVisible boolean. Attach the ref to the element
 * you want to observe. isVisible becomes true once and stays true (once: true).
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
 *   <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>...</div>
 */
export function useScrollReveal({ threshold = 0.2, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const isVisibleRef = useRef(false);
  const callbackRef = useRef(null);

  // Use a state-like approach with a ref to avoid re-renders during scroll
  const setVisible = useCallback((val) => {
    isVisibleRef.current = val;
    if (callbackRef.current) callbackRef.current(val);
  }, []);

  const observe = useCallback(
    (node) => {
      if (!node) return;
      ref.current = node;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
    },
    [threshold, rootMargin, setVisible]
  );

  return { ref: observe, isVisible: isVisibleRef.current };
}

/**
 * initSkewOnScroll - Adds a subtle skew transform to elements
 * based on Lenis scroll velocity. Elements lean in the direction
 * of scrolling and return to normal when scrolling stops.
 *
 * Call once in App.jsx useEffect. Pass a CSS selector for target elements.
 * Uses the Lenis velocity exposed via data-lenis-velocity attribute.
 */
export function initSkewOnScroll(selector = '[data-skew-on-scroll]', maxSkew = 3) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};

  const tickerFn = () => {
    const vel = parseFloat(document.documentElement.dataset.lenisVelocity || '0');
    const skewVal = Math.max(-maxSkew, Math.min(maxSkew, vel * 0.6));

    elements.forEach((el) => {
      gsap.to(el, {
        skewY: skewVal,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  };

  gsap.ticker.add(tickerFn);
  return () => gsap.ticker.remove(tickerFn);
}
