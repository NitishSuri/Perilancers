"use client";

import { m } from "framer-motion";
import { Bot, Cloud, Database, FileText, Mail, Search, Server, Sparkles } from "lucide-react";
import type { ProjectVisual as Variant } from "@/lib/content";

const inView = { once: true, margin: "0px 0px -60px 0px" } as const;

/** Decorative illustrations for the example project cards. */
export function ProjectVisual({ variant }: { variant: Variant }) {
  return (
    <div aria-hidden="true" className="relative h-44 overflow-hidden rounded-xl border border-line bg-paper-2 p-5">
      <div className="relative h-full">
        {variant === "dashboard" && <Dashboard />}
        {variant === "cloud" && <CloudMigration />}
        {variant === "chat" && <Chat />}
        {variant === "brand" && <Brand />}
        {variant === "agent" && <Agent />}
        {variant === "docs" && <Docs />}
      </div>
    </div>
  );
}

const panel = "rounded-lg border border-line bg-surface";

function Dashboard() {
  return (
    <div className="flex h-full gap-3">
      <div className={`hidden w-14 flex-col gap-2 p-2 sm:flex ${panel}`}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={i === 0 ? "h-1.5 rounded bg-sage" : "h-1.5 rounded bg-ink/10"} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`p-2 ${panel}`}>
              <div className="h-1.5 w-6 rounded bg-ink/15" />
              <div className="mt-1.5 h-2.5 w-3/4 rounded bg-ink/70" />
            </div>
          ))}
        </div>
        <div className={`flex flex-1 items-end gap-1.5 p-2.5 ${panel}`}>
          {[40, 65, 50, 80, 60, 90, 75, 95].map((h, i) => (
            <m.div
              key={i}
              style={{ height: `${h}%`, originY: 1 }}
              className={`flex-1 rounded-sm ${i === 7 ? "bg-sage" : "bg-forest/85"}`}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={inView}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudMigration() {
  return (
    <div className="flex h-full items-center justify-center gap-3 sm:gap-5">
      <div className="flex flex-col gap-2">
        {[0, 1].map((i) => (
          <div key={i} className={`flex size-9 items-center justify-center ${panel}`}>
            <Server className="size-4 text-muted" />
          </div>
        ))}
      </div>
      <div className="h-px w-6 bg-ink/25 sm:w-12" />
      <div className="flex size-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-sm sm:size-20">
        <Cloud className="size-8 text-forest" />
      </div>
      <div className="h-px w-6 bg-ink/25 sm:w-12" />
      <div className="grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="size-5 rounded-md border border-line bg-surface sm:size-6" />
        ))}
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="mx-auto flex h-full max-w-xs flex-col justify-center gap-2.5">
      <m.div
        className="self-end rounded-2xl rounded-br-sm bg-forest px-3 py-2 text-xs text-surface"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Where&apos;s my order #4512?
      </m.div>
      <m.div
        className="flex items-end gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sage/15 text-forest">
          <Bot className="size-4" />
        </div>
        <div className="rounded-2xl rounded-bl-sm border border-line bg-surface px-3 py-2 text-xs">
          Found it. It ships today, and I&apos;ve emailed your tracking link.
        </div>
      </m.div>
    </div>
  );
}

function Agent() {
  const tools = [
    { icon: Mail, label: "Inbox" },
    { icon: Search, label: "Research" },
    { icon: Database, label: "CRM" },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-4 sm:gap-6">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sage/15 text-forest">
        <Bot className="size-7" />
      </div>
      <div className="flex flex-col gap-2">
        {tools.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="h-px w-6 bg-ink/20 sm:w-10" />
            <span className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px]">
              <Icon className="size-3.5 text-forest" />
              {label}
            </span>
            <span className="text-xs text-green">✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Docs() {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex h-24 w-14 flex-col gap-1.5 p-2 ${panel}`}>
            <FileText className="size-4 text-forest" />
            {[0, 1, 2, 3].map((l) => (
              <div key={l} className="h-1 rounded bg-ink/15" style={{ width: `${90 - l * 15}%` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[9rem] rounded-xl border border-line bg-surface p-2.5 text-[11px] text-ink">
        <Sparkles className="mb-1 size-3.5 text-forest" />
        Refunds are allowed within 30 days.
        <span className="mt-1 block font-mono text-[10px] text-muted">source: policy.pdf</span>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex h-full items-center justify-center gap-5">
      <div className="flex size-20 items-center justify-center rounded-2xl border border-line bg-surface font-display text-3xl font-bold text-ink">
        Aa
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {["bg-sage", "bg-sun", "bg-surface", "bg-ink"].map((c) => (
            <div key={c} className={`size-7 rounded-full border border-line ${c}`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`aspect-square w-10 ${panel}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
