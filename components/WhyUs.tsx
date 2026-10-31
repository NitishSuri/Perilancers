import { Check } from "lucide-react";
import { benefits, whySection } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const tile =
  "group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_48px_-28px_rgba(23,20,15,0.35)] motion-reduce:hover:translate-y-0 sm:p-7";

/** Visual for "One team, end to end": every discipline in one row. */
function CoverageVisual() {
  const roles = ["Strategy", "Design", "Development", "Cloud", "AI", "Marketing"];
  return (
    <div aria-hidden="true" className="mt-6 flex flex-wrap gap-2">
      {roles.map((r) => (
        <span
          key={r}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm"
        >
          <Check className="size-3.5 text-green" />
          {r}
        </span>
      ))}
    </div>
  );
}

/** Visual for "On-time delivery": a simple milestone track. */
function MilestoneVisual() {
  const milestones = ["Kickoff", "Design", "Build", "Launch"];
  return (
    <div aria-hidden="true" className="mt-6">
      <div className="relative flex justify-between">
        <span className="absolute top-2 right-2 left-2 h-px bg-line" />
        <span className="absolute top-2 left-2 h-px w-2/3 bg-orange" />
        {milestones.map((m, i) => (
          <div key={m} className="relative flex flex-col items-center gap-2">
            <span
              className={cn(
                "size-4 rounded-full border-2",
                i < 3 ? "border-orange bg-orange" : "border-line bg-surface",
              )}
            />
            <span className="text-xs text-muted">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bento layout: on large screens, row one is wide + 2 small, row two is 2 small + wide. */
const spans = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

export function WhyUs() {
  return (
    <Section id="why" tone="paper2">
      <SectionHeading id="why" {...whySection} />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ title, description, icon: Icon }, i) => (
          <li key={title} className={cn(spans[i], (i === 0 || i === 5) && "sm:col-span-2")}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <div className={tile}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-orange/10 text-orange-deep">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-muted">{description}</p>
                {i === 0 && <CoverageVisual />}
                {i === 5 && <MilestoneVisual />}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
