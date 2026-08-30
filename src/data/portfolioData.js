export const BRAND_IDENTITY = {
  name: 'AYUSH SWAIN',
  tagline: 'AUTONOMOUS SYSTEMS ARCHITECT',
  role: 'AI Automation & Enterprise Operations Specialist',
  location: 'Bhubaneswar, India // Global Remote',
  email: 'ayushwain161@gmail.com',
  phone: '+91 8249509568',
  linkedin: 'https://linkedin.com/in/ayush-swain',
  github: 'https://github.com/ayushwain161',
  resumeUrl: '/Ayush_Swain_Resume.pdf',
  status: 'ONLINE // ACCEPTING HIGH-IMPACT ARCHITECTURAL ROLES',
  coordinates: '20.2961° N, 85.8245° E',
  version: 'SYSTEM v4.0.0 (NOIR EDITION)',
  coreThesis: 'In enterprise scale operations, manual latency is structural failure. We architect autonomous multi-agent pipelines, deterministic document ingestion, and audited compliance protocols that execute with 100% precision.',
};

export const TELEMETRY_NODES = [
  {
    id: 'node-01',
    name: 'AGENTIC_INGESTION_ORCHESTRATOR',
    status: 'ACTIVE',
    latency: '14ms',
    throughput: '150+ POs / Batch',
    description: 'Autonomous multi-modal document parser transforming unstructured invoices and POs into strict validated JSON schemas.',
    metrics: { efficiency: '+60%', errorRate: '0.00%', integrity: 'SHA-256 Validated' }
  },
  {
    id: 'node-02',
    name: 'GEM_COMPLIANCE_AUTOPILOT',
    status: 'OPTIMAL',
    latency: '28ms',
    throughput: '80+ Statutory Filings',
    description: 'Non-destructive CDP browser automation fulfilling Government e-Marketplace contracts with zero audit rejections.',
    metrics: { approvalRate: '100%', rejections: '0', dispatchTimeliness: '98%' }
  },
  {
    id: 'node-03',
    name: 'INSTITUTIONAL_LEDGER_RECONCILER',
    status: 'ACTIVE',
    latency: '8ms',
    throughput: '₹95L+ Audited / Run',
    description: 'Dual-entry automated matrix cross-checking bank transaction feeds against ERP ledgers and commercial purchase orders.',
    metrics: { precision: '99.8%', accounts: '200+', cycleSpeed: 'Seconds' }
  },
  {
    id: 'node-04',
    name: 'COMMERCIAL_FLEET_DISPATCH_CORE',
    status: 'ONLINE',
    latency: '32ms',
    throughput: '50+ Commercial Dispatches',
    description: 'Dynamic dispatch scheduling engine coordinating OEM build specs, logistics waybills, and client delivery handoffs.',
    metrics: { grossVolume: '₹1.5Cr+', satisfaction: '95%+', resolution: '<24h' }
  }
];

export const EXHIBITION_WORKS = [
  {
    id: 'project-alpha',
    index: '01',
    code: 'DOC_AI // ARCH_01',
    title: 'Autonomous Multimodal Document Extraction Pipeline',
    subtitle: 'Zero-hallucination document intelligence engine for commercial invoices and purchase orders.',
    heroStat: '60% FASTER',
    heroMetric: 'Extraction Turnaround',
    domain: 'Agentic AI & Document Parsing',
    description: 'Engineered an end-to-end Python pipeline using structured LLM outputs, pre-flight OCR sanitization, and deterministic regex validators to ingest multi-page supplier documents directly into cloud enterprise sheets.',
    challenge: 'Manual ingestion of 150+ high-value purchase orders caused severe turnaround delays, data transposition mistakes, and delayed payment reconciliations.',
    solution: 'Designed multi-tier extraction with strict Pydantic JSON schema constraints, automated file lock resolution, and background sync to enterprise databases.',
    impact: 'Reduced invoice processing time by 60%, eliminated manual data entry errors across ₹1.5Cr+ in commercial contracts, and accelerated department billing by 25%.',
    stack: ['Python 3.12', 'LangChain', 'OpenAI Structured Outputs', 'FastAPI', 'SharePoint REST API', 'Pandas'],
    telemetrySnippet: {
      pipeline: 'doc_ingest_v3',
      input: 'PO_7828_COMMERCIAL_INVOICE.pdf',
      ocrDpi: 300,
      extractedKeys: 18,
      validationHash: '0x7f9a...3c21',
      status: 'VERIFIED_100%'
    }
  },
  {
    id: 'project-beta',
    index: '02',
    code: 'OPS_AUTO // ARCH_02',
    title: 'Government e-Marketplace Fulfillment Autopilot',
    subtitle: 'Non-destructive browser automation for regulatory compliance and ePBG bank guarantee fulfillment.',
    heroStat: '0 ERRORS',
    heroMetric: '80+ Government Contracts',
    domain: 'Enterprise Operations & Web Automation',
    description: 'Developed an automated compliance execution engine for GeM portal orders, extracting ground-truth metadata from physical Bank Guarantee PDFs, verifying OEM specifications, and automating portal submission modals via Chrome DevTools Protocol.',
    challenge: 'Government procurement contracts carry strict fulfillment windows and zero-tolerance documentation rules where a single metadata mismatch causes contract suspension.',
    solution: 'Engineered a dry-run verification pipeline with native React DOM event dispatchers, contiguous alphanumeric sanitization, and automated ePBG upload confirmation.',
    impact: 'Orchestrated 50+ commercial vehicle dispatches with 98% on-time rate and processed 80+ regulatory submissions with 0 compliance rejections.',
    stack: ['Chrome DevTools Protocol (CDP)', 'Playwright', 'Node.js', 'PyMuPDF', 'React DOM Synthesis'],
    telemetrySnippet: {
      portal: 'gem_procurement_v4',
      bgRef: '73780ILG0001224',
      issuingBank: 'Punjab National Bank',
      verification: 'PASSED',
      errorCount: 0
    }
  },
  {
    id: 'project-gamma',
    index: '03',
    code: 'FIN_AUDIT // ARCH_03',
    title: 'High-Throughput Multi-Ledger Reconciliation Matrix',
    subtitle: 'Automated quantitative accounting engine detecting financial discrepancies across institutional accounts.',
    heroStat: '₹95L+ RECONCILED',
    heroMetric: '99.8% Mathematical Precision',
    domain: 'Quantitative Finance & Ledger Audit',
    description: 'Built a deterministic financial audit engine that cross-references commercial PO lines against real-time bank statement feeds and statutory GST breakdowns, isolating unmatched ledger line items instantly.',
    challenge: 'Reconciling ₹95L+ across 200+ vendor and institutional accounts created massive month-end accounting backlogs and unspotted variance anomalies.',
    solution: 'Implemented algorithmic line-matching heuristics with fuzzy token matching, automated variance threshold alerting, and instant audit trail logging.',
    impact: 'Achieved 99.8% ledger accuracy across 200+ institutional accounts and slashed month-end closing cycles from multiple days to under 30 seconds.',
    stack: ['Python', 'NumPy', 'Pandas', 'PostgreSQL', 'Automated Audit Engine', 'Excel OpenPyXL'],
    telemetrySnippet: {
      ledgerVolume: 'INR 9,540,200',
      accountsParsed: 214,
      discrepancyFlagged: 0,
      precisionIndex: 0.9984
    }
  }
];

export const QUANT_BENCHMARKS = [
  { id: 'm1', value: '60%', metric: 'Turnaround Reduction', context: 'Document Ingestion Cycles' },
  { id: 'm2', value: '₹1.5Cr+', metric: 'Commercial Scale', context: '150+ POs & 50+ Dispatches' },
  { id: 'm3', value: '99.8%', metric: 'Reconciliation Precision', context: '₹95L+ Multi-Ledger Audits' },
  { id: 'm4', value: '0 Error', metric: 'Regulatory Compliance', context: '80+ GeM Portal Filings' },
  { id: 'm5', value: '98%', metric: 'On-Time Logistics', context: 'Commercial Vehicle Dispatches' },
  { id: 'm6', value: '< 15ms', metric: 'Pipeline Latency', context: 'Deterministic Agent Tooling' }
];

export const CAPABILITY_VAULT = [
  {
    category: 'AGENTIC AI & ORCHESTRATION',
    tech: ['Autonomous Agent Workflows', 'LangChain / AutoGen', 'Structured LLM Extraction', 'CDP Browser Automation', 'Prompt Engineering', 'Vector Embeddings']
  },
  {
    category: 'DATA PIPELINES & BACKEND',
    tech: ['Python 3.12 / FastAPI', 'Pandas / NumPy', 'PostgreSQL / SQLite', 'SharePoint REST API', 'PyMuPDF / OCR Pipelines', 'ETL Data Normalization']
  },
  {
    category: 'KINETIC UX & FRONTEND',
    tech: ['React 19 / Vite', 'Tailwind CSS v4', 'GSAP 3 / ScrollTrigger', 'Lenis Smooth Scroll', 'Framer Motion', 'Performance Optimization']
  },
  {
    category: 'ENTERPRISE OPERATIONS & AUDIT',
    tech: ['GeM Portal Fulfillment', 'Bank Guarantee Verification', 'Fleet Logistics Coordination', 'Multi-Ledger Financial Audit', 'Deterministic Validation', 'SLA Enforcement']
  }
];

export const CLI_COMMANDS = {
  help: 'Available commands: about, skills, projects, metrics, contact, resume, clear',
  about: 'Ayush Swain: Autonomous Systems Architect & Operations Specialist. Focused on zero-error enterprise automation.',
  skills: 'Core Stack: Python, Agentic AI, CDP Automation, React 19, GSAP, Lenis, Financial Reconciliation, GeM Compliance.',
  projects: '1. Autonomous Multimodal Document Extractor | 2. GeM Compliance Autopilot | 3. Multi-Ledger Reconciliation Matrix',
  metrics: 'Cycle Reduction: 60% | Pipeline Volume: INR 1.5Cr+ | Accuracy: 99.8% | Compliance Errors: 0',
  contact: `Email: ${BRAND_IDENTITY.email} | Phone: ${BRAND_IDENTITY.phone} | Location: ${BRAND_IDENTITY.location}`,
  resume: `Download resume at: ${BRAND_IDENTITY.resumeUrl}`
};
