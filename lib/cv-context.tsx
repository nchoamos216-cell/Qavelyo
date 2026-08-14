'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CVData, TemplateId } from '@/types/cv';

const STORAGE_KEY = 'qavelyo_cv_data';

export const initialCVData: CVData = {
  id: 'default-cv',
  templateId: 'qavelyo-modern',
  personalInfo: {
    firstName: 'Alexandre',
    lastName: 'Kouassi',
    title: 'Développeur Full Stack',
    email: 'alex.kouassi@qavelyo.com',
    phone: '+225 07 00 00 00 00',
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    website: 'https://qavelyo.com',
    linkedin: 'linkedin.com/in/alexkouassi',
    photoUrl: '',
  },
  summary: 'Développeur passionné par la création de solutions numériques modernes, accessibles et performantes. Spécialisé en React, Next.js et TypeScript, je conçois des produits numériques utiles répondant aux besoins réels.',
  experiences: [
    {
      id: 'exp-1',
      position: 'Développeur Web Full Stack',
      company: 'Tech Solutions',
      city: 'Abidjan',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      description: 'Conception et développement de solutions web sur mesure avec Next.js et Tailwind CSS. Intégration d\'APIs RESTful et optimisation des performances utilisateur.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master en Génie Logiciel',
      school: 'Université Virtuelle',
      city: 'Abidjan',
      startDate: '2020-10',
      endDate: '2022-07',
      isCurrent: false,
      description: 'Spécialisation en architectures logicielles et développement web moderne.',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript', level: 'Avancé' },
    { id: 'sk-2', name: 'React / Next.js', level: 'Expert' },
    { id: 'sk-3', name: 'Tailwind CSS', level: 'Expert' },
    { id: 'sk-4', name: 'Node.js', level: 'Intermédiaire' },
  ],
  languages: [
    { id: 'lang-1', name: 'Français', level: 'Langue maternelle' },
    { id: 'lang-2', name: 'Anglais', level: 'Courant' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'QAVELYO CV',
      description: 'Générateur de CV professionnel en ligne au format A4 avec prévisualisation en temps réel et export PDF direct.',
      technologies: 'Next.js, TypeScript, Tailwind CSS',
      link: 'https://qavelyo.com',
    },
  ],
  interests: [
    { id: 'int-1', name: 'Technologies Open Source' },
    { id: 'int-2', name: 'Entrepreneuriat Tech' },
    { id: 'int-3', name: 'Lecture' },
  ],
  references: [],
  updatedAt: new Date().toISOString(),
};

interface CVContextType {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  setTemplate: (templateId: TemplateId) => void;
  resetCVData: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger depuis le localStorage au premier rendu
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCVData(JSON.parse(saved));
      } catch (error) {
        console.error('Erreur lors du chargement des données locales du CV:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans le localStorage à chaque changement
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData, isLoaded]);

  const updatePersonalInfo = (info: Partial<CVData['personalInfo']>) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateSummary = (summary: string) => {
    setCVData((prev) => ({
      ...prev,
      summary,
      updatedAt: new Date().toISOString(),
    }));
  };

  const setTemplate = (templateId: TemplateId) => {
    setCVData((prev) => ({
      ...prev,
      templateId,
      updatedAt: new Date().toISOString(),
    }));
  };

  const resetCVData = () => {
    setCVData(initialCVData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCVData,
        updatePersonalInfo,
        updateSummary,
        setTemplate,
        resetCVData,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV doit être utilisé dans un CVProvider');
  }
  return context;
};