export type TemplateId = string;

export interface Experience {
  id?: string;
  title?: string;
  position?: string;
  company: string;
  location?: string;
  city?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  isCurrent?: boolean;
  description: string;
}

export interface Education {
  id?: string;
  degree: string;
  institution?: string;
  school?: string;
  location?: string;
  city?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  isCurrent?: boolean;
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
  summary?: string;
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
    website?: string;
    linkedin?: string;
    photoUrl?: string;
  };
  experiences: Experience[];
  educations?: Education[];
  education?: Education[];
  skills: Skill[];
  languages?: Language[];
}