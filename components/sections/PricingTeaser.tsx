"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { Reveal } from "@/components/shared/Reveal";
import { TelegramIcon } from "@/components/shared/SocialIcons";
import { pricingTeaserIds, serviceGroupMeta, siteConfig } from "@/content/site";

const includeKeys = ["responsive", "code", "launch"] as const;

function findPrice(groupId: string, itemId: string) {
  const group = serviceGroupMeta.find((g) => g.id === groupId);
  return group?.items.find((i) => i.id === itemId)?.price ?? "";
}

export function PricingTeaser() {
  const t = useTranslations("pricing");
  const tServices = useTranslations("services");

  return (
    <section id="prices" className="section-y border-t border-border">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ul className="mt-8 flex flex-col gap-2.5 border-l border-brand/40 pl-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:border-l-0 sm:pl-0">
          {includeKeys.map((key) => (
            <li
              key={key}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>{t(`includes.${key}`)}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTeaserIds.map(({ groupId, itemId }) => (
            <Reveal key={`${groupId}-${itemId}`} as="li">
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-gray-600">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium text-foreground">
                    {tServices(`groups.${groupId}.items.${itemId}.name`)}
                  </h3>
                  <span className="shrink-0 text-lg font-semibold tracking-tight text-brand">
                    {findPrice(groupId, itemId)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tServices(`groups.${groupId}.items.${itemId}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href={siteConfig.links.telegram} external>
            <TelegramIcon />
            {t("askPrice")}
          </CTAButton>
          <CTAButton href="/services" variant="secondary">
            {t("viewAll")}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
