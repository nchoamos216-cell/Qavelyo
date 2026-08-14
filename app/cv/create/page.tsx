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
function CVRenderer({ template, data }: { template: TemplateId; data: CVData }) {
  const { personalInfo, summary, experiences, education, skills, languages, interests } = data;

  // 1. MODÈLE CLASSIQUE (SIMPLE, NOIR & BLANC, ÉPURÉ)
  if (template === 'classic') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-white text-gray-900 p-10 shadow-2xl mx-auto font-sans text-xs box-border leading-relaxed">
        <header className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-wide text-black">
              {personalInfo.firstName || 'Prénom'} {personalInfo.lastName || 'Nom'}
            </h1>
            <p className="text-sm font-semibold text-gray-600 mt-1">{personalInfo.title || 'Titre du poste'}</p>
          </div>
          <div className="text-right text-[11px] text-gray-700 space-y-0.5">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.city && <p>{personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</p>}
            {personalInfo.website && <p>{personalInfo.website}</p>}
          </div>
        </header>

        {summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-2">Profil</h2>
            <p className="text-gray-700 text-[11px] leading-relaxed">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Expériences Professionnelles</h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-gray-900 text-[12px]">
                    <span>{exp.position} — <span className="font-normal text-gray-700">{exp.company}</span></span>
                    <span className="text-[10px] text-gray-500 font-normal">{exp.startDate} {exp.startDate && (exp.isCurrent || exp.endDate) ? '-' : ''} {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                  </div>
                  {exp.city && <div className="text-[10px] text-gray-500 italic">{exp.city}</div>}
                  {exp.description && <p className="text-gray-700 text-[11px] mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-1 mb-3">Formations</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <span className="font-bold text-gray-900">{edu.degree}</span>
                    <span className="text-gray-600">, {edu.school}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6 pt-2 border-t border-gray-200">
          {skills.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase border-b border-gray-300 pb-1 mb-2">Compétences</h3>
              <ul className="space-y-1 text-[11px]">
                {skills.map((s) => (
                  <li key={s.id} className="flex justify-between">
                    <span>{s.name}</span>
                    <span className="text-gray-500 text-[10px]">{s.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase border-b border-gray-300 pb-1 mb-2">Langues</h3>
              <ul className="space-y-1 text-[11px]">
                {languages.map((l) => (
                  <li key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-gray-500 text-[10px]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {interests.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase border-b border-gray-300 pb-1 mb-2">Centres d'intérêt</h3>
              <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5">
                {interests.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. EXECUTIVE DARK (SIDEBAR ARDOISE & AMBRE)
  if (template === 'executive') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl mx-auto flex font-sans text-xs box-border overflow-hidden">
        <div className="w-1/3 bg-slate-900 text-white p-6 flex flex-col gap-6">
          {personalInfo.photoUrl && (
            <div className="flex justify-center">
              <img src={personalInfo.photoUrl} alt="Profil" className="w-28 h-28 rounded-xl object-cover border-2 border-amber-500" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold uppercase text-white leading-tight">
              {personalInfo.firstName || 'Prénom'} <br />
              <span className="text-amber-500">{personalInfo.lastName || 'Nom'}</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">{personalInfo.title || 'Titre du poste'}</p>
          </div>
          <div className="space-y-2 border-t border-slate-800 pt-4 text-[11px] text-slate-300">
            <h3 className="text-xs font-bold uppercase text-amber-500 mb-1">Contact</h3>
            {personalInfo.email && <p className="truncate">📧 {personalInfo.email}</p>}
            {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
            {personalInfo.city && <p>📍 {personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</p>}
            {personalInfo.website && <p className="text-amber-500 truncate">🌐 {personalInfo.website}</p>}
          </div>
          {skills.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <h3 className="text-xs font-bold uppercase text-amber-500">Compétences</h3>
              {skills.map((s) => (
                <div key={s.id} className="flex justify-between text-[11px]">
                  <span>{s.name}</span>
                  <span className="text-slate-400 text-[10px]">{s.level}</span>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <h3 className="text-xs font-bold uppercase text-amber-500">Langues</h3>
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between text-[11px]">
                  <span>{l.name}</span>
                  <span className="text-slate-400 text-[10px]">{l.level}</span>
                </div>
              ))}
            </div>
          )}
          {interests.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <h3 className="text-xs font-bold uppercase text-amber-500">Centres d'intérêt</h3>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                {interests.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-2/3 p-8 flex flex-col gap-6">
          {summary && (
            <section>
              <h2 className="text-xs font-bold uppercase text-slate-900 border-b-2 border-amber-500/40 pb-1 mb-2">À Propos</h2>
              <p className="text-slate-600 leading-relaxed text-[12px]">{summary}</p>
            </section>
          )}
          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase text-slate-900 border-b-2 border-amber-500/40 pb-1 mb-3">Expériences</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-900 text-[12px]">
                      <span>{exp.position}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{exp.startDate} - {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-amber-600">{exp.company} {exp.city ? `• ${exp.city}` : ''}</div>
                    {exp.description && <p className="text-slate-600 text-[11px] leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase text-slate-900 border-b-2 border-amber-500/40 pb-1 mb-3">Formations</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between font-bold text-slate-800 text-[12px]">
                      <span>{edu.degree}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-slate-600 text-[11px]">{edu.school} {edu.city ? `• ${edu.city}` : ''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  return null;


  // 3. MINIMALIST ZEN (VERT SAUGE & OLIVE)
  if (template === 'minimal') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-[#FAF9F6] text-stone-800 p-10 shadow-2xl mx-auto font-sans text-xs box-border">
        <header className="mb-8 text-center border-b border-stone-300 pb-6">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="Profil" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border border-stone-300" />
          )}
          <h1 className="text-2xl font-light tracking-widest uppercase text-emerald-950">
            {personalInfo.firstName} <span className="font-semibold">{personalInfo.lastName}</span>
          </h1>
          <p className="text-xs text-emerald-700 tracking-wider uppercase mt-1">{personalInfo.title}</p>
          <div className="flex justify-center gap-4 text-[10px] text-stone-500 mt-3 flex-wrap">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.city && <span>• {personalInfo.city}</span>}
          </div>
        </header>

        {summary && (
          <section className="mb-6 max-w-xl mx-auto text-center">
            <p className="text-stone-600 italic leading-relaxed text-[11px]">{summary}</p>
          </section>
        )}

        <div className="space-y-6 max-w-2xl mx-auto">
          {experiences.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-900 border-b border-emerald-200 pb-1 mb-3">Expérience</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-stone-900 text-[12px]">{exp.position}</span>
                      <span className="text-[10px] text-stone-400">{exp.startDate} - {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                    </div>
                    <div className="text-[11px] text-emerald-700">{exp.company}</div>
                    <p className="text-stone-600 text-[11px] mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-emerald-900 border-b border-emerald-200 pb-1 mb-3">Formation</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <div className="font-semibold text-stone-900">{edu.degree}</div>
                      <div className="text-stone-500 text-[11px]">{edu.school}</div>
                    </div>
                    <span className="text-[10px] text-stone-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200">
            {skills.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900 mb-2">Compétences</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s.id} className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded border border-emerald-100">{s.name}</span>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-900 mb-2">Langues</h3>
                <div className="space-y-1 text-[11px] text-stone-600">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="text-[10px] text-stone-400">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. CREATIVE STUDIO (VIOLET & ROSE CORAIL)
  if (template === 'creative') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-white text-slate-800 p-8 shadow-2xl mx-auto font-sans text-xs box-border">
        <header className="bg-gradient-to-r from-purple-700 to-pink-600 text-white p-6 -m-8 mb-6 rounded-b-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            {personalInfo.photoUrl && (
              <img src={personalInfo.photoUrl} alt="Profil" className="w-20 h-20 rounded-full object-cover border-2 border-white/80 shadow" />
            )}
            <div>
              <h1 className="text-2xl font-black uppercase tracking-wide">{personalInfo.firstName} {personalInfo.lastName}</h1>
              <p className="text-xs text-pink-200 font-medium tracking-wider uppercase mt-0.5">{personalInfo.title}</p>
            </div>
          </div>
          <div className="text-right text-[11px] text-purple-100 space-y-1">
            {personalInfo.email && <p>✉ {personalInfo.email}</p>}
            {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
            {personalInfo.city && <p>📍 {personalInfo.city}</p>}
          </div>
        </header>

        {summary && (
          <section className="mb-6 bg-pink-50/50 p-4 rounded-xl border border-pink-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-1">À Propos</h2>
            <p className="text-slate-700 leading-relaxed text-[11px]">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">
            {experiences.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 border-b-2 border-purple-200 pb-1 mb-3">Expériences</h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-pink-400 pl-3">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.position}</span>
                        <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{exp.startDate} - {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                      </div>
                      <div className="text-[11px] text-pink-600 font-semibold">{exp.company}</div>
                      <p className="text-slate-600 text-[11px] mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 border-b-2 border-purple-200 pb-1 mb-3">Formations</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-purple-300 pl-3">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{edu.degree}</span>
                        <span className="text-[10px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">{edu.school}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-5">
            {skills.length > 0 && (
              <section className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">Skills</h2>
                <div className="space-y-1.5">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between text-[11px]">
                      <span className="font-medium text-slate-800">{s.name}</span>
                      <span className="text-[10px] text-purple-600">{s.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                <h2 className="text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">Langues</h2>
                <div className="space-y-1 text-[11px]">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-slate-500 text-[10px]">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {interests.length > 0 && (
              <section className="p-4 rounded-xl border border-slate-200">
                <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">Interêts</h2>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                  {interests.map((i) => (
                    <li key={i.id}>{i.name}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 5. TECH & DATA (MODE SOMBRE CYBER)
  if (template === 'tech') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-slate-950 text-slate-200 p-8 shadow-2xl mx-auto font-mono text-xs box-border">
        <header className="border-b border-emerald-500/40 pb-5 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400 tracking-tight">
              &gt; {personalInfo.firstName || 'Developer'}_{personalInfo.lastName || 'User'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">// {personalInfo.title || 'Fullstack Engineer'}</p>
          </div>
          <div className="text-right text-[10px] text-slate-400 space-y-0.5 border-l border-slate-800 pl-4">
            {personalInfo.email && <p>email: "{personalInfo.email}"</p>}
            {personalInfo.phone && <p>phone: "{personalInfo.phone}"</p>}
            {personalInfo.city && <p>loc: "{personalInfo.city}"</p>}
          </div>
        </header>

        {summary && (
          <section className="mb-5 bg-slate-900 p-3 rounded border border-slate-800">
            <span className="text-emerald-500 font-bold text-[10px] block mb-1">/* ABOUT_ME */</span>
            <p className="text-slate-300 text-[11px] font-sans leading-relaxed">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">
            {experiences.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1 mb-3">&gt; EXPERIENCE_HISTORY</h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-slate-900/60 p-3 rounded border border-slate-800/80">
                      <div className="flex justify-between text-slate-100 font-bold">
                        <span>{exp.position}</span>
                        <span className="text-[10px] text-emerald-500">{exp.startDate} :: {exp.isCurrent ? 'NOW' : exp.endDate}</span>
                      </div>
                      <div className="text-[11px] text-cyan-400">@ {exp.company}</div>
                      {exp.description && <p className="text-slate-400 text-[11px] font-sans mt-2">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-emerald-400 uppercase border-b border-slate-800 pb-1 mb-3">&gt; EDUCATION_LOG</h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-slate-900/40 p-2.5 rounded border border-slate-800 flex justify-between">
                      <div>
                        <div className="text-slate-200 font-bold">{edu.degree}</div>
                        <div className="text-slate-400 text-[10px]">{edu.school}</div>
                      </div>
                      <span className="text-[10px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-5">
            {skills.length > 0 && (
              <section className="bg-slate-900 p-3.5 rounded border border-slate-800">
                <h2 className="text-xs font-bold text-cyan-400 uppercase mb-2">// SKILLS</h2>
                <div className="space-y-1.5 text-[11px]">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between">
                      <span className="text-slate-300">{s.name}</span>
                      <span className="text-[9px] text-emerald-400 font-bold">{s.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section className="bg-slate-900 p-3.5 rounded border border-slate-800">
                <h2 className="text-xs font-bold text-cyan-400 uppercase mb-2">// LANGUAGES</h2>
                <div className="space-y-1 text-[11px]">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-slate-300">
                      <span>{l.name}</span>
                      <span className="text-slate-500 text-[10px]">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 6. ACADEMIC (VERT ÉMERAUDE & STRUCTURE CLASSIQUE)
  if (template === 'academic') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-white text-emerald-950 p-10 shadow-2xl mx-auto font-serif text-xs box-border">
        <header className="border-b-2 border-emerald-800 pb-4 mb-6 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-emerald-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xs italic text-emerald-700 mt-1">{personalInfo.title}</p>
          <div className="flex justify-center gap-4 text-[11px] text-emerald-800 mt-2 font-sans">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.city && <span>• {personalInfo.city}</span>}
          </div>
        </header>

        {summary && (
          <section className="mb-6 font-sans">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-300 pb-1 mb-2">Présentation Académique</h2>
            <p className="text-slate-700 text-[11px] leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-300 pb-1 mb-3">Cursus & Diplômes</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <div className="font-bold text-emerald-950 text-[12px]">{edu.degree}</div>
                    <div className="text-slate-700 font-sans text-[11px]">{edu.school} {edu.city ? `(${edu.city})` : ''}</div>
                  </div>
                  <span className="text-[11px] font-sans text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-300 pb-1 mb-3">Expériences & Recherches</h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-emerald-950">
                    <span>{exp.position} — <span className="font-normal italic">{exp.company}</span></span>
                    <span className="text-[11px] font-sans text-slate-500">{exp.startDate} - {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-slate-700 font-sans text-[11px] mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6 pt-2 font-sans border-t border-emerald-200">
          {skills.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase text-emerald-900 mb-2">Compétences Clefs</h3>
              <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-1">
                {skills.map((s) => (
                  <li key={s.id}>{s.name} <span className="text-slate-400 text-[10px]">({s.level})</span></li>
                ))}
              </ul>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h3 className="text-[11px] font-bold uppercase text-emerald-900 mb-2">Langues</h3>
              <ul className="space-y-1 text-[11px] text-slate-700">
                {languages.map((l) => (
                  <li key={l.id} className="flex justify-between">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-slate-500 text-[10px]">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 7. BOLD IMPACT (TERRAKOTTA / BRIQUE)
  if (template === 'bold') {
    return (
      <div className="printable-cv w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 shadow-2xl mx-auto font-sans text-xs box-border">
        <header className="bg-amber-900 text-amber-50 p-6 -m-8 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">{personalInfo.firstName} {personalInfo.lastName}</h1>
            <p className="text-sm font-bold text-amber-200 uppercase tracking-widest mt-1">{personalInfo.title}</p>
          </div>
          <div className="text-right text-[11px] text-amber-100 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.city && <p>{personalInfo.city}</p>}
          </div>
        </header>

        {summary && (
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-1 inline-block mb-2">Profil</h2>
            <p className="text-slate-700 font-medium text-[12px] leading-relaxed">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {experiences.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-wider text-amber-900 border-b-2 border-amber-900 pb-1 mb-3">Expériences</h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between font-extrabold text-slate-900 text-[12px]">
                        <span>{exp.position}</span>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded">{exp.startDate} - {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                      </div>
                      <div className="text-[11px] font-bold text-amber-900">{exp.company}</div>
                      <p className="text-slate-600 text-[11px] mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-wider text-amber-900 border-b-2 border-amber-900 pb-1 mb-3">Formations</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between font-bold">
                        <span>{edu.degree}</span>
                        <span className="text-[10px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">{edu.school}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            {skills.length > 0 && (
              <section className="bg-slate-50 p-4 rounded-xl border-l-4 border-amber-900">
                <h2 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2">Compétences</h2>
                <div className="space-y-1.5 font-bold text-[11px]">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between">
                      <span>{s.name}</span>
                      <span className="text-amber-800 text-[10px]">{s.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section className="bg-slate-50 p-4 rounded-xl border-l-4 border-amber-900">
                <h2 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2">Langues</h2>
                <div className="space-y-1 text-[11px]">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between font-semibold">
                      <span>{l.name}</span>
                      <span className="text-slate-500 text-[10px]">{l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MODÈLE PAR DÉFAUT / 15 MODÈLES (GENERIC REUSE / MODERN PREMIUM SI PAS CORRESPONDANCE DIRECTE)
  return (
    <div className="printable-cv w-[210mm] min-h-[297mm] bg-white text-slate-800 p-8 shadow-2xl mx-auto flex flex-col font-sans text-xs box-border overflow-hidden">
      <header className="bg-slate-900 text-white p-6 -m-8 mb-6 flex items-center justify-between border-b-4 border-cyan-500">
        <div className="flex items-center gap-5">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="Profil" className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400 shadow-md" />
          )}
          <div>
            <h1 className="text-2xl font-black tracking-tight uppercase text-white">
              {personalInfo.firstName || 'Prénom'} <span className="text-cyan-400">{personalInfo.lastName || 'Nom'}</span>
            </h1>
            <p className="text-sm font-semibold text-slate-300 uppercase tracking-widest mt-1">
              {personalInfo.title || 'Titre du poste'}
            </p>
          </div>
        </div>
        <div className="text-right space-y-1 text-[11px] text-slate-300">
          {personalInfo.email && <p>📧 {personalInfo.email}</p>}
          {personalInfo.phone && <p>📞 {personalInfo.phone}</p>}
          {personalInfo.city && <p>📍 {personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</p>}
          {personalInfo.website && <p className="text-cyan-400">🌐 {personalInfo.website}</p>}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 border-b-2 border-slate-100 pb-1 mb-2">Profil Professionnel</h2>
          <p className="text-slate-600 leading-relaxed text-justify text-[12px]">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-6 flex-grow">
        <div className="col-span-2 space-y-6">
          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 border-b-2 border-slate-100 pb-1 mb-3">Expériences</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-cyan-500/40 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[12px]">{exp.position}</span>
                      <span className="text-[10px] bg-slate-100 font-mono text-slate-600 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.isCurrent ? 'Présent' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-cyan-600">{exp.company} {exp.city ? `• ${exp.city}` : ''}</div>
                    {exp.description && <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 border-b-2 border-slate-100 pb-1 mb-3">Formations</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-[12px]">{edu.degree}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-600">{edu.school} {edu.city ? `• ${edu.city}` : ''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-3">Compétences</h2>
              <ul className="space-y-2">
                {skills.map((s) => (
                  <li key={s.id} className="flex justify-between font-semibold text-slate-800 text-[11px]">
                    <span>{s.name}</span>
                    <span className="text-[10px] text-cyan-600">{s.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-3">Langues</h2>
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.id} className="flex justify-between text-[11px]">
                    <span className="font-bold text-slate-800">{l.name}</span>
                    <span className="text-[10px] text-slate-500 italic">{l.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {interests.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-3">Centres d'intérêt</h2>
              <ul className="space-y-1.5 text-[11px] text-slate-700">
                {interests.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span className="text-cyan-500">•</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
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
                  className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between ${
                    template === t.id ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500' : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-white">{t.name}</span>
                      <span className="text-[9px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded font-mono">{t.tag}</span>
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

