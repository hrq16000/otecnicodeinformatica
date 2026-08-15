import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { SITE_BASE_URL } from "@/lib/siteConfig";
import { isEditorialApproved } from "@/lib/blogEditorialRegistry";
import { withOgVersion } from "@/lib/ogCacheBust";

export const Route = createFileRoute("/blog_/$slug")({
  component: BlogPost,
  loader: async ({ params }) => {
    const [{ blogPostsContentBase }, { programmaticPosts }] = await Promise.all([
      import("@/data/blogPostsContent"),
      import("@/data/blogProgrammaticPosts"),
    ]);
    const posts = { ...blogPostsContentBase, ...programmaticPosts };
    const post = posts[params.slug] ?? null;
    if (!post) return { post: null };
    return {
      post: {
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
      },
    };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return {};

    const slug = params.slug;
    const approved = isEditorialApproved(slug);
    const canonicalUrl = `${SITE_BASE_URL}/blog/${slug}`;
    const heroImage = `${SITE_BASE_URL}/og-image.png`;
    const heroImageOg = withOgVersion(heroImage);

    const meta: Array<Record<string, string>> = [
      { title: `${post.title} | Blog | O Técnico de Informática` },
      { name: "description", content: post.excerpt },
      {
        name: "robots",
        content: approved
          ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          : "noindex, follow",
      },
      {
        name: "googlebot",
        content: approved
          ? "index, follow, max-image-preview:large, max-snippet:-1"
          : "noindex, follow",
      },
      { property: "og:type", content: approved ? "article" : "website" },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.excerpt },
      { property: "og:url", content: canonicalUrl },
      { property: "og:site_name", content: "O Técnico de Informática" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: heroImageOg },
      { property: "og:image:secure_url", content: heroImageOg },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: post.title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: post.title },
      { name: "twitter:description", content: post.excerpt },
      { name: "twitter:image", content: heroImageOg },
      { name: "twitter:image:alt", content: post.title },
    ];

    if (approved) {
      meta.push(
        { property: "article:published_time", content: `${post.date}T08:00:00-03:00` },
        { property: "article:section", content: post.category },
        { property: "article:tag", content: post.category },
        { property: "article:author", content: "O Técnico de Informática" },
        { property: "article:publisher", content: SITE_BASE_URL }
      );
    }

    return {
      meta,
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
});
