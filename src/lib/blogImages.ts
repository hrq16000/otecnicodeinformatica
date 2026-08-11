/**
 * Pool of unique Unsplash images for blog/content cards.
 * Each URL uses a different photo to avoid repetition.
 * Organized by theme for deterministic assignment via slug hash.
 */

const BASE = "auto=format&fit=crop&q=70";

// Cache-bust version — bump when refreshing the cover pool
export const COVER_VERSION = "v3";

// 60 unique Unsplash photos — each a different photo ID
export const IMAGE_POOL = [
  // Tech / computers / hardware
  `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${BASE}`,
  `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?${BASE}`,
  `https://images.unsplash.com/photo-1498050108023-c5249f4df085?${BASE}`,
  `https://images.unsplash.com/photo-1519389950473-47ba0277781c?${BASE}`,
  `https://images.unsplash.com/photo-1555066931-4365d14bab8c?${BASE}`,
  `https://images.unsplash.com/photo-1484788984921-03950022c9ef?${BASE}`,
  `https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?${BASE}`,
  `https://images.unsplash.com/photo-1624996379697-f01d168b1a52?${BASE}`,
  `https://images.unsplash.com/photo-1629654297299-c8506221ca97?${BASE}`,
  `https://images.unsplash.com/photo-1602837385569-08ac19ec83af?${BASE}`,
  `https://images.unsplash.com/photo-1563206767-5b18f218e8de?${BASE}`,
  `https://images.unsplash.com/photo-1601737487795-dab272f52420?${BASE}`,
  `https://images.unsplash.com/photo-1518770660439-4636190af475?${BASE}`,
  `https://images.unsplash.com/photo-1588508065123-287b28e013da?${BASE}`,
  `https://images.unsplash.com/photo-1621274403997-37aace184f49?${BASE}`,
  `https://images.unsplash.com/photo-1555617778-02518510b9fa?${BASE}`,
  `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?${BASE}`,
  `https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?${BASE}`,
  `https://images.unsplash.com/photo-1587202372775-e229f172b9d7?${BASE}`,
  `https://images.unsplash.com/photo-1562408590-e32931084e23?${BASE}`,
  `https://images.unsplash.com/photo-1544197150-b99a580bb7a8?${BASE}`,
  `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?${BASE}`,
  `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?${BASE}`,
  `https://images.unsplash.com/photo-1557597774-9d273605dfa9?${BASE}`,
  `https://images.unsplash.com/photo-1563013544-824ae1b704d3?${BASE}`,
  `https://images.unsplash.com/photo-1614064641938-3bbee52942c7?${BASE}`,
  `https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?${BASE}`,
  `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?${BASE}`,
  `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?${BASE}`,
  `https://images.unsplash.com/photo-1580894894513-541e068a3e2b?${BASE}`,
  `https://images.unsplash.com/photo-1553877522-43269d4ea984?${BASE}`,
  `https://images.unsplash.com/photo-1460925895917-afdab827c52f?${BASE}`,
  `https://images.unsplash.com/photo-1551288049-bebda4e38f71?${BASE}`,
  `https://images.unsplash.com/photo-1559526324-4b87b5e36e44?${BASE}`,
  `https://images.unsplash.com/photo-1531482615713-2afd69097998?${BASE}`,
  `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?${BASE}`,
  `https://images.unsplash.com/photo-1557804506-669a67965ba0?${BASE}`,
  `https://images.unsplash.com/photo-1573164574472-797cdf4a583a?${BASE}`,
  `https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?${BASE}`,
  `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?${BASE}`,
  `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?${BASE}`,
  `https://images.unsplash.com/photo-1512054502232-10a0a035d672?${BASE}`,
  `https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?${BASE}`,
  `https://images.unsplash.com/photo-1601944177325-f8867652837f?${BASE}`,
  `https://images.unsplash.com/photo-1585771724684-38269d6639fd?${BASE}`,
  `https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?${BASE}`,
  `https://images.unsplash.com/photo-1601944177325-f8867652837f?${BASE}`,
  `https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?${BASE}`,
  `https://images.unsplash.com/photo-1531545514256-b1400bc00f31?${BASE}`,
  `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?${BASE}`,
  `https://images.unsplash.com/photo-1550745165-9bc0b252726f?${BASE}`,
  `https://images.unsplash.com/photo-1535378620166-273708d44e4c?${BASE}`,
  `https://images.unsplash.com/photo-1542831371-29b0f74f9713?${BASE}`,
  `https://images.unsplash.com/photo-1519558260268-cde7e03a0152?${BASE}`,
  `https://images.unsplash.com/photo-1483058712412-4245e9b90334?${BASE}`,
  `https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?${BASE}`,
  `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?${BASE}`,
  `https://images.unsplash.com/photo-1504639725590-34d0984388bd?${BASE}`,
  `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?${BASE}`,
  `https://images.unsplash.com/photo-1605810230434-7631ac76ec81?${BASE}`,
];

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get a unique image for any content item based on its slug.
 * Deterministic — same slug always returns the same image.
 * Includes cache-busting via COVER_VERSION query param.
 */
export function getUniqueImage(slug: string, width = 800): string {
  const index = hashSlug(slug) % IMAGE_POOL.length;
  const base = IMAGE_POOL[index];
  return `${base}&w=${width}&${COVER_VERSION}`;
}

/**
 * Build a responsive srcset for an Unsplash cover.
 * Generates 400 / 800 / 1200 / 1600 variants.
 */
export function getUniqueImageSrcSet(slug: string): string {
  const index = hashSlug(slug) % IMAGE_POOL.length;
  const base = IMAGE_POOL[index];
  return [400, 800, 1200, 1600]
    .map((w) => `${base}&w=${w}&${COVER_VERSION} ${w}w`)
    .join(", ");
}

/**
 * Default `sizes` attribute for blog cards (mobile-first).
 */
export const COVER_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px";
export const COVER_SIZES_HERO = "(max-width: 768px) 100vw, 1200px";
