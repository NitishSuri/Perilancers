"use client";

import { m } from "framer-motion";

const from = {
  up: { opacity: 0, y: 16 },
  left: { opacity: 0, x: -16 },
  right: { opacity: 0, x: 16 },
};

/** Gently fades its children in once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: keyof typeof from;
}) {
  return (
    <m.div
      className={className}
      initial={from[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </m.div>
  );
}
