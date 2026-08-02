"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { whyHireIds } from "@/content/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WhyHire() {
  const t = useTranslations("whyHire");
  const reduced = useReducedMotion();

  return (
    <section id="why-hire" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <motion.ul
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
        >
          {whyHireIds.map((id) => (
            <motion.li
              key={id}
              variants={fadeUp}
              className="rounded-xl border border-border bg-surface px-5 py-5 transition-colors hover:border-gray-600"
            >
              <h3 className="font-medium text-foreground">
                {t(`items.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`items.${id}.description`)}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
