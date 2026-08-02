"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CTAButton } from "@/components/shared/CTAButton";
import { projectIds, projectMeta } from "@/content/site";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="section-y">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 space-y-6">
          {projectIds.map((id) => {
            const meta = projectMeta[id];
            const highlights = t.raw(`items.${id}.features`) as string[];

            return (
              <Reveal key={id} as="article">
                <article className="overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="grid lg:grid-cols-[1.05fr_1fr]">
                    <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden border-b border-border bg-background px-6 py-12 lg:min-h-[280px] lg:border-r lg:border-b-0">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-40"
                        style={{
                          background:
                            "radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--brand) 22%, transparent), transparent 55%)",
                        }}
                        aria-hidden
                      />
                      <div className="relative text-center">
                        <p className="text-[clamp(2.25rem,6vw,4.25rem)] font-semibold tracking-[-0.04em] text-foreground uppercase">
                          {meta.displayName}
                        </p>
                        <p className="mt-3 font-mono text-sm text-brand">
                          {meta.domain}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col p-6 md:p-8">
                      <p className="text-sm text-brand">
                        {t(`items.${id}.tagline`)}
                      </p>
                      <h3 className="text-h3 mt-2 text-foreground">
                        {t(`items.${id}.title`)}
                      </h3>
                      <p className="mt-3 text-base text-muted-foreground">
                        {t(`items.${id}.description`)}
                      </p>

                      <ul className="mt-5 space-y-2 text-sm text-foreground">
                        {highlights.slice(0, 5).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-wrap gap-2 pt-6">
                        {meta.liveUrl ? (
                          <CTAButton
                            href={meta.liveUrl}
                            external
                            className="h-9 px-3"
                          >
                            {t("liveDemo")}
                            <ExternalLink className="size-3.5" />
                          </CTAButton>
                        ) : null}
                        <CTAButton
                          href="/#contact"
                          variant="secondary"
                          className="h-9 px-3"
                        >
                          {t("readMore")}
                        </CTAButton>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
