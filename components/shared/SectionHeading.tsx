"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      variants={fadeUp}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-[0.14em] text-brand uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-h2 text-foreground">{title}</h2>
      {description ? (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
