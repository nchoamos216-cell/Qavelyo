import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'QAVELYO Share — Transfert rapide de fichiers et de textes',
  description: 'Partagez des fichiers, photos, liens et textes instantanément entre deux appareils sans inscription.',
};

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden">
      
    {/* HEADER ULTRA-ÉPURÉ SHARE */}
      <header className="border-b border-white/10 bg-[#05080E]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo QAVELYO Share empilé */}
          <Link href="/share" className="flex items-center gap-2.5 group flex-shrink-0" title="Accueil QAVELYO Share">
            <Image
              src="/Qavelyo.png"
              alt="QAVELYO Logo"
              width={36}
              height={36}
              className="rounded-full border border-[#FF6B00]/40 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold tracking-wider text-white text-sm sm:text-base">
                QAVEL<span className="text-[#FF6B00]">Y</span>O
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#FF6B00] uppercase -mt-0.5">
                Share
              </span>
            </div>
          </Link>

          {/* Bouton de retour rapide vers l'accueil global */}
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50"
          >
            Accueil Principal
          </Link>

        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-grow w-full flex flex-col items-center justify-center p-4 sm:p-6">
        {children}
      </main>

      {/* FOOTER DISCRET */}
      <footer className="py-6 text-center text-[11px] text-slate-500 border-t border-white/5">
        © 2026 QAVELYO Technology. Transfert sécurisé et temporaire.
      </footer>

    </div>
  );
}