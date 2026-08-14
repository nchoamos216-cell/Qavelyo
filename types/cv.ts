export type TemplateId = string; // ou tes identifiants de templates précis si tu en as

export interface Experience {
  id?: string;
  title?: string;
  position?: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  isCurrent?: boolean;
  description: string;
}

export interface Education {
  id?: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skill {
  id?: string;
  name: string;
  level?: string;
}

export interface Language {
  id?: string;
  name: string;
  level?: string;
}

export interface CVData {
  personalInfo: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    title: string;
    summary?: string;
  };
  experiences: Experience[];
  educations?: Education[];
  education?: Education[];
  skills: Skill[];
  languages?: Language[];
}