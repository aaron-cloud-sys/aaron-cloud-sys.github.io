import React, { useState } from 'react';
import { EXHIBITION_WORKS } from '../data/portfolioData';
import { ArrowUpRight, X, Cpu, ShieldCheck, Activity, Layers } from 'lucide-react';

export default function ExhibitionRail() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="exhibition" className="border-b border-zinc-900 bg-black py-28 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-zinc-900 pb-6">
          <div>
            <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">
              // 02 FLAGSHIP PRODUCTION ARCHITECTURES
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-display">
              Engineered Deployments
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 mt-2 sm:mt-0">
            PRODUCTION VERIFIED WORKFLOWS
          </p>
        </div>

        {/* Exhibition Stack */}
        <div className="space-y-12">
          {EXHIBITION_WORKS.map((project) => (
            <div
              key={project.id}
              className="group border border-zinc-800 bg-zinc-950 p-6 sm:p-10 transition-all duration-300 hover:border-zinc-500 hover:bg-black"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                
                {/* Left Info */}
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 mb-3">
                    <span className="border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-white font-bold">
                      {project.code}
                    </span>
                    <span>//</span>
                    <span className="text-zinc-400">{project.domain}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight mb-3 font-mono group-hover:text-zinc-100">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6 font-sans">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-8 font-sans">
                    {project.description}
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-800 bg-black px-2.5 py-1 font-mono text-xs text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Hero Stat & Action */}
                <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-10 min-w-[240px]">
                  <div className="mb-6">
                    <div className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                      {project.heroStat}
                    </div>
                    <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">
                      {project.heroMetric}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-2 border border-white bg-white px-5 py-3 font-mono text-xs font-bold text-black uppercase transition hover:bg-zinc-200"
                  >
                    <span>VIEW ARCHITECTURE</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Spec Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl border border-zinc-700 bg-zinc-950 p-6 sm:p-10 text-left my-8 shadow-2xl">
            
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-2 border border-zinc-800 bg-black text-zinc-400 hover:text-white hover:border-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-zinc-800 pb-6 mb-8 pr-8">
              <div className="font-mono text-xs text-zinc-500 mb-2">
                {activeProject.code} // DEEP ARCHITECTURAL AUDIT
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-mono">
                {activeProject.title}
              </h3>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-zinc-800 bg-black p-5">
                <div className="font-mono text-xs font-bold text-zinc-400 uppercase mb-2 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-zinc-400" />
                  <span>THE CHALLENGE</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {activeProject.challenge}
                </p>
              </div>

              <div className="border border-zinc-800 bg-black p-5">
                <div className="font-mono text-xs font-bold text-zinc-400 uppercase mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                  <span>THE SOLUTION</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {activeProject.solution}
                </p>
              </div>
            </div>

            {/* Quantitative Impact */}
            <div className="border border-zinc-800 bg-black p-5 mb-8">
              <div className="font-mono text-xs font-bold text-white uppercase mb-2">
                QUANTITATIVE PRODUCTION IMPACT
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {activeProject.impact}
              </p>
            </div>

            {/* Telemetry Output Box */}
            <div className="border border-zinc-800 bg-zinc-900 p-4 font-mono text-[11px] text-zinc-300 mb-8">
              <div className="text-zinc-500 text-[10px] mb-2 border-b border-zinc-800 pb-1">
                EXECUTION TELEMETRY TRACE
              </div>
              <pre className="overflow-x-auto leading-relaxed">
                {JSON.stringify(activeProject.telemetrySnippet, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="border border-white bg-white px-6 py-2.5 font-mono text-xs font-bold text-black uppercase transition hover:bg-zinc-200"
              >
                DISMISS SPEC
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
