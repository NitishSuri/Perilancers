import { Quote } from "lucide-react";
import { testimonials, testimonialsSection } from "@/lib/content";
import { cardClass, cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

/** Rendered only when SHOW_TESTIMONIALS is true in lib/content.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <SectionHeading id="testimonials" {...testimonialsSection} />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={t.name}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <figure className={cn(cardClass, "flex h-full flex-col p-6 sm:p-8")}>
                <Quote className="size-7 text-orange-deep" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-lg">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted">
                    {t.role}, {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
