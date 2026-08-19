'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#05080E] text-white">
      {/* Navigation et Hero */}
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
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

          {/* Produit 2 : QAVELYO LINK MANAGER */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🔗</span>
                <span className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Disponible
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B00] transition-colors mb-2">
                QAVELYO Link
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Centralisez tous vos liens importants sur une seule page élégante, personnalisable et partageable en un flash avec un QR code.
              </p>
            </div>
            <div>
              <Link
                href="/qavelyo-link"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-sm font-semibold transition-all border border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20"
              >
                Découvrir Qavelyo Link
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Produit 3 : QAVELYO SHARE */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">⚡</span>
                <span className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Disponible
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B00] transition-colors mb-2">
                QAVELYO Share
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Transférez des fichiers, photos, liens et textes instantanément entre deux appareils sans inscription ni câble.
              </p>
            </div>
            <div>
              <Link
                href="/share"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-sm font-semibold transition-all border border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20"
              >
                Essayer Qavelyo Share
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Produit 4 : Prochainement */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">🚀</span>
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
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              Commander un service 🚀
            </button>
          </div>
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
            <div className="glass-panel rounded-2xl border border-white/10 p-6">
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
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne de gauche : Infos & Direct */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold uppercase tracking-wider">
              CONTACT & COLLABORATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Une idée ? Un besoin ? <br />
              <span className="text-[#FF6B00]">Parlons-en.</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Vous avez un projet de site web, d'application SaaS ou un besoin spécifique pour votre activité ? Notre équipe est à votre écoute pour concevoir la solution idéale.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 glass-panel p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] text-xl">📧</div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Écrivez-nous</div>
                  <div className="text-white font-semibold text-sm">qavelyo@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 glass-panel p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">⚡</div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Disponibilité</div>
                  <div className="text-white font-semibold text-sm">Réponse rapide sous 24h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Carte d'action d'appel au formulaire */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 text-center space-y-6 relative overflow-hidden group hover:border-[#FF6B00]/50 transition-all">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FF6B00]/10 rounded-full blur-3xl group-hover:bg-[#FF6B00]/20 transition-all" />
              
              <div className="text-4xl">🚀</div>
              <h3 className="text-2xl font-bold text-white">Lancer votre projet avec QAVELYO</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
                Cliquez ci-dessous pour ouvrir notre assistant de commande interactif. Choisissez votre service, votre budget et envoyez-nous votre brief en un clic.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-semibold text-base shadow-lg shadow-[#FF6B00]/25 transition-all cursor-pointer"
                >
                  Ouvrir le formulaire de projet
                </button>
              </div>
            </div>
          </div>

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

      {/* Modal interactif de commande de projet */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}