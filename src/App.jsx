import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeaderNav from './components/HeaderNav';
import AmbientCanvas from './components/AmbientCanvas';
import CursorAura from './components/CursorAura';
import FilmGrain from './components/FilmGrain';
import ScrollProgressBar from './components/ScrollProgressBar';
import CyberdeckHero from './components/CyberdeckHero';
import MarqueeStrip from './components/MarqueeStrip';
import ManifestoNoir from './components/ManifestoNoir';
import SectionDivider from './components/SectionDivider';
import SystemTopology from './components/SystemTopology';
import ExhibitionRail from './components/ExhibitionRail';
import QuantitativeTelemetry from './components/QuantitativeTelemetry';
import JourneyTimeline from './components/JourneyTimeline';
import CommandConsole from './components/CommandConsole';
import FooterNoir from './components/FooterNoir';
import { initSkewOnScroll } from './utils/interactions';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

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
    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      document.documentElement.dataset.lenisVelocity = String(e.velocity ?? 0);
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Initialize subtle velocity-based tactile lean on scroll
    const cleanupSkew = initSkewOnScroll('.glass-card', 2.0);

    return () => {
      cleanupSkew();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black font-sans antialiased">
      {/* 60fps Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 35mm Film Grain Overlay: cinematic chiaroscuro texture */}
      <FilmGrain />

      {/* Precision Dynamic Cursor Aura */}
      <CursorAura />

      {/* Chiaroscuro Volumetric Spotlight Lighting & Matrix Grid */}
      <AmbientCanvas />

      {/* Floating System Status Header */}
      <HeaderNav />

      {/* Main Structural Flow */}
      <main className="relative z-20">
        {/* CENTERPIECE: 3D CAD Laptop Gateway & Hardware Architecture (400vh Scrollytelling) */}
        <CyberdeckHero />

        {/* Velocity-reactive brand identity marquee */}
        <MarqueeStrip />

        {/* 01 Architectural Manifesto */}
        <div id="manifesto">
          <ManifestoNoir />
        </div>

        {/* Animated Waveform Divider: 02 */}
        <SectionDivider label="SYSTEM TOPOLOGY & OPERATIONAL NODES" index="02" />

        {/* 02 Unified Interactive 3D Node Matrix & Telemetry Inspector */}
        <div id="topology">
          <SystemTopology />
        </div>

        {/* Animated Waveform Divider: 03 */}
        <SectionDivider label="FLAGSHIP PRODUCTION ARCHITECTURES" index="03" />

        {/* 03 Case Study Dossiers & Interactive Live Pipeline Simulator */}
        <div id="exhibition">
          <ExhibitionRail />
        </div>

        {/* Animated Waveform Divider: 04 */}
        <SectionDivider label="QUANTITATIVE TELEMETRY & AUDITED BENCHMARKS" index="04" />

        {/* 04 Visx Historical Trajectories + Audited Capability Bento */}
        <div id="telemetry">
          <QuantitativeTelemetry />
        </div>

        {/* Animated Waveform Divider: 05 */}
        <SectionDivider label="DEPLOYMENT EVOLUTION TIMELINE" index="05" />

        {/* 05 Architectural Deployment History */}
        <div id="timeline">
          <JourneyTimeline />
        </div>

        {/* Animated Waveform Divider: 06 */}
        <SectionDivider label="DIRECT INTERACTIVE CLI CONSOLE" index="06" />

        {/* 06 Command Console REPL with Autocomplete */}
        <div id="cli-console">
          <CommandConsole />
        </div>
      </main>

      {/* Conversion Gateway & System Diagnostics Footer */}
      <FooterNoir />
    </div>
  );
}
