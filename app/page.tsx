import { AISection } from "@/components/AISection";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { TechStack } from "@/components/TechStack";
import { Testimonials } from "@/components/Testimonials";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { WhyUs } from "@/components/WhyUs";
import { SHOW_TESTIMONIALS, faqs, site } from "@/lib/content";
import { ORG_ID, WEBSITE_ID, faqJsonLd } from "@/lib/seo";

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${site.url}/#webpage`,
  url: site.url,
  name: site.name,
  description: site.description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  // Tells assistants which parts of the page are the best spoken/quoted summaries
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["#hero-title", "#ai-title", "#faq details"] },
};

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <Services />
      <AISection />
      <WhyUs />
      <Process />
      <WhatWeBuild />
      <TechStack />
      <Team />
      <Pricing />
      <FAQ />
      {SHOW_TESTIMONIALS && <Testimonials />}
      <Contact />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
    </main>
  );
}
