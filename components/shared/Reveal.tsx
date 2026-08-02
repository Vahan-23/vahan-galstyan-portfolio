"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "li" | "article";
};

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      variants={variants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}
