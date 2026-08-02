"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, Download, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { CTAButton } from "@/components/shared/CTAButton";
import { siteConfig } from "@/content/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(dx * 18);
    y.set(dy * 12);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
      aria-label={t("aria")}
    >
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="noise-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[100px]"
        aria-hidden
      />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial={reduced ? false : "hidden"}
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-sm font-medium tracking-[0.18em] text-brand uppercase"
          >
            {t("role")} · {t("location")}
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-display text-foreground">
            {siteConfig.name.toUpperCase()}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <CTAButton href="/#prices">
              {tNav("pricing")}
              <ArrowDownRight className="size-4" />
            </CTAButton>
            <CTAButton href="/#projects" variant="secondary">
              {t("viewProjects")}
            </CTAButton>
            <CTAButton
              href={siteConfig.resumePath}
              variant="secondary"
              download
            >
              <Download className="size-4" />
              {t("downloadResume")}
            </CTAButton>
            <CTAButton
              href={siteConfig.links.telegram}
              variant="ghost"
              external
            >
              <Send className="size-4" />
              {t("contact")}
            </CTAButton>
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-24 right-0 hidden h-40 w-40 rounded-full border border-brand/30 md:block lg:right-8"
          style={{ x: springX, y: springY }}
        >
          <div className="absolute inset-6 rounded-full border border-dashed border-brand/20" />
          <div className="absolute inset-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
        </motion.div>
      </Container>
    </section>
  );
}
