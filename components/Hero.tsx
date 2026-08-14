"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#05080E]"
    >
      {/* Halo lumineux orange diffus */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#FF6B00]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Texte & Boutons */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FF6B00]/30">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
                HUB TECHNOLOGIQUE • PRODUCTS & SERVICES
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Imaginons. Développons.{" "}
              <span className="text-[#FF6B00]">
                Transformons.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              QAVELYO transforme des besoins réels en solutions numériques modernes. Découvrez nos applications prêtes à l'emploi ou confiez-nous le développement de votre projet sur-mesure.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#produits"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-semibold text-sm transition-all shadow-lg shadow-[#FF6B00]/20"
              >
                Explorer nos produits
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all"
              >
                Commander un service
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B00] font-bold">✓</span>
                <span>Applications & SaaS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B00] font-bold">✓</span>
                <span>Développement Sur-Mesure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B00] font-bold">✓</span>
                <span>Basé à Abidjan</span>
              </div>
            </div>
          </div>

          {/* Carte Visuelle de l'Écosystème */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Image
                  src="/Qavelyo.png"
                  alt="QAVELYO Logo"
                  width={36}
                  height={36}
                  className="rounded-full border border-[#FF6B00]/40"
                />
                <div>
                  <div className="text-sm font-bold text-white tracking-wide">QAVELYO HUB</div>
                  <div className="text-[11px] text-[#FF6B00] font-mono">ECOSYSTEM: ACTIVE</div>
                </div>
              </div>

              <div className="bg-[#020408] rounded-xl p-4 font-mono text-xs text-gray-300 space-y-2 border border-white/5">
                <div className="text-gray-500">// QAVELYO Vision & Architecture</div>
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">ecosystem</span> = {"{"}
                </div>
                <div className="pl-4">
                  products: [<span className="text-amber-300">&quot;Bibliothèque Digitale&quot;</span>, <span className="text-amber-300">&quot;SaaS Engine&quot;</span>],
                </div>
                <div className="pl-4">
                  services: [<span className="text-amber-300">&quot;Web&quot;</span>, <span className="text-amber-300">&quot;Apps&quot;</span>, <span className="text-amber-300">&quot;E-Commerce&quot;</span>],
                </div>
                <div className="pl-4">
                  mission: <span className="text-emerald-400">&quot;Créer un impact réel&quot;</span>
                </div>
                <div>{"}"};</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}