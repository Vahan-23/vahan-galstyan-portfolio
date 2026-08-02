"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-brand"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      aria-hidden
    />
  );
}
