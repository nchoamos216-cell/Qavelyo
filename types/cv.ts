export interface Experience {
  id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
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

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    title: string;
    summary: string;
  };
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}