'use client';

import React, { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';

interface Profile {
  id: string;
  username?: string;
  "nom d'utilisateur"?: string;
  nom?: string;
  "nom et prénom"?: string;
  full_name?: string;
  profession?: string;
  bio?: string;
  avatar_url?: string;
  "URL de l'avatar"?: string;
  // Ajout des champs pour éviter les erreurs de type
  avatar?: string; 
  image?: string;
  thème?: string;
  primary_color?: string;
  "couleur primaire"?: string;
  style_de_bouton?: string;
  button_style?: string;
  "style de fond"?: string;
  vues?: number;
  links?: any;
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
        console.log("Recherche du profil pour :", username);

        // 1. Recherche du profil (sur 'nom d'utilisateur' ou 'username')
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq("nom d'utilisateur", username)
          .maybeSingle();

        if (!profileData) {
          const res = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .maybeSingle();
          
          profileData = res.data;
          profileError = res.error;
        }

        if (profileError || !profileData) {
          console.warn("Profil introuvable dans Supabase pour :", username, profileError);
          setNotFound(true);
          setLoading(false);
          return;
        }

        setProfile(profileData);

        // 2. Incrémentation des vues
        const currentViews = profileData.vues || 0;
        await supabase
          .from('profiles')
          .update({ vues: currentViews + 1 })
          .eq('id', profileData.id);

        // 3. Récupération des liens (Gestion des deux cas : Colonne JSON ou Table séparée)
        let fetchedLinks: UserLink[] = [];

        if (profileData.links) {
          try {
            fetchedLinks = typeof profileData.links === 'string' 
              ? JSON.parse(profileData.links) 
              : profileData.links;
          } catch (e) {
            console.error('Erreur parsing links JSON :', e);
          }
        }

        // Si aucun lien trouvé dans le JSON, on essaie de les récupérer depuis une table 'links' dédiée
        if (!fetchedLinks || fetchedLinks.length === 0) {
          const { data: linksTableData, error: linksError } = await supabase
            .from('links')
            .select('*')
            .eq('user_id', profileData.id);

          if (!linksError && linksTableData) {
            fetchedLinks = linksTableData;
          }
        }

        setLinks(Array.isArray(fetchedLinks) ? fetchedLinks : []);

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

  const activeLinks = Array.isArray(links) ? links.filter((l) => l.enabled !== false && l.is_active !== false) : [];

  const getButtonRadiusClass = () => {
    const style = profile.style_de_bouton || profile.button_style;
    if (style?.includes('pill') || style?.includes('rounded-full')) return 'rounded-full';
    if (style?.includes('sharp') || style?.includes('rounded-none')) return 'rounded-none';
    return 'rounded-2xl';
  };

  const handleLinkClick = async (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const displayName = profile["nom et prénom"] || profile.full_name || profile.nom || profile["nom d'utilisateur"] || profile.username || 'Utilisateur';
  
  // Utilisation du chaînage optionnel et des clés sécurisées
    const displayAvatar = 
  profile["URL de l'avatar"] || 
  profile.avatar_url || 
  (profile as any)["avatar"] || 
  (profile as any)["image"];
  const primaryColor = profile["couleur primaire"] || profile.primary_color || '#FF6B00';
  const currentAlias = profile["nom d'utilisateur"] || profile.username || username;

  return (
    <main className="min-h-screen bg-[#05080E] text-white flex flex-col items-center py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="w-full max-w-md mx-auto space-y-8 z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div 
            className="w-24 h-24 rounded-full p-1 shadow-xl overflow-hidden bg-gradient-to-tr shrink-0"
            style={{ backgroundImage: `linear-gradient(to top right, ${primaryColor}, #f59e0b)` }}
          >
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-full h-full object-cover rounded-full bg-[#05080E]"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#05080E] flex items-center justify-center text-2xl font-extrabold" style={{ color: primaryColor }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">{displayName}</h1>
            {profile.profession && (
              <p className="text-sm font-medium" style={{ color: primaryColor }}>{profile.profession}</p>
            )}
            <p className="text-xs text-slate-400 font-mono">@{currentAlias}</p>
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
            activeLinks.map((link, index) => (
              <button
                key={link.id || index}
                onClick={() => handleLinkClick(link.url)}
                className={`w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm flex items-center justify-between transition-all shadow-lg group cursor-pointer ${getButtonRadiusClass()}`}
              >
                <span className="flex items-center gap-3 truncate">
                  <span className="w-2 h-2 rounded-full transition-transform shrink-0" style={{ backgroundColor: primaryColor }} />
                  <span className="truncate">{link.title || link.url}</span>
                </span>
                <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            Propulsé par <span className="font-bold" style={{ color: primaryColor }}>QAVELYO Link</span>
          </a>
        </div>
      </div>
    </main>
  );
}