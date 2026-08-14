import type { Metadata } from 'next';
import { CVProvider } from '@/lib/cv-context';

export const metadata: Metadata = {
  title: 'QAVELYO CV — Créez votre CV professionnel gratuitement',
  description: 'Créez facilement un CV professionnel, moderne et prêt à télécharger avec QAVELYO CV.',
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CVProvider>
      <div className="min-h-screen bg-[#05080E] text-slate-100 flex flex-col font-sans antialiased">
        {children}
      </div>
    </CVProvider>
  );
}