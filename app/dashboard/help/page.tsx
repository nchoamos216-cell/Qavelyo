'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  actionUrl?: string;
  actionText?: string;
}

const FAQS: FAQItem[] = [
  {
    category: "PROFIL & LIEN",
    question: "Comment fonctionne mon URL publique et le slug ?",
    answer: "Votre URL publique est basée sur votre pseudo unique (slug) configuré dans votre profil (ex: qavelyo.com/votre-nom). Si vous modifiez votre pseudo, l'ancienne adresse ne fonctionnera plus, pensez donc à la mettre à jour sur vos réseaux sociaux.",
    actionUrl: "/dashboard/profile",
    actionText: "Modifier mon profil"
  },
  {
    category: "LIENS & CLICS",
    question: "Comment ajouter ou réorganiser mes liens ?",
    answer: "Rendez-vous dans l'onglet 'Liens' pour ajouter de nouvelles destinations (portfolio, réseaux sociaux, boutiques). Le système ajoute automatiquement 'https://' si vous l'oubliez et comptabilise les clics en temps réel.",
    actionUrl: "/dashboard/links",
    actionText: "Gérer mes liens"
  },
  {
    category: "STATISTIQUES",
    question: "Comment sont calculées les vues et le taux de clic (CTR) ?",
    answer: "Les 'Vues du profil' comptabilisent chaque visite unique de votre page publique. Les 'Clics totaux' représentent la somme des interactions sur l'ensemble de vos liens. Le CTR indique le pourcentage de visiteurs ayant cliqué sur au moins un lien.",
    actionUrl: "/dashboard/analytics",
    actionText: "Voir mes statistiques"
  },
  {
    category: "DIFFUSION",
    question: "Comment partager efficacement mon QAVELYO Link ?",
    answer: "Utilisez l'onglet 'Partager' pour copier votre lien en un clic, le diffuser via le menu de partage natif de votre appareil, ou télécharger votre QR code haute résolution pour vos cartes de visite et flyers.",
    actionUrl: "/dashboard/share",
    actionText: "Partager ma page"
  }
];

export default function DashboardHelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-12">
      {/* En-tête */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20">
          SUPPORT & ASSISTANCE
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-3">Centre d'aide</h1>
        <p className="text-slate-400 text-sm mt-1">Retrouvez les réponses aux questions fréquentes pour maîtriser votre tableau de bord.</p>
      </div>

      {/* Liste des FAQ */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div key={index} className="rounded-3xl bg-[#030509]/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-xl transition-all">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left text-white font-bold text-sm hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-1 pr-4">
                <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-wider block">{faq.category}</span>
                <span>{faq.question}</span>
              </div>
              <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] font-bold text-lg shrink-0">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-6 text-slate-300 text-xs sm:text-sm border-t border-white/5 pt-4 leading-relaxed space-y-4">
                <p>{faq.answer}</p>
                {faq.actionUrl && faq.actionText && (
                  <div>
                    <Link
                      href={faq.actionUrl}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold transition-all"
                    >
                      <span>⚡</span> {faq.actionText}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bloc de Contact / Support direct */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FF6B00]/10 via-[#030509]/80 to-transparent border border-[#FF6B00]/20 space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center text-lg font-bold border border-[#FF6B00]/30">
            💬
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Besoin d'aide supplémentaire ?</h3>
            <p className="text-xs text-slate-400">Notre équipe technique est à votre écoute pour toute anomalie.</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Si vous rencontrez un problème persistant avec vos liens, vos statistiques ou votre authentification Supabase, n'hésitez pas à nous contacter directement.
        </p>
        <div>
          <a
            href="mailto:support@qavelyo.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#ff7b1a] text-white font-semibold text-xs transition-all shadow-xl shadow-[#FF6B00]/20"
          >
            <span>✉️</span> Contacter le support technique
          </a>
        </div>
      </div>
    </div>
  );
}