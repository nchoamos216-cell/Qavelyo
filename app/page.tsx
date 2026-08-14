import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05080E] text-white selection:bg-[#FF6B00]/20 selection:text-white">
      {/* Barre de Navigation */}
      <Navbar />

      {/* Hero Section - Présentation du Hub & Écosystème */}
      <Hero />

      {/* ==========================================
          SECTION 1 : QAVELYO PRODUCTS (Le Hub / Store d'Apps)
         ========================================== */}
      <section id="produits" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold uppercase tracking-wider">
            QAVELYO PRODUCTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Nos Produits & Solutions
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Des outils, plateformes et solutions numériques développés progressivement par QAVELYO pour répondre à des besoins réels.
          </p>
        </div>

        {/* Grille des Applications Disponibles / En catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Produit 1 : QAVELYO CV */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">📄</span>
                <span className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Disponible
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B00] transition-colors mb-2">
                QAVELYO CV
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Créez facilement un CV professionnel, moderne et prêt à être téléchargé en PDF.
              </p>
            </div>
            <div>
              <Link
                href="/cv"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-sm font-semibold transition-all border border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20"
              >
                Créer mon CV
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Produit 2 : Prochainement (Carte Bientôt sans lien actif) */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">⚡</span>
                <span className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  En développement
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B00] transition-colors mb-2">
                Prochainement
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                De nouvelles solutions numériques sont actuellement imaginées et développées pour répondre à des besoins réels.
              </p>
            </div>
            <div>
              <button
                disabled
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-slate-400 text-sm font-semibold border border-white/10 cursor-not-allowed opacity-75"
              >
                Découvrir bientôt
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 2 : QAVELYO SERVICES (Sur-Mesure)
         ========================================== */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            QAVELYO SERVICES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Vous avez une idée ou un besoin ?
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Nous transformons vos idées et vos besoins en solutions numériques modernes, utiles et adaptées à votre activité.
          </p>
        </div>

        {/* Grille des Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4 text-xl">🌐</div>
            <h3 className="text-xl font-bold text-white mb-2">Sites & Plateformes Web</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sites vitrines haut de gamme, catalogues interactifs et plateformes e-commerce avec intégration de paiements locaux et internationaux.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4 text-xl">💻</div>
            <h3 className="text-xl font-bold text-white mb-2">Applications Web & SaaS</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Développement d'applications sur-mesure, logiques métiers complexes et logiciels SaaS scalables.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4 text-xl">⚙️</div>
            <h3 className="text-xl font-bold text-white mb-2">Systèmes de Gestion & Réservation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automatisations, outils de réservation d'activités, CRM et portails de gestion de processus internes.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 3 : NOTRE VISION & DÉMARCHE
         ========================================== */}
      <section id="vision" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest">NOTRE METHODOLOGIE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Identifier. Développer. <br />
              <span className="text-[#FF6B00]">Transformer.</span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              QAVELYO observe les besoins du quotidien, recherche des idées, conçoit des solutions et les transforme en outils numériques utiles.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Notre ambition est de créer des solutions accessibles et utiles aux utilisateurs, en Afrique comme partout dans le monde.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold text-[#FF6B00] mb-1">01</div>
              <div className="text-white font-semibold text-sm mb-1">Identifier</div>
              <div className="text-slate-400 text-xs">Comprendre les problèmes et les besoins réels.</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold text-[#FF6B00] mb-1">02</div>
              <div className="text-white font-semibold text-sm mb-1">Concevoir</div>
              <div className="text-slate-400 text-xs">Imaginer une solution simple, moderne et utile.</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="text-2xl font-bold text-[#FF6B00] mb-1">03</div>
              <div className="text-white font-semibold text-sm mb-1">Développer</div>
              <div className="text-slate-400 text-xs">Transformer l'idée en véritable produit numérique.</div>
            </div>
            <div className="glass-panel p-[#6] rounded-2xl border border-white/10 p-6">
              <div className="text-2xl font-bold text-[#FF6B00] mb-1">04</div>
              <div className="text-white font-semibold text-sm mb-1">Partager & Faire évoluer</div>
              <div className="text-slate-400 text-xs">Publier, recueillir les retours et améliorer continuellement la solution.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4 : CONTACT & COMMANDE DE SERVICE
         ========================================== */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Une idée ? Un besoin ?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Vous avez une idée, un besoin ou un problème qui pourrait être résolu par le numérique ? Parlons-en et imaginons ensemble une solution.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:qavelyo@gmail.com"
              className="px-8 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-semibold text-base shadow-lg shadow-[#FF6B00]/25 transition-all"
            >
              Parler de mon projet
            </a>
          </div>
          <p className="text-xs text-slate-500 pt-2">
            Contact direct : <span className="text-slate-300">qavelyo@gmail.com</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-slate-500 space-y-2">
        <div className="font-semibold text-slate-400 tracking-wider">
          QAVELYO • <span className="text-[#FF6B00]">Imaginons. Développons. Transformons.</span>
        </div>
        <div>
          © {new Date().getFullYear()} QAVELYO. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}