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
  if (container) {
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

    // ── 3D Lighting
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

    // ── Dust Particles
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

    const titaniumDark = new THREE.MeshStandardMaterial({ color: 0x121216, metalness: 0.9, roughness: 0.22 });
    const aluminumSpace = new THREE.MeshStandardMaterial({ color: 0x1a1a22, metalness: 0.85, roughness: 0.3 });
    const logicBoardMat = new THREE.MeshStandardMaterial({ color: 0x07111a, metalness: 0.7, roughness: 0.4 });
    const chipGoldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.98, roughness: 0.12, emissive: 0xd97706, emissiveIntensity: 0.25 });
    const circuitGlowMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.6 });
    const glassScreenMat = new THREE.MeshPhysicalMaterial({ color: 0x020408, metalness: 0.2, roughness: 0.05, transmission: 0.6, transparent: true, opacity: 0.95, reflectivity: 0.95 });

    // Layer 1: Display
    const layerDisplay = new THREE.Group();
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(13, 0.2, 8.5), titaniumDark);
    layerDisplay.add(lidMesh);
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(12.2, 7.7), glassScreenMat);
    screenMesh.rotation.x = Math.PI / 2;
    screenMesh.position.y = 0.11;
    layerDisplay.add(screenMesh);

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
    ctxUI.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctxUI.lineWidth = 1.5;
    for (let x = 60; x < 960; x += 60) {
      ctxUI.beginPath();
      ctxUI.moveTo(x, 280);
      ctxUI.lineTo(x, 560);
      ctxUI.stroke();
    }
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

    const displayGraphicMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvasUI) });
    const displayGraphicMesh = new THREE.Mesh(new THREE.PlaneGeometry(11.8, 7.3), displayGraphicMat);
    displayGraphicMesh.rotation.x = -Math.PI / 2;
    displayGraphicMesh.position.y = 0.12;
    layerDisplay.add(displayGraphicMesh);
    modelMaster.add(layerDisplay);

    // Layer 2: Keyboard
    const layerKeyboard = new THREE.Group();
    layerKeyboard.add(new THREE.Mesh(new THREE.BoxGeometry(13, 0.28, 8.8), aluminumSpace));
    const trackpadMesh = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.05, 3.0), new THREE.MeshStandardMaterial({ color: 0x0f0f14, metalness: 0.9, roughness: 0.2 }));
    trackpadMesh.position.set(0, 0.16, 2.4);
    layerKeyboard.add(trackpadMesh);

    const keyMat = new THREE.MeshStandardMaterial({ color: 0x08080b, metalness: 0.4, roughness: 0.6 });
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.65), keyMat);
        keyMesh.position.set((c - 14 / 2 + 0.5) * 0.78, 0.16, (r - 5 / 2 + 0.5) * 0.78 - 1.1);
        layerKeyboard.add(keyMesh);
      }
    }
    modelMaster.add(layerKeyboard);

    // Layer 3: Logic Board
    const layerLogicBoard = new THREE.Group();
    layerLogicBoard.add(new THREE.Mesh(new THREE.BoxGeometry(12.4, 0.12, 8.0), logicBoardMat));
    const chipMesh = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.25, 3.0), chipGoldMat);
    chipMesh.position.set(0, 0.16, 0);
    layerLogicBoard.add(chipMesh);

    const ringMesh = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.4, 32), new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide }));
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.2, 0);
    layerLogicBoard.add(ringMesh);

    for (let i = -1; i <= 1; i += 2) {
      const memMesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.18, 2.2), titaniumDark);
      memMesh.position.set(i * 3.4, 0.14, -0.4);
      layerLogicBoard.add(memMesh);
    }
    const circuitMesh = new THREE.Mesh(new THREE.PlaneGeometry(11.4, 7.0, 10, 6), circuitGlowMat);
    circuitMesh.rotation.x = Math.PI / 2;
    circuitMesh.position.set(0, 0.1, 0);
    layerLogicBoard.add(circuitMesh);
    modelMaster.add(layerLogicBoard);

    // Layer 4: Chassis
    const layerChassis = new THREE.Group();
    layerChassis.add(new THREE.Mesh(new THREE.BoxGeometry(13, 0.35, 8.8), titaniumDark));
    const batMat = new THREE.MeshStandardMaterial({ color: 0x0c0c10, metalness: 0.5, roughness: 0.5 });
    for (let b = 0; b < 6; b++) {
      const batMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 3.8), batMat);
      batMesh.position.set((b - 2.5) * 1.9, 0.22, 1.6);
      layerChassis.add(batMesh);
    }
    const fanMat = new THREE.MeshStandardMaterial({ color: 0x181820, metalness: 0.8, roughness: 0.25 });
    const fan1 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.2, 24), fanMat);
    fan1.position.set(-3.8, 0.22, -1.8);
    const fan2 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.2, 24), fanMat);
    fan2.position.set(3.8, 0.22, -1.8);
    layerChassis.add(fan1);
    layerChassis.add(fan2);
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

    function updateScrollyState(progress) {
      if (progress < 0.18) {
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
        const t = (progress - 0.42) / 0.40;
        layerDisplay.position.set(0, 1.15 + t * 5.8, -2.0 - t * 4.2);
        layerDisplay.rotation.x = -(Math.PI / 2.3) + t * 0.25;
        layerKeyboard.position.set(0, t * 2.8, t * 3.5);
        layerLogicBoard.position.set(0, -0.3 - t * 0.4, 0);
        layerChassis.position.set(0, -0.6 - t * 5.2, -t * 1.5);
        modelMaster.rotation.x = 0.40 - t * 0.08;
        modelMaster.rotation.y = -0.60 + t * 0.25;
        if (cards.display) cards.display.classList.add('visible');
        if (cards.keyboard) cards.keyboard.classList.add('visible');
        if (cards.logicboard) cards.logicboard.classList.add('visible');
        if (cards.chassis) cards.chassis.classList.add('visible');
        setStepActive(2);
      } else {
        setStepActive(3);
      }
    }

    function setStepActive(index) {
      hudSteps.forEach((step, i) => {
        if (i === index) step.classList.add('active');
        else step.classList.remove('active');
      });
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
        camera.position.set(0, 3, 26);
        if (controls) controls.target.set(0, 0, 0);
        modelMaster.rotation.set(0.28, -0.38, 0);
      });
    }

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      modelMaster.position.y = Math.sin(elapsedTime * 1.4) * 0.12;
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

  /* ── 4. 3D SCROLL FLIP-TO-LEFT FOR THE 4 CAPABILITY POINTERS ────────────── */
  const matrixCards = document.querySelectorAll('.matrix-card-3d');
  const matrixContainer = document.getElementById('capabilityMatrix');

  if (matrixContainer && matrixCards.length > 0) {
    const cardFlipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger 1-by-1 flip to left
            matrixCards.forEach((card, idx) => {
              setTimeout(() => {
                card.classList.add('flipped-in');
              }, idx * 160); // 160ms sequential stagger
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    cardFlipObserver.observe(matrixContainer);
  }

  // Interactive 3D Parallax Tilt on Hover (when flipped in)
  matrixCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (!card.classList.contains('flipped-in')) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('flipped-in')) {
        card.style.transform = 'perspective(1000px) rotateY(0deg) translateX(0) scale(1)';
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

  /* ── 8. REPLAY INTERACTIVE BUTTON ────────────────────────────────────────── */
  const replayBtn = document.getElementById('replayButton');
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
