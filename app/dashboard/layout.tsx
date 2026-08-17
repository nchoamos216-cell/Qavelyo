'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
    }
    checkUser();
  }, [router]);

  const navItems = [
    { name: 'Mon Dashboard', href: '/dashboard' },
    { name: 'Liens', href: '/dashboard/links' },
    { name: 'Mon Profil', href: '/dashboard/profile' },
    { name: 'Apparence & QR', href: '/dashboard/appearance' },
    { name: 'Partager', href: '/dashboard/share' },
    { name: 'Statistiques', href: '/dashboard/analytics' },
    { name: 'Aide', href: '/dashboard/help' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#05080E] text-white flex flex-col md:flex-row font-sans">
      
      {/* BARRE DE NAVIGATION MOBILE */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#030509] sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/Qavelyo.png" alt="Logo" width={28} height={28} className="rounded-full border border-[#FF6B00]/40" />
          <span className="font-extrabold text-sm tracking-wider">QAVELYO <span className="text-[#FF6B00]">LINK</span></span>
        </Link>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white cursor-pointer"
        >
          {isMobileMenuOpen ? '✕ Fermer' : '☰ Menu'}
        </button>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#030509] border-b border-white/10 p-4 space-y-2 z-40">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                pathname === item.href ? 'bg-[#FF6B00] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-white/5 cursor-pointer"
          >
            Déconnexion
          </button>
        </div>
      )}

      {/* SIDEBAR FIXE (Desktop) */}
      <aside className="w-64 border-r border-white/10 p-6 hidden md:flex flex-col bg-[#030509] min-h-screen">
        <div className="mb-10">
          <Link href="/dashboard" className="flex items-center gap-3 group" title="Accueil Dashboard">
            <Image src="/Qavelyo.png" alt="QAVELYO Logo" width={32} height={32} className="rounded-full border border-[#FF6B00]/40 group-hover:scale-105 transition-transform" />
            <span className="font-extrabold tracking-wider text-white text-base">
              QAVELYO <span className="text-[#FF6B00]">LINK</span>
            </span>
          </Link>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-2">
          <button 
            onClick={handleLogout}
            className="text-xs text-rose-400 hover:text-rose-300 transition text-left cursor-pointer font-medium p-2 rounded-lg hover:bg-white/5"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL DES SOUS-PAGES */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}