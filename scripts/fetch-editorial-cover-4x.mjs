/**
 * Onda 4X — capa editorial com FOTOGRAFIA REAL licenciada (sem IA).
 *
 * Baixa uma foto curada manualmente no Openverse por ID fixo, recorta em
 * 1200x630 e grava em public/blog/<slug>.jpg. Fail-closed: se o download
 * falhar, nada é escrito e nenhuma atribuição é inventada.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const UA = "otecnicodeinformatica-bot/1.0 (https://otecnicodeinformatica.com.br; contato via site)";

const CURADORIA = [
  {
    slug: "como-instalar-windows-11-do-zero",
    id: "d8410e51-f4e0-4ada-be56-9aedf9858d9e",
  },
  // Onda 4Y
  {
    slug: "como-resolver-tela-azul-windows",
    id: "e259eeea-6903-44d8-aeeb-99e2b43b5d65",
  },
  {
    slug: "como-trocar-tela-notebook-passo-a-passo",
    id: "fcc0aa98-ca11-420f-b06e-ea9be3fe365f",
  },
  // Onda 4Z — origem Wikimedia Commons (o CDN do Flickr recusa o
  // download automatizado com 502; a origem é declarada por arquivo).
  {
    slug: "notebook-nao-liga-o-que-fazer",
    commons: "File:Laptop hardware.jpg",
  },
  {
    slug: "computador-lento-causas-solucoes",
    commons: "File:Actuator arm assembly of a hard disk drive.jpg",
  },
  // Onda 5A — reforma dos dois procedimentos técnicos herdados.
  {
    slug: "como-recuperar-dados-hd-com-defeito",
    commons: "File:Toshiba Laptop Hard Drive.jpg",
  },
  {
    slug: "como-fazer-upgrade-ssd-nvme",
    commons: "File:256GB 2230 NVME SSD + 256GB NGFF SSD.jpg",
  },
  // Onda 5B — cluster de redes Wi-Fi doméstica.
  {
    slug: "como-configurar-roteador-wifi-iniciantes",
    commons: "File:TP-Link TL-WR740N router HS5.jpg",
  },
  {
    slug: "como-saber-quem-esta-usando-meu-wifi",
    commons: "File:Home wifi.jpg",
  },
  // Onda 5C — cluster de segurança (antivírus e golpes on-line).
  {
    slug: "como-escolher-um-bom-antivirus",
    commons: "File:MEMZ Trojan running on Samsung N130, 13 December 2019.jpg",
  },
  {
    slug: "como-proteger-computador-golpes-internet",
    commons: "File:Computer virus scam.jpg",
  },
  // Onda 5D — cluster de manutenção física de notebook (limpeza e pasta térmica).
  {
    slug: "como-limpar-notebook-por-dentro",
    commons: "File:Laptop overheating due to dust-clogged internal heatsinks in 2.5 year old laptop.jpg",
  },
  {
    slug: "como-trocar-pasta-termica-notebook",
    commons: "File:Thermal compound Applied.JPG",
  },
  // Onda 5E — cluster de armazenamento (clonagem e segundo disco).
  {
    slug: "como-clonar-hd-para-ssd",
    commons: "File:Maxtor HDD and Intel SSD 20100117.jpg",
  },
  {
    slug: "como-instalar-segundo-ssd-notebook",
    commons: "File:WesterDigital-Black-NVMe-SSD.jpg",
  },
  // Onda 5F — continuidade empresarial (ransomware e backup em nuvem).
  {
    slug: "ransomware-como-proteger-empresa",
    commons: "File:2017 Petya cyberattack screenshot.jpg",
  },
  {
    slug: "backup-nuvem-empresas-qual-escolher",
    commons: "File:BalticServers data center.jpg",
  },
  // Onda 5G — impressora em rede e Smart TV no Wi-Fi.
  {
    slug: "como-instalar-impressora-windows-passo-a-passo",
    commons: "File:Epson-inkjet-printer.jpg",
  },
  {
    slug: "como-conectar-wifi-tv-nao-conecta",
    commons: "File:LG Smart TV WIFI + IR Remote 04.jpg",
  },
  // Onda 5H — energia e placa-mãe (diagnóstico de bancada).
  {
    slug: "como-testar-fonte-de-alimentacao-pc",
    commons: "File:ATX power supply interior.jpg",
  },
  {
    slug: "como-diagnosticar-placa-mae-defeituosa",
    commons: "File:ASRock K7VT4A Pro Mainboard.jpg",
  },
  // Onda 5I — desempenho do Windows e remoção de malware.
  {
    slug: "windows-11-lento-como-resolver",
    commons: "File:Working on my laptop.jpg",
  },
  {
    slug: "como-remover-virus-windows-iniciantes",
    commons: "File:MEMZ Trojan running on Samsung N130, 13 December 2019.jpg",
  },
];

/** Metadados + URL de uma imagem do Wikimedia Commons (licença real, sem IA). */
async function commonsInfo(title) {
  const url =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query", format: "json", titles: title, prop: "imageinfo",
      iiprop: "url|extmetadata", iiurlwidth: "1600",
    });
  const res = await fetchRetry(url);
  if (!res) return null;
  const data = await res.json();
  const page = Object.values(data?.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info) return null;
  return {
    url: info.thumburl || info.url,
    licenca: info.extmetadata?.LicenseShortName?.value ?? "",
    autor: (info.extmetadata?.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim(),
    pagina: info.descriptionurl,
  };
}

/** Fetch com retentativas — a origem (Wikimedia) recusa esporadicamente. */
async function fetchRetry(url, tries = 4) {
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "*/*" } });
      if (res.ok) return res;
    } catch { /* rede instável: nova tentativa */ }
    await new Promise((r) => setTimeout(r, 5000 * (i + 1)));
  }
  return null;
}

const DEST = resolve("public/blog");
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

for (const item of CURADORIA) {
  const alvo = resolve(DEST, `${item.slug}.jpg`);
  // Idempotente: capa já baixada não é rebaixada (evita 429 da origem).
  if (existsSync(alvo)) { console.log(`[capa] já existe ${item.slug}`); continue; }
  const meta = item.commons
    ? await commonsInfo(item.commons)
    : await (async () => {
        const r = await fetchRetry(`https://api.openverse.org/v1/images/${item.id}/`);
        return r ? await r.json() : null;
      })();
  if (!meta?.url) { console.error(`[capa] sem metadados: ${item.slug}`); process.exit(1); }
  const res = await fetchRetry(meta.url);
  if (!res) { console.error(`[capa] download falhou: ${item.slug}`); process.exit(1); }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = resolve(DEST, `${item.slug}.jpg`);
  await sharp(buf).rotate().resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  const credito = item.commons
    ? `${meta.autor} — ${meta.licenca} — ${meta.pagina}`
    : `${meta.creator} — CC ${String(meta.license).toUpperCase()} ${meta.license_version || ""} — ${meta.foreign_landing_url}`;
  console.log(`[capa] ok ${item.slug} — ${credito}`);
}
