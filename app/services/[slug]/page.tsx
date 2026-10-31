import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Plus, Sparkles } from "lucide-react";
import { AgentFlow } from "@/components/AgentFlow";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { ctaHref, processSteps, services } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { cardClass, cn } from "@/lib/utils";
import { DoodleCheck, DoodleIcon } from "@/components/ui/Doodle";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: service.seoTitle, description: service.seoDescription },
    twitter: { card: "summary_large_image", title: service.seoTitle, description: service.seoDescription },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const isAI = service.slug === "ai-agents-automation";
  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  // Split the title so the last word gets the highlighter treatment
  const words = service.title.split(" ");
  const last = words.pop();

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(141,164,126,0.25),transparent)]" />
          <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_80%)]" />
        </div>
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <DoodleIcon icon={Icon} size="lg" className="animate-fade-up" />
              <h1 className="mt-6 animate-fade-up text-5xl leading-[1.05] font-bold [animation-delay:0.1s] sm:text-6xl">
                {words.join(" ")} <Highlight>{last}</Highlight>
              </h1>
              <p className="mt-6 max-w-2xl animate-fade-up text-xl text-muted [animation-delay:0.2s]">
                {service.seoDescription}
              </p>
              <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:0.3s] sm:flex-row">
                <ButtonLink href={ctaHref} className="px-7 py-3.5 text-base">
                  Get a Quote
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/#process" variant="secondary" className="px-7 py-3.5 text-base">
                  How we work
                </ButtonLink>
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className={cn(cardClass, "p-6 sm:p-8")}>
                <h2 className="text-xs font-semibold tracking-[0.18em] text-forest uppercase">
                  What you get
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 font-medium">
                      <DoodleCheck className="mt-1" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Answer-first overview (great for search snippets and AI answers) */}
      <section aria-labelledby="overview-title" className="overflow-hidden border-y border-line bg-paper-2 py-16 sm:py-20">
        <Container className="max-w-4xl">
          <Reveal>
            <h2 id="overview-title" className="text-3xl font-bold sm:text-4xl">
              {service.title}: <span className="text-forest">the short answer</span>
            </h2>
            {service.intro.map((p) => (
              <p key={p} className="mt-5 text-lg text-ink/80">
                {p}
              </p>
            ))}
          </Reveal>
          {isAI && (
            <div className="mt-12">
              <p className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-forest uppercase">
                <Sparkles className="size-4" aria-hidden="true" />
                How an agent handles a task
              </p>
              <AgentFlow />
            </div>
          )}
        </Container>
      </section>

      {/* Who it's for / outcomes */}
      <section aria-label="Who it&apos;s for and outcomes" className="overflow-x-clip py-20 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-2">
          <Reveal variant="left" className="h-full">
            <div className={cn(cardClass, "h-full p-7 sm:p-9")}>
              <h2 className="text-2xl font-bold">Who it&apos;s for</h2>
              <ul className="mt-5 space-y-3">
                {service.forWho.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <ArrowRight className="mt-1 size-4 shrink-0 text-forest" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="right" className="h-full">
            <div className={cn(cardClass, "h-full p-7 sm:p-9")}>
              <h2 className="text-2xl font-bold">What you can expect</h2>
              <ul className="mt-5 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <DoodleCheck className="mt-1" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section aria-labelledby="svc-process-title" className="bg-paper-2 py-20 sm:py-24">
        <Container>
          <Reveal>
            <h2 id="svc-process-title" className="text-center text-4xl font-bold sm:text-5xl">
              How we <Highlight>work</Highlight>
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className={cn(cardClass, "h-full p-5")}>
                    <p className="text-xs font-semibold tracking-[0.18em] text-forest uppercase">
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQs */}
      <section aria-labelledby="svc-faq-title" className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 id="svc-faq-title" className="text-center text-4xl font-bold sm:text-5xl">
              {service.title} <Highlight>FAQ</Highlight>
            </h2>
          </Reveal>
          <Reveal className="mt-10">
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-paper/60 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans text-lg font-semibold">{faq.question}</h3>
                    <Plus
                      className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-forest"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-6 pb-6 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA + related services (internal links) */}
      <section aria-labelledby="related-title" className="bg-paper-2 py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to talk about <span className="text-forest">{service.title.toLowerCase()}</span>?
            </h2>
            <p className="mt-4 text-muted">
              Tell us what you need. We&apos;ll reply with next steps and book a free discovery call.
            </p>
            <ButtonLink href={ctaHref} className="mt-8 px-7 py-3.5 text-base">
              Get a Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
          </Reveal>

          <h2 id="related-title" className="mt-20 text-center text-2xl font-bold">
            Other ways we can help
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className={cn(cardClass, "flex h-full items-center justify-between gap-3 p-4 font-semibold")}
                >
                  {s.title}
                  <ArrowUpRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(service.faqs)} />
    </main>
  );
}
