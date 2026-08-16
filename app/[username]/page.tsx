'use client';

import React, { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';

interface Profile {
  id: string;
  name?: string;
  full_name?: string;
  username: string;
  profession?: string;
  bio?: string;
  avatarUrl?: string;
  avatar_url?: string;
  buttonStyle?: string;
  themeStyle?: string;
  views?: number;
}

interface UserLink {
  id: string;
  title: string;
  url: string;
  enabled?: boolean;
  is_active?: boolean;
  clicks?: number;
}

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const username = resolvedParams.username;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<UserLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPublicData() {
      try {
        setLoading(true);

        // 1. Récupérer le profil Supabase par username
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();

        if (profileError || !profileData) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // 2. Incrémenter les vues du profil
        const currentViews = profileData.views || 0;
        await supabase
          .from('profiles')
          .update({ views: currentViews + 1 })
          .eq('id', profileData.id);

        // 3. Récupérer les liens associés à ce profil
        const { data: linksData } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', profileData.id)
          .order('created_at', { ascending: true });

        if (linksData) {
          setLinks(linksData);
        }
      } catch (err) {
        console.error('Erreur chargement profil public :', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      loadPublicData();
    }
  }, [username]);

  if (notFound) {
    return (
      <main className="min-h-screen bg-[#05080E] text-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Profil introuvable</h1>
        <p className="text-slate-400 text-sm mb-6">Le profil @{username} n'existe pas ou a été désactivé.</p>
        <a href="/" className="px-6 py-3 rounded-xl bg-[#FF6B00] text-white text-sm font-semibold transition-all hover:bg-[#e05e00] shadow-lg shadow-[#FF6B00]/25">
          Retourner sur QAVELYO
        </a>
      </main>
    );
  }

  if (loading || !profile) {
    return (
      <main className="min-h-screen bg-[#05080E] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // Filtrer les liens actifs
  const activeLinks = links.filter((l) => l.enabled !== false && l.is_active !== false);

  const getButtonRadiusClass = () => {
    const style = profile.buttonStyle || profile.themeStyle;
    switch (style) {
      case 'pill': return 'rounded-full';
      case 'sharp': return 'rounded-none';
      default: return 'rounded-2xl';
    }
  };

  const handleLinkClick = async (linkId: string, url: string, currentClicks?: number) => {
    try {
      const newClicks = (currentClicks || 0) + 1;
      await supabase
        .from('links')
        .update({ clicks: newClicks })
        .eq('id', linkId);
    } catch (err) {
      console.error('Erreur mise à jour clics :', err);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const displayName = profile.full_name || profile.name || profile.username;
  const displayAvatar = profile.avatar_url || profile.avatarUrl;

  return (
    <main className="min-h-screen bg-[#05080E] text-white flex flex-col items-center py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto space-y-8 z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#FF6B00] to-amber-500 shadow-xl overflow-hidden">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-full h-full object-cover rounded-full bg-[#05080E]"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#05080E] flex items-center justify-center text-2xl font-extrabold text-[#FF6B00]">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">{displayName}</h1>
            {profile.profession && (
              <p className="text-sm font-medium text-[#FF6B00]">{profile.profession}</p>
            )}
            <p className="text-xs text-slate-400 font-mono">@{profile.username}</p>
          </div>

          {profile.bio && (
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {profile.bio}
            </p>
          )}
        </div>

        <div className="space-y-3.5 w-full">
          {activeLinks.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm bg-white/[0.03] rounded-2xl border border-white/5">
              Aucun lien disponible pour le moment.
            </div>
          ) : (
            activeLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.url, link.clicks)}
                className={`w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF6B00]/50 text-white font-medium text-sm flex items-center justify-between transition-all shadow-lg group cursor-pointer ${getButtonRadiusClass()}`}
              >
                <span className="flex items-center gap-3 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] group-hover:scale-125 transition-transform shrink-0" />
                  <span className="truncate">{link.title}</span>
                </span>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B00] group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))
          )}
        </div>

        <div className="pt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-all shadow-sm"
          >
            Propulsé par <span className="text-[#FF6B00] font-bold">QAVELYO Link</span>
          </a>
        </div>
      </div>
    </main>
  );
}