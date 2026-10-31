import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Served at /robots.txt.
 * Search engines AND AI assistants are explicitly welcome, so the studio can be
 * found in Google, Bing, ChatGPT, Claude, Perplexity, Gemini, and Apple results.
 * To opt out of a specific AI crawler, move it into a `disallow: "/"` rule.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
