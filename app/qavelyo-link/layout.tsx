import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'QAVELYO LINK — Votre présence en ligne en un seul lien',
  description: 'Créez votre page professionnelle, gérez vos liens et analysez votre audience avec QAVELYO LINK.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col font-sans antialiased selection:bg-[#FF6B00]/30 selection:text-white">
      
      {/* HEADER MODERNE */}
      <header className="border-b border-white/5 bg-[#05080E]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:opacity-90">
            <div className="relative w-8 h-8 rounded-full border border-[#FF6B00]/40 overflow-hidden shadow-lg shadow-[#FF6B00]/20">
              <Image src="/Qavelyo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-extrabold text-white text-base tracking-wider">
              QAVELYO <span className="text-[#FF6B00]">LINK</span>
            </span>
          </Link>

          {/* NAVIGATION DROITE */}
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-white transition-all hover:scale-105">
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#ff8c38] hover:shadow-lg hover:shadow-[#FF6B00]/25 text-white text-xs font-bold transition-all hover:scale-105"
            >
              Créer mon compte
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER PREMIUM */}
      <footer className="py-16 border-t border-white/5 bg-[#030509]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="font-extrabold text-white">QAVELYO <span className="text-[#FF6B00]">LINK</span></span>
            <p className="text-xs text-slate-500 max-w-xs">
              La solution complète pour centraliser votre identité numérique avec élégance et performance.
            </p>
          </div>
          <div className="text-xs text-slate-500 md:text-center space-y-2">
            <p>Conçu pour les créateurs modernes.</p>
            <p className="text-white/20">Abidjan, Côte d'Ivoire</p>
          </div>
          <div className="text-xs text-slate-500 md:text-right">
            © {new Date().getFullYear()} QAVELYO Technology.
          </div>
        </div>
      </footer>
    </div>
  );
}