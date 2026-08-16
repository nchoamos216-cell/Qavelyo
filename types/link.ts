export type LinkPlatform = 
  | 'website' 
  | 'whatsapp' 
  | 'instagram' 
  | 'tiktok' 
  | 'facebook' 
  | 'linkedin' 
  | 'github' 
  | 'youtube' 
  | 'email' 
  | 'custom';

export interface UserLink {
  id: string;
  platform: LinkPlatform;
  title: string;
  url: string;
  enabled: boolean;
  clicks: number;
}

export interface UserProfile {
  username: string;
  name: string;
  profession: string;
  bio: string;
  avatar?: string; // Ajouté pour éliminer l'erreur rouge dans le layout
  avatarUrl: string;
  theme: 'dark' | 'light';
  primaryColor: string;
  buttonStyle: 'rounded-xl' | 'pill' | 'sharp';
  themeStyle?: 'rounded' | 'pill' | 'sharp';
  backgroundStyle: 'solid' | 'gradient';
  views: number;
  links: UserLink[];
}