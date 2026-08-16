'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserLink {
  id: string;
  title: string;
  url: string;
  enabled?: boolean;
}

export default function LinksPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [links, setLinks] = useState<UserLink[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Formulaire d'ajout rapide
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    async function loadLinks() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('links')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Erreur chargement liens :', error);
        }

        if (profile && profile.links) {
          try {
            const parsed = typeof profile.links === 'string' ? JSON.parse(profile.links) : profile.links;
            setLinks(Array.isArray(parsed) ? parsed : []);
          } catch (e) {
            console.error('Erreur parsing links :', e);
          }
        }
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  const saveLinksToDatabase = async (updatedLinks: UserLink[]) => {
    if (!userId) return;
    const { error } = await supabase
      .from('profiles')
      .update({ 
        links: JSON.stringify(updatedLinks),
        updated_at: new Date()
      })
      .eq('id', userId);

    if (error) throw error;
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim() || !userId) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs.' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const formattedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
      const newLinkItem: UserLink = {
        id: Date.now().toString(),
        title: newTitle.trim(),
        url: formattedUrl,
        enabled: true,
      };

      const updatedLinks = [...links, newLinkItem];
      await saveLinksToDatabase(updatedLinks);

      setLinks(updatedLinks);
      setNewTitle('');
      setNewUrl('');
      setMessage({ type: 'success', text: 'Lien ajouté avec succès !' });
    } catch (error: any) {
      console.error('Erreur ajout :', error);
      setMessage({ type: 'error', text: error.message || "Erreur lors de l'ajout du lien." });
    } finally {
      setSaving(false);
    }
  };

  const updateLink = async (index: number, field: keyof UserLink, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);

    try {
      await saveLinksToDatabase(newLinks);
    } catch (error) {
      console.error('Erreur mise à jour lien :', error);
    }
  };

  const removeLink = async (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);

    try {
      await saveLinksToDatabase(newLinks);
      setMessage({ type: 'success', text: 'Lien supprimé.' });
    } catch (error) {
      console.error('Erreur suppression lien :', error);
      setMessage({ type: 'error', text: 'Erreur lors de la suppression.' });
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
        <h1 className="text-2xl font-extrabold text-white">Mes Liens</h1>
        <p className="text-sm text-slate-400 mt-1">Gérez l'ensemble de vos liens affichés sur votre page publique.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
          {message.text}
        </div>
      )}

      {/* FORMULAIRE D'AJOUT DE LIEN */}
      <form onSubmit={handleAddLink} className="p-6 rounded-2xl bg-[#030509] border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white border-b border-white/10 pb-4">Ajouter un nouveau lien</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Titre du lien</label>
            <input 
              type="text" 
              placeholder="Ex: Mon site web" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00]" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">URL de destination</label>
            <input 
              type="text" 
              placeholder="Ex: https://example.com" 
              value={newUrl} 
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B00]" 
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#e05e00] transition shadow-lg shadow-[#FF6B00]/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Ajout...' : '+ Ajouter un lien'}
          </button>
        </div>
      </form>

      {/* LISTE DES LIENS EXISTANTS */}
      <div className="p-6 rounded-2xl bg-[#030509] border border-white/10 space-y-6">
        <h2 className="text-base font-bold text-white border-b border-white/10 pb-4">Liens enregistrés</h2>

        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-sm">
              Aucun lien configuré pour l'instant.
            </div>
          ) : (
            links.map((link, index) => (
              <div key={link.id || index} className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex-1 w-full space-y-2">
                  <input 
                    type="text" 
                    value={link.title} 
                    onChange={(e) => updateLink(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6B00]" 
                  />
                  <input 
                    type="url" 
                    value={link.url} 
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6B00]" 
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={link.enabled !== false} 
                      onChange={(e) => updateLink(index, 'enabled', e.target.checked)}
                      className="rounded accent-[#FF6B00]" 
                    />
                    Actif
                  </label>

                  <button 
                    type="button" 
                    onClick={() => removeLink(index)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs transition cursor-pointer"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}