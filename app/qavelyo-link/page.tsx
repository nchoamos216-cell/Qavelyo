import Link from 'next/link';

export default function QavelyoLandingPage() {
  return (
    <div className="min-h-screen bg-[#05080E] text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden font-sans">
      
      {/* EFFETS LUMINEUX D'ARRIÈRE-PLAN */}
      <div className="absolute w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none -top-40 -left-40 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -bottom-40 -right-40" />

      {/* CONTENU PRINCIPAL */}
      <main className="w-full max-w-4xl text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2">
          <span className="text-[#FF6B00] font-mono text-[11px] sm:text-xs uppercase tracking-widest bg-[#FF6B00]/10 px-4 py-1.5 rounded-full border border-[#FF6B00]/25 shadow-inner">
            ✨ La nouvelle référence du Bio Link
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
          Un seul lien pour <br />
          <span className="bg-gradient-to-r from-[#FF6B00] via-[#ff9e53] to-amber-400 bg-clip-text text-transparent">
            tout partager avec style
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Centralisez vos réseaux sociaux, vos projets, vos liens professionnels et suivez vos statistiques en temps réel sur une page élégante, ultra-rapide et personnalisable.
        </p>

        {/* BOUTONS D'ACTION */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#ff8c38] hover:from-[#e56000] hover:to-[#ff7b1a] text-white font-extrabold text-sm transition-all shadow-xl shadow-[#FF6B00]/30 text-center flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Créer mon compte</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-white font-extrabold text-sm transition-all border border-white/10 text-center shadow-lg cursor-pointer"
          >
            Se connecter
          </Link>
        </div>

        {/* BADGES DE CARACTÉRISTIQUES */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-[#FF6B00] font-bold text-sm">⚡ Ultra Rapide</div>
            <p className="text-slate-400 text-xs">Propulsé par Next.js pour un chargement instantané partout.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-amber-400 font-bold text-sm">🎨 Personnalisable</div>
            <p className="text-slate-400 text-xs">Modifiez les couleurs, les boutons et créez votre QR code HD.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-emerald-400 font-bold text-sm">📊 Analytiques Live</div>
            <p className="text-slate-400 text-xs">Suivez l'engagement et les vues de votre page en direct.</p>
          </div>
        </div>
      </main>
    </div>
  );
}