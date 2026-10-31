/**
 * Structured data (JSON-LD) builders. Search engines and AI assistants use these
 * to understand who we are, what we offer, and how pages relate to each other.
 */
import { aiCapabilities, services, site, team, type Service } from "./content";

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: site.name,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
        image: `${site.url}/opengraph-image`,
        description: site.description,
        slogan: site.tagline,
        email: site.email,
        areaServed: "Worldwide",
        currenciesAccepted: "USD",
        knowsAbout: [
          ...services.map((s) => s.title),
          ...aiCapabilities.map((c) => c.title),
          "Agentic AI",
          "Large language models",
          "Answer engine optimization",
        ],
        founder: team.map((m) => ({
          "@type": "Person",
          name: m.name,
          jobTitle: m.role,
          sameAs: [m.linkedinUrl],
          knowsAbout: m.skills,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          availableLanguage: ["English"],
        },
        sameAs: [site.linkedinUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              url: `${site.url}/services/${s.slug}`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.seoTitle,
    description: service.seoDescription,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    audience: { "@type": "BusinessAudience", audienceType: "Startups, small and medium businesses" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}
