/* ══════════════════════════════════════════════════════════════════════════════
   AYUSH SWAIN — SCRIPT ENGINE
   1. Three.js 3D Hardware Exploded Architecture (interaction.mp4)
   2. Cinematic Dust Particles & Studio Spotlight (inspiration.mp4)
   3. Neural Pipeline Terminal & Interactive Simulator (Philosophy)
   4. 3D Parallax Tilt Matrix Cards
   5. Experience Dossier Filter Tabs & Inspect Drawers (Track Record)
   6. Interactive Mini-LED Canvas & Agentic ROI Calculator (Evidence)
   7. Stat Count-Up & Spotlight Cursor
══════════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function triggerHeroEntrance() {
    if (typeof gsap !== 'undefined') {
      gsap.from('.brand-title span', {
        duration: 1.0,
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: 'power4.out'
      });
      gsap.from('.hero-status-pill, .discipline-ribbon, .hero-lead, .hero-ctas', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }

  triggerHeroEntrance();

  /* ── 1. SPOTLIGHT CURSOR FOLLOWER ────────────────────────────────────────── */
  const cursorSpot = document.getElementById('cursorSpotlight');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function renderCursor() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    if (cursorSpot) {
      cursorSpot.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  /* ── 2. THREE.JS 3D HARDWARE ARCHITECTURE SCENE (LUXURY CAD MODEL) ─────── */
  const container = document.getElementById('webgl-container');
  if (container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2.8, 30);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── Studio Stage Lighting (Apple Product Reveal Style)
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

    // ── Ground Soft Ambient Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
    sGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.12)');
    sGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.04)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 512, 512);

    const groundShadowMat = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false
    });
    const groundShadow = new THREE.Mesh(new THREE.PlaneGeometry(36, 24), groundShadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -6.5;
    scene.add(groundShadow);

    // ── Subtle Atmospheric Silver Particles
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
      opacity: 0.3
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // ── Master Model Group
    const modelMaster = new THREE.Group();
    scene.add(modelMaster);

    // ── Materials (Precision Luxury CAD Anodized Finishes)
    const spaceBlackAnodized = new THREE.MeshStandardMaterial({
      color: 0x141417,
      metalness: 0.88,
      roughness: 0.28
    });
    const spaceGrayAluminum = new THREE.MeshStandardMaterial({
      color: 0x222228,
      metalness: 0.85,
      roughness: 0.32
    });
    const polishedSilverTrim = new THREE.MeshStandardMaterial({
      color: 0xf4f4f6,
      metalness: 0.95,
      roughness: 0.15
    });
    const matteBezelMat = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      metalness: 0.5,
      roughness: 0.5
    });
    const glassScreenMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.15,
      transparent: true,
      opacity: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    // ── LAYER 1: DISPLAY & RETINA 4K CANVAS (INTERFACE DECK) ─────────────────
    const layerDisplay = new THREE.Group();
    layerDisplay.position.set(0, 0.18, -4.5); // Back hinge anchor position

    const lidContainer = new THREE.Group();
    layerDisplay.add(lidContainer);

    // Laptop Lid Unibody Shell (offset forward by +4.5 so hinge is at local origin)
    const lidShell = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.22, 9.0), spaceBlackAnodized);
    lidShell.position.set(0, 0, 4.5);
    lidContainer.add(lidShell);

    // Bezel Border (on the inside face of the lid)
    const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(13.1, 0.05, 8.7), matteBezelMat);
    screenBezel.position.set(0, -0.10, 4.5);
    lidContainer.add(screenBezel);

    // Polished Silver Monogram Plate on the outer back face
    const lidLogo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 1.6), polishedSilverTrim);
    lidLogo.position.set(0, 0.115, 4.5);
    lidContainer.add(lidLogo);

    // High-Resolution 2048x1280 Retina Dashboard Canvas
    const canvasUI = document.createElement('canvas');
    canvasUI.width = 2048;
    canvasUI.height = 1280;
    const ctxUI = canvasUI.getContext('2d');

    // Canvas Background & Grid
    ctxUI.fillStyle = '#09090c';
    ctxUI.fillRect(0, 0, 2048, 1280);

    // Ambient Top Highlight
    const gradHdr = ctxUI.createLinearGradient(0, 0, 0, 400);
    gradHdr.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
    gradHdr.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctxUI.fillStyle = gradHdr;
    ctxUI.fillRect(0, 0, 2048, 400);

    // Architectural Wire Grid
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
    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.1)';
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
    ctxUI.fillText('AYUSH SWAIN — EXECUTIVE FINANCIAL TELEMETRY', 240, 118);

    ctxUI.fillStyle = '#22c55e';
    ctxUI.font = 'bold 22px "JetBrains Mono", monospace';
    ctxUI.fillText('● SYSTEM STATUS: 100% OPERATIONAL', 1500, 118);

    // 3 Left Telemetry KPI Cards
    const kpis = [
      { label: 'LEDGER RECONCILIATION', val: '₹95,00,000+', sub: '99.8% Mathematical Precision (200+ Accts)' },
      { label: 'PROCUREMENT LIFECYCLE', val: '150+ POs (₹3.4Cr+)', sub: 'Zero GeM Compliance Rejections' },
      { label: 'AGENTIC AI PIPELINE', val: '60% Turnaround', sub: 'Autonomous Extraction & ERP Ingestion' }
    ];

    kpis.forEach((k, idx) => {
      const cardY = 190 + idx * 160;
      ctxUI.fillStyle = '#111116';
      ctxUI.fillRect(80, cardY, 820, 135);
      ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.1)';
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
    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.1)';
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
    ctxUI.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctxUI.lineWidth = 2;
    ctxUI.strokeRect(80, 690, 1888, 510);

    const logs = [
      '▶ [CORE_EXECUTION] Mounting dual-entry multi-entity hospital ledger pipeline...',
      '✔ Ingested 200+ distinct GL accounts (KIMS Healthcare + Corporate divisions)',
      '✔ Reconciled DR/CR variance: Verified ₹95,00,000.00 entries (Delta = ₹0.00)',
      '✔ GeM Portal Engine: 150+ POs cross-verified with statutory dispatch logs',
      '✔ Agentic Ingestion Workflow: Latency reduced from 4.5 hrs to 1.8 hrs (-60%)',
      '✔ Audit Compliance Certificate: Verified 100% Zero Defect filing status'
    ];

    logs.forEach((line, i) => {
      ctxUI.fillStyle = i === 0 ? '#ffffff' : (i === 2 || i === 5 ? '#22c55e' : '#a1a1aa');
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
      depthWrite: true
    });
    const displayGraphicMesh = new THREE.Mesh(new THREE.PlaneGeometry(12.3, 7.7), displayGraphicMat);
    displayGraphicMesh.rotation.x = Math.PI / 2;
    displayGraphicMesh.position.set(0, -0.128, 4.5);
    lidContainer.add(displayGraphicMesh);

    // Liquid Retina XDR Glass Sheen Layer (Subtle Protective Reflection)
    const screenGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.05,
      roughness: 0.04,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -2.0,
      polygonOffsetUnits: -2.0
    });
    const screenGlassMesh = new THREE.Mesh(new THREE.PlaneGeometry(12.3, 7.7), screenGlassMat);
    screenGlassMesh.rotation.x = Math.PI / 2;
    screenGlassMesh.position.set(0, -0.131, 4.5);
    lidContainer.add(screenGlassMesh);

    modelMaster.add(layerDisplay);

    // ── LAYER 2: KEYBOARD DECK & TRACKPAD (AUTOMATION DECK) ──────────────────
    const layerKeyboard = new THREE.Group();

    // Top Base Unibody Deck
    const deckMesh = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.32, 9.0), spaceGrayAluminum);
    layerKeyboard.add(deckMesh);

    // Recessed Keyboard Tray
    const keyTray = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.04, 4.8), new THREE.MeshStandardMaterial({
      color: 0x0f0f13,
      metalness: 0.6,
      roughness: 0.5
    }));
    keyTray.position.set(0, 0.16, -1.3);
    layerKeyboard.add(keyTray);

    // Glass Trackpad with Polished Chamfer Border
    const trackpadMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.04, 3.1), new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.8,
      roughness: 0.2
    }));
    trackpadMesh.position.set(0, 0.17, 2.3);
    layerKeyboard.add(trackpadMesh);

    const trackpadBorder = new THREE.Mesh(new THREE.BoxGeometry(4.86, 0.02, 3.16), polishedSilverTrim);
    trackpadBorder.position.set(0, 0.155, 2.3);
    layerKeyboard.add(trackpadBorder);

    // Backlit Individual Chiclet Keys
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0d,
      metalness: 0.35,
      roughness: 0.55
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

    // ── LAYER 3: LOGIC BOARD & SILICON (COMPUTATIONAL CORE) ──────────────────
    const layerLogicBoard = new THREE.Group();

    const pcbBoard = new THREE.Mesh(new THREE.BoxGeometry(12.8, 0.14, 8.2), new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.7,
      roughness: 0.35
    }));
    layerLogicBoard.add(pcbBoard);

    const cpuChip = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.24, 3.2), new THREE.MeshStandardMaterial({
      color: 0xf4f4f7,
      metalness: 0.98,
      roughness: 0.12,
      emissive: 0x181820,
      emissiveIntensity: 0.15
    }));
    cpuChip.position.set(0, 0.16, -0.2);
    layerLogicBoard.add(cpuChip);

    const ringMesh = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.45, 48), new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    }));
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.22, -0.2);
    layerLogicBoard.add(ringMesh);

    const circuitMesh = new THREE.Mesh(new THREE.PlaneGeometry(11.8, 7.2, 14, 8), new THREE.MeshBasicMaterial({
      color: 0x888899,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    }));
    circuitMesh.rotation.x = Math.PI / 2;
    circuitMesh.position.set(0, 0.11, 0);
    layerLogicBoard.add(circuitMesh);

    for (let i = -1; i <= 1; i += 2) {
      const nand = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 2.4), new THREE.MeshStandardMaterial({
        color: 0x1c1c24,
        metalness: 0.85,
        roughness: 0.2
      }));
      nand.position.set(i * 3.6, 0.16, -0.6);
      layerLogicBoard.add(nand);

      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.2, 16), new THREE.MeshStandardMaterial({
        color: 0xb45309,
        metalness: 0.9,
        roughness: 0.2
      }));
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(i * 2.2, 0.18, 1.8);
      layerLogicBoard.add(pipe);
    }

    modelMaster.add(layerLogicBoard);

    // ── LAYER 4: CHASSIS & LOGISTICS BASE (FOUNDATIONAL BASE) ────────────────
    const layerChassis = new THREE.Group();

    const chassisBase = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.38, 9.0), spaceBlackAnodized);
    layerChassis.add(chassisBase);

    const batMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c10,
      metalness: 0.5,
      roughness: 0.6
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

    modelMaster.rotation.x = 0.28;
    modelMaster.rotation.y = -0.38;

    let controls = null;
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.maxPolarAngle = Math.PI / 2 + 0.35;
      controls.minPolarAngle = Math.PI / 6;
    }

    const cards = {
      display: document.getElementById('cardDisplay'),
      keyboard: document.getElementById('cardKeyboard'),
      logicboard: document.getElementById('cardLogicBoard'),
      chassis: document.getElementById('cardChassis')
    };
    const hudSteps = document.querySelectorAll('.tracker-step');

    function setStepActive(index) {
      hudSteps.forEach((step, i) => {
        if (i === index) step.classList.add('active');
        else step.classList.remove('active');
      });
    }

    let baseModelY = -0.5;

    function updateScrollyState(progress) {
      if (progress < 0.15) {
        // Step 0: Assembled (Lid closed, stacked tightly)
        baseModelY = -0.5;
        layerDisplay.position.set(0, 0.18, -4.5);
        layerDisplay.rotation.x = 0;
        layerKeyboard.position.set(0, 0, 0);
        layerLogicBoard.position.set(0, -0.28, 0);
        layerChassis.position.set(0, -0.58, 0);
        modelMaster.rotation.x = 0.28;
        modelMaster.rotation.y = -0.38;
        Object.values(cards).forEach((c) => c && c.classList.remove('visible'));
        setStepActive(0);
      } else if (progress < 0.45) {
        // Step 1: Opening (Lid smoothly rotates up to 105° on hinge)
        // Dynamically lower baseModelY so the tall opened display is perfectly centered vertically
        const t = (progress - 0.15) / 0.30;
        baseModelY = -0.5 - t * 2.6;
        layerDisplay.position.set(0, 0.18, -4.5);
        layerDisplay.rotation.x = -t * 1.85; // 105 degree opening
        layerKeyboard.position.set(0, 0, 0);
        layerLogicBoard.position.set(0, -0.28, 0);
        layerChassis.position.set(0, -0.58, 0);
        modelMaster.rotation.x = 0.28 + t * 0.08;
        modelMaster.rotation.y = -0.38 - t * 0.12;
        Object.values(cards).forEach((c) => c && c.classList.remove('visible'));
        setStepActive(1);
      } else if (progress < 0.85) {
        // Step 2: Deconstructed / Exploded (All 4 layers separate along Y axis)
        const t = (progress - 0.45) / 0.40;
        baseModelY = -3.1 + t * 1.5; // Maintain spacious vertical center for the 4 exploding decks
        layerDisplay.position.set(0, 0.18 + t * 3.8, -4.5 - t * 1.6);
        layerDisplay.rotation.x = -1.85 + t * 0.45;
        layerKeyboard.position.set(0, t * 1.4, t * 1.5);
        layerLogicBoard.position.set(0, -0.28 - t * 1.2, 0);
        layerChassis.position.set(0, -0.58 - t * 4.4, -t * 1.2);
        modelMaster.rotation.x = 0.36 - t * 0.06;
        modelMaster.rotation.y = -0.50 + t * 0.18;
        if (cards.display) cards.display.classList.add('visible');
        if (cards.keyboard) cards.keyboard.classList.add('visible');
        if (cards.logicboard) cards.logicboard.classList.add('visible');
        if (cards.chassis) cards.chassis.classList.add('visible');
        setStepActive(2);
      } else {
        // Step 3: Inspection
        baseModelY = -1.3;
        setStepActive(3);
      }
    }

    window.addEventListener('scroll', () => {
      const explodedSection = document.getElementById('exploded-view');
      if (!explodedSection) return;
      const rect = explodedSection.getBoundingClientRect();
      const totalHeight = explodedSection.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      updateScrollyState(progress);
    });

    const btnExplode = document.getElementById('btnExplode');
    const btnAssemble = document.getElementById('btnAssemble');
    const btnResetView = document.getElementById('btnResetView');

    if (btnExplode) {
      btnExplode.addEventListener('click', () => {
        updateScrollyState(0.75);
        btnExplode.classList.add('active');
        if (btnAssemble) btnAssemble.classList.remove('active');
      });
    }
    if (btnAssemble) {
      btnAssemble.addEventListener('click', () => {
        updateScrollyState(0.0);
        btnAssemble.classList.add('active');
        if (btnExplode) btnExplode.classList.remove('active');
      });
    }
    if (btnResetView) {
      btnResetView.addEventListener('click', () => {
        camera.position.set(0, 2.8, 30);
        if (controls) controls.target.set(0, 0, 0);
        modelMaster.rotation.set(0.28, -0.38, 0);
      });
    }

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      modelMaster.position.y = baseModelY + Math.sin(elapsedTime * 1.4) * 0.10;
      groundShadow.position.y = baseModelY - 6.0;
      if (ringMesh) ringMesh.rotation.z += 0.015;
      if (particleMesh) particleMesh.rotation.y = elapsedTime * 0.02;
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  /* ── 3. LIVE NEURAL PIPELINE TERMINAL SIMULATOR (Philosophy) ─────────────── */
  const terminalStreams = {
    ocr: `[INGESTION_AGENT] Initializing unstructured document parsing pipeline...
> Target stream: Commercial invoices, purchase orders & dispatch challans
> Ingestion formats: Document PDFs, scanned order files, tabular statements
> Running layout analysis: Header blocks, vendor metadata, line-item tables
> Schema mapping: [Vendor_Entity, Item_Catalog, Unit_Rates, Statutory_Codes, Grand_Total]
> Verification: Cross-referencing Purchase Orders with Dispatch Challans -> VALIDATED
> Output pipeline: Auto-generating structured schema for ERP accounting queue
[RESULT] Ingestion cycle compressed | Zero manual extraction errors`,

    recon: `[RECONCILIATION_CORE] Initializing institutional ledger audit engine...
> Target entities: Institutional healthcare & corporate ledger accounts
> Ingesting general ledgers, sub-ledgers & vendor payment statements
> Executing automated dual-entry variance check:
  - Validating debit entries against corresponding credit postings -> VERIFIED
  - Checking bank settlement receipts with internal ledger records -> BALANCED
  - Flagging and resolving multi-account discrepancies -> ZERO_VARIANCE
> Mathematical verification: Complete cross-account ledger parity achieved
[RESULT] Weekly reporting cycle accelerated | Full audit traceability`,

    gem: `[GeM_OPS_ENGINE] Initializing Government e-Marketplace compliance workflow...
> Target portal: Government e-Marketplace (GeM) tender & procurement queue
> Verifying seller profile, authorization certifications & technical specifications
> Auditing procurement documentation against government buyer terms -> PASSED
> Cross-checking dispatch logs with delivery challans & tracking receipts -> MATCHED
> Filing compliance verification: Complete documentation package verified
[RESULT] Zero regulatory rejections | Seamless procurement lifecycle execution`
  };

  const termCode = document.querySelector('.term-stream');
  const termTitle = document.getElementById('termTitle');
  const termLatency = document.getElementById('termLatency');
  const termTabs = document.querySelectorAll('.term-tab');

  let typeInterval = null;

  function streamTerminalText(text) {
    if (!termCode) return;
    clearInterval(typeInterval);
    termCode.textContent = '';
    let i = 0;
    typeInterval = setInterval(() => {
      if (i < text.length) {
        termCode.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 8);
  }

  termTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      termTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;

      if (mode === 'ocr') {
        if (termTitle) termTitle.textContent = 'pipeline_agent_v2.6 :: INGESTION_MODE';
        if (termLatency) termLatency.textContent = '142ms';
      } else if (mode === 'recon') {
        if (termTitle) termTitle.textContent = 'reconciliation_engine :: LEDGER_INTEGRITY';
        if (termLatency) termLatency.textContent = '98ms';
      } else if (mode === 'gem') {
        if (termTitle) termTitle.textContent = 'gem_compliance_bot :: TENDER_DISPATCH';
        if (termLatency) termLatency.textContent = '115ms';
      }

      streamTerminalText(terminalStreams[mode] || terminalStreams.ocr);
    });
  });

  // Initial stream trigger on scroll
  const termSection = document.getElementById('philosophy');
  if (termSection) {
    let streamedOnce = false;
    const termObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !streamedOnce) {
          streamedOnce = true;
          streamTerminalText(terminalStreams.ocr);
        }
      });
    }, { threshold: 0.2 });
    termObs.observe(termSection);
  }

  /* ── 4. STEP-BASED SCROLL: 1 SCROLL = 1 CARD TURN (BIDIRECTIONAL) ─────────── */
  const flipCards = document.querySelectorAll('.matrix-card-flip');
  const matrixContainer = document.getElementById('capabilityMatrix');
  let cardStep = 0;            // how many cards are currently turned (0–4)
  let isLocked = false;        // debounce guard so each wheel tick counts once
  let isInSection = false;     // whether we're in the card section

  function setCardStep(step) {
    const newStep = Math.max(0, Math.min(flipCards.length, step));
    cardStep = newStep;
    flipCards.forEach((card, idx) => {
      if (idx < cardStep) {
        card.classList.add('turned-to-screen');
      } else {
        card.classList.remove('turned-to-screen');
      }
    });
  }

  // Detect when the matrix section enters/exits viewport
  if (matrixContainer) {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { isInSection = e.isIntersecting; });
    }, { threshold: 0.1 });
    sectionObs.observe(matrixContainer);
  }

  // Wheel event: each discrete scroll step flips one card
  window.addEventListener('wheel', (e) => {
    if (!isInSection || !matrixContainer) return;

    // Only intercept when scrolling into/through the card section
    const rect = matrixContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (!isVisible) return;

    // Gate: are there still cards to reveal/hide?
    const scrollingDown = e.deltaY > 0;
    if (scrollingDown && cardStep >= flipCards.length) return; // all revealed, let page scroll normally
    if (!scrollingDown && cardStep <= 0) return; // all hidden, let page scroll normally

    // Prevent page scroll while we're revealing cards
    e.preventDefault();

    if (isLocked) return;
    isLocked = true;

    if (scrollingDown) {
      setCardStep(cardStep + 1);
    } else {
      setCardStep(cardStep - 1);
    }

    // Debounce: wait for card flip animation (950ms) before allowing next step
    setTimeout(() => { isLocked = false; }, 750);

  }, { passive: false });

  // Touch support (swipe up = reveal, swipe down = hide)
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isInSection) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 30) return; // ignore tiny taps

    const swipingUp = dy > 0; // swipe up = reveal next
    if (swipingUp && cardStep < flipCards.length) {
      setCardStep(cardStep + 1);
    } else if (!swipingUp && cardStep > 0) {
      setCardStep(cardStep - 1);
    }
  }, { passive: true });

  // Hover tilt still works on flipped cards
  flipCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      const inner = card.querySelector('.flip-card-inner');
      if (inner) {
        const base = card.classList.contains('turned-to-screen') ? 180 : 0;
        inner.style.transform = `rotateY(${base + rotateY}deg) rotateX(${rotateX}deg) translateY(-4px)`;
      }
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      const inner = card.querySelector('.flip-card-inner');
      if (inner) {
        const base = card.classList.contains('turned-to-screen') ? 180 : 0;
        inner.style.transform = `rotateY(${base}deg) rotateX(0deg) translateY(0px)`;
      }
    });
  });

  /* ── 5. DOSSIER FILTER TABS & INSPECT DRAWERS (Track Record) ─────────────── */
  const dfBtns = document.querySelectorAll('.df-btn');
  const dossierCards = document.querySelectorAll('.dossier-card');

  dfBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      dfBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      dossierCards.forEach((card) => {
        const company = card.dataset.companyCard;
        if (filter === 'all' || filter === company) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // Inspect Drawer Toggle
  const inspectBtns = document.querySelectorAll('.dossier-inspect-btn');
  inspectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const drawer = document.getElementById(targetId);
      if (!drawer) return;

      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        btn.classList.remove('open');
        btn.querySelector('span').textContent = 'Inspect Toolchain & Metrics';
      } else {
        drawer.classList.add('open');
        btn.classList.add('open');
        btn.querySelector('span').textContent = 'Collapse Dossier';
      }
    });
  });

  /* ── 6. MINI-LED CANVAS & INTERACTIVE AGENTIC ROI CALCULATOR ─────────────── */
  const ledCanvas = document.getElementById('miniLedCanvas');
  if (ledCanvas) {
    const ctx = ledCanvas.getContext('2d');
    let width = (ledCanvas.width = ledCanvas.offsetWidth || 800);
    let height = (ledCanvas.height = ledCanvas.offsetHeight || 500);

    let ripples = [];
    window.addEventListener('resize', () => {
      width = ledCanvas.width = ledCanvas.offsetWidth || 800;
      height = ledCanvas.height = ledCanvas.offsetHeight || 500;
    });

    const screenWrap = document.getElementById('miniLedScreen');
    if (screenWrap) {
      screenWrap.addEventListener('mousemove', (e) => {
        const rect = screenWrap.getBoundingClientRect();
        ripples.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 2,
          maxRadius: 160,
          alpha: 0.6
        });
      });
    }

    function renderLed() {
      ctx.clearRect(0, 0, width, height);

      // Draw grid ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        grad.addColorStop(0, `rgba(6, 182, 212, ${r.alpha * 0.35})`);
        grad.addColorStop(0.7, `rgba(59, 130, 246, ${r.alpha * 0.15})`);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(renderLed);
    }
    renderLed();
  }

  // Interactive ROI Slider
  const hoursSlider = document.getElementById('hoursSlider');
  const hoursDisplay = document.getElementById('hoursDisplay');
  const weeklySaved = document.getElementById('weeklySaved');
  const monthlySaved = document.getElementById('monthlySaved');
  const annualSaved = document.getElementById('annualSaved');

  if (hoursSlider) {
    hoursSlider.addEventListener('input', (e) => {
      const hours = parseFloat(e.target.value);
      if (hoursDisplay) hoursDisplay.textContent = `${hours} hrs/week`;

      const wSaved = hours * 0.6;
      const mSaved = wSaved * 4.2;
      const aSaved = wSaved * 52;

      if (weeklySaved) weeklySaved.textContent = `${wSaved.toFixed(1)} hrs`;
      if (monthlySaved) monthlySaved.textContent = `${mSaved.toFixed(1)} hrs`;
      if (annualSaved) annualSaved.textContent = `${Math.round(aSaved)} hrs`;
    });
  }

  /* ── 7. STAT COUNT-UP ON SCROLL (Metrics Section) ────────────────────────── */
  const statNumbers = document.querySelectorAll('.ms-num');

  function countUp(el) {
    if (el._hasCounted) return;
    el._hasCounted = true;

    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * target;

      el.textContent =
        prefix +
        (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) +
        suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent =
          prefix +
          (decimals > 0 ? target.toFixed(decimals) : target) +
          suffix;
      }
    }
    requestAnimationFrame(step);
  }

  const observerMetrics = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach(countUp);
        }
      });
    },
    { threshold: 0.3 }
  );

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) observerMetrics.observe(metricsSection);

  /* ── 8. GENESIS INTRO SEQUENCE & CONCEPT A MOTION ────────────────────────── */
  const genesisOverlay = document.getElementById('genesisIntro');
  const typedTextEl = document.getElementById('genesisTypedText');
  const statusEl = document.getElementById('genesisStatus');
  const skipBtn = document.getElementById('genesisSkipBtn');
  const flankLeft = document.getElementById('flankLeft');
  const flankRight = document.getElementById('flankRight');

  // Reset scroll to top so Genesis Intro is always viewed from the beginning
  if (genesisOverlay) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  const emailToType = 'ayushswain161@gmail.com';
  let typeIndex = 0;
  let introDismissed = false;

  function dismissIntro() {
    if (introDismissed || !genesisOverlay) return;
    introDismissed = true;
    genesisOverlay.classList.add('dismissed');
    setTimeout(() => {
      if (genesisOverlay.parentNode) genesisOverlay.parentNode.removeChild(genesisOverlay);
    }, 1000);
  }

  function runGenesisTypewriter() {
    if (!typedTextEl) return;
    if (typeIndex < emailToType.length) {
      typedTextEl.textContent += emailToType.charAt(typeIndex);
      typeIndex++;
      const delay = Math.floor(Math.random() * 40) + 30;
      setTimeout(runGenesisTypewriter, delay);
    } else {
      if (statusEl) statusEl.classList.add('visible');
      setTimeout(dismissIntro, 700);
    }
  }

  if (genesisOverlay) {
    setTimeout(runGenesisTypewriter, 300);
    if (skipBtn) skipBtn.addEventListener('click', dismissIntro);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') dismissIntro();
    });
    genesisOverlay.addEventListener('click', dismissIntro);
  }

  /* ── CONCEPT A: PARALLAX COUNTER-DRIFT FOR TELEMETRY RAILS ────────────────── */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight * 1.5) {
      if (flankLeft) {
        flankLeft.style.transform = `translateY(calc(-50% - ${scrollY * 0.18}px))`;
      }
      if (flankRight) {
        flankRight.style.transform = `translateY(calc(-50% + ${scrollY * 0.18}px))`;
      }
    }
  });

  /* ── CONCEPT A: CYBERNETIC SCRAMBLE DECRYPT ON HOVER ──────────────────────── */
  const scrambleChars = '01ABCDEFXYZ_#@%&[]<>*+~';
  document.querySelectorAll('.scramble-text').forEach((el) => {
    const originalText = el.getAttribute('data-original') || el.textContent;
    let scrambleInterval = null;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(scrambleInterval);

      scrambleInterval = setInterval(() => {
        el.textContent = originalText
          .split('')
          .map((letter, index) => {
            if (letter === ' ' || letter === '—' || letter === '?' || letter === '.') return letter;
            if (index < iteration) return originalText[index];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(scrambleInterval);
          el.textContent = originalText;
        }
        iteration += 1.2;
      }, 25);
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(scrambleInterval);
      el.textContent = originalText;
    });
  });

  /* ── 9. SKIPER58: TEXT-ROLL NAV LINKS ─────────────────────────────────────── */
  // Wraps each nav link text in .roll-top + .roll-bot for the vertical roll effect
  document.querySelectorAll('.nav-link').forEach(link => {
    const text = link.textContent.trim();
    link.innerHTML = `<span class="roll-top">${text}</span><span class="roll-bot">${text}</span>`;
  });

  /* ── 10. SKIPER41: PROGRESSIVE BLUR DIVIDERS BETWEEN SECTIONS ────────────── */
  // Inject a 5-layer progressive blur divider after each major section
  function makeBlurDivider() {
    const div = document.createElement('div');
    div.className = 'prog-blur-divider';
    for (let i = 0; i < 5; i++) {
      const step = document.createElement('div');
      step.className = 'blur-step';
      div.appendChild(step);
    }
    return div;
  }

  // Insert dividers between sections
  ['#philosophy', '#trackRecord', '#evidence', '#contact'].forEach(sel => {
    const section = document.querySelector(sel);
    if (section && section.previousElementSibling) {
      section.parentNode.insertBefore(makeBlurDivider(), section);
    }
  });

  /* ── 11. B&W TICKER STRIP ──────────────────────────────────────────────────── */
  // Add a Skiper-style minimal keyword ticker below the hero
  const hero = document.getElementById('hero');
  if (hero) {
    const tags = [
      'Corporate Finance', 'Operations', 'Agentic AI', 'GST Compliance',
      'Tally ERP', 'Excel Automation', 'Skyy Rider', 'Multi-Entity Accounting',
      'Cash Flow', 'Vendor Management', 'AI Agent Builder', 'Workflow Automation',
    ];
    const ticker = document.createElement('div');
    ticker.className = 'bw-ticker-wrap';
    ticker.innerHTML = `<div class="bw-ticker">
      ${[...tags, ...tags].map(t => `<span class="bw-ticker-item">${t}</span>`).join('')}
    </div>`;
    hero.insertAdjacentElement('afterend', ticker);
  }

})();
