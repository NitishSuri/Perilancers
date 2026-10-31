import Link from "next/link";
import { ArrowRight, Check, FileInput, MessageSquare, Search, Sparkles, Table2 } from "lucide-react";
import { aiSection, ctaHref } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AutomationCard } from "./AutomationCard";
import { WhatsAppIcon } from "./icons";
import { ButtonLink } from "./ui/ButtonLink";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const tile =
  "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:border-ink/15 hover:shadow-[0_24px_48px_-28px_rgba(23,20,15,0.35)]";

function TileText({ title, text }: { title: string; text?: string }) {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      {text && <p className="mt-1.5 text-muted">{text}</p>}
    </div>
  );
}

/** Small illustration: a short customer conversation. */
function ChatVisual() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-2 rounded-2xl bg-paper-2 p-4 text-xs">
      <div className="self-end rounded-2xl rounded-br-sm bg-orange-deep px-3 py-2 text-white">Do you ship to the UK?</div>
      <div className="flex items-end gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1f9d55] text-white">
          <WhatsAppIcon className="size-3.5" />
        </span>
        <div className="rounded-2xl rounded-bl-sm border border-line bg-surface px-3 py-2">
          Yes, in 3 to 5 days. Want tracking updates here on WhatsApp?
        </div>
      </div>
    </div>
  );
}

/** Small illustration: three apps connected, with data flowing between them. */
function WorkflowVisual() {
  const apps = [
    { icon: FileInput, label: "Form" },
    { icon: Table2, label: "Sheet" },
    { icon: MessageSquare, label: "Slack" },
  ];
  return (
    <div aria-hidden="true" className="flex items-center justify-between rounded-2xl bg-paper-2 px-4 py-5">
      {apps.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface">
              <Icon className="size-4 text-orange-deep" />
            </span>
            <span className="text-[11px] text-muted">{label}</span>
          </div>
          {i < apps.length - 1 && (
            <div className="relative mx-2 mb-5 h-px flex-1 bg-ink/15">
              <span
                style={{ animationDelay: `${i * 1.5}s` }}
                className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-packet rounded-full bg-orange"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Small illustration: an AI search box inside a product. */
function ProductVisual() {
  return (
    <div aria-hidden="true" className="rounded-2xl bg-paper-2 p-4">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm">
        <Search className="size-4 text-muted" />
        <span className="flex-1 truncate text-ink/80">Invoices over $500 from last month</span>
        <Sparkles className="size-4 text-orange-deep" />
      </div>
      <ul className="mt-3 space-y-2 text-xs">
        {[
          ["INV-1042 · Website redesign", "$1,240"],
          ["INV-1057 · Monthly retainer", "$860"],
        ].map(([name, amount]) => (
          <li key={name} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
            <span className="text-ink/80">{name}</span>
            <span className="font-semibold">{amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AISection() {
  const t = aiSection.tiles;

  return (
    <Section id="ai" className="border-t border-line">
      <SectionHeading id="ai" {...aiSection} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Large tile: a live-looking example automation */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <div className={cn(tile, "gap-6 p-6 sm:p-8")}>
            <TileText {...t.agents} />
            <div className="mt-auto">
              <AutomationCard />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className={cn(tile, "gap-5 p-6")}>
            <TileText {...t.chat} />
            <div className="mt-auto">
              <ChatVisual />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className={cn(tile, "gap-5 p-6")}>
            <TileText {...t.workflow} />
            <div className="mt-auto">
              <WorkflowVisual />
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.06}>
          <div className={cn(tile, "gap-6 p-6 sm:flex-row sm:items-center sm:p-8")}>
            <div className="sm:w-2/5">
              <TileText {...t.product} />
            </div>
            <div className="sm:flex-1">
              <ProductVisual />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className={cn(tile, "gap-4 bg-paper-2/60 p-6")}>
            <TileText title={t.trust.title} />
            <ul className="space-y-2.5">
              {aiSection.trust.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={ctaHref}>
          {aiSection.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </ButtonLink>
        <Link
          href="/services/ai-agents-automation"
          className="px-3 py-2 text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-orange-deep hover:decoration-orange-deep"
        >
          {aiSection.learnMore}
        </Link>
      </Reveal>
    </Section>
  );
}
