"use client";

import { m } from "framer-motion";

/** A line that draws itself in when scrolled into view. */
export function DrawLine({ axis, className }: { axis: "x" | "y"; className?: string }) {
  const prop = axis === "x" ? "scaleX" : "scaleY";
  return (
    <m.div
      aria-hidden="true"
      className={className}
      style={{ originX: 0, originY: 0 }}
      initial={{ [prop]: 0 }}
      whileInView={{ [prop]: 1 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    />
  );
}
