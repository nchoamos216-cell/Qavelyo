'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/share-utils';

export default function ShareReceivePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const shortCode = params.code as string;
  const accessToken = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      try {
        if (!shortCode) {
          throw new Error('Code de partage invalide.');
        }

        // Récupérer la session depuis la base de données via le short_code
        const { data, error: dbError } = await supabase
          .from('share_sessions')
          .select('*')
          .eq('short_code', shortCode.toUpperCase())
          .single();

        if (dbError || !data) {
          throw new Error("Ce partage n'existe pas ou a été supprimé.");
        }

        // Vérification de la sécurité du token
        if (accessToken && data.access_token !== accessToken) {
          throw new Error("Lien de partage invalide ou corrompu.");
        }

        // Vérification de l'expiration
        if (new Date() > new Date(data.expires_at)) {
          throw new Error("Ce partage a expiré et n'est plus disponible.");
        }

        setSession(data);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [shortCode, accessToken]);

  // Téléchargement sécurisé d'un fichier via URL signée Supabase Storage
  const handleDownloadFile = async () => {
    if (!session || !session.file_path) return;
    setDownloading(true);

    try {
      // Générer une URL signée valable 60 secondes pour le bucket privé
      const { data, error } = await supabase.storage
        .from('qavelyo-share')
        .createSignedUrl(session.file_path, 60);

      if (error || !data?.signedUrl) {
        throw new Error("Impossible de générer le lien de téléchargement.");
      }

      // Déclenchement du téléchargement
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = session.file_name || 'fichier-qavelyo';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      alert(err.message || "Erreur lors du téléchargement.");
    } finally {
      setDownloading(false);
    }
  };

  // Copier le texte
  const handleCopyText = () => {
    if (session?.raw_content) {
      navigator.clipboard.writeText(session.raw_content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-400">Recherche du partage en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md bg-[#0b101d] border border-red-500/20 rounded-2xl p-8 text-center space-y-4 my-auto">
        <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✕
        </div>
        <h1 className="text-lg font-bold text-white">Oups ! Partage indisponible</h1>
        <p className="text-xs text-slate-400">{error}</p>
        <a
          href="/share"
          className="inline-block mt-4 px-4 py-2.5 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition"
        >
          Créer un nouveau partage
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 py-4">
      <div className="bg-[#0b101d] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF6B00]/20 text-[#FF6B00]">
          {session.content_type === 'file' ? '📁' : session.content_type === 'text' ? '📝' : '🔗'}
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-white">Contenu reçu avec succès</h1>
          <p className="text-xs text-slate-400">Partage sécurisé QAVELYO Share</p>
        </div>

        {/* SI C'EST UN FICHIER */}
        {session.content_type === 'file' && (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-200 truncate" title={session.file_name}>
                {session.file_name}
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg flex-shrink-0">
                {(session.file_size / (1024 * 1024)).toFixed(2)} Mo
              </span>
            </div>

            <button
              onClick={handleDownloadFile}
              disabled={downloading}
              className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold shadow-lg shadow-[#FF6B00]/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {downloading ? 'Préparation du téléchargement...' : 'Télécharger le fichier'}
            </button>
          </div>
        )}

        {/* SI C'EST DU TEXTE */}
        {session.content_type === 'text' && (
          <div className="space-y-3 text-left">
            <div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-xs text-slate-200 font-mono max-h-60 overflow-y-auto whitespace-pre-wrap select-all">
              {session.raw_content}
            </div>
            <button
              onClick={handleCopyText}
              className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold transition"
            >
              {copied ? 'Texte copié !' : 'Copier le texte'}
            </button>
          </div>
        )}

        {/* SI C'EST UN LIEN */}
        {session.content_type === 'link' && (
          <div className="space-y-3">
            <div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-xs text-slate-200 font-mono truncate">
              {session.raw_content}
            </div>
            <a
              href={session.raw_content}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold transition text-center shadow-lg shadow-[#FF6B00]/30"
            >
              Ouvrir le lien dans un nouvel onglet →
            </a>
          </div>
        )}

        <div className="text-[11px] text-slate-500 pt-2 border-t border-white/5">
          Ce contenu s'auto-détruira après son expiration.
        </div>

      </div>
    </div>
  );
}