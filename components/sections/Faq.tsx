"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqIds } from "@/content/site";
import { Reveal } from "@/components/shared/Reveal";

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="section-y">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <Reveal className="mt-10 max-w-3xl">
          <Accordion className="rounded-xl border border-border bg-surface px-4 md:px-6">
            {faqIds.map((id) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger className="py-4 text-base text-foreground hover:no-underline">
                  {t(`items.${id}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>{t(`items.${id}.answer`)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
