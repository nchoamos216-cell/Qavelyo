'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { UserProfile } from '@/types/link';
import { updateProfileInDB } from '@/lib/db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Liste des couleurs prédéfinies Premium (avec le Noir Profond)
const COLOR_PRESETS = [
  { name: 'Noir Profond', value: '#000000' },
  { name: 'Orange Qavelyo', value: '#FF6B00' },
  { name: 'Bleu Électrique', value: '#3B82F6' },
  { name: 'Violet Néon', value: '#8B5CF6' },
  { name: 'Émeraude Pro', value: '#10B981' },
  { name: 'Rose Tendance', value: '#EC4899' },
  { name: 'Or Solaire', value: '#F59E0B' },
  { name: 'Blanc Pur', value: '#FFFFFF' },
];

export default function DashboardAppearancePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // États pour le QR Code
  const [qrColor, setQrColor] = useState('#FF6B00');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const { data } = await supabase.from('profiles').select('*').limit(1).single();
        if (data) {
          setProfile(data);
          if (data.primaryColor) setQrColor(data.primaryColor);
        }
      } catch (err) {
        console.error('Erreur chargement :', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (field: keyof UserProfile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
    if (field === 'primaryColor') {
      setQrColor(value);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setMessage('');

    const success = await updateProfileInDB(profile);
    if (success) {
      setMessage('Apparence enregistrée avec succès ! ✨');
    } else {
      setMessage("Erreur lors de l'enregistrement.");
    }
    setSaving(false);
  };

  if (loading || !profile) {
    return (
      <div className="min-h-[60vh] bg-[#05080E] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-slate-400">Chargement de l'espace design...</p>
        </div>
      </div>
    );
  }

  const usernamePath = profile.username ? profile.username.toLowerCase().trim() : 'aka';
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/${usernamePath}` : '';
  
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(publicUrl)}&color=${qrColor.replace('#', '')}&bgcolor=${qrBgColor.replace('#', '')}`;

  const handleDownloadQRCode = async () => {
    try {
      const response = await fetch(qrCodeApiUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `qavelyo-qrcode-${usernamePath}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Erreur lors du téléchargement du QR code", err);
      window.open(qrCodeApiUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl pb-12">
      {/* En-tête */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20">
          PREMIUM DESIGN STUDIO
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-3">Apparence & QR Code</h1>
        <p className="text-slate-400 text-sm mt-1">Façonnez l'identité visuelle de votre page et pilotez vos outils de partage.</p>
      </div>

      {message && (
        <div className="p-4 rounded-2xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 shadow-lg shadow-emerald-500/5">
          <span>✨</span> {message}
        </div>
      )}

      {/* SECTION DESIGN */}
      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#030509]/80 backdrop-blur-xl border border-white/10 space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Palette & Identité Visuelle</h3>
            <p className="text-xs text-slate-400">Personnalisez les couleurs et le style de vos composants.</p>
          </div>
          <span className="text-xl">🎨</span>
        </div>

        {/* Sélection de la couleur principale (Pastilles Premium) */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Couleur principale du profil</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COLOR_PRESETS.map((color) => {
              const isSelected = profile.primaryColor === color.value;
              return (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleChange('primaryColor', color.value)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-semibold transition-all group ${
                    isSelected
                      ? 'border-[#FF6B00] bg-[#FF6B00]/15 text-white shadow-lg shadow-[#FF6B00]/20 ring-1 ring-[#FF6B00]'
                      : 'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow-inner"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="truncate">{color.name}</span>
                </button>
              );
            })}
          </div>
          
          {/* Option personnalisée HEX */}
          <div className="pt-2 flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/10">
            <div className="relative">
              <input
                type="color"
                value={profile.primaryColor || '#FF6B00'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent cursor-pointer border border-white/20 shrink-0 p-0"
              />
            </div>
            <div className="flex-1">
              <span className="block text-[10px] font-mono text-slate-400 uppercase">Code Hexadécimal personnalisé</span>
              <input
                type="text"
                value={profile.primaryColor || '#FF6B00'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                placeholder="#HEX"
                className="w-full bg-transparent text-sm text-white font-mono focus:outline-none pt-0.5"
              />
            </div>
          </div>
        </div>

        {/* Style des boutons */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Style géométrique des boutons</label>
          <select
            value={profile.buttonStyle || 'rounded-xl'}
            onChange={(e) => handleChange('buttonStyle', e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
          >
            <option value="rounded-xl" className="bg-[#05080E]">Moderne Arrondi (Rounded)</option>
            <option value="rounded-full" className="bg-[#05080E]">Totalement Ovale (Pill)</option>
            <option value="rounded-none" className="bg-[#05080E]">Minimaliste Carré (Sharp)</option>
          </select>
        </div>

        {/* Style d'arrière-plan */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ambiance d'arrière-plan</label>
          <select
            value={profile.backgroundStyle || 'solid'}
            onChange={(e) => handleChange('backgroundStyle', e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
          >
            <option value="solid" className="bg-[#05080E]">Uni Sombre Élégant (Solid)</option>
            <option value="gradient" className="bg-[#05080E]">Dégradé Futuriste (Gradient)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#ff8c38] hover:from-[#e56000] hover:to-[#ff7b1a] font-extrabold text-sm transition-all shadow-xl shadow-[#FF6B00]/25 disabled:opacity-50 text-white flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Enregistrement en cours...</span>
            </>
          ) : (
            <span>Sauvegarder l'apparence</span>
          )}
        </button>
      </form>

      {/* SECTION QR CODE */}
      <div className="p-8 rounded-3xl bg-[#030509]/80 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">QR Code Professionnel</h3>
            <p className="text-xs text-slate-400">Générez et téléchargez votre QR code pour vos cartes de visite et flyers.</p>
          </div>
          <span className="text-xl">📱</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/[0.02] p-6 rounded-3xl border border-white/10">
          <div ref={qrRef} className="bg-white p-4 rounded-2xl shadow-2xl shrink-0 border border-white/20">
            <img src={qrCodeApiUrl} alt="QR Code Qavelyo Link" className="w-40 h-40 object-contain" />
          </div>

          <div className="space-y-4 w-full">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Couleur des motifs</label>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-full h-11 rounded-xl bg-transparent cursor-pointer border border-white/10 p-1"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">Couleur du fond</label>
                <input
                  type="color"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="w-full h-11 rounded-xl bg-transparent cursor-pointer border border-white/10 p-1"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadQRCode}
              className="w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all border border-white/10 flex items-center justify-center gap-2 group shadow-lg"
            >
              <span className="group-hover:translate-y-0.5 transition-transform">📥</span> Télécharger le QR Code (PNG HD)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}