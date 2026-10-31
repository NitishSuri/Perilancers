import { ArrowRight } from "lucide-react";
import { ctaHref, hero } from "@/lib/content";
import { AgentConsole } from "./AgentConsole";
import { LightRays } from "./LightRays";
import { Highlight } from "./ui/Highlight";
import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Container";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate -mt-16 overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <LightRays />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-dots [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_20%,transparent_75%)]"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted sm:text-sm">
            <span className="size-1.5 rounded-full bg-sage" />
            {hero.badge}
          </p>

          <h1 id="hero-title" className="mt-6 text-[2.5rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4rem]">
            {hero.headlineBefore} <Highlight>{hero.headlineHighlight}</Highlight> {hero.headlineAfter}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{hero.subheadline}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctaHref} className="px-6 py-3.5 text-base">
              {hero.primaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#ai" variant="secondary" className="px-6 py-3.5 text-base">
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <p className="mt-8 text-sm text-muted">{hero.trustLine}</p>
        </div>

        <div className="animate-fade-up [animation-delay:0.15s]">
          <AgentConsole />
        </div>
      </Container>
    </section>
  );
}
