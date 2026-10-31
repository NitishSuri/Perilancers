import { ArrowRight, Mail } from "lucide-react";
import { contactSection, site, team } from "@/lib/content";
// Contact form is turned off for now (being reworked separately). To bring it back, uncomment:
// import { budgetOptions, serviceOptions } from "@/lib/content";
// import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import { LightRays } from "./LightRays";
import { LinkedInIcon } from "./icons";
// import { WhatsAppIcon } from "./icons";
import { ButtonLink } from "./ui/ButtonLink";
import { DoodleCheck, DoodleIcon } from "./ui/Doodle";
import { cardClass, cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(contactSection.emailSubject)}&body=${encodeURIComponent(contactSection.emailBody)}`;

export function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <LightRays className="h-[34rem] opacity-80" />
      <SectionHeading id="contact" {...contactSection} />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        {/* Email-first panel (replaces the contact form for now) */}
        <Reveal>
          <div className={cn(cardClass, "h-full p-6 hover:translate-y-0 sm:p-10")}>
            <DoodleIcon icon={Mail} size="lg" />
            <h3 className="mt-6 text-2xl font-bold sm:text-3xl">{contactSection.emailTitle}</h3>
            <p className="mt-3 max-w-xl text-muted">{contactSection.emailText}</p>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block font-display text-[1.35rem] font-bold break-words text-forest underline decoration-forest/25 underline-offset-[6px] transition-colors hover:decoration-forest sm:text-3xl"
            >
              {site.email}
            </a>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={mailtoHref} className="px-6 py-3.5 text-base">
                {contactSection.emailButton}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </ButtonLink>
              <CopyEmailButton email={site.email} label={contactSection.copyButton} />
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                {contactSection.includeTitle}
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {contactSection.include.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <DoodleCheck className="mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="space-y-8">
          <div className={cn(cardClass, "p-6 hover:translate-y-0 sm:p-8")}>
            <h3 className="text-lg font-bold">{contactSection.nextStepsTitle}</h3>
            <ol className="mt-4 space-y-3">
              {contactSection.nextSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-muted">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-xs font-semibold text-forest">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className={cn(cardClass, "p-6 hover:translate-y-0 sm:p-8")}>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Connect on LinkedIn</p>
            <ul className="mt-4 space-y-3">
              {[{ name: "Perilancers", linkedinUrl: site.linkedinUrl }, ...team].map((p) => (
                <li key={p.name}>
                  <a
                    href={p.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-ink/85 transition-colors hover:text-forest"
                  >
                    <LinkedInIcon className="size-4" />
                    {p.name}
                    <span className="sr-only">on LinkedIn (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp hidden for now. See the note in lib/content.ts to re-enable.
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "w-full")}>
            <WhatsAppIcon className="size-5 text-[#1f9d55]" />
            Chat on WhatsApp
          </a>
          */}
        </Reveal>

        {/* Contact form turned off for now. Uncomment (and the imports above) to bring it back.
        <Reveal delay={0.08}>
          <ContactForm services={serviceOptions} budgets={budgetOptions} />
        </Reveal>
        */}
      </div>
    </Section>
  );
}
