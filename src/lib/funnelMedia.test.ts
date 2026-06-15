import { describe, it, expect } from "vitest";
import { validateFile, MAX_PHOTO_BYTES, MAX_VIDEO_BYTES } from "./funnelMedia";

function file(name: string, type: string, size: number) {
  return new File([new Uint8Array(size)], name, { type });
}

describe("validateFile", () => {
  it("aceita foto JPG dentro do limite", () => {
    expect(validateFile(file("a.jpg", "image/jpeg", 1024), "photo")).toBeNull();
  });

  it("rejeita foto acima do limite", () => {
    const big = file("a.jpg", "image/jpeg", MAX_PHOTO_BYTES + 1);
    expect(validateFile(big, "photo")).toMatch(/Foto acima/);
  });

  it("rejeita vídeo enviado como foto", () => {
    expect(validateFile(file("a.mp4", "video/mp4", 100), "photo")).toMatch(/imagem/);
  });

  it("aceita vídeo MP4 dentro do limite", () => {
    expect(validateFile(file("a.mp4", "video/mp4", 1024), "video")).toBeNull();
  });

  it("rejeita vídeo acima do limite", () => {
    const big = file("a.mp4", "video/mp4", MAX_VIDEO_BYTES + 1);
    expect(validateFile(big, "video")).toMatch(/V[ií]deo acima/);
  });
});
