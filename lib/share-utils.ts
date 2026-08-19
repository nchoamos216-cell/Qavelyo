import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 Mo max (limite Supabase)

interface CreateShareParams {
  type: 'file' | 'text' | 'link';
  file?: File;
  rawContent?: string;
}

export async function createShareSession({ type, file, rawContent }: CreateShareParams) {
  let filePath = null;
  let fileName = null;
  let fileSize = null;

  const shortCode = nanoid(5).toUpperCase();
  const accessToken = nanoid(32);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  if (type === 'file' && file) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('Le fichier est trop volumineux (Maximum 50 Mo).');
    }

    fileName = file.name;
    fileSize = file.size;
    const fileExt = file.name.split('.').pop();
    const uniqueFileName = `${nanoid(16)}.${fileExt}`;
    filePath = `uploads/${uniqueFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('qavelyo-share')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Erreur lors de l'envoi du fichier : ${uploadError.message}`);
    }
  }

  const { data, error } = await supabase
    .from('share_sessions')
    .insert([
      {
        short_code: shortCode,
        access_token: accessToken,
        file_path: filePath,
        content_type: type,
        raw_content: rawContent || null,
        file_name: fileName,
        file_size: fileSize,
        expires_at: expiresAt,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de la création de la session : ${error.message}`);
  }

  return {
    shortCode,
    accessToken,
    expiresAt,
    shareUrl: `${window.location.origin}/share/${shortCode}?token=${accessToken}`,
  };
}