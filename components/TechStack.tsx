import { stackSection, techStack } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

export function TechStack() {
  return (
    <Section id="stack">
      <SectionHeading id="stack" {...stackSection} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-xs font-semibold tracking-[0.18em] text-forest uppercase">{group.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-paper px-3 py-1.5 text-sm text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
