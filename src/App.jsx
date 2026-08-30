import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeaderNav from './components/HeaderNav';
import AmbientCanvas from './components/AmbientCanvas';
import CursorAura from './components/CursorAura';
import HeroNoir from './components/HeroNoir';
import ManifestoNoir from './components/ManifestoNoir';
import TelemetryGraph from './components/TelemetryGraph';
import ExhibitionRail from './components/ExhibitionRail';
import ProofVault from './components/ProofVault';
import CommandConsole from './components/CommandConsole';
import FooterNoir from './components/FooterNoir';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis Momentum Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black font-sans antialiased">
      {/* Precision Dynamic Cursor Aura */}
      <CursorAura />

      {/* Chiaroscuro Volumetric Spotlight Lighting & Matrix Grid */}
      <AmbientCanvas />

      {/* Floating System Status Header */}
      <HeaderNav />

      {/* Main Structural Flow */}
      <main className="relative z-20">
        <HeroNoir />
        <ManifestoNoir />
        <TelemetryGraph />
        <ExhibitionRail />
        <ProofVault />
        <CommandConsole />
      </main>

      {/* Conversion Gateway & System Telemetry Footer */}
      <FooterNoir />
    </div>
  );
}
