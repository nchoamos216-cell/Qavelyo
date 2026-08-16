'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#05080E] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Effet de lueur d'arrière-plan aux couleurs Qavelyo */}
      <div className="absolute w-[500px] h-[500px] bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none -top-32 -left-32"></div>
      
      <div className="max-w-md w-full bg-white/[0.03] border border-white/10 p-8 rounded-3xl space-y-6 backdrop-blur-xl relative z-10 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#ff9e53] flex items-center justify-center font-extrabold text-xl mx-auto shadow-lg shadow-[#FF6B00]/30 text-white">
            Q
          </div>
          <div>
            <span className="text-[#FF6B00] font-mono text-[10px] uppercase tracking-widest bg-[#FF6B00]/10 px-3 py-1 rounded-full border border-[#FF6B00]/20">
              QAVELYO LINK
            </span>
            <h1 className="text-2xl font-extrabold mt-2 text-white">Connexion Espace Pro</h1>
          </div>
          <p className="text-slate-400 text-xs">Connectez-vous pour administrer votre page de liens</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium animate-shake">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] font-extrabold text-sm transition-all shadow-lg shadow-[#FF6B00]/25 disabled:opacity-50 mt-2 cursor-pointer text-white"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter au Dashboard'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/5">
          <Link href="/qavelyo-link" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Retour à l'accueil Qavelyo Link
          </Link>
        </div>
      </div>
    </div>
  );
}