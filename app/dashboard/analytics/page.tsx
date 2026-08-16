'use client';

import React from 'react';

interface AnalyticsProps {
  views: number;
  totalLinks?: number;
}

export default function AnalyticsCard({ views, totalLinks = 0 }: AnalyticsProps) {
  return (
    <div className="p-4 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 relative overflow-hidden transition-all duration-300">
      {/* Effet lumineux d'arrière-plan */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Analytiques</h2>
          <p className="text-xs text-slate-400 mt-1">Suivez l'engagement de votre page.</p>
        </div>
        <span className="w-fit px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest">
          En direct
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Carte Vues */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between hover:border-[#FF6B00]/30 transition-colors">
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
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between hover:border-amber-500/30 transition-colors">
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
  );
}