import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QAVELYO — Imaginons. Développons. Transformons.',
  description: 'Solutions numériques modernes, applications web, plateformes sur-mesure et outils innovants en Afrique et dans le monde.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#05080E] text-slate-100 font-sans antialiased selection:bg-[#FF6B00] selection:text-white">
        {children}
      </body>
    </html>
  );
}