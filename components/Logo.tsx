import Link from "next/link";
import { cn } from "@/lib/utils";

/** Text logo with an asterisk mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/#top"
      className={cn(
        "inline-flex items-center gap-1.5 font-display text-xl font-bold tracking-tight text-ink sm:text-[1.4rem]",
        className,
      )}
      aria-label="Perilancers, back to top"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 text-forest">
        <path
          fill="currentColor"
          d="M10.6 1.5h2.8l-.3 7.1 6-3.8 1.4 2.4-6.3 3.3 6.3 3.3-1.4 2.4-6-3.8.3 7.1h-2.8l.3-7.1-6 3.8-1.4-2.4 6.3-3.3-6.3-3.3 1.4-2.4 6 3.8z"
        />
      </svg>
      Perilancers
    </Link>
  );
}
