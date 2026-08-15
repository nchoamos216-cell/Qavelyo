'use client';

import React, { useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Site Web / Vitrine',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nouveau projet Qavelyo de ${formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nType de projet: ${formData.projectType}\n\nDescription:\n${formData.description}`
    );
    window.location.href = `mailto:qavelyo@gmail.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#0A0F1D] rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative border border-white/10 text-white animate-in fade-in zoom-in duration-200">
        
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold tracking-wider text-[#FF6B00] uppercase px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30">
            QAVELYO SERVICES
          </span>
          <h3 className="text-2xl font-bold text-white mt-3">Commander ou parler d&apos;un projet</h3>
          <p className="text-sm text-slate-400 mt-1">
            Remplissez ce formulaire rapide pour nous présenter votre besoin. Nous vous répondrons rapidement depuis Abidjan.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center space-y-2">
            <p className="font-bold">🎉 Merci pour votre demande !</p>
            <p className="text-xs text-slate-300">Votre client mail s&apos;ouvre pour finaliser l&apos;envoi vers qavelyo@gmail.com.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Votre Nom complet</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
                placeholder="Ex: Kouassi Jean"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
                  placeholder="jean@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Téléphone / WhatsApp</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
                  placeholder="+225 07..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Type de projet</label>
              <select
                className="w-full px-4 py-2.5 bg-[#05080E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              >
                <option value="Site Web / Vitrine" className="bg-[#0A0F1D]">Sites & Plateformes Web</option>
                <option value="Application Web / SaaS" className="bg-[#0A0F1D]">Applications Web & SaaS</option>
                <option value="Système de Gestion / Réservation" className="bg-[#0A0F1D]">Systèmes de Gestion & Réservation</option>
                <option value="Autre projet sur-mesure" className="bg-[#0A0F1D]">Autre projet sur-mesure</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Parlez-nous de votre idée</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors resize-none"
                placeholder="Décrivez votre besoin, vos objectifs..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white font-semibold rounded-xl text-sm shadow-lg shadow-[#FF6B00]/25 transition-all cursor-pointer"
            >
              Envoyer ma demande de projet 🚀
            </button>
          </form>
        )}
      </div>
    </div>
  );
}