"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-y" aria-labelledby="about-heading">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <Reveal className="space-y-5 text-base text-muted-foreground md:text-lg">
            <p id="about-heading" className="sr-only">
              {t("srTitle")}
            </p>
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </Reveal>

          <Reveal className="rounded-xl border border-border bg-surface p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">{t("focus")}</dt>
                <dd className="mt-1 text-foreground">{t("focusValue")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("basedIn")}</dt>
                <dd className="mt-1 text-foreground">{t("basedInValue")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("openTo")}</dt>
                <dd className="mt-1 text-foreground">{t("openToValue")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("also")}</dt>
                <dd className="mt-1 text-foreground">{t("alsoValue")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
