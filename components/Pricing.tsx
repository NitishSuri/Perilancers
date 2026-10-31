import { Check, Info } from "lucide-react";
import { ctaHref, engagements, pricingSection } from "@/lib/content";
import { cardClass, cn } from "@/lib/utils";
import { ButtonLink } from "./ui/ButtonLink";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading id="pricing" {...pricingSection} />

      <Reveal className="mx-auto -mt-4 mb-12 flex max-w-2xl items-start gap-3 rounded-xl border border-line bg-surface p-5">
        <Info className="mt-0.5 size-5 shrink-0 text-orange-deep" aria-hidden="true" />
        <p>{pricingSection.note}</p>
      </Reveal>

      <ul className="grid items-stretch gap-6 lg:grid-cols-3">
        {engagements.map((e, i) => {
          const featured = i === 1;
          return (
            <li key={e.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article
                  className={cn(
                    cardClass,
                    "flex h-full flex-col p-6 sm:p-8",
                    featured && "border-ink/80 shadow-[0_20px_40px_-24px_rgba(23,20,15,0.35)]",
                  )}
                >
                  <h3 className="text-2xl font-bold">{e.title}</h3>
                  <p className="mt-2 text-sm text-orange-deep">Best for: {e.bestFor}</p>
                  <p className="mt-4 text-muted">{e.description}</p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {e.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-orange-deep" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={ctaHref}
                    variant={featured ? "primary" : "secondary"}
                    className="mt-8 w-full"
                    aria-label={`${pricingSection.cta} for ${e.title}`}
                  >
                    {pricingSection.cta}
                  </ButtonLink>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
