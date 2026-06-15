import { supabase } from "@/integrations/supabase/client";

export const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8 MB
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB
export const MAX_PHOTOS = 5;
export const MIN_VIDEO_DURATION_SECONDS = 10;

export type FunnelMedia = {
  path: string; // storage path
  signedUrl: string;
  kind: "photo" | "video";
  filename: string;
  size: number;
};

/** Gera um ID de sessão estável reutilizado entre prints/uploads. */
export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("funnel_session_id");
    if (!id) {
      id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("funnel_session_id", id);
    }
    return id;
  } catch {
    return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function validateFile(file: File, kind: "photo" | "video"): string | null {
  if (kind === "photo") {
    if (!file.type.startsWith("image/")) return "Arquivo precisa ser uma imagem (JPG/PNG/WEBP).";
    if (file.size > MAX_PHOTO_BYTES) return `Foto acima de ${MAX_PHOTO_BYTES / 1024 / 1024} MB.`;
  } else {
    if (!file.type.startsWith("video/")) return "Arquivo precisa ser um vídeo (MP4/WEBM/MOV).";
    if (file.size > MAX_VIDEO_BYTES) return `Vídeo acima de ${MAX_VIDEO_BYTES / 1024 / 1024} MB.`;
  }
  return null;
}

export async function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      const d = v.duration;
      URL.revokeObjectURL(url);
      resolve(isFinite(d) ? d : 0);
    };
    v.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    v.src = url;
  });
}

export async function uploadMedia(
  file: File,
  kind: "photo" | "video",
  sessionId: string,
): Promise<FunnelMedia> {
  const ext = file.name.split(".").pop()?.toLowerCase() || (kind === "photo" ? "jpg" : "mp4");
  const safeName = `${kind}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${sessionId}/${safeName}`;

  const { error } = await supabase.storage
    .from("funnel-uploads")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);

  const { data: signed, error: signErr } = await supabase.storage
    .from("funnel-uploads")
    .createSignedUrl(path, 60 * 60 * 24); // 24h
  if (signErr || !signed) throw new Error(signErr?.message || "Falha ao gerar URL assinada");

  return {
    path,
    signedUrl: signed.signedUrl,
    kind,
    filename: file.name,
    size: file.size,
  };
}

export async function recordSubmission(payload: {
  sessionId: string;
  equipamento?: string;
  marca?: string;
  sintoma?: string;
  requiresColeta?: boolean;
  mediaPaths: string[];
  waMessage: string;
}): Promise<void> {
  const sp = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const utm = {
    utm_source: sp.get("utm_source") || undefined,
    utm_medium: sp.get("utm_medium") || undefined,
    utm_campaign: sp.get("utm_campaign") || undefined,
    utm_term: sp.get("utm_term") || undefined,
    utm_content: sp.get("utm_content") || undefined,
    gclid: sp.get("gclid") || undefined,
  };
  try {
    await supabase.from("funnel_submissions").insert({
      session_id: payload.sessionId,
      equipamento: payload.equipamento?.slice(0, 80),
      marca: payload.marca?.slice(0, 120),
      sintoma: payload.sintoma?.slice(0, 120),
      requires_coleta: !!payload.requiresColeta,
      media_paths: payload.mediaPaths,
      wa_message: payload.waMessage.slice(0, 4000),
      ...utm,
    });
  } catch (err) {
    // Não bloqueia o fluxo se a gravação falhar
    // eslint-disable-next-line no-console
    console.warn("[funnel] failed to record submission", err);
  }
}
