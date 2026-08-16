export interface UserProfile {
  name: string;
  username: string;
  profession: string;
  bio: string;
  avatar: string;
  theme: 'dark' | 'light';
  buttonStyle: 'rounded' | 'pill' | 'square';
  buttonColor: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  platform: string;
  active: boolean;
  clicks: number;
}

export interface AppData {
  profile: UserProfile;
  links: LinkItem[];
  profileViews: number;
}

const DEFAULT_DATA: AppData = {
  profile: {
    name: "Utilisateur Qavelyo",
    username: "aka",
    profession: "Développeur & Créateur de solutions",
    bio: "Bienvenue sur mon univers numérique propulsé par QAVELYO LINK.",
    avatar: "",
    theme: "dark",
    buttonStyle: "rounded",
    buttonColor: "#FF6B00",
  },
  links: [
    {
      id: "1",
      title: "Mon Portfolio Pro",
      url: "https://example.com",
      icon: "🌐",
      platform: "Website",
      active: true,
      clicks: 42,
    },
    {
      id: "2",
      title: "GitHub Qavelyo",
      url: "https://github.com",
      icon: "💻",
      platform: "GitHub",
      active: true,
      clicks: 35,
    },
  ],
  profileViews: 134,
};

const STORAGE_KEY = "qavelyo_link_data_v1";

export function getAppData(): AppData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
      return DEFAULT_DATA;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Erreur de lecture du stockage local:", e);
    return DEFAULT_DATA;
  }
}

export function saveAppData(data: AppData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erreur d'écriture dans le stockage local:", e);
  }
}