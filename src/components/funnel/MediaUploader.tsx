import { useRef, useState } from "react";
import { Camera, Video, X, Upload, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  uploadMedia,
  validateFile,
  getVideoDuration,
  MIN_VIDEO_DURATION_SECONDS,
  MAX_PHOTOS,
  type FunnelMedia,
} from "@/lib/funnelMedia";

interface Props {
  sessionId: string;
  media: FunnelMedia[];
  onChange: (m: FunnelMedia[]) => void;
  requireVideo: boolean;
}

export const MediaUploader = ({ sessionId, media, onChange, requireVideo }: Props) => {
  const photoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const photos = media.filter((m) => m.kind === "photo");
  const videos = media.filter((m) => m.kind === "video");

  const handleFiles = async (files: FileList | null, kind: "photo" | "video") => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const newItems: FunnelMedia[] = [];
      for (const file of Array.from(files)) {
        if (kind === "photo" && photos.length + newItems.length >= MAX_PHOTOS) break;
        const validation = validateFile(file, kind);
        if (validation) { setError(validation); continue; }
        if (kind === "video") {
          const dur = await getVideoDuration(file);
          if (dur > 0 && dur < MIN_VIDEO_DURATION_SECONDS) {
            setError(`Vídeo precisa ter ao menos ${MIN_VIDEO_DURATION_SECONDS}s mostrando o equipamento completo.`);
            continue;
          }
        }
        const uploaded = await uploadMedia(file, kind, sessionId);
        newItems.push(uploaded);
      }
      if (newItems.length) onChange([...media, ...newItems]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload");
    } finally {
      setUploading(false);
      if (photoInput.current) photoInput.current.value = "";
      if (videoInput.current) videoInput.current.value = "";
    }
  };

  const remove = (path: string) => onChange(media.filter((m) => m.path !== path));

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 space-y-1.5">
        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Regras de envio
        </p>
        <ul className="text-[11px] text-foreground/75 leading-snug list-disc pl-4 space-y-0.5">
          <li>Mostre o equipamento <strong>completo</strong> (frente, traseira, entradas e cabos).</li>
          <li>Vídeo <strong>sem voz/fala</strong> — mute o microfone do celular.</li>
          <li>Ambiente <strong>sem ruído de fundo</strong> (TV/música/conversa).</li>
          <li>Mínimo de 10 segundos mostrando o defeito acontecendo.</li>
        </ul>
      </div>

      {/* Photos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Fotos <span className="text-muted-foreground text-xs">(mín. 1 · máx. {MAX_PHOTOS})</span>
            {photos.length > 0 && <CheckCircle2 className="inline ml-1 h-4 w-4 text-emerald-500" />}
          </p>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => photoInput.current?.click()}
            disabled={uploading || photos.length >= MAX_PHOTOS}
            className="gap-1"
          >
            <Camera className="h-3.5 w-3.5" /> Adicionar
          </Button>
        </div>
        <input
          ref={photoInput} type="file" accept="image/*" multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files, "photo")}
        />
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5">
            {photos.map((p) => (
              <div key={p.path} className="relative aspect-square rounded-md overflow-hidden border border-border bg-muted">
                <img src={p.signedUrl} alt={p.filename} className="w-full h-full object-cover" />
                <button
                  type="button" onClick={() => remove(p.path)}
                  aria-label="Remover foto"
                  className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/60 hover:bg-black/80 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Vídeo {requireVideo ? <span className="text-destructive text-xs">(obrigatório)</span> : <span className="text-muted-foreground text-xs">(opcional)</span>}
            {videos.length > 0 && <CheckCircle2 className="inline ml-1 h-4 w-4 text-emerald-500" />}
          </p>
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => videoInput.current?.click()}
            disabled={uploading || videos.length >= 1}
            className="gap-1"
          >
            <Video className="h-3.5 w-3.5" /> {videos.length ? "Trocar" : "Adicionar"}
          </Button>
        </div>
        <input
          ref={videoInput} type="file" accept="video/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files, "video")}
        />
        {videos.map((v) => (
          <div key={v.path} className="relative rounded-md overflow-hidden border border-border bg-muted">
            <video src={v.signedUrl} controls muted className="w-full max-h-48 object-contain bg-black" />
            <button
              type="button" onClick={() => remove(v.path)}
              aria-label="Remover vídeo"
              className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {uploading && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Enviando…
        </p>
      )}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
      {!uploading && media.length === 0 && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Upload className="h-3.5 w-3.5" /> Sem mídia anexada — necessário para liberar o atendimento.
        </p>
      )}
    </div>
  );
};

export default MediaUploader;
