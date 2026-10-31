import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { services, site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cardClass, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services: AI Agents, Web, Design, Cloud, Product & Marketing",
  description: `Everything ${site.name} offers: AI agents and automation, web development, UI/UX design, cloud and DevOps, product management, and digital marketing.`,
  alternates: { canonical: "/services" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-8 max-w-4xl text-5xl leading-[1.05] font-bold sm:text-6xl">
          Everything your product needs, from <Highlight>one team</Highlight>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted">{site.description}</p>

        <ul className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, title, description, icon: Icon }, i) => (
            <li key={slug}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Link href={`/services/${slug}`} className={cn(cardClass, "flex h-full flex-col p-7")}>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-orange/10 text-orange-deep"><Icon className="size-5" aria-hidden="true" /></span>
                  <h2 className="mt-5 text-2xl font-bold">{title}</h2>
                  <p className="mt-2 flex-1 text-muted">{description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:text-orange-deep">
                    Learn more
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </main>
  );
}
