"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { processStepIds } from "@/content/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Process() {
  const t = useTranslations("process");
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <motion.ol
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
        >
          {processStepIds.map((step) => (
            <motion.li
              key={step}
              variants={fadeUp}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <span className="font-mono text-sm text-brand">
                {step.padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium text-foreground">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`steps.${step}.description`)}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
