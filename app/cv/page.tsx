'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CVHomePage() {
  // Vos 15 modèles de CV exacts
  const templates = [
    { id: 'simple', name: 'Classique & Épuré', tag: 'Simple', desc: 'Sober, traditionnel en noir et blanc, parfait pour tout secteur.', color: 'from-slate-700/30 to-slate-900/40' },
    { id: 'moderne', name: 'Modern Premium', tag: 'Moderne', desc: 'Entête bleu nuit et accents cyan dynamiques.', color: 'from-cyan-600/30 to-blue-900/40' },
    { id: 'executive', name: 'Executive Dark', tag: 'Cadres', desc: 'Sidebar ardoise, touches ambrées, idéal pour postes à responsabilité.', color: 'from-amber-600/30 to-slate-900/40' },
    { id: 'zen', name: 'Minimalist Zen', tag: 'Épuré', desc: 'Teintes vert sauge, beaucoup d\'espace pour une lecture reposante.', color: 'from-emerald-700/30 to-slate-900/40' },
    { id: 'creative', name: 'Creative Studio', tag: 'Créatif', desc: 'Accents violets et corail pour profils créatifs et design.', color: 'from-purple-600/30 to-pink-900/40' },
    { id: 'compact', name: 'Compact Pro', tag: 'Dense', desc: 'Mise en page optimisée pour faire tenir beaucoup d\'informations.', color: 'from-zinc-600/30 to-slate-900/40' },
    { id: 'prestige', name: 'Élégant Prestige', tag: 'Luxe', desc: 'Nuances bordeaux et rose poudré avec typographie raffinée.', color: 'from-rose-700/30 to-slate-900/40' },
    { id: 'corporate', name: 'Corporate Navy', tag: 'Entreprise', desc: 'Bleu marine professionnel avec structure à deux colonnes équilibrée.', color: 'from-blue-700/30 to-indigo-900/40' },
    { id: 'tech', name: 'Tech & Data', tag: 'Informatique', desc: 'Inspiré des terminaux avec accents vert néon et police monospacée.', color: 'from-green-600/30 to-slate-900/40' },
    { id: 'academique', name: 'Académique', tag: 'Recherche', desc: 'Vert émeraude profond, structuré pour enseignants et chercheurs.', color: 'from-teal-700/30 to-slate-900/40' },
    { id: 'bold', name: 'Bold Impact', tag: 'Audacieux', desc: 'Couleur brique/terrakotta avec titres imposants.', color: 'from-orange-700/30 to-slate-900/40' },
    { id: 'nordique', name: 'Nordique Minimal', tag: 'Scandinave', desc: 'Gris froid et bleu glacé pour un look frais et épuré.', color: 'from-sky-700/30 to-slate-900/40' },
    { id: 'monochrome', name: 'Monochrome Pro', tag: 'Minimal', desc: 'Jeu de nuances de gris sophistiqué sans couleur vive.', color: 'from-neutral-600/30 to-slate-900/40' },
    { id: 'startup', name: 'Startup Vibe', tag: 'Tech/Product', desc: 'Dégradé Teal/Indigo moderne et dynamique.', color: 'from-teal-600/30 to-indigo-900/40' },
    { id: 'editorial', name: 'Éditorial Journal', tag: 'Presse', desc: 'Style presse avec bordures fines et typographie Serif.', color: 'from-stone-600/30 to-slate-900/40' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05080E] text-slate-100 font-sans">
      
      {/* BARRE DE NAVIGATION */}
      <header className="border-b border-white/10 bg-[#05080E]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo renvoyant vers l'accueil principal de QAVELYO */}
          <Link href="/" className="flex items-center gap-3 group" title="Retour à l'accueil QAVELYO">
            <Image
              src="/Qavelyo.png"
              alt="QAVELYO Logo"
              width={32}
              height={32}
              className="rounded-full border border-[#FF6B00]/40 group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-base">QAVELYO</span>
              <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                CV
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <Link href="/" className="hover:text-[#FF6B00] transition">
              Accueil QAVELYO
            </Link>
            <Link href="/cv" className="text-[#FF6B00] font-semibold">
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
            className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold shadow-md shadow-[#FF6B00]/20 transition-all hover:scale-105"
          >
            Créer mon CV
          </Link>
        </div>
      </header>

      {/* SECTION HERO */}
      <main className="flex-grow">
        <section className="relative py-20 md:py-28 px-4 overflow-hidden text-center">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold">
              ✨ Outil 100% Gratuit & Rapide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Créez un CV professionnel qui <span className="text-[#FF6B00]">démarque</span> votre profil
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Remplissez vos informations, choisissez un modèle moderne adapté au marché et téléchargez votre CV au format PDF en quelques minutes.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cv/create"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-sm font-bold shadow-lg shadow-[#FF6B00]/25 transition-all hover:scale-105"
              >
                Créer mon CV maintenant
              </Link>
              
              <a
                href="#modeles"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-slate-300 hover:text-white text-sm font-semibold transition"
              >
                Découvrir les modèles
              </a>
            </div>
          </div>
        </section>

        {/* SECTION COMMENT ÇA MARCHE */}
        <section id="comment-ca-marche" className="py-16 px-4 bg-slate-900/40 border-y border-white/5">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Comment ça marche ?</h2>
              <p className="text-sm text-slate-400">3 étapes simples pour obtenir votre CV prêt à l'emploi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#05080E] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-semibold text-[#FF6B00]">Remplissez vos infos</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Entrez votre parcours, vos expériences, vos compétences et coordonnées grâce à un formulaire guidé simple et rapide.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#05080E] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-semibold text-[#FF6B00]">Choisissez le design</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sélectionnez parmi nos modèles professionnels élégants. Prévisualisez le rendu directement en temps réel.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#05080E] border border-white/10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-semibold text-[#FF6B00]">Téléchargez en PDF</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Exportez immédiatement votre document au format PDF standard A4, prêt à être envoyé aux recuteurs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION NOS 15 MODÈLES DE CV */}
        <section id="modeles" className="py-20 px-4 max-w-7xl mx-auto space-y-12 scroll-mt-20">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Nos Modèles de CV</h2>
            <p className="text-sm text-slate-400">Des designs modernes et optimisés pour tous les secteurs d'activité</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <div 
                key={tpl.id} 
                className="group p-5 rounded-2xl bg-[#05080E] border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#FF6B00]/60 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual miniature du CV */}
                <div className={`h-48 rounded-xl bg-gradient-to-br ${tpl.color} p-4 border border-white/10 relative overflow-hidden flex flex-col justify-between`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                      {tpl.tag}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#FF6B00]"></div>
                  </div>

                  <div className="space-y-2 opacity-70">
                    <div className="h-2 bg-white/40 rounded w-1/2"></div>
                    <div className="h-1.5 bg-white/20 rounded w-3/4"></div>
                    <div className="h-1.5 bg-white/20 rounded w-2/3"></div>
                  </div>

                  <div className="text-[10px] text-slate-300 font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-sm truncate border border-white/5">
                    {tpl.desc}
                  </div>
                </div>

                {/* Nom du modèle + CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-bold text-white text-sm">{tpl.name}</h3>
                    <p className="text-[11px] text-slate-400 truncate max-w-[180px]">{tpl.tag}</p>
                  </div>
                  
                  <Link
                    href={`/cv/create?template=${tpl.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FF6B00]/10 hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white border border-[#FF6B00]/30 transition-all"
                  >
                    Utiliser →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER INTEGRES AVEC LIENS NAVIGATION DIRECTS */}
      <footer className="py-12 border-t border-white/10 bg-[#030509] text-center text-xs text-slate-400 space-y-6">
        <div className="flex flex-wrap justify-center gap-6 font-medium">
          <Link href="/" className="hover:text-[#FF6B00] transition">
            Accueil QAVELYO
          </Link>
          <Link href="/cv" className="hover:text-[#FF6B00] transition">
            Accueil CV
          </Link>
          <a href="#comment-ca-marche" className="hover:text-[#FF6B00] transition">
            Comment ça marche
          </a>
          <a href="#modeles" className="hover:text-[#FF6B00] transition">
            Modèles
          </a>
          <Link href="/cv/create" className="hover:text-[#FF6B00] transition">
            Créer un CV
          </Link>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} QAVELYO Technology. Tous droits réservés. Abidjan, Côte d'Ivoire.
        </div>
      </footer>
    </div>
  );
}