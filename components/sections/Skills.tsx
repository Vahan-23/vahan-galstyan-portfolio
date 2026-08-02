"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skillGroupKeys, skillItems } from "@/content/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Skills() {
  const t = useTranslations("skills");
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
        >
          {skillGroupKeys.map((group) => (
            <motion.article
              key={group}
              variants={fadeUp}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-gray-600"
            >
              <h3 className="text-sm font-medium tracking-[0.12em] text-brand uppercase">
                {t(`groups.${group}`)}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skillItems[group].map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
