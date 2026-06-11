import { test, expect, request } from "@playwright/test";
import { readFileSync } from "fs";
import { resolve } from "path";

const NEW_SLUGS = [
  "automatizar-tarefas-com-ia-n8n-make",
  "como-configurar-2fa-em-tudo",
  "como-configurar-cron-jobs-linux",
  "como-configurar-firewall-ufw-linux",
  "como-configurar-rede-linux-netplan",
  "como-configurar-vlan-rede-corporativa",
  "como-criar-imagens-com-stable-diffusion",
  "como-criar-prompts-eficazes-chatgpt",
  "como-criar-script-bash-iniciantes",
  "como-detectar-invasao-rede",
  "como-fazer-backup-completo-windows-11",
  "como-fazer-overclock-cpu-com-seguranca",
  "como-fazer-pentest-basico-rede",
  "como-fazer-upgrade-ssd-nvme",
  "como-instalar-lamp-stack-ubuntu",
  "como-instalar-postgresql-linux",
  "como-instalar-windows-11-do-zero",
  "como-monitorar-servidor-linux",
  "como-montar-pc-gamer-2026",
  "como-proteger-rede-wifi-empresa",
  "como-recuperar-conta-hackeada",
  "como-recuperar-dados-hd-com-defeito",
  "como-resolver-tela-azul-windows",
  "como-rodar-ia-localmente-no-pc",
  "como-treinar-ia-customizada-fine-tuning",
  "como-trocar-tela-notebook-passo-a-passo",
  "como-usar-rsync-backup-linux",
  "como-usar-systemd-linux",
  "diferenca-llm-machine-learning-deep-learning",
  "ia-para-criacao-conteudo-profissional",
  "melhores-antivirus-2026-comparativo",
  "melhores-ias-para-programacao-2026",
];

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:4173";

test.describe("32 novas URLs do blog", () => {
  test("todas constam no public/sitemap.xml", () => {
    const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
    for (const slug of NEW_SLUGS) {
      expect(xml, `slug ${slug} ausente do sitemap`).toContain(`/blog/${slug}</loc>`);
    }
  });

  test("cada URL responde 200 e tem canonical + H1 único", async ({ page }) => {
    test.setTimeout(120_000);
    for (const slug of NEW_SLUGS) {
      const resp = await page.goto(`${BASE}/blog/${slug}`, { waitUntil: "domcontentloaded" });
      expect(resp?.status(), `status para ${slug}`).toBe(200);

      // canonical correto
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, `canonical em ${slug}`).toBe(
        `https://tecnicocuritiba.com.br/blog/${slug}`
      );

      // H1 único
      const h1s = await page.locator("h1").count();
      expect(h1s, `H1 count em ${slug}`).toBe(1);

      // título e description presentes
      await expect(page).toHaveTitle(/.+/);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc && desc.length > 20, `description em ${slug}`).toBeTruthy();
    }
  });
});
