import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'QAVELYO LINK — Votre présence en ligne en un seul lien',
  description: 'Créez votre page professionnelle, gérez vos liens et analysez votre audience avec QAVELYO LINK.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col font-sans antialiased">
      <header className="border-b border-white/10 bg-[#05080E]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/qavelyo-link" className="flex items-center gap-3 group">
            <Image src="/Qavelyo.png" alt="Logo" width={32} height={32} className="rounded-full border border-[#FF6B00]/40" />
            <span className="font-extrabold text-white text-base tracking-wider">QAVELYO <span className="text-[#FF6B00]">LINK</span></span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-semibold text-slate-400 hover:text-white transition">Connexion</Link>
            <Link href="/register" className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold transition-all">
              Créer mon compte
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="py-12 border-t border-white/10 bg-[#030509] text-center text-xs text-slate-400">
        © 2026 QAVELYO Technology. Abidjan, Côte d'Ivoire.
      </footer>
    </div>
  );
}