'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleRegisterAndProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Inscription de l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const userId = authData.user?.id;

      if (userId) {
        // 2. Enregistrement automatique des informations du profil dans la table 'profiles'
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            full_name: fullName,
            username: username,
            profession: profession,
            bio: bio,
            updated_at: new Date(),
          });

        if (profileError) {
          console.error("Erreur lors de l'enregistrement du profil :", profileError.message);
        }
      }

      // 3. Redirection directe vers le Dashboard principal
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue lors de l'inscription.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full bg-[#030509] border border-white/10 p-8 sm:p-10 rounded-3xl space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#ff9e53] flex items-center justify-center font-extrabold text-xl mx-auto shadow-lg shadow-[#FF6B00]/20 text-white">
            Q
          </div>
          <h1 className="text-2xl font-extrabold text-white">Créer votre page Qavelyo</h1>
          <p className="text-slate-400 text-xs">Inscrivez-vous et configurez votre identité en un clin d'œil.</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegisterAndProfile} className="space-y-4">
          {/* Identifiants de connexion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Adresse Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full bg-[#05080E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#05080E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                required
              />
            </div>
          </div>

          <hr className="border-white/5 my-2" />

          {/* Informations du Profil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Nom et prénom</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Jean Kouassi"
                className="w-full bg-[#05080E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Nom d'utilisateur (Pseudo)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: jeankouassi"
                className="w-full bg-[#05080E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Profession / Titre</label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Ex: Développeur Fullstack & Créateur"
              className="w-full bg-[#05080E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Bio (Courte description)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              placeholder="Parlez un peu de vous..."
              className="w-full bg-[#05080E] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#FF6B00] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#ff8c38] hover:shadow-lg hover:shadow-[#FF6B00]/25 font-extrabold text-sm transition-all disabled:opacity-50 text-white cursor-pointer mt-2"
          >
            {loading ? 'Création de votre espace...' : "Créer mon compte et mon lien"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5">
          <Link href="/login" className="text-xs text-slate-400 hover:text-white transition-colors">
            Déjà un compte ? <span className="text-[#FF6B00]">Se connecter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}