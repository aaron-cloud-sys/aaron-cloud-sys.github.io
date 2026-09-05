import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { Rotate3d, RefreshCw, Layers, Box } from 'lucide-react';
import { soundFx } from '../utils/audio';

/**
 * CyberdeckHero Component
 * Authentic Three.js 3D Hardware Architecture Scrollytelling Stage from aaron-cloud-sys.github.io.
 * 
 * 1. Monochromatic Noir: 100% black and white, zero random colors, zero white backgrounds.
 * 2. Unobstructed 3D Model: Zero name text overlays covering the laptop.
 * 3. 4 Scrollytelling Stages (400vh scroll depth):
 *    - 0: ASSEMBLED (Lid closed, floating in center of dark space, 360 OrbitControls)
 *    - 1: OPENING (Smooth 105-degree lid rotation on hinge, 2K Retina display illuminates)
 *    - 2: DECONSTRUCTED (4 CAD layers separate vertically, 4 dark glass callout cards appear)
 *    - 3: INSPECTION (Interactive 360-degree CAD inspection)
 * 4. Interactive HUD tracker pills and tactile controls at bottom and top.
 */
export default function CyberdeckHero() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  // Three.js instances
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelMasterRef = useRef(null);
  const groundShadowRef = useRef(null);
  const ringMeshRef = useRef(null);
  const particleMeshRef = useRef(null);

  // CAD Layer Groups
  const layerDisplayRef = useRef(null);
  const layerKeyboardRef = useRef(null);
  const layerLogicBoardRef = useRef(null);
  const layerChassisRef = useRef(null);

  // Animation values
  const baseModelYRef = useRef(-0.5);
  const [activeStep, setActiveStep] = useState(0);
  const [isDeconstructed, setIsDeconstructed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Apply scrollytelling progress (0.0 to 1.0) matching aaron-cloud-sys.github.io
  const updateScrollyState = useCallback((progress) => {
    const layerDisplay = layerDisplayRef.current;
    const layerKeyboard = layerKeyboardRef.current;
    const layerLogicBoard = layerLogicBoardRef.current;
    const layerChassis = layerChassisRef.current;
    const modelMaster = modelMasterRef.current;

    if (!layerDisplay || !layerKeyboard || !layerLogicBoard || !layerChassis || !modelMaster) {
      return;
    }

    if (progress < 0.05) {
      // Step 0: Assembled (Lid closed, stacked tightly)
      baseModelYRef.current = -0.5;
      layerDisplay.position.set(0, 0.18, -4.5);
      layerDisplay.rotation.x = 0;
      layerKeyboard.position.set(0, 0, 0);
      layerLogicBoard.position.set(0, -0.28, 0);
      layerChassis.position.set(0, -0.58, 0);
      modelMaster.rotation.x = 0.28;
      modelMaster.rotation.y = -0.38;

      setActiveStep(0);
      setIsDeconstructed(false);
    } else if (progress < 0.45) {
      // Step 1: Opening (Lid smoothly rotates up to 105 degrees on hinge)
      // Dynamically lower baseModelY so the tall opened display is centered vertically
      const t = (progress - 0.05) / 0.40;
      baseModelYRef.current = -0.5 - t * 2.6;
      layerDisplay.position.set(0, 0.18, -4.5);
      layerDisplay.rotation.x = -t * 1.85; // 105-degree opening
      layerKeyboard.position.set(0, 0, 0);
      layerLogicBoard.position.set(0, -0.28, 0);
      layerChassis.position.set(0, -0.58, 0);
      modelMaster.rotation.x = 0.28 + t * 0.08;
      modelMaster.rotation.y = -0.38 - t * 0.12;

      setActiveStep(1);
      setIsDeconstructed(false);
    } else if (progress < 0.85) {
      // Step 2: Deconstructed / Exploded (All 4 layers separate along Y axis)
      const t = (progress - 0.45) / 0.40;
      baseModelYRef.current = -3.1 + t * 1.5; // Maintain spacious vertical center
      layerDisplay.position.set(0, 0.18 + t * 3.8, -4.5 - t * 1.6);
      layerDisplay.rotation.x = -1.85 + t * 0.45;
      layerKeyboard.position.set(0, t * 1.4, t * 1.5);
      layerLogicBoard.position.set(0, -0.28 - t * 1.2, 0);
      layerChassis.position.set(0, -0.58 - t * 4.4, -t * 1.2);
      modelMaster.rotation.x = 0.36 - t * 0.06;
      modelMaster.rotation.y = -0.50 + t * 0.18;

      setActiveStep(2);
      setIsDeconstructed(true);
    } else {
      // Step 3: Inspection
      baseModelYRef.current = -1.3;
      setActiveStep(3);
      setIsDeconstructed(true);
    }
  }, []);

  // Jump to specific scrollytelling step by smooth scrolling
  const scrollToStep = useCallback((stepIdx) => {
    soundFx.playClick();
    const section = sectionRef.current;
    if (!section) return;

    const totalHeight = section.offsetHeight - window.innerHeight;
    const progressTargets = [0.0, 0.25, 0.65, 0.95];
    const targetY = section.offsetTop + totalHeight * progressTargets[stepIdx];

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  // Button actions
  const handleExplodeClick = useCallback(() => {
    soundFx.playClick();
    scrollToStep(2);
  }, [scrollToStep]);

  const handleAssembleClick = useCallback(() => {
    soundFx.playClick();
    scrollToStep(0);
  }, [scrollToStep]);

  const handleResetView = useCallback(() => {
    soundFx.playClick();
    if (cameraRef.current && controlsRef.current && modelMasterRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 2.8,
        z: 30,
        duration: 1.0,
        ease: 'power2.out',
      });
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      gsap.to(modelMasterRef.current.rotation, {
        x: 0.28,
        y: -0.38,
        z: 0,
        duration: 1.0,
        ease: 'power2.out',
      });
    }
  }, []);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (Perspective 40, distance 30 matching reference)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 2.8, 30);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Studio Chiaroscuro Stage Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.SpotLight(0xffffff, 5.5);
    mainKeyLight.position.set(5, 36, 18);
    mainKeyLight.angle = Math.PI / 3.8;
    mainKeyLight.penumbra = 0.85;
    mainKeyLight.castShadow = true;
    scene.add(mainKeyLight);

    const leftRimLight = new THREE.PointLight(0xffffff, 3.0, 50);
    leftRimLight.position.set(-20, 15, -8);
    scene.add(leftRimLight);

    const rightRimLight = new THREE.PointLight(0xe4e4e7, 2.8, 50);
    rightRimLight.position.set(20, -6, 10);
    scene.add(rightRimLight);

    const bottomFillLight = new THREE.PointLight(0xd4d4d8, 2.0, 35);
    bottomFillLight.position.set(0, -14, 0);
    scene.add(bottomFillLight);

    // 5. Soft Ground Ambient Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    sGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.22)');
    sGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.08)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 512, 512);

    const groundShadowMat = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false,
    });
    const groundShadow = new THREE.Mesh(new THREE.PlaneGeometry(36, 24), groundShadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -6.5;
    scene.add(groundShadow);
    groundShadowRef.current = groundShadow;

    // 6. Subtle Atmospheric Silver Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 28;
      particlePositions[i + 2] = (Math.random() - 0.5) * 36;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x888899,
      size: 0.09,
      transparent: true,
      opacity: 0.3,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);
    particleMeshRef.current = particleMesh;

    // 7. Master Model Group
    const modelMaster = new THREE.Group();
    scene.add(modelMaster);
    modelMasterRef.current = modelMaster;

    // Precision Luxury CAD Anodized Finishes (Monochromatic Black & White)
    const spaceBlackAnodized = new THREE.MeshStandardMaterial({
      color: 0x141417,
      metalness: 0.88,
      roughness: 0.28,
    });
    const spaceGrayAluminum = new THREE.MeshStandardMaterial({
      color: 0x222228,
      metalness: 0.85,
      roughness: 0.32,
    });
    const polishedSilverTrim = new THREE.MeshStandardMaterial({
      color: 0xf4f4f6,
      metalness: 0.95,
      roughness: 0.15,
    });
    const matteBezelMat = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      metalness: 0.5,
      roughness: 0.5,
    });

    // ── LAYER 1: DISPLAY & RETINA 2K CANVAS (INTERFACE DECK)
    const layerDisplay = new THREE.Group();
    layerDisplay.position.set(0, 0.18, -4.5); // Back hinge anchor position
    layerDisplayRef.current = layerDisplay;

    const lidContainer = new THREE.Group();
    layerDisplay.add(lidContainer);

    // Laptop Lid Unibody Shell
    const lidShell = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.22, 9.0), spaceBlackAnodized);
    lidShell.position.set(0, 0, 4.5);
    lidContainer.add(lidShell);

    // Bezel Border
    const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(13.1, 0.05, 8.7), matteBezelMat);
    screenBezel.position.set(0, -0.10, 4.5);
    lidContainer.add(screenBezel);

    // Polished Silver Monogram Plate on outer back face
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 256;
    logoCanvas.height = 256;
    const lCtx = logoCanvas.getContext('2d');
    lCtx.fillStyle = '#101014';
    lCtx.fillRect(0, 0, 256, 256);
    lCtx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    lCtx.lineWidth = 10;
    lCtx.strokeRect(18, 18, 220, 220);
    lCtx.fillStyle = '#ffffff';
    lCtx.font = '900 115px monospace';
    lCtx.textAlign = 'center';
    lCtx.textBaseline = 'middle';
    lCtx.fillText('AS', 128, 134);
    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      metalness: 0.92,
      roughness: 0.22,
    });
    const lidLogo = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 2.0), logoMat);
    lidLogo.position.set(0, 0.118, 4.5);
    lidContainer.add(lidLogo);

    // High-Resolution 2048x1280 Retina Dashboard Canvas (Strict Monochromatic Black & White)
    const canvasUI = document.createElement('canvas');
    canvasUI.width = 2048;
    canvasUI.height = 1280;
    const ctxUI = canvasUI.getContext('2d');

    // Canvas Background & Grid
    ctxUI.fillStyle = '#09090c';
    ctxUI.fillRect(0, 0, 2048, 1280);

    const gradHdr = ctxUI.createLinearGradient(0, 0, 0, 400);
    gradHdr.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
    gradHdr.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctxUI.fillStyle = gradHdr;
    ctxUI.fillRect(0, 0, 2048, 400);

    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctxUI.lineWidth = 1;
    for (let x = 80; x < 2000; x += 120) {
      ctxUI.beginPath();
      ctxUI.moveTo(x, 180);
      ctxUI.lineTo(x, 1200);
      ctxUI.stroke();
    }
    for (let y = 180; y < 1200; y += 120) {
      ctxUI.beginPath();
      ctxUI.moveTo(80, y);
      ctxUI.lineTo(1968, y);
      ctxUI.stroke();
    }

    // Top Navigation / Window Header
    ctxUI.fillStyle = '#141419';
    ctxUI.fillRect(80, 70, 1888, 80);
    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctxUI.lineWidth = 2;
    ctxUI.strokeRect(80, 70, 1888, 80);

    // Window Dots
    ctxUI.fillStyle = '#52525b';
    ctxUI.beginPath(); ctxUI.arc(120, 110, 10, 0, Math.PI * 2); ctxUI.fill();
    ctxUI.fillStyle = '#71717a';
    ctxUI.beginPath(); ctxUI.arc(155, 110, 10, 0, Math.PI * 2); ctxUI.fill();
    ctxUI.fillStyle = '#a1a1aa';
    ctxUI.beginPath(); ctxUI.arc(190, 110, 10, 0, Math.PI * 2); ctxUI.fill();

    ctxUI.fillStyle = '#ffffff';
    ctxUI.font = 'bold 30px "Space Grotesk", sans-serif';
    ctxUI.fillText('AYUSH SWAIN // EXECUTIVE FINANCIAL TELEMETRY', 240, 118);

    ctxUI.fillStyle = '#ffffff';
    ctxUI.font = 'bold 22px "JetBrains Mono", monospace';
    ctxUI.fillText('SYSTEM STATUS: 100% OPERATIONAL', 1500, 118);

    // 3 Left Telemetry KPI Cards
    const kpis = [
      { label: 'LEDGER RECONCILIATION', val: 'INR 95,00,000+', sub: '99.8% Mathematical Precision (200+ Accts)' },
      { label: 'PROCUREMENT LIFECYCLE', val: '150+ POs (3.4Cr+ INR)', sub: 'Zero GeM Compliance Rejections' },
      { label: 'AGENTIC AI PIPELINE', val: '60% Turnaround', sub: 'Autonomous Extraction & ERP Ingestion' }
    ];

    kpis.forEach((k, idx) => {
      const cardY = 190 + idx * 160;
      ctxUI.fillStyle = '#111116';
      ctxUI.fillRect(80, cardY, 820, 135);
      ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctxUI.lineWidth = 2;
      ctxUI.strokeRect(80, cardY, 820, 135);

      ctxUI.fillStyle = '#a1a1aa';
      ctxUI.font = 'bold 20px "JetBrains Mono", monospace';
      ctxUI.fillText(`// ${k.label}`, 110, cardY + 40);

      ctxUI.fillStyle = '#ffffff';
      ctxUI.font = 'bold 36px "Space Grotesk", sans-serif';
      ctxUI.fillText(k.val, 110, cardY + 85);

      ctxUI.fillStyle = '#71717a';
      ctxUI.font = '19px "Plus Jakarta Sans", sans-serif';
      ctxUI.fillText(k.sub, 110, cardY + 118);
    });

    // Right High-Density Chart Box
    ctxUI.fillStyle = '#111116';
    ctxUI.fillRect(940, 190, 1028, 455);
    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctxUI.lineWidth = 2;
    ctxUI.strokeRect(940, 190, 1028, 455);

    ctxUI.fillStyle = '#ffffff';
    ctxUI.font = 'bold 24px "Space Grotesk", sans-serif';
    ctxUI.fillText('CUMULATIVE AUDIT VELOCITY (AI AGENT ACCELERATION)', 980, 240);

    // Chart Vector Path
    const pts = [
      [980, 580], [1120, 530], [1280, 550], [1440, 420], [1600, 390], [1780, 320], [1920, 290]
    ];
    const chartGrad = ctxUI.createLinearGradient(0, 280, 0, 600);
    chartGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    chartGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctxUI.fillStyle = chartGrad;
    ctxUI.beginPath();
    ctxUI.moveTo(pts[0][0], pts[0][1]);
    pts.forEach(p => ctxUI.lineTo(p[0], p[1]));
    ctxUI.lineTo(1920, 600);
    ctxUI.lineTo(980, 600);
    ctxUI.closePath();
    ctxUI.fill();

    ctxUI.strokeStyle = '#ffffff';
    ctxUI.lineWidth = 5;
    ctxUI.beginPath();
    ctxUI.moveTo(pts[0][0], pts[0][1]);
    pts.forEach(p => ctxUI.lineTo(p[0], p[1]));
    ctxUI.stroke();

    pts.forEach(p => {
      ctxUI.fillStyle = '#ffffff';
      ctxUI.beginPath(); ctxUI.arc(p[0], p[1], 8, 0, Math.PI * 2); ctxUI.fill();
      ctxUI.strokeStyle = '#09090c';
      ctxUI.lineWidth = 3;
      ctxUI.stroke();
    });

    // Bottom Terminal Stream Log on Screen
    ctxUI.fillStyle = '#0c0c10';
    ctxUI.fillRect(80, 690, 1888, 510);
    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    ctxUI.lineWidth = 2;
    ctxUI.strokeRect(80, 690, 1888, 510);

    const logs = [
      '> [CORE_EXECUTION] Mounting dual-entry multi-entity hospital ledger pipeline...',
      '> Ingested 200+ distinct GL accounts (KIMS Healthcare + Corporate divisions)',
      '> Reconciled DR/CR variance: Verified INR 95,00,000.00 entries (Delta = 0.00)',
      '> GeM Portal Engine: 150+ POs cross-verified with statutory dispatch logs',
      '> Agentic Ingestion Workflow: Latency reduced from 4.5 hrs to 1.8 hrs (-60%)',
      '> Audit Compliance Certificate: Verified 100% Zero Defect filing status'
    ];

    logs.forEach((line, i) => {
      ctxUI.fillStyle = i === 0 ? '#ffffff' : (i === 2 || i === 5 ? '#e4e4e7' : '#a1a1aa');
      ctxUI.font = '24px "JetBrains Mono", monospace';
      ctxUI.fillText(line, 120, 750 + i * 72);
    });

    const screenTex = new THREE.CanvasTexture(canvasUI);
    screenTex.anisotropy = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 16;
    screenTex.minFilter = THREE.LinearMipmapLinearFilter;
    screenTex.magFilter = THREE.LinearFilter;
    screenTex.generateMipmaps = true;
    screenTex.needsUpdate = true;

    const displayGraphicMat = new THREE.MeshBasicMaterial({
      map: screenTex,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -1.0,
      polygonOffsetUnits: -1.0,
      depthTest: true,
      depthWrite: true,
    });
    const displayGraphicMesh = new THREE.Mesh(new THREE.PlaneGeometry(12.3, 7.7), displayGraphicMat);
    displayGraphicMesh.rotation.x = Math.PI / 2;
    displayGraphicMesh.position.set(0, -0.128, 4.5);
    lidContainer.add(displayGraphicMesh);

    modelMaster.add(layerDisplay);

    // ── LAYER 2: KEYBOARD DECK & TRACKPAD (AUTOMATION DECK)
    const layerKeyboard = new THREE.Group();
    layerKeyboardRef.current = layerKeyboard;

    const deckMesh = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.32, 9.0), spaceGrayAluminum);
    layerKeyboard.add(deckMesh);

    const keyTray = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.04, 4.8), new THREE.MeshStandardMaterial({
      color: 0x0f0f13,
      metalness: 0.6,
      roughness: 0.5,
    }));
    keyTray.position.set(0, 0.16, -1.3);
    layerKeyboard.add(keyTray);

    const trackpadMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.04, 3.1), new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.8,
      roughness: 0.2,
    }));
    trackpadMesh.position.set(0, 0.17, 2.3);
    layerKeyboard.add(trackpadMesh);

    const trackpadBorder = new THREE.Mesh(new THREE.BoxGeometry(4.86, 0.02, 3.16), polishedSilverTrim);
    trackpadBorder.position.set(0, 0.155, 2.3);
    layerKeyboard.add(trackpadBorder);

    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0d,
      metalness: 0.35,
      roughness: 0.55,
    });
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        if (r === 4 && c >= 4 && c <= 9) continue;
        const isModifier = (r === 0) || (c === 0) || (c === 13) || (r === 4);
        const kw = isModifier ? 0.78 : 0.68;
        const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(kw, 0.08, 0.68), keyMat);
        keyMesh.position.set((c - 14 / 2 + 0.5) * 0.82, 0.20, (r - 5 / 2 + 0.5) * 0.82 - 1.3);
        layerKeyboard.add(keyMesh);
      }
    }
    const spacebar = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.08, 0.68), keyMat);
    spacebar.position.set(0, 0.20, (4 - 5 / 2 + 0.5) * 0.82 - 1.3);
    layerKeyboard.add(spacebar);

    modelMaster.add(layerKeyboard);

    // ── LAYER 3: LOGIC BOARD & SILICON (COMPUTATIONAL CORE)
    const layerLogicBoard = new THREE.Group();
    layerLogicBoardRef.current = layerLogicBoard;

    const pcbBoard = new THREE.Mesh(new THREE.BoxGeometry(12.8, 0.14, 8.2), new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.7,
      roughness: 0.35,
    }));
    layerLogicBoard.add(pcbBoard);

    const cpuChip = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.24, 3.2), new THREE.MeshStandardMaterial({
      color: 0xf4f4f7,
      metalness: 0.98,
      roughness: 0.12,
      emissive: 0x181820,
      emissiveIntensity: 0.15,
    }));
    cpuChip.position.set(0, 0.16, -0.2);
    layerLogicBoard.add(cpuChip);

    const ringMesh = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.45, 48), new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    }));
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.22, -0.2);
    layerLogicBoard.add(ringMesh);
    ringMeshRef.current = ringMesh;

    const circuitMesh = new THREE.Mesh(new THREE.PlaneGeometry(11.8, 7.2, 14, 8), new THREE.MeshBasicMaterial({
      color: 0x888899,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    }));
    circuitMesh.rotation.x = Math.PI / 2;
    circuitMesh.position.set(0, 0.11, 0);
    layerLogicBoard.add(circuitMesh);

    for (let i = -1; i <= 1; i += 2) {
      const nand = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 2.4), new THREE.MeshStandardMaterial({
        color: 0x1c1c24,
        metalness: 0.85,
        roughness: 0.2,
      }));
      nand.position.set(i * 3.6, 0.16, -0.6);
      layerLogicBoard.add(nand);

      // Monochromatic chrome heatpipes
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.2, 16), polishedSilverTrim);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(i * 2.2, 0.18, 1.8);
      layerLogicBoard.add(pipe);
    }

    modelMaster.add(layerLogicBoard);

    // ── LAYER 4: CHASSIS & LOGISTICS BASE (FOUNDATIONAL BASE)
    const layerChassis = new THREE.Group();
    layerChassisRef.current = layerChassis;

    const chassisBase = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.38, 9.0), spaceBlackAnodized);
    layerChassis.add(chassisBase);

    const batMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c10,
      metalness: 0.5,
      roughness: 0.6,
    });
    for (let b = 0; b < 6; b++) {
      const batMesh = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.22, 3.8), batMat);
      batMesh.position.set((b - 2.5) * 2.0, 0.24, 1.7);
      layerChassis.add(batMesh);
    }

    const fanHousingMat = new THREE.MeshStandardMaterial({ color: 0x181822, metalness: 0.85, roughness: 0.25 });
    for (let f = -1; f <= 1; f += 2) {
      const fanHousing = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.22, 32), fanHousingMat);
      fanHousing.position.set(f * 4.0, 0.24, -2.0);
      layerChassis.add(fanHousing);

      const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.26, 24), polishedSilverTrim);
      fanHub.position.set(f * 4.0, 0.25, -2.0);
      layerChassis.add(fanHub);
    }

    modelMaster.add(layerChassis);

    // Initial Master Rotation
    modelMaster.rotation.x = 0.28;
    modelMaster.rotation.y = -0.38;

    // 8. OrbitControls (360-degree interactive rotation)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2 + 0.35;
    controls.minPolarAngle = Math.PI / 6;
    controlsRef.current = controls;

    // 9. Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth floating bobbing
      const currentBaseY = baseModelYRef.current;
      modelMaster.position.y = currentBaseY + Math.sin(elapsedTime * 1.4) * 0.10;
      groundShadow.position.y = currentBaseY - 6.0;

      if (ringMeshRef.current) {
        ringMeshRef.current.rotation.z += 0.015;
      }
      if (particleMeshRef.current) {
        particleMeshRef.current.rotation.y = elapsedTime * 0.02;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Initial State Calculation based on current scroll position
    const calculateInitialScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      updateScrollyState(progress);
      setIsScrolled(window.scrollY >= 780);
    };
    calculateInitialScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [updateScrollyState]);

  // Track window scroll across the 400vh section
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      updateScrollyState(progress);
      setIsScrolled(window.scrollY >= 780);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollyState]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full bg-black select-none"
      style={{ height: '400vh' }}
    >
      {/* Sticky 100vh Viewport Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Volumetric Overhead Spotlight Lighting & Grid */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.01)_50%,transparent_75%)] blur-3xl pointer-events-none z-0"
        />

        {/* 3D WebGL Canvas Viewport (Unobstructed in Center) */}
        <div
          ref={containerRef}
          id="webgl-container"
          className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
        />

        {/* Tactical HUD Top Bar Controls */}
        <div
          className={`absolute top-20 left-0 w-full px-6 sm:px-12 flex items-center justify-between z-30 transition-all duration-700 ease-out ${
            isScrolled
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none [&_*]:pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase font-bold">
              HARDWARE ARCHITECTURE
            </span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider text-zinc-600">
              // SCROLLYTELLING EXPLODED VIEW
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={handleExplodeClick}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider border backdrop-blur-xl transition-all cursor-pointer ${
                isDeconstructed
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-500'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Explode</span>
            </button>

            <button
              onClick={handleAssembleClick}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider border backdrop-blur-xl transition-all cursor-pointer ${
                activeStep === 0
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-500'
              }`}
            >
              <Box className="w-3 h-3" />
              <span>Assemble</span>
            </button>

            <button
              onClick={handleResetView}
              className="p-1.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 backdrop-blur-xl transition-colors cursor-pointer"
              title="Reset 360 Camera View"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4 Exploded Deconstructable Callout Cards (Strict Monochromatic Black & White) */}
        <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
          {/* Card 01: Top Left */}
          <div
            className={`absolute top-[16%] left-[4%] sm:left-[6%] w-[320px] max-w-[calc(100%-32px)] p-6 bg-zinc-950/90 border border-zinc-800/90 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white pointer-events-auto transition-all duration-700 ${
              isDeconstructed
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-zinc-500">01</span>
              <span className="bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">
                INTERFACE DECK
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
              Executive Intelligence &amp; GeM Portals
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              High-density visual cockpits synthesizing government tenders, procurement validation, and statutory compliance.
            </p>
            <div className="pt-2.5 border-t border-zinc-800/80 space-y-1 font-mono text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">PORTAL</span>
                <span className="text-white font-medium">GeM Government e-Marketplace</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">COMPLIANCE</span>
                <span className="text-white font-semibold">100% Zero-Defect Filings</span>
              </div>
            </div>
          </div>

          {/* Card 02: Top Right */}
          <div
            className={`absolute top-[16%] right-[4%] sm:right-[6%] w-[320px] max-w-[calc(100%-32px)] p-6 bg-zinc-950/90 border border-zinc-800/90 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white pointer-events-auto transition-all duration-700 ${
              isDeconstructed
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-zinc-500">02</span>
              <span className="bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">
                AUTOMATION DECK
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
              Agentic AI &amp; Document Parsing
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Autonomous LLM-assisted pipelines extracting, validating, and cross-checking invoices, purchase orders, and dispatch slips.
            </p>
            <div className="pt-2.5 border-t border-zinc-800/80 space-y-1 font-mono text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">ACCELERATION</span>
                <span className="text-white font-semibold">60% Faster Turnaround</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">WORKFLOW</span>
                <span className="text-white font-medium">Zero Manual OCR Errors</span>
              </div>
            </div>
          </div>

          {/* Card 03: Bottom Left */}
          <div
            className={`absolute bottom-[16%] left-[4%] sm:left-[6%] w-[320px] max-w-[calc(100%-32px)] p-6 bg-zinc-950/90 border border-zinc-800/90 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white pointer-events-auto transition-all duration-700 ${
              isDeconstructed
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-zinc-500">03</span>
              <span className="bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">
                COMPUTATIONAL CORE
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
              Institutional Ledger Reconciliation
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Mathematical multi-account reconciliation engine processing 95L+ INR in hospital and corporate ledger entries at 99.8% precision.
            </p>
            <div className="pt-2.5 border-t border-zinc-800/80 space-y-1 font-mono text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">RECONCILED</span>
                <span className="text-white font-semibold">INR 95,00,000+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ACCURACY</span>
                <span className="text-white font-semibold">99.8% Precision</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">ACCOUNTS</span>
                <span className="text-white font-medium">200+ Reconciled</span>
              </div>
            </div>
          </div>

          {/* Card 04: Bottom Right */}
          <div
            className={`absolute bottom-[16%] right-[4%] sm:right-[6%] w-[320px] max-w-[calc(100%-32px)] p-6 bg-zinc-950/90 border border-zinc-800/90 rounded-2xl backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-white pointer-events-auto transition-all duration-700 ${
              isDeconstructed
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-zinc-500">04</span>
              <span className="bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase">
                FOUNDATIONAL BASE
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
              Supply Chain &amp; Procurement Hub
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              End-to-end logistics orchestration, purchase order verification, vendor lifecycle management, and vehicle dispatch planning.
            </p>
            <div className="pt-2.5 border-t border-zinc-800/80 space-y-1 font-mono text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-zinc-500">VOLUME</span>
                <span className="text-white font-semibold">150+ POs (3.4Cr+ INR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">DISPATCH</span>
                <span className="text-white font-semibold">80+ Dispatches (91% On-Time)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CSAT</span>
                <span className="text-white font-medium">95%+ Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orbit Drag Hint Pill */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-zinc-800/80 backdrop-blur-xl text-zinc-400 font-mono text-[10.5px] tracking-wider pointer-events-none z-30">
          <Rotate3d className="w-3.5 h-3.5 text-zinc-300" />
          <span>Click &amp; Drag 3D Model in 360° Space</span>
        </div>

        {/* Sleek Scrollytelling Progress Tracker (Matching aaron-cloud-sys.github.io) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 sm:gap-8 pointer-events-auto z-30">
          {[
            { label: 'ASSEMBLED', step: 0 },
            { label: 'OPENING', step: 1 },
            { label: 'DECONSTRUCTED', step: 2 },
            { label: 'INSPECTION', step: 3 },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => scrollToStep(item.step)}
              className={`flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.15em] transition-all cursor-pointer ${
                activeStep === item.step
                  ? 'text-white font-bold'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeStep === item.step
                    ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-125'
                    : 'bg-zinc-700'
                }`}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
