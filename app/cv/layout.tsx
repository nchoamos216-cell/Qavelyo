import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CVProvider } from '@/lib/cv-context';

export const metadata: Metadata = {
  title: 'QAVELYO CV — Créez votre CV professionnel gratuitement',
  description: 'Créez facilement un CV professionnel, moderne et prêt à télécharger avec QAVELYO CV.',
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CVProvider>
      <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col font-sans antialiased">
        
        {/* BARRE DE NAVIGATION UNIQUE */}
        <header className="border-b border-white/10 bg-[#05080E]/90 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            
            {/* Logo CV avec "CV" en grand et en rouge */}
            <Link href="/cv" className="flex items-center gap-3 group" title="Accueil CV QAVELYO">
              <Image
                src="/Qavelyo.png"
                alt="QAVELYO Logo"
                width={32}
                height={32}
                className="rounded-full border border-[#FF6B00]/40 group-hover:scale-105 transition-transform"
              />
              <span className="font-extrabold tracking-wider text-white text-base">
                QAVELYO <span className="text-[#FF6B00]">CV</span>
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <Link href="/cv" className="hover:text-[#FF6B00] transition">
                Accueil CV
              </Link>
              <a href="#comment-ca-marche" className="hover:text-[#FF6B00] transition">
                Comment ça marche
              </a>
              <a href="#modeles" className="hover:text-[#FF6B00] transition">
                Modèles
              </a>
            </nav>

            <Link
              href="/cv/create"
              className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-md shadow-[#FF6B00]/25 transition-all hover:scale-105"
            >
              Créer mon CV
            </Link>
          </div>
        </header>

        {/* CONTENU DE LA PAGE */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER GLOBAL DU CV */}
        <footer className="py-12 border-t border-white/10 bg-[#030509] text-center text-xs text-slate-400 space-y-6">
          <div className="flex flex-wrap justify-center gap-6 font-medium">
            <Link href="/" className="hover:text-[#FF6B00] transition">
              Accueil QAVELYO
            </Link>
            <Link href="/cv" className="hover:text-[#FF6B00] transition">
              Accueil CV
            </Link>
            <Link href="/cv/create" className="hover:text-[#FF6B00] transition">
              Créer un CV
            </Link>
          </div>

          <div className="text-slate-500">
            © 2026 QAVELYO Technology. Tous droits réservés. Abidjan, Côte d'Ivoire.
          </div>
        </footer>

      </div> 
    </CVProvider> 
  );
}