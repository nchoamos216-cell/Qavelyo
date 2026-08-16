'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardSharePage() {
  const [username, setUsername] = useState('mon-lien');
  const [fullName, setFullName] = useState('Utilisateur');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShareData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('profiles')
          .select('username, slug, full_name')
          .eq('id', user.id)
          .single();

        if (data) {
          setUsername(data.username || data.slug || user.id.slice(0, 8));
          setFullName(data.full_name || user.user_metadata?.full_name || 'Utilisateur');
        } else {
          setUsername(user.id.slice(0, 8));
        }
      } catch (err) {
        console.error('Erreur chargement share :', err);
      } finally {
        setLoading(false);
      }
    }
    fetchShareData();
  }, []);

  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const publicUrl = `${domain}/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fullName} | QAVELYO Link`,
          text: `Découvrez mon univers numérique sur QAVELYO Link !`,
          url: publicUrl,
        });
      } catch (err) {
        console.log('Partage annulé ou non pris en charge');
      }
    } else {
      handleCopy();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#05080E] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-slate-400">Chargement de l'espace partage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-12">
      {/* En-tête */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20">
          PREMIUM DIFFUSION
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-3">Partager votre page</h1>
        <p className="text-slate-400 text-sm mt-1">Diffusez votre univers numérique auprès de votre communauté en un clin d'œil.</p>
      </div>

      {copied && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-lg">
          <span>✨</span> Lien copié dans le presse-papier !
        </div>
      )}

      {/* Bloc URL Publique */}
      <div className="p-8 rounded-3xl bg-[#030509]/80 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Votre URL Publique</h3>
            <p className="text-xs text-slate-400">Le lien direct unique vers votre page QAVELYO Link.</p>
          </div>
          <span className="text-xl">🌐</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#ff7b1a] text-white font-semibold text-sm transition-all shadow-xl shadow-[#FF6B00]/20 shrink-0 cursor-pointer"
          >
            Copier le lien
          </button>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={handleNativeShare}
            className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all cursor-pointer border border-white/10 flex items-center gap-2 shadow-md"
          >
            <span>🚀</span> Partager via...
          </button>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all cursor-pointer border border-white/10 flex items-center gap-2 shadow-md"
          >
            <span>↗</span> Ouvrir la page
          </a>
        </div>
      </div>

      {/* Bloc QR Code */}
      <div className="p-8 rounded-3xl bg-[#030509]/80 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row items-center gap-8 shadow-2xl">
        <div className="bg-white p-4 rounded-2xl shadow-2xl shrink-0 border border-white/20">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(publicUrl)}`}
            alt="QR Code public"
            className="w-36 h-36 object-contain"
          />
        </div>
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest inline-block">
            Prêt pour impression
          </span>
          <h2 className="text-xl font-bold text-white">QR Code de votre page</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Scannez ce code pour découvrir instantanément la page <span className="text-[#FF6B00] font-mono">@{username}</span>. Idéal pour vos cartes de visite, flyers ou réseaux sociaux.
          </p>
        </div>
      </div>
    </div>
  );
}