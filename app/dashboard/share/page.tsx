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

        // Récupérer le profil avec toutes les variantes de colonnes possibles (français et anglais)
        const { data, error } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', user.id)
          .single();

        if (data && !error) {
          const resolvedUsername = 
            data["nom d'utilisateur"] || 
            data.username || 
            data.slug || 
            user.id.slice(0, 8);

          const resolvedName = 
            data["nom et prénom"] || 
            data.full_name || 
            data.nom || 
            user.user_metadata?.full_name || 
            'Utilisateur';

          setUsername(resolvedUsername);
          setFullName(resolvedName);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 text-white">
      {/* En-tête */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/25">
          Diffusion
        </span>
        <h1 className="text-2xl font-extrabold text-white mt-3">Partager votre page</h1>
        <p className="text-sm text-slate-400 mt-1">Diffusez votre univers numérique auprès de votre communauté en un clin d'œil.</p>
      </div>

      {copied && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-lg">
          <span>✨</span> Lien copié dans le presse-papier !
        </div>
      )}

      {/* Bloc URL Publique */}
      <div className="p-6 rounded-2xl bg-[#030509] border border-white/10 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Votre URL Publique</h2>
            <p className="text-xs text-slate-400">Le lien direct unique vers votre page QAVELYO Link.</p>
          </div>
          <span className="text-xl">🌐</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-semibold text-xs transition shadow-lg shadow-[#FF6B00]/20 shrink-0 cursor-pointer"
          >
            Copier le lien
          </button>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleNativeShare}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition cursor-pointer border border-white/10 flex items-center gap-2"
          >
            <span>🚀</span> Partager via...
          </button>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition cursor-pointer border border-white/10 flex items-center gap-2"
          >
            <span>↗</span> Ouvrir la page
          </a>
        </div>
      </div>

      {/* Bloc QR Code */}
      <div className="p-6 rounded-2xl bg-[#030509] border border-white/10 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <div className="bg-white p-3 rounded-xl shadow-md shrink-0 border border-white/10">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(publicUrl)}`}
            alt="QR Code public"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest inline-block">
            Prêt pour impression
          </span>
          <h2 className="text-base font-bold text-white">QR Code de votre page</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Scannez ce code pour découvrir instantanément la page <span className="text-[#FF6B00] font-mono">@{username}</span>. Idéal pour vos cartes de visite, flyers ou réseaux sociaux.
          </p>
        </div>
      </div>
    </div>
  );
}