import { cn } from "@/lib/utils";

/** Decorative warm light beams that fall from the top edge of a section and sway very slowly. */
export function LightRays({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_15%,transparent_95%)]",
        className,
      )}
    >
      {/* Glow at the light source */}
      <div className="absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,197,61,0.45),transparent)]" />
      <div className="light-rays absolute top-0 left-1/2 h-[46rem] w-[88rem] animate-rays" />
      <div className="light-rays absolute top-0 left-1/2 h-[40rem] w-[70rem] animate-rays-slow opacity-70" />
    </div>
  );
}
