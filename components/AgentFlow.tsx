import { Fragment } from "react";
import { BrainCircuit, CircleCheck, UserCheck, Wrench, Zap, type LucideIcon } from "lucide-react";
import { agentFlow } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";

const icons: LucideIcon[] = [Zap, BrainCircuit, Wrench, UserCheck, CircleCheck];

/** Diagram of how an agent handles a task, with a subtle data flow between steps. */
export function AgentFlow() {
  return (
    <ol className="flex flex-col items-stretch lg:flex-row lg:items-center">
      {agentFlow.map((step, i) => {
        const Icon = icons[i];
        const human = i === 3;
        return (
          <Fragment key={step.label}>
            <li className="lg:flex-1">
              <Reveal delay={i * 0.08}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3.5 lg:flex-col lg:px-3 lg:py-5 lg:text-center",
                    human ? "border-sun bg-sun/15" : "border-line bg-surface",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg",
                      human ? "bg-sun/30 text-amber" : "bg-orange/10 text-orange-deep",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{step.label}</p>
                    <p className="text-sm text-muted">{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            </li>
            {i < agentFlow.length - 1 && (
              <li aria-hidden="true" className="relative mx-auto h-7 w-px bg-ink/15 lg:mx-0 lg:h-px lg:w-8 lg:shrink-0">
                <span
                  style={{ animationDelay: `${i * 0.6}s` }}
                  className="absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 animate-packet-y rounded-full bg-orange lg:top-1/2 lg:left-0 lg:animate-packet"
                />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
