/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Shared card style: hairline border, soft shadow, gentle lift on hover. */
export const cardClass =
  "group rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(23,20,15,0.04)] transition duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_20px_40px_-24px_rgba(23,20,15,0.35)] motion-reduce:hover:translate-y-0";
