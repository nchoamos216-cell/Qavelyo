'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- INTERFACES ---
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  website: string;
  photoUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  city: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
}

export type TemplateId =
  | 'classic'
  | 'modern'
  | 'executive'
  | 'minimal'
  | 'creative'
  | 'compact'
  | 'elegant'
  | 'corporate'
  | 'tech'
  | 'academic'
  | 'bold'
  | 'nordic'
  | 'monochrome'
  | 'startup'
  | 'editorial';

// --- LISTE DES LANGUES & NIVEAUX ---
const POPULAR_LANGUAGES = [
  'Français',
  'Anglais',
  'Espagnol',
  'Arabe',
  'Allemand',
  'Chinois (Mandarin)',
  'Portugais',
  'Italien',
  'Russe',
  'Japonais',
  'Turc',
  'Néerlandais',
  'Autre',
];

const LANGUAGE_LEVELS = [
  'Langue maternelle',
  'Bilingue',
  'Courant (C1/C2)',
  'Avancé (B2)',
  'Intermédiaire (B1)',
  'Débutant (A1/A2)',
];

// --- LES 15 MODÈLES ---
const TEMPLATES: { id: TemplateId; name: string; tag: string; desc: string }[] = [
  { id: 'classic', name: 'Classique & Épuré', tag: 'Simple', desc: 'Sober, traditionnel en noir et blanc, parfait pour tout secteur.' },
  { id: 'modern', name: 'Modern Premium', tag: 'Moderne', desc: 'Entête bleu nuit et accents cyan dynamiques.' },
  { id: 'executive', name: 'Executive Dark', tag: 'Cadres', desc: 'Sidebar ardoise, touches ambrées, idéal pour postes à responsabilité.' },
  { id: 'minimal', name: 'Minimalist Zen', tag: 'Épuré', desc: "Teintes vert sauge, beaucoup d'espace pour une lecture reposante." },
  { id: 'creative', name: 'Creative Studio', tag: 'Créatif', desc: 'Accents violets et corail pour profils créatifs et design.' },
  { id: 'compact', name: 'Compact Pro', tag: 'Dense', desc: "Mise en page optimisée pour faire tenir beaucoup d'informations." },
  { id: 'elegant', name: 'Élégant Prestige', tag: 'Luxe', desc: 'Nuances bordeaux et rose poudré avec typographie raffinée.' },
  { id: 'corporate', name: 'Corporate Navy', tag: 'Entreprise', desc: 'Bleu marine professionnel avec structure à deux colonnes équilibrée.' },
  { id: 'tech', name: 'Tech & Data', tag: 'Informatique', desc: 'Inspiré des terminaux avec accents vert néon et police monospacée.' },
  { id: 'academic', name: 'Académique', tag: 'Recherche', desc: 'Vert émeraude profond, structuré pour enseignants et chercheurs.' },
  { id: 'bold', name: 'Bold Impact', tag: 'Audacieux', desc: 'Couleur brique/terrakotta avec titres imposants.' },
  { id: 'nordic', name: 'Nordique Minimal', tag: 'Scandinave', desc: 'Gris froid et bleu glacé pour un look frais et épuré.' },
  { id: 'monochrome', name: 'Monochrome Pro', tag: 'Minimal', desc: 'Jeu de nuances de gris sophistiqué sans couleur vive.' },
  { id: 'startup', name: 'Startup Vibe', tag: 'Tech/Product', desc: 'Dégradé Teal/Indigo moderne et dynamique.' },
  { id: 'editorial', name: 'Éditorial Journal', tag: 'Presse', desc: 'Style presse avec bordures fines et typographie Serif.' },
];



// ==========================================
// RENDU DYNAMIQUE DES 15 MODÈLES DE CV
// ==========================================

type TemplateConfig = {
  accent: string;
  accentText: string;
  accentBg: string;
  softBg: string;
  border: string;
  text: string;
  muted: string;
  header: 'classic' | 'dark' | 'center' | 'split' | 'editorial' | 'minimal';
  sidebar?: boolean;
  serif?: boolean;
  compact?: boolean;
  photo?: 'circle' | 'square' | 'none';
};

const TEMPLATE_CONFIG: Record<TemplateId, TemplateConfig> = {
  classic:    { accent: 'text-gray-900', accentText: 'text-gray-900', accentBg: 'bg-gray-900', softBg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-900', muted: 'text-gray-600', header: 'classic', photo: 'none' },
  modern:     { accent: 'text-cyan-600', accentText: 'text-cyan-500', accentBg: 'bg-slate-900', softBg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-slate-900', muted: 'text-slate-600', header: 'dark', photo: 'circle' },
  executive:  { accent: 'text-amber-500', accentText: 'text-amber-500', accentBg: 'bg-slate-900', softBg: 'bg-amber-50', border: 'border-slate-700', text: 'text-slate-900', muted: 'text-slate-600', header: 'split', sidebar: true, photo: 'square' },
  minimal:    { accent: 'text-emerald-800', accentText: 'text-emerald-700', accentBg: 'bg-[#FAF9F6]', softBg: 'bg-emerald-50', border: 'border-stone-300', text: 'text-stone-900', muted: 'text-stone-500', header: 'minimal', serif: false, photo: 'circle' },
  creative:   { accent: 'text-purple-700', accentText: 'text-pink-600', accentBg: 'bg-purple-700', softBg: 'bg-pink-50', border: 'border-purple-200', text: 'text-slate-900', muted: 'text-slate-600', header: 'dark', photo: 'circle' },
  compact:    { accent: 'text-blue-700', accentText: 'text-blue-600', accentBg: 'bg-blue-900', softBg: 'bg-blue-50', border: 'border-blue-200', text: 'text-slate-900', muted: 'text-slate-600', header: 'classic', compact: true, photo: 'none' },
  elegant:    { accent: 'text-rose-800', accentText: 'text-rose-700', accentBg: 'bg-rose-950', softBg: 'bg-rose-50', border: 'border-rose-200', text: 'text-stone-900', muted: 'text-stone-600', header: 'center', serif: true, photo: 'circle' },
  corporate:  { accent: 'text-blue-800', accentText: 'text-blue-700', accentBg: 'bg-blue-950', softBg: 'bg-blue-50', border: 'border-blue-200', text: 'text-slate-900', muted: 'text-slate-600', header: 'split', sidebar: true, photo: 'square' },
  tech:       { accent: 'text-emerald-400', accentText: 'text-cyan-400', accentBg: 'bg-slate-950', softBg: 'bg-slate-900', border: 'border-slate-700', text: 'text-slate-100', muted: 'text-slate-400', header: 'dark', compact: true, photo: 'none' },
  academic:   { accent: 'text-emerald-900', accentText: 'text-emerald-700', accentBg: 'bg-white', softBg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-950', muted: 'text-slate-600', header: 'center', serif: true, photo: 'none' },
  bold:       { accent: 'text-orange-800', accentText: 'text-orange-700', accentBg: 'bg-orange-900', softBg: 'bg-orange-50', border: 'border-orange-300', text: 'text-slate-900', muted: 'text-slate-600', header: 'dark', photo: 'none' },
  nordic:     { accent: 'text-sky-800', accentText: 'text-sky-700', accentBg: 'bg-slate-800', softBg: 'bg-sky-50', border: 'border-slate-300', text: 'text-slate-900', muted: 'text-slate-500', header: 'split', photo: 'circle' },
  monochrome: { accent: 'text-zinc-900', accentText: 'text-zinc-700', accentBg: 'bg-zinc-900', softBg: 'bg-zinc-100', border: 'border-zinc-300', text: 'text-zinc-900', muted: 'text-zinc-500', header: 'classic', photo: 'none' },
  startup:    { accent: 'text-indigo-700', accentText: 'text-teal-600', accentBg: 'bg-indigo-950', softBg: 'bg-teal-50', border: 'border-indigo-200', text: 'text-slate-900', muted: 'text-slate-600', header: 'dark', photo: 'circle' },
  editorial:  { accent: 'text-stone-900', accentText: 'text-rose-700', accentBg: 'bg-stone-100', softBg: 'bg-stone-50', border: 'border-stone-400', text: 'text-stone-900', muted: 'text-stone-600', header: 'editorial', serif: true, photo: 'none' },
};

function CVRenderer({ template, data }: { template: TemplateId; data: CVData }) {
  const { personalInfo, summary, experiences, education, skills, languages, interests } = data;
  const cfg = TEMPLATE_CONFIG[template] || TEMPLATE_CONFIG.classic;
  const compact = cfg.compact;
  const pageClass = `printable-cv w-[210mm] min-h-[297mm] mx-auto box-border shadow-2xl text-xs overflow-hidden ${cfg.text} ${cfg.serif ? 'font-serif' : 'font-sans'} ${template === 'tech' ? 'bg-slate-950' : template === 'minimal' ? 'bg-[#FAF9F6]' : 'bg-white'}`;
  const sectionTitle = `text-[11px] font-bold uppercase tracking-wider ${cfg.accent} border-b ${cfg.border} pb-1 mb-2`;
  const bodyText = compact ? 'text-[10px]' : 'text-[11px]';
  const gap = compact ? 'space-y-3' : 'space-y-5';

  const Photo = ({ dark = false }: { dark?: boolean }) => {
    if (!personalInfo.photoUrl || cfg.photo === 'none') return null;
    const shape = cfg.photo === 'circle' ? 'rounded-full' : 'rounded-xl';
    return (
      <img
        src={personalInfo.photoUrl}
        alt="Profil"
        className={`w-20 h-20 ${shape} object-cover border-2 ${dark ? 'border-white/70' : cfg.border}`}
      />
    );
  };

  const Contact = ({ dark = false }: { dark?: boolean }) => (
    <div className={`space-y-1 ${bodyText} ${dark ? 'text-slate-300' : cfg.muted}`}>
      {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
      {personalInfo.phone && <p>{personalInfo.phone}</p>}
      {personalInfo.city && <p>{personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</p>}
      {personalInfo.website && <p className={dark ? cfg.accentText : cfg.accentText}>{personalInfo.website}</p>}
    </div>
  );

  const Summary = () => summary ? (
    <section className={`${compact ? 'mb-3' : 'mb-5'} ${template === 'tech' ? 'bg-slate-900 p-3 rounded border border-slate-800' : ''}`}>
      <h2 className={sectionTitle}>{template === 'tech' ? '// ABOUT_ME' : 'Profil professionnel'}</h2>
      <p className={`${cfg.muted} ${bodyText} leading-relaxed`}>{summary}</p>
    </section>
  ) : null;

  const Experiences = () => experiences.length ? (
    <section>
      <h2 className={sectionTitle}>{template === 'tech' ? '> EXPERIENCE_HISTORY' : 'Expériences professionnelles'}</h2>
      <div className={compact ? 'space-y-2.5' : 'space-y-4'}>
        {experiences.map((exp) => (
          <article key={exp.id} className={template === 'tech' ? 'bg-slate-900/70 border border-slate-800 rounded p-2.5' : template === 'editorial' ? 'border-l-2 border-stone-900 pl-3' : ''}>
            <div className="flex justify-between gap-3 items-baseline">
              <div className="min-w-0">
                <div className={`font-bold ${bodyText} truncate`}>{exp.position || 'Poste'}</div>
                <div className={`text-[10px] font-semibold ${cfg.accentText}`}>{exp.company}{exp.city ? ` • ${exp.city}` : ''}</div>
              </div>
              <span className={`text-[9px] whitespace-nowrap ${cfg.muted}`}>
                {exp.startDate}{exp.startDate && (exp.isCurrent || exp.endDate) ? ' - ' : ''}{exp.isCurrent ? 'Présent' : exp.endDate}
              </span>
            </div>
            {exp.description && <p className={`${cfg.muted} text-[10px] leading-relaxed mt-1.5`}>{exp.description}</p>}
          </article>
        ))}
      </div>
    </section>
  ) : null;

  const Education = () => education.length ? (
    <section>
      <h2 className={sectionTitle}>{template === 'academic' ? 'Cursus & diplômes' : 'Formation'}</h2>
      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        {education.map((edu) => (
          <article key={edu.id} className={template === 'editorial' ? 'border-b border-stone-200 pb-2' : ''}>
            <div className="flex justify-between gap-3 items-baseline">
              <div>
                <div className={`font-bold ${bodyText}`}>{edu.degree || 'Diplôme'}</div>
                <div className={`text-[10px] ${cfg.muted}`}>{edu.school}{edu.city ? ` • ${edu.city}` : ''}</div>
              </div>
              <span className={`text-[9px] whitespace-nowrap ${cfg.muted}`}>{edu.startDate} - {edu.endDate}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  ) : null;

  const Skills = () => skills.length ? (
    <section className={`${template === 'tech' || template === 'creative' || template === 'bold' ? cfg.softBg : ''} ${template === 'tech' ? 'p-3 rounded border border-slate-800' : template === 'creative' || template === 'bold' ? 'p-3 rounded-xl border' + ' ' + cfg.border : ''}`}>
      <h2 className={sectionTitle}>Compétences</h2>
      <div className="space-y-1.5">
        {skills.map((s) => (
          <div key={s.id} className={`flex justify-between gap-2 ${bodyText}`}>
            <span className="truncate">{s.name}</span>
            <span className={`text-[9px] ${cfg.accentText} whitespace-nowrap`}>{s.level}</span>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const Languages = () => languages.length ? (
    <section className={`${template === 'tech' || template === 'creative' ? cfg.softBg : ''} ${template === 'tech' || template === 'creative' ? 'p-3 rounded border ' + cfg.border : ''}`}>
      <h2 className={sectionTitle}>Langues</h2>
      <div className="space-y-1.5">
        {languages.map((l) => (
          <div key={l.id} className={`flex justify-between gap-2 ${bodyText}`}>
            <span>{l.name}</span>
            <span className={`text-[9px] ${cfg.muted}`}>{l.level}</span>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const Interests = () => interests.length ? (
    <section>
      <h2 className={sectionTitle}>Centres d'intérêt</h2>
      <div className="flex flex-wrap gap-1.5">
        {interests.map((item) => (
          <span key={item.id} className={`text-[9px] px-2 py-1 rounded ${cfg.softBg} ${cfg.muted}`}>
            {item.name}
          </span>
        ))}
      </div>
    </section>
  ) : null;

  const MainColumns = ({ sidebar = false }: { sidebar?: boolean }) => (
    <div className={`grid ${sidebar ? 'grid-cols-3' : 'grid-cols-3'} gap-6`}>
      <main className="col-span-2 space-y-5 min-w-0">
        <Experiences />
        <Education />
      </main>
      <aside className="space-y-5 min-w-0">
        <Skills />
        <Languages />
        <Interests />
      </aside>
    </div>
  );

  // 1. CLASSIC
  if (template === 'classic') {
    return (
      <div className={`${pageClass} p-10`}>
        <header className="border-b-2 border-gray-900 pb-4 mb-5 flex justify-between items-end gap-6">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-wide">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
            <p className="text-sm font-semibold text-gray-600 mt-1">{personalInfo.title || 'Titre du poste'}</p>
          </div>
          <Contact />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 2. MODERN PREMIUM
  if (template === 'modern') {
    return (
      <div className={`${pageClass} p-8`}>
        <header className="bg-slate-900 text-white -m-8 mb-6 p-6 border-b-4 border-cyan-500 flex items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            <Photo dark />
            <div className="min-w-0">
              <h1 className="text-2xl font-black uppercase truncate">{personalInfo.firstName || 'Prénom'} <span className="text-cyan-400">{personalInfo.lastName || 'Nom'}</span></h1>
              <p className="text-xs text-slate-300 uppercase tracking-widest mt-1">{personalInfo.title || 'Titre du poste'}</p>
            </div>
          </div>
          <Contact dark />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 3. EXECUTIVE DARK
  if (template === 'executive') {
    return (
      <div className={`${pageClass} flex`}>
        <aside className="w-1/3 bg-slate-900 text-white p-6 space-y-5">
          <Photo dark />
          <div>
            <h1 className="text-xl font-bold uppercase leading-tight">{personalInfo.firstName || 'Prénom'}<br /><span className="text-amber-500">{personalInfo.lastName || 'Nom'}</span></h1>
            <p className="text-[10px] text-slate-400 mt-1">{personalInfo.title || 'Titre du poste'}</p>
          </div>
          <Contact dark />
          <div className="border-t border-slate-800 pt-4 space-y-4">
            <Skills />
            <Languages />
            <Interests />
          </div>
        </aside>
        <main className="w-2/3 p-8 space-y-5">
          <Summary />
          <Experiences />
          <Education />
        </main>
      </div>
    );
  }

  // 4. MINIMALIST ZEN
  if (template === 'minimal') {
    return (
      <div className={`${pageClass} p-10 text-center`}>
        <header className="border-b border-stone-300 pb-6 mb-5">
          <div className="flex justify-center mb-3"><Photo /></div>
          <h1 className="text-2xl font-light tracking-[0.18em] uppercase">{personalInfo.firstName || 'Prénom'} <span className="font-semibold">{personalInfo.lastName || 'Nom'}</span></h1>
          <p className="text-xs text-emerald-700 uppercase tracking-wider mt-1">{personalInfo.title || 'Titre du poste'}</p>
          <div className="flex justify-center mt-3"><Contact /></div>
        </header>
        <div className="max-w-2xl mx-auto text-left space-y-5">
          {summary && <div className="text-center"><p className="text-[11px] italic text-stone-600 leading-relaxed">{summary}</p></div>}
          <Experiences />
          <Education />
          <div className="grid grid-cols-2 gap-6 border-t border-stone-200 pt-4">
            <Skills /><Languages />
          </div>
          <Interests />
        </div>
      </div>
    );
  }

  // 5. CREATIVE STUDIO
  if (template === 'creative') {
    return (
      <div className={`${pageClass} p-8`}>
        <header className="bg-gradient-to-r from-purple-700 to-pink-600 text-white -m-8 mb-6 p-6 rounded-b-2xl flex items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0"><Photo dark /><div><h1 className="text-2xl font-black uppercase">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1><p className="text-xs text-pink-100 uppercase tracking-wider">{personalInfo.title || 'Titre du poste'}</p></div></div>
          <Contact dark />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 6. COMPACT PRO
  if (template === 'compact') {
    return (
      <div className={`${pageClass} p-7`}>
        <header className="border-l-8 border-blue-800 pl-4 pb-3 mb-4">
          <h1 className="text-2xl font-black">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
          <p className="text-xs text-blue-700 font-bold uppercase">{personalInfo.title || 'Titre du poste'}</p>
          <div className="mt-2"><Contact /></div>
        </header>
        <Summary />
        <div className="grid grid-cols-3 gap-4">
          <main className="col-span-2 space-y-3"><Experiences /><Education /></main>
          <aside className="space-y-3"><Skills /><Languages /><Interests /></aside>
        </div>
      </div>
    );
  }

  // 7. ÉLÉGANT PRESTIGE
  if (template === 'elegant') {
    return (
      <div className={`${pageClass} p-10`}>
        <header className="text-center border-y border-rose-200 py-5 mb-6">
          <div className="flex justify-center mb-3"><Photo /></div>
          <h1 className="text-3xl font-semibold tracking-wide">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
          <p className="text-xs uppercase tracking-[0.25em] text-rose-700 mt-2">{personalInfo.title || 'Titre du poste'}</p>
          <div className="flex justify-center mt-3"><Contact /></div>
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 8. CORPORATE NAVY
  if (template === 'corporate') {
    return (
      <div className={`${pageClass} flex`}>
        <aside className="w-[34%] bg-blue-950 text-white p-6 space-y-5">
          <Photo dark />
          <h1 className="text-xl font-bold">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-wider">{personalInfo.title || 'Titre du poste'}</p>
          <Contact dark />
          <Skills /><Languages />
        </aside>
        <main className="w-[66%] p-8 space-y-5">
          <Summary /><Experiences /><Education /><Interests />
        </main>
      </div>
    );
  }

  // 9. TECH & DATA
  if (template === 'tech') {
    return (
      <div className={`${pageClass} p-7 font-mono`}>
        <header className="border-b border-emerald-500/40 pb-4 mb-4 flex justify-between gap-5">
          <div><h1 className="text-2xl font-bold text-emerald-400">&gt; {personalInfo.firstName || 'Developer'}_{personalInfo.lastName || 'User'}</h1><p className="text-[10px] text-slate-400">// {personalInfo.title || 'Fullstack Engineer'}</p></div>
          <Contact dark />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 10. ACADÉMIQUE
  if (template === 'academic') {
    return (
      <div className={`${pageClass} p-10`}>
        <header className="text-center border-b-2 border-emerald-800 pb-5 mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
          <p className="italic text-emerald-700 mt-1">{personalInfo.title || 'Titre du poste'}</p>
          <div className="flex justify-center mt-2"><Contact /></div>
        </header>
        <Summary />
        <Education />
        <div className="mt-5"><Experiences /></div>
        <div className="grid grid-cols-2 gap-6 border-t border-emerald-200 pt-4 mt-5"><Skills /><Languages /></div>
        <div className="mt-4"><Interests /></div>
      </div>
    );
  }

  // 11. BOLD IMPACT
  if (template === 'bold') {
    return (
      <div className={`${pageClass} p-8`}>
        <header className="bg-orange-900 text-white -m-8 mb-6 p-6 flex justify-between items-center gap-5">
          <div><h1 className="text-3xl font-black uppercase">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1><p className="text-xs text-orange-200 uppercase tracking-widest">{personalInfo.title || 'Titre du poste'}</p></div>
          <Contact dark />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 12. NORDIC MINIMAL
  if (template === 'nordic') {
    return (
      <div className={`${pageClass} p-9`}>
        <header className="flex items-center gap-5 border-b border-slate-300 pb-5 mb-5">
          <Photo />
          <div className="flex-grow"><h1 className="text-2xl font-light tracking-wide">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1><p className="text-xs text-sky-700 uppercase tracking-wider">{personalInfo.title || 'Titre du poste'}</p></div>
          <Contact />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 13. MONOCHROME PRO
  if (template === 'monochrome') {
    return (
      <div className={`${pageClass} p-9`}>
        <header className="border-b-4 border-zinc-900 pb-4 mb-5">
          <h1 className="text-3xl font-black uppercase tracking-tight">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
          <div className="flex justify-between items-end mt-2"><p className="font-bold text-zinc-600 uppercase text-xs">{personalInfo.title || 'Titre du poste'}</p><Contact /></div>
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 14. STARTUP VIBE
  if (template === 'startup') {
    return (
      <div className={`${pageClass} p-8`}>
        <header className="bg-gradient-to-r from-indigo-950 to-teal-700 text-white -m-8 mb-6 p-6 rounded-b-3xl flex items-center gap-5">
          <Photo dark />
          <div className="flex-grow"><h1 className="text-2xl font-black">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1><p className="text-xs text-teal-100 uppercase tracking-wider">{personalInfo.title || 'Titre du poste'}</p></div>
          <Contact dark />
        </header>
        <Summary />
        <MainColumns />
      </div>
    );
  }

  // 15. ÉDITORIAL JOURNAL
  return (
    <div className={`${pageClass} p-10`}>
      <header className="grid grid-cols-3 gap-5 border-y-4 border-stone-900 py-5 mb-6">
        <div className="col-span-2">
          <div className="text-[9px] uppercase tracking-[0.3em] text-rose-700 mb-2">Curriculum Vitae</div>
          <h1 className="text-3xl font-black uppercase leading-none">{personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}</h1>
          <p className="mt-2 text-sm italic">{personalInfo.title || 'Titre du poste'}</p>
        </div>
        <Contact />
      </header>
      <Summary />
      <div className="grid grid-cols-3 gap-7">
        <main className="col-span-2 space-y-5"><Experiences /><Education /></main>
        <aside className="space-y-5 border-l border-stone-300 pl-5"><Skills /><Languages /><Interests /></aside>
      </div>
    </div>
  );
}

// --- DONNÉES INITIALES DU FORMULAIRE ---
const initialCVData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    website: '',
    photoUrl: '',
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  interests: [],
};

export default function CreateCVPage() {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [template, setTemplate] = useState<TemplateId>('classic');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Upload Photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photoUrl: reader.result as string },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, photoUrl: '' },
    }));
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  // Handlers CRUD
  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { id: Date.now().toString(), company: '', position: '', city: '', startDate: '', endDate: '', isCurrent: false, description: '' }],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const deleteExperience = (id: string) => {
    setCvData((prev) => ({ ...prev, experiences: prev.experiences.filter((exp) => exp.id !== id) }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', city: '', startDate: '', endDate: '' }],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const deleteEducation = (id: string) => {
    setCvData((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }));
  };

  const addSkill = () => {
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), name: '', level: 'Avancé' }],
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const deleteSkill = (id: string) => {
    setCvData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const addLanguage = () => {
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now().toString(), name: 'Français', level: 'Langue maternelle' }],
    }));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    }));
  };

  const deleteLanguage = (id: string) => {
    setCvData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  };

  const addInterest = () => {
    setCvData((prev) => ({
      ...prev,
      interests: [...prev.interests, { id: Date.now().toString(), name: '' }],
    }));
  };

  const updateInterest = (id: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      interests: prev.interests.map((item) => (item.id === id ? { ...item, name: value } : item)),
    }));
  };

  const deleteInterest = (id: string) => {
    setCvData((prev) => ({ ...prev, interests: prev.interests.filter((item) => item.id !== id) }));
  };

  const activeTemplateObj = TEMPLATES.find((t) => t.id === template);

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .cv-preview-wrapper {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            max-height: none !important;
            overflow: visible !important;
            display: block !important;
          }
          .cv-preview-scale {
            transform: scale(1) !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .printable-cv {
            box-shadow: none !important;
            margin: 0 auto !important;
            width: 210mm !important;
            min-height: 297mm !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        {/* BARRE DE NAVIGATION */}
        <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 no-print">
          <div className="flex items-center gap-4">
            <Link href="/cv" className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span>←</span> Retour
            </Link>
            <div className="h-4 w-px bg-slate-800" />
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Créateur de CV Pro (15 Modèles)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition shadow-md hover:border-slate-600"
            >
              <span className="text-base">🎨</span>
              <span>Modèle : <strong className="text-indigo-400 font-bold">{activeTemplateObj?.name || 'Classique'}</strong></span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-95"
            >
              <span>🖨️</span> Imprimer / PDF
            </button>
          </div>
        </header>

        {/* CONTENU : FORMULAIRE À GAUCHE / PREVIEW À DROITE */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1920px] mx-auto w-full">
          {/* FORMULAIRE GAUCHE */}
          <div className="lg:col-span-5 space-y-5 overflow-y-auto max-h-[calc(100vh-90px)] pr-2 no-print custom-scrollbar">
            {/* PHOTO */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">📷 Photo de Profil</h2>
                <span className="text-[10px] text-slate-500">Optionnel</span>
              </div>
              <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                {cvData.personalInfo.photoUrl ? (
                  <div className="relative">
                    <img src={cvData.personalInfo.photoUrl} alt="Profil" className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500" />
                    <button onClick={removePhoto} className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-5 h-5 text-[10px] font-bold flex items-center justify-center transition">✕</button>
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-[10px]">
                    Sans photo
                  </div>
                )}
                <div className="flex-grow">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="block w-full text-[11px] text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer transition"
                  />
                </div>
              </div>
            </div>

            {/* INFOS PERSONNELLES */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">👤 1. Contacts & Infos</h2>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Prénom" name="firstName" value={cvData.personalInfo.firstName} onChange={handlePersonalInfoChange} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
                <input type="text" placeholder="Nom" name="lastName" value={cvData.personalInfo.lastName} onChange={handlePersonalInfoChange} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
              </div>
              <input type="text" placeholder="Titre du poste (ex: Ingénieur Logiciel)" name="title" value={cvData.personalInfo.title} onChange={handlePersonalInfoChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="Email" name="email" value={cvData.personalInfo.email} onChange={handlePersonalInfoChange} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
                <input type="text" placeholder="Téléphone" name="phone" value={cvData.personalInfo.phone} onChange={handlePersonalInfoChange} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Ville" name="city" value={cvData.personalInfo.city} onChange={handlePersonalInfoChange} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
                <input type="text" placeholder="Pays" name="country" value={cvData.personalInfo.country} onChange={handlePersonalInfoChange} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
              </div>
              <input type="text" placeholder="Site web / Portfolio" name="website" value={cvData.personalInfo.website} onChange={handlePersonalInfoChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
            </div>

            {/* RÉSUMÉ */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-sm">
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">✍️ 2. Résumé du Profil</h2>
              <textarea rows={3} placeholder="Résumez vos compétences et objectifs..." value={cvData.summary} onChange={(e) => setCvData({ ...cvData, summary: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition" />
            </div>

            {/* EXPÉRIENCES */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">💼 3. Expériences</h2>
                <button onClick={addExperience} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm">+ Ajouter</button>
              </div>
              {cvData.experiences.map((exp, idx) => (
                <div key={exp.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Expérience #{idx + 1}</span>
                    <button onClick={() => deleteExperience(exp.id)} className="text-[11px] text-rose-400 hover:text-rose-300 font-medium transition">Supprimer</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Poste" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                    <input type="text" placeholder="Entreprise" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 items-center">
                    <input type="text" placeholder="Ville" value={exp.city} onChange={(e) => updateExperience(exp.id, 'city', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                    <label className="text-[11px] text-slate-300 flex items-center gap-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800 hover:border-slate-700 transition">
                      <input type="checkbox" checked={exp.isCurrent} onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)} className="rounded accent-indigo-500" />
                      <span>Poste actuel</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Début (ex: 2022)" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                    {!exp.isCurrent && (
                      <input type="text" placeholder="Fin (ex: 2024)" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                    )}
                  </div>
                  <textarea rows={2} placeholder="Missions réalisées..." value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                </div>
              ))}
            </div>

            {/* FORMATIONS */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">🎓 4. Formations</h2>
                <button onClick={addEducation} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm">+ Ajouter</button>
              </div>
              {cvData.education.map((edu, idx) => (
                <div key={edu.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Formation #{idx + 1}</span>
                    <button onClick={() => deleteEducation(edu.id)} className="text-[11px] text-rose-400 hover:text-rose-300 font-medium transition">Supprimer</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Diplôme" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                    <input type="text" placeholder="Université / École" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Début" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                    <input type="text" placeholder="Fin" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                  </div>
                </div>
              ))}
            </div>

            {/* COMPÉTENCES */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">⚡ 5. Compétences</h2>
                <button onClick={addSkill} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm">+ Ajouter</button>
              </div>
              {cvData.skills.map((s) => (
                <div key={s.id} className="flex gap-2 items-center">
                  <input type="text" placeholder="Ex: React, Marketing..." value={s.name} onChange={(e) => updateSkill(s.id, 'name', e.target.value)} className="flex-grow bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                  <input type="text" placeholder="Niveau" value={s.level} onChange={(e) => updateSkill(s.id, 'level', e.target.value)} className="w-28 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                  <button onClick={() => deleteSkill(s.id)} className="text-rose-400 hover:text-rose-300 p-2 text-xs transition">✕</button>
                </div>
              ))}
            </div>

            {/* LANGUES */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">🌐 6. Langues</h2>
                <button onClick={addLanguage} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm">+ Ajouter</button>
              </div>
              {cvData.languages.map((l) => (
                <div key={l.id} className="flex gap-2 items-center">
                  <select value={l.name} onChange={(e) => updateLanguage(l.id, 'name', e.target.value)} className="flex-grow bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white focus:border-indigo-500 outline-none transition">
                    {POPULAR_LANGUAGES.map((lang) => (<option key={lang} value={lang}>{lang}</option>))}
                  </select>
                  <select value={l.level} onChange={(e) => updateLanguage(l.id, 'level', e.target.value)} className="w-36 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white focus:border-indigo-500 outline-none transition">
                    {LANGUAGE_LEVELS.map((lvl) => (<option key={lvl} value={lvl}>{lvl}</option>))}
                  </select>
                  <button onClick={() => deleteLanguage(l.id)} className="text-rose-400 hover:text-rose-300 p-2 text-xs transition">✕</button>
                </div>
              ))}
            </div>

            {/* CENTRES D'INTÉRÊT */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">🎯 7. Centres d'intérêt</h2>
                <button onClick={addInterest} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm">+ Ajouter</button>
              </div>
              {cvData.interests.map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <input type="text" placeholder="Ex: Musique, Voyage..." value={item.name} onChange={(e) => updateInterest(item.id, e.target.value)} className="flex-grow bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-white focus:border-indigo-500 outline-none transition" />
                  <button onClick={() => deleteInterest(item.id)} className="text-rose-400 hover:text-rose-300 p-2 text-xs transition">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* APERÇU RENDU À DROITE */}
          <div className="lg:col-span-7 flex justify-center items-start overflow-y-auto max-h-[calc(100vh-90px)] cv-preview-wrapper bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
            <div className="cv-preview-scale origin-top transition-all">
              <CVRenderer template={template} data={cvData} />
            </div>
          </div>
        </div>
      </div>

      {/* MODALE DE SÉLECTION DES 15 MODÈLES */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center sticky top-0 bg-slate-900 pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Choisir parmi les 15 modèles de CV</h3>
                <p className="text-xs text-slate-400">Cliquez sur un modèle pour l'appliquer immédiatement</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTemplate(t.id); setIsModalOpen(false); }}
                  className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                    template === t.id ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500' : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="h-52 rounded-lg bg-slate-800/60 border border-slate-800 overflow-hidden mb-3 flex items-start justify-center">
                    <div
                      className="origin-top"
                      style={{ width: '210mm', transform: 'scale(0.22)', transformOrigin: 'top center', marginBottom: '-210mm' }}
                    >
                      <CVRenderer template={t.id} data={cvData} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{t.name}</span>
                      <span className="text-[9px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono whitespace-nowrap">{t.tag}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{t.desc}</p>
                  </div>
                  {template === t.id && (
                    <span className="text-[10px] text-cyan-400 font-bold mt-3 flex items-center gap-1">✓ Modèle Actif</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}