import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { Reveal } from "@/components/shared/Reveal";
import { WhyHire } from "@/components/sections/WhyHire";
import { serviceGroupMeta, siteConfig } from "@/content/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <section className="section-y pt-32">
        <Container>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href={`mailto:${siteConfig.email}`}>
              {t("emailStart")}
            </CTAButton>
            <CTAButton href="/#contact" variant="secondary">
              {t("contactForm")}
            </CTAButton>
          </div>
        </Container>
      </section>

      {serviceGroupMeta.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="border-t border-border py-16"
        >
          <Container>
            <Reveal>
              <h2 className="text-h3 text-foreground">
                {t(`groups.${group.id}.title`)}
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {t(`groups.${group.id}.subtitle`)}
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-gray-600"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-foreground">
                      {t(`groups.${group.id}.items.${item.id}.name`)}
                    </h3>
                    <span className="shrink-0 font-mono text-sm text-brand">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t(`groups.${group.id}.items.${item.id}.description`)}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      <WhyHire />

      <section className="section-y border-t border-border">
        <Container className="text-center">
          <h2 className="text-h2 text-foreground">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("ctaDescription")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </CTAButton>
            <CTAButton href="/#contact" variant="secondary">
              {t("openContact")}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
