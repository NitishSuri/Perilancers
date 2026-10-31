import { cn } from "@/lib/utils";

/** Emphasised word in a headline, shown in the accent colour. */
export function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-forest", className)}>{children}</span>;
}
