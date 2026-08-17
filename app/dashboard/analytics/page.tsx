'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Récupération des données depuis la table profiles
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('views, links')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Erreur chargement analytiques :', error);
        }

        if (profile) {
          // 1. Définition des vues (par défaut à 0 si la colonne n'existe pas encore)
          setViews(profile.views || 0);

          // 2. Calcul du nombre de liens actifs
          if (profile.links) {
            try {
              const parsedLinks = typeof profile.links === 'string' ? JSON.parse(profile.links) : profile.links;
              if (Array.isArray(parsedLinks)) {
                // Compte uniquement les liens activés (où enabled n'est pas explicitement false)
                const activeCount = parsedLinks.filter((l: any) => l.enabled !== false).length;
                setTotalLinks(activeCount);
              }
            } catch (e) {
              console.error('Erreur parsing links :', e);
            }
          }
        }
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 text-white">
      {/* En-tête de la page */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/25">
          Performances
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-3">Statistiques & Analytiques</h1>
        <p className="text-sm text-slate-400 mt-1">Suivez l'engagement de votre page publique et de vos liens en temps réel.</p>
      </div>

      {/* Carte des métriques (Votre composant AnalyticsCard intégré) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#030509] border border-white/10 space-y-6 relative overflow-hidden shadow-xl">
        {/* Effet lumineux d'arrière-plan */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Vue d'ensemble</h2>
            <p className="text-xs text-slate-400 mt-0.5">Indicateurs clés de votre audience.</p>
          </div>
          <span className="w-fit px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">
            En direct
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Carte Vues */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-[#FF6B00]/30 transition-colors">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">Vues totales</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{views}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Carte Liens */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-amber-500/30 transition-colors">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">Liens actifs</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{totalLinks}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}