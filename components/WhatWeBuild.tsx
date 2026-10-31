import { Info } from "lucide-react";
import { buildSection, projectIdeas } from "@/lib/content";
import { cardClass, cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";
import { DoodleCheck } from "@/components/ui/Doodle";

export function WhatWeBuild() {
  return (
    <Section id="build" tone="paper2">
      <SectionHeading id="build" {...buildSection} />

      <Reveal className="mx-auto -mt-6 mb-12 flex max-w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted">
        <Info className="size-4 shrink-0 text-forest" aria-hidden="true" />
        {buildSection.disclaimer}
      </Reveal>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projectIdeas.map((p, i) => (
          <li key={p.title} className="min-w-0">
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <article className={cn(cardClass, "flex h-full flex-col p-4")}>
                <ProjectVisual variant={p.visual} />
                <div className="flex flex-1 flex-col p-2 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-paper-2 px-2.5 py-0.5 text-xs font-medium text-ink/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.description}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <DoodleCheck className="mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
