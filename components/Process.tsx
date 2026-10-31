import { processSection, processSteps } from "@/lib/content";
import { DrawLine } from "./ui/DrawLine";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading id="process" {...processSection} />

      <div className="relative">
        {/* Connecting line: vertical on mobile, horizontal on desktop. Draws in on scroll. */}
        <DrawLine axis="y" className="absolute top-6 bottom-6 left-6 w-px bg-ink/20 lg:hidden" />
        <DrawLine axis="x" className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-ink/20 lg:block" />

        <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {processSteps.map(({ title, description, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={0.1 + i * 0.1} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface shadow-sm">
                  <Icon className="size-5 text-orange-deep" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase lg:mt-4">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
