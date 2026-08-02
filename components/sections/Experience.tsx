"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experienceIds } from "@/content/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Experience() {
  const t = useTranslations("experience");
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <motion.ol
          className="relative mt-12 space-y-0 border-l border-border pl-6 md:pl-8"
          variants={staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
        >
          {experienceIds.map((id) => {
            const bullets = t.raw(`items.${id}.bullets`) as string[];
            return (
              <motion.li
                key={id}
                variants={fadeUp}
                className="relative pb-10 last:pb-0"
              >
                <span
                  className="absolute top-1.5 -left-[1.7rem] size-2.5 rounded-full bg-brand md:-left-[2.2rem]"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium text-foreground">
                    {t(`items.${id}.role`)}
                  </h3>
                  <time className="text-sm text-muted-foreground">
                    {t(`items.${id}.period`)}
                  </time>
                </div>
                <p className="mt-1 text-sm text-brand">
                  {t(`items.${id}.company`)}
                  <span className="text-muted-foreground">
                    {" "}
                    · {t(`items.${id}.location`)}
                  </span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground md:text-base">
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </section>
  );
}
