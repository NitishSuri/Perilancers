import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const wobble: CSSProperties = { filter: "url(#doodle)" };

/**
 * Shared SVG filter that gives strokes a slight hand-drawn wobble.
 * Rendered once in the root layout.
 */
export function DoodleDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <filter id="doodle" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/** Irregular, hand-drawn "ink blot" shapes so neighbouring icons don't look stamped from one mould. */
const blobs = [
  "M9 10.5c6.2-5.4 17-7.2 25.6-5.1 7.4 1.8 10.6 8 9.7 16.1-.9 9-3.4 16.8-11.3 19.8-8.3 3.1-19.4 2-25.2-4.4C2.6 31.3 2.1 16.6 9 10.5z",
  "M12.2 5.8c8.2-3.1 20.1-2.2 27 4.4 6.2 5.9 5.9 15.9 2.1 23.6-3.7 7.4-11.6 10.4-20.6 9.4C11.3 42.2 4.2 36.4 4 26.4 3.8 17.4 6 8.1 12.2 5.8z",
  "M6.8 14.3c3.2-7.4 12.4-10.2 21.4-9.3 9.1.9 15.4 6.3 16.2 15.2.8 8.4-4.1 16.9-12.4 19.9-9.3 3.4-20.4 1.1-25.3-7.1-3.1-5.3-2.9-12.6.1-18.7z",
];

/** A line icon drawn with a slight wobble, sitting on a soft sage blot with a loose sketched outline. */
export function DoodleIcon({
  icon: Icon,
  variant = 0,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  variant?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const d = blobs[variant % blobs.length];
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        size === "sm" && "size-11",
        size === "md" && "size-14",
        size === "lg" && "size-[4.5rem]",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full overflow-visible">
        <path d={d} className="fill-sage-light" />
        <path
          d={d}
          transform="translate(2.2 -1.8) rotate(-7 24 24)"
          fill="none"
          className="stroke-forest/60"
          strokeWidth="1.3"
          strokeLinecap="round"
          style={wobble}
        />
      </svg>
      {/* Two passes of the same icon, slightly offset, like a pen going over a line twice */}
      <span className="relative">
        <Icon
          aria-hidden="true"
          strokeWidth={1.4}
          className={cn(
            "absolute top-[0.6px] left-[0.9px] text-forest/35",
            size === "sm" && "size-5",
            size === "md" && "size-6",
            size === "lg" && "size-8",
          )}
        />
        <Icon
          aria-hidden="true"
          strokeWidth={1.7}
          style={wobble}
          className={cn(
            "relative block text-forest",
            size === "sm" && "size-5",
            size === "md" && "size-6",
            size === "lg" && "size-8",
          )}
        />
      </span>
    </span>
  );
}

/** Hand-drawn check mark for lists. */
export function DoodleCheck({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0 text-forest", className)}
      style={wobble}
    >
      <path d="M4 13.2c1.7 1.3 3.3 3 4.7 5.1 2.4-5.4 6-9.8 11.1-13.4" />
    </svg>
  );
}
