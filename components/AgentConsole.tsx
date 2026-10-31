"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { agentConsole } from "@/lib/content";
import { cn } from "@/lib/utils";

const kindStyle = {
  think: { tag: "think", color: "text-amber" },
  tool: { tag: "tool ", color: "text-forest" },
  done: { tag: "done ", color: "text-green" },
  human: { tag: "you  ", color: "text-ink" },
} as const;

const TYPE_MS = 22;
const LINE_PAUSE_MS = 500;
const LOOP_PAUSE_MS = 3200;

/** A looping, typed-out log of an AI agent working through a task. */
export function AgentConsole() {
  const reduce = useReducedMotion();
  const steps = agentConsole.steps;
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    if (line >= steps.length) {
      t = setTimeout(() => {
        setLine(0);
        setChars(0);
      }, LOOP_PAUSE_MS);
    } else if (chars < steps[line].text.length) {
      t = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
    } else {
      t = setTimeout(() => {
        setLine((l) => l + 1);
        setChars(0);
      }, LINE_PAUSE_MS);
    }
    return () => clearTimeout(t);
  }, [line, chars, reduce, steps]);

  const visible = reduce ? steps.length : line;
  const finished = visible >= steps.length;

  return (
    <div
      role="img"
      aria-label="Animated example: an AI agent plans a website launch, uses design, build, and SEO tools, then waits for human approval."
      className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(61,43,31,0.35)]"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-paper/60 px-4 py-3">
        <span className="size-3 rounded-full bg-line" />
        <span className="size-3 rounded-full bg-sage-light" />
        <span className="size-3 rounded-full bg-sage" />
        <span className="ml-3 font-mono text-xs text-muted">{agentConsole.title}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-green uppercase">
          <span className="size-2 rounded-full bg-green" />
          {finished ? "Awaiting approval" : "Running"}
        </span>
      </div>

      <div className="min-h-[19rem] p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-[13px]">
        <p className="text-muted">
          <span className="text-forest">❯</span> agent.<span className="text-ink">{agentConsole.task}</span>
        </p>

        <ul className="mt-3 space-y-1.5">
          {steps.map((s, i) => {
            if (i > visible) return null;
            const typing = i === visible && !reduce;
            const text = typing ? s.text.slice(0, chars) : s.text;
            const style = kindStyle[s.kind];
            return (
              <m.li
                key={i}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("flex gap-2", s.kind === "human" && "mt-3 rounded-lg border border-sun/60 bg-sun/10 p-2")}
              >
                <span className={cn("shrink-0 whitespace-pre", style.color)}>[{style.tag}]</span>
                <span className={s.kind === "tool" ? "text-ink/70" : "text-ink"}>
                  {text}
                  {typing && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-forest" />
                  )}
                </span>
              </m.li>
            );
          })}
        </ul>

        {finished && (
          <m.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex gap-2">
            <span className="rounded-md bg-forest px-3 py-1.5 font-sans text-xs font-semibold text-surface">Approve</span>
            <span className="rounded-md border border-line px-3 py-1.5 font-sans text-xs font-semibold text-ink/80">
              Edit plan
            </span>
          </m.div>
        )}
      </div>

      <div className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted">{agentConsole.footer}</div>
    </div>
  );
}
