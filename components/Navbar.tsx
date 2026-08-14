"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#05080E]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Marque */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/Qavelyo.png"
              alt="QAVELYO Logo"
              width={40}
              height={40}
              className="rounded-full border border-[#FF6B00]/40 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white group-hover:text-[#FF6B00] transition-colors">
                QAVELYO
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase -mt-1">
                TECHNOLOGY
              </span>
            </div>
          </a>

          {/* Navigation Bureau (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#produits"
              className="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors"
            >
              Produits & Apps
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors"
            >
              Services Sur-Mesure
            </a>
            <a
              href="#vision"
              className="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors"
            >
              Notre Vision
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-300 hover:text-[#FF6B00] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Bouton d'action CTA Desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="mailto:qavelyo@gmail.com"
              className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-semibold tracking-wide shadow-md shadow-[#FF6B00]/20 hover:scale-105 transition-all"
            >
              Commander un projet
            </a>
          </div>

          {/* Bouton Hamburger Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#05080E]/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          <a
            href="#produits"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-[#FF6B00]"
          >
            Produits & Apps
          </a>
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-[#FF6B00]"
          >
            Services Sur-Mesure
          </a>
          <a
            href="#vision"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-[#FF6B00]"
          >
            Notre Vision
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-[#FF6B00]"
          >
            Contact
          </a>
          <div className="pt-2">
            <a
              href="mailto:qavelyo@gmail.com"
              onClick={() => setIsOpen(false)}
              className="block text-center py-3 rounded-xl bg-[#FF6B00] text-white text-sm font-semibold"
            >
              Commander un projet
            </a>
          </div>
        </div>
      )}
    </header>
  );
}