import {
  aiCapabilities,
  aiSection,
  engagements,
  faqs,
  pricingSection,
  processSteps,
  services,
  site,
  team,
} from "@/lib/content";

/**
 * /llms.txt: a plain-language summary of the studio for AI assistants and
 * answer engines (see https://llmstxt.org). Generated from lib/content.ts.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is run by ${team.map((m) => `${m.name} (${m.role})`).join(" and ")}. We work with startups, small and medium businesses, and international clients, mainly in the US, UK, and globally. Pricing is in USD.`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.seoDescription}`),
    "",
    "## AI agents and automation",
    "",
    `${aiSection.definitionQuestion} ${aiSection.definitionAnswer}`,
    "",
    ...aiCapabilities.map((c) => `- ${c.title}: ${c.description}`),
    "",
    "## How we work",
    "",
    ...processSteps.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`),
    "",
    "## Engagement models",
    "",
    pricingSection.note,
    "",
    ...engagements.map((e) => `- ${e.title}: ${e.description} Best for ${e.bestFor}.`),
    "",
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Contact",
    "",
    `- Website: ${site.url}`,
    `- Email: ${site.email}`,
    `- Contact: email ${site.email} or see ${site.url}/#contact`,
    `- LinkedIn: ${site.linkedinUrl}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
