import { cn } from "@/lib/utils";
import { Container } from "./Container";

const tones = {
  paper: "bg-paper text-ink",
  paper2: "bg-paper-2 text-ink",
  tint: "bg-tint text-ink",
};

/** Page section with an anchor id, offset for the sticky navbar. */
export function Section({
  id,
  children,
  className,
  tone = "paper",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative isolate scroll-mt-16 overflow-x-clip py-20 sm:py-28", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
