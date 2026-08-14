'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface TemplateProps {
  data: CVData;
}

export default function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experiences, education, skills, languages } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-10 shadow-2xl mx-auto font-serif text-xs leading-relaxed">
      {/* En-tête centré */}
      <header className="text-center border-b border-slate-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-sm font-medium text-slate-600 mt-1 italic">{personalInfo.title}</p>
        <div className="flex justify-center gap-3 text-[11px] text-slate-500 mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.city && <span>• {personalInfo.city}, {personalInfo.country}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase border-b border-slate-400 pb-0.5 mb-2 tracking-wider">
            Profil
          </h2>
          <p className="text-slate-700">{summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase border-b border-slate-400 pb-0.5 mb-3 tracking-wider">
            Parcours Professionnel
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{exp.position} — <span className="font-normal italic">{exp.company}</span></span>
                  <span className="text-[10px] text-slate-500">{exp.startDate} – {exp.isCurrent ? 'Présent' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-slate-600 mt-1 text-[11px]">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase border-b border-slate-400 pb-0.5 mb-3 tracking-wider">
            Diplômes et Formations
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree}</span>, <span className="italic">{edu.school}</span>
                </div>
                <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase border-b border-slate-400 pb-0.5 mb-2 tracking-wider">
            Compétences
          </h2>
          <p className="text-slate-700">
            {skills.map((s) => s.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}