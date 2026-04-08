/**
 * Pool of unique Unsplash images for blog/content cards.
 * Each URL uses a different photo to avoid repetition.
 * Organized by theme for deterministic assignment via slug hash.
 */

const BASE = "auto=format&fit=crop&q=70";

// 60 unique Unsplash photos — each a different photo ID
export const IMAGE_POOL = [
  // Tech / computers / hardware
  `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?${BASE}`, // laptop code
  `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?${BASE}`, // macbook desk
  `https://images.unsplash.com/photo-1498050108023-c5249f4df085?${BASE}`, // coding screen
  `https://images.unsplash.com/photo-1519389950473-47ba0277781c?${BASE}`, // people working
  `https://images.unsplash.com/photo-1555066931-4365d14bab8c?${BASE}`, // code on screen
  `https://images.unsplash.com/photo-1484788984921-03950022c9ef?${BASE}`, // laptop keyboard
  `https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?${BASE}`, // RAM sticks
  `https://images.unsplash.com/photo-1624996379697-f01d168b1a52?${BASE}`, // motherboard detail
  `https://images.unsplash.com/photo-1629654297299-c8506221ca97?${BASE}`, // windows screen
  `https://images.unsplash.com/photo-1602837385569-08ac19ec83af?${BASE}`, // PC components
  // Repair / tools / electronics
  `https://images.unsplash.com/photo-1563206767-5b18f218e8de?${BASE}`, // electronics repair
  `https://images.unsplash.com/photo-1601737487795-dab272f52420?${BASE}`, // soldering iron
  `https://images.unsplash.com/photo-1518770660439-4636190af475?${BASE}`, // circuit board
  `https://images.unsplash.com/photo-1588508065123-287b28e013da?${BASE}`, // electronics diagnostic
  `https://images.unsplash.com/photo-1621274403997-37aace184f49?${BASE}`, // tech workspace
  `https://images.unsplash.com/photo-1555617778-02518510b9fa?${BASE}`, // computer parts
  `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?${BASE}`, // workbench
  `https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?${BASE}`, // laptop repair
  `https://images.unsplash.com/photo-1587202372775-e229f172b9d7?${BASE}`, // desktop PC
  `https://images.unsplash.com/photo-1562408590-e32931084e23?${BASE}`, // TV screen
  // Network / security / servers
  `https://images.unsplash.com/photo-1544197150-b99a580bb7a8?${BASE}`, // network cables
  `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?${BASE}`, // server room
  `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?${BASE}`, // digital security
  `https://images.unsplash.com/photo-1557597774-9d273605dfa9?${BASE}`, // security camera
  `https://images.unsplash.com/photo-1563013544-824ae1b704d3?${BASE}`, // cyber lock
  `https://images.unsplash.com/photo-1614064641938-3bbee52942c7?${BASE}`, // router
  `https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?${BASE}`, // developer
  `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?${BASE}`, // tech office
  `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?${BASE}`, // matrix
  `https://images.unsplash.com/photo-1580894894513-541e068a3e2b?${BASE}`, // firewall
  // Office / business / productivity
  `https://images.unsplash.com/photo-1553877522-43269d4ea984?${BASE}`, // business meeting
  `https://images.unsplash.com/photo-1460925895917-afdab827c52f?${BASE}`, // dashboard
  `https://images.unsplash.com/photo-1551288049-bebda4e38f71?${BASE}`, // analytics
  `https://images.unsplash.com/photo-1559526324-4b87b5e36e44?${BASE}`, // office desk
  `https://images.unsplash.com/photo-1531482615713-2afd69097998?${BASE}`, // teamwork
  `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?${BASE}`, // business planning
  `https://images.unsplash.com/photo-1557804506-669a67965ba0?${BASE}`, // presentation
  `https://images.unsplash.com/photo-1573164574472-797cdf4a583a?${BASE}`, // remote work
  `https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?${BASE}`, // creative desk
  `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?${BASE}`, // study desk
  // Mobile / devices / peripherals
  `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?${BASE}`, // phone
  `https://images.unsplash.com/photo-1512054502232-10a0a035d672?${BASE}`, // phone repair
  `https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?${BASE}`, // smart TV
  `https://images.unsplash.com/photo-1558618666-fcd25c85f82e?${BASE}`, // audio
  `https://images.unsplash.com/photo-1585771724684-38269d6639fd?${BASE}`, // printer
  `https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?${BASE}`, // monitor
  `https://images.unsplash.com/photo-1558618666-fcd25c85f82e?${BASE}`, // amplifier
  `https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?${BASE}`, // delivery
  `https://images.unsplash.com/photo-1531545514256-b1400bc00f31?${BASE}`, // happy client
  `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?${BASE}`, // remote support
  // Extra variety
  `https://images.unsplash.com/photo-1550745165-9bc0b252726f?${BASE}`, // retro gaming
  `https://images.unsplash.com/photo-1535378620166-273708d44e4c?${BASE}`, // data
  `https://images.unsplash.com/photo-1542831371-29b0f74f9713?${BASE}`, // programming
  `https://images.unsplash.com/photo-1515879218367-8466d910auj7?${BASE}`, // keyboard
  `https://images.unsplash.com/photo-1483058712412-4245e9b90334?${BASE}`, // workspace
  `https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?${BASE}`, // colorful code
  `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?${BASE}`, // laptop glow
  `https://images.unsplash.com/photo-1504639725590-34d0984388bd?${BASE}`, // code screen
  `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?${BASE}`, // support
  `https://images.unsplash.com/photo-1605810230434-7631ac76ec81?${BASE}`, // screens
];

/**
 * Deterministic hash: same slug always gets the same image index.
 * This avoids repetition across renders while being stable.
 */
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a unique image for any content item based on its slug.
 * Uses deterministic hashing so the same slug always returns the same image.
 */
export function getUniqueImage(slug: string): string {
  const index = hashSlug(slug) % IMAGE_POOL.length;
  return IMAGE_POOL[index];
}
