import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * E2E — exposição de dados sensíveis (reviews + og_validation_status).
 *
 * Prova, contra o backend real, que:
 *  - anon NÃO lê `reviews.client_phone` nem `select=*`, e NÃO lê og_validation_status;
 *  - anon lê apenas as colunas públicas seguras de reviews;
 *  - (quando credenciais de teste são fornecidas por env) um usuário
 *    AUTENTICADO NÃO-ADMIN não recebe nenhuma review nem `client_phone`,
 *    e não lê og_validation_status.
 *
 * Usa somente a chave publishable/anon (pública). NUNCA usa service_role.
 * Credenciais de teste vêm de variáveis de ambiente e NÃO são versionadas.
 * Falha no CI em caso de regressão (surface privada torna-se acessível).
 */

// URL + chave anon públicas (mesmo par já embarcado no frontend).
const SUPABASE_URL =
  process.env.E2E_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://bwyskhzxvgyvyzshxkbf.supabase.co";
const ANON_KEY =
  process.env.E2E_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpc2VwYWF5dXd4anJudW1icWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTU3NzcsImV4cCI6MjA5OTE5MTc3N30.d3ygLv0kgEFiT4hXlp6opB9mvOPLQSwSEKXuLIle164";

const REST = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1`;
const BLOCKED = [401, 403];

// Credenciais opcionais de um usuário de teste NÃO-ADMIN (só via env).
const NONADMIN_EMAIL = process.env.E2E_NONADMIN_EMAIL;
const NONADMIN_PASSWORD = process.env.E2E_NONADMIN_PASSWORD;

async function anonGet(request: APIRequestContext, path: string) {
  return request.get(`${REST}/${path}`, { headers: { apikey: ANON_KEY } });
}

test.describe("Segurança — exposição de dados (anon)", () => {
  test("anon lê apenas colunas públicas seguras de reviews (200)", async ({ request }) => {
    const res = await anonGet(
      request,
      "reviews?select=id,author_name,rating,comment,city&limit=1",
    );
    expect(res.status(), "colunas públicas devem ser legíveis").toBe(200);
  });

  test("anon NÃO lê reviews.client_phone (bloqueado)", async ({ request }) => {
    const res = await anonGet(request, "reviews?select=id,client_phone&limit=1");
    expect(BLOCKED, `client_phone retornou ${res.status()}`).toContain(res.status());
  });

  test("anon NÃO consegue select=* em reviews (bloqueado)", async ({ request }) => {
    const res = await anonGet(request, "reviews?select=*&limit=1");
    expect(BLOCKED, `select=* retornou ${res.status()}`).toContain(res.status());
  });

  test("anon NÃO lê og_validation_status (bloqueado)", async ({ request }) => {
    const res = await anonGet(request, "og_validation_status?select=*&limit=1");
    expect(BLOCKED, `og_validation_status retornou ${res.status()}`).toContain(res.status());
  });

  test("anon NÃO insere em og_validation_status (bloqueado)", async ({ request }) => {
    const res = await request.post(`${REST}/og_validation_status`, {
      headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
      data: {},
    });
    expect(BLOCKED, `insert retornou ${res.status()}`).toContain(res.status());
  });
});

test.describe("Segurança — usuário autenticado NÃO-admin", () => {
  test.skip(
    !NONADMIN_EMAIL || !NONADMIN_PASSWORD,
    "Defina E2E_NONADMIN_EMAIL/E2E_NONADMIN_PASSWORD (segredos de CI) para rodar este bloco.",
  );

  let accessToken = "";

  test.beforeAll(async ({ request }) => {
    const res = await request.post(
      `${SUPABASE_URL.replace(/\/$/, "")}/auth/v1/token?grant_type=password`,
      {
        headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
        data: { email: NONADMIN_EMAIL, password: NONADMIN_PASSWORD },
      },
    );
    expect(res.ok(), "login do usuário de teste deve funcionar").toBeTruthy();
    const body = await res.json();
    accessToken = body.access_token;
    expect(accessToken, "deve receber access_token").toBeTruthy();
  });

  const authGet = (request: APIRequestContext, path: string) =>
    request.get(`${REST}/${path}`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${accessToken}` },
    });

  test("não-admin recebe ZERO reviews e nenhum client_phone", async ({ request }) => {
    const res = await authGet(request, "reviews?select=*");
    // Aceitável: bloqueado (401/403) OU 200 com array vazio — nunca dados.
    if (BLOCKED.includes(res.status())) return;
    expect(res.status()).toBe(200);
    const rows = await res.json();
    expect(Array.isArray(rows)).toBeTruthy();
    expect(rows.length, "não-admin não deve ver nenhuma review").toBe(0);
    const leaked = JSON.stringify(rows).includes("client_phone");
    expect(leaked, "client_phone não pode aparecer").toBeFalsy();
  });

  test("não-admin NÃO lê og_validation_status", async ({ request }) => {
    const res = await authGet(request, "og_validation_status?select=*");
    if (BLOCKED.includes(res.status())) return;
    expect(res.status()).toBe(200);
    const rows = await res.json();
    expect(Array.isArray(rows) && rows.length === 0, "deve retornar zero linhas").toBeTruthy();
  });
});
