import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ctaHref, services, servicesSection } from "@/lib/content";
import { cardClass, cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading id="services" {...servicesSection} />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ slug, title, description, deliverables, icon: Icon }, i) => (
          <li key={slug}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <article className={cn(cardClass, "flex h-full flex-col p-6 sm:p-7")}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-paper-2 text-ink transition-colors group-hover:bg-orange/10 group-hover:text-orange-deep">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted">{description}</p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-orange-deep" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${slug}`}
                  className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-ink transition-colors hover:text-orange-deep"
                >
                  Learn more<span className="sr-only"> about {title}</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12 text-center">
        <a
          href={ctaHref}
          className="group inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-orange-deep"
        >
          Not sure what you need? Tell us your goal
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </Reveal>
    </Section>
  );
}
