'use client';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 bg-[#05080E] text-center px-4">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="text-2xl font-bold text-white">QAVELYO</div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
          <a href="#hero" className="hover:text-[#FF6B00]">Accueil</a>
          <a href="#solutions" className="hover:text-[#FF6B00]">Solutions</a>
          <a href="#realisations" className="hover:text-[#FF6B00]">Réalisations</a>
          <a href="#a-propos" className="hover:text-[#FF6B00]">À propos</a>
          <a href="#contact" className="hover:text-[#FF6B00]">Contact</a>
        </nav>
        <p className="text-xs text-slate-500 pt-3">
          © {new Date().getFullYear()} QAVELYO Technology. Tous droits réservés. Abidjan, Côte d'Ivoire.
        </p>
      </div>
    </footer>
  );
}