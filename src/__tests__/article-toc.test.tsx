import { describe, expect, it, vi } from "vitest";

// O conteúdo editorial usa <Link> do router; nos testes de SSR puro
// substituímos por <a>, mantendo o HTML dos headings intacto.
vi.mock("@/lib/router-compat", async (importOriginal) => {
  const mod = await importOriginal<Record<string, unknown>>();
  return {
    ...mod,
    Link: ({ to, children, ...rest }: { to: string; children?: React.ReactNode }) => (
      <a href={to} {...rest}>{children}</a>
    ),
  };
});

import { renderToStaticMarkup } from "react-dom/server";
import { buildArticleToc, shouldRenderToc, slugifyHeading, nodeText } from "@/lib/articleToc";
import { ArticleToc } from "@/components/editorial/ArticleToc";
import { blogPostsContentBase } from "@/data/blogPostsContent";

const PILARES = ["o-que-e-informatica", "informatica-basica", "como-aprender-informatica"] as const;

describe("TOC dos artigos (Rodada 9B.1)", () => {
  it("slug é determinístico, ASCII e sem acento", () => {
    expect(slugifyHeading("Informática, computação e TI")).toBe("informatica-computacao-e-ti");
    expect(slugifyHeading("Glossário essencial de informática")).toBe("glossario-essencial-de-informatica");
    expect(slugifyHeading("Informática, computação e TI")).toBe(slugifyHeading("Informática, computação e TI"));
  });

  it("extrai texto de headings compostos", () => {
    expect(nodeText(<h2>Hardware <strong>e</strong> software</h2>)).toContain("Hardware");
  });

  it.each(PILARES)("%s: gera TOC com H2 e ids únicos", (slug) => {
    const post = blogPostsContentBase[slug];
    expect(post).toBeTruthy();
    const { headings } = buildArticleToc(post.content);
    const ids = headings.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(headings.filter((h) => h.level === 2).length).toBeGreaterThanOrEqual(6);
    expect(shouldRenderToc(headings)).toBe(true);
    expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true);
  });

  it.each(PILARES)("%s: cada link do TOC aponta para um heading existente no HTML", (slug) => {
    const { content, headings } = buildArticleToc(blogPostsContentBase[slug].content);
    const html = renderToStaticMarkup(<>{content}</>);
    for (const h of headings) {
      expect(html).toContain(`id="${h.id}"`);
    }
    const nav = renderToStaticMarkup(<ArticleToc headings={headings} />);
    for (const h of headings) {
      expect(nav).toContain(`href="#${h.id}"`);
    }
    expect(nav).toContain('aria-label="Índice do artigo"');
  });

  it("é estável entre execuções (seguro para SSR/hydration)", () => {
    const a = buildArticleToc(blogPostsContentBase["informatica-basica"].content);
    const b = buildArticleToc(blogPostsContentBase["informatica-basica"].content);
    expect(a.headings).toEqual(b.headings);
    expect(renderToStaticMarkup(<>{a.content}</>)).toBe(renderToStaticMarkup(<>{b.content}</>));
  });

  it("headings recebem offset de header fixo via scroll-margin", () => {
    const { content } = buildArticleToc(blogPostsContentBase["o-que-e-informatica"].content);
    expect(renderToStaticMarkup(<>{content}</>)).toContain("scroll-mt-28");
  });

  it("artigo curto não recebe TOC", () => {
    const curto = (
      <>
        <h2>Só um tópico</h2>
        <p>Texto.</p>
      </>
    );
    const { headings } = buildArticleToc(curto);
    expect(shouldRenderToc(headings)).toBe(false);
  });

  it("colisão de títulos gera ids distintos e determinísticos", () => {
    const dup = (
      <>
        <h2>Conclusão</h2>
        <h2>Conclusão</h2>
      </>
    );
    const { headings } = buildArticleToc(dup);
    expect(headings.map((h) => h.id)).toEqual(["conclusao", "conclusao-2"]);
  });

  it("TOC é recolhível no mobile por CSS nativo (details/summary)", () => {
    const nav = renderToStaticMarkup(
      <ArticleToc headings={[{ id: "a", text: "A", level: 2 }]} />,
    );
    expect(nav).toContain("<details");
    expect(nav).toContain("article-toc__summary");
    expect(nav).not.toContain("onclick");
  });
});
