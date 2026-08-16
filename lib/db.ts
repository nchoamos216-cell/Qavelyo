import { createClient } from "@supabase/supabase-js";
import { UserProfile } from "@/types/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function updateProfileInDB(profile: Partial<UserProfile> & { id?: string }) {
  try {
    // On extrait l'id proprement pour rassurer TypeScript
    const profileId = profile.id;

    // On essaie de mettre à jour ou d'insérer le profil basé sur le username ou l'id
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        ...(profileId ? { id: profileId } : {}),
        username: profile.username || "aka",
        name: profile.name,
        profession: profile.profession,
        bio: profile.bio,
        avatar_url: profile.avatarUrl || profile.avatar,
        theme: profile.theme,
        primary_color: profile.primaryColor,
        button_style: profile.buttonStyle,
        background_style: profile.backgroundStyle,
        views: profile.views || 0,
        links: profile.links || [],
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'username' // Évite les doublons en se basant sur le username
      })
      .select();

    if (error) {
      console.error("Erreur Supabase lors de l'enregistrement :", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Erreur inattendue :", err);
    return false;
  }
}