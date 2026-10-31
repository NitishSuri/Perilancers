import { Bot, Clock, Database, FileInput, Mail, UserCheck, type LucideIcon } from "lucide-react";
import { automationExample } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";

const toolIcons: Record<string, LucideIcon> = {
  "Website form": FileInput,
  "AI agent": Bot,
  CRM: Database,
  Email: Mail,
  You: UserCheck,
};

/** An example automation run, shown like a workflow tool's activity panel. */
export function AutomationCard() {
  const { name, steps, footer } = automationExample;

  return (
    <div
      role="img"
      aria-label={`Example automation, ${name}: ${steps.map((s) => s.label).join(", ")}.`}
      className="rounded-2xl border border-line bg-paper/50"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Example automation</p>
          <p className="mt-0.5 font-display text-lg font-bold">{name}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1 text-xs font-semibold text-green">
          <span className="size-1.5 rounded-full bg-green" />
          Active
        </span>
      </div>

      <ol className="relative px-5 py-5">
        {/* Connector line behind the status dots */}
        <span aria-hidden="true" className="absolute top-9 bottom-9 left-[2.15rem] w-px bg-line" />
        {steps.map((step, i) => {
          const Icon = toolIcons[step.tool] ?? Bot;
          const pending = step.status === "pending";
          return (
            <li key={step.label}>
              <Reveal delay={0.15 + i * 0.18} className="relative flex items-center gap-4 py-2.5">
                <span
                  className={cn(
                    "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border text-xs",
                    pending ? "border-sun bg-sun/15 text-amber" : "border-green/30 bg-green/10 text-green",
                  )}
                >
                  {pending ? <Clock className="size-3.5" aria-hidden="true" /> : "✓"}
                </span>
                <span className={cn("flex-1 text-sm", pending ? "font-semibold" : "text-ink/85")}>{step.label}</span>
                <span className="hidden items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 text-xs text-muted sm:inline-flex">
                  <Icon className="size-3.5" aria-hidden="true" />
                  {step.tool}
                </span>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
        <p className="text-xs text-muted">{footer}</p>
        <div className="flex shrink-0 gap-2">
          <span className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink/75">Edit</span>
          <span className="rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-paper">Approve</span>
        </div>
      </div>
    </div>
  );
}
