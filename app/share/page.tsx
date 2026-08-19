'use client';

import { useState } from 'react';
import { createShareSession, MAX_FILE_SIZE } from '@/lib/share-utils';
import { QRCodeSVG } from 'qrcode.react';

export default function ShareHomePage() {
  const [activeTab, setActiveTab] = useState<'file' | 'text' | 'link'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [linkContent, setLinkContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [shareData, setShareData] = useState<{
    shortCode: string;
    shareUrl: string;
    expiresAt: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (activeTab === 'file') {
        if (!file) throw new Error('Veuillez sélectionner un fichier.');
        const result = await createShareSession({ type: 'file', file });
        setShareData(result);
      } else if (activeTab === 'text') {
        if (!textContent.trim()) throw new Error('Veuillez saisir du texte.');
        const result = await createShareSession({ type: 'text', rawContent: textContent });
        setShareData(result);
      } else if (activeTab === 'link') {
        if (!linkContent.trim()) throw new Error('Veuillez saisir un lien valide.');
        const result = await createShareSession({ type: 'link', rawContent: linkContent });
        setShareData(result);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shareData) {
      navigator.clipboard.writeText(shareData.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (shareData && navigator.share) {
      try {
        await navigator.share({
          title: 'QAVELYO Share',
          text: 'Voici mon contenu partagé via QAVELYO Share :',
          url: shareData.shareUrl,
        });
      } catch (err) {
        // Ignorer l'annulation
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      {/* --- ARRIÈRE-PLAN DESIGN NUMÉRIQUE / GRILLE TECH & LUEURS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#FF6B00]/15 via-blue-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF6B00]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Lignes graphiques décoratives de structure numérique */}
      <div className="absolute top-12 left-10 hidden lg:block opacity-20 pointer-events-none font-mono text-[10px] text-[#FF6B00] tracking-widest uppercase">
        // QAVELYO.CORE.SYSTEM // 2026 //
      </div>
      <div className="absolute bottom-12 right-10 hidden lg:block opacity-20 pointer-events-none font-mono text-[10px] text-slate-400 tracking-widest uppercase">
        DIGITAL_SOLUTIONS_READY_TO_USE
      </div>

      <div className="w-full max-w-xl mx-auto space-y-8 relative z-10">
        
        {/* En-tête de page aux couleurs de la marque */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold uppercase tracking-wider shadow-sm shadow-[#FF6B00]/10">
            ⚡ QAVELYO SHARE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Partagez instantanément, <span className="text-[#FF6B00]">sans effort.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            QAVELYO transforme vos besoins réels en solutions numériques modernes. Envoyez des fichiers, textes ou liens entre appareils en toute sécurité, sans inscription.
          </p>
        </div>

        {shareData ? (
          <div className="bg-[#0b101d]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
            
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FF6B00]/20 text-[#FF6B00] text-xl mb-1 border border-[#FF6B00]/30 shadow-lg shadow-[#FF6B00]/10">
              ✓
            </div>
            <h2 className="text-xl font-bold text-white">Votre partage est prêt !</h2>
            
            <div className="flex justify-center bg-white p-4 rounded-2xl max-w-[200px] mx-auto shadow-inner border border-white/10">
              <QRCodeSVG value={shareData.shareUrl} size={160} />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs text-slate-400 font-medium">Code court pour saisie manuelle :</p>
              <div className="text-3xl font-mono font-extrabold tracking-widest text-[#FF6B00] bg-slate-900/90 py-3 px-6 rounded-2xl border border-white/10 inline-block shadow-inner">
                {shareData.shortCode}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareData.shareUrl}
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-3 text-xs text-slate-300 font-mono select-all focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold px-5 py-3 rounded-xl transition flex-shrink-0 shadow-md shadow-[#FF6B00]/20 cursor-pointer"
                >
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>

              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-3 rounded-xl border border-white/10 bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition cursor-pointer"
                >
                  Partager via mon téléphone...
                </button>
              )}
            </div>

            <p className="text-[11px] text-amber-400/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 font-medium">
              ⏳ Ce partage expirera automatiquement dans 1 heure.
            </p>

            <button
              onClick={() => { setShareData(null); setFile(null); setTextContent(''); setLinkContent(''); }}
              className="text-xs text-slate-400 hover:text-white underline transition pt-2 cursor-pointer inline-block"
            >
              Faire un autre partage
            </button>
          </div>
        ) : (
          <div className="bg-[#0b101d]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
            
            {/* Sélecteur d'onglets de type de partage */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('file')}
                className={`py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'file' ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                📁 Fichier
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'text' ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                📝 Texte
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('link')}
                className={`py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'link' ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                🔗 Lien
              </button>
            </div>

            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-400 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {activeTab === 'file' && (
                <div className="space-y-3">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/15 hover:border-[#FF6B00] rounded-2xl p-8 cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition group">
                    <div className="text-center space-y-2">
                      <div className="text-3xl group-hover:scale-110 transition-transform">📤</div>
                      <div className="text-xs font-semibold text-slate-200">
                        {file ? file.name : "Glissez votre fichier ici ou cliquez"}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {file ? `${(file.size / (1024 * 1024)).toFixed(2)} Mo` : "Maximum 100 Mo (Tous types de fichiers)"}
                      </div>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  {file && (
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-xs text-red-400 hover:underline block text-center w-full cursor-pointer"
                    >
                      Retirer le fichier
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'text' && (
                <div>
                  <textarea
                    rows={5}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Tapez ou collez votre texte ici..."
                    className="w-full bg-slate-900/90 border border-white/10 rounded-2xl p-4 text-xs text-slate-100 focus:outline-none focus:border-[#FF6B00] transition shadow-inner leading-relaxed"
                  />
                </div>
              )}

              {activeTab === 'link' && (
                <div>
                  <input
                    type="url"
                    value={linkContent}
                    onChange={(e) => setLinkContent(e.target.value)}
                    placeholder="https://exemple.com"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-3.5 text-xs text-slate-100 focus:outline-none focus:border-[#FF6B00] transition shadow-inner"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold shadow-lg shadow-[#FF6B00]/30 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Création du partage en cours...
                  </>
                ) : (
                  'Générer le partage sécurisé ⚡'
                )}
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}