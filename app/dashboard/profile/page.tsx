'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Champs de la base de données (profil seul)
  const [nomEtPrenom, setNomEtPrenom] = useState('');
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [urlAvatar, setUrlAvatar] = useState('');
  const [couleurPrimaire, setCouleurPrimaire] = useState('#FF6B00');
  const [styleBouton, setStyleBouton] = useState('rounded-2xl');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Erreur chargement profil :', error);
        }

        if (profile) {
          setNomEtPrenom(profile["nom et prénom"] || '');
          setNomUtilisateur(profile["nom d'utilisateur"] || '');
          setProfession(profile.profession || '');
          setBio(profile.bio || '');
          setUrlAvatar(profile["URL de l'avatar"] || '');
          setCouleurPrimaire(profile["couleur primaire"] || '#FF6B00');
          setStyleBouton(profile.style_de_bouton || 'rounded-2xl');
        }
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0 || !userId) return;
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setUrlAvatar(publicUrl);
      setMessage({ type: 'success', text: 'Avatar téléchargé avec succès !' });
    } catch (error: any) {
      console.error("Erreur upload:", error);
      setMessage({ type: 'error', text: "Erreur lors de l'upload de l'avatar." });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      setSaving(true);
      setMessage(null);

      const updates = {
        id: userId,
        "nom et prénom": nomEtPrenom,
        "nom d'utilisateur": nomUtilisateur,
        profession,
        bio,
        "URL de l'avatar": urlAvatar,
        "couleur primaire": couleurPrimaire,
        style_de_bouton: styleBouton,
        updated_at: new Date(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
    } catch (error: any) {
      console.error('Erreur sauvegarde :', error);
      setMessage({ type: 'error', text: error.message || 'Une erreur est survenue.' });
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Mon Profil</h1>
        <p className="text-sm text-slate-400 mt-1">Personnalisez vos informations personnelles et votre design public.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION INFORMATIONS DE BASE */}
        <div className="p-6 rounded-2xl bg-[#030509] border border-white/10 space-y-6">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-4">Informations générales</h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0">
              {urlAvatar ? (
                <Image src={urlAvatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xl">
                  {nomEtPrenom ? nomEtPrenom.charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-400">Photo de profil</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarUpload}
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#FF6B00] file:text-white hover:file:bg-[#e05e00] cursor-pointer" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Nom et prénom</label>
              <input 
                type="text" 
                value={nomEtPrenom} 
                onChange={(e) => setNomEtPrenom(e.target.value)}
                placeholder="Ex: John Doe" 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00]" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Nom d'utilisateur</label>
              <input 
                type="text" 
                value={nomUtilisateur} 
                onChange={(e) => setNomUtilisateur(e.target.value)}
                placeholder="Ex: johndoe" 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00]" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Profession / Titre</label>
            <input 
              type="text" 
              value={profession} 
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Ex: Développeur Fullstack & Créateur" 
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00]" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Bio</label>
            <textarea 
              rows={3} 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              placeholder="Parlez un peu de vous..." 
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00] resize-none" 
            />
          </div>
        </div>

        {/* SECTION DESIGN & APPARENCE */}
        <div className="p-6 rounded-2xl bg-[#030509] border border-white/10 space-y-6">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-4">Apparence</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Couleur primaire</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={couleurPrimaire} 
                  onChange={(e) => setCouleurPrimaire(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent cursor-pointer border border-white/10" 
                />
                <input 
                  type="text" 
                  value={couleurPrimaire} 
                  onChange={(e) => setCouleurPrimaire(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono uppercase" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Style des boutons</label>
              <select 
                value={styleBouton} 
                onChange={(e) => setStyleBouton(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#05080E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="rounded-2xl">Arrondi normal</option>
                <option value="rounded-full">Pilule (Pill)</option>
                <option value="rounded-none">Carré (Sharp)</option>
              </select>
            </div>
          </div>
        </div>

        {/* BOUTON DE SAUVEGARDE */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#FF6B00] text-white font-semibold text-sm hover:bg-[#e05e00] transition shadow-lg shadow-[#FF6B00]/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
}