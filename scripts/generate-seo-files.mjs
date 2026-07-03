import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

function loadEnvSiteUrl() {
  try {
    const envPath = join(root, ".env");
    const env = readFileSync(envPath, "utf8");
    const match = env.match(/^VITE_SITE_URL=(.+)$/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    // brak .env — użyj domyślnej domeny
  }
  return process.env.VITE_SITE_URL ?? "https://klimatyzacja.pl";
}

const baseUrl = loadEnvSiteUrl().replace(/\/$/, "");

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/polityka-prywatnosci</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;

writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");

console.log(`SEO: robots.txt i sitemap.xml → ${baseUrl}`);
