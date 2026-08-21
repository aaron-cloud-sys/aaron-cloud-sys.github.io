/* ══════════════════════════════════════════════════════════════════════════════
   AYUSH SWAIN — SCRIPT ENGINE
   1. Three.js 3D Hardware Exploded Architecture (interaction.mp4)
   2. Cinematic Dust Particles & Dynamic Studio Lighting (inspiration.mp4)
   3. Scrollytelling Layer Deconstruction & Card Anchors
   4. Orbit Controls & Interactive HUD
   5. Stat Count-Up & Spotlight Cursor
══════════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

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

  /* ── 2. THREE.JS 3D HARDWARE ARCHITECTURE SCENE ─────────────────────────── */
  const container = document.getElementById('webgl-container');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.02);

  const camera = new THREE.PerspectiveCamera(
    42,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 26);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  // ── 3D Lighting (Chiaroscuro Studio Spotlight - inspiration.mp4)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const mainSpot = new THREE.SpotLight(0xffffff, 5.0);
  mainSpot.position.set(0, 30, 12);
  mainSpot.angle = Math.PI / 4.5;
  mainSpot.penumbra = 0.85;
  mainSpot.castShadow = true;
  scene.add(mainSpot);

  const cyanRim = new THREE.PointLight(0x06b6d4, 4, 35);
  cyanRim.position.set(-18, 10, -6);
  scene.add(cyanRim);

  const blueRim = new THREE.PointLight(0x3b82f6, 4, 35);
  blueRim.position.set(18, -8, 6);
  scene.add(blueRim);

  const purpleUnder = new THREE.PointLight(0x8b5cf6, 3, 25);
  purpleUnder.position.set(0, -12, 0);
  scene.add(purpleUnder);

  // ── Cinematic Dust Particles in Light Cone (inspiration.mp4)
  const particleCount = 180;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 35;
    particlePositions[i + 1] = (Math.random() - 0.5) * 30;
    particlePositions[i + 2] = (Math.random() - 0.5) * 35;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x06b6d4,
    size: 0.12,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const particleMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particleMesh);

  // ── Master Model Group
  const modelMaster = new THREE.Group();
  scene.add(modelMaster);

  // ── PBR Materials
  const titaniumDark = new THREE.MeshStandardMaterial({
    color: 0x121216,
    metalness: 0.9,
    roughness: 0.22
  });

  const aluminumSpace = new THREE.MeshStandardMaterial({
    color: 0x1a1a22,
    metalness: 0.85,
    roughness: 0.3
  });

  const logicBoardMat = new THREE.MeshStandardMaterial({
    color: 0x07111a,
    metalness: 0.7,
    roughness: 0.4
  });

  const chipGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.98,
    roughness: 0.12,
    emissive: 0xd97706,
    emissiveIntensity: 0.25
  });

  const circuitGlowMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });

  const glassScreenMat = new THREE.MeshPhysicalMaterial({
    color: 0x020408,
    metalness: 0.2,
    roughness: 0.05,
    transmission: 0.6,
    transparent: true,
    opacity: 0.95,
    reflectivity: 0.95
  });

  // ══════════════════════════════════════════════════════════════
  // LAYER 1: DISPLAY PANEL (Lifts up & angles back)
  // ══════════════════════════════════════════════════════════════
  const layerDisplay = new THREE.Group();
  layerDisplay.name = 'display';

  const lidGeo = new THREE.BoxGeometry(13, 0.2, 8.5);
  const lidMesh = new THREE.Mesh(lidGeo, titaniumDark);
  layerDisplay.add(lidMesh);

  const screenGeo = new THREE.PlaneGeometry(12.2, 7.7);
  const screenMesh = new THREE.Mesh(screenGeo, glassScreenMat);
  screenMesh.rotation.x = Math.PI / 2;
  screenMesh.position.y = 0.11;
  layerDisplay.add(screenMesh);

  // Screen Interface Texture
  const canvasUI = document.createElement('canvas');
  canvasUI.width = 1024;
  canvasUI.height = 640;
  const ctxUI = canvasUI.getContext('2d');
  ctxUI.fillStyle = '#040711';
  ctxUI.fillRect(0, 0, 1024, 640);
  ctxUI.strokeStyle = '#06b6d4';
  ctxUI.lineWidth = 3;
  ctxUI.strokeRect(30, 30, 964, 580);
  
  ctxUI.fillStyle = '#ffffff';
  ctxUI.font = 'bold 36px monospace';
  ctxUI.fillText('// AYUSH SWAIN — EXECUTIVE FINANCIAL SUITE', 60, 95);
  
  ctxUI.fillStyle = '#34d399';
  ctxUI.font = '22px monospace';
  ctxUI.fillText('STATUS: LEDGER RECONCILIATION COMPLETE [99.8% PRECISION]', 60, 145);
  
  ctxUI.fillStyle = '#60a5fa';
  ctxUI.fillText('GeM PORTAL: 150+ POs (₹3.4Cr+ VALUE) VALIDATED', 60, 190);
  
  ctxUI.fillStyle = '#c084fc';
  ctxUI.fillText('AGENTIC AI: 60% WORKFLOW ACCELERATION', 60, 235);

  // Glowing Mini Graphs
  ctxUI.strokeStyle = 'rgba(6, 182, 212, 0.4)';
  ctxUI.lineWidth = 1.5;
  for (let x = 60; x < 960; x += 60) {
    ctxUI.beginPath();
    ctxUI.moveTo(x, 280);
    ctxUI.lineTo(x, 560);
    ctxUI.stroke();
  }
  
  // Trend line
  ctxUI.strokeStyle = '#10b981';
  ctxUI.lineWidth = 4;
  ctxUI.beginPath();
  ctxUI.moveTo(60, 520);
  ctxUI.lineTo(240, 460);
  ctxUI.lineTo(450, 490);
  ctxUI.lineTo(650, 380);
  ctxUI.lineTo(850, 340);
  ctxUI.lineTo(950, 310);
  ctxUI.stroke();

  const textureUI = new THREE.CanvasTexture(canvasUI);
  const displayGraphicMat = new THREE.MeshBasicMaterial({ map: textureUI });
  const displayGraphicMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(11.8, 7.3),
    displayGraphicMat
  );
  displayGraphicMesh.rotation.x = -Math.PI / 2;
  displayGraphicMesh.position.y = 0.12;
  layerDisplay.add(displayGraphicMesh);

  modelMaster.add(layerDisplay);

  // ══════════════════════════════════════════════════════════════
  // LAYER 2: KEYBOARD & COMMAND DECK (Floats up & forward)
  // ══════════════════════════════════════════════════════════════
  const layerKeyboard = new THREE.Group();
  layerKeyboard.name = 'keyboard';

  const topCaseGeo = new THREE.BoxGeometry(13, 0.28, 8.8);
  const topCaseMesh = new THREE.Mesh(topCaseGeo, aluminumSpace);
  layerKeyboard.add(topCaseMesh);

  const trackpadGeo = new THREE.BoxGeometry(4.8, 0.05, 3.0);
  const trackpadMat = new THREE.MeshStandardMaterial({
    color: 0x0f0f14,
    metalness: 0.9,
    roughness: 0.2
  });
  const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
  trackpadMesh.position.set(0, 0.16, 2.4);
  layerKeyboard.add(trackpadMesh);

  // Keyboard Keys
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x08080b,
    metalness: 0.4,
    roughness: 0.6
  });
  const keyRows = 5;
  const keyCols = 14;
  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      const keyGeo = new THREE.BoxGeometry(0.65, 0.08, 0.65);
      const keyMesh = new THREE.Mesh(keyGeo, keyMat);
      keyMesh.position.set(
        (c - keyCols / 2 + 0.5) * 0.78,
        0.16,
        (r - keyRows / 2 + 0.5) * 0.78 - 1.1
      );
      layerKeyboard.add(keyMesh);
    }
  }

  modelMaster.add(layerKeyboard);

  // ══════════════════════════════════════════════════════════════
  // LAYER 3: LOGIC BOARD & NEURAL CORE (Center Floating Core)
  // ══════════════════════════════════════════════════════════════
  const layerLogicBoard = new THREE.Group();
  layerLogicBoard.name = 'logicboard';

  const pcbGeo = new THREE.BoxGeometry(12.4, 0.12, 8.0);
  const pcbMesh = new THREE.Mesh(pcbGeo, logicBoardMat);
  layerLogicBoard.add(pcbMesh);

  // Central Neural Processor
  const chipGeo = new THREE.BoxGeometry(3.0, 0.25, 3.0);
  const chipMesh = new THREE.Mesh(chipGeo, chipGoldMat);
  chipMesh.position.set(0, 0.16, 0);
  layerLogicBoard.add(chipMesh);

  // Glowing Neural Halo Ring
  const ringGeo = new THREE.RingGeometry(2.0, 2.4, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    side: THREE.DoubleSide
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.set(0, 0.2, 0);
  layerLogicBoard.add(ringMesh);

  // High-Speed Memory Banks
  for (let i = -1; i <= 1; i += 2) {
    const memGeo = new THREE.BoxGeometry(1.5, 0.18, 2.2);
    const memMesh = new THREE.Mesh(memGeo, titaniumDark);
    memMesh.position.set(i * 3.4, 0.14, -0.4);
    layerLogicBoard.add(memMesh);
  }

  // Circuit Grid Traces
  const circuitGeo = new THREE.PlaneGeometry(11.4, 7.0, 10, 6);
  const circuitMesh = new THREE.Mesh(circuitGeo, circuitGlowMat);
  circuitMesh.rotation.x = Math.PI / 2;
  circuitMesh.position.set(0, 0.1, 0);
  layerLogicBoard.add(circuitMesh);

  modelMaster.add(layerLogicBoard);

  // ══════════════════════════════════════════════════════════════
  // LAYER 4: CHASSIS, THERMALS & BATTERY (Base Subsystem)
  // ══════════════════════════════════════════════════════════════
  const layerChassis = new THREE.Group();
  layerChassis.name = 'chassis';

  const bottomCaseGeo = new THREE.BoxGeometry(13, 0.35, 8.8);
  const bottomCaseMesh = new THREE.Mesh(bottomCaseGeo, titaniumDark);
  layerChassis.add(bottomCaseMesh);

  // Battery Pack
  const batMat = new THREE.MeshStandardMaterial({
    color: 0x0c0c10,
    metalness: 0.5,
    roughness: 0.5
  });
  for (let b = 0; b < 6; b++) {
    const batGeo = new THREE.BoxGeometry(1.6, 0.18, 3.8);
    const batMesh = new THREE.Mesh(batGeo, batMat);
    batMesh.position.set((b - 2.5) * 1.9, 0.22, 1.6);
    layerChassis.add(batMesh);
  }

  // Dual Cooling Fans
  const fanGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.2, 24);
  const fanMat = new THREE.MeshStandardMaterial({
    color: 0x181820,
    metalness: 0.8,
    roughness: 0.25
  });
  const fan1 = new THREE.Mesh(fanGeo, fanMat);
  fan1.position.set(-3.8, 0.22, -1.8);
  const fan2 = new THREE.Mesh(fanGeo, fanMat);
  fan2.position.set(3.8, 0.22, -1.8);
  layerChassis.add(fan1);
  layerChassis.add(fan2);

  modelMaster.add(layerChassis);

  // ── Initial Assembly State
  modelMaster.rotation.x = 0.28;
  modelMaster.rotation.y = -0.38;

  // ── Orbit Controls (Drag to rotate freely)
  let controls = null;
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2 + 0.35;
    controls.minPolarAngle = Math.PI / 6;
  }

  // ── 3. SCROLLYTELLING ANIMATION ENGINE
  const cards = {
    display: document.getElementById('cardDisplay'),
    keyboard: document.getElementById('cardKeyboard'),
    logicboard: document.getElementById('cardLogicBoard'),
    chassis: document.getElementById('cardChassis')
  };

  const hudSteps = document.querySelectorAll('.tracker-step');

  function updateScrollyState(progress) {
    if (progress < 0.18) {
      // 1. Assembled
      layerDisplay.position.set(0, 0.35, 0);
      layerDisplay.rotation.x = 0;

      layerKeyboard.position.set(0, 0, 0);
      layerLogicBoard.position.set(0, -0.3, 0);
      layerChassis.position.set(0, -0.6, 0);

      modelMaster.rotation.x = 0.28;
      modelMaster.rotation.y = -0.38;

      Object.values(cards).forEach((c) => c && c.classList.remove('visible'));
      setStepActive(0);
    } else if (progress < 0.42) {
      // 2. Opening Screen
      const t = (progress - 0.18) / 0.24;
      layerDisplay.position.set(0, 0.35 + t * 0.8, -t * 2.0);
      layerDisplay.rotation.x = -t * (Math.PI / 2.3);

      layerKeyboard.position.set(0, 0, 0);
      layerLogicBoard.position.set(0, -0.3, 0);
      layerChassis.position.set(0, -0.6, 0);

      modelMaster.rotation.x = 0.28 + t * 0.12;
      modelMaster.rotation.y = -0.38 - t * 0.22;

      Object.values(cards).forEach((c) => c && c.classList.remove('visible'));
      setStepActive(1);
    } else if (progress < 0.82) {
      // 3. FULL EXPLOSION DECONSTRUCTION (Wider, dramatic separation)
      const t = (progress - 0.42) / 0.40;

      // Layer 1 (Screen): Moves UP and BACK
      layerDisplay.position.set(0, 1.15 + t * 5.8, -2.0 - t * 4.2);
      layerDisplay.rotation.x = -(Math.PI / 2.3) + t * 0.25;

      // Layer 2 (Keyboard): Moves UP and FORWARD
      layerKeyboard.position.set(0, t * 2.8, t * 3.5);

      // Layer 3 (Logic Board / Neural Core): Center core
      layerLogicBoard.position.set(0, -0.3 - t * 0.4, 0);

      // Layer 4 (Chassis & Thermals): Moves DOWN and BACK
      layerChassis.position.set(0, -0.6 - t * 5.2, -t * 1.5);

      modelMaster.rotation.x = 0.40 - t * 0.08;
      modelMaster.rotation.y = -0.60 + t * 0.25;

      if (cards.display) cards.display.classList.add('visible');
      if (cards.keyboard) cards.keyboard.classList.add('visible');
      if (cards.logicboard) cards.logicboard.classList.add('visible');
      if (cards.chassis) cards.chassis.classList.add('visible');
      setStepActive(2);
    } else {
      // 4. Inspection mode
      setStepActive(3);
    }
  }

  function setStepActive(index) {
    hudSteps.forEach((step, i) => {
      if (i === index) step.classList.add('active');
      else step.classList.remove('active');
    });
  }

  // Scroll listener for 3D Deconstruction
  window.addEventListener('scroll', () => {
    const explodedSection = document.getElementById('exploded-view');
    if (!explodedSection) return;

    const rect = explodedSection.getBoundingClientRect();
    const totalHeight = explodedSection.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalHeight));

    updateScrollyState(progress);
  });

  // ── Card Hover Layer Highlight Feedback
  Object.entries(cards).forEach(([key, cardEl]) => {
    if (!cardEl) return;
    cardEl.addEventListener('mouseenter', () => {
      if (key === 'logicboard' && chipMesh) {
        chipMesh.material.emissiveIntensity = 0.8;
      } else if (key === 'display' && displayGraphicMesh) {
        cyanRim.intensity = 6;
      }
    });
    cardEl.addEventListener('mouseleave', () => {
      if (chipMesh) chipMesh.material.emissiveIntensity = 0.25;
      cyanRim.intensity = 4;
    });
  });

  // ── HUD Buttons Controls
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
      camera.position.set(0, 3, 26);
      if (controls) controls.target.set(0, 0, 0);
      modelMaster.rotation.set(0.28, -0.38, 0);
    });
  }

  // ── Render Loop with subtle idle hover floating & particles drift
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Subtle gentle float
    modelMaster.position.y = Math.sin(elapsedTime * 1.4) * 0.12;

    // Pulse neural ring
    if (ringMesh) {
      ringMesh.rotation.z += 0.015;
    }

    // Slow particle drift
    if (particleMesh) {
      particleMesh.rotation.y = elapsedTime * 0.02;
    }

    if (controls) controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // ── Window Resize Handler
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  /* ── 4. STAT COUNT-UP ON SCROLL (Metrics Section) ────────────────────────── */
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

  /* ── 5. REPLAY INTERACTIVE BUTTON ────────────────────────────────────────── */
  const replayBtn = document.getElementById('replayButton');
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
