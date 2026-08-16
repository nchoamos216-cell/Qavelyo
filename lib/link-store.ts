import { UserProfile, UserLink } from '@/types/link';

const PROFILE_KEY = 'qavelyo_link_profile';

const DEFAULT_PROFILE: UserProfile = {
  username: '',
  name: '',
  profession: '',
  bio: '',
  avatarUrl: '',
  theme: 'dark',
  primaryColor: '#FF6B00',
  buttonStyle: 'rounded-xl',
  backgroundStyle: 'solid',
  views: 0,
  links: [],
};

export function getCurrentProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }
  try {
    const parsed = JSON.parse(stored);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getLinks(): UserLink[] {
  const profile = getCurrentProfile();
  return profile.links || [];
}

export function saveLinks(links: UserLink[]): void {
  const profile = getCurrentProfile();
  profile.links = links;
  saveProfile(profile);
}

export function getProfileByUsername(username: string): { profile: UserProfile; links: UserLink[] } | null {
  const profile = getCurrentProfile();
  
  if (!username) return null;

  if (profile.username && profile.username.toLowerCase() === username.toLowerCase()) {
    return { profile, links: profile.links || [] };
  }
  
  return null;
}

export function incrementProfileView(): void {
  const profile = getCurrentProfile();
  profile.views = (profile.views || 0) + 1;
  saveProfile(profile);
}

// Fonction au singulier
export function incrementLinkClick(linkId: string): void {
  const profile = getCurrentProfile();
  if (!profile.links) return;
  
  profile.links = profile.links.map((l) => 
    l.id === linkId ? { ...l, clicks: (l.clicks || 0) + 1 } : l
  );
  saveProfile(profile);
}

// Alias au pluriel pour éviter définitivement l'erreur si importé avec un 's'
export const incrementLinkClicks = incrementLinkClick;