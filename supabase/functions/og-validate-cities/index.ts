// Weekly OG validation job — fetches each city URL, extracts the meta tags
// that crawlers will see (server response, no JS execution), and records
// status in public.og_validation_status.
//
// Optionally, if FB_APP_ACCESS_TOKEN is configured, also calls the Facebook
// Sharing Debugger Graph API to force a recrawl and capture FB-side errors.
// LinkedIn does not expose a public Post Inspector API — we record a best-
// effort "self-check" status (HTML fetched + og tags present).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE = "https://tecnicocuritiba.com.br";
const CITY_SLUGS = [
  "sao-paulo","rio-de-janeiro","belo-horizonte","brasilia","porto-alegre",
  "florianopolis","salvador","recife","fortaleza","manaus","campinas","goiania",
  "curitiba-nacional","belem","natal","joao-pessoa","vitoria","cuiaba",
  "campo-grande","maceio",
];

function pickMeta(html: string, attr: "property" | "name", key: string) {
  const re = new RegExp(`<meta\\s+[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']+)["']`, "i");
  const re2 = new RegExp(`<meta\\s+[^>]*content=["']([^"']+)["'][^>]*${attr}=["']${key}["']`, "i");
  return html.match(re)?.[1] ?? html.match(re2)?.[1] ?? null;
}
function pickCanonical(html: string) {
  return html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? null;
}
function pickTitle(html: string) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
}

async function checkFB(url: string, token?: string) {
  if (!token) return { status: "skipped", error: "FB_APP_ACCESS_TOKEN not configured" };
  try {
    const r = await fetch(
      `https://graph.facebook.com/v19.0/?id=${encodeURIComponent(url)}&scrape=true&access_token=${encodeURIComponent(token)}`,
      { method: "POST" },
    );
    const json = await r.json();
    if (!r.ok || json.error) {
      return { status: "error", error: json?.error?.message ?? `HTTP ${r.status}` };
    }
    return { status: "ok", error: null, raw: json };
  } catch (e) {
    return { status: "error", error: String((e as Error)?.message ?? e) };
  }
}

async function checkLinkedIn(url: string, ogImage: string | null, ogTitle: string | null) {
  // No public API. Heuristic: confirm og:image + og:title are present and
  // og:image is fetchable. LinkedIn crawler uses LinkedInBot.
  if (!ogImage || !ogTitle) {
    return { status: "missing-tags", error: "og:image or og:title missing in HTML" };
  }
  try {
    const r = await fetch(ogImage, { method: "HEAD" });
    if (!r.ok) return { status: "image-unreachable", error: `HTTP ${r.status}` };
    const len = Number(r.headers.get("content-length") ?? "0");
    if (len > 0 && len < 10_000) {
      return { status: "image-too-small", error: `Content-Length ${len} likely below LinkedIn minimum` };
    }
    return { status: "ok", error: null };
  } catch (e) {
    return { status: "error", error: String((e as Error)?.message ?? e) };
  }
}

async function validateCity(slug: string, fbToken?: string) {
  const url = `${SITE}/arrumar-pc/${slug}`;
  let html = "";
  let httpStatus = 0;
  try {
    const r = await fetch(url, {
      headers: { "user-agent": "facebookexternalhit/1.1 (compatible; OGValidator/1.0)" },
    });
    httpStatus = r.status;
    html = await r.text();
  } catch (e) {
    return {
      city_slug: slug, url, http_status: 0,
      fb_status: "skipped", fb_error: `fetch failed: ${(e as Error).message}`,
      linkedin_status: "skipped", linkedin_error: null,
      og_image: null, og_title: null, og_description: null, canonical: null,
      raw: null, checked_at: new Date().toISOString(),
    };
  }

  const og_image = pickMeta(html, "property", "og:image");
  const og_title = pickMeta(html, "property", "og:title") ?? pickTitle(html);
  const og_description = pickMeta(html, "property", "og:description")
    ?? pickMeta(html, "name", "description");
  const canonical = pickCanonical(html);

  const fb = await checkFB(url, fbToken);
  const linkedin = await checkLinkedIn(url, og_image, og_title);

  return {
    city_slug: slug, url, http_status: httpStatus,
    og_image, og_title, og_description, canonical,
    fb_status: fb.status, fb_error: fb.error,
    linkedin_status: linkedin.status, linkedin_error: linkedin.error,
    raw: (fb as { raw?: unknown }).raw ?? null,
    checked_at: new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const fbToken = Deno.env.get("FB_APP_ACCESS_TOKEN") ?? undefined;

  const url = new URL(req.url);
  const onlySlug = url.searchParams.get("cidade");
  const slugs = onlySlug ? [onlySlug] : CITY_SLUGS;

  const results = [];
  for (const slug of slugs) {
    try {
      const row = await validateCity(slug, fbToken);
      results.push(row);
    } catch (e) {
      results.push({ city_slug: slug, error: String((e as Error)?.message ?? e) });
    }
  }

  const validRows = results.filter((r) => "url" in r);
  if (validRows.length) {
    const { error } = await supabase.from("og_validation_status").insert(validRows);
    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message, results }), {
        status: 500, headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }
  }

  return new Response(
    JSON.stringify({ ok: true, count: validRows.length, results }),
    { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } },
  );
});
