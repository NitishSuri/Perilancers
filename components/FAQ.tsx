import { Plus } from "lucide-react";
import { ctaHref, faqSection, faqs } from "@/lib/content";
import { ButtonLink } from "./ui/ButtonLink";
import { Highlight } from "./ui/Highlight";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

/** Accordion built on native <details>/<summary>: keyboard accessible with zero JavaScript. */
export function FAQ() {
  return (
    <Section id="faq" tone="paper2">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-orange-deep uppercase">{faqSection.eyebrow}</p>
          <h2 id="faq-title" className="text-4xl leading-[1.08] font-bold sm:text-5xl">
            {faqSection.title} <Highlight>{faqSection.highlight}</Highlight>
          </h2>
          <p className="mt-5 text-lg text-muted">{faqSection.description}</p>
          <ButtonLink href={ctaHref} className="mt-8">
            Ask us anything
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-paper/60 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans text-base font-semibold sm:text-lg">{faq.question}</h3>
                  <Plus
                    className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-orange-deep"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-6 text-muted sm:px-6">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
