import { cn } from "@/lib/utils";
import { Highlight } from "./Highlight";
import { Reveal } from "./Reveal";

export function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: {
  /** Section id. The heading gets `${id}-title` for aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl sm:mb-16", align === "center" && "mx-auto text-center")}>
      <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-forest uppercase">{eyebrow}</p>
      <h2 id={`${id}-title`} className="text-4xl leading-[1.08] font-bold sm:text-5xl">
        {title} {highlight && <Highlight>{highlight}</Highlight>}
      </h2>
      {description && <p className="mt-5 text-lg text-muted">{description}</p>}
    </Reveal>
  );
}
