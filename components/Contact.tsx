import { Mail } from "lucide-react";
import { budgetOptions, contactSection, serviceOptions, site, team } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { LightRays } from "./LightRays";
import { LinkedInIcon, WhatsAppIcon } from "./icons";
import { buttonClass } from "./ui/ButtonLink";
import { cardClass, cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <LightRays className="h-[34rem] opacity-80" />
      <SectionHeading id="contact" {...contactSection} />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <Reveal className="space-y-8">
          <div className={cn(cardClass, "p-6 hover:translate-y-0 sm:p-8")}>
            <h3 className="text-xl font-bold">Reach us directly</h3>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 flex items-center gap-3 break-all transition-colors hover:text-orange-deep"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange-deep">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              {site.email}
            </a>

            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary", "mt-6 w-full")}
            >
              <WhatsAppIcon className="size-5 text-[#1f9d55]" />
              Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Connect on LinkedIn</p>
              <ul className="mt-3 space-y-2.5">
                {[{ name: "Perilancers", linkedinUrl: site.linkedinUrl }, ...team].map((p) => (
                  <li key={p.name}>
                    <a
                      href={p.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-ink/85 transition-colors hover:text-orange-deep"
                    >
                      <LinkedInIcon className="size-4" />
                      {p.name}
                      <span className="sr-only">on LinkedIn (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-1">
            <h3 className="text-lg font-bold">{contactSection.nextStepsTitle}</h3>
            <ol className="mt-4 space-y-3">
              {contactSection.nextSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-muted">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-orange/10 text-xs font-semibold text-orange-deep">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm services={serviceOptions} budgets={budgetOptions} />
        </Reveal>
      </div>
    </Section>
  );
}
