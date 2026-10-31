import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-surface hover:bg-forest-dark shadow-[0_8px_20px_-10px_rgba(61,43,31,0.6)]",
  secondary: "border border-ink/15 bg-surface text-ink hover:border-ink/40",
};

export const buttonBase =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(buttonBase, variants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }) {
  return (
    <a href={href} className={buttonClass(variant, className)} {...props}>
      {children}
    </a>
  );
}
