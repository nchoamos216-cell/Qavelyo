import Link from 'next/link';

export default function QavelyoLandingPage() {
  return (
    <div className="min-h-screen bg-[#05080E] text-white flex flex-col items-center justify-center p-4">
      {/* Exemple de contenu de la page d'accueil */}
      <div className="text-center max-w-2xl space-y-6">
        <span className="text-[#FF6B00] font-mono text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/25">
          QAVELYO LINK
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Un seul lien pour <span className="text-[#FF6B00]">tout partager</span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          Centralisez vos réseaux sociaux, vos projets et vos contacts professionnels en une seule page élégante et ultra-rapide.
        </p>

        {/* Boutons d'action : Inscription et Connexion */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-extrabold text-sm transition-all shadow-xl shadow-[#FF6B00]/25 text-center"
          >
            Créer mon compte →
          </Link>
          
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-extrabold text-sm transition-all border border-white/10 text-center"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}