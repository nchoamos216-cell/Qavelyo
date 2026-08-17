'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  enabled?: boolean;
}

interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  profession?: string;
  bio?: string;
  avatar_url?: string;
  theme?: string;
  primary_color?: string;
  button_style?: string;
  vues?: number;
  links?: LinkItem[];
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form states (utilisant les noms de colonnes standardisés et propres)
  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#FF6B00');
  const [buttonStyle, setButtonStyle] = useState('arrondi-xl');
  const [links, setLinks] = useState<LinkItem[]>([]);
  
  // Nouveaux liens inputs
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Préréglages de couleurs rapides
  const colorPresets = ['#FF6B00', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#06B6D4'];

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          window.location.href = '/login';
          return;
        }

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || '');
          setProfession(profileData.profession || '');
          setBio(profileData.bio || '');
          setAvatarUrl(profileData.avatar_url || '');
          setPrimaryColor(profileData.primary_color || '#FF6B00');
          setButtonStyle(profileData.button_style || 'arrondi-xl');
          
          let parsedLinks = profileData.links;
          if (typeof parsedLinks === 'string') {
            try { parsedLinks = JSON.parse(parsedLinks); } catch (e) { parsedLinks = []; }
          }
          setLinks(Array.isArray(parsedLinks) ? parsedLinks : []);
        }
      } catch (err) {
        console.error('Erreur chargement dashboard :', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  // Fonction pour gérer l'upload d'image depuis la galerie avec typage correct
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0 || !profile) return;
      setUploading(true);

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload vers le bucket Supabase nommé "avatars"
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (err: any) {
      console.error("Erreur lors de l'upload de l'image :", err);
      alert("Erreur lors de l'upload : " + (err.message || "Vérifiez le bucket 'avatars'."));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      const updatedData = {
        full_name: fullName,
        profession,
        bio,
        avatar_url: avatarUrl || null,
        primary_color: primaryColor,
        button_style: buttonStyle,
        links: links,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', profile.id);

      if (error) throw error;
      alert('Modifications enregistrées avec succès ! 🚀');
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde :', err.message || err);
      alert('Erreur : ' + (err.message || 'Une erreur est survenue.'));
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const newLinkItem: LinkItem = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTitle,
      url: newUrl,
      enabled: true
    };

    setLinks([...links, newLinkItem]);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const copyPublicLink = () => {
    if (!profile?.username) return;
    const publicUrl = `${window.location.origin}/${profile.username}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05080E] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const username = profile?.username || '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-20 text-white min-h-screen">
      {/* Top Header premium avec le bouton "Voir ma page" */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/[0.03] p-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Mon Dashboard Qavelyo</h1>
          <p className="text-xs text-slate-400 mt-1">Gérez votre mini-site et personnalisez vos informations en direct.</p>
        </div>

        {username && (
          <a
            href={`/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF6B00]/25 flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <span>👁️ Voir ma page publique</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulaires d'édition */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Bloc Lien Personnalisé & Stats */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B00]/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-lg font-bold mb-2">Votre lien personnalisé</h2>
            <p className="text-xs text-slate-400 mb-4">Partagez votre mini-site Qavelyo partout sur vos réseaux.</p>
            
            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/10">
              <input
                type="text"
                readOnly
                value={username ? `${typeof window !== 'undefined' ? window.location.origin : ''}/${username}` : 'Chargement...'}
                className="bg-transparent text-sm text-slate-300 px-3 w-full outline-none font-mono"
              />
              <button
                type="button"
                onClick={copyPublicLink}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 shrink-0 cursor-pointer"
              >
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>
            
            <div className="mt-4 flex items-center gap-6 text-xs text-slate-400">
              <div>Vues totales du profil : <span className="font-bold text-white font-mono">{profile?.vues || 0}</span></div>
            </div>
          </div>

          {/* Formulaire Informations Personnelles */}
          <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 shadow-lg">
            <h2 className="text-xl font-bold border-b border-white/10 pb-4">Informations personnelles</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Nom et prénom</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm focus:border-[#FF6B00] outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Profession / Titre</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Ex: Développeur Web & Créateur"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm focus:border-[#FF6B00] outline-none transition-all"
                />
              </div>
            </div>

            {/* Upload de photo */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Photo de profil (Avatar)</label>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/15">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-slate-500">Aucune</span>
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-block px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-all border border-white/10">
                    {uploading ? 'Téléchargement...' : '📁 Choisir depuis la galerie'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarUpload} 
                      disabled={uploading} 
                      className="hidden" 
                    />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-1.5">PNG, JPG ou WEBP (Max. 5Mo)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Bio (Courte description)</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Parlez un peu de vous..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm focus:border-[#FF6B00] outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Couleur primaire & Filtres</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-11 h-11 rounded-xl bg-transparent cursor-pointer border border-white/10 shrink-0"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono uppercase outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                  {colorPresets.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setPrimaryColor(color)}
                      className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                        primaryColor === color ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Style des boutons</label>
                <select
                  value={buttonStyle}
                  onChange={(e) => setButtonStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#090D16] border border-white/10 text-sm text-white focus:border-[#FF6B00] outline-none"
                >
                  <option value="arrondi-xl">Arrondi moderne (Défaut)</option>
                  <option value="pill">Entièrement arrondi (Pill)</option>
                  <option value="sharp">Carré / Brut (Sharp)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-sm transition-all shadow-xl shadow-[#FF6B00]/25 cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>

          {/* Gestion des Liens */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6 shadow-lg">
            <h2 className="text-xl font-bold border-b border-white/10 pb-4">Mes Liens</h2>

            <form onSubmit={handleAddLink} className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-black/20 p-4 rounded-2xl border border-white/5">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Titre du lien (ex: Mon Portfolio)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs focus:border-[#FF6B00] outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="url"
                  placeholder="URL (https://...)"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs focus:border-[#FF6B00] outline-none"
                />
              </div>
              <div className="sm:col-span-1">
                <button
                  type="submit"
                  className="w-full h-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/10 cursor-pointer flex items-center justify-center"
                >
                  Ajouter
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {links.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Aucun lien ajouté pour l'instant.</p>
              ) : (
                links.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
                    <div className="truncate pr-4">
                      <h4 className="text-sm font-semibold truncate text-white">{link.title}</h4>
                      <p className="text-xs text-slate-400 truncate font-mono">{link.url}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20 shrink-0 cursor-pointer"
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Aperçu en direct (Live Preview) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col items-center shadow-lg">
            <span className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-wider">Aperçu en direct</span>

            <div className="w-[280px] min-h-[500px] bg-[#05080E] border-4 border-slate-800 rounded-[36px] p-4 flex flex-col items-center shadow-2xl relative overflow-hidden">
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 rounded-full blur-2xl pointer-events-none opacity-30"
                style={{ backgroundColor: primaryColor }}
              />

              <div className="w-16 h-16 rounded-full p-0.5 shadow-lg overflow-hidden mt-4 bg-gradient-to-tr from-[#FF6B00] to-amber-500 shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full bg-black" />
                ) : (
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-lg font-bold" style={{ color: primaryColor }}>
                    {(fullName || username || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="text-center mt-3 space-y-0.5 z-10 w-full px-2">
                <h3 className="text-sm font-bold truncate text-white">{fullName || 'Nom d\'utilisateur'}</h3>
                {profession && <p className="text-[11px] font-medium truncate" style={{ color: primaryColor }}>{profession}</p>}
                <p className="text-[10px] text-slate-400 font-mono">@{username || 'alias'}</p>
                {bio && <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">{bio}</p>}
              </div>

              <div className="w-full space-y-2 mt-6 z-10">
                {links.length === 0 ? (
                  <div className="text-center py-4 text-[11px] text-slate-500 bg-white/5 rounded-xl border border-white/5">
                    Aucun lien
                  </div>
                ) : (
                  links.map((link, idx) => (
                    <div 
                      key={idx}
                      className={`w-full py-2.5 px-3 bg-white/5 border border-white/10 text-center text-[11px] font-medium truncate shadow-sm ${
                        buttonStyle === 'pill' ? 'rounded-full' : buttonStyle === 'sharp' ? 'rounded-none' : 'rounded-xl'
                      }`}
                    >
                      {link.title || 'Lien'}
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}